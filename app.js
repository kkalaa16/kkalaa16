window.addEventListener("load", () => {
  initFluid();
  initMatrixCards();
});

function initFluid() {
  const canvas = document.getElementById("fluid-canvas");
  if (!canvas || typeof window.WebGLFluid !== "function") return;

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 0.99,
    VELOCITY_DISSIPATION: 0.992,
    PRESSURE: 0.8,
    CURL: 75,
    SPLAT_RADIUS: 0.35,
    SPLAT_FORCE: 7000,
    SHADING: true,
    COLORFUL: false,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    BLOOM: false,
    TRANSPARENT: true
  });

  const splat = (x, y, dx, dy, color) => {
    if (fluid && typeof fluid.splat === "function") fluid.splat(x, y, dx, dy, color);
  };

  (function heartbeat() {
    splat(Math.random(), Math.random(), (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, {
      r: 0.8,
      g: 0.3,
      b: 0
    });
    setTimeout(heartbeat, 1000);
  })();

  for (let i = 0; i < 10; i += 1) {
    setTimeout(() => {
      splat(0.5, 0.5, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, {
        r: 1,
        g: 0.4,
        b: 0
      });
    }, i * 120);
  }

  const uv = (clientX, clientY) => ({
    x: clientX / window.innerWidth,
    y: 1 - clientY / window.innerHeight
  });

  let last = null;
  window.addEventListener("pointerdown", (e) => {
    const p = uv(e.clientX, e.clientY);
    splat(p.x, p.y, (Math.random() - 0.5) * 240, (Math.random() - 0.5) * 240, { r: 1, g: 0.35, b: 0.02 });
  });

  window.addEventListener("pointermove", (e) => {
    if (!last) {
      last = { x: e.clientX, y: e.clientY };
      return;
    }
    if (e.buttons !== 1) {
      last = { x: e.clientX, y: e.clientY };
      return;
    }
    const p = uv(e.clientX, e.clientY);
    splat(p.x, p.y, (e.clientX - last.x) * 8, (last.y - e.clientY) * 8, { r: 0.96, g: 0.32, b: 0.01 });
    last = { x: e.clientX, y: e.clientY };
  });

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const delta = window.scrollY - lastScrollY;
    if (Math.abs(delta) > 2) {
      for (let i = 0; i < 4; i += 1) {
        splat(Math.random(), 0.5, (Math.random() - 0.5) * 30, -delta * 15, { r: 0.9, g: 0.3, b: 0 });
      }
    }
    lastScrollY = window.scrollY;
  });
}

function initMatrixCards() {
  const matrixCanvases = document.querySelectorAll(".matrix-canvas");
  matrixCanvases.forEach((canvas) => runMatrix(canvas));
}

function runMatrix(canvas) {
  const ctx = canvas.getContext("2d");
  const chars = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let columns = [];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width));
    canvas.height = Math.max(1, Math.floor(rect.height));
    const fontSize = 14;
    const count = Math.max(1, Math.floor(canvas.width / fontSize));
    columns = Array.from({ length: count }, () => Math.random() * canvas.height);
    ctx.font = `${fontSize}px monospace`;
  };

  resize();
  window.addEventListener("resize", resize);

  const draw = () => {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(45, 255, 93, 0.7)";

    const fontSize = 14;
    for (let i = 0; i < columns.length; i += 1) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = columns[i];
      ctx.fillText(text, x, y);
      columns[i] = y > canvas.height + Math.random() * 1000 ? 0 : y + fontSize;
    }

    requestAnimationFrame(draw);
  };

  draw();
}
