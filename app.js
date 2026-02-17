window.addEventListener('load', () => {
  initFluid();
  runIntroGate();
  initSingleSetCarouselToTimeline();
  initMatrix();
  initEducationAxis();
  initHeaderAndTopState();
  initProjectsStageVisibility();
  initSectionNavHighlight();
});

function initFluid() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas || typeof window.WebGLFluid !== 'function') return;

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.999,
    VELOCITY_DISSIPATION: 0.997,
    PRESSURE: 0.8,
    CURL: 88,
    SPLAT_RADIUS: 0.33,
    SPLAT_FORCE: 6500,
    SHADING: true,
    COLORFUL: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    BLOOM: false,
    TRANSPARENT: true
  });

  const splat = (x, y, dx, dy, color) => {
    if (fluid && typeof fluid.splat === 'function') fluid.splat(x, y, dx, dy, color);
  };
  window.__splat = splat;

  for (let i = 0; i < 6; i += 1) {
    setTimeout(() => {
      splat(0.5, 0.5, (Math.random() - 0.5) * 88, (Math.random() - 0.5) * 88, { r: 0.46, g: 0.18, b: 0.03 });
    }, i * 130);
  }

  const edge = { x: 0.2, y: 0.2, vx: 0.0038, vy: 0.0029 };
  const edge2 = { x: 0.78, y: 0.68, vx: -0.0031, vy: 0.0024 };
  let frame = 0;

  const loop = () => {
    frame += 1;

    if (frame % 7 === 0) {
      splat(Math.random(), Math.random(), (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, { r: 0.56, g: 0.2, b: 0.03 });
    }

    edge.x += edge.vx;
    edge.y += edge.vy;
    edge2.x += edge2.vx;
    edge2.y += edge2.vy;
    if (edge.x < 0.02 || edge.x > 0.98) edge.vx *= -1;
    if (edge.y < 0.02 || edge.y > 0.98) edge.vy *= -1;
    if (edge2.x < 0.02 || edge2.x > 0.98) edge2.vx *= -1;
    if (edge2.y < 0.02 || edge2.y > 0.98) edge2.vy *= -1;

    if (frame % 3 === 0) {
      splat(edge.x, edge.y, edge.vx * 14500, edge.vy * 14500, { r: 0.52, g: 0.19, b: 0.02 });
      splat(edge2.x, edge2.y, edge2.vx * 14000, edge2.vy * 14000, { r: 0.45, g: 0.17, b: 0.02 });
    }

    if (frame % 120 === 0) {
      splat(0.06, Math.random(), 34, (Math.random() - 0.5) * 30, { r: 0.48, g: 0.18, b: 0.03 });
      splat(0.94, Math.random(), -34, (Math.random() - 0.5) * 30, { r: 0.48, g: 0.18, b: 0.03 });
    }

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScroll;
    if (Math.abs(dy) > 1) {
      splat(Math.random(), 0.5, (Math.random() - 0.5) * 24, -dy * 9, { r: 0.62, g: 0.22, b: 0.03 });
    }
    lastScroll = window.scrollY;
  });
}

function runIntroGate() {
  const hi = document.getElementById('introHi');
  const welcome = document.getElementById('introWelcome');
  const intro = document.getElementById('introSequence');
  const topHeader = document.getElementById('topHeader');
  const splat = window.__splat || (() => {});

  setTimeout(() => {
    splat(0.5, 0.52, (Math.random() - 0.5) * 90, (Math.random() - 0.5) * 90, { r: 0.56, g: 0.2, b: 0.03 });
    hi.style.opacity = '0';
    hi.style.filter = 'blur(12px)';
    hi.style.transform = 'scale(0.93)';
  }, 1200);

  setTimeout(() => {
    welcome.style.opacity = '1';
    welcome.style.transform = 'translateY(0)';
  }, 2900);

  setTimeout(() => {
    intro.classList.add('hidden');
    topHeader.classList.add('ready');
    document.body.classList.add('intro-complete');
    document.body.classList.add('at-top');
    document.body.classList.remove('lock-scroll');
  }, 6200);
}

function initSingleSetCarouselToTimeline() {
  const cards = [...document.querySelectorAll('.timeline-card')];
  const projects = document.getElementById('projects');
  const svg = document.getElementById('timelineSvg');
  if (!cards.length || !projects) return;

  const pathRegistry = generateTimelinePaths(cards, svg);
  let t = 0;

  const animate = () => {
    t += 0.009;

    const rect = projects.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight * 0.75;
    const rawProgress = (window.innerHeight * 0.08 - rect.top) / scrollable;
    const progress = Math.max(0, Math.min(1, rawProgress));
    const pathActive = progress > 0.08;
    document.body.classList.toggle('path-active', pathActive);

    // Keep SVG generation active for consistency, but primary visible line is the live dotted spine.
    animatePaths(pathRegistry, svg, progress);

    const slots = [...new Set(cards.map((c) => Number(c.dataset.slot ?? 0)))].sort((a, b) => a - b);
    const totalSlots = slots.length;
    const slotIndex = new Map(slots.map((slot, i) => [slot, i]));
    const spacing = Math.max(170, Math.min(210, window.innerHeight * 0.22));
    const baseY = window.innerHeight * 0.52;
    const travel = progress * (totalSlots * spacing + window.innerHeight * 0.95);

    cards.forEach((card, i) => {
      const idx = Number(card.dataset.index ?? i);
      const slot = Number(card.dataset.slot ?? idx);
      const slotOrder = slotIndex.get(slot) ?? 0;
      const fork = card.dataset.fork ?? 'center';
      const n = cards.length;
      const angle = (idx / n) * Math.PI * 2 + t;

      const orbit = Math.min(230, Math.max(120, window.innerWidth * 0.14));
      const ox = Math.cos(angle) * orbit;
      const oy = Math.sin(angle * 1.3) * 20;
      const oz = Math.sin(angle) * orbit;

      // Transition by timeline slot (concurrent projects move together), not by card index.
      const cardProgress = Math.max(0, Math.min(1, (progress - slotOrder * 0.065) / 0.26));
      const targetX = forkX(fork);
      const targetY = slotOrder * spacing + baseY - travel;

      const x = ox * (1 - cardProgress) + targetX * cardProgress;
      const y = oy * (1 - cardProgress) + targetY * cardProgress;
      const z = oz * (1 - cardProgress) - (1 - cardProgress) * 520;
      const rotY = angle * (1 - cardProgress);
      const scale = 0.84 + 0.16 * cardProgress;

      // Keep readable viewport window only.
      const viewY = window.innerHeight / 2 + y;
      const inLower = Math.max(0, Math.min(1, (viewY - window.innerHeight * 0.08) / (window.innerHeight * 0.30)));
      const inUpper = Math.max(0, Math.min(1, (window.innerHeight * 0.90 - viewY) / (window.innerHeight * 0.28)));
      const readableOpacity = Math.max(0, Math.min(1, inLower * inUpper));
      let opacity = progress <= 0 ? 1 : Math.max(0.02, readableOpacity * 1.15);
      if (progress > 0.08 && cardProgress < 0.22) opacity *= 0.08;

      card.style.opacity = String(opacity);
      card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotY}rad) scale(${scale})`;

      if (cardProgress >= 0.92 && opacity > 0.22) card.classList.add('placed');
      else card.classList.remove('placed');
    });

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function computeSlotY(slot, cards) {
  const slots = [...new Set(cards.map((c) => Number(c.dataset.slot ?? 0)))].sort((a, b) => a - b);
  const total = slots.length;
  const spacing = 150;
  return (slot - (total - 1) / 2) * spacing;
}

function forkX(fork) {
  const w = window.innerWidth;
  const clamp = (v, max) => Math.min(v, max);
  switch (fork) {
    case 'left': return -clamp(w * 0.23, 300);
    case 'right': return clamp(w * 0.23, 300);
    case 'left-outer': return -clamp(w * 0.36, 450);
    case 'left-inner': return -clamp(w * 0.18, 230);
    case 'right-inner': return clamp(w * 0.18, 230);
    case 'right-outer': return clamp(w * 0.36, 450);
    default: return 0;
  }
}

function generateTimelinePaths(cards, svg) {
  if (!svg) return [];

  const groups = {};
  cards.forEach((card) => {
    const slot = card.dataset.slot ?? '0';
    if (!groups[slot]) groups[slot] = [];
    groups[slot].push(card);
  });

  const slotKeys = Object.keys(groups).sort((a, b) => +a - +b);
  const CX = 500;
  const SVGW = 1000;
  let y = 60;
  let html = '';
  const registry = [];

  slotKeys.forEach((slotKey, si) => {
    const slotCards = groups[slotKey];
    const xs = slotCards.map((c) => CX + forkX(c.dataset.fork ?? 'center'));
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const n = slotCards.length;

    if (n === 1) {
      const id = `p${si}-single`;
      html += path(id, `M ${CX} ${y} L ${CX} ${y + 220}`);
      registry.push({ id, start: si * 0.045, dur: 0.1 });
      y += 250;
      return;
    }

    const prep = 36;
    const branchH = 140;
    const recon = 36;

    const idPrep = `p${si}-prep`;
    html += path(idPrep, `M ${CX} ${y} L ${CX} ${y + prep}`);
    registry.push({ id: idPrep, start: si * 0.045, dur: 0.08 });
    y += prep;

    const idSplit = `p${si}-split`;
    html += path(idSplit, `M ${minX} ${y} L ${maxX} ${y}`);
    registry.push({ id: idSplit, start: si * 0.045 + 0.02, dur: 0.08 });

    xs.forEach((x, i) => {
      const idBranch = `p${si}-br${i}`;
      html += path(idBranch, `M ${x} ${y} L ${x} ${y + branchH}`);
      registry.push({ id: idBranch, start: si * 0.045 + 0.04, dur: 0.1 });
    });
    y += branchH;

    const idJoin = `p${si}-join`;
    html += path(idJoin, `M ${minX} ${y} L ${maxX} ${y}`);
    registry.push({ id: idJoin, start: si * 0.045 + 0.11, dur: 0.08 });

    const idOut = `p${si}-out`;
    html += path(idOut, `M ${CX} ${y} L ${CX} ${y + recon}`);
    registry.push({ id: idOut, start: si * 0.045 + 0.14, dur: 0.07 });

    y += recon + 36;
  });

  svg.setAttribute('viewBox', `0 0 ${SVGW} ${y + 20}`);
  svg.style.height = `${y + 20}px`;
  svg.innerHTML = svg.querySelector('defs').outerHTML + html;

  return registry;

  function path(id, d) {
    return `<path class="${id}" d="${d}" stroke="url(#timelineGradient)" stroke-width="2" fill="none" opacity="0" stroke-dasharray="5 10" stroke-dashoffset="36"/>`;
  }
}

function animatePaths(registry, svg, progress) {
  if (!svg || !registry.length) return;

  registry.forEach((seg) => {
    const el = svg.querySelector('.' + CSS.escape(seg.id));
    if (!el) return;
    const p = Math.max(0, Math.min(1, (progress - seg.start) / seg.dur));
    el.style.opacity = String(p);
    el.style.strokeDashoffset = String((1 - p) * 24 - progress * 20);
  });
}



function initEducationAxis() {
  const section = document.getElementById('education');
  const axis = document.getElementById('laminar-axis');
  const ticks = document.querySelectorAll('.edu-tick');
  if (!section || !axis || !ticks.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    axis.style.width = '100%';
    setTimeout(() => ticks.forEach((t) => (t.style.opacity = '1')), 450);
    observer.disconnect();
  }, { threshold: 0.35 });

  observer.observe(section);
}

function initMatrix() {
  const canvases = document.querySelectorAll('.matrix-bg');
  const chars = '10CFDMLDL0123456789';

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    let cols = [];
    const size = 14;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      const n = Math.max(1, Math.floor(canvas.width / size));
      cols = Array.from({ length: n }, () => Math.random() * canvas.height);
      ctx.font = `${size}px Space Mono`;
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(20, 255, 90, 0.78)';

      cols.forEach((y, i) => {
        const c = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(c, i * size, y);
        cols[i] = y > canvas.height + Math.random() * 700 ? 0 : y + size;
      });
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
  });
}



function initProjectsStageVisibility() {
  const projects = document.getElementById('projects');
  if (!projects) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.some((entry) => entry.isIntersecting);
    document.body.classList.toggle('projects-active', visible);
  }, { threshold: 0.02 });

  observer.observe(projects);
}

function initHeaderAndTopState() {
  const topHeader = document.getElementById('topHeader');
  const introName = document.getElementById('introNameWord');
  const introPortfolio = document.getElementById('introPortfolioWord');
  const headerName = document.getElementById('headerNameWord');
  const headerPortfolio = document.getElementById('headerPortfolioWord');

  const updateTitleFlightVectors = () => {
    if (!introName || !introPortfolio || !headerName || !headerPortfolio) return;

    const nameA = introName.getBoundingClientRect();
    const nameB = headerName.getBoundingClientRect();
    const portA = introPortfolio.getBoundingClientRect();
    const portB = headerPortfolio.getBoundingClientRect();

    const nameDx = (nameB.left + nameB.width / 2) - (nameA.left + nameA.width / 2);
    const nameDy = (nameB.top + nameB.height / 2) - (nameA.top + nameA.height / 2);
    const portDx = (portB.left + portB.width / 2) - (portA.left + portA.width / 2);
    const portDy = (portB.top + portB.height / 2) - (portA.top + portA.height / 2);

    document.body.style.setProperty('--name-fx', `${nameDx.toFixed(2)}px`);
    document.body.style.setProperty('--name-fy', `${nameDy.toFixed(2)}px`);
    document.body.style.setProperty('--portfolio-fx', `${portDx.toFixed(2)}px`);
    document.body.style.setProperty('--portfolio-fy', `${portDy.toFixed(2)}px`);
  };

  const onScroll = () => {
    const y = window.scrollY;
    const atTop = y < 40;
    const fly = y > 95;
    const landed = y > 185;

    document.body.classList.toggle('at-top', atTop);
    document.body.classList.toggle('title-fly', fly);
    document.body.classList.toggle('title-landed', landed);

    if (topHeader) topHeader.classList.toggle('scrolled', y > 220);
  };

  updateTitleFlightVectors();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateTitleFlightVectors);
  setTimeout(updateTitleFlightVectors, 900);
}

function initSectionNavHighlight() {
  const links = [...document.querySelectorAll('.top-nav-links a')];
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const target = document.querySelector(link.getAttribute('href'));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const match = sections.find((item) => item.target === entry.target);
      if (!match) return;
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.remove('active'));
        match.link.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] });

  sections.forEach((item) => observer.observe(item.target));
}
