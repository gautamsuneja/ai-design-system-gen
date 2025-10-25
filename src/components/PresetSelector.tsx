import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DESIGN_PRESETS, type DesignPreset } from '@/lib/design-presets'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Check } from '@phosphor-icons/react'

interface PresetSelectorProps {
  onSelectPreset: (preset: DesignPreset) => void
}

export function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          ✨ Use a Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Design System Templates</DialogTitle>
          <DialogDescription>
            Start with a professional design system template and customize as needed
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {DESIGN_PRESETS.map((preset) => (
            <Card
              key={preset.id}
              className="p-4 hover:border-primary transition-colors cursor-pointer group"
              onClick={() => onSelectPreset(preset)}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{preset.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {preset.category}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{preset.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {preset.tokens.colors.primary && (
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: preset.tokens.colors.primary.hex }}
                      title={preset.tokens.colors.primary.hex}
                    />
                  )}
                  {preset.tokens.colors.secondary && (
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: preset.tokens.colors.secondary.hex }}
                      title={preset.tokens.colors.secondary.hex}
                    />
                  )}
                  {preset.tokens.colors.semantic?.success && (
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: preset.tokens.colors.semantic.success.hex }}
                      title={preset.tokens.colors.semantic.success.hex}
                    />
                  )}
                  {preset.tokens.colors.semantic?.warning && (
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: preset.tokens.colors.semantic.warning.hex }}
                      title={preset.tokens.colors.semantic.warning.hex}
                    />
                  )}
                  {preset.tokens.colors.semantic?.error && (
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: preset.tokens.colors.semantic.error.hex }}
                      title={preset.tokens.colors.semantic.error.hex}
                    />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Check className="mr-2" weight="bold" />
                  Use This Template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
