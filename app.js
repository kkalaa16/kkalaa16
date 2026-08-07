'use strict';

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══ BOOT ═══════════════════════════════════════════════════ */
window.addEventListener('load', function(){
  initGateField();
  runIntro();
  initNav();
  initEduCat();
  initArchiveMechanic();
  initGlobe();
  initPillarsWeb();
  initProjectModal();
});

/* ============================================================
   GATE — ink-bloom field (matches the original site's real
   initFluid() recipe: two auto-splatting orbiting wells, no
   mouse reactivity at all -- see design/DESIGN-B-explore.md v17)
   ============================================================ */
function initGateField(){
  var fieldCanvas = document.getElementById('fieldCanvas');
  if(!fieldCanvas) return;
  var fctx = fieldCanvas.getContext('2d');
  var fw, fh;
  function sizeField(){ fw = fieldCanvas.width = window.innerWidth; fh = fieldCanvas.height = window.innerHeight; }
  sizeField();

  var stain = document.createElement('canvas');
  var sctx = stain.getContext('2d');
  function sizeStain(){ stain.width = fw; stain.height = fh; }
  sizeStain();
  window.addEventListener('resize', function(){ sizeField(); sizeStain(); });

  function stampStain(x, y, r, alpha){
    var g = sctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(193,58,29,' + alpha + ')');
    g.addColorStop(1, 'rgba(193,58,29,0)');
    sctx.fillStyle = g;
    sctx.beginPath(); sctx.arc(x, y, r, 0, Math.PI * 2); sctx.fill();
  }

  function drawStatic(){
    fctx.fillStyle = 'rgba(237,238,233,1)';
    fctx.fillRect(0, 0, fw, fh);
    stampStain(fw * 0.28, fh * 0.38, 130, 0.07);
    stampStain(fw * 0.7, fh * 0.6, 150, 0.06);
    stampStain(fw * 0.5, fh * 0.48, 100, 0.05);
    fctx.drawImage(stain, 0, 0);
  }

  if(reduce){
    drawStatic();
    return;
  }

  var wells = [
    { x: 0.28, y: 0.34, vx: 0.0009, vy: 0.0007, wob: 0, wobSpeed: 0.6, r: 65 },
    { x: 0.72, y: 0.62, vx: -0.0008, vy: -0.0006, wob: 2.1, wobSpeed: 0.52, r: 75 }
  ];

  for(var i = 0; i < 6; i++){
    (function(i){
      setTimeout(function(){
        stampStain(fw * (0.42 + Math.random() * 0.16), fh * (0.42 + Math.random() * 0.16), 160 + Math.random() * 60, 0.10);
      }, i * 130);
    })(i);
  }

  var ft0 = performance.now();
  requestAnimationFrame(function fieldFrame(now){
    var t = (now - ft0) / 1000;

    fctx.fillStyle = 'rgba(237,238,233,1)';
    fctx.fillRect(0, 0, fw, fh);

    sctx.fillStyle = 'rgba(237,238,233,0.006)';
    sctx.fillRect(0, 0, fw, fh);
    fctx.drawImage(stain, 0, 0);

    wells.forEach(function(w){
      w.wob += 0.016 * w.wobSpeed;
      var driftX = Math.sin(w.wob) * 0.0012;
      var driftY = Math.cos(w.wob * 0.8) * 0.0012;
      w.x += w.vx + driftX; w.y += w.vy + driftY;
      if(w.x < 0.05 || w.x > 0.95) w.vx *= -1;
      if(w.y < 0.05 || w.y > 0.95) w.vy *= -1;

      var px = w.x * fw, py = w.y * fh;

      for(var l = 0; l < 3; l++){
        var phase = t * (0.7 + l * 0.23) + l * 2.1;
        var ox = Math.sin(phase) * 10, oy = Math.cos(phase * 1.3) * 10;
        var rr = w.r * (0.75 + 0.25 * Math.sin(phase * 1.7)) - l * 10;
        var g = fctx.createRadialGradient(px + ox, py + oy, 0, px + ox, py + oy, rr);
        g.addColorStop(0, 'rgba(193,58,29,' + (0.16 - l * 0.03) + ')');
        g.addColorStop(0.6, 'rgba(193,58,29,' + (0.08 - l * 0.02) + ')');
        g.addColorStop(1, 'rgba(193,58,29,0)');
        fctx.fillStyle = g;
        fctx.beginPath(); fctx.arc(px + ox, py + oy, rr, 0, Math.PI * 2); fctx.fill();
      }

      stampStain(px, py, w.r * 0.7, 0.012);
    });

    if(Math.floor(t * 60) % 210 === 0){
      stampStain(Math.random() * fw, Math.random() * fh, 90 + Math.random() * 60, 0.05);
    }

    requestAnimationFrame(fieldFrame);
  });
}

/* ============================================================
   ROTATOR — typing forward, erasing backward, forever. Runs in
   two places: once inside the gate (the first thing visible on
   load) and, independently, permanently in the persistent hero
   -- it never stops just because the gate closes. Matches the
   original site's actual structure: initRoleAnimation() ran
   separately from the one-time intro sequence, not inside it.
   ============================================================ */
var ROLES = ['Combustion Engineer', 'Propulsion Engineer', 'Systems Engineer', 'ML Engineer', 'CFD Engineer'];

function startRotator(el){
  if(!el) return;
  if(reduce){ el.textContent = ROLES[0]; return; }
  var ri = 0;
  (function cycle(){
    var word = ROLES[ri % ROLES.length];
    var ci = 0;
    el.textContent = '';
    (function type(){
      if(ci <= word.length){
        el.textContent = word.slice(0, ci);
        ci++;
        setTimeout(type, 42);
      } else {
        setTimeout(erase, 1400);
      }
    })();
    function erase(){
      if(ci > 0){
        ci--;
        el.textContent = word.slice(0, ci);
        setTimeout(erase, 26);
      } else {
        ri++;
        setTimeout(cycle, 220);
      }
    }
  })();
}

/* ============================================================
   INTRO — gate dismiss
   ============================================================ */
function runIntro(){
  var gate = document.getElementById('introGate');
  var header = document.getElementById('siteHeader');
  var hero = document.querySelector('.hero');

  function dismiss(){
    if(gate.classList.contains('fading')) return;
    gate.classList.add('fading');
    gate.addEventListener('transitionend', function(){ gate.classList.add('gone'); }, { once:true });
    document.body.classList.remove('lock-scroll');
    hero.classList.add('visible');
    header.classList.add('visible');
  }

  document.body.classList.add('lock-scroll');
  var cue = document.getElementById('gateCue');
  if(cue){ cue.addEventListener('click', dismiss); }
  window.addEventListener('wheel', dismiss, { once:true, passive:true });
  window.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') dismiss(); }, { once:true });

  startRotator(document.getElementById('rotatorWord'));
  startRotator(document.getElementById('heroRotatorWord'));

  if(reduce){
    setTimeout(dismiss, 400);
    return;
  }

  setTimeout(dismiss, 6200);
}

/* ============================================================
   NAV — dim header on scroll
   ============================================================ */
function initNav(){
  var h = document.getElementById('siteHeader');
  if(!h) return;
  window.addEventListener('scroll', function(){ h.classList.toggle('dim', window.scrollY > 80); }, { passive:true });
}

/* ============================================================
   EDUCATION — cat run/idle on scroll into view
   ============================================================ */
function initEduCat(){
  var cat = document.getElementById('eduCat');
  var runway = document.getElementById('eduRunway');
  if(!cat || !runway) return;

  // Measure the real runway width and set a pixel target directly,
  // instead of trusting calc(100% - 130px) in CSS -- percentage math
  // there depends on #eduCat's own box being exactly 130px wide,
  // which is fragile (its width is shrink-to-fit, sized to whichever
  // sprite is currently showing). Shared by both the animated path
  // and the reduced-motion path below, so neither can drift.
  function gtLeftPx(){
    var w = runway.getBoundingClientRect().width;
    return Math.max(0, w - 130) + 'px';
  }

  // prefers-reduced-motion: previously this returned here and left the
  // static CSS fallback (also a calc(100%) value) to position the cat --
  // which had the exact same fragility this function exists to avoid,
  // and would explain the cat never landing correctly for any user (or
  // any screenshot tool) with reduced motion on, no matter how the
  // animated path below was fixed. Now it's measured and set the same
  // way, just without the sliding transition or run-cycle sprite.
  if(reduce){
    cat.style.left = gtLeftPx();
    cat.classList.remove('idle', 'run');
    cat.classList.add('idle', 'idle-gt');
    return;
  }

  var played = false;
  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !played){
      played = true;

      cat.style.left = gtLeftPx();
      cat.classList.remove('idle');
      cat.classList.add('run');

      var landed = false;
      function land(){
        if(landed) return;
        landed = true;
        cat.removeEventListener('transitionend', onArrive);
        cat.classList.remove('run');
        cat.classList.add('idle', 'idle-gt');
      }
      function onArrive(e){ if(e.propertyName === 'left') land(); }
      cat.addEventListener('transitionend', onArrive);
      // Fallback in case transitionend never fires (interrupted
      // transition, no actual value change, browser quirk) -- without
      // this the cat could get stuck showing the run sprite forever.
      setTimeout(land, 3000);
    }
  }, { threshold:0.4 }).observe(runway);
}

/* ============================================================
   ARCHIVE MECHANIC — twin ring carousels fly into the
   spine-connected archive on scroll-past OR click of either ring
   ============================================================ */
var PREVIEW_IDS = ['mfg', 'gas-turbine', 'gta', 'telemetry-ml', 'option-pricing', 'trajectory', 'boeing', 'bwb'];

function initArchiveMechanic(){
  var highlights = document.getElementById('archivePreview');
  var archiveZone = document.getElementById('archiveZone');
  if(!highlights || !archiveZone) return;

  var previewData = PREVIEW_IDS.map(function(id){ return readArcCard(id); }).filter(Boolean);

  function readArcCard(id){
    var el = archiveZone.querySelector('.arc-card[data-id="' + id + '"]');
    if(!el) return null;
    return { id:id, date: el.querySelector('.arc-date').textContent, title: el.querySelector('.arc-title').textContent };
  }

  var ringEls = buildRing('ring', previewData);

  function buildRing(stageId, items){
    var stage = document.getElementById(stageId);
    if(!stage || !items.length) return [];
    var n = items.length, els = [];
    items.forEach(function(d){
      var el = document.createElement('div');
      el.className = 'rc';
      el.dataset.id = d.id;
      el.innerHTML = '<span class="rc-date">' + d.date + '</span><span class="rc-title">' + d.title + '</span>';
      stage.appendChild(el);
      els.push(el);
    });
    if(reduce){
      els.forEach(function(el){ el.style.position='static'; el.style.margin='0 0 12px 0'; el.style.transform='none'; el.style.opacity='1'; });
      stage.style.position='static'; stage.style.display='flex'; stage.style.flexDirection='column';
      return els;
    }
    // Contained, single ring: radius sized to stay within the section instead
    // of spilling past its edges (overflow:hidden on .archive-preview clips
    // anything larger anyway).
    var RADIUS = 190, TILT = 22 * Math.PI / 180;
    var theta = 0;
    var alive = true;
    new IntersectionObserver(function(e){ alive = e[0].isIntersecting; }, { threshold:0.02 }).observe(highlights);
    (function spin(){
      // Skip repositioning entirely once merged: flyToArchive/refurlRing own
      // these elements' styles from that point on. Without this check, this
      // loop (which never stops) was clobbering the fly-out animation's
      // transform/opacity on the very next frame, every frame -- the actual
      // cause of the earlier chaotic/overlapping card positions.
      if(merged) { requestAnimationFrame(spin); return; }
      if(alive) theta += 0.006;
      els.forEach(function(el,i){
        var a = (i/n) * Math.PI*2 + theta;
        var x3 = Math.sin(a)*RADIUS;
        var y3 = -Math.cos(a)*RADIUS*Math.sin(TILT);
        var z3 = Math.cos(a)*RADIUS*Math.cos(TILT);
        var maxZ = RADIUS*Math.cos(TILT);
        var depth = (z3+maxZ)/(2*maxZ);
        var scale = 0.55+0.45*depth;
        var opac = 0.10+0.85*depth;
        el.style.transform = 'translate3d(' + x3.toFixed(1) + 'px,' + y3.toFixed(1) + 'px,' + z3.toFixed(1) + 'px) scale(' + scale.toFixed(3) + ')';
        el.style.opacity = opac.toFixed(3);
        el.style.zIndex = Math.round(depth*100);
      });
      requestAnimationFrame(spin);
    })();
    return els;
  }

  var merged = false;
  function refurlRing(els){
    els.forEach(function(el){
      el.style.display = '';
      el.style.position = '';
      el.style.left = '';
      el.style.top = '';
      el.style.zIndex = '';
      el.style.transition = '';
      el.style.transform = '';
      el.style.opacity = '';
    });
  }
  function flyToArchive(sourceEls){
    sourceEls.forEach(function(el, i){
      var target = archiveZone.querySelector('.arc-card[data-id="' + el.dataset.id + '"]');
      if(!target) return;
      var tr = target.getBoundingClientRect();
      var sr = el.getBoundingClientRect();
      var fromX = sr.left + sr.width/2, fromY = sr.top + sr.height/2;
      var toX = tr.left + tr.width/2, toY = tr.top + tr.height/2;
      el.style.position = 'fixed';
      el.style.left = fromX + 'px';
      el.style.top = fromY + 'px';
      el.style.transform = 'translate(-50%,-50%)';
      el.style.zIndex = '999';
      el.style.transition = 'none';
      el.getBoundingClientRect();
      var delay = i * 40;
      el.style.transition = 'transform ' + (420+delay) + 'ms cubic-bezier(.16,1,.3,1) ' + delay + 'ms, opacity 280ms ease ' + delay + 'ms';
      requestAnimationFrame(function(){
        el.style.transform = 'translate(calc(-50% + ' + (toX-fromX) + 'px), calc(-50% + ' + (toY-fromY) + 'px)) scale(0.86)';
        el.style.opacity = '0';
      });
      setTimeout(function(){ el.style.display = 'none'; }, 420+delay+320);
    });
  }

  function openArchive(){
    if(merged) return;
    merged = true;
    clearTimeout(maxHeightTimeout);
    archiveZone.classList.add('open');
    // CSS can't transition to/from `auto`, so the max-height target has to be
    // a real pixel value set from JS (the original site's own technique,
    // openTimeline(): zone.style.maxHeight = zone.scrollHeight + 'px'). The
    // .archive.open class alone never released the clip -- that was the
    // actual "doesn't unfurl" bug: the panel stayed at max-height:0 forever.
    archiveZone.style.maxHeight = archiveZone.scrollHeight + 'px';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        if(reduce){ buildSandSpine(); return; }
        flyToArchive(ringEls);
        if(!spineBuilt){ spineBuilt = true; setTimeout(buildSandSpine, 500); }
      });
    });
    maxHeightTimeout = setTimeout(function(){ if(merged) archiveZone.style.maxHeight = 'none'; }, 950);
  }

  function closeArchive(){
    if(!merged) return;
    merged = false;
    clearTimeout(maxHeightTimeout);
    refurlRing(ringEls);
    archiveZone.style.maxHeight = archiveZone.scrollHeight + 'px';
    archiveZone.getBoundingClientRect();
    archiveZone.classList.remove('open');
    archiveZone.style.maxHeight = '0px';
  }

  var maxHeightTimeout = null;
  var spineBuilt = false;

  if(reduce){
    openArchive();
  } else {
    var ringEl = document.getElementById('ring');
    if(ringEl) ringEl.addEventListener('click', openArchive);
    // Scroll-position trigger, not IntersectionObserver: simpler to reason
    // about and doesn't depend on rootMargin/threshold edge cases. Opens once
    // scrolled genuinely past the ring section; closes (refurls) once
    // scrolled back up near it again. The two thresholds are offset (0.5 vs
    // 0.85) so it doesn't flicker open/close right at one boundary.
    window.addEventListener('scroll', function(){
      var rect = highlights.getBoundingClientRect();
      if(!merged && rect.bottom < window.innerHeight * 0.5) openArchive();
      else if(merged && rect.bottom > window.innerHeight * 0.85) closeArchive();
    }, { passive:true });
  }

  function buildSandSpine(){
    var zone = archiveZone, canvas = document.getElementById('spineCanvas');
    if(!canvas) return;
    function sizeCanvas(){ canvas.width = zone.offsetWidth; canvas.height = zone.scrollHeight; canvas.style.height = zone.scrollHeight + 'px'; }
    sizeCanvas();
    var ctx = canvas.getContext('2d');
    var segs = [];

    function getOffsetInZone(el){
      var top=0, left=0, node=el;
      while(node && node!==zone){ top+=node.offsetTop; left+=node.offsetLeft; node=node.offsetParent; }
      return { top:top, left:left, w:el.offsetWidth, h:el.offsetHeight };
    }
    function rebuildSegs(){
      segs = [];
      var rowEls = zone.querySelectorAll('.arc-row');
      var prevMidX=null, prevBotY=null;
      rowEls.forEach(function(row){
        var cards = row.querySelectorAll('.arc-card');
        if(!cards.length) return;
        var infos = Array.prototype.map.call(cards, function(c){ var o=getOffsetInZone(c); return { cx:o.left+o.w/2, top:o.top, bot:o.top+o.h }; });
        var midX = infos.reduce(function(s,i){ return s+i.cx; },0)/infos.length;
        var topY = Math.min.apply(null, infos.map(function(i){ return i.top; })) - 20;
        var botY = Math.max.apply(null, infos.map(function(i){ return i.bot; })) + 20;
        if(prevMidX!==null) segs.push({x1:prevMidX,y1:prevBotY,x2:midX,y2:topY});
        var minX = Math.min.apply(null, infos.map(function(i){ return i.cx; }));
        var maxX = Math.max.apply(null, infos.map(function(i){ return i.cx; }));
        var sY = topY+16, gY = botY-16;
        segs.push({x1:midX,y1:topY,x2:midX,y2:sY},{x1:minX,y1:sY,x2:maxX,y2:sY});
        infos.forEach(function(info){
          segs.push({x1:info.cx,y1:sY,x2:info.cx,y2:info.top},{x1:info.cx,y1:info.top,x2:info.cx,y2:info.bot},{x1:info.cx,y1:info.bot,x2:info.cx,y2:gY});
        });
        segs.push({x1:minX,y1:gY,x2:maxX,y2:gY},{x1:midX,y1:gY,x2:midX,y2:botY});
        prevMidX = midX; prevBotY = botY;
      });
    }
    rebuildSegs();
    window.addEventListener('resize', function(){ sizeCanvas(); rebuildSegs(); }, { passive:true });

    function segLen(s){ return Math.hypot(s.x2-s.x1, s.y2-s.y1); }
    function totalLen(){ return segs.reduce(function(a,s){ return a+segLen(s); },0); }
    function posAt(t){
      if(!segs.length) return { x:canvas.width/2, y:canvas.height/2 };
      var total = totalLen();
      var d = ((t%1)+1)%1*total;
      for(var i=0;i<segs.length;i++){
        var s = segs[i], l = segLen(s);
        if(d<=l){ var f=d/l; return { x:s.x1+(s.x2-s.x1)*f, y:s.y1+(s.y2-s.y1)*f }; }
        d -= l;
      }
      var last = segs[segs.length-1];
      return { x:last.x2, y:last.y2 };
    }

    if(reduce){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      segs.forEach(function(s){
        ctx.beginPath(); ctx.moveTo(s.x1,s.y1); ctx.lineTo(s.x2,s.y2);
        ctx.strokeStyle = 'rgba(75,80,87,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      });
      return;
    }

    // Dense enough, bright enough, and barely faded except right at the
    // viewport edges -- the earlier pass (160 sparse, dim particles, faded
    // outside the middle 50% of the viewport) read as almost nothing on a
    // path this long. This is meant to look like a continuous flowing
    // dotted trail, not occasional random specks.
    var N = 520;
    var parts = [];
    for(var i=0;i<N;i++) parts.push({ t:i/N, size:1.0+Math.random()*1.3, alpha:0.45+Math.random()*0.45 });
    var scrollV = 0, lastSY = window.scrollY, baseT = 0;
    window.addEventListener('scroll', function(){
      var dy = window.scrollY - lastSY;
      scrollV += dy*0.00012;
      lastSY = window.scrollY;
    }, { passive:true });

    (function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      scrollV *= 0.85;
      baseT += scrollV + 0.00022;
      var zRect = zone.getBoundingClientRect();
      parts.forEach(function(p){
        var t = ((p.t+baseT)%1+1)%1;
        var pos = posAt(t);
        var screenY = zRect.top + pos.y;
        var vhFrac = screenY/window.innerHeight;
        var fade = Math.min(1,Math.max(0,(1-vhFrac)/0.06)) * Math.min(1,Math.max(0,vhFrac/0.06));
        var a = p.alpha*fade;
        if(a<0.02) return;
        ctx.beginPath();
        ctx.arc(pos.x,pos.y,p.size,0,Math.PI*2);
        ctx.fillStyle = 'rgba(75,80,87,' + a.toFixed(2) + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }
}

/* ============================================================
   SKILLS GLOBE — hand-rolled 3D sphere (no Three.js dependency).
   The original site's actual globe (app.js initSkillsGlobe) reads
   as a globe because of a visible WIREFRAME sphere -- a lat/lon
   grid mesh, not just an outline circle with floating dots. That
   grid is the part that was missing here; rebuilt below as
   rotated, projected latitude rings + longitude meridians, each
   segment's alpha graded by depth so the far side of the sphere
   naturally fades (a cheap stand-in for backface culling).
   Drag-to-rotate with inertia, idle auto-rotate, hover tooltip.
   Single-accent: wireframe and badges are ink-dim, hovered skill
   lights up in the accent color -- per the locked "color marks
   attention, not decoration" rule.
   ============================================================ */
function initGlobe(){
  var canvas = document.getElementById('globeCanvas');
  var tip = document.getElementById('globeTip');
  if(!canvas) return;
  var dpr = window.devicePixelRatio || 1;
  var W, H;
  function size(){
    var r = canvas.getBoundingClientRect();
    W = canvas.width = r.width*dpr; H = canvas.height = r.height*dpr;
  }
  size();
  window.addEventListener('resize', size);
  var ctx = canvas.getContext('2d');

  // Real software gets its actual logo; SysML/MBSE has no single product
  // logo (it's a modeling notation, not a tool), so it keeps the
  // short-form text badge -- same tools-get-icons/processes-get-text
  // split the original site used.
  var SKILLS = [
    { name:'ANSYS Fluent', mono:'FL', icon:'assets/icons/ansys.png', lat:42, lon:15 },
    { name:'OpenFOAM', mono:'OF', icon:'assets/icons/openfoam.png', lat:-18, lon:35 },
    { name:'OpenMDAO', mono:'MD', icon:'assets/icons/gear.png', lat:-12, lon:-55 },
    { name:'MATLAB', mono:'ML', icon:'assets/icons/matlab.png', lat:30, lon:50 },
    { name:'Python', mono:'PY', icon:'assets/icons/python_snakes.png', lat:8, lon:120 },
    { name:'PyTorch', mono:'PT', icon:'assets/icons/flame.png', lat:-26, lon:-120 },
    { name:'Systems / MBSE', mono:'SY', lat:52, lon:95 },
    { name:'C++', mono:'C+', icon:'assets/icons/cpp.png', lat:-45, lon:170 }
  ];

  function toXYZ(lat, lon, r){
    var phi = (90-lat)*Math.PI/180, th = (lon+180)*Math.PI/180;
    return { x:-r*Math.sin(phi)*Math.cos(th), y:r*Math.cos(phi), z:r*Math.sin(phi)*Math.sin(th) };
  }
  var R = 205;
  var pts = SKILLS.map(function(s){
    var p = toXYZ(s.lat,s.lon,R);
    p.name = s.name; p.mono = s.mono;
    if(s.icon){ p.img = new Image(); p.img.src = s.icon; }
    return p;
  });

  var LAT_STEPS = [-75, -60, -30, 0, 30, 60, 75];
  var LON_STEPS = [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336];
  var latRings = LAT_STEPS.map(function(lat){
    var ring = [];
    for(var i = 0; i <= 48; i++) ring.push(toXYZ(lat, i * (360/48), R));
    return ring;
  });
  var lonRings = LON_STEPS.map(function(lon){
    var ring = [];
    for(var i = 0; i <= 24; i++) ring.push(toXYZ(-90 + i * (180/24), lon, R));
    return ring;
  });

  var ry = 0.4, rx = -0.15;
  var dragging = false, lastMX=0, lastMY=0, velY=0, velX=0;

  function rotate(p, ry, rx){
    var x1 = p.x*Math.cos(ry) + p.z*Math.sin(ry);
    var z1 = -p.x*Math.sin(ry) + p.z*Math.cos(ry);
    var y1 = p.y;
    var y2 = y1*Math.cos(rx) - z1*Math.sin(rx);
    var z2 = y1*Math.sin(rx) + z1*Math.cos(rx);
    return { x:x1, y:y2, z:z2, name:p.name };
  }

  var hoverIdx = -1;
  var lastProjected = [];

  canvas.addEventListener('mousedown', function(e){ dragging=true; lastMX=e.clientX; lastMY=e.clientY; velX=0; velY=0; });
  window.addEventListener('mouseup', function(){ dragging=false; });
  window.addEventListener('mousemove', function(e){
    if(dragging){
      var dx=e.clientX-lastMX, dy=e.clientY-lastMY;
      ry += dx*0.006; rx += dy*0.006;
      rx = Math.max(-1.1, Math.min(1.1, rx));
      velY = dx*0.006; velX = dy*0.006;
      lastMX=e.clientX; lastMY=e.clientY;
    } else if(tip) {
      var rect = canvas.getBoundingClientRect();
      var mx = (e.clientX-rect.left)*dpr, my = (e.clientY-rect.top)*dpr;
      var best=-1, bestD=26*dpr;
      lastProjected.forEach(function(pp,i){
        var d = Math.hypot(pp.sx-mx, pp.sy-my);
        if(d<bestD){ bestD=d; best=i; }
      });
      hoverIdx = best;
      if(best>=0){
        tip.textContent = pts[best].name;
        tip.style.left = (e.clientX-rect.left) + 'px';
        tip.style.top = (e.clientY-rect.top) + 'px';
        tip.classList.add('show');
      } else {
        tip.classList.remove('show');
      }
    }
  });

  function project(p, focal, cx, cy){
    var r = rotate(p, ry, rx);
    var scale = focal/(focal+r.z);
    return { sx:cx+r.x*scale, sy:cy-r.y*scale, z:r.z, scale:scale };
  }

  var FOCAL = 700;

  function drawWireRing(ring, focal, cx, cy){
    var proj = ring.map(function(p){ return project(p, focal, cx, cy); });
    for(var i = 0; i < proj.length - 1; i++){
      var a = proj[i], b = proj[i+1];
      var depth = Math.max(0, Math.min(1, ((a.z+b.z)/2 + R) / (2*R)));
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.strokeStyle = 'rgba(75,80,87,' + (0.14 + depth * 0.62).toFixed(2) + ')';
      ctx.lineWidth = dpr;
      ctx.stroke();
    }
  }

  function drawBadge(pp, isHover){
    var depth = Math.max(0.2, Math.min(1,(pp.z+R)/(2*R)));
    var rad = (isHover?23:19)*dpr*pp.scale;
    if(isHover){
      ctx.beginPath(); ctx.arc(pp.sx,pp.sy,rad+4*dpr,0,Math.PI*2);
      ctx.strokeStyle = 'rgba(193,58,29,' + (depth*0.7).toFixed(2) + ')';
      ctx.lineWidth = 1.5*dpr; ctx.stroke();
    }
    var fill = isHover ? 'rgba(193,58,29,' + depth.toFixed(2) + ')' : 'rgba(237,238,233,' + depth.toFixed(2) + ')';
    var stroke = isHover ? 'rgba(193,58,29,1)' : 'rgba(75,80,87,' + (0.4+depth*0.6).toFixed(2) + ')';
    ctx.beginPath(); ctx.arc(pp.sx,pp.sy,rad,0,Math.PI*2);
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = stroke; ctx.lineWidth = 1.4*dpr; ctx.stroke();

    if(pp.img && pp.img.complete && pp.img.naturalWidth > 0){
      ctx.save();
      ctx.beginPath(); ctx.arc(pp.sx, pp.sy, rad*0.78, 0, Math.PI*2); ctx.clip();
      ctx.globalAlpha = 0.55 + depth*0.45;
      // Aspect-fit within the clip circle's bounding box instead of
      // stretching to a square -- ANSYS/OpenFOAM are wide wordmark logos
      // (~2.8-3.1:1) that were visibly squashed by a forced square draw.
      var box = rad * 1.56;
      var ar = pp.img.naturalWidth / pp.img.naturalHeight;
      var dw = box, dh = box;
      if(ar > 1) dh = box / ar; else dw = box * ar;
      ctx.drawImage(pp.img, pp.sx - dw/2, pp.sy - dh/2, dw, dh);
      ctx.globalAlpha = 1;
      ctx.restore();
    } else {
      ctx.font = (isHover ? '700 ' : '600 ') + (10*dpr*pp.scale) + 'px ' + 'ui-monospace,Consolas,monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = isHover ? '#fff' : 'rgba(20,23,26,' + (0.5+depth*0.5).toFixed(2) + ')';
      ctx.fillText(pp.mono, pp.sx, pp.sy + 0.5*dpr);
    }
  }

  function frame(){
    if(!dragging){
      ry += velY*0.9 + 0.0009;
      rx += velX*0.9;
      velY *= 0.92; velX *= 0.92;
      rx = Math.max(-1.1, Math.min(1.1, rx));
    }
    ctx.clearRect(0,0,W,H);
    var cx = W/2, cy = H/2;
    var focal = FOCAL*dpr;

    var g = ctx.createRadialGradient(cx,cy,0,cx,cy,R*dpr*1.25);
    g.addColorStop(0,'rgba(20,23,26,0.09)');
    g.addColorStop(1,'rgba(20,23,26,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx,cy,R*dpr*1.25,0,Math.PI*2); ctx.fill();

    latRings.forEach(function(ring){ drawWireRing(ring, focal, cx, cy); });
    lonRings.forEach(function(ring){ drawWireRing(ring, focal, cx, cy); });

    lastProjected = pts.map(function(p){
      var pp = project(p, focal, cx, cy);
      pp.name = p.name; pp.mono = p.mono; pp.img = p.img;
      return pp;
    });
    var order = lastProjected.map(function(_,i){ return i; }).sort(function(a,b){ return lastProjected[a].z-lastProjected[b].z; });
    order.forEach(function(i){ drawBadge(lastProjected[i], i===hoverIdx); });
    requestAnimationFrame(frame);
  }
  if(reduce){
    function drawStatic(){
      ctx.clearRect(0,0,W,H);
      var cx0=W/2, cy0=H/2;
      var focal0 = FOCAL*dpr;
      latRings.forEach(function(ring){ drawWireRing(ring, focal0, cx0, cy0); });
      lonRings.forEach(function(ring){ drawWireRing(ring, focal0, cx0, cy0); });
      pts.forEach(function(p){
        var r = rotate(p, 0.6, -0.2);
        var scale = focal0/(focal0+r.z);
        drawBadge({ sx:cx0+r.x*scale, sy:cy0-r.y*scale, z:r.z, scale:scale, mono:p.mono, img:p.img }, false);
      });
    }
    drawStatic();
    pts.forEach(function(p){ if(p.img) p.img.addEventListener('load', drawStatic); });
  } else {
    requestAnimationFrame(frame);
  }
}

/* ============================================================
   PROJECT CLUSTERS — 19 projects grouped into 4 domain "territories"
   (soft glow regions), sized by real connection weight, with the 2
   genuinely cross-domain projects (Ibrido, MFG) pulled to the border
   of their home territory and a hover-only dashed thread to their
   secondary tie. Ported from design/dark-colorful-revamp.html's
   bubble-field engine (the direction actually approved after the
   radial web's arms collided into unreadable labels at 19 projects).
   Domain color is the one deliberate exception to this site's
   single-accent rule: with 4 real categories, color is carrying
   real information (which cluster a project belongs to), not
   decorating -- same 4 hex values already used on the skills globe.
   Bubbles are real SVG elements (not canvas), so native hover/click/
   keyboard events work without hand-rolled hit-testing. Clicking a
   bubble opens the same project-detail modal as the highlight
   plates and archive cards, when that project has a matching card.
   All DOM lookups are scoped to #pillars so the generic inner
   class names (.body, .key, .stage) can't collide elsewhere.
   ============================================================ */
function initPillarsWeb(){
  var root = document.getElementById('pillars');
  if(!root) return;

  var TERRITORIES = [
    { id:'systems-architecture', label:'AEROSPACE SYSTEMS ARCHITECTURE', color:'#ff4d00', anchor:{x:-260,y:-210}, headingY:-440 },
    { id:'physics-ml', label:'APPLIED MACHINE LEARNING', color:'#00ff41', anchor:{x:270,y:-180}, headingY:-440 },
    { id:'validation', label:'COMPUTATIONAL VALIDATION', color:'#ffa500', anchor:{x:-260,y:275}, headingY:50 },
    { id:'nonlinear-dynamics', label:'NONLINEAR DYNAMICS & STABILITY', color:'#00bfff', anchor:{x:270,y:330}, headingY:50 }
  ];

  var LEAVES = [
    { id:'ibrido', short:'Ibrido', label:'Ibrido: XV-15 Hybrid-Electric Tiltrotor', desc:'Down-selected a parallel hybrid-electric architecture across a 3-engineer, 4-topology trade study. Validated against real NASA flight-test data -- the hybrid clears a cruise speed (348 KTAS) the conventional baseline can\'t reach at all (278 KTAS).', img:'img/ibrido_flight_envelope.png', pillars:[{id:'systems-architecture',strength:1},{id:'validation',strength:0.6}] },
    { id:'doosan', short:'Doosan', label:'H2/CH4 Micromixer Reacting-Flow CFD', desc:'Mechanism-level comparison (SkeleCHy, HyChem, San Diego) and FGM-vs-finite-rate workflow validation for high-hydrogen micromixer combustion.', pillars:[{id:'validation',strength:1}] },
    { id:'boeing', short:'Ti-6Al-4V', label:'Ti-6Al-4V Supply Chain Risk', desc:'Graph-based supplier concentration metrics and TOPSIS-ranked mitigations for aerospace titanium dependencies.', img:'img/s15_mitigation_layers.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'bwb', short:'H2 BWB', label:'Hydrogen Blended-Wing-Body Concept', desc:'QFD + morphological matrix + TOPSIS concept downselection inside a full SysML/MBSE model.', img:'img/bwb_final_selection.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'afrl', short:'AFRL MDAO', label:'AFRL Tactical Mobility MDAO', desc:'OpenMDAO workflow tying propulsion, structures, and mission sizing into one coherent trade, projecting +15.7% range.', img:'img/MDAO2.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'hyperloop', short:'Hyperloop', label:'Hyperloop Mechanical Design & Subsystem Integration', desc:'Propulsion-interface redesign (LIM vs. LSM trade study) and GD&T across 50+ high-load components; cut manufacturing defects by 22%.', img:'img/cold gas thruster.PNG', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'gas-turbine', short:'Gas Turbine', label:'Gas Turbine Cycle Design Tool', desc:'1D variable-heat-capacity turbojet/turbofan cycle tool; swept 3,800+ design combinations, corrected a 46% TSFC underestimate from constant-property assumptions.', img:'img/gasturbine_comparison2D.jpg', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'trajectory', short:'Trajectory', label:'Minimum Time-to-Climb Trajectory Optimization', desc:'Compared direct transcription against SLSQP single shooting; analytical block-banded Jacobian cut per-iteration cost by 60%.', img:'img/trajectory_fullspace.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'vawt', short:'VAWT', label:'Vertical Axis Wind Turbine Design Comparison', desc:'Designed and parametrically compared multiple VAWT configurations against each other for rotor performance -- a real trade study, not a single-design study.', img:'img/1.JPG', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'mfg', short:'MFG', label:'Neural Mean-Field Game Simulator', desc:'A Neural SDE (learned drift/diffusion) layered on a known base drift, trained to match an analytic Nash equilibrium, validated by an 84-test suite.', img:'img/mfg_w2_vs_N.png', pillars:[{id:'physics-ml',strength:1},{id:'nonlinear-dynamics',strength:1},{id:'validation',strength:0.6}] },
    { id:'option-pricing', short:'SciML ROM', label:'Scientific ML Surrogate Modeling', desc:'A physics-informed reduced-order model plus a Fourier Neural Operator residual correction.', img:'img/output2.png', pillars:[{id:'physics-ml',strength:1}] },
    { id:'telemetry-ml', short:'Telemetry ML', label:'Vehicle Telemetry ML Dashboard', desc:'Unsupervised ML (PCA, clustering, isolation forest) surfacing braking signatures, track archetypes, and anomaly patterns straight from raw telemetry -- pattern discovery with no physics baseline underneath.', img:'img/telemetry_pca_clusters.png', pillars:[{id:'physics-ml',strength:1}] },
    { id:'cabs', short:'DRDO L-V', label:'DRDO Lotka-Volterra Dynamics', desc:'Nonlinear predator-prey dynamics and Jacobian stability analysis around equilibrium points, co-authored into a paper.', img:'img/drdo_phase_plane.jpg', pillars:[{id:'nonlinear-dynamics',strength:1}] },
    { id:'tcnj', short:'Cavitation', label:'Pump Cavitation Detection', desc:'Early-stage acoustic diagnostics scoping for a system stability/onset problem.', pillars:[{id:'nonlinear-dynamics',strength:0.6}] },
    { id:'tue', short:'TU/e FGM', label:'TU/e NH3/H2 Combustion (FGM)', desc:'Reduced-chemistry workflow validated against a higher-cost detailed-chemistry baseline: 86.7% runtime reduction, physically consistent fields.', img:'img/TUE1.png', pillars:[{id:'validation',strength:1}] },
    { id:'thesis', short:'Drone Thesis', label:'Drone Rotor Test & Validation', desc:'OpenFOAM CFD checked directly against a physical test rig\'s measured wake data.', img:'assets/mesh_cyclicami_prop.png', pillars:[{id:'validation',strength:1}] },
    { id:'iit', short:'IIT Bombay', label:'IIT Bombay Ventilation CFD', desc:'Ceiling-fan indoor-ventilation CFD validated against thermal-stratification and air-change-rate measurements.', img:'img/iit_room_top_view.png', pillars:[{id:'validation',strength:1}] },
    { id:'fsi', short:'FSI Wave', label:'FSI Elastic Wave Propagation', desc:'Coupled OpenFOAM + CalculiX fluid-structure interaction via preCICE.', pillars:[{id:'validation',strength:1}] },
    { id:'scramjet', short:'Scramjet', label:'Scramjet Inlet Nozzle Validation', desc:'Ramp-inlet validation study for scramjet inlet/nozzle geometry at high Mach numbers.', pillars:[{id:'validation',strength:1}] }
  ];

  var territoryById = {};
  TERRITORIES.forEach(function(t){ territoryById[t.id] = t; });
  var leavesById = {};
  LEAVES.forEach(function(l){ leavesById[l.id] = l; });

  function homeDomain(l){
    var best = l.pillars[0];
    for(var i = 1; i < l.pillars.length; i++){ if(l.pillars[i].strength > best.strength) best = l.pillars[i]; }
    return best;
  }
  function leafWeight(l){ var w = 0; l.pillars.forEach(function(pl){ w += pl.strength; }); return w; }
  function leafRadius(l){ return 16 + leafWeight(l) * 11; }

  var leafRadiusById = {};
  LEAVES.forEach(function(l){ leafRadiusById[l.id] = leafRadius(l); });

  var byTerritory = {};
  TERRITORIES.forEach(function(t){ byTerritory[t.id] = []; });
  LEAVES.forEach(function(l){ byTerritory[homeDomain(l).id].push(l.id); });

  // A "common" leaf (tied to more than one domain) is pulled toward the
  // border of its home territory, facing the direction of its secondary
  // tie(s) -- reads as reaching toward the domain it also belongs to, and
  // keeps its hover-thread short.
  function secondaryDir(l, homeAnchor){
    var hd = homeDomain(l);
    var sec = l.pillars.filter(function(pl){ return pl.id !== hd.id; });
    if(sec.length === 0) return null;
    var vx = 0, vy = 0;
    sec.forEach(function(pl){
      var a = territoryById[pl.id].anchor;
      vx += (a.x - homeAnchor.x); vy += (a.y - homeAnchor.y);
    });
    var mag = Math.hypot(vx, vy) || 1;
    return { x: vx / mag, y: vy / mag };
  }

  var GOLDEN = 137.508 * Math.PI / 180;

  TERRITORIES.forEach(function(t){
    var ids = byTerritory[t.id];
    var n = ids.length;
    var maxR = Math.max.apply(null, ids.map(function(id){ return leafRadiusById[id]; }));
    t.clusterRadius = Math.max(60 + 36 * Math.sqrt(n), maxR * 2.5);
  });

  // Greedy spiral packing, collision-checked against every previously
  // placed circle -- correct by construction for unequal circle sizes.
  function packTerritory(t, ids){
    var placed = [];
    function place(x, y, r, id){ placed.push({ id:id, x:x, y:y, r:r }); }
    function collides(x, y, r){
      return placed.some(function(p){ return Math.hypot(p.x - x, p.y - y) < (p.r + r + 9); });
    }

    var commonIds = ids.filter(function(id){ return secondaryDir(leavesById[id], t.anchor) !== null; });
    var soloIds = ids.filter(function(id){ return secondaryDir(leavesById[id], t.anchor) === null; });

    commonIds.forEach(function(id){
      var r = leafRadiusById[id];
      var dir = secondaryDir(leavesById[id], t.anchor);
      var rad = t.clusterRadius * 0.9;
      var theta = Math.atan2(dir.y, dir.x);
      var x = rad * Math.cos(theta), y = rad * Math.sin(theta);
      var attempts = 0;
      while(collides(x, y, r) && attempts < 200){
        theta += 0.12; attempts++;
        x = rad * Math.cos(theta); y = rad * Math.sin(theta);
      }
      place(x, y, r, id);
    });

    soloIds.slice().sort(function(a, b){ return leafRadiusById[b] - leafRadiusById[a]; }).forEach(function(id, k){
      var r = leafRadiusById[id];
      var theta0 = k * GOLDEN;
      var rad = 30, attempts = 0, x, y;
      do {
        var theta = theta0 + attempts * 0.14;
        x = rad * Math.cos(theta); y = rad * Math.sin(theta);
        if(!collides(x, y, r)) break;
        attempts++;
        if(attempts % 12 === 0) rad += 6;
      } while(attempts < 600);
      place(x, y, r, id);
    });

    return placed;
  }

  var leafHome = {};
  TERRITORIES.forEach(function(t){
    packTerritory(t, byTerritory[t.id]).forEach(function(p){
      leafHome[p.id] = { x: t.anchor.x + p.x, y: t.anchor.y + p.y };
    });
  });

  var svg = document.getElementById('pillarsSvg');
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs){
    var e = document.createElementNS(NS, tag);
    for(var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  var defs = el('defs', {});
  svg.appendChild(defs);

  var particles = {};
  LEAVES.forEach(function(l){
    var hd = homeDomain(l);
    var pos = leafHome[l.id];
    particles[l.id] = { home: pos, x: pos.x, y: pos.y, vx:0, vy:0, r: leafRadius(l), color: territoryById[hd.id].color };
  });
  var allIds = Object.keys(particles);

  var FORCE = reduce ? 0 : 1.3, SPRING = 0.016, REPEL_DIST = 82, REPEL_STRENGTH = 14, DAMPING = 0.965;

  function stepParticles(){
    allIds.forEach(function(id){
      if(id === draggingId) return;
      var p = particles[id];
      p.vx += (Math.random() - 0.5) * FORCE;
      p.vy += (Math.random() - 0.5) * FORCE;
      p.vx += (p.home.x - p.x) * SPRING;
      p.vy += (p.home.y - p.y) * SPRING;
    });
    for(var i = 0; i < allIds.length; i++){
      for(var j = i + 1; j < allIds.length; j++){
        var a = particles[allIds[i]], b = particles[allIds[j]];
        var dx = a.x - b.x, dy = a.y - b.y;
        var dist = Math.hypot(dx, dy) || 1;
        if(dist < REPEL_DIST){
          var f = (REPEL_DIST - dist) / REPEL_DIST * REPEL_STRENGTH;
          var nx = dx / dist, ny = dy / dist;
          if(allIds[i] !== draggingId){ a.vx += nx * f; a.vy += ny * f; }
          if(allIds[j] !== draggingId){ b.vx -= nx * f; b.vy -= ny * f; }
        }
      }
    }
    allIds.forEach(function(id){
      if(id === draggingId) return;
      var p = particles[id];
      p.vx *= DAMPING; p.vy *= DAMPING;
      p.x += p.vx * 0.09; p.y += p.vy * 0.09;
    });
  }

  function wrapLabel(label, maxChars){
    var words = label.split(' ');
    var lines = [], cur = '';
    words.forEach(function(w){
      var test = cur ? cur + ' ' + w : w;
      if(test.length > maxChars && cur){ lines.push(cur); cur = w; }
      else cur = test;
    });
    if(cur) lines.push(cur);
    return lines;
  }

  var territoryEls = [];
  TERRITORIES.forEach(function(t, i){
    var n = byTerritory[t.id].length;
    var gid = 'territoryGlow' + i;
    var grad = el('radialGradient', { id:gid });
    grad.appendChild(el('stop', { offset:'0%', 'stop-color':t.color, 'stop-opacity':0.16 }));
    grad.appendChild(el('stop', { offset:'55%', 'stop-color':t.color, 'stop-opacity':0.06 }));
    grad.appendChild(el('stop', { offset:'100%', 'stop-color':t.color, 'stop-opacity':0 }));
    defs.appendChild(grad);

    var g = el('g', { class:'territory' + (reduce ? '' : ' pre-reveal') });
    var glow = el('circle', { class:'territory-glow', cx:t.anchor.x, cy:t.anchor.y, r: t.clusterRadius * 1.55, fill:'url(#' + gid + ')' });
    g.appendChild(glow);
    var lines = wrapLabel(t.label, 22);
    lines.forEach(function(line, li){
      var tx = el('text', { class:'territory-label', x:t.anchor.x, y:t.headingY + li * 19, 'text-anchor':'middle' });
      tx.setAttribute('fill', t.color);
      tx.textContent = line;
      g.appendChild(tx);
    });
    var count = el('text', { class:'territory-count', x:t.anchor.x, y:t.headingY + lines.length * 19 + 6, 'text-anchor':'middle' });
    count.textContent = n + ' PROJECTS';
    g.appendChild(count);
    svg.appendChild(g);
    territoryEls.push(g);
  });

  // Cross-domain threads: shown only on hover of the leaf itself, per the
  // "home + thread" rule -- keeps the resting view uncluttered.
  var threadEls = [];
  LEAVES.forEach(function(l){
    if(l.pillars.length < 2) return;
    var hd = homeDomain(l);
    l.pillars.forEach(function(pl){
      if(pl.id === hd.id) return;
      var line = el('line', { class:'thread', stroke: territoryById[pl.id].color, 'stroke-width':1.2, 'data-leaf':l.id, 'data-territory':pl.id });
      svg.appendChild(line);
      threadEls.push(line);
    });
  });

  var centerLine1 = el('text', { class:'center-label', x:0, y:-12 });
  centerLine1.textContent = 'I FIND TRENDS';
  svg.appendChild(centerLine1);
  var centerLine2 = el('text', { class:'center-label', x:0, y:18 });
  centerLine2.textContent = 'IN CHAOS';
  svg.appendChild(centerLine2);

  var tip = document.getElementById('pillarsTip');
  var tipImg = document.getElementById('pillarsTipImg');
  var tipTitle = document.getElementById('pillarsTipTitle');
  var tipBody = document.getElementById('pillarsTipBody');
  var stage = root.querySelector('.pillars-stage');

  function showTip(id){
    var l = leavesById[id];
    if(l.img){ tipImg.src = l.img; tipImg.alt = l.label; }
    else { tipImg.removeAttribute('src'); tipImg.alt = ''; }
    tipTitle.textContent = l.label;
    tipBody.textContent = l.desc;
    var p = particles[id];
    var rect = stage.getBoundingClientRect();
    var scale = rect.width / 1000;
    tip.style.left = (rect.width/2 + p.x*scale) + 'px';
    tip.style.top = (rect.height/2 + p.y*scale) + 'px';
    tip.classList.add('show');
  }
  function hideTip(){ tip.classList.remove('show'); }

  var hoverId = null;
  var draggingId = null;
  var dragLastX = 0, dragLastY = 0, dragLastT = 0;

  function clientToSvg(clientX, clientY){
    var rect = stage.getBoundingClientRect();
    return { x: ((clientX - rect.left) / rect.width) * 1000 - 500, y: ((clientY - rect.top) / rect.height) * 1000 - 500 };
  }

  function clearHighlight(){
    root.querySelectorAll('.bubble-node').forEach(function(n){ n.classList.remove('lit'); });
    threadEls.forEach(function(t){ t.classList.remove('show'); });
    hoverId = null;
  }
  function highlight(id){
    clearHighlight();
    hoverId = id;
    var node = document.getElementById('pillarNode-' + id);
    if(node) node.classList.add('lit');
    threadEls.forEach(function(t){ if(t.dataset.leaf === id) t.classList.add('show'); });
  }

  var bubbleEls = [];

  LEAVES.forEach(function(l){
    var pos = particles[l.id];
    var g = el('g', { class:'bubble-node' + (reduce ? '' : ' pre-reveal'), id:'pillarNode-' + l.id });
    var body = el('circle', { class:'body', cx:pos.x, cy:pos.y, r:pos.r });
    body.setAttribute('stroke', pos.color);
    g.appendChild(body);
    var t = el('text', { class:'bubble-label', x: pos.x, y: pos.y + pos.r + 15 });
    t.textContent = l.short;
    g.appendChild(t);
    var hit = el('circle', { class:'node-hit', cx:pos.x, cy:pos.y, r:pos.r + 10 });
    g.appendChild(hit);
    svg.appendChild(g);
    bubbleEls.push(g);

    function activate(){ highlight(l.id); showTip(l.id); }
    hit.addEventListener('mouseenter', activate);
    hit.addEventListener('mouseleave', function(){ if(draggingId) return; clearHighlight(); hideTip(); });
    hit.addEventListener('click', function(){
      activate();
      document.dispatchEvent(new CustomEvent('krtin:open-project', { detail:{ id:l.id } }));
    });
    hit.addEventListener('pointerdown', function(e){ startDrag(l.id, hit, e); });
  });

  function startDrag(id, hitEl, e){
    draggingId = id;
    hitEl.classList.add('dragging');
    var pos = clientToSvg(e.clientX, e.clientY);
    dragLastX = pos.x; dragLastY = pos.y; dragLastT = performance.now();
    highlight(id);
    showTip(id);
    e.preventDefault();
  }

  window.addEventListener('pointermove', function(e){
    if(!draggingId) return;
    var pos = clientToSvg(e.clientX, e.clientY);
    var p = particles[draggingId];
    p.x = pos.x; p.y = pos.y;
    var now = performance.now();
    var dt = Math.max(1, now - dragLastT);
    p.vx = (pos.x - dragLastX) / dt * 16;
    p.vy = (pos.y - dragLastY) / dt * 16;
    dragLastX = pos.x; dragLastY = pos.y; dragLastT = now;
  });
  window.addEventListener('pointerup', function(e){
    if(!draggingId) return;
    root.querySelectorAll('.node-hit.dragging').forEach(function(h){ h.classList.remove('dragging'); });
    draggingId = null;
    var under = document.elementFromPoint(e.clientX, e.clientY);
    if(!under || !under.classList.contains('node-hit')){ clearHighlight(); hideTip(); }
  });

  function render(){
    allIds.forEach(function(id){
      var p = particles[id];
      var g = document.getElementById('pillarNode-' + id);
      if(!g) return;
      var body = g.querySelector('.body');
      body.setAttribute('cx', p.x); body.setAttribute('cy', p.y);
      var hit = g.querySelector('.node-hit');
      hit.setAttribute('cx', p.x); hit.setAttribute('cy', p.y);
      var label = g.querySelector('.bubble-label');
      label.setAttribute('x', p.x); label.setAttribute('y', p.y + p.r + 15);
    });
    threadEls.forEach(function(t){
      var lp = particles[t.dataset.leaf];
      var anchor = territoryById[t.dataset.territory].anchor;
      t.setAttribute('x1', lp.x); t.setAttribute('y1', lp.y);
      t.setAttribute('x2', anchor.x); t.setAttribute('y2', anchor.y);
    });
    if(hoverId){
      var hp = particles[hoverId];
      var rect = stage.getBoundingClientRect();
      var scale = rect.width / 1000;
      tip.style.left = (rect.width/2 + hp.x*scale) + 'px';
      tip.style.top = (rect.height/2 + hp.y*scale) + 'px';
    }
  }

  function frame(){ if(!reduce){ stepParticles(); render(); requestAnimationFrame(frame); } }

  function runReveal(){
    stage.classList.add('revealed');
    if(reduce){ render(); return; }
    territoryEls.forEach(function(g, i){ setTimeout(function(){ g.classList.remove('pre-reveal'); }, i * 100); });
    var bubbleStart = territoryEls.length * 100 + 250;
    bubbleEls.forEach(function(g, i){ setTimeout(function(){ g.classList.remove('pre-reveal'); }, bubbleStart + i * 45); });
    requestAnimationFrame(frame);
  }

  if(reduce){ runReveal(); }
  else {
    var played = false;
    new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting && !played){ played = true; runReveal(); }
    }, { threshold:0.3 }).observe(stage);
  }
}

/* ============================================================
   PROJECT MODAL — click a highlight plate, an archive card, or a
   bubble in the cluster diagram and see the full writeup in a
   floating dialog, with every real image available for that
   project (not just the one shown inline on the card). Content is
   read directly from the card's own DOM at open time rather than
   duplicated into a separate data structure, so the modal can
   never drift out of sync with the plate/card copy -- the only
   new data here is EXTRA_IMAGES, real project images that exist
   on disk but don't fit inline on a card.
   ============================================================ */
function initProjectModal(){
  var modal = document.getElementById('projectModal');
  if(!modal) return;

  var EXTRA_IMAGES = {
    afrl: [
      { src:'img/MDAO1.png', alt:'MDAO subsystem interaction diagram', caption:'Subsystem coupling and dependency structure.' },
      { src:'img/MDAO4.png', alt:'Hybridization modes considered', caption:'Hybridization modes and propulsion sizing outputs.' }
    ],
    tue: [
      { src:'img/Static Temperature_LES_1000.jpg', alt:'Static temperature contour, LES combustion field', caption:'Representative static-temperature field, LES.' },
      { src:'img/O2 Mole fraction_LES_1000.jpg', alt:'O2 mole fraction contour, LES combustion field', caption:'O2 mole-fraction field showing species behavior.' }
    ],
    thesis: [
      { src:'assets/drone_me_at_work.jpg', alt:'Rotor test rig bench setup', caption:'Experimental rotor test rig, RPi-actuated RPM control.' },
      { src:'assets/raspberry_pi_3b.png', alt:'Raspberry Pi control hardware for the test rig', caption:'Low-cost control hardware for the test rig.' }
    ],
    boeing: [
      { src:'img/Me-SOS.jpeg', alt:'Stakeholder-facing systems risk briefing', caption:'Stakeholder-facing systems risk briefing.' },
      { src:'img/MBSE1.png', alt:'Supply chain risk methodology: identify, collect, connect, assess, and mitigate', caption:'Supply-chain risk methodology, step by step.' }
    ],
    bwb: [
      { src:'img/bwb_qfd_house_of_quality.png', alt:'QFD House of Quality for the next-generation transport aircraft concept', caption:'QFD House of Quality: customer needs to engineering targets.' },
      { src:'img/bwb_morphological_matrix.png', alt:'Morphological matrix across propulsion, fuel, aerodynamics, and structural options', caption:'Morphological matrix across 14 functional requirements.' },
      { src:'img/bwb_topsis_ranking.png', alt:'TOPSIS closeness ranking, hydrogen BWB configuration first', caption:'TOPSIS closeness ranking of the 5 candidates.' }
    ],
    ibrido: [
      { src:'img/ibrido_alpha_feasibility.png', alt:'Max feasible payload vs. engine-downsize fraction, showing the narrow feasible window', caption:'Payload vs. engine-downsize fraction: the feasible window.' },
      { src:'img/ibrido_range_sweep.png', alt:'Payload vs. mission range, hybrid vs. conventional, showing the hybrid feasible only near 300-306 nm', caption:'Payload vs. mission range: the conventional baseline never closes at any tested range; the hybrid only closes near the RFP target.' },
      { src:'img/ibrido_timing_comparison.png', alt:'Jointly-optimized vs. naive transition-segment timing schedule, showing near-identical payload and fuel outcomes', caption:'Optimized vs. naive transition timing: within about 1% on payload and fuel -- alpha is the real lever.' }
    ],
    hyperloop: [
      { src:'img/lim.png', alt:'Linear induction motor thrust-slip plot', caption:'Propulsion operating-region reasoning (LIM thrust-slip).' }
    ],
    'telemetry-ml': [
      { src:'img/telemetry_anomaly_detection.png', alt:'Isolation-forest anomaly score against speed trace for one lap', caption:'Isolation-forest anomaly score against a normalized speed trace.' }
    ]
  };

  var panel = modal.querySelector('.modal-panel');
  var backdrop = document.getElementById('modalBackdrop');
  var closeBtn = document.getElementById('modalClose');
  var gallery = document.getElementById('modalGallery');
  var elPeriod = document.getElementById('modalPeriod');
  var elTitle = document.getElementById('modalTitle');
  var elOneliner = document.getElementById('modalOneliner');
  var elRows = document.getElementById('modalRows');
  var elTags = document.getElementById('modalTags');
  var elScope = document.getElementById('modalScope');

  var lightbox = document.getElementById('imageLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  var lastFocused = null;

  function textOf(node){ return node ? node.textContent.trim() : ''; }

  function openLightbox(src, alt, caption){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function openFromCard(card){
    var isPlate = card.classList.contains('plate');
    var titleEl = card.querySelector(isPlate ? '.plate-title' : '.arc-title');
    var periodEl = card.querySelector(isPlate ? '.plate-period' : '.arc-date');
    var onelinerEl = card.querySelector(isPlate ? '.plate-oneliner' : '.arc-summary');
    if(!titleEl) return;

    elTitle.textContent = textOf(titleEl);
    elPeriod.textContent = textOf(periodEl);
    elOneliner.textContent = textOf(onelinerEl);

    elRows.innerHTML = '';
    card.querySelectorAll('.plate-row').forEach(function(row){
      var label = row.querySelector('b');
      var wrap = document.createElement('div');
      wrap.className = 'modal-row';
      var b = document.createElement('b');
      b.textContent = label ? label.textContent : '';
      var span = document.createElement('span');
      span.textContent = row.textContent.replace(label ? label.textContent : '', '').trim();
      wrap.appendChild(b); wrap.appendChild(span);
      elRows.appendChild(wrap);
    });

    elTags.innerHTML = '';
    card.querySelectorAll('.plate-tags span, .arc-tags span').forEach(function(t){
      var span = document.createElement('span');
      span.textContent = t.textContent;
      elTags.appendChild(span);
    });

    var scopeEl = card.querySelector('.plate-scope');
    elScope.textContent = scopeEl ? scopeEl.textContent : '';
    elScope.style.display = scopeEl ? '' : 'none';

    gallery.innerHTML = '';

    // A project with a real live site embeds it directly, browser-chrome
    // framed, instead of just linking out -- swaps in for the image
    // gallery entirely for that project.
    var embedUrl = card.dataset.embed;
    if(embedUrl){
      var frame = document.createElement('div');
      frame.className = 'browser-frame';
      var bar = document.createElement('div');
      bar.className = 'browser-frame-bar';
      bar.innerHTML = '<span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span>';
      var urlSpan = document.createElement('span');
      urlSpan.className = 'browser-url';
      urlSpan.textContent = embedUrl.replace(/^https?:\/\//, '');
      var openLink = document.createElement('a');
      openLink.className = 'browser-open';
      openLink.href = embedUrl; openLink.target = '_blank'; openLink.rel = 'noopener';
      openLink.title = 'Open in new tab';
      openLink.textContent = '↗';
      bar.appendChild(urlSpan); bar.appendChild(openLink);
      var iframe = document.createElement('iframe');
      iframe.src = embedUrl; iframe.loading = 'lazy'; iframe.title = textOf(titleEl) + ' (live site)';
      frame.appendChild(bar); frame.appendChild(iframe);
      gallery.appendChild(frame);
      gallery.style.display = '';
      open();
      return;
    }

    var images = [];
    var mainImg = card.querySelector('.plate-media img, .arc-media img');
    if(mainImg) images.push({ src:mainImg.getAttribute('src'), alt:mainImg.alt, caption:mainImg.alt });
    var extra = EXTRA_IMAGES[card.dataset.id] || [];
    images = images.concat(extra);

    if(images.length){
      images.forEach(function(im){
        var fig = document.createElement('figure');
        var img = document.createElement('img');
        img.src = im.src; img.alt = im.alt || '';
        img.loading = 'lazy';
        fig.appendChild(img);
        if(im.caption){
          var cap = document.createElement('figcaption');
          cap.textContent = im.caption;
          fig.appendChild(cap);
        }
        fig.addEventListener('click', function(){ openLightbox(im.src, im.alt, im.caption); });
        gallery.appendChild(fig);
      });
      gallery.style.display = '';
    } else {
      gallery.style.display = 'none';
    }

    open();
  }

  function findCardById(id){
    return document.querySelector('.plate[data-id="' + id + '"], .arc-card[data-id="' + id + '"]');
  }

  function open(){
    lastFocused = document.activeElement;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeBtn.focus();
  }
  function close(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if(lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll('.plate, .arc-card').forEach(function(card){
    if(!card.dataset.id) return;
    // Plates are always visible, so always tabbable. Archive cards live
    // inside a max-height:0/overflow:hidden collapsed section that stays
    // in the tab order even while visually clipped -- only make them
    // tabbable once the archive is actually open, tracked below.
    card.tabIndex = card.classList.contains('plate') ? 0 : -1;
    card.setAttribute('role', 'button');
    card.addEventListener('click', function(){ openFromCard(card); });
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openFromCard(card); }
    });
  });

  var archiveZone = document.getElementById('archiveZone');
  if(archiveZone){
    var syncArchiveTabbability = function(){
      var isOpen = archiveZone.classList.contains('open');
      archiveZone.querySelectorAll('.arc-card').forEach(function(card){
        card.tabIndex = isOpen ? 0 : -1;
      });
    };
    syncArchiveTabbability();
    new MutationObserver(syncArchiveTabbability).observe(archiveZone, { attributes:true, attributeFilter:['class'] });
  }

  document.addEventListener('krtin:open-project', function(e){
    var card = findCardById(e.detail.id);
    if(card) openFromCard(card);
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    if(lightbox.classList.contains('show')){ closeLightbox(); return; }
    if(modal.classList.contains('show')) close();
  });
  panel.addEventListener('click', function(e){ e.stopPropagation(); });
}
