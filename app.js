'use strict';

/* ─────────────────────────────────────────────────────────
   BOOT
   ───────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  initFluid();
  runIntroSequence();
  initMatrix();
  initEducationAxis();
  initNav();
});

/* ─────────────────────────────────────────────────────────
   FLUID BACKGROUND  (continuous — never stops)
   ───────────────────────────────────────────────────────── */
function initFluid() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas || typeof window.WebGLFluid !== 'function') return;

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION:      128,
    DYE_RESOLUTION:      1024,
    DENSITY_DISSIPATION: 0.997,
    VELOCITY_DISSIPATION:0.995,
    PRESSURE:            0.8,
    CURL:                88,
    SPLAT_RADIUS:        0.30,
    SPLAT_FORCE:         6000,
    SHADING:             true,
    COLORFUL:            false,
    BACK_COLOR:          { r: 0, g: 0, b: 0 },
    BLOOM:               false,
    TRANSPARENT:         true,
  });

  const splat = (x, y, dx, dy, color) => {
    if (fluid?.splat) fluid.splat(x, y, dx, dy, color);
  };
  window.__splat = splat;

  // Initial burst
  for (let i = 0; i < 5; i++) {
    setTimeout(() => splat(0.5, 0.5,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      { r: 0.44, g: 0.17, b: 0.02 }
    ), i * 140);
  }

  // Perpetual wandering particle
  const wanderer = { x: 0.2, y: 0.3, vx: 0.0036, vy: 0.0027 };
  let frame = 0;

  (function loop() {
    frame++;

    wanderer.x += wanderer.vx;
    wanderer.y += wanderer.vy;
    if (wanderer.x < 0.02 || wanderer.x > 0.98) wanderer.vx *= -1;
    if (wanderer.y < 0.02 || wanderer.y > 0.98) wanderer.vy *= -1;

    if (frame % 3 === 0) {
      splat(wanderer.x, wanderer.y,
        wanderer.vx * 13000, wanderer.vy * 13000,
        { r: 0.50, g: 0.18, b: 0.02 });
    }
    // Occasional ambient puff
    if (frame % 150 === 0) {
      splat(Math.random(), Math.random(),
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        { r: 0.55, g: 0.20, b: 0.03 });
    }
    // Rare big burst
    if (frame % 360 === 0) {
      splat(0.2 + Math.random() * 0.6, 0.2 + Math.random() * 0.6,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        { r: 0.60, g: 0.22, b: 0.03 });
    }
    requestAnimationFrame(loop);
  })();

  // React to scroll
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastY;
    if (Math.abs(dy) > 1) {
      splat(Math.random(), 0.5,
        (Math.random() - 0.5) * 20,
        -dy * 8,
        { r: 0.60, g: 0.22, b: 0.03 });
    }
    lastY = window.scrollY;
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   INTRO SEQUENCE
   Phase 1 (0–1.2s):  "Hi." appears with fluid
   Phase 2 (1.2–2.9s): "Hi." dissolves
   Phase 3 (2.9–6.2s): "I'M KRTIN KALA..." appears
   Phase 4 (6.2s):     Gate fades out, hero + nav reveal
   ───────────────────────────────────────────────────────── */
function runIntroSequence() {
  const gate      = document.getElementById('introGate');
  const hi        = document.getElementById('introHi');
  const welcome   = document.getElementById('introWelcome');
  const hero      = document.querySelector('.hero-section');
  const nav       = document.getElementById('siteNav');
  const cardsLayer= document.getElementById('cardsLayer');
  const splat     = window.__splat || (() => {});

  // Phase 2: dissolve "Hi."
  setTimeout(() => {
    splat(0.5, 0.52,
      (Math.random() - 0.5) * 85,
      (Math.random() - 0.5) * 85,
      { r: 0.54, g: 0.20, b: 0.03 });
    hi.classList.add('out');
  }, 1200);

  // Phase 3: show welcome text
  setTimeout(() => {
    welcome.classList.add('show');
  }, 2900);

  // Phase 4: tear down gate, reveal page
  setTimeout(() => {
    gate.classList.add('fade-out');

    // After fade, remove gate from layout entirely
    gate.addEventListener('transitionend', () => {
      gate.classList.add('gone');
      document.body.classList.remove('lock-scroll');
    }, { once: true });

    // Reveal hero and nav
    hero.classList.add('visible');
    nav.classList.add('visible');

    // Start the timeline/carousel system
    initCarouselToTimeline();

  }, 6200);
}

/* ─────────────────────────────────────────────────────────
   NAV — scroll state
   ───────────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   CAROUSEL → TIMELINE
   Cards orbit while projects section is above fold,
   then fly down and lock into timeline positions.
   ───────────────────────────────────────────────────────── */
function initCarouselToTimeline() {
  const cards    = [...document.querySelectorAll('.timeline-card')];
  const projects = document.getElementById('projects');
  const layer    = document.getElementById('cardsLayer');
  const svg      = document.getElementById('timelineSvg');
  if (!cards.length || !projects || !layer) return;

  // Show the layer now (intro is done)
  layer.classList.add('active');

  // Build SVG paths
  const pathData = generateTimelinePaths(cards, svg);

  let t = 0;

  (function animate() {
    t += 0.009;

    const rect        = projects.getBoundingClientRect();
    const scrollable  = rect.height - window.innerHeight * 0.75;
    const rawProgress = (window.innerHeight * 0.08 - rect.top) / scrollable;
    const progress    = Math.max(0, Math.min(1, rawProgress));

    animatePaths(pathData, svg, progress);

    cards.forEach((card) => {
      const idx  = Number(card.dataset.index ?? 0);
      const fork = card.dataset.fork ?? 'center';
      const slot = Number(card.dataset.slot ?? 0);
      const n    = cards.length;
      const angle = (idx / n) * Math.PI * 2 + t;

      const orbit = Math.min(260, Math.max(140, window.innerWidth * 0.17));
      const ox = Math.cos(angle) * orbit;
      const oy = Math.sin(angle * 1.3) * 22;
      const oz = Math.sin(angle) * orbit;

      // Target: timeline resting position
      const cardProgress = Math.max(0, Math.min(1, (progress - idx * 0.038) / 0.20));
      const targetY = computeSlotY(slot, cards);
      const targetX = forkX(fork);

      const x     = ox * (1 - cardProgress) + targetX * cardProgress;
      const y     = oy * (1 - cardProgress) + targetY * cardProgress;
      const z     = oz * (1 - cardProgress);
      const rotY  = angle * (1 - cardProgress);
      const scale = 0.82 + 0.18 * cardProgress;

      card.style.opacity   = String(Math.max(0.22, Math.min(1, cardProgress * 1.3)));
      card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotY}rad) scale(${scale})`;

      // Make clickable once fully placed
      if (cardProgress >= 0.95) {
        card.classList.add('placed');
      } else {
        card.classList.remove('placed');
      }
    });

    requestAnimationFrame(animate);
  })();
}

/* Vertical position per slot — spread evenly in viewport height */
function computeSlotY(slot, cards) {
  // Count total slots
  const slots = [...new Set(cards.map(c => Number(c.dataset.slot ?? 0)))].sort((a,b) => a-b);
  const totalSlots = slots.length;
  const spacing = 420; // px between slots
  const offset = (slot - (totalSlots - 1) / 2) * spacing;
  return offset;
}

/* Horizontal offset per fork type */
function forkX(fork) {
  const w = window.innerWidth;
  const clamp = (v, max) => Math.min(v, max);
  switch (fork) {
    case 'left':        return -clamp(w * 0.23, 300);
    case 'right':       return  clamp(w * 0.23, 300);
    case 'left-outer':  return -clamp(w * 0.38, 460);
    case 'left-inner':  return -clamp(w * 0.18, 220);
    case 'right-inner': return  clamp(w * 0.18, 220);
    case 'right-outer': return  clamp(w * 0.38, 460);
    default:            return 0;
  }
}

/* ─────────────────────────────────────────────────────────
   SVG PATH GENERATION
   ───────────────────────────────────────────────────────── */
function generateTimelinePaths(cards, svg) {
  if (!svg) return [];

  // Group by slot
  const groups = {};
  cards.forEach(c => {
    const s = c.dataset.slot ?? '0';
    const y = c.dataset.year ?? '';
    if (!groups[s]) groups[s] = { cards: [], year: y };
    groups[s].cards.push(c);
  });

  const slotKeys = Object.keys(groups).sort((a,b) => +a - +b);
  const CX = 500; // SVG centre X
  const SVGW = 1000;
  let svgY = 60;
  let pathHTML = '';
  let markerHTML = '';
  const registry = [];

  slotKeys.forEach((slotKey, si) => {
    const { cards: slotCards, year } = groups[slotKey];
    const n = slotCards.length;
    const isML = year.toLowerCase().includes('ml');
    const grad = isML ? 'matrixGradient' : 'timelineGradient';
    const mColor = isML ? '#00ff41' : '#ff4d00';
    const yearLabel = year.toUpperCase().replace(/-/g, ' – ');

    // Year marker
    markerHTML += `<text class="year-marker" x="${CX}" y="${svgY}"
      text-anchor="middle" fill="${mColor}" font-size="16" font-weight="700">${yearLabel}</text>`;
    svgY += 40;

    const startY = svgY;

    if (n === 1) {
      const len = 360;
      const id = `p${si}-s`;
      pathHTML += path(id, `M ${CX} ${startY} L ${CX} ${startY + len}`, grad, len);
      registry.push(id);
      svgY += len + 40;

    } else if (n === 2) {
      const lx = 330, rx = 670, branchH = 260, prepH = 60, joinH = 55;
      let cy = startY;

      // Prep
      addSeg('prep');
      cy += prepH;

      // Split
      addSeg('sl', `M ${CX} ${cy} Q ${CX-80} ${cy+30} ${lx} ${cy+prepH}`, 180);
      addSeg('sr', `M ${CX} ${cy} Q ${CX+80} ${cy+30} ${rx} ${cy+prepH}`, 180);
      cy += prepH;

      // Branches
      addSeg('bl', `M ${lx} ${cy} L ${lx} ${cy+branchH}`, branchH);
      addSeg('br', `M ${rx} ${cy} L ${rx} ${cy+branchH}`, branchH);
      cy += branchH;

      // Rejoin
      addSeg('j', `M ${lx} ${cy} Q ${CX-80} ${cy+joinH} ${CX} ${cy+joinH+10} Q ${CX+80} ${cy+joinH} ${rx} ${cy}`, 340);
      svgY = cy + joinH + 40;

      function addSeg(label, d, len) {
        if (!d) {
          d = `M ${CX} ${cy} L ${CX} ${cy + prepH}`;
          len = prepH;
        }
        const id = `p${si}-${label}`;
        pathHTML += path(id, d, grad, len);
        registry.push(id);
      }

    } else if (n === 4) {
      const xs = [210, 370, 630, 790];
      let cy = startY;
      const prepH = 50, branchH = 220, joinH = 60;

      emit('prep', `M ${CX} ${cy} L ${CX} ${cy+prepH}`, prepH); cy += prepH;
      xs.forEach((x,i) => {
        const ctrl = x < CX ? CX - 60 : CX + 60;
        emit(`sp${i}`, `M ${CX} ${cy} Q ${ctrl} ${cy+40} ${x} ${cy+prepH}`, 260);
      });
      cy += prepH;
      xs.forEach((x,i) => emit(`b${i}`, `M ${x} ${cy} L ${x} ${cy+branchH}`, branchH));
      cy += branchH;
      // Rejoin in pairs then to centre
      emit('jl',  `M ${xs[0]} ${cy} Q ${xs[1]-20} ${cy+30} ${xs[1]} ${cy+joinH}`, 150);
      emit('jlc', `M ${xs[1]} ${cy+joinH} Q ${CX-60} ${cy+joinH+20} ${CX} ${cy+joinH+30}`, 160);
      emit('jrc', `M ${CX} ${cy+joinH+30} Q ${CX+60} ${cy+joinH+20} ${xs[2]} ${cy+joinH}`, 160);
      emit('jr',  `M ${xs[2]} ${cy+joinH} Q ${xs[3]-20} ${cy+30} ${xs[3]} ${cy}`, 150);
      svgY = cy + joinH + 50;

      function emit(label, d, len) {
        const id = `p${si}-${label}`;
        pathHTML += path(id, d, grad, len);
        registry.push(id);
      }

    } else if (n === 5) {
      // 5-wide fan: two outer pairs + centre
      const xs = [155, 320, CX, 680, 845];
      let cy = startY;
      const prepH = 50, branchH = 200, joinH = 70;

      emitf('prep', `M ${CX} ${cy} L ${CX} ${cy+prepH}`, prepH); cy += prepH;
      xs.forEach((x, i) => {
        const ctrl = x < CX ? CX-80 : x > CX ? CX+80 : CX;
        emitf(`sp${i}`, `M ${CX} ${cy} Q ${ctrl} ${cy+35} ${x} ${cy+prepH}`, 280);
      });
      cy += prepH;
      xs.forEach((x,i) => emitf(`b${i}`, `M ${x} ${cy} L ${x} ${cy+branchH}`, branchH));
      cy += branchH;
      // Funnel back: outer→inner→centre
      emitf('jll', `M ${xs[0]} ${cy} Q ${xs[1]-10} ${cy+35} ${xs[1]} ${cy+joinH/2}`, 160);
      emitf('jlc', `M ${xs[1]} ${cy+joinH/2} Q ${CX-60} ${cy+joinH} ${CX} ${cy+joinH+10}`, 160);
      emitf('jrc', `M ${CX} ${cy+joinH+10} Q ${CX+60} ${cy+joinH} ${xs[3]} ${cy+joinH/2}`, 160);
      emitf('jrr', `M ${xs[3]} ${cy+joinH/2} Q ${xs[4]-10} ${cy+35} ${xs[4]} ${cy}`, 160);
      svgY = cy + joinH + 50;

      function emitf(label, d, len) {
        const id = `p${si}-${label}`;
        pathHTML += path(id, d, grad, len);
        registry.push(id);
      }
    }
  });

  // Set SVG viewBox to match generated height
  svg.setAttribute('viewBox', `0 0 ${SVGW} ${svgY + 40}`);
  svg.style.height = `${svgY + 40}px`;

  // Inject paths and markers
  svg.innerHTML += markerHTML + pathHTML;

  return registry;

  function path(id, d, grad, len) {
    return `<path class="${id}" d="${d}" stroke="url(#${grad})" stroke-width="2"
      fill="none" stroke-dasharray="${len}" stroke-dashoffset="${len}" stroke-linecap="round"/>`;
  }
}

/* ─────────────────────────────────────────────────────────
   ANIMATE PATHS  (scroll-driven reveal)
   ───────────────────────────────────────────────────────── */
function animatePaths(registry, svg, progress) {
  if (!svg || !registry.length) return;

  const yearMarkers = svg.querySelectorAll('.year-marker');

  registry.forEach((cls, i) => {
    const el = svg.querySelector('.' + CSS.escape(cls));
    if (!el) return;
    const len  = parseFloat(el.getAttribute('stroke-dasharray'));
    const start = i * 0.028;
    const dur   = 0.09;
    const p     = Math.max(0, Math.min(1, (progress - start) / dur));
    el.style.strokeDashoffset = String(len * (1 - p));
  });

  yearMarkers.forEach((m, i) => {
    const p = Math.max(0, Math.min(1, (progress - i * 0.11) / 0.06));
    m.style.opacity = String(p);
  });
}

/* ─────────────────────────────────────────────────────────
   MATRIX RAIN  (only for .matrix-card canvases)
   ───────────────────────────────────────────────────────── */
function initMatrix() {
  const chars = '10CFDML0123456789ΔΩΠΣ';
  document.querySelectorAll('.matrix-bg').forEach(canvas => {
    const ctx  = canvas.getContext('2d');
    const size = 13;
    let cols   = [];

    const resize = () => {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      const n = Math.max(1, Math.floor(canvas.width / size));
      cols = Array.from({ length: n }, () => Math.random() * canvas.height);
      ctx.font = `${size}px "Space Mono", monospace`;
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 65, 0.80)';
      cols.forEach((y, i) => {
        const c = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(c, i * size, y);
        cols[i] = y > canvas.height + Math.random() * 600 ? 0 : y + size;
      });
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
  });
}

/* ─────────────────────────────────────────────────────────
   EDUCATION AXIS
   ───────────────────────────────────────────────────────── */
function initEducationAxis() {
  const section = document.getElementById('education');
  const axis    = document.getElementById('laminar-axis');
  const ticks   = document.querySelectorAll('.edu-tick');
  if (!section || !axis) return;

  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    axis.classList.add('grown');
    setTimeout(() => ticks.forEach(t => t.classList.add('show')), 500);
    io.disconnect();
  }, { threshold: 0.3 });

  io.observe(section);
}
