# GoodGraphs - AI-Powered Business Visualizations

Transform natural language descriptions into world-class animated business visualizations.

## Product Vision

A design-first web application that converts simple text descriptions into premium, animated charts that look like they cost $5,000 to produce. Perfect for founders, consultants, and analysts who need McKinsey/Bain-grade visuals for high-stakes presentations.

## Features (Phase 1)

- **Natural Language Input** - Describe your data in plain English
- **Intelligent Visualization Selection** - AI determines the best chart type for your data
- **Premium Animations** - Smooth, purposeful animations with choreographed timing
- **Designer-Quality Output** - Sophisticated design system inspired by Stripe, Linear, and Apple keynotes
- **Animated Line Charts** - Draw-on effects, staggered data points, and elegant transitions

## Tech Stack

- **React** + **TypeScript** + **Vite** - Modern, fast development
- **Framer Motion** - Premium animation choreography
- **Recharts** - Chart primitives (heavily customized)
- **Tailwind CSS** - App UI styling
- **Anthropic Claude API** - Intelligence layer for text interpretation

## Setup

### Prerequisites

- Node.js 18+ and npm
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GoodGraphs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. Add your Anthropic API key to `.env`:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

5. Start the development server with Vercel CLI (to test API routes locally):
   ```bash
   npm install -g vercel
   vercel dev
   ```

   Or for frontend-only development:
   ```bash
   npm run dev
   ```

6. Open your browser to the URL shown in the terminal

### Deploying to Vercel

1. Install Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Set up environment variable in Vercel:
   - Go to your project settings in Vercel dashboard
   - Navigate to "Environment Variables"
   - Add: `ANTHROPIC_API_KEY` with your API key value
   - Redeploy if necessary

4. Your app is now live! The serverless API will handle Anthropic requests securely.

## Usage

### Example Prompts

Try these natural language descriptions:

**Growth Stories:**
- "Our revenue grew from $2M to $8M over 3 years"
- "Customer acquisition increased 300% from January to June"
- "Monthly active users climbed from 5K to 25K in Q1"

**Comparisons:**
- "Product A sold 50K units, Product B sold 80K, Product C sold 120K"
- "Our market share is 35%, competitor X has 28%, competitor Y has 22%"

**Trends:**
- "Website traffic: Jan 10K, Feb 12K, Mar 15K, Apr 18K, May 22K"
- "Conversion rate improved from 2.5% to 4.8% over six months"

The AI will:
1. Extract data points from your text
2. Choose the optimal visualization type (line, bar, or area)
3. Select colors based on sentiment (growth = green, decline = red, neutral = blue)
4. Generate an animated chart with premium design quality

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
│   ├── ui/                      # App UI components
│   │   └── TextInput.tsx
│   └── visualizations/          # Chart components
│       ├── AnimatedLineChart.tsx
│       └── VisualizationContainer.tsx
├── lib/
│   ├── design-tokens.ts         # Design system constants
│   ├── animation-configs.ts     # Animation timing & easing
│   └── anthropic-client.ts      # AI integration
├── types/
│   └── index.ts                 # TypeScript definitions
├── App.tsx                      # Main application
└── index.css                    # Global styles
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

The optimized build will be in the `dist/` directory.

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

## Design Philosophy

This product lives or dies on design execution. We're aiming for:

- **Minimal by default** - Remove anything that doesn't add clarity
- **Animation does heavy lifting** - Motion creates interest and narrative
- **Sophistication through restraint** - One accent color, purposeful gradients
- **Business-appropriate confidence** - Feels premium and credible

Every pixel is considered. Every animation is intentional.

## Notes

- **Security**: The Anthropic API is now called through a Vercel serverless function (`/api/generate`), keeping your API key secure on the backend.
- **Performance**: Chart size warnings in build are expected due to bundled dependencies (Recharts + Framer Motion). Future optimization will implement code splitting.
- **Deployment**: Designed for Vercel deployment with zero-config serverless API routes. Can be adapted for other platforms by modifying the API directory structure.

## Success Criteria

Phase 1 is complete when a designer sees this and asks: "Wait, what tool made this?"

---

Built with taste. Design is the product.
