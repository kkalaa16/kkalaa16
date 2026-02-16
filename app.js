window.addEventListener('load', () => {
  initFluid();
  runIntroGate();
  initCarouselTimelineFusion();
  initMatrix();
});

function initFluid() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas || typeof window.WebGLFluid !== 'function') return;

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.998,
    VELOCITY_DISSIPATION: 0.996,
    PRESSURE: 0.8,
    CURL: 84,
    SPLAT_RADIUS: 0.32,
    SPLAT_FORCE: 6200,
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

  // muted initial ignition
  for (let i = 0; i < 6; i += 1) {
    setTimeout(() => {
      splat(0.5, 0.5, (Math.random() - 0.5) * 90, (Math.random() - 0.5) * 90, { r: 0.46, g: 0.18, b: 0.03 });
    }, i * 130);
  }

  // constant background flow
  setInterval(() => {
    splat(Math.random(), Math.random(), (Math.random() - 0.5) * 24, (Math.random() - 0.5) * 24, { r: 0.56, g: 0.2, b: 0.03 });
  }, 850);

  // edge bounces keep vortices alive
  setInterval(() => {
    const t = (Date.now() / 1000) % 4;
    if (t < 1) splat(0.02, Math.random(), 60, (Math.random() - 0.5) * 30, { r: 0.5, g: 0.18, b: 0.02 });
    else if (t < 2) splat(0.98, Math.random(), -60, (Math.random() - 0.5) * 30, { r: 0.5, g: 0.18, b: 0.02 });
    else if (t < 3) splat(Math.random(), 0.02, (Math.random() - 0.5) * 30, 60, { r: 0.5, g: 0.18, b: 0.02 });
    else splat(Math.random(), 0.98, (Math.random() - 0.5) * 30, -60, { r: 0.5, g: 0.18, b: 0.02 });
  }, 620);

  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScroll;
    if (Math.abs(dy) > 1) {
      splat(Math.random(), 0.5, (Math.random() - 0.5) * 28, -dy * 10, { r: 0.62, g: 0.22, b: 0.03 });
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
  }, 800);

  setTimeout(() => {
    welcome.style.opacity = '1';
    welcome.style.transform = 'scale(1.02)';
  }, 1600);

  setTimeout(() => {
    intro.classList.add('hidden');
    topHeader.classList.add('ready');
    document.body.classList.add('intro-complete');
    document.body.classList.remove('lock-scroll');
  }, 3500);
}

function initCarouselTimelineFusion() {
  const carousel = document.getElementById('carousel3d');
  const cards = [...document.querySelectorAll('.timeline-card')];
  const projectSec = document.getElementById('projects');
  if (!carousel || !cards.length || !projectSec) return;

  let orbitTime = 0;

  const animate = () => {
    orbitTime += 0.008;
    const rect = projectSec.getBoundingClientRect();
    const progressRaw = (window.innerHeight * 0.6 - rect.top) / (rect.height - window.innerHeight);
    const progress = Math.max(0, Math.min(1, progressRaw));

    if (progress > 0.05) document.body.classList.add('timeline-mode');
    else document.body.classList.remove('timeline-mode');

    cards.forEach((card, i) => {
      const n = cards.length;
      const angle = (i / n) * Math.PI * 2 + orbitTime;
      const revRadius = Math.min(420, window.innerWidth * 0.28);

      // start in carousel orbit
      const orbitX = Math.cos(angle) * revRadius;
      const orbitY = Math.sin(angle * 1.4) * 50;
      const orbitZ = Math.sin(angle) * revRadius;

      const idx = Number(card.dataset.index || i);
      const fork = card.dataset.fork || 'center';
      const baseY = idx * 360 - 520;
      let targetX = 0;
      if (fork === 'left') targetX = -Math.min(300, window.innerWidth * 0.24);
      if (fork === 'right') targetX = Math.min(300, window.innerWidth * 0.24);

      const cardProgress = Math.max(0, Math.min(1, (progress - idx * 0.12) / 0.34));

      const x = orbitX * (1 - cardProgress) + targetX * cardProgress;
      const y = orbitY * (1 - cardProgress) + baseY * cardProgress;
      const z = orbitZ * (1 - cardProgress);
      const rotY = angle * (1 - cardProgress);
      const scale = 0.82 + 0.18 * cardProgress;

      card.style.opacity = String(0.35 + 0.65 * Math.max(cardProgress, 0.15));
      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}rad) scale(${scale})`;
    });

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
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
