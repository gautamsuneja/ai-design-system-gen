# AI Design System Generator

A professional tool that transforms natural language prompts into production-ready design tokens and optionally syncs them to Figma via the Figma REST API.

**Experience Qualities**:
1. **Efficient** - Streamlined workflow from prompt to export with minimal friction
2. **Professional** - Clean, technical interface that reflects the sophistication of design systems
3. **Trustworthy** - Transparent data handling with clear privacy controls and validation feedback

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused tool with AI generation, token preview, and export capabilities, but remains streamlined for quick iteration.

## Essential Features

### 1. Prompt Input & Generation
- **Functionality**: Text input that accepts design briefs and generates structured design tokens via AI
- **Purpose**: Enable designers and developers to rapidly scaffold design systems from descriptions
- **Trigger**: User enters prompt and clicks "Generate Tokens"
- **Progression**: Empty input → User types prompt → Click generate → Loading state → Preview tokens
- **Success criteria**: AI returns valid JSON tokens matching schema within 5 seconds

### 2. Token Preview
- **Functionality**: Visual display of generated colors, typography, spacing, and component variants
- **Purpose**: Allow users to validate and understand the generated system before export
- **Trigger**: Successful token generation automatically shows preview
- **Progression**: Raw tokens → Parsed sections → Color swatches displayed → Typography samples → Spacing scale table → Component variant cards
- **Success criteria**: All token categories render correctly with proper styling

### 3. JSON Export
- **Functionality**: Download generated tokens as structured JSON file
- **Purpose**: Enable developers to use tokens in any build pipeline
- **Trigger**: Click "Export JSON" button
- **Progression**: Click export → JSON file downloads → Success toast
- **Success criteria**: Downloaded file contains valid, formatted JSON matching schema

### 4. Figma Integration
- **Functionality**: Push design tokens directly to Figma as styles and components
- **Purpose**: Bridge the gap between token generation and design tool implementation
- **Trigger**: User provides Figma token and clicks "Push to Figma"
- **Progression**: Enter Figma PAT → Optional file ID → Click push → API call → Figma styles created → Success message with file link
- **Success criteria**: Styles appear in specified Figma file within 10 seconds

### 5. CSS Variables Export
- **Functionality**: Generate CSS custom properties from design tokens
- **Purpose**: Provide ready-to-use CSS for immediate web integration
- **Trigger**: Click "Export CSS Variables"
- **Progression**: Click export → CSS file generated → Download starts
- **Success criteria**: Valid CSS file with properly formatted custom properties

## Edge Case Handling

- **Invalid AI Response**: Show clear error message, allow retry with same prompt
- **Malformed Token JSON**: Display validation errors with specific field issues
- **Missing Figma Token**: Disable Figma push, show instructional tooltip
- **Figma API Failure**: Catch errors, display user-friendly message with troubleshooting steps
- **Network Timeout**: Show loading state with timeout warning after 30s
- **Empty Prompt**: Disable generate button, show helper text with example prompts

## Design Direction

The interface should feel like a professional developer tool - clean, technical, and confidence-inspiring. Think Linear or Vercel's design language: minimal chrome, excellent typography, subtle interactions. The design should be serious and elegant, emphasizing clarity and efficiency over playfulness.

## Color Selection

Custom palette reflecting a technical, modern aesthetic.

- **Primary Color**: Deep Blue `oklch(0.45 0.15 250)` - Commands attention for primary actions, conveys trust and professionalism
- **Secondary Colors**: 
  - Slate Gray `oklch(0.55 0.02 250)` - Supporting UI elements, subtle contrast
  - Cool Gray `oklch(0.75 0.01 250)` - Muted backgrounds and borders
- **Accent Color**: Electric Cyan `oklch(0.65 0.18 200)` - Success states, interactive highlights
- **Foreground/Background Pairings**:
  - Background (White `oklch(0.99 0 0)`): Foreground Dark `oklch(0.25 0.02 250)` - Ratio 12.8:1 ✓
  - Card (Light Gray `oklch(0.97 0 0)`): Foreground Dark `oklch(0.25 0.02 250)` - Ratio 11.5:1 ✓
  - Primary (Deep Blue): White text `oklch(0.99 0 0)` - Ratio 7.2:1 ✓
  - Secondary (Slate): White text `oklch(0.99 0 0)` - Ratio 4.9:1 ✓
  - Accent (Cyan): Dark text `oklch(0.25 0.02 250)` - Ratio 5.8:1 ✓
  - Muted (Cool Gray): Dark Muted `oklch(0.45 0.02 250)` - Ratio 4.6:1 ✓

## Font Selection

Use Inter for its excellent technical legibility and modern aesthetic, perfect for a developer tool with lots of code and data display.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter SemiBold/32px/tight (-0.02em)
  - H2 (Section Headers): Inter SemiBold/24px/tight
  - H3 (Subsections): Inter Medium/18px/normal
  - Body (Main Content): Inter Regular/15px/relaxed (1.6)
  - Small (Labels): Inter Medium/13px/normal
  - Code (Tokens): JetBrains Mono Regular/14px/normal

## Animations

Animations should be minimal and purposeful, reinforcing the technical nature. Favor subtle fades and slides over bouncy or playful motion.

- **Purposeful Meaning**: Quick, linear transitions communicate efficiency; no unnecessary decoration
- **Hierarchy of Movement**: Token preview cards fade in sequentially (stagger 50ms), loading states pulse gently, form validation animates inline

## Component Selection

- **Components**: 
  - Textarea (prompt input with auto-resize)
  - Button (primary, secondary, ghost variants)
  - Card (token preview sections)
  - Input (Figma token, file ID)
  - Alert (error messages, privacy notices)
  - Separator (section dividers)
  - Tabs (organize preview sections)
  - Badge (token labels)
  - Tooltip (help text for Figma integration)
  - Skeleton (loading states)
- **Customizations**: 
  - Code preview component (syntax highlighted JSON)
  - Color swatch grid (custom display for color tokens)
  - Spacing scale visualizer (custom ruler component)
- **States**: 
  - Buttons show subtle scale on hover (0.98), pressed state (0.96)
  - Inputs highlight with accent border on focus
  - Loading states use skeleton screens, not spinners
- **Icon Selection**: 
  - Sparkles (AI generation)
  - DownloadSimple (export)
  - Code (CSS export)
  - FigmaLogo (Figma push)
  - Check (success)
  - Warning (errors)
- **Spacing**: 
  - Use 4px base unit: 8px (compact), 16px (comfortable), 24px (section), 32px (page margins)
- **Mobile**: 
  - Stack token preview cards vertically
  - Full-width inputs and buttons
  - Collapsible sections for token categories
  - Fixed bottom action bar for primary CTA
