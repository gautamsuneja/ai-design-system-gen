import { useState } from 'react'
import type { DesignTokens, ColorToken, ColorScale } from '@/types/design-tokens'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowsLeftRight, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface ComparisonViewProps {
  tokenSetA: DesignTokens
  tokenSetB: DesignTokens
  onClose: () => void
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

function ColorComparison({ labelA, labelB, colorA, colorB }: { 
  labelA: string
  labelB: string
  colorA: ColorToken | string
  colorB: ColorToken | string 
}) {
  const hexA = typeof colorA === 'string' ? colorA : colorA.hex
  const hexB = typeof colorB === 'string' ? colorB : colorB.hex
  const isDifferent = hexA !== hexB

  return (
    <div className={cn(
      "grid grid-cols-2 gap-4 p-3 rounded-lg transition-colors",
      isDifferent && "bg-accent/10 border border-accent/30"
    )}>
      <div className="space-y-2">
        <div
          className="h-16 rounded-md border-2 border-border shadow-sm"
          style={{ backgroundColor: hexA }}
        />
        <div className="text-xs">
          <div className="font-medium text-muted-foreground">{labelA}</div>
          <code className="text-xs">{hexA}</code>
          {typeof colorA === 'object' && colorA.usage && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{colorA.usage}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div
          className="h-16 rounded-md border-2 border-border shadow-sm"
          style={{ backgroundColor: hexB }}
        />
        <div className="text-xs">
          <div className="font-medium text-muted-foreground">{labelB}</div>
          <code className="text-xs">{hexB}</code>
          {typeof colorB === 'object' && colorB.usage && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{colorB.usage}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function DiffBadge({ isDifferent }: { isDifferent: boolean }) {
  if (!isDifferent) return null
  return (
    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-xs">
      Changed
    </Badge>
  )
}

export function ComparisonView({ tokenSetA, tokenSetB, onClose }: ComparisonViewProps) {
  const [activeTab, setActiveTab] = useState('colors')

  const compareColors = () => {
    const allColorKeys = new Set([
      ...Object.keys(tokenSetA.colors),
      ...Object.keys(tokenSetB.colors)
    ])

    return Array.from(allColorKeys).map(key => {
      const colorA = tokenSetA.colors[key]
      const colorB = tokenSetB.colors[key]
      
      if (!colorA && !colorB) return null

      return { key, colorA, colorB }
    }).filter(Boolean)
  }

  const compareTypographyScale = () => {
    const allScaleKeys = new Set([
      ...Object.keys(tokenSetA.typography.scale),
      ...Object.keys(tokenSetB.typography.scale)
    ])

    return Array.from(allScaleKeys).map(key => ({
      key,
      valueA: tokenSetA.typography.scale[key],
      valueB: tokenSetB.typography.scale[key],
      isDifferent: tokenSetA.typography.scale[key] !== tokenSetB.typography.scale[key]
    }))
  }

  const compareSpacing = () => {
    const allSpacingKeys = new Set([
      ...Object.keys(tokenSetA.spacing),
      ...Object.keys(tokenSetB.spacing)
    ])

    return Array.from(allSpacingKeys).map(key => ({
      key,
      valueA: tokenSetA.spacing[key],
      valueB: tokenSetB.spacing[key],
      isDifferent: tokenSetA.spacing[key] !== tokenSetB.spacing[key]
    }))
  }

  const compareRadii = () => {
    const allRadiiKeys = new Set([
      ...Object.keys(tokenSetA.radii),
      ...Object.keys(tokenSetB.radii)
    ])

    return Array.from(allRadiiKeys).map(key => ({
      key,
      valueA: tokenSetA.radii[key],
      valueB: tokenSetB.radii[key],
      isDifferent: tokenSetA.radii[key] !== tokenSetB.radii[key]
    }))
  }

  const compareShadows = () => {
    const allShadowKeys = new Set([
      ...Object.keys(tokenSetA.shadows),
      ...Object.keys(tokenSetB.shadows)
    ])

    return Array.from(allShadowKeys).map(key => ({
      key,
      valueA: tokenSetA.shadows[key],
      valueB: tokenSetB.shadows[key],
      isDifferent: tokenSetA.shadows[key] !== tokenSetB.shadows[key]
    }))
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ArrowsLeftRight size={28} weight="bold" className="text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">Compare Token Sets</h2>
              <p className="text-sm text-muted-foreground">
                Side-by-side comparison highlighting differences
              </p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X size={20} weight="bold" />
            Close
          </Button>
        </div>

        <Card className="p-6 mb-6 bg-gradient-to-r from-card to-muted/10">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <Badge variant="secondary" className="mb-2">Set A</Badge>
              <h3 className="text-lg font-semibold">{tokenSetA.name}</h3>
              {tokenSetA.description && (
                <p className="text-sm text-muted-foreground mt-1">{tokenSetA.description}</p>
              )}
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">Set B</Badge>
              <h3 className="text-lg font-semibold">{tokenSetB.name}</h3>
              {tokenSetB.description && (
                <p className="text-sm text-muted-foreground mt-1">{tokenSetB.description}</p>
              )}
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="colors" className="text-xs sm:text-sm">Colors</TabsTrigger>
            <TabsTrigger value="typography" className="text-xs sm:text-sm">Typography</TabsTrigger>
            <TabsTrigger value="spacing" className="text-xs sm:text-sm">Spacing</TabsTrigger>
            <TabsTrigger value="effects" className="text-xs sm:text-sm">Effects</TabsTrigger>
            <TabsTrigger value="components" className="text-xs sm:text-sm">Components</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-4">
            <ScrollArea className="h-[600px] rounded-lg border p-4">
              <div className="space-y-6">
                {compareColors().map((comparison) => {
                  if (!comparison) return null
                  const { key, colorA, colorB } = comparison

                  if (key === 'semantic' && typeof colorA === 'object' && typeof colorB === 'object') {
                    const allSemanticKeys = new Set([
                      ...Object.keys(colorA || {}),
                      ...Object.keys(colorB || {})
                    ])

                    return (
                      <Card key={key} className="p-4 bg-gradient-to-br from-card to-muted/10">
                        <h3 className="font-semibold mb-4 capitalize flex items-center gap-2">
                          Semantic Colors
                        </h3>
                        <div className="space-y-3">
                          {Array.from(allSemanticKeys).map(semanticKey => {
                            const semA = colorA?.[semanticKey]
                            const semB = colorB?.[semanticKey]
                            
                            if (!semA && !semB) return null
                            
                            return (
                              <ColorComparison
                                key={semanticKey}
                                labelA={tokenSetA.name}
                                labelB={tokenSetB.name}
                                colorA={semA || { hex: '#CCCCCC', usage: 'Not defined' }}
                                colorB={semB || { hex: '#CCCCCC', usage: 'Not defined' }}
                              />
                            )
                          })}
                        </div>
                      </Card>
                    )
                  }

                  if (isColorToken(colorA) && isColorToken(colorB)) {
                    return (
                      <Card key={key} className="p-4 bg-gradient-to-br from-card to-muted/10">
                        <h3 className="font-semibold mb-4 capitalize flex items-center gap-2">
                          {key}
                          <DiffBadge isDifferent={colorA.hex !== colorB.hex} />
                        </h3>
                        <ColorComparison
                          labelA={tokenSetA.name}
                          labelB={tokenSetB.name}
                          colorA={colorA}
                          colorB={colorB}
                        />
                      </Card>
                    )
                  }

                  if (isColorScale(colorA) && isColorScale(colorB)) {
                    const allScaleKeys = new Set([
                      ...Object.keys(colorA || {}),
                      ...Object.keys(colorB || {})
                    ])

                    return (
                      <Card key={key} className="p-4 bg-gradient-to-br from-card to-muted/10">
                        <h3 className="font-semibold mb-4 capitalize">{key} Scale</h3>
                        <div className="space-y-3">
                          {Array.from(allScaleKeys).map(scaleKey => {
                            const scaleA = colorA[scaleKey] || '#CCCCCC'
                            const scaleB = colorB[scaleKey] || '#CCCCCC'
                            
                            return (
                              <div key={scaleKey} className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">{scaleKey}</Badge>
                                  <DiffBadge isDifferent={scaleA !== scaleB} />
                                </div>
                                <ColorComparison
                                  labelA={tokenSetA.name}
                                  labelB={tokenSetB.name}
                                  colorA={scaleA}
                                  colorB={scaleB}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </Card>
                    )
                  }

                  return null
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="typography" className="mt-4">
            <ScrollArea className="h-[600px] rounded-lg border p-4">
              <div className="space-y-6">
                <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    Base Font Family
                    <DiffBadge isDifferent={tokenSetA.typography.baseFont !== tokenSetB.typography.baseFont} />
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm font-medium text-muted-foreground mb-2">{tokenSetA.name}</p>
                      <p className="text-lg font-medium" style={{ fontFamily: tokenSetA.typography.baseFont }}>
                        {tokenSetA.typography.baseFont}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm font-medium text-muted-foreground mb-2">{tokenSetB.name}</p>
                      <p className="text-lg font-medium" style={{ fontFamily: tokenSetB.typography.baseFont }}>
                        {tokenSetB.typography.baseFont}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4">Type Scale</h3>
                  <div className="space-y-3">
                    {compareTypographyScale().map(({ key, valueA, valueB, isDifferent }) => (
                      <div key={key} className={cn(
                        "p-3 rounded-lg",
                        isDifferent && "bg-accent/10 border border-accent/30"
                      )}>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="w-16">{key}</Badge>
                          <DiffBadge isDifferent={isDifferent} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span style={{ fontSize: `${valueA}px` }}>
                              {valueA ? 'The quick brown fox' : 'Not defined'}
                            </span>
                            <code className="text-xs text-muted-foreground block mt-1">
                              {valueA ? `${valueA}px` : 'N/A'}
                            </code>
                          </div>
                          <div>
                            <span style={{ fontSize: `${valueB}px` }}>
                              {valueB ? 'The quick brown fox' : 'Not defined'}
                            </span>
                            <code className="text-xs text-muted-foreground block mt-1">
                              {valueB ? `${valueB}px` : 'N/A'}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4">Font Weights</h3>
                  <div className="space-y-3">
                    {Object.keys({ ...tokenSetA.typography.weights, ...tokenSetB.typography.weights }).map(key => {
                      const weightA = tokenSetA.typography.weights[key]
                      const weightB = tokenSetB.typography.weights[key]
                      const isDifferent = weightA !== weightB

                      return (
                        <div key={key} className={cn(
                          "p-3 rounded-lg",
                          isDifferent && "bg-accent/10 border border-accent/30"
                        )}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="w-24 capitalize">{key}</Badge>
                            <DiffBadge isDifferent={isDifferent} />
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <span style={{ fontWeight: weightA }}>
                              {weightA ? `Weight ${weightA}` : 'Not defined'}
                            </span>
                            <span style={{ fontWeight: weightB }}>
                              {weightB ? `Weight ${weightB}` : 'Not defined'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="spacing" className="mt-4">
            <ScrollArea className="h-[600px] rounded-lg border p-4">
              <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                <h3 className="font-semibold mb-4">Spacing Scale</h3>
                <div className="space-y-4">
                  {compareSpacing().map(({ key, valueA, valueB, isDifferent }) => (
                    <div key={key} className={cn(
                      "p-3 rounded-lg space-y-3",
                      isDifferent && "bg-accent/10 border border-accent/30"
                    )}>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="w-16">{key}</Badge>
                        <DiffBadge isDifferent={isDifferent} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <code className="text-xs text-muted-foreground">
                            {valueA ? `${valueA}px` : 'N/A'}
                          </code>
                          <div 
                            className="bg-primary/80 h-10 rounded-md" 
                            style={{ width: valueA ? `${Math.min(valueA, 300)}px` : '0px' }} 
                          />
                        </div>
                        <div className="space-y-2">
                          <code className="text-xs text-muted-foreground">
                            {valueB ? `${valueB}px` : 'N/A'}
                          </code>
                          <div 
                            className="bg-accent/80 h-10 rounded-md" 
                            style={{ width: valueB ? `${Math.min(valueB, 300)}px` : '0px' }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="effects" className="mt-4">
            <ScrollArea className="h-[600px] rounded-lg border p-4">
              <div className="space-y-6">
                <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4">Border Radius</h3>
                  <div className="space-y-4">
                    {compareRadii().map(({ key, valueA, valueB, isDifferent }) => (
                      <div key={key} className={cn(
                        "p-3 rounded-lg",
                        isDifferent && "bg-accent/10 border border-accent/30"
                      )}>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">{key}</Badge>
                          <DiffBadge isDifferent={isDifferent} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div
                              className="h-20 bg-gradient-to-br from-primary to-primary/70 shadow-md"
                              style={{ borderRadius: valueA === 9999 ? '9999px' : `${valueA}px` }}
                            />
                            <code className="text-xs text-muted-foreground">
                              {valueA ? (valueA === 9999 ? 'full' : `${valueA}px`) : 'N/A'}
                            </code>
                          </div>
                          <div className="space-y-2">
                            <div
                              className="h-20 bg-gradient-to-br from-accent to-accent/70 shadow-md"
                              style={{ borderRadius: valueB === 9999 ? '9999px' : `${valueB}px` }}
                            />
                            <code className="text-xs text-muted-foreground">
                              {valueB ? (valueB === 9999 ? 'full' : `${valueB}px`) : 'N/A'}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                  <h3 className="font-semibold mb-4">Shadows</h3>
                  <div className="space-y-4">
                    {compareShadows().map(({ key, valueA, valueB, isDifferent }) => (
                      <div key={key} className={cn(
                        "p-3 rounded-lg",
                        isDifferent && "bg-accent/10 border border-accent/30"
                      )}>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">{key}</Badge>
                          <DiffBadge isDifferent={isDifferent} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div 
                              className="h-32 bg-card rounded-lg flex items-center justify-center border"
                              style={{ boxShadow: valueA || 'none' }}
                            >
                              <Badge variant="secondary">{tokenSetA.name}</Badge>
                            </div>
                            <code className="text-xs text-muted-foreground break-all bg-muted px-2 py-1 rounded block">
                              {valueA || 'N/A'}
                            </code>
                          </div>
                          <div className="space-y-2">
                            <div 
                              className="h-32 bg-card rounded-lg flex items-center justify-center border"
                              style={{ boxShadow: valueB || 'none' }}
                            >
                              <Badge variant="secondary">{tokenSetB.name}</Badge>
                            </div>
                            <code className="text-xs text-muted-foreground break-all bg-muted px-2 py-1 rounded block">
                              {valueB || 'N/A'}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="components" className="mt-4">
            <ScrollArea className="h-[600px] rounded-lg border p-4">
              {tokenSetA.componentVariants || tokenSetB.componentVariants ? (
                <div className="space-y-6">
                  {Object.keys({ 
                    ...(tokenSetA.componentVariants || {}), 
                    ...(tokenSetB.componentVariants || {}) 
                  }).map(componentType => {
                    const variantsA = tokenSetA.componentVariants?.[componentType] || []
                    const variantsB = tokenSetB.componentVariants?.[componentType] || []

                    return (
                      <Card key={componentType} className="p-4 bg-gradient-to-br from-card to-muted/10">
                        <h3 className="font-semibold mb-4 capitalize">{componentType} Variants</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">{tokenSetA.name}</p>
                            {variantsA.length > 0 ? (
                              variantsA.map((variant) => (
                                <div key={variant.name} className="p-3 border-2 rounded-lg space-y-2 bg-card">
                                  <Badge variant="secondary" className="font-semibold text-xs">{variant.name}</Badge>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex gap-2">
                                      <span className="text-muted-foreground w-20">BG:</span>
                                      <code className="flex-1 bg-muted px-1 rounded">{variant.background}</code>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="text-muted-foreground w-20">Text:</span>
                                      <code className="flex-1 bg-muted px-1 rounded">{variant.textColor}</code>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No variants</p>
                            )}
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">{tokenSetB.name}</p>
                            {variantsB.length > 0 ? (
                              variantsB.map((variant) => (
                                <div key={variant.name} className="p-3 border-2 rounded-lg space-y-2 bg-card">
                                  <Badge variant="secondary" className="font-semibold text-xs">{variant.name}</Badge>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex gap-2">
                                      <span className="text-muted-foreground w-20">BG:</span>
                                      <code className="flex-1 bg-muted px-1 rounded">{variant.background}</code>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="text-muted-foreground w-20">Text:</span>
                                      <code className="flex-1 bg-muted px-1 rounded">{variant.textColor}</code>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No variants</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card className="p-12 bg-gradient-to-br from-card to-muted/10">
                  <p className="text-muted-foreground text-center">
                    No component variants defined in either design system
                  </p>
                </Card>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
