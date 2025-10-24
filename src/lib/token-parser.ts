import type { DesignTokens, ColorToken, ColorScale } from '@/types/design-tokens'

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

function isColorToken(value: any): value is ColorToken {
  return (
    value &&
    typeof value === 'object' &&
    'hex' in value &&
    typeof value.hex === 'string' &&
    'usage' in value &&
    typeof value.usage === 'string'
  )
}

function isColorScale(value: any): value is ColorScale {
  return (
    value &&
    typeof value === 'object' &&
    Object.values(value).every((v) => typeof v === 'string' && isValidHex(v))
  )
}

export function validateDesignTokens(tokens: any): ValidationResult {
  const errors: ValidationError[] = []

  if (!tokens || typeof tokens !== 'object') {
    return {
      valid: false,
      errors: [{ field: 'root', message: 'Tokens must be an object' }],
    }
  }

  if (!tokens.name || typeof tokens.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required and must be a string' })
  }

  if (!tokens.colors || typeof tokens.colors !== 'object') {
    errors.push({ field: 'colors', message: 'Colors object is required' })
  } else {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (key === 'semantic' && value && typeof value === 'object') {
        Object.entries(value).forEach(([semanticKey, semanticValue]) => {
          if (semanticValue && !isColorToken(semanticValue)) {
            errors.push({
              field: `colors.semantic.${semanticKey}`,
              message: 'Must be a valid color token with hex and usage',
            })
          } else if (semanticValue && isColorToken(semanticValue) && !isValidHex(semanticValue.hex)) {
            errors.push({
              field: `colors.semantic.${semanticKey}.hex`,
              message: 'Must be a valid hex color',
            })
          }
        })
      } else if (value && !isColorToken(value) && !isColorScale(value)) {
        errors.push({
          field: `colors.${key}`,
          message: 'Must be a valid color token or color scale',
        })
      } else if (value && isColorToken(value) && !isValidHex(value.hex)) {
        errors.push({
          field: `colors.${key}.hex`,
          message: 'Must be a valid hex color',
        })
      }
    })
  }

  if (!tokens.typography || typeof tokens.typography !== 'object') {
    errors.push({ field: 'typography', message: 'Typography object is required' })
  } else {
    if (!tokens.typography.baseFont || typeof tokens.typography.baseFont !== 'string') {
      errors.push({ field: 'typography.baseFont', message: 'Base font is required' })
    }
    if (!tokens.typography.scale || typeof tokens.typography.scale !== 'object') {
      errors.push({ field: 'typography.scale', message: 'Typography scale is required' })
    }
    if (!tokens.typography.weights || typeof tokens.typography.weights !== 'object') {
      errors.push({ field: 'typography.weights', message: 'Typography weights are required' })
    }
  }

  if (!tokens.spacing || typeof tokens.spacing !== 'object') {
    errors.push({ field: 'spacing', message: 'Spacing object is required' })
  }

  if (!tokens.radii || typeof tokens.radii !== 'object') {
    errors.push({ field: 'radii', message: 'Radii object is required' })
  }

  if (!tokens.shadows || typeof tokens.shadows !== 'object') {
    errors.push({ field: 'shadows', message: 'Shadows object is required' })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function parseTokensFromText(text: string): DesignTokens {
  let cleanText = text.trim()

  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/^```json\n?/, '').replace(/\n?```$/, '')
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```\n?/, '').replace(/\n?```$/, '')
  }

  const parsed = JSON.parse(cleanText)
  const validation = validateDesignTokens(parsed)

  if (!validation.valid) {
    throw new Error(
      `Invalid token structure: ${validation.errors.map((e) => `${e.field}: ${e.message}`).join(', ')}`
    )
  }

  return parsed as DesignTokens
}

export function tokensToJSON(tokens: DesignTokens, pretty: boolean = true): string {
  return JSON.stringify(tokens, null, pretty ? 2 : 0)
}

export function tokensToCSS(tokens: DesignTokens): string {
  const lines: string[] = [':root {']

  const addColor = (name: string, hex: string) => {
    lines.push(`  --color-${name}: ${hex};`)
  }

  if (tokens.colors.primary && isColorToken(tokens.colors.primary)) {
    addColor('primary', tokens.colors.primary.hex)
  }
  if (tokens.colors.secondary && isColorToken(tokens.colors.secondary)) {
    addColor('secondary', tokens.colors.secondary.hex)
  }
  if (tokens.colors.accent && isColorToken(tokens.colors.accent)) {
    addColor('accent', tokens.colors.accent.hex)
  }

  if (tokens.colors.neutral && isColorScale(tokens.colors.neutral)) {
    Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
      addColor(`neutral-${key}`, value)
    })
  }

  if (tokens.colors.semantic) {
    Object.entries(tokens.colors.semantic).forEach(([key, value]) => {
      if (value && isColorToken(value)) {
        addColor(key, value.hex)
      }
    })
  }

  lines.push('')
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lines.push(`  --spacing-${key}: ${value}px;`)
  })

  lines.push('')
  Object.entries(tokens.radii).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value}px;`)
  })

  lines.push('')
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    lines.push(`  --shadow-${key}: ${value};`)
  })

  lines.push('')
  if (tokens.typography.baseFont) {
    lines.push(`  --font-base: ${tokens.typography.baseFont};`)
  }

  Object.entries(tokens.typography.scale).forEach(([key, value]) => {
    lines.push(`  --font-size-${key}: ${value}px;`)
  })

  Object.entries(tokens.typography.weights).forEach(([key, value]) => {
    if (value) {
      lines.push(`  --font-weight-${key}: ${value};`)
    }
  })

  if (tokens.typography.lineHeights) {
    Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
      if (value) {
        lines.push(`  --line-height-${key}: ${value};`)
      }
    })
  }

  lines.push('}')
  return lines.join('\n')
}

export function downloadFile(content: string, filename: string, mimeType: string = 'application/json') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
