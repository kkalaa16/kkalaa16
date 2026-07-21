# DESIGN.md — Direction A: Tactical Telemetry, Executed Properly

**Reading this as:** solo-engineer portfolio for aerospace/propulsion/ML recruiters, evolving the existing dark tactical-HUD identity rather than replacing it. One dark substrate, one accent, mono reserved for data — every defect from the reviewer feedback fixed without losing what already tested well (the cat animation, the fluid background, the orange).

## Color
- `#0b0b0e` — Deactivated CRT — page background (not pure black)
- `#131317` — Raised panel — header / token-sheet background
- `#f1f1ef` — Phosphor white — primary text, 15.8:1 contrast
- `#aeb2bb` — Muted (fixed) — secondary text, 8.9:1 contrast (replaces `#555` at 2.8:1, which failed AA)
- `#ff5a1f` — Aviation orange — the single accent, used for CTAs, rules, and highlighted numbers only
- `rgba(255,90,31,.14)` — accent tint for badges/chips

## Type
- Display / body: system grotesk stack (`-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`). The shipped site keeps self-hosting Space Grotesk via `@font-face`; this mockup uses a safe system stack since the Artifact CSP blocks font CDNs.
- Data / captions / tags: system mono stack (`ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace`) — same role Space Mono plays today.
- Floor: nothing visible below 0.86rem. The live site's 0.62–0.68rem micro-type is gone.

## Tagline (locked 2026-07-15)
**"I find trends in chaos: physics, math, and machine learning."** — replaces "Hi. I'm Krtin Kala. This is my portfolio." as the gate's fixed headline. The "I am a ___ Engineer" type-in/type-out rotator (Combustion / Propulsion / Systems / ML / CFD Engineer) is demoted to a supporting line directly beneath it, using the same typing effect the live site already has, rather than carrying the hero on its own.

## Project-card structure (locked 2026-07-15)
Every headline card follows the same shape found across the actual corpus (trade study → decision → number), not a generic result-first card: **(1)** the real alternatives compared, **(2)** the method/rig, **(3)** the quantified decision, **(4)** a one-line honest scope/limitation note (styled distinctly, left-rule accent) — matching the pattern of the audit trail and the option-pricing project's own honest reporting of where its models break. Scope notes for the real build should be chosen per-project with Krtin's sign-off, since some (e.g. the thesis CFD case's convergence caveat) are more sensitive than others.

## Layout signature
Full-bleed dark sections with hairline dividers; the intro gate becomes a skippable capability statement (name, tagline, rotator, one credential, tool row, explicit Enter action) instead of "Hi. I'm Krtin Kala. This is my portfolio."; the timeline's unfurl gate and left year-stamp column are removed — the full archive stays open by default.

## Signature motion: the coherence field (locked 2026-07-15)
Replaces the original color-bloom splats. A ~70-particle canvas field starts visibly turbulent (each particle's velocity driven by layered sine noise) and smoothly resolves into gentle laminar flow lines as "Hi." dissolves into the tagline, via an eased 0-to-1 coherence parameter over ~1.6s. This isn't decorative motion, it's the tagline enacted: "trends in chaos" literally happens on screen once, then settles into a quiet ambient laminar drift behind the gate. Monochrome (single accent hue, low opacity, thin 1px lines), no radial blooms, no rainbow. Reference point: restrained monochrome motion in "stark futuristic minimalism" deep-tech sites (xAI, SpaceX-adjacent), not illustrative/gimmick effects. Respects `prefers-reduced-motion` (skips to a static frame).

## Removed after user feedback (2026-07-15)
An earlier charm pass added a rotated "FIELD VALIDATED" stamp, a hand-drawn red-ink circle around key stats, and taped/tilted photo plates to Direction B. User feedback: "feels very kiddish... looking for sleek designs." All three were removed from B; A never had them. Lesson: illustrative/physical-artifact metaphors (stamps, circles, tape) read as twee regardless of how well-reasoned the rationale is — restraint and monochrome read as premium, illustration reads as craft-project.

## Banned on this page
- Second accent hue (the unexplained green "matrix" theme is retired; ML-tagged work gets a plain label instead of a color code)
- `#555`-class muted text
- Type below 0.86rem
- "CLICK TO UNFURL", scroll cues, cursor emoji
- GRE/TOEFL in Achievements

## What stays
- WebGL fluid background (behind hero only, respects `prefers-reduced-motion`)
- BITS → Georgia Tech running-cat animation
- Space Grotesk / Space Mono on the real build
