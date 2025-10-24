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
      <div className="border-b pb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {tokens.name}
        </h2>
        {tokens.description && (
          <p className="text-muted-foreground text-sm sm:text-base">{tokens.description}</p>
        )}
      </div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="colors" className="text-xs sm:text-sm">Colors</TabsTrigger>
          <TabsTrigger value="typography" className="text-xs sm:text-sm">Typography</TabsTrigger>
          <TabsTrigger value="spacing" className="text-xs sm:text-sm">Spacing</TabsTrigger>
          <TabsTrigger value="effects" className="text-xs sm:text-sm">Effects</TabsTrigger>
          <TabsTrigger value="components" className="text-xs sm:text-sm">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 mt-4">
          {Object.entries(tokens.colors).map(([key, value]) => {
            if (!value) return null

            if (key === 'semantic' && typeof value === 'object') {
              return (
                <Card key={key} className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4 capitalize text-sm sm:text-base">Semantic Colors</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(value).map(([semanticKey, semanticValue]) => {
                      if (!semanticValue || !isColorToken(semanticValue)) return null
                      return (
                        <div key={semanticKey} className="space-y-2">
                          <div
                            className="h-20 sm:h-24 rounded-lg border-2 border-border shadow-sm hover:shadow-md transition-shadow"
                            style={{ backgroundColor: semanticValue.hex }}
                          />
                          <div className="text-sm">
                            <div className="font-semibold capitalize">{semanticKey}</div>
                            <code className="text-xs text-muted-foreground">{semanticValue.hex}</code>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{semanticValue.usage}</p>
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
                <Card key={key} className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4 capitalize text-sm sm:text-base">{key}</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div 
                      className="h-24 w-24 sm:h-28 sm:w-28 rounded-lg border-2 border-border shadow-md flex-shrink-0" 
                      style={{ backgroundColor: value.hex }} 
                    />
                    <div className="flex-1">
                      <code className="text-sm sm:text-base font-mono font-semibold">{value.hex}</code>
                      <p className="text-sm text-muted-foreground mt-2">{value.usage}</p>
                    </div>
                  </div>
                </Card>
              )
            }

            if (isColorScale(value)) {
              return (
                <Card key={key} className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4 capitalize text-sm sm:text-base">{key} Scale</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {Object.entries(value).map(([scaleKey, scaleValue]) => (
                      <div key={scaleKey} className="space-y-2">
                        <div 
                          className="h-20 sm:h-24 rounded-lg border-2 border-border shadow-sm hover:shadow-md transition-shadow" 
                          style={{ backgroundColor: scaleValue }} 
                        />
                        <div className="text-sm">
                          <div className="font-semibold capitalize">{scaleKey}</div>
                          <code className="text-xs text-muted-foreground break-all">{scaleValue}</code>
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
          <Card className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-card to-muted/10">
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Base Font Family</h3>
              <div className="p-4 bg-muted/50 rounded-lg border">
                <p className="text-lg sm:text-xl font-medium" style={{ fontFamily: tokens.typography.baseFont }}>
                  {tokens.typography.baseFont}
                </p>
                <p className="text-sm text-muted-foreground mt-2" style={{ fontFamily: tokens.typography.baseFont }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Type Scale</h3>
              <div className="space-y-4">
                {Object.entries(tokens.typography.scale).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <Badge variant="secondary" className="w-fit sm:w-20">
                      {key}
                    </Badge>
                    <span 
                      className="flex-1 break-words" 
                      style={{ fontSize: `${value}px`, fontFamily: tokens.typography.baseFont }}
                    >
                      The quick brown fox
                    </span>
                    <code className="text-xs text-muted-foreground self-start sm:self-auto">{value}px</code>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Font Weights</h3>
              <div className="space-y-3">
                {Object.entries(tokens.typography.weights).map(([key, value]) => {
                  if (!value) return null
                  return (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                      <Badge variant="outline" className="w-fit sm:w-28 capitalize">
                        {key}
                      </Badge>
                      <span
                        className="flex-1"
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
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Spacing Scale</h3>
            <div className="space-y-4">
              {Object.entries(tokens.spacing).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="w-16 sm:w-20">
                      {key}
                    </Badge>
                    <code className="text-xs sm:text-sm text-muted-foreground">{value}px</code>
                  </div>
                  <div className="bg-accent/80 h-10 sm:h-12 rounded-md shadow-sm transition-all hover:shadow-md" style={{ width: `${Math.min(value, 400)}px` }} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4 mt-4">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Border Radius</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(tokens.radii).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div
                    className="h-24 sm:h-28 bg-gradient-to-br from-primary to-accent shadow-md hover:shadow-lg transition-shadow"
                    style={{ borderRadius: `${value === 9999 ? 9999 : value}px` }}
                  />
                  <div className="text-sm">
                    <Badge variant="outline" className="text-xs">{key}</Badge>
                    <code className="text-xs text-muted-foreground ml-2">
                      {value === 9999 ? 'full' : `${value}px`}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Shadows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(tokens.shadows).map(([key, value]) => {
                if (!value) return null
                return (
                  <div key={key} className="space-y-3">
                    <div className="h-32 sm:h-40 bg-card rounded-lg flex items-center justify-center border" style={{ boxShadow: value }}>
                      <Badge variant="secondary">{key}</Badge>
                    </div>
                    <div className="text-xs">
                      <code className="text-muted-foreground break-all bg-muted px-2 py-1 rounded">{value}</code>
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
                  <Card key={componentType} className="p-4 sm:p-6 bg-gradient-to-br from-card to-muted/10">
                    <h3 className="font-semibold mb-4 capitalize text-sm sm:text-base">{componentType} Variants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {variants.map((variant) => (
                        <div key={variant.name} className="p-4 border-2 rounded-lg space-y-3 hover:shadow-md transition-shadow bg-card">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="font-semibold">{variant.name}</Badge>
                          </div>
                          <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground w-24">Background:</span>
                              <code className="flex-1 bg-muted px-2 py-1 rounded">{variant.background}</code>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground w-24">Text Color:</span>
                              <code className="flex-1 bg-muted px-2 py-1 rounded">{variant.textColor}</code>
                            </div>
                            {variant.padding && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground w-24">Padding:</span>
                                <code className="flex-1 bg-muted px-2 py-1 rounded">{variant.padding}</code>
                              </div>
                            )}
                            {variant.border && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground w-24">Border:</span>
                                <code className="flex-1 bg-muted px-2 py-1 rounded">{variant.border}</code>
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
            <Card className="p-8 sm:p-12 bg-gradient-to-br from-card to-muted/10">
              <p className="text-muted-foreground text-center">No component variants defined in this design system</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
