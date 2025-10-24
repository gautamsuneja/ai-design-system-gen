import type { DesignTokens } from '@/types/design-tokens'

const SYSTEM_PROMPT = `You are a design system expert. Generate a complete design token system based on the user's prompt.

CRITICAL REQUIREMENTS:
1. Respond ONLY with valid, well-formed JSON
2. All strings must be properly closed with matching quotes
3. All braces and brackets must be properly balanced
4. Do not include markdown code blocks, explanations, or any text outside the JSON object
5. Ensure the entire JSON object is complete and valid

Required schema:
{
  "name": "string (system name)",
  "description": "string (brief description)",
  "colors": {
    "primary": { "hex": "#RRGGBB", "usage": "description" },
    "secondary": { "hex": "#RRGGBB", "usage": "description" },
    "accent": { "hex": "#RRGGBB", "usage": "description" },
    "neutral": {
      "50": "#FAFAFA",
      "100": "#F5F5F5",
      "200": "#E5E5E5",
      "300": "#D4D4D4",
      "400": "#A3A3A3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717"
    },
    "semantic": {
      "success": { "hex": "#RRGGBB", "usage": "success states" },
      "warning": { "hex": "#RRGGBB", "usage": "warning states" },
      "error": { "hex": "#RRGGBB", "usage": "error states" },
      "info": { "hex": "#RRGGBB", "usage": "info states" }
    }
  },
  "typography": {
    "baseFont": "Font Name, fallback, sans-serif",
    "scale": {
      "xs": 12,
      "sm": 14,
      "md": 16,
      "lg": 20,
      "xl": 24,
      "2xl": 30,
      "3xl": 36
    },
    "weights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "lineHeights": {
      "tight": 1.25,
      "normal": 1.5,
      "relaxed": 1.75
    }
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "2xl": 48,
    "3xl": 64
  },
  "radii": {
    "sm": 4,
    "md": 8,
    "lg": 12,
    "xl": 16,
    "full": 9999
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  },
  "componentVariants": {
    "button": [
      {
        "name": "primary",
        "background": "primary",
        "textColor": "#ffffff",
        "padding": "md",
        "border": "none",
        "hover": {
          "background": "#adjusted-primary-color"
        }
      },
      {
        "name": "secondary",
        "background": "secondary",
        "textColor": "#ffffff",
        "padding": "md"
      },
      {
        "name": "ghost",
        "background": "transparent",
        "textColor": "primary",
        "padding": "md",
        "border": "1px solid neutral.200"
      }
    ],
    "input": [
      {
        "name": "default",
        "background": "#ffffff",
        "textColor": "neutral.900",
        "padding": "sm",
        "border": "1px solid neutral.300"
      }
    ]
  }
}

Guidelines:
1. All hex colors must be valid 6-digit hex codes with #
2. Choose colors that work well together and meet accessibility standards
3. Neutral scale should progress from light (50) to dark (900)
4. Typography scale should be harmonious (consider 1.25 or 1.333 ratio)
5. Spacing should follow a consistent scale (4px, 8px, 16px, etc.)
6. Component variants should reference colors from the palette
7. Ensure semantic colors are distinct and appropriate for their purpose
8. Font suggestions should be realistic Google Fonts or system fonts`

export interface AIGenerateOptions {
  prompt: string;
  model?: string;
}

function cleanJsonResponse(response: string): string {
  let cleaned = response.trim()
  
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  
  cleaned = cleaned.trim()
  
  const jsonStart = cleaned.indexOf('{')
  const jsonEnd = cleaned.lastIndexOf('}')
  
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    cleaned = cleaned.substring(jsonStart, jsonEnd + 1)
  }
  
  return cleaned
}

function validateJsonStructure(json: string): boolean {
  let braceCount = 0
  let bracketCount = 0
  let inString = false
  let escapeNext = false
  
  for (let i = 0; i < json.length; i++) {
    const char = json[i]
    
    if (escapeNext) {
      escapeNext = false
      continue
    }
    
    if (char === '\\') {
      escapeNext = true
      continue
    }
    
    if (char === '"' && !escapeNext) {
      inString = !inString
      continue
    }
    
    if (!inString) {
      if (char === '{') braceCount++
      if (char === '}') braceCount--
      if (char === '[') bracketCount++
      if (char === ']') bracketCount--
    }
  }
  
  return braceCount === 0 && bracketCount === 0 && !inString
}

export async function generateTokensWithAI(
  options: AIGenerateOptions,
  retryCount = 0
): Promise<{ tokens: DesignTokens; rawOutput: string }> {
  const { prompt, model = 'gpt-4o' } = options
  const maxRetries = 2

  const fullPrompt = `${SYSTEM_PROMPT}

User prompt: ${prompt}

Remember: Return ONLY the complete, valid JSON object with all strings properly terminated.`

  try {
    const response = await window.spark.llm(fullPrompt, model, true)

    try {
      const cleanedResponse = cleanJsonResponse(response)
      
      if (!validateJsonStructure(cleanedResponse)) {
        throw new Error('INVALID_JSON_STRUCTURE')
      }
      
      const tokens = JSON.parse(cleanedResponse) as DesignTokens
      
      if (!tokens.name || !tokens.colors || !tokens.typography || !tokens.spacing) {
        throw new Error('Invalid token structure: missing required fields')
      }
      
      return {
        tokens,
        rawOutput: response,
      }
    } catch (parseError) {
      console.error('Failed to parse AI response (attempt ' + (retryCount + 1) + '):', response.substring(0, 500))
      console.error('Parse error:', parseError)
      
      if (retryCount < maxRetries) {
        console.log('Retrying AI generation...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        return generateTokensWithAI(options, retryCount + 1)
      }
      
      if (parseError instanceof Error && parseError.message.includes('INVALID_JSON_STRUCTURE')) {
        throw new Error('The AI response contained malformed JSON with unterminated strings or mismatched braces. Automatic retry failed. Please try generating again.')
      }
      
      if (parseError instanceof Error && parseError.message.includes('unterminated string')) {
        throw new Error('The AI response contained malformed JSON with unterminated strings. Automatic retry failed. Please try generating again.')
      }
      
      throw new Error(`Failed to parse AI response after ${maxRetries + 1} attempts: ${parseError instanceof Error ? parseError.message : 'Unknown error'}. Please try generating again.`)
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Failed to parse AI response')) {
      throw error
    }
    
    console.error('AI generation error:', error)
    throw new Error(`Failed to generate tokens: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
