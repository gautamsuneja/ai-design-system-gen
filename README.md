# 🎨 AI Design System Generator

> Transform natural language into production-ready design tokens powered by AI

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

A professional web application that converts design briefs into structured design tokens using AI, with built-in preview, export options (JSON, CSS), and direct Figma integration.

---

## ✨ Features

### 🤖 AI-Powered Generation
- Convert natural language prompts into complete design systems
- Generates colors, typography, spacing, shadows, border radius, and component variants
- Powered by advanced language models (OpenAI/Claude)
- Smart retry mechanism with attempt tracking

### 👁️ Visual Preview
- Live preview of all generated tokens
- Color swatches with hex values
- Typography samples at different scales
- Spacing and shadow visualizations
- Component variant previews

### 📤 Multiple Export Options
- **JSON Export**: Download structured design tokens
- **CSS Variables Export**: Ready-to-use CSS custom properties
- **Copy to Clipboard**: Quick JSON copying
- **Figma Integration**: Push tokens directly to Figma as styles

### 🔄 Token Comparison
- Save generation history (up to 10 sets)
- Compare any two token sets side-by-side
- Visual diff highlighting for all changes
- Track iterations and design evolution

### 🔐 Privacy-First
- Figma tokens never stored on disk
- All sensitive data handled in-memory only
- Transparent data handling

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- (Optional) Figma Personal Access Token for Figma integration

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-design-system-generator.git
cd ai-design-system-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

---

## 📖 How to Use

### Step 1: Enter a Design Brief

Write a natural language description of your desired design system. Be specific about:
- **Style** (modern, minimalist, bold, elegant)
- **Colors** (primary color, mood, theme)
- **Use case** (dashboard, e-commerce, social media)

**Example Prompts:**
```
Create a modern fintech dashboard design system with professional 
blue tones, high contrast for data visualization, and accessible 
color palette
```

```
Design tokens for a luxury dark mode e-commerce platform with 
elegant gold accents, premium feel, and sophisticated color scheme
```

### Step 2: Generate Tokens

1. Click the **Generate** button (or use quick example buttons)
2. Wait 10-30 seconds for AI processing
3. View the generated design system preview

**Pro Tip:** If you get a parsing error or want different results, click the **↻ Retry** button to regenerate with the same prompt. The retry counter shows how many times you've regenerated.

### Step 3: Preview Your Design System

Explore the generated tokens organized by category:
- **Colors**: Primary, secondary, accent, neutral palettes
- **Typography**: Font families, scale, weights, line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corner values
- **Shadows**: Elevation system
- **Components**: Button and input variants

### Step 4: Export Your Tokens

Choose from multiple export options:

#### 📄 Download JSON
```json
{
  "name": "Modern Fintech Dashboard",
  "colors": {
    "primary": { "hex": "#3B82F6", "usage": "Primary actions" },
    "secondary": { "hex": "#6366F1", "usage": "Secondary actions" }
  },
  "typography": {
    "baseFont": "Inter, system-ui, sans-serif",
    "scale": { "xs": 12, "sm": 14, "md": 16, "lg": 20, "xl": 24 }
  }
}
```

#### 🎨 Download CSS Variables
```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #6366F1;
  --font-base: Inter, system-ui, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
}
```

#### 📋 Copy to Clipboard
Instantly copy the JSON to paste into your code editor or design tools.

---

## 🔌 Figma Integration

### Setup

1. **Get Your Figma Personal Access Token**
   - Go to [Figma Account Settings](https://www.figma.com/settings)
   - Scroll to "Personal Access Tokens"
   - Click "Generate new token"
   - Give it a name (e.g., "Design System Generator")
   - Copy the token (starts with `figd_`)

2. **Find Your Figma File Key (Optional)**
   - Open your Figma file
   - Copy the file key from the URL:
     ```
     https://www.figma.com/file/FILE_KEY_HERE/File-Name
     ```
   - Leave empty to auto-create a new file

### Push to Figma

1. Paste your **Personal Access Token**
2. (Optional) Enter **File Key** or leave empty
3. Click **Push to Figma**
4. Wait for confirmation
5. File opens automatically in a new tab

**What gets created:**
- Color styles for all colors in your palette
- Text styles for all typography scales
- Effect styles for shadows
- Organized by token categories

**🔒 Privacy Note:** Your token is used in-memory for this single operation and immediately discarded. It's never saved or logged.

---

## 🔄 Token Comparison Feature

### How to Compare

1. **Generate at least 2 design systems** (using different prompts or retry)
2. Go to the **Compare Token Sets** card
3. Select **Token Set A** from the dropdown
4. Select **Token Set B** from the dropdown
5. Click **Compare Side-by-Side**

### What You'll See

- **Side-by-side preview** of both token sets
- **Highlighted differences** in yellow
- **Added/removed tokens** clearly marked
- **Easy navigation** between sections

**Use Cases:**
- Compare light vs dark themes
- Evaluate brand refresh iterations
- Test different color palettes
- Review typography changes

---

## 🛠️ Troubleshooting

### "Failed to parse AI response: Unterminated string in JSON"

This happens when the AI generates malformed JSON. **Solution:**
- Click the **↻ Retry** button to regenerate
- Try simplifying your prompt
- The app will auto-retry up to 2 times

### "Invalid Figma token format"

**Solution:**
- Ensure your token starts with `figd_`
- Generate a new token from Figma settings
- Check for extra spaces when pasting

### "Figma API Error: 403 Forbidden"

**Solution:**
- Verify your token has proper permissions
- Check if the file key is correct
- Ensure you have edit access to the file

### Generation Takes Too Long

**Solution:**
- Wait at least 30 seconds
- Check your internet connection
- Try a shorter, simpler prompt
- Use the retry button if it times out

### Can't See Comparison Option

**Solution:**
- You need at least **2 generated token sets**
- Check the "Generation History" card
- Generate more design systems to unlock comparison

---

## 🏗️ Technical Architecture

### Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.1
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Phosphor Icons
- **State Management**: React Hooks + useKV (persistent storage)
- **Build Tool**: Vite 6
- **AI Integration**: OpenAI/Claude APIs

### Project Structure

```
src/
├── components/
│   ├── GeneratorInterface.tsx    # Main UI component
│   ├── TokenPreview.tsx          # Token visualization
│   ├── ComparisonView.tsx        # Side-by-side comparison
│   └── ui/                       # shadcn components
├── lib/
│   ├── ai-adapter.ts             # AI API integration
│   ├── token-parser.ts           # JSON/CSS conversion
│   ├── figma-adapter.ts          # Figma API integration
│   └── utils.ts                  # Helper functions
├── types/
│   └── design-tokens.ts          # TypeScript interfaces
├── App.tsx                       # Root component
└── index.css                     # Global styles
```

### Token Schema

```typescript
interface DesignTokens {
  name: string
  colors: {
    primary: ColorToken
    secondary: ColorToken
    accent: ColorToken
    neutral: NeutralScale
  }
  typography: {
    baseFont: string
    scale: TypeScale
    weights: FontWeights
    lineHeights: LineHeights
  }
  spacing: SpacingScale
  radii: BorderRadii
  shadows: ShadowScale
  componentVariants: {
    button: ComponentVariant[]
    input: ComponentVariant[]
  }
}
```

---

## 🌍 हिंदी में उपयोग गाइड (Hindi Usage Guide)

### कैसे उपयोग करें

1. **डिज़ाइन ब्रीफ लिखें**: अपने design system के बारे में विस्तार से बताएं
2. **Generate बटन दबाएं**: AI आपके लिए tokens बनाएगा
3. **प्रीव्यू देखें**: सभी colors, fonts, spacing देखें
4. **एक्सपोर्ट करें**: JSON या CSS फाइल डाउनलोड करें

### Figma में कैसे भेजें

1. Figma से Personal Access Token लें
2. Token यहां paste करें
3. "Push to Figma" दबाएं
4. आपकी Figma file खुल जाएगी

### तुलना कैसे करें (Comparison)

1. कम से कम 2 design systems बनाएं
2. "Compare Token Sets" में दोनों select करें
3. "Compare Side-by-Side" दबाएं
4. दोनों का अंतर देखें

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Phosphor Icons](https://phosphoricons.com)
- Powered by OpenAI/Claude AI models
- Figma integration via [Figma REST API](https://www.figma.com/developers/api)

---

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Review the [PRD.md](PRD.md) for detailed feature documentation

---

## 🚀 What's Next?

Planned features and improvements:

- [ ] Dark mode support
- [ ] More AI model options
- [ ] Token validation and suggestions
- [ ] Design system templates library
- [ ] Export to Style Dictionary format
- [ ] Batch generation for multiple themes
- [ ] Integration with more design tools

---

Made with ❤️ for designers and developers
