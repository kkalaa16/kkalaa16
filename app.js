window.addEventListener('load', () => {
  initFluid();
  initCarousel();
  initTimelineTransition();
  initMatrix();
});

function initFluid() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas || typeof window.WebGLFluid !== 'function') return;

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.986,
    VELOCITY_DISSIPATION: 0.992,
    PRESSURE: 0.8,
    CURL: 60,
    SPLAT_RADIUS: 0.32,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    BLOOM: false,
    TRANSPARENT: true
  });

  const splat = (x, y, dx, dy, color) => {
    if (fluid && typeof fluid.splat === 'function') fluid.splat(x, y, dx, dy, color);
  };

  for (let i = 0; i < 8; i += 1) {
    setTimeout(() => {
      splat(0.5, 0.5, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120, { r: 0.58, g: 0.22, b: 0.03 });
    }, i * 120);
  }

  (function heartbeat() {
    splat(Math.random(), Math.random(), (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 18, { r: 0.5, g: 0.18, b: 0.02 });
    setTimeout(heartbeat, 1200);
  })();

  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScroll;
    if (Math.abs(dy) > 1) {
      splat(Math.random(), 0.5, (Math.random() - 0.5) * 24, -dy * 8, { r: 0.62, g: 0.22, b: 0.03 });
    }
    lastScroll = window.scrollY;
  });
}

function initCarousel() {
  const container = document.getElementById('carousel3d');
  if (!container) return;
  const cards = [...container.querySelectorAll('.orbit-card')];
  const count = cards.length;
  let angle = 0;

  const layout = () => {
    const radius = Math.min(330, Math.max(200, window.innerWidth * 0.22));
    cards.forEach((card, i) => {
      const a = ((360 / count) * i + angle) * (Math.PI / 180);
      const x = Math.sin(a) * radius;
      const z = Math.cos(a) * radius;
      const scale = 0.72 + ((z + radius) / (2 * radius)) * 0.34;
      card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${Math.sin(a * 1.2) * 20}px), ${z}px) scale(${scale})`;
      card.style.zIndex = `${Math.floor(z + radius)}`;
      card.style.opacity = `${0.45 + (z + radius) / (2 * radius) * 0.55}`;
    });
  };

  const tick = () => {
    angle += 0.14;
    layout();
    requestAnimationFrame(tick);
  };

  layout();
  requestAnimationFrame(tick);
  window.addEventListener('resize', layout);
}

function initTimelineTransition() {
  const projects = document.getElementById('projects');
  if (!projects) return;

  const onScroll = () => {
    const y = projects.getBoundingClientRect().top;
    if (y < window.innerHeight * 0.75) {
      document.body.classList.add('timeline-mode');
    } else {
      document.body.classList.remove('timeline-mode');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMatrix() {
  const canvases = document.querySelectorAll('.matrix-bg');
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%';

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
        const x = i * size;
        ctx.fillText(c, x, y);
        cols[i] = y > canvas.height + Math.random() * 700 ? 0 : y + size;
      });

      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
  });
}
