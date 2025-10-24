# AI Design System Generator

A professional tool that transforms natural language prompts into production-ready design tokens and optionally syncs them to Figma via the Figma REST API.

![AI Design System Generator](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=AI+Design+System+Generator)

## Features

- 🤖 **AI-Powered Generation** - Convert natural language descriptions into structured design tokens
- 🎨 **Visual Preview** - Interactive preview of colors, typography, spacing, and component variants
- 📦 **Multiple Export Formats** - Download as JSON or CSS custom properties
- 🔗 **Figma Integration** - Push tokens directly to Figma as styles and components
- 💾 **Auto-Caching** - Automatically saves your last generation for easy recovery
- 🔒 **Privacy-First** - No data storage, tokens processed in-memory only

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (for AI generation)
- Figma Personal Access Token (optional, for Figma integration)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

This application uses the Spark runtime SDK which handles AI calls through the `spark.llm` API. No environment variables are needed for local development.

For Figma integration, users provide their Personal Access Token through the UI at runtime (never stored).

## Usage

### 1. Generate Design Tokens

Enter a natural language prompt describing your design system:

```
"Create a modern SaaS dashboard design system with blue primary color"
```

Click **Generate Tokens** and the AI will create a complete design token system.

### 2. Preview Tokens

Explore generated tokens across five categories:
- **Colors** - Primary, secondary, accent, semantic, and neutral scales
- **Typography** - Font families, type scale, and weights
- **Spacing** - Consistent spacing scale
- **Effects** - Border radius and shadows
- **Components** - Button and input variants

### 3. Export Options

#### JSON Export
Download structured JSON file for use in any design system pipeline:

```bash
# Downloaded file: my-design-system-tokens.json
```

#### CSS Variables Export
Generate ready-to-use CSS custom properties:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #475569;
  --spacing-md: 16px;
  /* ... more tokens */
}
```

### 4. Push to Figma

**Get Figma Personal Access Token:**
1. Go to Figma Settings → Account → Personal Access Tokens
2. Click "Generate new token"
3. Copy the token (starts with `figd_`)

**Push Tokens:**
1. Paste your Figma token in the "Personal Access Token" field
2. (Optional) Enter a Figma file key to update an existing file
3. Click "Push to Figma"

Your tokens will be created as Figma color styles and the file will open automatically.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         React UI                             │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │ Prompt Input   │  │ Token Preview│  │ Export Controls │ │
│  └────────┬───────┘  └──────┬───────┘  └────────┬────────┘ │
└───────────┼──────────────────┼──────────────────┼──────────┘
            │                  │                   │
            ▼                  ▼                   ▼
   ┌────────────────┐ ┌───────────────┐  ┌──────────────────┐
   │  AI Adapter    │ │ Token Parser  │  │  Figma Adapter   │
   │  (spark.llm)   │ │  & Validator  │  │  (REST API)      │
   └────────────────┘ └───────────────┘  └──────────────────┘
            │                  │                   │
            ▼                  ▼                   ▼
   ┌────────────────────────────────────────────────────────┐
   │              Design Token JSON Schema                   │
   └────────────────────────────────────────────────────────┘
```

## Project Structure

```
src/
├── components/
│   ├── GeneratorInterface.tsx  # Main UI component
│   ├── TokenPreview.tsx        # Visual token display
│   └── ui/                     # Shadcn components
├── lib/
│   ├── ai-adapter.ts           # AI generation logic
│   ├── token-parser.ts         # Validation & export
│   ├── figma-adapter.ts        # Figma API integration
│   └── utils.ts                # Utilities
├── types/
│   └── design-tokens.ts        # TypeScript definitions
├── App.tsx                     # Root component
└── index.css                   # Theme and styles
```

## Development

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

### Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI**: Shadcn UI v4, Tailwind CSS v4
- **AI**: Spark LLM SDK (GPT-4)
- **State**: React hooks + Spark KV storage
- **Icons**: Phosphor Icons

## Design Token Schema

```typescript
interface DesignTokens {
  name: string;
  description?: string;
  colors: {
    primary?: ColorToken;
    secondary?: ColorToken;
    accent?: ColorToken;
    neutral?: ColorScale;
    semantic?: {
      success?: ColorToken;
      warning?: ColorToken;
      error?: ColorToken;
      info?: ColorToken;
    };
  };
  typography: {
    baseFont: string;
    scale: { xs: number; sm: number; md: number; /* ... */ };
    weights: { regular: number; bold: number; /* ... */ };
    lineHeights?: { tight: number; normal: number; /* ... */ };
  };
  spacing: { xs: number; sm: number; md: number; /* ... */ };
  radii: { sm: number; md: number; lg: number; /* ... */ };
  shadows: { sm: string; md: string; /* ... */ };
  componentVariants?: {
    button?: ComponentVariant[];
    input?: ComponentVariant[];
  };
}
```

See full schema in `src/types/design-tokens.ts`

## Privacy & Security

This application follows strict privacy guidelines:

- ✅ **No Server Storage** - All data processed in browser or in-memory
- ✅ **No Token Persistence** - Figma tokens never saved to disk
- ✅ **Transparent Processing** - Clear indication when data is being sent to external APIs
- ✅ **User Control** - You control all exports and integrations

Read our full [Privacy Policy](./PRIVACY.md)

## Figma API Scopes

Required Figma API scopes for full functionality:

- `file:read` - Read file structure
- `file:write` - Create and modify files
- `file_styles:write` - Create color and text styles

## Example Prompts

```
"Modern SaaS dashboard with blue primary and professional typography"

"E-commerce site with warm, earthy tones and rounded corners"

"Dark mode finance app with green accents and monospace fonts"

"Playful children's education platform with bright primary colors"

"Minimalist portfolio with black, white, and one accent color"
```

## Troubleshooting

### AI Generation Fails

- Check that you have internet connectivity
- Try simplifying your prompt
- Ensure your prompt is clear and descriptive

### Figma Push Fails

- Verify your Personal Access Token is correct and starts with `figd_`
- Check token has required scopes (file content read/write)
- If using a file key, ensure you have edit access to that file
- Try creating a new file instead (leave file key empty)

### Invalid Token Structure

The app validates all generated tokens. If you see validation errors:
- Try regenerating with a more specific prompt
- Check the error details in the alert message
- Report persistent issues with your prompt as feedback

## Contributing

This is a production-ready MVP. Future enhancements could include:

- [ ] Support for additional AI providers (Claude, Gemini)
- [ ] Advanced Figma component generation
- [ ] Design token versioning
- [ ] Team sharing and collaboration
- [ ] Figma plugin for direct integration
- [ ] Import existing design systems for AI refinement

## License

MIT License - Copyright (c) 2024

See [LICENSE](./LICENSE) for full details.

## Semantic Commit Examples

```bash
feat: add CSS variable export functionality
fix: correct hex color validation regex
docs: update Figma integration instructions
refactor: extract color parsing to utility function
test: add token parser validation tests
style: format code with prettier
```

---
