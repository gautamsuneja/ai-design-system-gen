# AI Prompt Examples

This file contains example prompts and their expected outputs for the AI Design System Generator.

## Example 1: Modern SaaS Dashboard

**Prompt:**
```
Create a modern SaaS dashboard design system with blue primary color, professional typography, and clean spacing. Include button and input variants.
```

**Expected Output Structure:**
```json
{
  "name": "Modern SaaS Dashboard",
  "description": "A clean, professional design system for dashboard applications",
  "colors": {
    "primary": {
      "hex": "#2563EB",
      "usage": "Primary actions, links, and key UI elements"
    },
    "secondary": {
      "hex": "#475569",
      "usage": "Secondary actions and supporting elements"
    },
    "accent": {
      "hex": "#06B6D4",
      "usage": "Highlights, badges, and call-to-attention elements"
    },
    "neutral": {
      "50": "#F8FAFC",
      "100": "#F1F5F9",
      "200": "#E2E8F0",
      "300": "#CBD5E1",
      "400": "#94A3B8",
      "500": "#64748B",
      "600": "#475569",
      "700": "#334155",
      "800": "#1E293B",
      "900": "#0F172A"
    },
    "semantic": {
      "success": {
        "hex": "#10B981",
        "usage": "Success states and positive feedback"
      },
      "warning": {
        "hex": "#F59E0B",
        "usage": "Warning states and caution indicators"
      },
      "error": {
        "hex": "#EF4444",
        "usage": "Error states and destructive actions"
      },
      "info": {
        "hex": "#3B82F6",
        "usage": "Informational messages and tips"
      }
    }
  },
  "typography": {
    "baseFont": "Inter, system-ui, -apple-system, sans-serif",
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
        "background": "#2563EB",
        "textColor": "#ffffff",
        "padding": "md",
        "border": "none",
        "hover": {
          "background": "#1D4ED8"
        }
      },
      {
        "name": "secondary",
        "background": "#475569",
        "textColor": "#ffffff",
        "padding": "md",
        "border": "none"
      },
      {
        "name": "ghost",
        "background": "transparent",
        "textColor": "#2563EB",
        "padding": "md",
        "border": "1px solid #E2E8F0",
        "hover": {
          "background": "#F8FAFC"
        }
      }
    ],
    "input": [
      {
        "name": "default",
        "background": "#ffffff",
        "textColor": "#0F172A",
        "padding": "sm",
        "border": "1px solid #CBD5E1"
      }
    ]
  }
}
```

## Example 2: Nature E-commerce

**Prompt:**
```
Design tokens for a nature-themed e-commerce website. Use earthy tones, warm colors, and organic feeling with rounded corners.
```

**Expected Output Structure:**
```json
{
  "name": "Nature E-commerce",
  "description": "Warm, earthy design system for organic products",
  "colors": {
    "primary": {
      "hex": "#059669",
      "usage": "Primary actions and product highlights"
    },
    "secondary": {
      "hex": "#92400E",
      "usage": "Secondary elements and earth tones"
    },
    "accent": {
      "hex": "#F59E0B",
      "usage": "Accents, badges, and warm highlights"
    },
    "neutral": {
      "50": "#FAFAF9",
      "100": "#F5F5F4",
      "200": "#E7E5E4",
      "300": "#D6D3D1",
      "400": "#A8A29E",
      "500": "#78716C",
      "600": "#57534E",
      "700": "#44403C",
      "800": "#292524",
      "900": "#1C1917"
    },
    "semantic": {
      "success": {
        "hex": "#059669",
        "usage": "Order success and positive feedback"
      },
      "warning": {
        "hex": "#D97706",
        "usage": "Stock warnings and alerts"
      },
      "error": {
        "hex": "#DC2626",
        "usage": "Errors and out of stock"
      },
      "info": {
        "hex": "#0891B2",
        "usage": "Product information and tips"
      }
    }
  },
  "typography": {
    "baseFont": "Lora, Georgia, serif",
    "scale": {
      "xs": 12,
      "sm": 14,
      "md": 16,
      "lg": 20,
      "xl": 28,
      "2xl": 36,
      "3xl": 48
    },
    "weights": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "lineHeights": {
      "tight": 1.25,
      "normal": 1.6,
      "relaxed": 1.8
    }
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 40,
    "2xl": 56,
    "3xl": 80
  },
  "radii": {
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32,
    "full": 9999
  },
  "shadows": {
    "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    "md": "0 4px 8px -2px rgba(0, 0, 0, 0.15)",
    "lg": "0 12px 24px -4px rgba(0, 0, 0, 0.15)",
    "xl": "0 24px 48px -8px rgba(0, 0, 0, 0.18)"
  },
  "componentVariants": {
    "button": [
      {
        "name": "primary",
        "background": "#059669",
        "textColor": "#ffffff",
        "padding": "lg",
        "border": "none",
        "hover": {
          "background": "#047857"
        }
      },
      {
        "name": "secondary",
        "background": "#F59E0B",
        "textColor": "#ffffff",
        "padding": "lg",
        "border": "none"
      },
      {
        "name": "outline",
        "background": "transparent",
        "textColor": "#059669",
        "padding": "lg",
        "border": "2px solid #059669",
        "hover": {
          "background": "#ECFDF5"
        }
      }
    ],
    "input": [
      {
        "name": "default",
        "background": "#FAFAF9",
        "textColor": "#1C1917",
        "padding": "md",
        "border": "1px solid #D6D3D1"
      }
    ]
  }
}
```

## System Prompt Used

The AI is instructed with this system prompt:

```
You are a design system expert. Generate a complete design token system based on the user's prompt.

CRITICAL: Respond ONLY with valid JSON. Do not include markdown code blocks, explanations, or any text outside the JSON object.

[Full schema details...]

Guidelines:
1. All hex colors must be valid 6-digit hex codes with #
2. Choose colors that work well together and meet accessibility standards
3. Neutral scale should progress from light (50) to dark (900)
4. Typography scale should be harmonious (consider 1.25 or 1.333 ratio)
5. Spacing should follow a consistent scale (4px, 8px, 16px, etc.)
6. Component variants should reference colors from the palette
7. Ensure semantic colors are distinct and appropriate for their purpose
8. Font suggestions should be realistic Google Fonts or system fonts
```

## Tips for Effective Prompts

1. **Be Specific About Color**: Mention specific colors or color families
2. **Describe the Mood**: Use adjectives like "professional", "playful", "elegant"
3. **Mention Use Case**: "dashboard", "e-commerce", "blog", etc.
4. **Specify Typography Preferences**: "modern sans-serif", "serif fonts", "monospace"
5. **Include Special Requirements**: "dark mode", "high contrast", "rounded corners"

## Invalid Prompts (What to Avoid)

❌ Too vague: "Make something nice"
❌ Too complex: "Create 50 different color variations with complex gradients"
❌ Unrealistic: "Use the exact Pantone 2023 color of the year"
❌ Non-design requests: "Build me a website"

## Valid Prompts (What Works Well)

✅ "Minimalist portfolio with black, white, and blue accent"
✅ "Colorful children's learning app with rounded corners"
✅ "Corporate banking dashboard with conservative blue tones"
✅ "Health and wellness app with calming greens and blues"
