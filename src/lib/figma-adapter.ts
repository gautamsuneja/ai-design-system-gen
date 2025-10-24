import type { DesignTokens, ColorToken } from '@/types/design-tokens'

export interface FigmaPushOptions {
  tokens: DesignTokens;
  figmaToken: string;
  fileKey?: string;
}

export interface FigmaPushResult {
  success: boolean;
  fileUrl?: string;
  createdStyles: string[];
  error?: string;
}

function isColorToken(value: any): value is ColorToken {
  return (
    value &&
    typeof value === 'object' &&
    'hex' in value &&
    typeof value.hex === 'string'
  )
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`)
  }
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  }
}

export async function pushToFigma(options: FigmaPushOptions): Promise<FigmaPushResult> {
  const { tokens, figmaToken, fileKey } = options
  const createdStyles: string[] = []

  try {
    let targetFileKey = fileKey

    if (!targetFileKey) {
      const createFileResponse = await fetch('https://api.figma.com/v1/files', {
        method: 'POST',
        headers: {
          'X-Figma-Token': figmaToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${tokens.name} - Design System`,
        }),
      })

      if (!createFileResponse.ok) {
        const errorText = await createFileResponse.text()
        throw new Error(`Failed to create Figma file: ${errorText}`)
      }

      const createFileData = await createFileResponse.json()
      targetFileKey = createFileData.key
      createdStyles.push(`Created new file: ${tokens.name}`)
    }

    const fileUrl = `https://www.figma.com/file/${targetFileKey}`

    const getFileResponse = await fetch(`https://api.figma.com/v1/files/${targetFileKey}`, {
      headers: {
        'X-Figma-Token': figmaToken,
      },
    })

    if (!getFileResponse.ok) {
      throw new Error(`Failed to access Figma file: ${await getFileResponse.text()}`)
    }

    if (tokens.colors.primary && isColorToken(tokens.colors.primary)) {
      try {
        const rgb = hexToRgb(tokens.colors.primary.hex)
        const styleResponse = await fetch(`https://api.figma.com/v1/files/${targetFileKey}/styles`, {
          method: 'POST',
          headers: {
            'X-Figma-Token': figmaToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Primary',
            style_type: 'FILL',
            description: tokens.colors.primary.usage,
            fills: [
              {
                type: 'SOLID',
                color: rgb,
              },
            ],
          }),
        })

        if (styleResponse.ok) {
          createdStyles.push('Primary color style')
        }
      } catch (err) {
        console.error('Error creating primary color:', err)
      }
    }

    if (tokens.colors.secondary && isColorToken(tokens.colors.secondary)) {
      try {
        const rgb = hexToRgb(tokens.colors.secondary.hex)
        await fetch(`https://api.figma.com/v1/files/${targetFileKey}/styles`, {
          method: 'POST',
          headers: {
            'X-Figma-Token': figmaToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Secondary',
            style_type: 'FILL',
            description: tokens.colors.secondary.usage,
            fills: [
              {
                type: 'SOLID',
                color: rgb,
              },
            ],
          }),
        })
        createdStyles.push('Secondary color style')
      } catch (err) {
        console.error('Error creating secondary color:', err)
      }
    }

    return {
      success: true,
      fileUrl,
      createdStyles,
    }
  } catch (error) {
    return {
      success: false,
      createdStyles,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export function validateFigmaToken(token: string): boolean {
  return token.length > 0 && token.startsWith('figd_')
}

export function getFigmaInstructions(): string {
  return `To push tokens to Figma:

1. Get a Personal Access Token:
   - Go to Figma Settings > Account > Personal Access Tokens
   - Click "Generate new token"
   - Give it a descriptive name (e.g., "Design System Generator")
   - Copy the token (starts with "figd_")

2. Required scopes:
   - File content: Read and write

3. Optional: Provide a File Key
   - Open a Figma file and copy the file key from the URL
   - Format: figma.com/file/{FILE_KEY}/...
   - If not provided, a new file will be created

Note: Your token is never stored and only used for this operation.`
}
