/**
 * Liquid Latent Space interaction layer
 * - Animated fluid-like gradient blobs on canvas
 * - Pointer-reactive drift
 * - Glass card tilt/parallax
 */

class FluidBlobField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.blobs = [];
    this.pointer = { x: 0.5, y: 0.5, active: false };
    this.lastTime = performance.now();

    this.palette = [
      [87, 214, 255],
      [143, 123, 255],
      [98, 245, 197],
      [255, 122, 223]
    ];

    this.#setup();
  }

  #setup() {
    this.#resize();
    this.#seedBlobs();

    window.addEventListener("resize", () => this.#resize());
    window.addEventListener("pointermove", (event) => {
      this.pointer.x = event.clientX / this.width;
      this.pointer.y = event.clientY / this.height;
      this.pointer.active = true;
    });

    window.addEventListener("pointerleave", () => {
      this.pointer.active = false;
    });

    requestAnimationFrame((t) => this.#tick(t));
  }

  #resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  #seedBlobs() {
    const count = Math.max(6, Math.round(this.width / 260));
    this.blobs = Array.from({ length: count }, (_, i) => {
      const color = this.palette[i % this.palette.length];
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: this.#rand(120, 290),
        vx: this.#rand(-0.04, 0.04),
        vy: this.#rand(-0.03, 0.03),
        phase: Math.random() * Math.PI * 2,
        wobble: this.#rand(0.15, 0.42),
        alpha: this.#rand(0.16, 0.27),
        color
      };
    });
  }

  #rand(min, max) {
    return min + Math.random() * (max - min);
  }

  #tick(now) {
    const dt = Math.min(32, now - this.lastTime);
    this.lastTime = now;

    this.#update(dt);
    this.#render(now);

    requestAnimationFrame((t) => this.#tick(t));
  }

  #update(dt) {
    const pointerForce = this.pointer.active ? 0.00055 : 0.00017;

    for (const blob of this.blobs) {
      const dx = this.pointer.x * this.width - blob.x;
      const dy = this.pointer.y * this.height - blob.y;
      const dist = Math.hypot(dx, dy) || 1;

      const pull = Math.min(1, 260 / dist) * pointerForce * dt;
      blob.vx += (dx / dist) * pull;
      blob.vy += (dy / dist) * pull;

      blob.vx *= 0.995;
      blob.vy *= 0.995;

      blob.x += blob.vx * dt;
      blob.y += blob.vy * dt;

      if (blob.x < -blob.r) blob.x = this.width + blob.r;
      if (blob.x > this.width + blob.r) blob.x = -blob.r;
      if (blob.y < -blob.r) blob.y = this.height + blob.r;
      if (blob.y > this.height + blob.r) blob.y = -blob.r;

      blob.phase += 0.00085 * dt;
    }
  }

  #render(now) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = "screen";

    for (const blob of this.blobs) {
      const pulse = 1 + Math.sin(now * 0.0006 + blob.phase) * blob.wobble;
      const radius = blob.r * pulse;
      const [r, g, b] = blob.color;

      const grad = ctx.createRadialGradient(blob.x, blob.y, radius * 0.08, blob.x, blob.y, radius);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha + 0.08})`);
      grad.addColorStop(0.48, `rgba(${r}, ${g}, ${b}, ${blob.alpha})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(4, 7, 14, 0.14)";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

function setupGlassTilt(selector = ".case-card") {
  const cards = document.querySelectorAll(selector);

  cards.forEach((card) => {
    let rafId = null;

    function paint(clientX, clientY) {
      const rect = card.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      card.style.borderColor = "rgba(207, 232, 255, 0.42)";
    }

    card.addEventListener("pointermove", (event) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => paint(event.clientX, event.clientY));
    });

    card.addEventListener("pointerleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.borderColor = "rgba(175, 214, 255, 0.24)";
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fluid-layer");
  if (canvas) {
    new FluidBlobField(canvas);
  }

  setupGlassTilt(".case-card");
});
