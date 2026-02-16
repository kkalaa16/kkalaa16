window.addEventListener('load', () => {
  initFluid();
  runIntroGate();
  initSingleSetCarouselToTimeline();
  initMatrix();
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
  let frame = 0;

  const loop = () => {
    frame += 1;

    if (frame % 7 === 0) {
      splat(Math.random(), Math.random(), (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, { r: 0.56, g: 0.2, b: 0.03 });
    }

    edge.x += edge.vx;
    edge.y += edge.vy;
    if (edge.x < 0.02 || edge.x > 0.98) edge.vx *= -1;
    if (edge.y < 0.02 || edge.y > 0.98) edge.vy *= -1;

    if (frame % 3 === 0) {
      splat(edge.x, edge.y, edge.vx * 14500, edge.vy * 14500, { r: 0.52, g: 0.19, b: 0.02 });
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

function initSingleSetCarouselToTimeline() {
  const cards = [...document.querySelectorAll('.timeline-card')];
  const projects = document.getElementById('projects');
  if (!cards.length || !projects) return;

  let t = 0;

  const animate = () => {
    t += 0.009;

    const rect = projects.getBoundingClientRect();
    const progressRaw = (window.innerHeight * 0.62 - rect.top) / (rect.height - window.innerHeight);
    const progress = Math.max(0, Math.min(1, progressRaw));

    cards.forEach((card, i) => {
      const n = cards.length;
      const angle = (i / n) * Math.PI * 2 + t;
      const orbitRadius = Math.min(300, Math.max(180, window.innerWidth * 0.2));

      // SAME cards in carousel first
      const orbitX = Math.cos(angle) * orbitRadius;
      const orbitY = Math.sin(angle * 1.35) * 24;
      const orbitZ = Math.sin(angle) * orbitRadius;

      // then SAME cards become timeline anchors
      const idx = Number(card.dataset.index || i);
      const fork = card.dataset.fork || 'center';
      const targetY = idx * 280 - 420;
      let targetX = 0;
      if (fork === 'left') targetX = -Math.min(270, window.innerWidth * 0.22);
      if (fork === 'right') targetX = Math.min(270, window.innerWidth * 0.22);

      const cardProgress = Math.max(0, Math.min(1, (progress - idx * 0.11) / 0.33));

      const x = orbitX * (1 - cardProgress) + targetX * cardProgress;
      const y = orbitY * (1 - cardProgress) + targetY * cardProgress;
      const z = orbitZ * (1 - cardProgress);
      const rotY = angle * (1 - cardProgress);
      const scale = 0.8 + 0.2 * cardProgress;

      card.style.opacity = String(0.3 + 0.7 * Math.max(cardProgress, 0.18));
      card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotY}rad) scale(${scale})`;
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
