import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Sparkle, DownloadSimple, Code, Warning, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { generateTokensWithAI } from '@/lib/ai-adapter'
import { tokensToJSON, tokensToCSS, downloadFile } from '@/lib/token-parser'
import { pushToFigma, getFigmaInstructions, validateFigmaToken } from '@/lib/figma-adapter'
import type { DesignTokens } from '@/types/design-tokens'
import { TokenPreview } from '@/components/TokenPreview'
import { useKV } from '@github/spark/hooks'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const EXAMPLE_PROMPTS = [
  'Create a modern SaaS dashboard design system with blue primary color',
  'Design tokens for a nature-themed e-commerce site with earthy colors',
  'Professional finance app with dark mode and green accents',
]

export function GeneratorInterface() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tokens, setTokens] = useKV<DesignTokens | null>('last-generated-tokens', null)
  const [error, setError] = useState<string | null>(null)

  const [figmaToken, setFigmaToken] = useState('')
  const [figmaFileKey, setFigmaFileKey] = useState('')
  const [isPushingToFigma, setIsPushingToFigma] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateTokensWithAI({ prompt })
      setTokens(result.tokens)
      toast.success('Design tokens generated successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate tokens'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportJSON = () => {
    if (!tokens) return

    const json = tokensToJSON(tokens, true)
    const filename = `${tokens.name.toLowerCase().replace(/\s+/g, '-')}-tokens.json`
    downloadFile(json, filename, 'application/json')
    toast.success('JSON exported successfully!')
  }

  const handleExportCSS = () => {
    if (!tokens) return

    const css = tokensToCSS(tokens)
    const filename = `${tokens.name.toLowerCase().replace(/\s+/g, '-')}-tokens.css`
    downloadFile(css, filename, 'text/css')
    toast.success('CSS variables exported successfully!')
  }

  const handlePushToFigma = async () => {
    if (!tokens) return

    if (!figmaToken.trim()) {
      toast.error('Please provide a Figma Personal Access Token')
      return
    }

    if (!validateFigmaToken(figmaToken)) {
      toast.error('Invalid Figma token format. Token should start with "figd_"')
      return
    }

    setIsPushingToFigma(true)

    try {
      const result = await pushToFigma({
        tokens,
        figmaToken: figmaToken.trim(),
        fileKey: figmaFileKey.trim() || undefined,
      })

      if (result.success) {
        toast.success(`Pushed to Figma! Created ${result.createdStyles.length} styles`)
        if (result.fileUrl) {
          window.open(result.fileUrl, '_blank')
        }
      } else {
        toast.error(result.error || 'Failed to push to Figma')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to push to Figma'
      toast.error(errorMessage)
    } finally {
      setIsPushingToFigma(false)
      setFigmaToken('')
      setFigmaFileKey('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">AI Design System Generator</h1>
          <p className="text-muted-foreground">
            Transform natural language into production-ready design tokens
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Design Brief</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your design system..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-2 min-h-32"
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Example prompts:</p>
                  {EXAMPLE_PROMPTS.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(example)}
                      className="text-xs text-accent hover:underline block text-left"
                      disabled={isGenerating}
                    >
                      {example}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Sparkle className="mr-2" />
                      Generate Tokens
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {tokens && (
              <Card className="p-6">
                <h3 className="font-medium mb-4">Export Options</h3>
                <div className="space-y-2">
                  <Button onClick={handleExportJSON} variant="outline" className="w-full justify-start">
                    <DownloadSimple className="mr-2" />
                    Export JSON
                  </Button>
                  <Button onClick={handleExportCSS} variant="outline" className="w-full justify-start">
                    <Code className="mr-2" />
                    Export CSS Variables
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Push to Figma</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Help
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Figma Integration</DialogTitle>
                          <DialogDescription className="whitespace-pre-line text-left">
                            {getFigmaInstructions()}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div>
                    <Label htmlFor="figma-token">Personal Access Token</Label>
                    <Input
                      id="figma-token"
                      type="password"
                      placeholder="figd_..."
                      value={figmaToken}
                      onChange={(e) => setFigmaToken(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="figma-file-key">
                      File Key <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="figma-file-key"
                      placeholder="Leave empty to create new file"
                      value={figmaFileKey}
                      onChange={(e) => setFigmaFileKey(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={handlePushToFigma}
                    disabled={isPushingToFigma || !figmaToken.trim()}
                    variant="secondary"
                    className="w-full"
                  >
                    {isPushingToFigma ? 'Pushing...' : 'Push to Figma'}
                  </Button>

                  <Alert>
                    <AlertDescription className="text-xs">
                      Your token is never stored and only used for this operation.
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <Warning className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {tokens ? (
              <Card className="p-6">
                <TokenPreview tokens={tokens} />
              </Card>
            ) : (
              <Card className="p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
                <Sparkle size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to generate</h3>
                <p className="text-muted-foreground max-w-md">
                  Enter a design brief describing your desired design system, then click Generate Tokens to
                  get started.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
