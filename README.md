# GoodGraphs - AI-Powered Business Visualizations

Transform natural language descriptions into world-class animated business visualizations.

## Product Vision

A design-first web application that converts simple text descriptions into premium, animated charts that look like they cost $5,000 to produce. Perfect for founders, consultants, and analysts who need McKinsey/Bain-grade visuals for high-stakes presentations.

## Features

- **Natural Language Input** - Describe your data in plain English
- **Intelligent Visualization Selection** - AI determines the best chart type for your data
- **Premium Animations** - Smooth, purposeful animations with choreographed timing
- **Designer-Quality Output** - Sophisticated design system inspired by Stripe, Linear, and Apple keynotes
- **Animated Line Charts** - Draw-on effects, staggered data points, and elegant transitions
- **Bring Your Own API Key** - Use your own OpenAI API key, stored securely in your browser

## Tech Stack

- **React** + **TypeScript** + **Vite** - Modern, fast development
- **Framer Motion** - Premium animation choreography
- **Recharts** - Chart primitives (heavily customized)
- **Tailwind CSS** - App UI styling
- **OpenAI GPT-4** - Intelligence layer for text interpretation

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GoodGraphs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

5. Click the settings icon and enter your OpenAI API key

That's it! No backend setup required.

## How It Works

1. **Enter Your API Key**: On first load, enter your OpenAI API key in the settings modal. It's stored locally in your browser (localStorage) and never sent to any server except OpenAI.

2. **Describe Your Data**: Type natural language descriptions like:
   - "Our revenue grew from $2M to $8M over 3 years"
   - "Customer acquisition increased 300% from January to June"
   - "Website traffic: Jan 10K, Feb 12K, Mar 15K, Apr 18K"

3. **AI Generates Visualization**: GPT-4 analyzes your text, extracts data points, chooses the best chart type, and selects appropriate colors based on sentiment.

4. **Watch It Animate**: Your chart appears with premium animations - line draw-on effects, staggered data points, smooth transitions.

## Usage Examples

### Growth Stories
- "Our revenue grew from $2M to $8M over 3 years"
- "Monthly active users climbed from 5K to 25K in Q1"

### Comparisons
- "Product A sold 50K units, Product B sold 80K, Product C sold 120K"
- "Our market share is 35%, competitor X has 28%, competitor Y has 22%"

### Trends
- "Website traffic: Jan 10K, Feb 12K, Mar 15K, Apr 18K, May 22K"
- "Conversion rate improved from 2.5% to 4.8% over six months"

The AI will:
1. Extract data points from your text
2. Choose the optimal visualization type (line, bar, or area)
3. Select colors based on sentiment (growth = green, decline = red, neutral = blue)
4. Choose animation style (confident, neutral, or cautious)
5. Generate an animated chart with premium design quality

## Design System

### Typography
- **Font:** Inter with optical sizing
- **Hierarchy:** Clear distinction between hero numbers, titles, labels, and axes
- **Details:** Tabular numerals, tight tracking for large text

### Colors (Authority Palette)
- **Primary:** Deep slate (#0f172a)
- **Accent:** Confident blue (#3b82f6)
- **Highlight:** Warm amber (#f59e0b)
- **Success:** Emerald (#10b981)
- **Danger:** Red (#ef4444)

### Animation Principles
- **Primary animations:** 600-800ms with expo-out easing
- **Choreography:** Data reveals before labels, staggered element appearance
- **Purposeful:** Every motion tells part of the story

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── TextInput.tsx         # Premium input component
│   │   └── ApiKeyModal.tsx       # API key settings modal
│   └── visualizations/
│       ├── AnimatedLineChart.tsx # Premium line chart
│       └── VisualizationContainer.tsx
├── lib/
│   ├── design-tokens.ts          # Design system constants
│   ├── animation-configs.ts      # Animation timing & easing
│   └── anthropic-client.ts       # OpenAI integration
├── types/
│   └── index.ts                  # TypeScript definitions
├── App.tsx                       # Main application
└── index.css                     # Global styles
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory. Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Deployment

This is a frontend-only application with no backend required. Users provide their own OpenAI API keys which are stored in their browser's localStorage.

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

**Deploy to Netlify:**
```bash
npm run build
# Upload the dist/ directory to Netlify
```

**Deploy to GitHub Pages:**
```bash
npm run build
# Configure GitHub Pages to serve from the dist/ directory
```

## Security & Privacy

- **API Key Storage**: Your OpenAI API key is stored only in your browser's localStorage. It never touches our servers.
- **Direct API Calls**: The app calls OpenAI directly from your browser. We never see your API key or data.
- **Open Source**: All code is open and auditable. You can verify exactly what the app does with your key.

## Roadmap

### Phase 2 (Coming Soon)
- Bar charts with staggered grow-from-bottom animation
- Area charts with gradient fills
- Export functionality (PNG, SVG)
- Replay animation button
- Additional color palettes

### Phase 3 (Future)
- Process flow diagrams
- Comparison grids
- Interactive editing
- Custom branding options
- Support for multiple AI providers (Claude, Gemini, etc.)

## Design Philosophy

This product lives or dies on design execution. We're aiming for:

- **Minimal by default** - Remove anything that doesn't add clarity
- **Animation does heavy lifting** - Motion creates interest and narrative
- **Sophistication through restraint** - One accent color, purposeful gradients
- **Business-appropriate confidence** - Feels premium and credible

Every pixel is considered. Every animation is intentional.

## Notes

- **Cost**: OpenAI charges per API call. Using GPT-4o, each visualization costs approximately $0.01-0.03. You have full control over your usage.
- **Performance**: Chart bundle size is ~738KB (227KB gzipped). Future optimization will implement code splitting.
- **Browser Support**: Modern browsers only (Chrome, Firefox, Safari, Edge). Requires localStorage and ES2020+ features.

## Success Criteria

Phase 1 is complete when a designer sees this and asks: "Wait, what tool made this?"

---

Built with taste. Design is the product.
