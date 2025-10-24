import type { DesignTokens, ColorToken, ColorScale } from '@/types/design-tokens'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TokenPreviewProps {
  tokens: DesignTokens;
}

function isColorToken(value: any): value is ColorToken {
  return value && typeof value === 'object' && 'hex' in value
}

function isColorScale(value: any): value is ColorScale {
  return (
    value &&
    typeof value === 'object' &&
    !('hex' in value) &&
    Object.values(value).every((v) => typeof v === 'string')
  )
}

export function TokenPreview({ tokens }: TokenPreviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{tokens.name}</h2>
        {tokens.description && <p className="text-muted-foreground">{tokens.description}</p>}
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="effects">Effects</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 mt-4">
          {Object.entries(tokens.colors).map(([key, value]) => {
            if (!value) return null

            if (key === 'semantic' && typeof value === 'object') {
              return (
                <Card key={key} className="p-4">
                  <h3 className="font-medium mb-3 capitalize">Semantic Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(value).map(([semanticKey, semanticValue]) => {
                      if (!semanticValue || !isColorToken(semanticValue)) return null
                      return (
                        <div key={semanticKey} className="space-y-2">
                          <div
                            className="h-16 rounded-md border"
                            style={{ backgroundColor: semanticValue.hex }}
                          />
                          <div className="text-sm">
                            <div className="font-medium capitalize">{semanticKey}</div>
                            <code className="text-xs text-muted-foreground">{semanticValue.hex}</code>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              )
            }

            if (isColorToken(value)) {
              return (
                <Card key={key} className="p-4">
                  <h3 className="font-medium mb-3 capitalize">{key}</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md border" style={{ backgroundColor: value.hex }} />
                    <div className="flex-1">
                      <code className="text-sm font-mono">{value.hex}</code>
                      <p className="text-sm text-muted-foreground mt-1">{value.usage}</p>
                    </div>
                  </div>
                </Card>
              )
            }

            if (isColorScale(value)) {
              return (
                <Card key={key} className="p-4">
                  <h3 className="font-medium mb-3 capitalize">{key} Scale</h3>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {Object.entries(value).map(([scaleKey, scaleValue]) => (
                      <div key={scaleKey} className="space-y-2">
                        <div className="h-16 rounded-md border" style={{ backgroundColor: scaleValue }} />
                        <div className="text-sm">
                          <div className="font-medium">{scaleKey}</div>
                          <code className="text-xs text-muted-foreground">{scaleValue}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            }

            return null
          })}
        </TabsContent>

        <TabsContent value="typography" className="mt-4">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="font-medium mb-2">Base Font</h3>
              <p className="text-lg" style={{ fontFamily: tokens.typography.baseFont }}>
                {tokens.typography.baseFont}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Type Scale</h3>
              <div className="space-y-3">
                {Object.entries(tokens.typography.scale).map(([key, value]) => (
                  <div key={key} className="flex items-baseline gap-4">
                    <Badge variant="secondary" className="w-16">
                      {key}
                    </Badge>
                    <span style={{ fontSize: `${value}px`, fontFamily: tokens.typography.baseFont }}>
                      The quick brown fox jumps over the lazy dog
                    </span>
                    <code className="text-xs text-muted-foreground ml-auto">{value}px</code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Font Weights</h3>
              <div className="space-y-2">
                {Object.entries(tokens.typography.weights).map(([key, value]) => {
                  if (!value) return null
                  return (
                    <div key={key} className="flex items-center gap-4">
                      <Badge variant="outline" className="w-24 capitalize">
                        {key}
                      </Badge>
                      <span
                        style={{
                          fontWeight: value,
                          fontFamily: tokens.typography.baseFont,
                        }}
                      >
                        Font weight {value}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="spacing" className="mt-4">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Spacing Scale</h3>
            <div className="space-y-4">
              {Object.entries(tokens.spacing).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <Badge variant="secondary" className="w-16">
                    {key}
                  </Badge>
                  <div className="bg-accent h-8 rounded" style={{ width: `${value}px` }} />
                  <code className="text-sm text-muted-foreground">{value}px</code>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4 mt-4">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Border Radius</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(tokens.radii).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div
                    className="h-20 bg-primary"
                    style={{ borderRadius: `${value === 9999 ? 9999 : value}px` }}
                  />
                  <div className="text-sm">
                    <Badge variant="outline">{key}</Badge>
                    <code className="text-xs text-muted-foreground ml-2">
                      {value === 9999 ? 'full' : `${value}px`}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4">Shadows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(tokens.shadows).map(([key, value]) => {
                if (!value) return null
                return (
                  <div key={key} className="space-y-2">
                    <div className="h-24 bg-card rounded-lg" style={{ boxShadow: value }} />
                    <div className="text-sm">
                      <Badge variant="outline">{key}</Badge>
                      <code className="text-xs text-muted-foreground block mt-1 break-all">{value}</code>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="mt-4">
          {tokens.componentVariants ? (
            <div className="space-y-4">
              {Object.entries(tokens.componentVariants).map(([componentType, variants]) => {
                if (!variants) return null
                return (
                  <Card key={componentType} className="p-6">
                    <h3 className="font-medium mb-4 capitalize">{componentType} Variants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {variants.map((variant) => (
                        <div key={variant.name} className="p-4 border rounded-lg space-y-2">
                          <Badge>{variant.name}</Badge>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-muted-foreground">Background:</span>{' '}
                              <code>{variant.background}</code>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Text:</span>{' '}
                              <code>{variant.textColor}</code>
                            </div>
                            {variant.padding && (
                              <div>
                                <span className="text-muted-foreground">Padding:</span>{' '}
                                <code>{variant.padding}</code>
                              </div>
                            )}
                            {variant.border && (
                              <div>
                                <span className="text-muted-foreground">Border:</span>{' '}
                                <code>{variant.border}</code>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-6">
              <p className="text-muted-foreground">No component variants defined</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
