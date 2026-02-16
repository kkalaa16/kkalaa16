window.addEventListener("load", () => {
  const canvas = document.getElementById("fluid-canvas");
  if (!canvas || typeof window.WebGLFluid !== "function") return;

  const fluidOptions = {
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
  };

  const fluid = window.WebGLFluid(canvas, fluidOptions);

  function triggerSplat(x, y, dx, dy, color) {
    if (fluid && typeof fluid.splat === "function") {
      fluid.splat(x, y, dx, dy, color);
    } else if (window.fluid && typeof window.fluid.splat === "function") {
      window.fluid.splat(x, y, dx, dy, color);
    }
  }

  function heartbeat() {
    const x = Math.random();
    const y = Math.random();
    const dx = (Math.random() - 0.5) * 20;
    const dy = (Math.random() - 0.5) * 20;
    triggerSplat(x, y, dx, dy, { r: 0.8, g: 0.3, b: 0 });
    setTimeout(heartbeat, 1000);
  }

  function ignition() {
    for (let i = 0; i < 10; i += 1) {
      setTimeout(() => {
        triggerSplat(
          0.5,
          0.5,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          { r: 1, g: 0.4, b: 0 }
        );
      }, i * 120);
    }
  }

  function clientToUv(clientX, clientY) {
    return {
      x: clientX / window.innerWidth,
      y: 1 - clientY / window.innerHeight
    };
  }

  window.addEventListener("pointerdown", (event) => {
    const p = clientToUv(event.clientX, event.clientY);
    triggerSplat(p.x, p.y, (Math.random() - 0.5) * 240, (Math.random() - 0.5) * 240, {
      r: 1,
      g: 0.36,
      b: 0.02
    });
  });

  let lastPointer = null;
  window.addEventListener("pointermove", (event) => {
    if (!lastPointer) {
      lastPointer = { x: event.clientX, y: event.clientY };
      return;
    }

    if (event.buttons !== 1) {
      lastPointer = { x: event.clientX, y: event.clientY };
      return;
    }

    const p = clientToUv(event.clientX, event.clientY);
    const dx = (event.clientX - lastPointer.x) * 8;
    const dy = (lastPointer.y - event.clientY) * 8;
    triggerSplat(p.x, p.y, dx, dy, { r: 0.96, g: 0.32, b: 0.01 });
    lastPointer = { x: event.clientX, y: event.clientY };
  });

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (Math.abs(delta) > 2) {
      for (let i = 0; i < 4; i += 1) {
        triggerSplat(
          Math.random(),
          0.5,
          (Math.random() - 0.5) * 30,
          -delta * 15,
          { r: 0.9, g: 0.3, b: 0 }
        );
      }
    }

    lastScrollY = currentScrollY;
  });

  heartbeat();
  ignition();
});
