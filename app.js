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

  if(reduce) return;

  var played = false;
  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !played){
      played = true;
      cat.classList.remove('idle');
      cat.classList.add('run');
      setTimeout(function(){
        cat.classList.remove('run');
        cat.classList.add('idle', 'idle-gt');
      }, 2500);
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

  var SKILLS = [
    { name:'ANSYS Fluent', mono:'FL', lat:42, lon:15 },
    { name:'OpenFOAM', mono:'OF', lat:-18, lon:35 },
    { name:'OpenMDAO', mono:'MD', lat:-12, lon:-55 },
    { name:'MATLAB', mono:'ML', lat:30, lon:50 },
    { name:'Python', mono:'PY', lat:8, lon:120 },
    { name:'PyTorch', mono:'PT', lat:-26, lon:-120 },
    { name:'Systems / MBSE', mono:'SY', lat:52, lon:95 },
    { name:'C++', mono:'C+', lat:-45, lon:170 }
  ];

  function toXYZ(lat, lon, r){
    var phi = (90-lat)*Math.PI/180, th = (lon+180)*Math.PI/180;
    return { x:-r*Math.sin(phi)*Math.cos(th), y:r*Math.cos(phi), z:r*Math.sin(phi)*Math.sin(th) };
  }
  var R = 160;
  var pts = SKILLS.map(function(s){ var p = toXYZ(s.lat,s.lon,R); p.name = s.name; p.mono = s.mono; return p; });

  var LAT_STEPS = [-60, -30, 0, 30, 60];
  var LON_STEPS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
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

  var FOCAL = 560;

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
    var rad = (isHover?16:13)*dpr*pp.scale;
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
    ctx.font = (isHover ? '700 ' : '600 ') + (10*dpr*pp.scale) + 'px ' + 'ui-monospace,Consolas,monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = isHover ? '#fff' : 'rgba(20,23,26,' + (0.5+depth*0.5).toFixed(2) + ')';
    ctx.fillText(pp.mono, pp.sx, pp.sy + 0.5*dpr);
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
      pp.name = p.name; pp.mono = p.mono;
      return pp;
    });
    var order = lastProjected.map(function(_,i){ return i; }).sort(function(a,b){ return lastProjected[a].z-lastProjected[b].z; });
    order.forEach(function(i){ drawBadge(lastProjected[i], i===hoverIdx); });
    requestAnimationFrame(frame);
  }
  if(reduce){
    ctx.clearRect(0,0,W,H);
    var cx0=W/2, cy0=H/2;
    var focal0 = FOCAL*dpr;
    latRings.forEach(function(ring){ drawWireRing(ring, focal0, cx0, cy0); });
    lonRings.forEach(function(ring){ drawWireRing(ring, focal0, cx0, cy0); });
    pts.forEach(function(p){
      var r = rotate(p, 0.6, -0.2);
      var scale = focal0/(focal0+r.z);
      drawBadge({ sx:cx0+r.x*scale, sy:cy0-r.y*scale, z:r.z, scale:scale, mono:p.mono }, false);
    });
  } else {
    requestAnimationFrame(frame);
  }
}

/* ============================================================
   PILLARS WEB — recurring patterns across the work, as free-
   floating balls under real chaotic (Langevin-style) forcing.
   Ported from design/pillars-web-v4-mockup.html; pillars/projects
   and their connections are drawn from the graphify knowledge
   graph, not invented for this page. All DOM lookups are scoped
   to #pillars so the fairly generic inner class names can never
   collide with anything else on the page.
   ============================================================ */
function initPillarsWeb(){
  var root = document.getElementById('pillars');
  if(!root) return;

  var PILLARS = [
    { id:'systems-architecture', fig:'01', label:'AEROSPACE SYSTEMS ARCHITECTURE', desc:'Architect and down-select real aerospace and propulsion systems, from a hybrid-electric tiltrotor to a titanium supply chain, with a number behind every call.', angle:0 },
    { id:'physics-ml', fig:'02', label:'APPLIED MACHINE LEARNING', desc:'Physics-informed corrections where a baseline model exists, pattern discovery from raw data where it does not.', angle:90 },
    { id:'nonlinear-dynamics', fig:'03', label:'NONLINEAR DYNAMICS & STABILITY', desc:'Where a nonlinear system settles, and how fast it gets there.', angle:180 },
    { id:'validation', fig:'04', label:'COMPUTATIONAL VALIDATION', desc:'Build the model, then prove it: against experiment, an analytic solution, or a rigorous test suite.', angle:270 }
  ];

  var LEAVES = [
    { id:'ibrido', label:'Ibrido: XV-15 Hybrid-Electric Tiltrotor', desc:'A real VFS Student Design Competition entry: down-selected a distributed parallel hybrid-electric architecture across a 3-engineer, 4-topology trade study, projecting +53% payload and +28.5% range.',
      pillars:[{id:'systems-architecture',strength:1}] },
    { id:'sovern', label:'Ti-6Al-4V Supply Chain Risk', desc:'Graph-based supplier concentration metrics and TOPSIS-ranked mitigations for aerospace titanium dependencies.',
      pillars:[{id:'systems-architecture',strength:1}] },
    { id:'bwb', label:'Hydrogen Blended-Wing-Body Concept', desc:'QFD + morphological matrix + TOPSIS concept downselection inside a full SysML/MBSE model.',
      pillars:[{id:'systems-architecture',strength:1}] },
    { id:'afrl', label:'AFRL Tactical Mobility MDAO', desc:'OpenMDAO workflow tying propulsion, structures, and mission sizing into one coherent trade, projecting +15.7% range.',
      pillars:[{id:'systems-architecture',strength:1}] },
    { id:'mfg', label:'Neural Mean-Field Game Simulator', desc:'A Neural SDE (learned drift/diffusion) layered on a known base drift, trained to match an analytic Nash equilibrium, validated by an 84-test suite.',
      pillars:[{id:'physics-ml',strength:1},{id:'nonlinear-dynamics',strength:1},{id:'validation',strength:0.6}] },
    { id:'option-pricing', label:'Scientific ML Surrogate Modeling', desc:'A physics-informed reduced-order model plus a Fourier Neural Operator residual correction.',
      pillars:[{id:'physics-ml',strength:1}] },
    { id:'f1-telemetry', label:'F1 AI PitWall: Track & Driver Clustering', desc:'Unsupervised ML (PCA, clustering, isolation forest) surfacing braking signatures, track archetypes, and anomaly patterns straight from raw telemetry -- pattern discovery with no physics baseline underneath.',
      pillars:[{id:'physics-ml',strength:1}] },
    { id:'drdo', label:'DRDO Lotka-Volterra Dynamics', desc:'Nonlinear predator-prey dynamics and Jacobian stability analysis around equilibrium points, co-authored into a paper.',
      pillars:[{id:'nonlinear-dynamics',strength:1}] },
    { id:'cavitation', label:'Pump Cavitation Detection', desc:'Early-stage acoustic diagnostics scoping for a system stability/onset problem.',
      pillars:[{id:'nonlinear-dynamics',strength:0.6}] },
    { id:'tue', label:'TU/e NH3/H2 Combustion (FGM)', desc:'Reduced-chemistry workflow validated against a higher-cost detailed-chemistry baseline: 86.7% runtime reduction, physically consistent fields.',
      pillars:[{id:'validation',strength:1}] },
    { id:'thesis', label:'Drone Rotor Test & Validation', desc:'OpenFOAM CFD checked directly against a physical test rig\'s measured wake data.',
      pillars:[{id:'validation',strength:1}] }
  ];

  function deg2rad(d){ return d * Math.PI / 180; }
  var R_PILLAR = 190, R_LEAF = 400;

  var pillarHome = {};
  PILLARS.forEach(function(p){
    var a = deg2rad(p.angle - 90);
    pillarHome[p.id] = { x: Math.cos(a) * R_PILLAR, y: Math.sin(a) * R_PILLAR, angle: p.angle };
  });

  var leafAngle = {};
  LEAVES.forEach(function(l){
    var vx = 0, vy = 0;
    l.pillars.forEach(function(pl){
      var a = deg2rad(pillarHome[pl.id].angle - 90);
      vx += Math.cos(a); vy += Math.sin(a);
    });
    leafAngle[l.id] = Math.atan2(vy, vx);
  });
  var buckets = {};
  LEAVES.forEach(function(l){
    var key = Math.round(leafAngle[l.id] * 1000);
    (buckets[key] = buckets[key] || []).push(l.id);
  });
  Object.keys(buckets).forEach(function(key){
    var ids = buckets[key];
    if(ids.length < 2) return;
    var spread = deg2rad(9);
    ids.forEach(function(id, i){ leafAngle[id] += (i - (ids.length - 1) / 2) * spread; });
  });
  var leafHome = {};
  LEAVES.forEach(function(l){
    var a = leafAngle[l.id];
    leafHome[l.id] = { x: Math.cos(a) * R_LEAF, y: Math.sin(a) * R_LEAF };
  });

  var pillarWeight = {};
  PILLARS.forEach(function(p){ pillarWeight[p.id] = 0; });
  LEAVES.forEach(function(l){ l.pillars.forEach(function(pl){ pillarWeight[pl.id] += pl.strength; }); });
  var maxWeight = Math.max.apply(null, Object.keys(pillarWeight).map(function(k){ return pillarWeight[k]; }));
  function pillarRadius(pid){ return 34 + (pillarWeight[pid] / maxWeight) * 18; }

  var svg = document.getElementById('pillarsSvg');
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs){
    var e = document.createElementNS(NS, tag);
    for(var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // ---- particle state: every ball (pillar or leaf) gets a home anchor, a
  // live position, and a velocity. Each frame: small random impulse (chaotic
  // forcing) + weak spring back toward home + short-range mutual repulsion +
  // damping. This is standard Langevin-dynamics-style particle motion -- the
  // textbook model for something getting randomly jostled in a fluid -- not a
  // literal named attractor, but genuinely non-repeating, physically-motivated
  // motion rather than a decorative loop.
  var particles = {};
  PILLARS.forEach(function(p){ particles[p.id] = { home: pillarHome[p.id], x: pillarHome[p.id].x, y: pillarHome[p.id].y, vx:0, vy:0, r: pillarRadius(p.id), kind:'pillar' }; });
  LEAVES.forEach(function(l){ particles[l.id] = { home: leafHome[l.id], x: leafHome[l.id].x, y: leafHome[l.id].y, vx:0, vy:0, r: 8, kind:'leaf' }; });
  var allIds = Object.keys(particles);

  var FORCE = 1.3, SPRING = 0.01, REPEL_DIST = 70, REPEL_STRENGTH = 14, DAMPING = 0.965;

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

  var edgeEls = [];
  LEAVES.forEach(function(l){
    l.pillars.forEach(function(pl){
      var line = el('line', {
        class:'edge' + (pl.strength < 1 ? ' weak' : ''),
        'stroke-width': 0.8 + pl.strength * 0.9,
        'stroke-opacity': 0.15 + pl.strength * 0.15,
        'data-pillar':pl.id, 'data-leaf':l.id
      });
      svg.appendChild(line);
      edgeEls.push(line);
    });
  });

  var centerLine1 = el('text', { class:'center-label', x:0, y:-6 });
  centerLine1.textContent = 'I FIND TRENDS';
  svg.appendChild(centerLine1);
  var centerLine2 = el('text', { class:'center-label', x:0, y:10 });
  centerLine2.textContent = 'IN CHAOS';
  svg.appendChild(centerLine2);

  var tip = document.getElementById('pillarsTip');
  var tipTitle = document.getElementById('pillarsTipTitle');
  var tipBody = document.getElementById('pillarsTipBody');
  var stage = root.querySelector('.pillars-stage');

  function showTip(id, title, body){
    tipTitle.textContent = title;
    tipBody.textContent = body;
    var p = particles[id];
    var rect = stage.getBoundingClientRect();
    var scale = rect.width / 1000;
    tip.style.left = (rect.width/2 + p.x*scale) + 'px';
    tip.style.top = (rect.height/2 + p.y*scale) + 'px';
    tip.classList.add('show');
  }
  function hideTip(){ tip.classList.remove('show'); }

  var bloom = el('circle', { class:'bloom', r:0, fill:'url(#bloomGrad)' });
  svg.appendChild(bloom);
  var hoverId = null;
  var draggingId = null;
  var dragLastX = 0, dragLastY = 0, dragLastT = 0;

  function clientToSvg(clientX, clientY){
    var rect = stage.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 1000 - 500,
      y: ((clientY - rect.top) / rect.height) * 1000 - 500
    };
  }

  function clearHighlight(){
    edgeEls.forEach(function(e){ e.classList.remove('lit','dim'); });
    root.querySelectorAll('.pillar-node,.leaf-node').forEach(function(n){ n.classList.remove('lit','dim'); });
    bloom.classList.remove('show');
    hoverId = null;
  }

  function highlightPillar(pid){
    clearHighlight();
    hoverId = pid;
    root.querySelectorAll('.pillar-node,.leaf-node').forEach(function(n){ n.classList.add('dim'); });
    var pillarNode = document.getElementById('node-' + pid);
    if(pillarNode){ pillarNode.classList.remove('dim'); pillarNode.classList.add('lit'); }
    bloom.classList.add('show');
    edgeEls.forEach(function(e){
      if(e.dataset.pillar === pid){
        e.classList.add('lit');
        var leafNode = document.getElementById('node-' + e.dataset.leaf);
        if(leafNode){ leafNode.classList.remove('dim'); leafNode.classList.add('lit'); }
      } else {
        e.classList.add('dim');
      }
    });
  }

  function highlightLeaf(lid){
    clearHighlight();
    hoverId = lid;
    root.querySelectorAll('.pillar-node,.leaf-node').forEach(function(n){ n.classList.add('dim'); });
    var leafNode = document.getElementById('node-' + lid);
    if(leafNode){ leafNode.classList.remove('dim'); leafNode.classList.add('lit'); }
    bloom.classList.add('show');
    edgeEls.forEach(function(e){
      if(e.dataset.leaf === lid){
        e.classList.add('lit');
        var pillarNode = document.getElementById('node-' + e.dataset.pillar);
        if(pillarNode){ pillarNode.classList.remove('dim'); pillarNode.classList.add('lit'); }
      } else {
        e.classList.add('dim');
      }
    });
  }

  var pillarEls = [], leafEls = [];

  PILLARS.forEach(function(p){
    var pos = particles[p.id];
    var r = pos.r;
    var g = el('g', { class:'pillar-node' + (reduce ? '' : ' pre-reveal'), id:'node-' + p.id });
    g.appendChild(el('circle', { class:'body', cx:pos.x, cy:pos.y, r:r }));
    var fig = el('text', { class:'pillar-fig', x:pos.x, y:pos.y - r - 10 });
    fig.textContent = 'FIG. ' + p.fig;
    g.appendChild(fig);
    var words = p.label.split(' ');
    words.forEach(function(w){
      var t = el('text', { class:'pillar-label', 'text-anchor':'middle' });
      t.textContent = w;
      g.appendChild(t);
    });
    var hit = el('circle', { class:'node-hit', cx:pos.x, cy:pos.y, r:r + 6 });
    g.appendChild(hit);
    svg.appendChild(g);
    pillarEls.push(g);

    function activate(){ highlightPillar(p.id); showTip(p.id, p.label, p.desc); }
    hit.addEventListener('mouseenter', activate);
    hit.addEventListener('mouseleave', function(){ if(draggingId) return; clearHighlight(); hideTip(); });
    hit.addEventListener('click', activate);
    hit.addEventListener('pointerdown', function(e){ startDrag(p.id, hit, e); });
  });

  LEAVES.forEach(function(l){
    var pos = particles[l.id];
    var g = el('g', { class:'leaf-node' + (reduce ? '' : ' pre-reveal'), id:'node-' + l.id });
    g.appendChild(el('circle', { class:'body', cx:pos.x, cy:pos.y, r:8 }));
    var t = el('text', { class:'leaf-label', x: pos.x + 12, y: pos.y + 3 });
    t.textContent = l.label;
    g.appendChild(t);
    var hit = el('circle', { class:'node-hit', cx:pos.x, cy:pos.y, r:18 });
    g.appendChild(hit);
    svg.appendChild(g);
    leafEls.push(g);

    function activate(){ highlightLeaf(l.id); showTip(l.id, l.label, l.desc); }
    hit.addEventListener('mouseenter', activate);
    hit.addEventListener('mouseleave', function(){ if(draggingId) return; clearHighlight(); hideTip(); });
    hit.addEventListener('click', activate);
    hit.addEventListener('pointerdown', function(e){ startDrag(l.id, hit, e); });
  });

  // ---- drag: pick up any ball and move it directly; stepParticles() already
  // skips physics for whichever id is currently being dragged. On release, the
  // last real pointer-movement delta becomes the ball's velocity, so letting
  // go while moving gives it a genuine throw instead of stopping dead.
  function startDrag(id, hitEl, e){
    draggingId = id;
    hitEl.classList.add('dragging');
    var pos = clientToSvg(e.clientX, e.clientY);
    dragLastX = pos.x; dragLastY = pos.y; dragLastT = performance.now();
    var particle = particles[id];
    if(particle.kind === 'pillar') highlightPillar(id); else highlightLeaf(id);
    var info = particle.kind === 'pillar'
      ? PILLARS.filter(function(p){ return p.id === id; })[0]
      : LEAVES.filter(function(l){ return l.id === id; })[0];
    showTip(id, info.label, info.desc);
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
    // mouseleave was suppressed for the whole drag, so the highlight/tooltip
    // won't have cleared itself even if the pointer ended up somewhere else
    // entirely -- check now and clear if we're not still over a ball.
    var under = document.elementFromPoint(e.clientX, e.clientY);
    if(!under || !under.classList.contains('node-hit')){ clearHighlight(); hideTip(); }
  });

  // Per-frame render: push each particle's live x/y onto its SVG elements
  // (body circle, hit circle, label, and any edges touching it), keep the
  // bloom halo pinned to the currently-hovered ball, and refresh the tooltip
  // position so it tracks a moving target instead of going stale.
  function render(){
    allIds.forEach(function(id){
      var p = particles[id];
      var g = document.getElementById('node-' + id);
      if(!g) return;
      var body = g.querySelector('.body');
      body.setAttribute('cx', p.x); body.setAttribute('cy', p.y);
      var hit = g.querySelector('.node-hit');
      hit.setAttribute('cx', p.x); hit.setAttribute('cy', p.y);
      if(p.kind === 'pillar'){
        var fig = g.querySelector('.pillar-fig');
        fig.setAttribute('x', p.x); fig.setAttribute('y', p.y - p.r - 10);
        var labels = g.querySelectorAll('.pillar-label');
        var startY = p.y - ((labels.length - 1) * 11.5) / 2 + 4;
        labels.forEach(function(t, i){ t.setAttribute('x', p.x); t.setAttribute('y', startY + i * 11.5); });
      } else {
        var label = g.querySelector('.leaf-label');
        label.setAttribute('x', p.x + 12); label.setAttribute('y', p.y + 3);
      }
    });
    edgeEls.forEach(function(e){
      var pp = particles[e.dataset.pillar], lp = particles[e.dataset.leaf];
      e.setAttribute('x1', pp.x); e.setAttribute('y1', pp.y);
      e.setAttribute('x2', lp.x); e.setAttribute('y2', lp.y);
    });
    if(hoverId){
      var hp = particles[hoverId];
      var br = hp.kind === 'pillar' ? hp.r * 2.6 : 26;
      bloom.setAttribute('cx', hp.x); bloom.setAttribute('cy', hp.y); bloom.setAttribute('r', br);
      var rect = stage.getBoundingClientRect();
      var scale = rect.width / 1000;
      tip.style.left = (rect.width/2 + hp.x*scale) + 'px';
      tip.style.top = (rect.height/2 + hp.y*scale) + 'px';
    }
  }

  function frame(){
    if(!reduce){ stepParticles(); render(); requestAnimationFrame(frame); }
  }

  function runReveal(){
    if(reduce){ render(); return; }
    pillarEls.forEach(function(g, i){
      setTimeout(function(){ g.classList.remove('pre-reveal'); }, i * 90);
    });
    var leafStart = pillarEls.length * 90 + 300;
    leafEls.forEach(function(g, i){
      setTimeout(function(){ g.classList.remove('pre-reveal'); }, leafStart + i * 55);
    });
    requestAnimationFrame(frame);
  }

  if(reduce){
    runReveal();
  } else {
    var played = false;
    new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting && !played){ played = true; runReveal(); }
    }, { threshold:0.3 }).observe(stage);
  }
}
