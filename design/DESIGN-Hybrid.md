# DESIGN.md — Direction Hybrid: A's skin, B's engine

**Reading this as:** not a third independent identity, but the recognition that Direction A's visual language (dark tactical substrate, single orange accent, Space Grotesk/Mono, the cat, the Hi-then-tagline gate sequence) never drew any negative feedback this session, while Direction B's motion engine evolved into something genuinely more sophisticated (real potential flow + correct von Karman vortex shedding) than A's original sine-noise particle field. There's no reason A should keep the weaker physics once B has the better one.

## What changed from Direction A
1. **Gate field engine replaced.** The sine-noise coherence field (particles turbulent-to-laminar on a one-shot timer) is gone. In its place: the same cylinder-in-a-uniform-flow potential-flow deflection and von Karman vortex-shedding wake built for Direction B, scoped to the gate's canvas and driven by the cursor. Recolored: calm state uses `--text-faint` (an existing neutral in A's own palette, not a new hue), disturbed state uses `--accent` (the one locked orange) — never B's red.
2. **Continuous, not one-shot.** Because the underlying engine is inherently ambient and cursor-reactive (not a timed reveal), there's no artificial "burst" sequence to synchronize with the Hi→tagline crossfade — the field is simply always running, and it reacts if you move your mouse through the gate.
3. **Figure caption added to the highlight card.** The project image now carries a small caption bar (`Fig. 01. ...`) matching Direction B's report-register captioning, instead of an uncaptioned photo with just a gradient wash.

## What did NOT change from Direction A
Everything else: header, hero copy and layout, the "Compared / Method / Decision / Scope" card structure (already present in A since the earlier content-architecture pass — this session's card port turned out to already be done), the Education/cat section, skills chips, patents strip, and the token sheet. Type floor, contrast fixes, and the single-accent lock are all unchanged from A.

## Physics parameters (scaled down from B for a shorter gate canvas vs. B's full window)
- Obstacle radius `R = 60` (B: 78)
- Vortex spawn offset `17px` (B: 22px), spawn interval `0.3s` (same as B)
- Vortex strength `3400` (B: 4400)
- `CHANNELS = 12` (B: 16) — fewer lines for the gate's typically shorter viewport height
- Same advection-scale fix, mutual induction, and continuous full-width channel rendering as Direction B's v10 (no re-solve jitter, no finite-lifetime gaps)

## Fixes applied after the initial build (2026-07-19)
1. **Visibility bug:** the pre-existing `.gate canvas{opacity:.5}` CSS rule (tuned for the old bloom effect's bold alpha values) was halving the new channel lines' already-subtle alpha (0.14 base → effective ~0.07, nearly invisible). Removed the CSS opacity, raised the in-canvas base alpha to 0.32.
2. **Missing rotation:** ported the same rotating vortex-core glyph fix from Direction B (see `DESIGN-B-explore.md` v11) — a spiral drawn explicitly at each vortex's position, since the channel height-map lines cannot show the spinning-eddy signature that's the actual visual hallmark of a von Karman street.
3. **Obstacle-contact jitter:** ported v12's occlusion-gap fix, later fully superseded by (4).
4. **Full rewrite (2026-07-19, current):** ported Direction B's v13 rebuild verbatim in concept — a shared velocity grid (`GRID_COLS=44 x GRID_ROWS=26`, scaled down for the smaller gate canvas) plus real `(x,y)` rope streamlines (`LINES=12`, `MAX_DISP=85` -- lower than B's 110, matched to the smaller `R=60` obstacle) that genuinely bow around the cursor and flow into the wake, replacing the y-only height-map entirely. Same guaranteed no-invasion radial-push backstop, same rotating vortex glyphs on top. Full technical detail lives in `DESIGN-B-explore.md`'s v13 entry since the engine is identical; this file only tracks the hybrid-specific parameter deltas (smaller grid/line count/displacement cap, orange color instead of red, scoped to the gate rather than full-page).

## Open questions for the user
- Keep the field scoped to the gate only (current, matches A's original architecture), or extend it full-page like B now runs it?
- Any other B-originated element worth porting (e.g. B's honest-scope-note styling variations, paper-grain-equivalent texture)?
