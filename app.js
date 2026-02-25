'use strict';

/* ══ PROJECT DATA FOR MODALS ══════════════════════════════ */
const PROJECT_DATA = {
  'f1-ai': {
    title: 'F1 STRATEGY AI',
    date: 'MAY – AUG 2025',
    tags: ['Machine Learning', 'DBSCAN/GMM', 'Python', 'Web Dashboard'],

    layout: 'description',
    extraPosition: 'afterOverview',

    overviewHTML: `Built an interactive Formula 1 strategy dashboard that combines multiple ML modules for driver profiling, tyre-choice support, qualifying pace estimation, track DNA clustering, and pit-stop strategy exploration.<br><br><b>What I was responsible for:</b> Track DNA analysis using DBSCAN and Gaussian Mixture Models, feature engineering from multi-season track geometry data, driver-performance analysis from telemetry-style signals (braking/cornering), and integrating the insights into a multi-page web dashboard.`,

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
    title: 'OPTION PRICING · HYBRID HESTON (ROM + FNO)',
    date: 'MAY – AUG 2025',
    tags: ['Deep Learning', 'PyTorch', 'FNO', 'Physics-Informed', 'Heston'],

    overview:
      'Built a hybrid surrogate for Heston option pricing using a physics-informed reduced-order model (Lift & Learn ROM) plus a neural-operator residual corrector trained on market option chains to recover skews/smiles while preserving arbitrage structure from the ROM.',

    contributions: [
      'Designed a two-stage pricing architecture: physics-informed ROM baseline + neural residual correction',
      'Constructed a market data pipeline that converts scattered implied-volatility data into smooth continuous surfaces on a fixed grid',
      'Benchmarked hybrid variants (hybrid FNO vs FNO+residual) using surface-level diagnostics and volatility-smile checks'
    ],

    tech: [
      'PyTorch',
      'Fourier Neural Operator (FNO)',
      'Heston PDE',
      'Lift & Learn ROM',
      'POD/Galerkin ROM',
      'Python'
    ],
    results: [
      'Hybrid residual approach captures market smile/skew behavior that a pure Heston baseline misses',
      'Maintains physics/arbitrage structure from the ROM while correcting market effects via learned residuals'
    ],

    hasMatrix: true,
    modalSize: 'xl',
    extraPosition: 'top',
    extraHTML: `
      <div class="modal-gallery">
        <div class="modal-figure modal-figure--contain">
          <img src="img/output2.png" alt="Raw vs reconstructed implied volatility surfaces (calls and puts) on 2019-02-16" />
          <div class="figcaption">
            Raw implied-volatility quotes (scatter) vs reconstructed continuous IV surfaces (surface) for calls and puts on 2019-02-16.
            Axes: log-moneyness and time-to-maturity (years).
          </div>
        </div>
      </div>
    `
  },

  'afrl': {
  title: 'AFRL TACTICAL MOBILITY AIRCRAFT · PROPULSION SIZING (MDAO CONTEXT)',
  date: 'AUG 2024 – MAY 2025',
  tags: ['Propulsion Sizing', 'NPSS', 'OpenMDAO', 'Hybrid-Electric', 'TOFL', 'Trade Studies'],

  overview:
    'Contributed the propulsion sizing portion of a broader MBSE-informed MDAO workflow for a tactical mobility aircraft concept. My responsibility was building/using the propulsion sizing logic and producing propulsion-level outputs that fed system-level requirement trades (e.g., takeoff field length feasibility).',

  contributions: [
    'Owned the propulsion sizing component: generated thrust / fuel / engine-state outputs across operating points for system trades',
    'Supported hybrid-electric takeoff-assist concept exploration by comparing propulsion sizing implications across configurations',
    'Delivered propulsion-side data needed for requirement feasibility checks (e.g., TOFL) and design-space exploration'
  ],

  tech: ['NPSS (propulsion)', 'Python', 'OpenMDAO (integration context)', 'Parametric Sweeps', 'Trade Studies'],
  results: [
    'Propulsion sizing outputs enabled requirement-level feasibility comparisons across conventional vs hybrid takeoff-assist concepts',
    'Provided decision-ready propulsion trends used in broader DoE / requirement mapping activities'
  ],

  hasMatrix: false,
  modalSize: 'xl',
  extraPosition: 'top',
  extraHTML: `
    <div class="modal-gallery modal-gallery--hero">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/afrl_mbse_mdao_process.png" alt="MBSE-informed MDAO workflow context diagram" />
        <div class="figcaption">
          Program context: MBSE-informed MDAO workflow. My contribution focused on the propulsion sizing element feeding the overall trade process.
        </div>
      </div>
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/afrl_dse_response_plots.png" alt="Design space exploration response plots for TOFL requirement" />
        <div class="figcaption">
          System-level trade output (example): requirement feasibility exploration (TOFL) using propulsion sizing outputs within the broader workflow.
        </div>
      </div>
    </div>

    <div class="modal-gallery" style="margin-top:1.1rem;">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/afrl_dse_config_table.png" alt="Configuration table showing hybrid takeoff-assist options" />
        <div class="figcaption">
          Configuration alternatives (including battery-assisted takeoff options) evaluated for their propulsion sizing implications in the trade space.
        </div>
      </div>
    </div>
  `
},
  
  'boeing': {
  title: 'BOEING Ti-6Al-4V SUPPLY CHAIN · SOVERN',
  date: 'AUG 2024 – MAY 2025',
  tags: ['Systems', 'Supply Chain', 'Risk', 'Network Mapping', 'Mitigation'],

  overview:
    'Built a structured supply-chain risk workflow for Ti-6Al-4V: define the supply chain of interest, collect supplier info, map supplier-to-supplier connections, merge material chains into a single network, and identify weak links. Converted findings into a tiered mitigation playbook aligned with stakeholder scope.',

  contributions: [
    'Defined “supply chain of interest” and decomposed the workflow into repeatable steps (supplier info → connections → merged network)',
    'Identified weak links / vulnerability hotspots and the most concerning materials/suppliers in the network',
    'Synthesized a tiered mitigation stack (company → partnerships → industry → government → pan-government) for stakeholder execution',
    'Presented the study and recommendations in a stakeholder-facing briefing'
  ],

  tech: ['Systems Thinking', 'Supply Chain Mapping', 'Risk / Mitigation Planning'],
  results: [
    'Produced a repeatable supply-chain mapping workflow and clear stakeholder-ready narrative',
    'Delivered mitigation levers matched to implementation scope and authority'
  ],

  hasMatrix: false,
  modalSize: 'xl',
  extraPosition: 'top',
  extraHTML: `
    <div class="modal-gallery">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/Me-SOS.jpeg" alt="Presenting the Ti-6Al-4V supply chain study to stakeholders" />
        <div class="figcaption">Stakeholder briefing: communicating risk structure and mitigation actions for Ti-6Al-4V supply resilience.</div>
      </div>
    </div>

    <div class="modal-gallery modal-gallery--hero" style="margin-top:1.1rem;">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/MBSE1.png" alt="Supply chain workflow: from defining scope to identifying weak links and mitigations" />
        <div class="figcaption">Workflow used: define supply chain → collect suppliers → map supplier connections → merge chains → identify weak links → assess mitigation robustness.</div>
      </div>

      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/s15_mitigation_layers.png" alt="Mitigation layers from company action to pan-government action" />
        <div class="figcaption">Mitigation layers: actions mapped by scope from internal readiness through partnerships, industry coordination, and government / pan-government initiatives.</div>
      </div>
    </div>
  `
},
  'ben-zinn': {
    title: 'BEN T. ZINN COMBUSTION LAB',
    date: 'JUN 2025 – PRESENT',
    tags: ['LES', 'ANSYS', 'Thermodynamics', 'Sandia-D'],
    overview:
      'Developing entropy-generation analysis framework for turbulent diffusion flames using canonical Sandia-D flame as baseline to quantify thermodynamic irreversibilities from resolved temperature and species fields.',
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
  title: 'TU/e BAKER HUGHES · FGM (NH₃/H₂)',
  date: 'AUG 2023 – AUG 2024',
  tags: ['FGM', 'ANSYS Fluent', 'Reacting Flows', 'Ammonia-Hydrogen', 'LES Baseline'],

  overview:
    'Evaluated Flamelet Generated Manifold (FGM) modeling in ANSYS Fluent for turbulent NH₃/H₂ combustion by building/managing the LUT pipeline and benchmarking behavior against high-fidelity field outputs. Emphasis: making combustion CFD faster while preserving decision-relevant fidelity.',

  contributions: [
    'Built and executed the LUT/FGM workflow: flamelet equations → manifold storage → CFD interpolation of thermo-chemical properties',
    'Ran reacting-flow simulations and extracted resolved fields for comparison (temperature and key species trends)',
    'Quantified computational benefits and documented an analysis-ready pipeline for future ML/LUT acceleration'
  ],

  tech: ['ANSYS Fluent', 'FGM / Flamelet', 'Reacting Flow CFD', 'Post-processing', 'Python'],
  results: [
    '86.7% reduction in runtime vs higher-cost baselines (project benchmark)',
    'Preserved physically consistent temperature/species field behavior for comparison and validation work'
  ],

  hasMatrix: false,
  modalSize: 'xl',
  extraPosition: 'top',
  extraHTML: `
    <div class="modal-gallery">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/TUE1.png" alt="FGM LUT generation and CFD interpolation workflow" />
        <div class="figcaption">
          FGM pipeline: flamelet equations generate a manifold (LUT), then CFD solves flow equations while interpolating thermo-chemical properties from the LUT.
        </div>
      </div>
    </div>

    <div class="modal-gallery modal-gallery--hero" style="margin-top:1.1rem;">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/Static%20Temperature_LES_1000.jpg" alt="Static temperature field (LES) for reacting flow" />
        <div class="figcaption">
          Representative reacting-flow field: static temperature distribution used for qualitative comparison and sanity checks.
        </div>
      </div>

      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/O2%20Mole%20fraction_LES_1000.jpg" alt="O2 mole fraction field (LES) for reacting flow" />
        <div class="figcaption">
          Species-field behavior: O₂ mole fraction distribution highlighting mixing/consumption trends in the combustor.
        </div>
      </div>
    </div>

    <div class="modal-gallery" style="margin-top:1.1rem;">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/NO%20Mole%20fraction_LES_1000.jpg" alt="NO mole fraction field (LES) for reacting flow" />
        <div class="figcaption">
          Emissions-relevant field: NO mole fraction contours used to interpret where formation is strongest in the flowfield.
        </div>
      </div>
    </div>
  `
},

  'drone': {
    title: 'DRONE BLADE ANALYSIS · UNDERGRADUATE THESIS',
    date: 'AUG 2022 – MAY 2023',
    tags: ['OpenFOAM', 'RANS (k-ω SST)', 'CyclicAMI', 'Experiment + CFD'],
    overview:
      'Built a low-cost experimental rig and a matching OpenFOAM workflow to quantify downwash / upthrust differences between 2-blade and 3-blade fixed-pitch drone rotors. Validated the CFD trends against vane-anemometer measurements collected at multiple downstream locations.',
    contributions: [
      'Developed a Raspberry Pi 3B PWM control loop (Python) to command BLDC RPM through an ESC + 11.1 V battery pack',
      'Set up OpenFOAM v2106 RANS (kOmegaSST) case; ran transient simulations with Δt=0.001 s over 5 s at 1500 rpm',
      'Constructed rotating/stationary mesh coupling using a cylindrical CyclicAMI interface and refined regions via snappyHexMesh',
      'Attempted 3D scanning with EinScan-SP; mitigated gloss with matte coating, then pivoted to OEM STL geometry for accuracy',
      'Compared experimental wake-velocity statistics between 2-blade and 3-blade rotors to interpret aerodynamic consistency'
    ],
    tech: [
      'OpenFOAM (blockMesh/snappyHexMesh)',
      'CyclicAMI',
      'kOmegaSST',
      'Raspberry Pi',
      'PWM + ESC',
      'Python',
      '3D Scanning'
    ],
    results: [
      'Three-blade rotor produced higher upthrust and a more consistent wake (lower velocity variation) than the two-blade rotor',
      'Experimental measurements qualitatively agreed with CFD downwash profiles, supporting the model setup',
      'Delivered a reproducible low-cost workflow for drone-propeller testing and CFD-backed diagnosis'
    ],
    hasMatrix: false,

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
  },

  'vawt': {
    title: 'VERTICAL AXIS WIND TURBINE',
    date: 'JUL 2021 – JUN 2022',
    tags: ['CFD', 'VAWT', 'Parametric Study'],
    overview:
      'CFD-driven parametric study of a vertical-axis wind turbine to understand performance trends and design sensitivities.',
    contributions: [
      'Built a repeatable CFD workflow for geometry/condition sweeps',
      'Compared design variants and extracted performance trends',
      'Summarized results into design recommendations'
    ],
    tech: ['CFD', 'Post-processing', 'Design iteration'],
    results: ['Ranked variants by performance trend and robustness', 'Reusable workflow for future rotor studies'],
    modalSize: 'xl',
    extraPosition: 'top',
    extraHTML: `
      <div class="modal-gallery modal-gallery--hero">
        <div class="modal-figure modal-figure--contain">
          <img src="img/1.JPG" alt="VAWT image 1" />
          <div class="figcaption">VAWT snapshot 1</div>
        </div>
        <div class="modal-figure modal-figure--contain">
          <img src="img/2.JPG" alt="VAWT image 2" />
          <div class="figcaption">VAWT snapshot 2</div>
        </div>
      </div>
    `
  },

  'hyperloop': {
  title: 'HYPERLOOP POD DESIGN',
  date: 'JUL 2021 – JUN 2022',
  tags: ['Propulsion', 'System Integration', 'LIM', 'Aerodynamics', 'CAD'],

  overview:
    'Worked on Hyperloop pod concept development with emphasis on propulsion-related subsystem compatibility and performance reasoning. Focus areas included cold-gas actuation/thruster integration, Linear Induction Motor (LIM) thrust behavior, and drag trends relevant to sizing and packaging decisions.',

  contributions: [
    'Supported propulsion subsystem integration with packaging/interface checks across pod architecture',
    'Analyzed LIM thrust sensitivity vs slip to identify operating region around peak thrust',
    'Reviewed drag-coefficient trends (Cd vs Mach) to support sizing/trade reasoning and design constraints',
    'Documented assumptions, constraints, and design decisions into a stakeholder-ready narrative'
  ],

  tech: ['CAD', 'Subsystem Integration', 'Propulsion Concepts', 'Trade Studies'],
  results: [
    'Improved clarity on propulsion operating region (slip range) for stable thrust planning',
    'Captured key aerodynamic/drag trend used for sizing and feasibility reasoning',
    'Cleaned up integration story for propulsion-related interfaces'
  ],

  modalSize: 'xl',
  extraPosition: 'top',
  extraHTML: `
    <div class="modal-gallery modal-gallery--hero">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/lim.png" alt="Normalized slip sensitivity of LIM thrust showing peak thrust region" />
        <div class="figcaption">
          LIM thrust sensitivity vs slip. Highlighted operating band around the peak-thrust region to guide feasible operating choices.
        </div>
      </div>

      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/Cd.png" alt="Drag coefficient trend versus Mach number" />
        <div class="figcaption">
          Drag trend (Cd vs Mach) used to support sizing/trade reasoning and constraint-aware subsystem decisions.
        </div>
      </div>
    </div>

    <div class="modal-gallery" style="margin-top:1.1rem;">
      <div class="modal-figure modal-figure--contain">
        <img data-zoom src="img/cold%20gas%20thruster.PNG" alt="Cold gas thruster concept / reference" />
        <div class="figcaption">
          Cold-gas thruster reference used for integration and packaging discussion within the pod architecture.
        </div>
      </div>
    </div>
  `
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
  document.getElementById('work-section')?.classList.remove('timeline-open');

  setTimeout(() => {
    initRoleAnimation();
    initSkillsGlobe();
    initProjectModals();
    initAchievements();
    initDownloadResume();
  }, 500);
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
      el.style.filter=blurPx>0.1?`blur(${blurPx.toFixed(2)}px)`:``;
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

  zone.classList.remove('open');
  zone.style.maxHeight = '0px';
  zone.inert = true;
  zone.setAttribute('aria-hidden', 'true');

  let open = false;
  let workInView = false;
  let passedWork = false;
  let lastY = window.scrollY;
  let cueTimer = null;

  let allowAutoClose = true;

  const showCue = () => {
    if (open || !cue) return;
    cue.classList.add('show');
  };
  const hideCue = () => {
    if (cue) cue.classList.remove('show');
  };

  let TIMELINE_LIGHT_BOOTED = false;
  let TIMELINE_HEAVY_BOOTED = false;

  function bootTimelineLightOnce() {
    if (TIMELINE_LIGHT_BOOTED) return;
    TIMELINE_LIGHT_BOOTED = true;

    initYearStamps();
    initCardReveal();

    zone.querySelectorAll('.tl-card').forEach(c => {
      c.classList.remove('out-view');
      c.classList.add('in-view');
    });
  }

  function bootTimelineHeavyOnce() {
    if (TIMELINE_HEAVY_BOOTED) return;
    TIMELINE_HEAVY_BOOTED = true;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      buildSandSpine();
    }));
  }

  function scrollToTimelineStart(behavior = 'auto') {
    const header = document.getElementById('siteHeader');
    const offset = (header?.offsetHeight || 72) + 18;

    const firstRow = zone.querySelector('.tl-row');
    const target = firstRow || zone;
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior });
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

    allowAutoClose = false;

    bootTimelineLightOnce();
    work.classList.add('timeline-open');
    hideCue();

    zone.inert = false;
    zone.setAttribute('aria-hidden', 'false');
    zone.classList.add('open');

    zone.style.maxHeight = zone.scrollHeight + 'px';

    requestAnimationFrame(() => {
      scrollToTimelineStart('auto');

      requestAnimationFrame(() => {
        flyToTimeline(ccEls, staticCards);
        carousel.style.opacity = '0';
      });
    });

    const finalizeOpen = () => {
      zone.style.maxHeight = 'none';
      bootTimelineHeavyOnce();
      showTimelineToastOnce();

      setTimeout(() => { allowAutoClose = true; }, 250);
      setTimeout(() => scrollToTimelineStart('auto'), 0);
    };

    const onEnd = (e) => {
      if (e.propertyName !== 'max-height') return;
      zone.removeEventListener('transitionend', onEnd);
      finalizeOpen();
    };
    zone.addEventListener('transitionend', onEnd);

    setTimeout(() => {
      if (zone.style.maxHeight !== 'none') finalizeOpen();
    }, 950);
  }

  function closeTimeline() {
    if (!open) return;
    open = false;

    work.classList.remove('timeline-open');

    refurlCarousel(ccEls, staticCards);
    carousel.style.opacity = '1';

    zone.style.maxHeight = zone.scrollHeight + 'px';
    zone.getBoundingClientRect();
    zone.classList.remove('open');
    zone.style.maxHeight = '0px';
    zone.inert = true;
    zone.setAttribute('aria-hidden', 'true');

    requestAnimationFrame(() => scrollToWorkTop());
  }

  new IntersectionObserver(entries => {
    workInView = entries[0].isIntersecting;
    if (!workInView) hideCue();

    if (workInView && !open) {
      clearTimeout(cueTimer);
      cueTimer = setTimeout(showCue, 650);
    } else {
      clearTimeout(cueTimer);
    }
  }, { threshold: 0.35 }).observe(work);

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const dir = (y < lastY) ? 'up' : 'down';
    lastY = y;

    if (!passedWork && y > work.offsetTop + work.offsetHeight + 120) passedWork = true;

    if (!open && workInView && (dir === 'up' || !passedWork)) showCue();
    if (dir === 'down') hideCue();

    if (open && allowAutoClose && y < work.offsetTop + 80) closeTimeline();
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
  const sec    = document.getElementById('education');
  const panel  = document.getElementById('eduPanel');
  const insts  = document.querySelectorAll('.edu-inst');
  const runway = document.getElementById('eduRunway');
  const cat    = document.getElementById('eduCat');
  if (!sec || !panel || !runway || !cat) return;

  let played = false;

  function playCatSequence() {
    const line = document.getElementById('eduDottedLine');
    if (!line) return;

    const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
    const runwayRect = runway.getBoundingClientRect();
    const w = runway.clientWidth || 1;

    function getScaleXSignAndMag() {
      const t = getComputedStyle(cat).transform;
      if (!t || t === 'none') return { sign: 1, mag: 1 };
      const vals = t.includes('matrix3d')
        ? t.match(/matrix3d\((.+)\)/)[1].split(',').map(Number)
        : t.match(/matrix\((.+)\)/)[1].split(',').map(Number);
      const a = vals[0];
      return { sign: a < 0 ? -1 : 1, mag: Math.abs(a) || 1 };
    }

    const { sign, mag } = getScaleXSignAndMag();
    const baseW = cat.offsetWidth || 306;
    const visW  = baseW * mag;

    const bounds = () => {
      const r = line.getBoundingClientRect();
      return {
        left:  r.left  - runwayRect.left,
        right: r.right - runwayRect.left,
        width: r.width
      };
    };

    const START_PAD = 10;
    const END_PAD   = 10;

    const leftForCenterAt = (x) => {
      if (sign > 0) return x - visW / 2;
      return x + visW / 2;
    };

    const minLeft = sign > 0 ? 0 : visW;
    const maxLeft = sign > 0 ? (w - visW) : w;

    const b0 = bounds();
    const startX = b0.left + START_PAD;
    const startLeft = clamp(leftForCenterAt(startX), minLeft, maxLeft);

    cat.classList.remove('run', 'arrived');
    cat.classList.add('idle');
    cat.style.transition = 'none';
    cat.style.left = `${startLeft}px`;

    const beginRun = () => {
      const b = bounds();
      if (b.width < 120) {
        requestAnimationFrame(beginRun);
        return;
      }

      const endX = b.right - END_PAD;
      const endLeft = clamp(leftForCenterAt(endX), minLeft, maxLeft);

      setTimeout(() => {
        cat.classList.remove('idle', 'arrived');
        cat.classList.add('run');

        const dist = Math.abs(endLeft - startLeft);
        const duration = Math.max(2200, Math.min(3400, 2200 + (dist / w) * 1200));

        const finish = () => {
          cat.classList.remove('run');
          cat.classList.add('idle', 'arrived');
          cat.style.left = `${endLeft}px`;
        };

        if (typeof cat.animate === 'function') {
          const anim = cat.animate(
            [{ left: `${startLeft}px` }, { left: `${endLeft}px` }],
            { duration, easing: 'linear', fill: 'forwards' }
          );
          anim.onfinish = finish;
        } else {
          cat.style.transition = `left ${duration}ms linear`;
          requestAnimationFrame(() => {
            cat.style.left = `${endLeft}px`;
            setTimeout(finish, duration + 60);
          });
        }
      }, 900);
    };

    const onEnd = (e) => {
      if (e.propertyName !== 'width') return;
      line.removeEventListener('transitionend', onEnd);
      beginRun();
    };
    line.addEventListener('transitionend', onEnd);
    setTimeout(() => {
      line.removeEventListener('transitionend', onEnd);
      beginRun();
    }, 1700);
  }

  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || played) return;
    played = true;

    insts.forEach((el, i) => setTimeout(() => el.classList.add('show'), i * 250));

    setTimeout(() => {
      panel.classList.add('grown');
      playCatSequence();
    }, 650);

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

/* ══ 3D SKILLS GLOBE (ALIGNED LIKE BEFORE + REAL ICONS, NO TEXT) ══════ */
function initSkillsGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.log('Three.js not loaded or canvas not found');
    return;
  }

  const container = canvas.parentElement;
  const tooltip = document.getElementById('skillTooltip');

  const skills = [
    {name:'ANSYS Fluent', iconUrl:'assets/icons/ansys.png', lat:42, lon:15, color:0xff4d00, projects:['NH₃/H₂ FGM','Sandia-D Entropy']},
    {name:'OpenFOAM', iconUrl:'assets/icons/openfoam.png', lat:-18, lon:35, color:0xff4d00, projects:['Drone Thesis','FSI']},
    {name:'LES', iconUrl:'assets/icons/vortex.png', lat:26, lon:-95, color:0xff4d00, projects:['Combustion']},
    {name:'Combustion', iconUrl:'assets/icons/flame.png', lat:-34, lon:140, color:0xff4d00, projects:['FGM','Entropy Analysis']},

    {name:'SysML / MBSE', iconUrl:'assets/icons/gear.png', lat:40, lon:-120, color:0xffa500, projects:['BWB / ASDL']},
    {name:'OpenMDAO', iconUrl:'assets/icons/gear.png', lat:-12, lon:-55, color:0xffa500, projects:['AFRL MDAO']},
    {name:'DoE / Trade Studies', iconUrl:'assets/icons/chart.png', lat:52, lon:95, color:0xffa500, projects:['Gas Turbine Cycle']},

    {name:'Python', iconUrl:'assets/icons/python_snakes.png', lat:8, lon:120, color:0x00ff41, projects:['F1 Strategy AI','Automation']},
    {name:'PyTorch', iconUrl:'assets/icons/flame.png', lat:-26, lon:-120, color:0x00ff41, projects:['FNO / PINO']},
    {name:'MATLAB', iconUrl:'assets/icons/matlab.png', lat:30, lon:50, color:0x00bfff, projects:['Battery / Controls']},
    {name:'C++', iconUrl:'assets/icons/cpp.png', lat:-45, lon:170, color:0x00bfff, projects:['Solvers']},
  ];

  function latLonToVec3(lat, lon, r) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    const x = -r * Math.sin(phi) * Math.cos(theta);
    const y =  r * Math.cos(phi);
    const z =  r * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  }

  function makeBadgeTextureNoText(skill, onReady) {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    const ctx = c.getContext('2d');

    const col = '#' + (skill.color >>> 0).toString(16).padStart(6, '0');

    function drawBase() {
      ctx.clearRect(0, 0, 128, 128);

      ctx.beginPath();
      ctx.arc(64, 64, 60, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(64, 64, 52, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.18;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(64, 64, 52, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.30)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    drawBase();
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;

    if ('colorSpace' in tex && THREE.SRGBColorSpace) {
      tex.colorSpace = THREE.SRGBColorSpace;
    } else if ('encoding' in tex && THREE.sRGBEncoding) {
      tex.encoding = THREE.sRGBEncoding;
    }

    if (!skill.iconUrl) {
      if (typeof onReady === 'function') onReady(false);
      return tex;
    }

    const img = new Image();
    img.onload = () => {
      drawBase();

      ctx.save();
      ctx.beginPath();
      ctx.arc(64, 64, 38, 0, Math.PI * 2);
      ctx.clip();

      const s = Math.min(76 / img.width, 76 / img.height);
      const w = img.width * s, h = img.height * s;
      ctx.drawImage(img, 64 - w/2, 64 - h/2, w, h);

      ctx.restore();

      tex.needsUpdate = true;
      if (typeof onReady === 'function') onReady(true);
    };
    img.onerror = () => {
      if (typeof onReady === 'function') onReady(false);
    };

    img.src = skill.iconUrl;
    return tex;
  }

  const scene = new THREE.Scene();

  const w0 = Math.max(1, container.offsetWidth);
  const h0 = Math.max(1, container.offsetHeight);
  const camera = new THREE.PerspectiveCamera(45, w0 / h0, 0.1, 2000);
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(w0, h0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else if ('outputEncoding' in renderer && THREE.sRGBEncoding) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  const globeGeom = new THREE.SphereGeometry(100, 64, 64);
  const globeMat = new THREE.MeshBasicMaterial({
    color: 0x0a0a0e,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const globe = new THREE.Mesh(globeGeom, globeMat);
  globe.renderOrder = 1;
  globeGroup.add(globe);

  const glowGeom = new THREE.SphereGeometry(102, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x0066cc,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
    depthWrite: false
  });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  glow.renderOrder = 0;
  globeGroup.add(glow);

  const skillObjects = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const ICON_R = 130;
  const PIN_R  = 101;

  skills.forEach(skill => {
    const iconPos = latLonToVec3(skill.lat, skill.lon, ICON_R);
    const pinPos  = latLonToVec3(skill.lat, skill.lon, PIN_R);

    const spriteMat = new THREE.SpriteMaterial({
      map: null,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.copy(iconPos);
    sprite.scale.set(24, 24, 1);
    sprite.renderOrder = 10;

    sprite.userData = {
      skill,
      baseScale: 24,
      baseOpacity: 0.90
    };

    const tex = makeBadgeTextureNoText(skill, (ok) => {
      spriteMat.opacity = ok ? 0.95 : 0;
    });
    spriteMat.map = tex;
    spriteMat.needsUpdate = true;

    globeGroup.add(sprite);
    skillObjects.push(sprite);

    const pinGeom = new THREE.ConeGeometry(2, 8, 8);
    const pinMat = new THREE.MeshBasicMaterial({ color: skill.color, transparent: true, opacity: 0 });
    const pin = new THREE.Mesh(pinGeom, pinMat);
    pin.position.copy(pinPos);
    pin.lookAt(0, 0, 0);
    pin.rotateX(Math.PI);
    pin.renderOrder = 5;

    globeGroup.add(pin);
    sprite.userData.pin = pin;
  });

  let hoveredSkill = null;

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove('visible');
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(skillObjects, false);

    if (intersects.length > 0) {
      const sprite = intersects[0].object;

      if (hoveredSkill !== sprite) {
        if (hoveredSkill) {
          hoveredSkill.scale.set(hoveredSkill.userData.baseScale, hoveredSkill.userData.baseScale, 1);
          hoveredSkill.material.opacity = hoveredSkill.userData.baseOpacity;
          if (hoveredSkill.userData.pin) hoveredSkill.userData.pin.material.opacity = 0;
        }

        hoveredSkill = sprite;

        sprite.scale.set(sprite.userData.baseScale * 1.5, sprite.userData.baseScale * 1.5, 1);
        sprite.material.opacity = 1;
        if (sprite.userData.pin) sprite.userData.pin.material.opacity = 0.85;

        const skill = sprite.userData.skill;
        if (tooltip) {
          tooltip.querySelector('.tooltip-skill-name').textContent = skill.name;
          tooltip.querySelector('.tooltip-projects').innerHTML =
            (skill.projects || []).map(p => `<div class="tooltip-project-item">${p}</div>`).join('');

          tooltip.style.left = (e.clientX - rect.left + 20) + 'px';
          tooltip.style.top  = (e.clientY - rect.top - 20) + 'px';
          tooltip.classList.add('visible');
        }
      } else {
        if (tooltip) {
          tooltip.style.left = (e.clientX - rect.left + 20) + 'px';
          tooltip.style.top  = (e.clientY - rect.top - 20) + 'px';
        }
      }
    } else {
      if (hoveredSkill) {
        hoveredSkill.scale.set(hoveredSkill.userData.baseScale, hoveredSkill.userData.baseScale, 1);
        hoveredSkill.material.opacity = hoveredSkill.userData.baseOpacity;
        if (hoveredSkill.userData.pin) hoveredSkill.userData.pin.material.opacity = 0;
        hoveredSkill = null;
      }
      hideTooltip();
    }
  });

  canvas.addEventListener('mouseleave', () => {
    if (hoveredSkill) {
      hoveredSkill.scale.set(hoveredSkill.userData.baseScale, hoveredSkill.userData.baseScale, 1);
      hoveredSkill.material.opacity = hoveredSkill.userData.baseOpacity;
      if (hoveredSkill.userData.pin) hoveredSkill.userData.pin.material.opacity = 0;
      hoveredSkill = null;
    }
    hideTooltip();
  });

  let isDragging = false;
  let prev = { x: 0, y: 0 };
  let vx = 0, vy = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prev = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => (isDragging = false));

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    prev = { x: e.clientX, y: e.clientY };

    const ry = dx * 0.005;
    const rx = dy * 0.005;

    globeGroup.rotation.y += ry;
    globeGroup.rotation.x += rx;

    vy = ry; vx = rx;
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.1;
    camera.position.z = Math.max(250, Math.min(600, camera.position.z));
  }, { passive: false });

  function animate() {
    requestAnimationFrame(animate);

    if (!isDragging) {
      globeGroup.rotation.y += 0.001 + vy * 0.02;
      globeGroup.rotation.x += vx * 0.02;
      vx *= 0.92;
      vy *= 0.92;
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = Math.max(1, container.offsetWidth);
    const h = Math.max(1, container.offsetHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ══ MODAL IMAGE LIGHTBOX (SAFE + LOCAL, DOES NOT BREAK TIMELINE) ═════ */
function ensureImgLightbox() {
  let lb = document.getElementById('imgLightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'imgLightbox';
    lb.className = 'img-lightbox';
    lb.innerHTML = `<button class="lb-close" type="button" aria-label="Close">×</button><img alt="" />`;
    document.body.appendChild(lb);
  }

  const img = lb.querySelector('img');
  const closeBtn = lb.querySelector('.lb-close');

  function close() { lb.classList.remove('open'); }

  if (!lb.dataset.bound) {
    lb.dataset.bound = '1';
    closeBtn?.addEventListener('click', close);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lb.classList.contains('open')) close();
    });
  }

  return {
    open: (src, alt='') => {
      img.src = src;
      img.alt = alt;
      lb.classList.add('open');
    },
    close
  };
}

function wireModalZoomImages(rootEl) {
  if (!rootEl) return;
  const lb = ensureImgLightbox();

  const imgs = rootEl.querySelectorAll('.modal-figure img, .figure-grid img');
  imgs.forEach((im) => {
    if (im.dataset.zoomBound === '1') return;
    im.dataset.zoomBound = '1';
    im.style.cursor = 'zoom-in';

    im.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // crucial: don't trigger modal/backdrop handlers
      lb.open(im.currentSrc || im.src, im.alt || '');
    });
  });
}

/* ══ PROJECT MODAL SYSTEM ══════════════════════════════════ */
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');

  if (!modal) return;

  document.querySelectorAll('[data-project-id]').forEach(card => {
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

    modalContent.classList.remove('modal-xl');

    if (data.modalSize === 'xl') {
      modalContent.classList.add('modal-xl');
    }

    document.getElementById('modalDate').textContent = data.date || '';
    document.getElementById('modalTitle').textContent = data.title || '';

    const tags = Array.isArray(data.tags) ? data.tags : [];
    document.getElementById('modalTags').innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');

    if (data.overviewHTML) {
      overviewEl.innerHTML = data.overviewHTML;
    } else {
      overviewEl.textContent = data.overview || '';
    }

    const contributions = Array.isArray(data.contributions) ? data.contributions : [];
    const tech = Array.isArray(data.tech) ? data.tech : [];
    const results = Array.isArray(data.results) ? data.results : [];

    document.getElementById('modalContributions').innerHTML = contributions.map(c => `<li>${c}</li>`).join('');
    document.getElementById('modalTech').innerHTML = tech.map(t => `<span>${t}</span>`).join('');
    document.getElementById('modalResults').innerHTML = results.map(r => `<li>${r}</li>`).join('');

    const isDescriptionLayout = data.layout === 'description';
    if (grid) grid.style.display = (isDescriptionLayout || data.hideGrid) ? 'none' : '';
    if (resultsSection) resultsSection.style.display = (isDescriptionLayout || data.hideResults) ? 'none' : '';

    if (extra) {
      extra.innerHTML = data.extraHTML || '';
      extra.classList.remove('is-top', 'is-after-overview');

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

      // IMPORTANT: bind zoom clicks only inside the injected modal content
      wireModalZoomImages(extra);
    }

    if (data.hasMatrix) {
      modalContent.classList.add('matrix-active');
    } else {
      modalContent.classList.remove('matrix-active');
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

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

    // Close lightbox if it’s open
    const lb = document.getElementById('imgLightbox');
    if (lb) lb.classList.remove('open');
  }

  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

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

    document.querySelectorAll('.score-radial').forEach(radial => {
      const score = parseFloat(radial.dataset.score);
      const fill = radial.querySelector('.score-fill');
      const circ = 2 * Math.PI * 50;
      const offset = circ * (1 - score/100);
      setTimeout(()=> fill.style.strokeDashoffset = offset, 100);
    });

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

/* ══ DOWNLOAD RESUME ═══════════════════════════════════════ */
function initDownloadResume() {
  const btn = document.getElementById('downloadResume');
  if (!btn) return;

  btn.addEventListener('click', e => {
    e.preventDefault();

    const link = document.createElement('a');
    link.href = 'Krtin_Kala_Resume.pdf';
    link.download = 'Krtin_Kala_Resume.pdf';
    link.click();

    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 200);
  });
}
