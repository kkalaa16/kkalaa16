window.onload = function () {
  const canvas = document.getElementById('fluid-canvas');
  const hi = document.getElementById('hi-text');
  const welcome = document.getElementById('welcome-text');

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.985,
    VELOCITY_DISSIPATION: 0.992,
    PRESSURE: 0.8,
    CURL: 62,
    SPLAT_RADIUS: 0.34,
    SPLAT_FORCE: 6400,
    SHADING: true,
    COLORFUL: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    BLOOM: false,
    TRANSPARENT: true
  });

  const safeSplat = (x, y, dx, dy, color) => {
    if (fluid && typeof fluid.splat === 'function') {
      fluid.splat(x, y, dx, dy, color);
    }
  };

  // Intro: Hi -> dissolve into swirl -> welcome text
  setTimeout(() => {
    // muted opening burst (reduced white intensity)
    safeSplat(0.5, 0.52, (Math.random() - 0.5) * 110, (Math.random() - 0.5) * 110, {
      r: 0.62,
      g: 0.24,
      b: 0.04
    });

    setTimeout(() => {
      hi.style.opacity = '0';
      hi.style.filter = 'blur(14px)';
      hi.style.transform = 'scale(0.92)';

      setTimeout(() => {
        welcome.style.opacity = '1';
      }, 850);
    }, 900);
  }, 700);

  // Continuous fluid activity in background
  function heartbeat() {
    safeSplat(Math.random(), Math.random(), (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16, {
      r: 0.55,
      g: 0.2,
      b: 0.02
    });
    setTimeout(heartbeat, 1100);
  }
  heartbeat();

  // Additional background motion to prevent settling
  function driftPulse() {
    safeSplat(0.5 + (Math.random() - 0.5) * 0.4, 0.5 + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, {
      r: 0.68,
      g: 0.24,
      b: 0.03
    });
    setTimeout(driftPulse, 2400);
  }
  driftPulse();

  // matrix background for ML cards
  const matrixCanvases = document.querySelectorAll('.matrix-bg');
  const mChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%';

  matrixCanvases.forEach((mCanvas) => {
    const ctx = mCanvas.getContext('2d');
    let columns;
    let drops;

    function resize() {
      mCanvas.width = mCanvas.parentElement.offsetWidth;
      mCanvas.height = mCanvas.parentElement.offsetHeight;
      columns = Math.max(1, Math.floor(mCanvas.width / 20));
      drops = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, mCanvas.width, mCanvas.height);
      ctx.fillStyle = '#0bdc43';
      ctx.font = '14px Space Mono';

      for (let i = 0; i < drops.length; i += 1) {
        const text = mChars[Math.floor(Math.random() * mChars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > mCanvas.height && Math.random() > 0.974) drops[i] = 0;
        drops[i] += 1;
      }
    }

    resize();
    setInterval(draw, 42);
    window.addEventListener('resize', resize);
  });

  // scroll splats near visible cards
  const cards = document.querySelectorAll('.interact-card');
  let lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScroll;
    if (Math.abs(dy) > 1) {
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          const x = (r.left + r.width / 2) / window.innerWidth;
          const y = 1 - (r.top + r.height / 2) / window.innerHeight;
          safeSplat(x, y, (Math.random() - 0.5) * 12, -dy * 9, { r: 0.66, g: 0.22, b: 0.02 });
        }
      });
    }
    lastScroll = window.scrollY;
  });
};
