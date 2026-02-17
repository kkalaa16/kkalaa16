window.addEventListener('load', () => {
  initFluid();
  runIntroGate();
  initSingleSetCarouselToTimeline();
  initMatrix();
  initEducationAxis();
  initHeaderAndTopState();
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
  const path = document.querySelector('.timeline-path');
  if (!cards.length || !projects) return;

  let t = 0;

  const animate = () => {
    t += 0.009;

    const rect = projects.getBoundingClientRect();
    const startOffset = window.innerHeight * 0.08;
    const progressRaw = (startOffset - rect.top) / (rect.height - window.innerHeight * 0.75);
    const progress = Math.max(0, Math.min(1, progressRaw));

    if (path) {
      const pMain = Math.max(0, Math.min(1, (progress - 0.05) / 0.55));
      const pBranch = Math.max(0, Math.min(1, (progress - 0.22) / 0.22));
      const pBottom = Math.max(0, Math.min(1, (progress - 0.52) / 0.2));
      const firstCardProgress = Math.max(0, Math.min(1, progress / 0.31));
      const pathActive = firstCardProgress > 0.14;

      path.style.setProperty('--p-main', pMain.toFixed(4));
      path.style.setProperty('--p-branch', pBranch.toFixed(4));
      path.style.setProperty('--p-bottom', pBottom.toFixed(4));
      document.body.style.setProperty('--timeline-progress', pathActive ? pMain.toFixed(4) : '0');

      if (pathActive) document.body.classList.add('path-active');
      else document.body.classList.remove('path-active');
    }

    cards.forEach((card, i) => {
      const n = cards.length;
      const angle = (i / n) * Math.PI * 2 + t;
      const orbitRadius = Math.min(300, Math.max(170, window.innerWidth * 0.19));

      // SAME cards in carousel first
      const orbitX = Math.cos(angle) * orbitRadius;
      const orbitY = Math.sin(angle * 1.35) * 24;
      const orbitZ = Math.sin(angle) * orbitRadius;

      // then SAME cards become timeline anchors
      const idx = Number(card.dataset.index || i);
      const fork = card.dataset.fork || 'center';
      const slot = Number(card.dataset.slot ?? idx);
      const targetY = slot * 300 - 380;
      let targetX = 0;
      if (fork === 'left') targetX = -Math.min(250, window.innerWidth * 0.2);
      if (fork === 'right') targetX = Math.min(250, window.innerWidth * 0.2);

      const cardProgress = Math.max(0, Math.min(1, (progress - idx * 0.10) / 0.31));

      const x = orbitX * (1 - cardProgress) + targetX * cardProgress;
      const y = orbitY * (1 - cardProgress) + targetY * cardProgress;
      const z = orbitZ * (1 - cardProgress);
      const rotY = angle * (1 - cardProgress);
      const scale = 0.8 + 0.2 * cardProgress;

      card.style.opacity = progress <= 0 ? '1' : String(Math.max(0.18, Math.min(1, cardProgress * 1.15)));
      card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotY}rad) scale(${scale})`;
    });

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
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
  window.addEventListener('scroll', updateTitleFlightVectors, { passive: true });
}
