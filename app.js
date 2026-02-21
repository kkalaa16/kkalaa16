'use strict';

/* ══ PROJECT DATA FOR MODALS ═══════════════════════════════ */
const PROJECT_DATA = {

  'f1-ai': {
    title: 'F1 STRATEGY AI',
    date: 'MAY – AUG 2025',
    tags: ['Machine Learning', 'DBSCAN/GMM', 'Python', 'Web Dashboard'],

    // For this project, show a clean description-first layout (no “Key Contributions” / “Results” headings)
    layout: 'description',
    extraPosition: 'afterOverview',

    // Description (what the project is + what you owned)
    overviewHTML: `Built an interactive Formula 1 strategy dashboard that combines multiple ML modules for driver profiling, tyre-choice support, qualifying pace estimation, track DNA clustering, and pit-stop strategy exploration.<br><br><b>What I was responsible for:</b> Track DNA analysis using DBSCAN and Gaussian Mixture Models, feature engineering from multi-season track geometry data, driver-performance analysis from telemetry-style signals (braking/cornering), and integrating the insights into a multi-page web dashboard.`,

    // Kept for completeness (hidden by the description layout)
    contributions: [
      'Led Track DNA Analysis module with DBSCAN & Gaussian Mixture Models',
      'Engineered feature extraction from multi-season track geometry data',
      'Conducted driver analysis mining telemetry for braking and cornering patterns',
      'Designed multi-page website with interactive visualizations'
    ],
    tech: ['Python', 'Scikit-Learn', 'DBSCAN', 'GMM', 'Pandas', 'HTML/CSS/JS', 'D3.js'],
    results: [
      '5 integrated ML models in unified dashboard',
      'Real-time race strategy insights',
      'Interactive web visualization for non-technical audiences'
    ],

    hasMatrix: true,
    extraHTML: `
      <h3 class="modal-subtitle">Check it out for yourself!</h3>
      <div class="link-preview">
        <div class="lp-frame">
          <iframe
            src="https://kkalaa16.github.io/ML_Project_F1/"
            loading="lazy"
            title="F1 Strategy AI – Preview"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            referrerpolicy="no-referrer"
          ></iframe>
        </div>
        <div class="lp-bar">
          <div class="lp-url">https://kkalaa16.github.io/ML_Project_F1/</div>
          <a class="lp-cta" href="https://kkalaa16.github.io/ML_Project_F1/" target="_blank" rel="noopener">Check it out ↗</a>
        </div>
      </div>
    `
  },

  'option-pricing': {
    title: 'OPTION PRICING · FNO',
    date: 'MAY – AUG 2025',
    tags: ['Deep Learning', 'PyTorch', 'FNO', 'Physics-Informed'],
    overview: 'Designed hybrid surrogate pricing engine for European options under Heston stochastic volatility using physics-informed Reduced-Order Model with Fourier Neural Operator residual learner.',
    contributions: [
      'Applied Lift & Learn framework for arbitrage-free ROM (99.9% variance)',
      'Generated 240 high-fidelity price surfaces via Latin Hypercube sampling',
      'Integrated real ORCL option chain data from 2019-2025',
      'Trained FNO on ROM-market residuals for enhanced predictions'
    ],
    tech: ['PyTorch', 'Fourier Neural Operator', 'NumPy', 'SciPy', 'Heston Model'],
    results: [
      '77% reduction in relative L2 error',
      '0.3 ms inference time',
      'Arbitrage-free pricing maintained',
      'Captured market volatility smiles and skews'
    ],
    hasMatrix: true
  },
  
  'ben-zinn': {
    title: 'BEN T. ZINN COMBUSTION LAB',
    date: 'JUN 2025 – PRESENT',
    tags: ['LES', 'ANSYS', 'Thermodynamics', 'Sandia-D'],
    overview: 'Developing entropy-generation analysis framework for turbulent diffusion flames using canonical Sandia-D flame as baseline to quantify thermodynamic irreversibilities from resolved temperature and species fields.',
    contributions: [
      'Built ANSYS reacting-flow CFD model validated against Sandia-D',
      'Achieved 3-digit agreement at multiple axial/radial locations',
      'Implemented Bilger mixture fraction formulation',
      'Automated post-processing with ASCII field extraction'
    ],
    tech: ['ANSYS Fluent', 'LES', 'Python', 'Thermodynamics'],
    results: [
      'Full entropy-budget capability for combustion systems',
      'Field consistency checks and benchmark comparisons',
      'Publication-ready validation datasets'
    ],
    hasMatrix: false
  },

  'tue': {
    title: 'TU/e BAKER HUGHES · FGM',
    date: 'AUG 2023 – AUG 2024',
    tags: ['FGM', 'ANSYS', 'Reacting Flows', 'Ammonia-Hydrogen'],
    overview: 'Evaluated computational performance of Flamelet Generated Manifold (FGM) methodology in ANSYS for turbulent Ammonia-Hydrogen combustion compared to conventional LES methods.',
    contributions: [
      'Achieved 86.7% reduction in simulation runtime via FGM',
      'Calibrated model with experimental flame progression data',
      'Achieved 92.66% F1 score in validation',
      'Projected ML integration for Look-Up Table generation (99.55% accuracy)'
    ],
    tech: ['ANSYS Fluent', 'FGM', 'LES', 'Python', 'Machine Learning'],
    results: [
      '86.7% runtime reduction',
      '92.66% F1 validation score',
      'Enabled rapid design iterations',
      'Data-driven combustion modeling framework'
    ],
    hasMatrix: false
  },

  'drone': {
    title: 'DRONE BLADE ANALYSIS · UNDERGRADUATE THESIS',
    date: 'AUG 2022 – MAY 2023',
    tags: ['OpenFOAM', 'RANS (k-ω SST)', 'CyclicAMI', 'Experiment + CFD'],
    overview: 'Built a low-cost experimental rig and a matching OpenFOAM workflow to quantify downwash / upthrust differences between 2-blade and 3-blade fixed-pitch drone rotors. Validated the CFD trends against vane-anemometer measurements collected at multiple downstream locations.',
    contributions: [
      'Developed a Raspberry Pi 3B PWM control loop (Python) to command BLDC RPM through an ESC + 11.1 V battery pack',
      'Set up OpenFOAM v2106 RANS (kOmegaSST) case; ran transient simulations with Δt=0.001 s over 5 s at 1500 rpm',
      'Constructed rotating/stationary mesh coupling using a cylindrical CyclicAMI interface and refined regions via snappyHexMesh',
      'Attempted 3D scanning with EinScan-SP; mitigated gloss with matte coating, then pivoted to OEM STL geometry for accuracy',
      'Compared experimental wake-velocity statistics between 2-blade and 3-blade rotors to interpret aerodynamic consistency'
    ],
    tech: ['OpenFOAM (blockMesh/snappyHexMesh)', 'CyclicAMI', 'kOmegaSST', 'Raspberry Pi', 'PWM + ESC', 'Python', '3D Scanning'],
    results: [
      'Three-blade rotor produced higher upthrust and a more consistent wake (lower velocity variation) than the two-blade rotor',
      'Experimental measurements qualitatively agreed with CFD downwash profiles, supporting the model setup',
      'Delivered a reproducible low-cost workflow for drone-propeller testing and CFD-backed diagnosis'
    ],
    hasMatrix: false,

    // Image-heavy case study: larger modal + gallery shown first
    modalSize: 'xl',
    extraPosition: 'top',
    extraHTML: `
      <div class="modal-gallery modal-gallery--hero">
        <div class="modal-figure">
          <img src="assets/drone_me_at_work.jpg" alt="Bench testing setup" />
          <div class="figcaption">Bench testing the rotor-speed control loop and measurement setup (me at work).</div>
        </div>

        <div class="modal-figure modal-figure--double">
          <div class="figure-grid">
            <img src="assets/mesh_hyperboloid.png" alt="Mesh for hyperboloid" />
            <img src="assets/mesh_cyclicami_prop.png" alt="Mesh for cyclicAMI propeller setup" />
          </div>
          <div class="figcaption">The mesh generated for hyperboloid and the cylindrical cyclicAMI with drone propeller</div>
        </div>
      </div>

      <div class="modal-gallery" style="margin-top:1.1rem;">
        <div class="modal-figure modal-figure--contain">
          <img src="assets/raspberry_pi_3b.png" alt="Raspberry Pi 3-B setup" />
          <div class="figcaption">Raspberry Pi 3-B with all the connections made and the USB wireless adapter</div>
        </div>
      </div>

      <h3 class="modal-subtitle">Expanded Discussion</h3>
      <p class="modal-paragraph">
        This work was my <b>Undergraduate Thesis</b> ("Analysis of Flow over a Drone’s Blades"). The goal was to build an end-to-end
        pipeline—<i>hardware + measurement + CFD</i>—to compare rotor configurations without specialized lab infrastructure.
        The experimental side used a vane-type anemometer to capture wake velocity statistics at fixed downstream heights, while the
        computational side used OpenFOAM RANS (kOmegaSST) with a rotating/stationary domain split coupled through <i>cyclicAMI</i>.
      </p>
      <p class="modal-paragraph">
        The thesis emphasizes repeatability: a low-cost test rig, RPM control via ESC + PWM (Raspberry Pi 3B), and a clean CFD workflow
        (blockMesh/snappyHexMesh) that can be adapted to other small-rotor configurations.
      </p>
    `
  }


  // Add more projects as needed
};

// Timeline heavy visual effects are booted only after the user opts in.
let TIMELINE_BOOTED = false;



/* ══ BOOT ═══════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  initFluid();
  runIntro();
  initMatrix();
  initEducation();
  initNav();
  
  // New sections
  setTimeout(() => {
    initRoleAnimation();
    initSkillsGlobe();
    initProjectModals();
    initAchievements();
    initContact();
    initDownloadResume();
  }, 500); // Small delay to ensure DOM is ready
});

/* ══ FLUID ══════════════════════════════════════════════════ */
function initFluid() {
  const cv = document.getElementById('fluid-canvas');
  if (!cv || typeof window.WebGLFluid !== 'function') return;
  const fluid = window.WebGLFluid(cv, {
    SIM_RESOLUTION:128, DYE_RESOLUTION:1024,
    DENSITY_DISSIPATION:.997, VELOCITY_DISSIPATION:.995,
    PRESSURE:.8, CURL:88, SPLAT_RADIUS:.3, SPLAT_FORCE:6000,
    SHADING:true, COLORFUL:false, BACK_COLOR:{r:0,g:0,b:0},
    BLOOM:false, TRANSPARENT:true,
  });
  const sp = (x,y,dx,dy,c) => fluid?.splat?.(x,y,dx,dy,c);
  window.__splat = sp;
  for (let i=0;i<5;i++)
    setTimeout(()=>sp(.5,.5,(Math.random()-.5)*80,(Math.random()-.5)*80,{r:.44,g:.17,b:.02}),i*140);
  const w1={x:.2,y:.3,vx:.0036,vy:.0027}, w2={x:.8,y:.7,vx:-.0031,vy:-.0024};
  let f=0;
  (function loop(){
    f++;
    [w1,w2].forEach(w=>{
      w.x+=w.vx; w.y+=w.vy;
      if(w.x<.02||w.x>.98)w.vx*=-1;
      if(w.y<.02||w.y>.98)w.vy*=-1;
    });
    if(f%3===0){
      sp(w1.x,w1.y,w1.vx*12000,w1.vy*12000,{r:.50,g:.18,b:.02});
      sp(w2.x,w2.y,w2.vx*11000,w2.vy*11000,{r:.45,g:.16,b:.02});
    }
    if(f%180===0) sp(Math.random(),Math.random(),(Math.random()-.5)*22,(Math.random()-.5)*22,{r:.56,g:.20,b:.03});
    requestAnimationFrame(loop);
  })();
  let lastY=window.scrollY;
  window.addEventListener('scroll',()=>{
    const dy=window.scrollY-lastY;
    if(Math.abs(dy)>1) sp(Math.random(),.5,(Math.random()-.5)*20,-dy*8,{r:.58,g:.21,b:.03});
    lastY=window.scrollY;
  },{passive:true});
}

/* ══ NAV ════════════════════════════════════════════════════ */
function initNav() {
  const h = document.getElementById('siteHeader');
  window.addEventListener('scroll',()=>h.classList.toggle('dim',window.scrollY>80),{passive:true});
}

/* ══ INTRO ══════════════════════════════════════════════════ */
function runIntro() {
  const gate    = document.getElementById('introGate');
  const hi      = document.getElementById('introHi');
  const welcome = document.getElementById('introWelcome');
  const cue     = document.getElementById('introCue');
  const header  = document.getElementById('siteHeader');
  const hero    = document.querySelector('.hero');
  const sp      = window.__splat || (()=>{});

  setTimeout(()=>{ sp(.5,.52,(Math.random()-.5)*85,(Math.random()-.5)*85,{r:.54,g:.20,b:.03}); hi.classList.add('out'); },1200);
  setTimeout(()=>welcome.classList.add('show'),2900);
  setTimeout(()=>cue.classList.add('show'),4600);
  setTimeout(()=>{
    gate.classList.add('fading');
    gate.addEventListener('transitionend',()=>gate.classList.add('gone'),{once:true});
    document.body.classList.remove('lock-scroll');
    hero.classList.add('visible');
    header.classList.add('visible');
    startExperience();
  },6200);
}

/* ══ START EXPERIENCE ═══════════════════════════════════════ */
function startExperience() {
  const staticCards = [...document.querySelectorAll('.tl-card')];
  const cardData = staticCards.map(c=>({
    el:     c,
    title:  c.querySelector('h3')?.textContent || '',
    date:   c.querySelector('.tl-date')?.textContent || '',
    matrix: c.classList.contains('tl-card--matrix'),
  }));

  const ccEls = buildCarousel(cardData);
  initUnravel(ccEls, staticCards);
  // NOTE: buildSandSpine / year stamps / reveal are intentionally deferred until unfurl.
}

/* ══ 3-D RING CAROUSEL ══════════════════════════════════════ */
function buildCarousel(cardData) {
  const stage = document.getElementById('carouselStage');
  if (!stage) return [];
  const n = cardData.length;
  const els = [];

  cardData.forEach(d=>{
    const el = document.createElement('div');
    el.className = 'cc'+(d.matrix?' cc--matrix':'');
    el.innerHTML = `<span class="cc-date">${d.date}</span><span class="cc-title">${d.title}</span>`;
    stage.appendChild(el);
    els.push(el);
  });

  const RADIUS=260, TILT_RAD=22*Math.PI/180;
  let theta=0, alive=true;

  const trigger=document.getElementById('work-section');
  new IntersectionObserver(e=>{ alive=e[0].isIntersecting; },{threshold:0.02}).observe(trigger);

  (function spin(){
    if(alive) theta+=0.007;
    els.forEach((el,i)=>{
      const a=(i/n)*Math.PI*2+theta;
      const x3=Math.sin(a)*RADIUS;
      const y3=-Math.cos(a)*RADIUS*Math.sin(TILT_RAD);
      const z3=Math.cos(a)*RADIUS*Math.cos(TILT_RAD);
      const maxZ=RADIUS*Math.cos(TILT_RAD);
      const depth=(z3+maxZ)/(2*maxZ);
      const scale=0.52+0.48*depth;
      const opac=0.08+0.88*depth;
      const blurPx=2.0*(1-depth);
      el.style.transform=`translate3d(calc(${x3}px - 50%), calc(${y3}px - 50%), ${z3.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      el.style.opacity=opac.toFixed(3);
      el.style.filter=blurPx>0.1?`blur(${blurPx.toFixed(2)}px)`:'';
      el.style.zIndex=Math.round(depth*100);
    });
    requestAnimationFrame(spin);
  })();

  return els;
}

/* ══ UNRAVEL ════════════════════════════════════════════════ */
function initUnravel(ccEls, staticCards) {
  const work = document.getElementById('work-section');
  const carousel = document.getElementById('carouselStage');
  const cue = document.getElementById('workCue');
  const zone = document.getElementById('timelineZone');
  const toast = document.getElementById('timelineToast');
  const toastClose = document.getElementById('timelineToastClose');
  if (!work || !carousel || !zone) return;

  // Start collapsed; user must opt-in.
  zone.classList.remove('open');
  zone.style.maxHeight = '0px';
  zone.inert = true;
  zone.setAttribute('aria-hidden', 'true');

  let open = false;
  let workInView = false;
  let passedWork = false;
  let lastY = window.scrollY;
  let cueTimer = null;

  const showCue = () => {
    if (open || !cue) return;
    cue.classList.add('show');
  };
  const hideCue = () => {
    if (cue) cue.classList.remove('show');
  };

  function bootTimelineOnce() {
    if (TIMELINE_BOOTED) return;
    TIMELINE_BOOTED = true;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      buildSandSpine();
      initYearStamps();
      initCardReveal();
    }));
  }

  function scrollToTimelineStart() {
    const header = document.getElementById('siteHeader');
    const offset = (header?.offsetHeight || 72) + 18;
    const firstRow = zone.querySelector('.tl-row');
    const target = firstRow || zone;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  function showTimelineToastOnce() {
    if (!toast) return;
    if (sessionStorage.getItem('timeline_toast_shown') === '1') return;
    sessionStorage.setItem('timeline_toast_shown', '1');

    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    const hide = () => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
      toast.removeEventListener('click', hide);
    };

    // Close button + click anywhere on the toast.
    toast.addEventListener('click', hide);
    toastClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      hide();
    }, { once: true });

    setTimeout(hide, 5200);
  }

  function scrollToWorkTop() {
    const header = document.getElementById('siteHeader');
    const offset = (header?.offsetHeight || 72) + 18;
    const top = work.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  }

  function openTimeline() {
    if (open) return;
    open = true;
    hideCue();

    // Expand first so target positions exist.
    zone.inert = false;
    zone.setAttribute('aria-hidden', 'false');
    zone.classList.add('open');
    zone.style.maxHeight = zone.scrollHeight + 'px';
    const onEnd = (e) => {
      if (e.propertyName === 'max-height') {
        zone.style.maxHeight = 'none';
        zone.removeEventListener('transitionend', onEnd);

        // Bring the first row to the fold once the layout is stable.
        scrollToTimelineStart();
        showTimelineToastOnce();

        // Now that the zone has its final size, boot the heavy visuals.
        bootTimelineOnce();
      }
    };
    zone.addEventListener('transitionend', onEnd);

    // Fallback in case transitionend doesn't fire (e.g., reduced motion).
    setTimeout(() => {
      // If we never received transitionend, finalize state + guide the user.
      if (zone.style.maxHeight !== 'none') {
        zone.style.maxHeight = 'none';
        scrollToTimelineStart();
        showTimelineToastOnce();
      }
      if (!TIMELINE_BOOTED) bootTimelineOnce();
    }, 900);

    // Run fly animation after layout settles.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      flyToTimeline(ccEls, staticCards);
      carousel.style.opacity = '0';
    }));

    // Note: scrolling is handled on transition end to avoid landing above empty padding.
  }

  function closeTimeline() {
    if (!open) return;
    open = false;

    // Re-show carousel
    refurlCarousel(ccEls, staticCards);
    carousel.style.opacity = '1';

    // Collapse zone
    zone.style.maxHeight = zone.scrollHeight + 'px';
    zone.getBoundingClientRect();
    zone.classList.remove('open');
    zone.style.maxHeight = '0px';
    zone.inert = true;
    zone.setAttribute('aria-hidden', 'true');

    // Prevent a leftover blank area when the timeline collapses above the viewport.
    requestAnimationFrame(() => scrollToWorkTop());
  }

  // Track work section visibility
  new IntersectionObserver(entries => {
    workInView = entries[0].isIntersecting;
    if (!workInView) hideCue();

    // Prompt when the work section is reached (similar to the intro cue).
    if (workInView && !open) {
      clearTimeout(cueTimer);
      cueTimer = setTimeout(showCue, 650);
    } else {
      clearTimeout(cueTimer);
    }
  }, { threshold: 0.35 }).observe(work);

  // Scroll logic: show prompt on upward scroll after passing the work section once.
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const dir = (y < lastY) ? 'up' : 'down';
    lastY = y;

    if (!passedWork && y > work.offsetTop + work.offsetHeight + 120) passedWork = true;

    if (!open && workInView && (dir === 'up' || !passedWork)) showCue();
    if (dir === 'down') hideCue();

    // Auto refurl when the user returns to the work section.
    if (open && y < work.offsetTop + 80) closeTimeline();
  }, { passive: true });

  const wireActivate = (el) => {
    if (!el) return;
    el.addEventListener('click', openTimeline);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTimeline();
      }
    });
  };

  wireActivate(carousel);
  wireActivate(cue);
}

function refurlCarousel(ccEls, staticCards) {
  // Reset carousel cards to original positions
  ccEls.forEach((cc, i) => {
    if (i >= staticCards.length) return;
    cc.style.position = '';
    cc.style.left = '';
    cc.style.top = '';
    cc.style.transform = '';
    cc.style.opacity = '1';
    cc.style.display = '';
    cc.style.transition = 'all 400ms cubic-bezier(0.16,1,0.3,1)';
  });
}

function flyToTimeline(ccEls, staticCards) {
  const n=Math.min(ccEls.length,staticCards.length);
  ccEls.forEach((cc,i)=>{
    if(i>=n){cc.style.display='none';return;}
    const target=staticCards[i].getBoundingClientRect();
    const ccRect=cc.getBoundingClientRect();
    const fromX=ccRect.left+ccRect.width/2;
    const fromY=ccRect.top+ccRect.height/2;
    const toX=target.left+target.width/2;
    const toY=target.top+target.height/2;
    cc.style.position='fixed';
    cc.style.left=`${fromX}px`;
    cc.style.top=`${fromY}px`;
    cc.style.transform='translate(-50%,-50%)';
    cc.style.zIndex='999';
    cc.style.transition='none';
    cc.getBoundingClientRect();
    const delay=i*28;
    cc.style.transition=`transform ${380+delay}ms cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 280ms ease ${delay}ms`;
    requestAnimationFrame(()=>{
      cc.style.transform=`translate(calc(-50% + ${toX-fromX}px), calc(-50% + ${toY-fromY}px)) scale(0.82)`;
      cc.style.opacity='0';
    });
    setTimeout(()=>cc.style.display='none', 380+delay*2+300);
  });
}

/* ══ SAND-GRAIN SPINE ═══════════════════════════════════════ */
function buildSandSpine() {
  const zone=document.getElementById('timelineZone');
  const canvas=document.getElementById('spineCanvas');
  if(!zone||!canvas) return;

  function sizeCanvas(){ canvas.width=zone.offsetWidth; canvas.height=zone.offsetHeight; }
  sizeCanvas();
  window.addEventListener('resize',()=>{ sizeCanvas(); rebuildSegs(); },{passive:true});
  const ctx=canvas.getContext('2d');

  let segs=[];

  function getOffsetInZone(el){
    let top=0,left=0,node=el;
    while(node&&node!==zone){ top+=node.offsetTop; left+=node.offsetLeft; node=node.offsetParent; }
    return {top,left,w:el.offsetWidth,h:el.offsetHeight};
  }

  function rebuildSegs(){
    segs=[];
    const rows=[...zone.querySelectorAll('.tl-row')];
    let prevMidX=null,prevBotY=null;
    rows.forEach(row=>{
      const cards=[...row.querySelectorAll('.tl-card')];
      if(!cards.length) return;
      const isGreen=cards.some(c=>c.classList.contains('tl-card--matrix'));
      const infos=cards.map(c=>{ const o=getOffsetInZone(c); return{cx:o.left+o.w/2,top:o.top,bot:o.top+o.h}; });
      const midX=infos.reduce((s,i)=>s+i.cx,0)/infos.length;
      const topY=Math.min(...infos.map(i=>i.top))-24;
      const botY=Math.max(...infos.map(i=>i.bot))+24;
      const G=isGreen;
      if(prevMidX!==null) segs.push({x1:prevMidX,y1:prevBotY,x2:midX,y2:topY,G});
      if(infos.length===1){
        const{cx,top,bot}=infos[0];
        segs.push({x1:cx,y1:topY,x2:cx,y2:top,G},{x1:cx,y1:top,x2:cx,y2:bot,G},{x1:cx,y1:bot,x2:cx,y2:botY,G});
      } else {
        const minX=Math.min(...infos.map(i=>i.cx)),maxX=Math.max(...infos.map(i=>i.cx));
        const sY=topY+18,gY=botY-18;
        segs.push({x1:midX,y1:topY,x2:midX,y2:sY,G},{x1:minX,y1:sY,x2:maxX,y2:sY,G});
        infos.forEach(({cx,top,bot})=>{
          segs.push({x1:cx,y1:sY,x2:cx,y2:top,G},{x1:cx,y1:top,x2:cx,y2:bot,G},{x1:cx,y1:bot,x2:cx,y2:gY,G});
        });
        segs.push({x1:minX,y1:gY,x2:maxX,y2:gY,G},{x1:midX,y1:gY,x2:midX,y2:botY,G});
      }
      prevMidX=midX; prevBotY=botY;
    });
  }
  rebuildSegs();

  function segLen(s){ return Math.hypot(s.x2-s.x1,s.y2-s.y1); }
  function totalLen(){ return segs.reduce((a,s)=>a+segLen(s),0); }
  function posAt(t){
    if(!segs.length) return{x:canvas.width/2,y:canvas.height/2,G:false};
    const total=totalLen();
    let d=((t%1)+1)%1*total;
    for(const s of segs){ const l=segLen(s); if(d<=l){ const f=d/l; return{x:s.x1+(s.x2-s.x1)*f,y:s.y1+(s.y2-s.y1)*f,G:s.G}; } d-=l; }
    const last=segs[segs.length-1]; return{x:last.x2,y:last.y2,G:last.G};
  }

  const N=200;
  const parts=Array.from({length:N},(_,i)=>({t:i/N,size:0.6+Math.random()*1.1,alpha:0.28+Math.random()*0.65}));
  let scrollV=0, lastSY=window.scrollY;
  window.addEventListener('scroll',()=>{ const dy=window.scrollY-lastSY; scrollV+=dy*0.00014; lastSY=window.scrollY; },{passive:true});
  let baseT=0;

  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scrollV*=0.84; baseT+=scrollV+0.00018;
    if(segs.length){
      parts.forEach(p=>{
        const t=((p.t+baseT)%1+1)%1;
        const pos=posAt(t);
        const zRect=zone.getBoundingClientRect();
        const screenY=zRect.top+(pos.y/canvas.height)*canvas.height;
        const vhFrac=screenY/window.innerHeight;
        const fade=Math.min(1,Math.max(0,(1-vhFrac)/0.22))*Math.min(1,Math.max(0,vhFrac/0.22));
        const a=p.alpha*fade;
        if(a<0.02) return;
        ctx.beginPath();
        ctx.arc(pos.x,pos.y,p.size,0,Math.PI*2);
        ctx.fillStyle=pos.G?`rgba(0,255,65,${a.toFixed(2)})`:`rgba(255,255,255,${a.toFixed(2)})`;
        ctx.fill();
      });
    }
    requestAnimationFrame(draw);
  })();

  window.addEventListener('resize',()=>setTimeout(rebuildSegs,220),{passive:true});
}

/* ══ YEAR STAMPS ════════════════════════════════════════════ */
function initYearStamps() {
  const stamps=document.querySelectorAll('.year-stamp');
  new IntersectionObserver(entries=>{
    entries.forEach(e=>e.target.classList.toggle('show',e.isIntersecting));
  },{threshold:0.15,rootMargin:'0px 0px -60px 0px'}).observe(stamps[0]||document.body);
  stamps.forEach(s=>{
    new IntersectionObserver(entries=>{
      entries.forEach(e=>e.target.classList.toggle('show',e.isIntersecting));
    },{threshold:0.15,rootMargin:'0px 0px -60px 0px'}).observe(s);
  });
}

/* ══ CARD SCROLL REVEAL ═════════════════════════════════════ */
function initCardReveal() {
  const cards=document.querySelectorAll('.tl-card');
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      const card=e.target;
      if(e.isIntersecting){
        const row=card.closest('.tl-row');
        if(row){ const sibs=[...row.querySelectorAll('.tl-card')]; card.style.transitionDelay=`${sibs.indexOf(card)*65}ms`; }
        card.classList.remove('out-view'); card.classList.add('in-view');
      } else {
        card.style.transitionDelay='0ms';
        if(e.boundingClientRect.top<0){ card.classList.remove('in-view'); card.classList.add('out-view'); }
        else { card.classList.remove('in-view','out-view'); }
      }
    });
  },{threshold:0.08,rootMargin:'20px 0px -20px 0px'}).observe(document.body);

  cards.forEach(c=>{
    new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        const card=e.target;
        if(e.isIntersecting){
          const row=card.closest('.tl-row');
          if(row){ const sibs=[...row.querySelectorAll('.tl-card')]; card.style.transitionDelay=`${sibs.indexOf(card)*65}ms`; }
          card.classList.remove('out-view'); card.classList.add('in-view');
        } else {
          card.style.transitionDelay='0ms';
          if(e.boundingClientRect.top<0){ card.classList.remove('in-view'); card.classList.add('out-view'); }
          else { card.classList.remove('in-view','out-view'); }
        }
      });
    },{threshold:0.08,rootMargin:'20px 0px -20px 0px'}).observe(c);
  });
}

/* ══ MATRIX RAIN ════════════════════════════════════════════ */
function initMatrix() {
  const chars='01CFDML0123456789';
  document.querySelectorAll('.matrix-bg').forEach(cv=>{
    const ctx=cv.getContext('2d'); const sz=13; let cols=[];
    const resize=()=>{
      cv.width=cv.parentElement.offsetWidth; cv.height=cv.parentElement.offsetHeight;
      cols=Array.from({length:Math.max(1,Math.floor(cv.width/sz))},()=>Math.random()*cv.height);
      ctx.font=`${sz}px "Space Mono",monospace`;
    };
    const draw=()=>{
      ctx.fillStyle='rgba(0,0,0,0.07)'; ctx.fillRect(0,0,cv.width,cv.height);
      ctx.fillStyle='rgba(0,255,65,0.75)';
      cols.forEach((y,i)=>{ ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*sz,y); cols[i]=y>cv.height+Math.random()*500?0:y+sz; });
      requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener('resize',resize);
  });
}

/* ══ EDUCATION ══════════════════════════════════════════════ */
function initEducation() {
  const sec   = document.getElementById('education');
  const panel = document.getElementById('eduPanel');
  const insts = document.querySelectorAll('.edu-inst');
  if (!sec || !panel) return;

  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;

    // Slide in institution cards
    insts.forEach((el, i) => setTimeout(() => el.classList.add('show'), i * 300));

    // Grow dotted line + cat travels across
    setTimeout(() => panel.classList.add('grown'), 750);

    // Test if the external sprite loads; if not, use canvas fallback
    const sprite = document.getElementById('catSprite');
    if (sprite) {
      const testImg = new Image();
      testImg.onerror = () => { sprite.style.display = 'none'; buildFallbackCat(); };
      testImg.src = sprite.style.backgroundImage.replace(/url\(['"]?|['"]?\)/g,'');
    }

  }, { threshold: 0.25 }).observe(sec);
}

/* Canvas fallback cat — used when external sprite is blocked */
function buildFallbackCat() {
  const wrap = document.getElementById('catRunner');
  if (!wrap) return;
  const cv = document.createElement('canvas');
  cv.width=80; cv.height=60;
  wrap.appendChild(cv);
  const ctx=cv.getContext('2d');
  const LEG=[[-30,20,20,-30],[-15,35,35,-15],[5,45,45,5],[25,30,30,25],[40,10,10,40],[30,-15,-15,30],[10,-30,-30,10],[-10,5,5,-10]];
  const BOB=[0,-1,-2,-1,0,1,2,1];
  let fi=0,last=0;

  function leg(x,y,a,l1,l2,back){
    const r=a*Math.PI/180, kx=x+Math.sin(r)*l1, ky=y+Math.cos(r)*l1;
    const r2=back?r-.5:r+.5, fx=kx+Math.sin(r2)*l2, fy=ky+Math.cos(r2)*l2;
    ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(kx,ky); ctx.lineTo(fx,fy);
    ctx.lineWidth=2.5; ctx.strokeStyle='#111'; ctx.lineCap='round'; ctx.stroke();
    ctx.save(); ctx.translate(fx,fy); ctx.rotate(r2+.2);
    ctx.beginPath(); ctx.ellipse(0,0,3,1.6,0,0,Math.PI*2);
    ctx.fillStyle='#111'; ctx.fill(); ctx.restore();
  }

  function draw(ts){
    if(ts-last>70){
      ctx.clearRect(0,0,80,60);
      const b=BOB[fi], L=LEG[fi];
      leg(32,36+b,L[2],10,9,true); leg(36,36+b,L[3],10,9,true);
      ctx.beginPath(); ctx.moveTo(14,28+b); ctx.bezierCurveTo(5,20+b,1,10+b,9,3+b);
      ctx.strokeStyle='#111'; ctx.lineWidth=3.5; ctx.lineCap='round'; ctx.stroke();
      ctx.save(); ctx.translate(42,30+b); ctx.beginPath(); ctx.ellipse(0,0,18,11,-.12,0,Math.PI*2); ctx.fillStyle='#111'; ctx.fill(); ctx.restore();
      ctx.beginPath(); ctx.arc(58,13+b,9,0,Math.PI*2); ctx.fillStyle='#111'; ctx.fill();
      [[54,7+b,57,1+b,62,6+b],[62,6+b,67,1+b,70,7+b]].forEach(([ax,ay,bx,by,cx2,cy2])=>{
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(cx2,cy2); ctx.closePath(); ctx.fillStyle='#111'; ctx.fill();
      });
      ctx.beginPath(); ctx.arc(62,12+b,1.8,0,Math.PI*2); ctx.fillStyle='#22cc66'; ctx.fill();
      leg(50,35+b,L[0],10,9,false); leg(53,35+b,L[1],10,9,false);
      fi=(fi+1)%8; last=ts;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* ══ ANIMATED ROLE TEXT ════════════════════════════════════ */
function initRoleAnimation() {
  const roleEl = document.getElementById('roleAnimated');
  const cursorEl = document.querySelector('.role-cursor');
  if (!roleEl) return;

  // Hide the separate cursor element - we'll include it in the text
  if (cursorEl) cursorEl.style.display = 'none';

  const roles = [
    'CFD Specialist',
    'Thermal Analyst',
    'Mechanical Engineer',
    'Systems Engineer',
    'ML Engineer',
    'Aerospace Engineer',
    'Reacting Flows Expert',
    'Propulsion Analyst'
  ];

  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[currentIndex];
    
    if (!isDeleting) {
      // Include blinking cursor in the text
      roleEl.innerHTML = currentRole.substring(0, charIndex + 1) + '<span style="color:#00bfff;animation:blink 1s step-end infinite;">|</span>';
      charIndex++;
      if (charIndex === currentRole.length) {
        setTimeout(() => { isDeleting = true; type(); }, 2000);
        return;
      }
      setTimeout(type, 100);
    } else {
      roleEl.innerHTML = currentRole.substring(0, charIndex - 1) + '<span style="color:#00bfff;animation:blink 1s step-end infinite;">|</span>';
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % roles.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 50);
    }
  }

  setTimeout(type, 1000);
}

/* ══ 3D SKILLS GLOBE ════════════════════════════════════════ */
function initSkillsGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.log('Three.js not loaded or canvas not found');
    return;
  }

  const container = canvas.parentElement;
  const tooltip = document.getElementById('skillTooltip');

  // Skills data with geo coordinates
  const skills = [
    // Distribute across entire globe - North, South, East, West
    // CFD & Simulation (Orange) - scattered
    {name:'ANSYS', icon:'A', lat:45, lon:5, color:0xff4d00, projects:['NH₃/H₂ FGM','IIT CFD']},
    {name:'OpenFOAM', icon:'OF', lat:-20, lon:30, color:0xff4d00, projects:['Drone','FSI']},
    {name:'LES', icon:'≈', lat:25, lon:-100, color:0xff4d00, projects:['Combustion']},
    {name:'FGM', icon:'🔥', lat:-35, lon:140, color:0xff4d00, projects:['TU/e 86.7%']},
    
    // Systems (Light Orange) - scattered
    {name:'SysML', icon:'⚙', lat:40, lon:-120, color:0xffa500, projects:['BWB']},
    {name:'OpenMDAO', icon:'M', lat:-15, lon:-60, color:0xffa500, projects:['AFRL +15.7%']},
    {name:'DoE', icon:'📊', lat:50, lon:90, color:0xffa500, projects:['Turbine']},
    {name:'CATIA', icon:'C', lat:-40, lon:-10, color:0xffa500, projects:['Hyperloop']},
    
    // ML & Programming (Green/Cyan) - scattered
    {name:'Python', icon:'Py', lat:10, lon:120, color:0x00ff41, projects:['F1 AI']},
    {name:'PyTorch', icon:'🔥', lat:-25, lon:-120, color:0x00ff41, projects:['FNO']},
    {name:'MATLAB', icon:'M', lat:30, lon:50, color:0x00bfff, projects:['Battery']},
    {name:'C++', icon:'C++', lat:-45, lon:170, color:0x00bfff, projects:['Solvers']},
  ];
  
  // Helper: Create icon texture
  function createIconTexture(icon, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Circle background
    ctx.fillStyle = '#' + color.toString(16).padStart(6, '0');
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.fill();
    
    // Icon text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, 32, 32);
    
    return new THREE.CanvasTexture(canvas);
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Globe
  const globeGeom = new THREE.SphereGeometry(100, 64, 64);
  const globeMat = new THREE.MeshBasicMaterial({
    color:0x0a0a0e,
    wireframe:true,
    transparent:true,
    opacity:0.15
  });
  const globe = new THREE.Mesh(globeGeom, globeMat);
  scene.add(globe);

  // Glow atmosphere
  const glowGeom = new THREE.SphereGeometry(102, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color:0x0066cc,
    transparent:true,
    opacity:0.08,
    side:THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  scene.add(glow);

  // Skill icons as sprites
  const skillObjects = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  skills.forEach(skill => {
    // Convert lat/lon to 3D position
    const radius = 130;
    const phi = (90 - skill.lat) * Math.PI / 180;
    const theta = (skill.lon + 180) * Math.PI / 180;
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    // Create sprite
    const texture = createIconTexture(skill.icon, skill.color);
    const spriteMat = new THREE.SpriteMaterial({
      map:texture,
      transparent:true,
      opacity:0.95
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(x, y, z);
    sprite.scale.set(20, 20, 1);  // Increased from 12 to 20
    sprite.userData = {
      skill:skill,
      baseScale:20,  // Updated from 12 to 20 to match new size
      baseOpacity:0.9,
      angle:0
    };
    scene.add(sprite);
    skillObjects.push(sprite);

    // Geo pin on globe surface
    const pinGeom = new THREE.ConeGeometry(2, 8, 8);
    const pinMat = new THREE.MeshBasicMaterial({color:skill.color, transparent:true, opacity:0});
    const pin = new THREE.Mesh(pinGeom, pinMat);
    const pinRadius = 101;
    const px = -pinRadius * Math.sin(phi) * Math.cos(theta);
    const py = pinRadius * Math.cos(phi);
    const pz = pinRadius * Math.sin(phi) * Math.sin(theta);
    pin.position.set(px, py, pz);
    pin.lookAt(0, 0, 0);
    pin.rotateX(Math.PI);
    sprite.userData.pin = pin;
    scene.add(pin);
  });

  // Mouse interaction
  let hoveredSkill = null;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(skillObjects);

    if (intersects.length > 0) {
      const sprite = intersects[0].object;
      if (hoveredSkill !== sprite) {
        // Reset previous
        if (hoveredSkill) {
          hoveredSkill.scale.set(hoveredSkill.userData.baseScale, hoveredSkill.userData.baseScale, 1);
          hoveredSkill.material.opacity = hoveredSkill.userData.baseOpacity;
          if (hoveredSkill.userData.pin) hoveredSkill.userData.pin.material.opacity = 0;
        }
        // Highlight new
        hoveredSkill = sprite;
        sprite.scale.set(sprite.userData.baseScale*1.5, sprite.userData.baseScale*1.5, 1);
        sprite.material.opacity = 1;
        if (sprite.userData.pin) sprite.userData.pin.material.opacity = 0.8;

        // Show tooltip
        const skill = sprite.userData.skill;
        tooltip.querySelector('.tooltip-skill-name').textContent = skill.name;
        const projectsHTML = skill.projects.map(p=>`<div class="tooltip-project-item">${p}</div>`).join('');
        tooltip.querySelector('.tooltip-projects').innerHTML = projectsHTML;
        tooltip.style.left = (e.clientX - rect.left + 20) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 20) + 'px';
        tooltip.classList.add('visible');
      }
    } else {
      if (hoveredSkill) {
        hoveredSkill.scale.set(hoveredSkill.userData.baseScale, hoveredSkill.userData.baseScale, 1);
        hoveredSkill.material.opacity = hoveredSkill.userData.baseOpacity;
        if (hoveredSkill.userData.pin) hoveredSkill.userData.pin.material.opacity = 0;
        hoveredSkill = null;
        tooltip.classList.remove('visible');
      }
    }
  });

  // Drag controls
  let isDragging = false;
  let previousMousePosition = {x:0, y:0};

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.offsetX - previousMousePosition.x;
      const deltaY = e.offsetY - previousMousePosition.y;
      globe.rotation.y += deltaX * 0.005;
      globe.rotation.x += deltaY * 0.005;
      glow.rotation.copy(globe.rotation);
      // Rotate sprites with globe
      skillObjects.forEach(sprite => {
        sprite.userData.angle += deltaX * 0.005;
      });
    }
    previousMousePosition = {x:e.offsetX, y:e.offsetY};
  });

  canvas.addEventListener('mouseup', () => isDragging = false);
  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    if (hoveredSkill) {
      hoveredSkill.scale.set(hoveredSkill.userData.baseScale, hoveredSkill.userData.baseScale, 1);
      hoveredSkill.material.opacity = hoveredSkill.userData.baseOpacity;
      if (hoveredSkill.userData.pin) hoveredSkill.userData.pin.material.opacity = 0;
      hoveredSkill = null;
      tooltip.classList.remove('visible');
    }
  });

  // Zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.1;
    camera.position.z = Math.max(250, Math.min(600, camera.position.z));
  }, {passive:false});

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Slow auto-rotation
    if (!isDragging) {
      globe.rotation.y += 0.001;
      glow.rotation.y += 0.001;
    }

    // Update sprite positions to follow globe rotation
    skillObjects.forEach(sprite => {
      const skill = sprite.userData.skill;
      const radius = 130;
      const phi = (90 - skill.lat) * Math.PI / 180;
      const theta = (skill.lon + 180 + globe.rotation.y * 180 / Math.PI) * Math.PI / 180;
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      sprite.position.set(x, y, z);

      // Pin follows too
      if (sprite.userData.pin) {
        const pinRadius = 101;
        const px = -pinRadius * Math.sin(phi) * Math.cos(theta);
        const py = pinRadius * Math.cos(phi);
        const pz = pinRadius * Math.sin(phi) * Math.sin(theta);
        sprite.userData.pin.position.set(px, py, pz);
      }
    });

    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}


/* ══ PROJECT MODAL SYSTEM ══════════════════════════════════ */
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const modalMatrixBg = document.getElementById('modalMatrixBg');
  
  if (!modal) return;
  
  // Click + keyboard handlers for all project cards
  document.querySelectorAll('[data-project-id]').forEach(card => {
    // Make cards focusable for keyboard users
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');

    const launch = () => {
      const projectId = card.dataset.projectId;
      const projectData = PROJECT_DATA[projectId] || buildFallbackProjectData(card);
      openModal(projectData);
    };

    card.addEventListener('click', launch);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        launch();
      }
    });
  });

  function buildFallbackProjectData(cardEl) {
    const title = cardEl.querySelector('h3')?.textContent?.trim() || 'PROJECT';
    const date = cardEl.querySelector('.tl-date')?.textContent?.trim() || '';
    const overview = cardEl.querySelector('p')?.textContent?.trim() || 'Details coming soon.';
    const tags = [...cardEl.querySelectorAll('.tl-tags span')].map(s => s.textContent.trim()).filter(Boolean);

    const matrixHint = cardEl.classList.contains('tl-card--matrix') ||
      tags.some(t => /machine learning|deep learning|pytorch|neural/i.test(t));

    return {
      title,
      date,
      tags: tags.length ? tags : ['Portfolio'],
      overview,
      contributions: ['Full case study is being curated.'],
      tech: tags.length ? tags : ['—'],
      results: ['Supporting artifacts are available elsewhere in the portfolio.'],
      hasMatrix: matrixHint
    };
  }
  
  
  function openModal(data) {
    const modalBody = modal.querySelector('.modal-body');
    const grid = modal.querySelector('.modal-grid');
    const resultsSection = modal.querySelector('.modal-results');
    const overviewEl = document.getElementById('modalOverview');
    const extra = document.getElementById('modalExtra');

    // Reset per-open layout classes
    modalContent.classList.remove('modal-xl');

    // Size variants (used for image-heavy projects)
    if (data.modalSize === 'xl') {
      modalContent.classList.add('modal-xl');
    }

    // Populate modal content
    document.getElementById('modalDate').textContent = data.date || '';
    document.getElementById('modalTitle').textContent = data.title || '';

    // Tags
    const tags = Array.isArray(data.tags) ? data.tags : [];
    document.getElementById('modalTags').innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');

    // Overview (supports HTML for curated descriptions)
    if (data.overviewHTML) {
      overviewEl.innerHTML = data.overviewHTML;
    } else {
      overviewEl.textContent = data.overview || '';
    }

    // Sections
    const contributions = Array.isArray(data.contributions) ? data.contributions : [];
    const tech = Array.isArray(data.tech) ? data.tech : [];
    const results = Array.isArray(data.results) ? data.results : [];

    document.getElementById('modalContributions').innerHTML = contributions.map(c => `<li>${c}</li>`).join('');
    document.getElementById('modalTech').innerHTML = tech.map(t => `<span>${t}</span>`).join('');
    document.getElementById('modalResults').innerHTML = results.map(r => `<li>${r}</li>`).join('');

    // Layout controls
    const isDescriptionLayout = data.layout === 'description';
    if (grid) grid.style.display = (isDescriptionLayout || data.hideGrid) ? 'none' : '';
    if (resultsSection) resultsSection.style.display = (isDescriptionLayout || data.hideResults) ? 'none' : '';

    // Optional rich content (images, embeds, etc.)
    if (extra) {
      extra.innerHTML = data.extraHTML || '';
      extra.classList.remove('is-top', 'is-after-overview');

      // Default placement: bottom
      const pos = data.extraPosition || 'bottom';
      if (pos === 'top') {
        extra.classList.add('is-top');
        if (modalBody && overviewEl) modalBody.insertBefore(extra, overviewEl);
      } else if (pos === 'afterOverview') {
        extra.classList.add('is-after-overview');
        if (modalBody) {
          if (grid) modalBody.insertBefore(extra, grid);
          else if (resultsSection) modalBody.insertBefore(extra, resultsSection);
          else modalBody.appendChild(extra);
        }
      } else {
        if (modalBody) modalBody.appendChild(extra);
      }
    }

    // Matrix background for ML/DL projects
    if (data.hasMatrix) {
      modalContent.classList.add('matrix-active');
    } else {
      modalContent.classList.remove('matrix-active');
    }

    // Show modal first so the matrix canvas can size correctly
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Start matrix after layout is visible
    if (data.hasMatrix) {
      requestAnimationFrame(() => initModalMatrix());
    }
  }

  
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalContent.classList.remove('matrix-active');

    const extra = document.getElementById('modalExtra');
    if (extra) extra.innerHTML = '';
  }
  
  // Close handlers
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  
  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* Modal Matrix Background */
function initModalMatrix() {
  const canvas = document.getElementById('modalMatrixBg');
  if (!canvas) return;

  // Prevent duplicate intervals if the same modal is opened repeatedly.
  if (canvas.dataset.running === '1') return;
  canvas.dataset.running = '1';
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
  
  const chars = '01CFDML0123456789';
  const fontSize = 12;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,255,65,0.6)';
    ctx.font = `${fontSize}px "Space Mono",monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  const interval = setInterval(draw, 50);
  
  // Clean up on modal close
  const modal = document.getElementById('projectModal');
  const observer = new MutationObserver(() => {
    if (!modal.classList.contains('active')) {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.dataset.running = '0';
      observer.disconnect();
    }
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
}

/* ══ ACHIEVEMENTS COUNTERS ═════════════════════════════════ */
function initAchievements() {
  const section = document.getElementById('achievements');
  if (!section) return;

  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;

    // Animate score radials
    document.querySelectorAll('.score-radial').forEach(radial => {
      const score = parseFloat(radial.dataset.score);
      const fill = radial.querySelector('.score-fill');
      const circ = 2 * Math.PI * 50; // r=50
      const offset = circ * (1 - score/100);
      setTimeout(()=> fill.style.strokeDashoffset = offset, 100);
    });

    // Animate counters
    document.querySelectorAll('.score-number, .impact-number').forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 1500;
      const start = Date.now();
      const update = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
      };
      setTimeout(update, 200);
    });

    io.disconnect();
  }, {threshold:0.3});
  io.observe(section);
}

/* ══ CONTACT FORM ══════════════════════════════════════════ */
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const btn = form.querySelector('button');
    const orig = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    // Simulate send (replace with actual endpoint)
    setTimeout(() => {
      btn.innerHTML = '<span>Sent!</span>';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
      }, 2000);
    }, 1000);
  });
}

/* ══ DOWNLOAD RESUME ═══════════════════════════════════════ */
function initDownloadResume() {
  const btn = document.getElementById('downloadResume');
  if (!btn) return;

  btn.addEventListener('click', e => {
    e.preventDefault();
    
    // Create a link to the PDF from project files
    const link = document.createElement('a');
    link.href = 'Krtin_Kala_Resume.pdf';
    link.download = 'Krtin_Kala_Resume.pdf';
    link.click();
    
    // Visual feedback
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 200);
  });
}

