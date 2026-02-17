# Liquid Latent Space — Layout Blueprint

## General layout (content placeholders only)

1. **Fixed ambient layer**
   - Fullscreen fluid canvas (`#fluid-layer`) behind all content.
   - Soft radial gradient vignette overlay (`.ambient-vignette`) above fluid, below UI.

2. **Top navigation (`.site-nav`)**
   - Left: personal mark / logo.
   - Right: section links.
   - Uses translucent glass strip with subtle border.

3. **Hero section (`.hero`)**
   - Left column (`.hero-copy`): eyebrow, H1, short paragraph.
   - Right column (`.hero-metrics`): stacked glass cards for key metrics.

4. **Case-study strip (`.case-grid`)**
   - 3-column responsive grid of glassmorphism cards.
   - Each card includes label, title, meta line, and CTA.

5. **Capability rail (`.capability-row`)**
   - Horizontal pills/chips describing ML domains (e.g., LLM, MLOps, CV, CFD-ML).

6. **Footer CTA (`.footer-cta`)**
   - Glass card with final action button.

## Color palette (finalized)

- `--bg-0: #05070f` (deep navy-black)
- `--bg-1: #0a1020` (night blue)
- `--text-0: #edf3ff` (high-emphasis text)
- `--text-1: #a9b6d3` (secondary text)
- `--line: rgba(175, 214, 255, 0.24)` (strokes/borders)
- `--glass: rgba(13, 19, 36, 0.38)` (glass base)
- `--glass-strong: rgba(10, 16, 30, 0.56)` (elevated glass)
- `--accent-cyan: #57d6ff`
- `--accent-violet: #8f7bff`
- `--accent-mint: #62f5c5`
- `--accent-pink: #ff7adf`

## Typography

- Headings: `"Sora", "Inter", sans-serif`
- Body/UI: `"Inter", system-ui, sans-serif`
- Optional mono metadata: `"JetBrains Mono", monospace`

## Motion language

- Fluid layer: slow perpetual drift + cursor influence.
- Glass cards: 3D tilt/parallax on pointer move.
- Hover states: soft glow ring and slight border brightening.
