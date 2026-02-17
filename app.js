window.addEventListener('load', () => {
  initFluid();
  runIntroGate();
  generateTimelineSVG();
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
    DENSITY_DISSIPATION: 0.997,
    VELOCITY_DISSIPATION: 0.995,
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

  // Initial splats
  for (let i = 0; i < 6; i += 1) {
    setTimeout(() => {
      splat(0.5, 0.5, (Math.random() - 0.5) * 88, (Math.random() - 0.5) * 88, { r: 0.46, g: 0.18, b: 0.03 });
    }, i * 130);
  }

  // Continuous animation
  const edge = { x: 0.2, y: 0.2, vx: 0.0038, vy: 0.0029 };
  let frame = 0;

  const loop = () => {
    frame += 1;
    if (frame % 120 === 0) {
      splat(Math.random(), Math.random(), (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 18, { r: 0.56, g: 0.2, b: 0.03 });
    }
    edge.x += edge.vx;
    edge.y += edge.vy;
    if (edge.x < 0.02 || edge.x > 0.98) edge.vx *= -1;
    if (edge.y < 0.02 || edge.y > 0.98) edge.vy *= -1;
    if (frame % 3 === 0) {
      splat(edge.x, edge.y, edge.vx * 14500, edge.vy * 14500, { r: 0.52, g: 0.19, b: 0.02 });
    }
    if (frame % 240 === 0) {
      splat(0.2 + Math.random() * 0.6, 0.2 + Math.random() * 0.6, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 35, { r: 0.62, g: 0.22, b: 0.03 });
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  // Scroll interaction
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

function generateTimelineSVG() {
  const svg = document.querySelector('.timeline-svg');
  const cards = [...document.querySelectorAll('.timeline-card')];
  if (!svg || !cards.length) return;

  // Group cards by year/slot
  const groups = {};
  cards.forEach(card => {
    const slot = card.dataset.slot;
    const year = card.dataset.year;
    if (!groups[slot]) groups[slot] = { cards: [], year };
    groups[slot].cards.push(card);
  });

  // Build timeline paths dynamically
  let y = 100;
  const centerX = 500;
  let pathHTML = '';
  let markerHTML = '';
  const pathRegistry = [];

  Object.keys(groups).sort((a, b) => a - b).forEach((slotKey, slotIdx) => {
    const group = groups[slotKey];
    const numCards = group.cards.length;
    const yearLabel = group.year;
    
    // Determine if this is ML section
    const isML = yearLabel && yearLabel.includes('ml');
    const gradient = isML ? 'matrixGradient' : 'timelineGradient';
    const markerColor = isML ? '#00ff41' : '#ff4d00';
    
    // Year marker
    const yearText = yearLabel ? yearLabel.toUpperCase().replace(/-/g, ' - ') : `SLOT ${slotKey}`;
    markerHTML += `<text class="year-marker ${isML ? 'matrix-year' : ''}" x="500" y="${y - 20}" text-anchor="middle" fill="${markerColor}" font-size="18" font-weight="700" font-family="Space Mono">${yearText}</text>`;

    // Start point
    const startY = y;
    y += 120;

    // Single card - straight line
    if (numCards === 1) {
      const pathId = `path-${slotIdx}-single`;
      pathHTML += `<path class="${pathId}" d="M ${centerX} ${startY} L ${centerX} ${y + 280}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="400" stroke-dashoffset="400"/>`;
      pathRegistry.push(pathId);
      y += 300;
    }
    // Two cards - split left/right
    else if (numCards === 2) {
      const leftX = 340;
      const rightX = 660;
      
      pathHTML += `<path class="path-${slotIdx}-prep" d="M ${centerX} ${startY} L ${centerX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathRegistry.push(`path-${slotIdx}-prep`);
      
      const splitY = y;
      y += 60;
      
      pathHTML += `<path class="path-${slotIdx}-split-left" d="M ${centerX} ${splitY} Q 425 ${splitY + 40} ${leftX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="220" stroke-dashoffset="220"/>`;
      pathHTML += `<path class="path-${slotIdx}-split-right" d="M ${centerX} ${splitY} Q 575 ${splitY + 40} ${rightX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="220" stroke-dashoffset="220"/>`;
      pathRegistry.push(`path-${slotIdx}-split-left`, `path-${slotIdx}-split-right`);
      
      const branchY = y;
      y += 240;
      
      pathHTML += `<path class="path-${slotIdx}-branch-left" d="M ${leftX} ${branchY} L ${leftX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="240" stroke-dashoffset="240"/>`;
      pathHTML += `<path class="path-${slotIdx}-branch-right" d="M ${rightX} ${branchY} L ${rightX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="240" stroke-dashoffset="240"/>`;
      pathRegistry.push(`path-${slotIdx}-branch-left`, `path-${slotIdx}-branch-right`);
      
      const joinStartY = y;
      y += 70;
      
      pathHTML += `<path class="path-${slotIdx}-join" d="M ${leftX} ${joinStartY} Q 420 ${joinStartY + 50} ${centerX} ${y} Q 580 ${joinStartY + 50} ${rightX} ${joinStartY}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="380" stroke-dashoffset="380"/>`;
      pathRegistry.push(`path-${slotIdx}-join`);
    }
    // 4 cards - quad split
    else if (numCards === 4) {
      const positions = [240, 380, 620, 760];
      
      pathHTML += `<path class="path-${slotIdx}-prep" d="M ${centerX} ${startY} L ${centerX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathRegistry.push(`path-${slotIdx}-prep`);
      
      const splitY = y;
      y += 100;
      
      positions.forEach((x, i) => {
        const label = ['ll', 'l', 'r', 'rr'][i];
        const control = i < 2 ? 380 : 620;
        pathHTML += `<path class="path-${slotIdx}-split-${label}" d="M ${centerX} ${splitY} Q ${control} ${splitY + 50} ${x} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="300" stroke-dashoffset="300"/>`;
        pathRegistry.push(`path-${slotIdx}-split-${label}`);
      });
      
      const branchY = y;
      y += 220;
      
      positions.forEach((x, i) => {
        const label = ['ll', 'l', 'r', 'rr'][i];
        pathHTML += `<path class="path-${slotIdx}-branch-${label}" d="M ${x} ${branchY} L ${x} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="220" stroke-dashoffset="220"/>`;
        pathRegistry.push(`path-${slotIdx}-branch-${label}`);
      });
      
      const joinY = y;
      y += 100;
      
      pathHTML += `<path class="path-${slotIdx}-join-1" d="M ${positions[0]} ${joinY} Q 310 ${joinY + 50} ${positions[1]} ${joinY + 70}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="180" stroke-dashoffset="180"/>`;
      pathHTML += `<path class="path-${slotIdx}-join-2" d="M ${positions[1]} ${joinY + 70} Q 440 ${joinY + 90} ${centerX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="150" stroke-dashoffset="150"/>`;
      pathHTML += `<path class="path-${slotIdx}-join-3" d="M ${centerX} ${y} Q 560 ${joinY + 90} ${positions[2]} ${joinY + 70}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="150" stroke-dashoffset="150"/>`;
      pathHTML += `<path class="path-${slotIdx}-join-4" d="M ${positions[2]} ${joinY + 70} Q 690 ${joinY + 50} ${positions[3]} ${joinY}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="180" stroke-dashoffset="180"/>`;
      pathRegistry.push(`path-${slotIdx}-join-1`, `path-${slotIdx}-join-2`, `path-${slotIdx}-join-3`, `path-${slotIdx}-join-4`);
    }
    // 5 cards - special ML layout
    else if (numCards === 5) {
      const positions = [180, 340, 500, 660, 820];
      
      pathHTML += `<path class="path-${slotIdx}-prep" d="M ${centerX} ${startY} L ${centerX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathRegistry.push(`path-${slotIdx}-prep`);
      
      const splitY = y;
      y += 80;
      
      // Split to left pair and right pair, center stays
      pathHTML += `<path class="path-${slotIdx}-split-left-main" d="M ${centerX} ${splitY} Q 400 ${splitY + 40} 260 ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="300" stroke-dashoffset="300"/>`;
      pathHTML += `<path class="path-${slotIdx}-split-right-main" d="M ${centerX} ${splitY} Q 600 ${splitY + 40} 740 ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="300" stroke-dashoffset="300"/>`;
      pathRegistry.push(`path-${slotIdx}-split-left-main`, `path-${slotIdx}-split-right-main`);
      
      const subSplitY = y;
      y += 60;
      
      pathHTML += `<path class="path-${slotIdx}-split-ll" d="M 260 ${subSplitY} Q 230 ${subSplitY + 30} ${positions[0]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathHTML += `<path class="path-${slotIdx}-split-l" d="M 260 ${subSplitY} Q 290 ${subSplitY + 30} ${positions[1]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathHTML += `<path class="path-${slotIdx}-center" d="M ${centerX} ${splitY} L ${centerX} ${y + 180}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="320" stroke-dashoffset="320"/>`;
      pathHTML += `<path class="path-${slotIdx}-split-r" d="M 740 ${subSplitY} Q 710 ${subSplitY + 30} ${positions[3]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathHTML += `<path class="path-${slotIdx}-split-rr" d="M 740 ${subSplitY} Q 770 ${subSplitY + 30} ${positions[4]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="120" stroke-dashoffset="120"/>`;
      pathRegistry.push(`path-${slotIdx}-split-ll`, `path-${slotIdx}-split-l`, `path-${slotIdx}-center`, `path-${slotIdx}-split-r`, `path-${slotIdx}-split-rr`);
      
      const branchY = y;
      y += 180;
      
      pathHTML += `<path class="path-${slotIdx}-branch-ll" d="M ${positions[0]} ${branchY} L ${positions[0]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="180" stroke-dashoffset="180"/>`;
      pathHTML += `<path class="path-${slotIdx}-branch-l" d="M ${positions[1]} ${branchY} L ${positions[1]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="180" stroke-dashoffset="180"/>`;
      pathHTML += `<path class="path-${slotIdx}-branch-r" d="M ${positions[3]} ${branchY} L ${positions[3]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="180" stroke-dashoffset="180"/>`;
      pathHTML += `<path class="path-${slotIdx}-branch-rr" d="M ${positions[4]} ${branchY} L ${positions[4]} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="180" stroke-dashoffset="180"/>`;
      pathRegistry.push(`path-${slotIdx}-branch-ll`, `path-${slotIdx}-branch-l`, `path-${slotIdx}-branch-r`, `path-${slotIdx}-branch-rr`);
      
      const joinY = y;
      y += 130;
      
      pathHTML += `<path class="path-${slotIdx}-join-1" d="M ${positions[0]} ${joinY} Q 260 ${joinY + 50} ${positions[1]} ${joinY + 70}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="200" stroke-dashoffset="200"/>`;
      pathHTML += `<path class="path-${slotIdx}-join-2" d="M ${positions[1]} ${joinY + 70} Q 420 ${joinY + 90} ${centerX} ${y}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="200" stroke-dashoffset="200"/>`;
      pathHTML += `<path class="path-${slotIdx}-join-3" d="M ${centerX} ${y} Q 580 ${joinY + 90} ${positions[3]} ${joinY + 70}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="200" stroke-dashoffset="200"/>`;
      pathHTML += `<path class="path-${slotIdx}-join-4" d="M ${positions[3]} ${joinY + 70} Q 740 ${joinY + 50} ${positions[4]} ${joinY}" stroke="url(#${gradient})" stroke-width="2.5" fill="none" stroke-dasharray="200" stroke-dashoffset="200"/>`;
      pathRegistry.push(`path-${slotIdx}-join-1`, `path-${slotIdx}-join-2`, `path-${slotIdx}-join-3`, `path-${slotIdx}-join-4`);
    }
  });

  svg.innerHTML += markerHTML + pathHTML;
  window._timelinePaths = pathRegistry;
}

function initSingleSetCarouselToTimeline() {
  const cards = [...document.querySelectorAll('.timeline-card')];
  const projects = document.getElementById('projects');
  if (!cards.length || !projects) return;

  let t = 0;

  const animate = () => {
    t += 0.009;

    const rect = projects.getBoundingClientRect();
    const startOffset = window.innerHeight * 0.08;
    const progressRaw = (startOffset - rect.top) / (rect.height - window.innerHeight * 0.75);
    const progress = Math.max(0, Math.min(1, progressRaw));

    updateTimelinePaths(progress);

    cards.forEach((card, i) => {
      const n = cards.length;
      const angle = (i / n) * Math.PI * 2 + t;
      const orbitRadius = Math.min(300, Math.max(170, window.innerWidth * 0.19));

      const orbitX = Math.cos(angle) * orbitRadius;
      const orbitY = Math.sin(angle * 1.35) * 24;
      const orbitZ = Math.sin(angle) * orbitRadius;

      const idx = Number(card.dataset.index || i);
      const fork = card.dataset.fork || 'center';
      const slot = Number(card.dataset.slot ?? idx);
      const targetY = slot * 500 + 100;
      
      let targetX = 0;
      if (fork === 'left') targetX = -Math.min(320, window.innerWidth * 0.25);
      if (fork === 'right') targetX = Math.min(320, window.innerWidth * 0.25);
      if (fork === 'left-outer') targetX = -Math.min(480, window.innerWidth * 0.35);
      if (fork === 'left-inner') targetX = -Math.min(280, window.innerWidth * 0.20);
      if (fork === 'right-inner') targetX = Math.min(280, window.innerWidth * 0.20);
      if (fork === 'right-outer') targetX = Math.min(480, window.innerWidth * 0.35);

      const cardProgress = Math.max(0, Math.min(1, (progress - idx * 0.04) / 0.22));

      const x = orbitX * (1 - cardProgress) + targetX * cardProgress;
      const y = orbitY * (1 - cardProgress) + targetY * cardProgress;
      const z = orbitZ * (1 - cardProgress);
      const rotY = angle * (1 - cardProgress);
      const scale = 0.8 + 0.2 * cardProgress;

      card.style.opacity = progress <= 0 ? '1' : String(Math.max(0.25, Math.min(1, cardProgress * 1.2)));
      card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateY(${rotY}rad) scale(${scale})`;
    });

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

function updateTimelinePaths(progress) {
  const svg = document.querySelector('.timeline-svg');
  if (!svg || !window._timelinePaths) return;

  const paths = window._timelinePaths;
  const yearMarkers = svg.querySelectorAll('.year-marker');

  paths.forEach((pathClass, i) => {
    const element = svg.querySelector(`.${pathClass}`);
    if (!element) return;
    
    const dashArray = element.getAttribute('stroke-dasharray');
    const length = parseFloat(dashArray);
    const startProgress = i * 0.03;
    const duration = 0.08;
    const pathProgress = Math.max(0, Math.min(1, (progress - startProgress) / duration));
    
    element.style.strokeDashoffset = length * (1 - pathProgress);
  });

  yearMarkers.forEach((marker, i) => {
    const markerProgress = Math.max(0, Math.min(1, (progress - i * 0.10) / 0.05));
    marker.style.opacity = markerProgress;
  });

  if (progress > 0.03) {
    document.body.classList.add('path-active');
  } else {
    document.body.classList.remove('path-active');
  }
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

    document.body.classList.toggle('at-top', atTop);
    document.body.classList.toggle('title-fly', fly);

    if (topHeader) topHeader.classList.toggle('scrolled', y > 220);
  };

  updateTitleFlightVectors();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateTitleFlightVectors);
  window.addEventListener('scroll', updateTitleFlightVectors, { passive: true });
}
