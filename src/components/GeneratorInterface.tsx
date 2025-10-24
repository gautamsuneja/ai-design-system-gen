import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkle, 
  DownloadSimple, 
  Code, 
  Warning, 
  Check, 
  Copy, 
  CircleNotch,
  LockKey,
  Info,
  ArrowsLeftRight,
  ClockCounterClockwise,
  Trash
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { generateTokensWithAI } from '@/lib/ai-adapter'
import { tokensToJSON, tokensToCSS, downloadFile } from '@/lib/token-parser'
import { pushToFigma, getFigmaInstructions, validateFigmaToken } from '@/lib/figma-adapter'
import type { DesignTokens } from '@/types/design-tokens'
import { TokenPreview } from '@/components/TokenPreview'
import { ComparisonView } from '@/components/ComparisonView'
import { useKV } from '@github/spark/hooks'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const EXAMPLE_PROMPTS = [
  { label: '🏦 Modern Fintech Dashboard', prompt: 'Create a modern fintech dashboard design system with professional blue tones, high contrast for data visualization, and accessible color palette' },
  { label: '🌙 Dark Mode E-commerce', prompt: 'Design tokens for a luxury dark mode e-commerce platform with elegant gold accents, premium feel, and sophisticated color scheme' },
  { label: '🎯 Minimalist Productivity App', prompt: 'Minimalist productivity app design system with calming colors, generous spacing, and clean typography focused on readability' },
  { label: '🔥 Bold Social Media', prompt: 'Bold and vibrant social media app with energetic colors, playful gradients, and modern typography for Gen Z audience' },
]

interface TokenHistoryItem {
  id: string
  tokens: DesignTokens
  timestamp: number
  prompt: string
}

export function GeneratorInterface() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [tokens, setTokens] = useKV<DesignTokens | null>('last-generated-tokens', null)
  const [error, setError] = useState<string | null>(null)
  const [copiedJson, setCopiedJson] = useState(false)
  const [jsonExpanded, setJsonExpanded] = useState(false)

  const [figmaToken, setFigmaToken] = useState('')
  const [figmaFileKey, setFigmaFileKey] = useState('')
  const [isPushingToFigma, setIsPushingToFigma] = useState(false)
  const [figmaSuccess, setFigmaSuccess] = useState<string | null>(null)

  const [tokenHistory, setTokenHistory] = useKV<TokenHistoryItem[]>('token-history', [])
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonSetA, setComparisonSetA] = useState<string>('')
  const [comparisonSetB, setComparisonSetB] = useState<string>('')

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError(null)
    setFigmaSuccess(null)

    try {
      const result = await generateTokensWithAI({ prompt })
      setTokens(result.tokens)
      
      const historyItem: TokenHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        tokens: result.tokens,
        timestamp: Date.now(),
        prompt: prompt.trim()
      }
      
      setTokenHistory((current) => [historyItem, ...(current || [])].slice(0, 10))
      
      toast.success('Design tokens generated successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate tokens'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt)
    setError(null)
  }

  const handleExportJSON = () => {
    if (!tokens) return

    const json = tokensToJSON(tokens, true)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
    const filename = `design-tokens-${timestamp}.json`
    downloadFile(json, filename, 'application/json')
    toast.success('JSON exported successfully!')
  }

  const handleCopyJSON = async () => {
    if (!tokens) return

    const json = tokensToJSON(tokens, true)
    try {
      await navigator.clipboard.writeText(json)
      setCopiedJson(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopiedJson(false), 2000)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
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
    setFigmaSuccess(null)

    try {
      const result = await pushToFigma({
        tokens,
        figmaToken: figmaToken.trim(),
        fileKey: figmaFileKey.trim() || undefined,
      })

      if (result.success) {
        const successMsg = `Successfully pushed ${result.createdStyles.length} styles to Figma!`
        setFigmaSuccess(result.fileUrl || successMsg)
        toast.success(successMsg)
        if (result.fileUrl) {
          setTimeout(() => {
            window.open(result.fileUrl, '_blank')
          }, 500)
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

  const handleCompare = () => {
    if (!comparisonSetA || !comparisonSetB) {
      toast.error('Please select two token sets to compare')
      return
    }

    if (comparisonSetA === comparisonSetB) {
      toast.error('Please select different token sets')
      return
    }

    setShowComparison(true)
  }

  const handleLoadHistoryItem = (item: TokenHistoryItem) => {
    setTokens(item.tokens)
    setPrompt(item.prompt)
    toast.success('Loaded token set from history')
  }

  const handleDeleteHistoryItem = (id: string) => {
    setTokenHistory((current) => (current || []).filter(item => item.id !== id))
    toast.success('Removed from history')
  }

  const handleClearHistory = () => {
    setTokenHistory([])
    toast.success('History cleared')
  }

  const getComparisonTokens = () => {
    const setA = tokenHistory?.find(item => item.id === comparisonSetA)
    const setB = tokenHistory?.find(item => item.id === comparisonSetB)
    return { setA, setB }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const { setA, setB } = getComparisonTokens()

  return (
    <>
      {showComparison && setA && setB && (
        <ComparisonView
          tokenSetA={setA.tokens}
          tokenSetB={setB.tokens}
          onClose={() => setShowComparison(false)}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Design System Generator
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Transform natural language into production-ready design tokens powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 sm:p-6 shadow-lg border-muted">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt" className="text-base font-medium">Design Brief</Label>
                  <p className="text-xs text-muted-foreground mt-1 mb-2">
                    Describe your desired design system style and theme
                  </p>
                  <Textarea
                    id="prompt"
                    placeholder="e.g., Create a modern, minimalist design system with blue primary color..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-2 min-h-32 resize-none"
                    disabled={isGenerating}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Quick Start Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.map((example, idx) => (
                      <Button
                        key={idx}
                        onClick={() => handleExampleClick(example.prompt)}
                        variant="outline"
                        size="sm"
                        disabled={isGenerating}
                        className="text-xs h-auto py-2 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {example.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full relative overflow-hidden group"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <CircleNotch className="mr-2 animate-spin" weight="bold" />
                      Generating tokens...
                    </>
                  ) : (
                    <>
                      <Sparkle className="mr-2" weight="fill" />
                      Generate Tokens
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-pulse w-2/3" />
                      </div>
                    </div>
                    <p className="text-center">This may take 10-30 seconds...</p>
                  </div>
                )}
              </div>
            </Card>

            {tokens && (
              <>
                <Card className="p-4 sm:p-6 shadow-lg border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <DownloadSimple weight="fill" />
                    Export Options
                  </h3>
                  <div className="space-y-2">
                    <Button onClick={handleExportJSON} variant="outline" className="w-full justify-start">
                      <DownloadSimple className="mr-2" />
                      Download JSON
                    </Button>
                    <Button onClick={handleExportCSS} variant="outline" className="w-full justify-start">
                      <Code className="mr-2" />
                      Download CSS Variables
                    </Button>
                    <Button onClick={handleCopyJSON} variant="outline" className="w-full justify-start">
                      {copiedJson ? (
                        <>
                          <Check className="mr-2" weight="bold" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2" />
                          Copy JSON to Clipboard
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold flex items-center gap-2">
                        <LockKey weight="fill" />
                        Push to Figma
                      </h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Info className="mr-1" size={14} />
                            Help
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>How to Push to Figma</DialogTitle>
                            <DialogDescription className="whitespace-pre-line text-left">
                              {getFigmaInstructions()}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Alert className="border-accent/50 bg-accent/5">
                      <LockKey className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        🔒 Your token is <strong>never stored</strong> and only used in-memory for this single operation.
                      </AlertDescription>
                    </Alert>

                    <div>
                      <Label htmlFor="figma-token" className="text-sm font-medium">
                        Personal Access Token <span className="text-destructive">*</span>
                      </Label>
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
                      <Label htmlFor="figma-file-key" className="text-sm font-medium">
                        File Key <span className="text-muted-foreground text-xs">(optional)</span>
                      </Label>
                      <p className="text-xs text-muted-foreground mb-1">
                        Leave empty to create a new Figma file
                      </p>
                      <Input
                        id="figma-file-key"
                        placeholder="Auto-generate new file"
                        value={figmaFileKey}
                        onChange={(e) => setFigmaFileKey(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      onClick={handlePushToFigma}
                      disabled={isPushingToFigma || !figmaToken.trim()}
                      variant="default"
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      {isPushingToFigma ? (
                        <>
                          <CircleNotch className="mr-2 animate-spin" />
                          Pushing to Figma...
                        </>
                      ) : (
                        'Push to Figma'
                      )}
                    </Button>

                    {figmaSuccess && (
                      <Alert className="border-green-500/50 bg-green-500/10">
                        <Check className="h-4 w-4 text-green-600" weight="bold" />
                        <AlertDescription className="text-xs text-green-700">
                          Successfully pushed to Figma! Opening file...
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </Card>
              </>
            )}

            {tokens && tokenHistory && tokenHistory.length > 1 && (
              <>
                <Card className="p-4 sm:p-6 shadow-lg border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <ClockCounterClockwise weight="fill" />
                    Generation History
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {tokenHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.tokens.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{item.prompt}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatTimestamp(item.timestamp)}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              onClick={() => handleLoadHistoryItem(item)}
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Check size={14} />
                            </Button>
                            <Button
                              onClick={() => handleDeleteHistoryItem(item.id)}
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-destructive hover:text-destructive"
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {tokenHistory.length > 0 && (
                    <Button
                      onClick={handleClearHistory}
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                    >
                      <Trash className="mr-2" size={14} />
                      Clear History
                    </Button>
                  )}
                </Card>

                <Card className="p-4 sm:p-6 shadow-lg border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <ArrowsLeftRight weight="fill" />
                    Compare Token Sets
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="compare-set-a" className="text-sm">
                        Token Set A
                      </Label>
                      <Select value={comparisonSetA} onValueChange={setComparisonSetA}>
                        <SelectTrigger id="compare-set-a" className="mt-1">
                          <SelectValue placeholder="Select first set" />
                        </SelectTrigger>
                        <SelectContent>
                          {tokenHistory.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.tokens.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="compare-set-b" className="text-sm">
                        Token Set B
                      </Label>
                      <Select value={comparisonSetB} onValueChange={setComparisonSetB}>
                        <SelectTrigger id="compare-set-b" className="mt-1">
                          <SelectValue placeholder="Select second set" />
                        </SelectTrigger>
                        <SelectContent>
                          {tokenHistory.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.tokens.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleCompare}
                      disabled={!comparisonSetA || !comparisonSetB || comparisonSetA === comparisonSetB}
                      className="w-full"
                      variant="default"
                    >
                      <ArrowsLeftRight className="mr-2" weight="bold" />
                      Compare Side-by-Side
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>

          <div className="lg:col-span-2">
            {error && (
              <Alert variant="destructive" className="mb-4 shadow-lg">
                <Warning className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            {tokens ? (
              <div className="space-y-6">
                <Card className="p-4 sm:p-6 shadow-lg border-muted">
                  <TokenPreview tokens={tokens} />
                </Card>

                <Card className="p-4 sm:p-6 shadow-lg border-muted">
                  <Collapsible open={jsonExpanded} onOpenChange={setJsonExpanded}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Code weight="fill" />
                        Raw JSON Output
                      </h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {jsonExpanded ? 'Collapse' : 'Expand'}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <div className="relative">
                        <pre className="bg-slate-950 text-green-400 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm border border-slate-800 max-h-96 overflow-y-auto font-mono">
                          {tokensToJSON(tokens, true)}
                        </pre>
                        <Button
                          onClick={handleCopyJSON}
                          size="sm"
                          variant="secondary"
                          className="absolute top-2 right-2"
                        >
                          {copiedJson ? (
                            <>
                              <Check className="mr-1" size={14} weight="bold" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1" size={14} />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </div>
            ) : (
              <Card className="p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[500px] shadow-lg border-muted">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                  <Sparkle size={64} className="text-primary/60 mb-6 relative animate-pulse" weight="fill" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                  Enter a design brief describing your desired design system, then click <strong>Generate Tokens</strong> to create production-ready design tokens with AI.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="text-xs">Colors</Badge>
                  <Badge variant="secondary" className="text-xs">Typography</Badge>
                  <Badge variant="secondary" className="text-xs">Spacing</Badge>
                  <Badge variant="secondary" className="text-xs">Effects</Badge>
                  <Badge variant="secondary" className="text-xs">Components</Badge>
                </div>
              </Card>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
