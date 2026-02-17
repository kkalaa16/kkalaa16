'use strict';

window.addEventListener('load', () => {
  initFluid();
  runIntroGate();
  initMatrix();
  initEducationAxis();
  initHeaderAndTopState();
  initSectionNavHighlight();
});

function initFluid() {
  const canvas = document.getElementById('fluid-canvas');
  if (!canvas || typeof window.WebGLFluid !== 'function') return;

  const fluid = window.WebGLFluid(canvas, {
    SIM_RESOLUTION:128, DYE_RESOLUTION:1024,
    DENSITY_DISSIPATION:.997, VELOCITY_DISSIPATION:.995,
    PRESSURE:.8, CURL:88, SPLAT_RADIUS:.3, SPLAT_FORCE:6000,
    SHADING:true, COLORFUL:false, BACK_COLOR:{r:0,g:0,b:0},
    BLOOM:false, TRANSPARENT:true,
  });

  const sp = (x,y,dx,dy,c) => fluid?.splat?.(x,y,dx,dy,c);
  window.__splat = sp;
  for (let i=0;i<5;i++) setTimeout(()=>sp(.5,.5,(Math.random()-.5)*80,(Math.random()-.5)*80,{r:.44,g:.17,b:.02}),i*140);
  const w1={x:.2,y:.3,vx:.0036,vy:.0027}, w2={x:.8,y:.7,vx:-.0031,vy:-.0024};
  let f=0;
  (function loop(){ f++;
    [w1,w2].forEach(w=>{ w.x+=w.vx; w.y+=w.vy; if(w.x<.02||w.x>.98)w.vx*=-1; if(w.y<.02||w.y>.98)w.vy*=-1; });
    if(f%3===0){ sp(w1.x,w1.y,w1.vx*12000,w1.vy*12000,{r:.50,g:.18,b:.02}); sp(w2.x,w2.y,w2.vx*11000,w2.vy*11000,{r:.45,g:.16,b:.02}); }
    if(f%180===0) sp(Math.random(),Math.random(),(Math.random()-.5)*22,(Math.random()-.5)*22,{r:.56,g:.20,b:.03});
    requestAnimationFrame(loop);
  })();
  let lastY=window.scrollY;
  window.addEventListener('scroll',()=>{ const dy=window.scrollY-lastY; if(Math.abs(dy)>1) sp(Math.random(),.5,(Math.random()-.5)*20,-dy*8,{r:.58,g:.21,b:.03}); lastY=window.scrollY; },{passive:true});
}

function runIntroGate() {
  const hi = document.getElementById('introHi');
  const welcome = document.getElementById('introWelcome');
  const intro = document.getElementById('introSequence');
  const cue = document.getElementById('introScrollCue');
  const topHeader = document.getElementById('topHeader');
  const sp = window.__splat || (() => {});

  setTimeout(() => {
    sp(.5,.52,(Math.random()-.5)*85,(Math.random()-.5)*85,{r:.54,g:.20,b:.03});
    hi.style.opacity = '0';
    hi.style.filter = 'blur(12px)';
    hi.style.transform = 'scale(0.93)';
  }, 1200);

  setTimeout(() => {
    welcome.style.opacity = '1';
    welcome.style.transform = 'translateY(0)';
  }, 2900);

  setTimeout(() => cue?.classList.add('show'), 4600);

  setTimeout(() => {
    intro.classList.add('hidden');
    topHeader.classList.add('ready');
    document.body.classList.add('intro-complete', 'at-top');
    document.body.classList.remove('lock-scroll');
    startExperience();
  }, 6200);
}

function startExperience() {
  const staticCards = [...document.querySelectorAll('.tl-card')];
  const cardData = staticCards.map(c=>({
    title:  c.querySelector('h3')?.textContent || '',
    date:   c.querySelector('.tl-date')?.textContent || '',
    matrix: c.classList.contains('tl-card--matrix'),
  }));

  const ccEls = buildCarousel(cardData);
  initUnravel(ccEls, staticCards);

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    buildSandSpine();
    initYearStamps();
    initCardReveal();
  }));
}

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

  const RADIUS = 260;
  const TILT_RAD = 22 * Math.PI / 180;
  let theta = 0;
  let alive = true;

  const trigger = document.getElementById('work-section');
  const io = new IntersectionObserver(entries=>{ alive = entries[0].isIntersecting; },{threshold:0.02});
  if (trigger) io.observe(trigger);

  (function spin(){
    if (alive) theta += 0.007;
    els.forEach((el,i)=>{
      const a = (i/n)*Math.PI*2 + theta;
      const x3 = Math.sin(a) * RADIUS;
      const y3 = -Math.cos(a) * RADIUS * Math.sin(TILT_RAD);
      const z3 = Math.cos(a) * RADIUS * Math.cos(TILT_RAD);
      const maxZ = RADIUS * Math.cos(TILT_RAD);
      const depth = (z3 + maxZ) / (2 * maxZ);
      const scale = 0.52 + 0.48 * depth;
      const opac = 0.08 + 0.88 * depth;
      const blurPx = 2.0 * (1 - depth);
      el.style.transform = `translate3d(calc(${x3}px - 50%), calc(${y3}px - 50%), ${z3.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      el.style.opacity = opac.toFixed(3);
      el.style.filter = blurPx > 0.1 ? `blur(${blurPx.toFixed(2)}px)` : '';
      el.style.zIndex = Math.round(depth * 100);
    });
    requestAnimationFrame(spin);
  })();

  return els;
}

function initUnravel(ccEls, staticCards) {
  const trigger = document.getElementById('work-section');
  if (!trigger) return;
  let done = false;

  const io = new IntersectionObserver(entries=>{
    if (done) return;
    if (!entries[0].isIntersecting && window.scrollY > trigger.offsetTop + 100) {
      done = true;
      flyToTimeline(ccEls, staticCards);
      io.disconnect();
    }
  },{threshold:0});
  io.observe(trigger);
}

function flyToTimeline(ccEls, staticCards) {
  const n = Math.min(ccEls.length, staticCards.length);

  ccEls.forEach((cc,i)=>{
    if (i >= n) { cc.style.display='none'; return; }
    const target  = staticCards[i].getBoundingClientRect();
    const ccRect  = cc.getBoundingClientRect();
    const fromX = ccRect.left  + ccRect.width  / 2;
    const fromY = ccRect.top   + ccRect.height / 2;
    const toX   = target.left  + target.width  / 2;
    const toY   = target.top   + target.height / 2;
    cc.style.position  = 'fixed';
    cc.style.left      = `${fromX}px`;
    cc.style.top       = `${fromY}px`;
    cc.style.transform = 'translate(-50%,-50%)';
    cc.style.zIndex    = '999';
    cc.style.transition= 'none';
    cc.getBoundingClientRect();
    const delay = i * 28;
    cc.style.transition = `transform ${380+delay}ms cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 280ms ease ${delay}ms`;
    requestAnimationFrame(()=>{
      cc.style.transform = `translate(calc(-50% + ${toX-fromX}px), calc(-50% + ${toY-fromY}px)) scale(0.82)`;
      cc.style.opacity   = '0';
    });
    setTimeout(()=>cc.style.display='none', 380+delay*2+300);
  });
}

function buildSandSpine() {
  const zone = document.getElementById('timelineZone');
  const canvas = document.getElementById('spineCanvas');
  if (!zone || !canvas) return;

  const sizeCanvas = () => { canvas.width = zone.offsetWidth; canvas.height = zone.offsetHeight; };
  sizeCanvas();
  window.addEventListener('resize',()=>{ sizeCanvas(); rebuildSegs(); },{passive:true});
  const ctx = canvas.getContext('2d');
  let segs = [];

  function getOffsetInZone(el) {
    let top=0, left=0, node=el;
    while (node && node!==zone) { top += node.offsetTop; left += node.offsetLeft; node = node.offsetParent; }
    return { top, left, w:el.offsetWidth, h:el.offsetHeight };
  }

  function rebuildSegs() {
    segs = [];
    const rows = [...zone.querySelectorAll('.tl-row')];
    let prevMidX = null, prevBotY = null;

    rows.forEach(row=>{
      const cards = [...row.querySelectorAll('.tl-card')];
      if (!cards.length) return;
      const isGreen = cards.some(c=>c.classList.contains('tl-card--matrix'));
      const infos = cards.map(c=>{ const o = getOffsetInZone(c); return { cx:o.left+o.w/2, top:o.top, bot:o.top+o.h }; });
      const midX = infos.reduce((s,i)=>s+i.cx,0)/infos.length;
      const topY = Math.min(...infos.map(i=>i.top)) - 24;
      const botY = Math.max(...infos.map(i=>i.bot)) + 24;
      const G = isGreen;
      if (prevMidX!==null) segs.push({x1:prevMidX,y1:prevBotY, x2:midX,y2:topY, G});

      if (infos.length===1) {
        const {cx,top,bot}=infos[0];
        segs.push({x1:cx,y1:topY, x2:cx,y2:top, G});
        segs.push({x1:cx,y1:top, x2:cx,y2:bot, G});
        segs.push({x1:cx,y1:bot, x2:cx,y2:botY, G});
      } else {
        const minX=Math.min(...infos.map(i=>i.cx));
        const maxX=Math.max(...infos.map(i=>i.cx));
        const spreadY=topY+18, gatherY=botY-18;
        segs.push({x1:midX,y1:topY, x2:midX,y2:spreadY, G});
        segs.push({x1:minX,y1:spreadY, x2:maxX,y2:spreadY, G});
        infos.forEach(({cx,top,bot})=>{
          segs.push({x1:cx,y1:spreadY, x2:cx,y2:top, G});
          segs.push({x1:cx,y1:top, x2:cx,y2:bot, G});
          segs.push({x1:cx,y1:bot, x2:cx,y2:gatherY, G});
        });
        segs.push({x1:minX,y1:gatherY, x2:maxX,y2:gatherY, G});
        segs.push({x1:midX,y1:gatherY, x2:midX,y2:botY, G});
      }
      prevMidX=midX; prevBotY=botY;
    });
  }
  rebuildSegs();

  const segLen = (s)=>Math.hypot(s.x2-s.x1, s.y2-s.y1);
  const totalLen = ()=>segs.reduce((a,s)=>a+segLen(s),0);
  function posAt(t) {
    if (!segs.length) return {x:canvas.width/2,y:canvas.height/2,G:false};
    const total = totalLen();
    let d = ((t%1)+1)%1 * total;
    for (const s of segs) {
      const l = segLen(s);
      if (d<=l) return {x:s.x1+(s.x2-s.x1)*(d/l), y:s.y1+(s.y2-s.y1)*(d/l), G:s.G};
      d-=l;
    }
    const last=segs[segs.length-1];
    return {x:last.x2,y:last.y2,G:last.G};
  }

  const N = 200;
  const parts = Array.from({length:N},(_,i)=>({ t:i/N, size:0.6 + Math.random()*1.1, alpha:0.28 + Math.random()*0.65 }));
  let scrollV = 0; let lastSY = window.scrollY;
  window.addEventListener('scroll',()=>{ const dy=window.scrollY-lastSY; scrollV += dy*0.00014; lastSY=window.scrollY; },{passive:true});
  let baseT = 0;

  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scrollV *= 0.84;
    baseT += scrollV + 0.00018;
    if (segs.length) {
      parts.forEach(p=>{
        const pos = posAt(((p.t + baseT)%1+1)%1);
        const zRect = zone.getBoundingClientRect();
        const screenY = zRect.top + pos.y;
        const vhFrac = screenY / window.innerHeight;
        const fade = Math.min(1, Math.max(0, vhFrac/0.22)) * Math.min(1, Math.max(0, (1-vhFrac)/0.22));
        const a = p.alpha * fade;
        if (a<0.02) return;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = pos.G ? `rgba(0,255,65,${a.toFixed(2)})` : `rgba(255,255,255,${a.toFixed(2)})`;
        ctx.fill();
      });
    }
    requestAnimationFrame(draw);
  })();

  window.addEventListener('resize',()=>setTimeout(rebuildSegs,220),{passive:true});
}

function initYearStamps() {
  const stamps = document.querySelectorAll('.year-stamp');
  const io = new IntersectionObserver(entries=>{ entries.forEach(e=>e.target.classList.toggle('show',e.isIntersecting)); },{threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  stamps.forEach(s=>io.observe(s));
}

function initCardReveal() {
  const cards = document.querySelectorAll('.tl-card');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      const card = e.target;
      if (e.isIntersecting) {
        const row = card.closest('.tl-row');
        if (row) {
          const sibs = [...row.querySelectorAll('.tl-card')];
          card.style.transitionDelay = `${sibs.indexOf(card)*65}ms`;
        }
        card.classList.remove('out-view');
        card.classList.add('in-view');
      } else {
        card.style.transitionDelay='0ms';
        if (e.boundingClientRect.top < 0) { card.classList.remove('in-view'); card.classList.add('out-view'); }
        else card.classList.remove('in-view','out-view');
      }
    });
  },{threshold:0.08, rootMargin:'20px 0px -20px 0px'});
  cards.forEach(c=>io.observe(c));
}

function initMatrix() {
  const chars='01CFDML∇Δ∑ΩΠΣ0123456789';
  document.querySelectorAll('.matrix-bg').forEach(cv=>{
    const ctx=cv.getContext('2d'); const sz=13; let cols=[];
    const resize=()=>{ cv.width=cv.parentElement.offsetWidth; cv.height=cv.parentElement.offsetHeight; const n=Math.max(1,Math.floor(cv.width/sz)); cols=Array.from({length:n},()=>Math.random()*cv.height); ctx.font=`${sz}px "Space Mono",monospace`; };
    const draw=()=>{ ctx.fillStyle='rgba(0,0,0,0.07)'; ctx.fillRect(0,0,cv.width,cv.height); ctx.fillStyle='rgba(0,255,65,0.75)'; cols.forEach((y,i)=>{ ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*sz,y); cols[i]=y>cv.height+Math.random()*500?0:y+sz; }); requestAnimationFrame(draw); };
    resize(); draw(); window.addEventListener('resize',resize);
  });
}

function initEducationAxis() {
  const section = document.getElementById('education');
  const axis = document.getElementById('laminar-axis');
  const cat = document.getElementById('eduCat');
  const nodes = document.querySelectorAll('.edu-node');
  if (!section || !axis || !cat || !nodes.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    axis.style.width = '100%';
    cat.classList.add('run');
    setTimeout(() => nodes.forEach((n) => n.classList.add('show')), 280);
    observer.disconnect();
  }, { threshold: 0.35 });

  observer.observe(section);
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
    document.body.style.setProperty('--name-fx', `${((nameB.left + nameB.width / 2) - (nameA.left + nameA.width / 2)).toFixed(2)}px`);
    document.body.style.setProperty('--name-fy', `${((nameB.top + nameB.height / 2) - (nameA.top + nameA.height / 2)).toFixed(2)}px`);
    document.body.style.setProperty('--portfolio-fx', `${((portB.left + portB.width / 2) - (portA.left + portA.width / 2)).toFixed(2)}px`);
    document.body.style.setProperty('--portfolio-fy', `${((portB.top + portB.height / 2) - (portA.top + portA.height / 2)).toFixed(2)}px`);
  };

  const onScroll = () => {
    const y = window.scrollY;
    document.body.classList.toggle('at-top', y < 40);
    document.body.classList.toggle('title-fly', y > 95);
    document.body.classList.toggle('title-landed', y > 185);
    if (topHeader) topHeader.classList.toggle('scrolled', y > 220);
  };

  updateTitleFlightVectors();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateTitleFlightVectors);
  setTimeout(updateTitleFlightVectors, 900);
}

function initSectionNavHighlight() {
  const links = [...document.querySelectorAll('.top-nav-links a')];
  if (!links.length) return;
  const sections = links.map((link) => {
    const target = document.querySelector(link.getAttribute('href'));
    return target ? { link, target } : null;
  }).filter(Boolean);
  if (!sections.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const match = sections.find((item) => item.target === entry.target);
      if (!match || !entry.isIntersecting) return;
      links.forEach((link) => link.classList.remove('active'));
      match.link.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] });
  sections.forEach((item) => observer.observe(item.target));
}
