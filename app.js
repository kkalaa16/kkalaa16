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
   PILLARS WEB — 19 projects on 4 domain planes through a shared
   origin (like a gyroscope), plus 2 bridge planes for the two
   projects that genuinely span two domains, sitting at an exact
   angle-bisector between their parents. Ported from
   design/cluster-3d-planes-prototype.html and recolored to this
   site's single-accent light theme (no per-domain neon -- color
   here still only marks the hovered ball, same rule as every
   other interactive element on this page). Pillars/projects and
   their connections are drawn from the graphify knowledge graph,
   not invented for this page. All DOM lookups are scoped to
   #pillars so the fairly generic inner IDs can't collide with
   anything else on the page.
   ============================================================ */
function initPillarsWeb(){
  var root = document.getElementById('pillars');
  if(!root) return;

  function dot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
  function cross(a,b){ return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
  function vnorm(a){ return Math.sqrt(dot(a,a)); }
  function normalize(a){ var m = vnorm(a); return [a[0]/m, a[1]/m, a[2]/m]; }
  function vadd(a,b){ return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]; }
  function vsub(a,b){ return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]; }
  function vscale(a,s){ return [a[0]*s,a[1]*s,a[2]*s]; }

  function basisFor(n){
    var arb = Math.abs(n[2]) < 0.9 ? [0,0,1] : [1,0,0];
    var proj = vscale(n, dot(arb, n));
    var u1 = normalize(vsub(arb, proj));
    var u2 = normalize(cross(n, u1));
    return { u1:u1, u2:u2 };
  }

  // Each domain owns a distinct plane through the shared origin, chosen so
  // the two pairs that actually have a connecting project (Aerospace/
  // Validation via Ibrido, ML/Dynamics via MFG) are exactly 90 degrees
  // apart -- which makes their bisector plane land at exactly 45 degrees
  // to each, not an approximation.
  var DOMAINS = [
    { id:'systems-architecture', label:'AEROSPACE SYSTEMS ARCHITECTURE', normal:[1,0,0], phase:0 },
    { id:'validation', label:'COMPUTATIONAL VALIDATION', normal:[0,1,0], phase:20 },
    { id:'physics-ml', label:'APPLIED MACHINE LEARNING', normal:[0,0,1], phase:40 },
    { id:'nonlinear-dynamics', label:'NONLINEAR DYNAMICS & STABILITY', normal:normalize([-0.707,0.707,0]), phase:60 }
  ];
  var domainById = {};
  DOMAINS.forEach(function(d){ domainById[d.id] = d; d.basis = basisFor(d.normal); });

  var BRIDGES = [
    { id:'ibrido-bridge', a:'systems-architecture', b:'validation', leaf:'ibrido' },
    { id:'mfg-bridge', a:'physics-ml', b:'nonlinear-dynamics', leaf:'mfg' }
  ];
  BRIDGES.forEach(function(br){
    var na = domainById[br.a].normal, nb = domainById[br.b].normal;
    br.normal = normalize(vadd(na, nb));
    br.basis = basisFor(br.normal);
  });
  var bridgeByLeaf = {};
  BRIDGES.forEach(function(br){ bridgeByLeaf[br.leaf] = br; });

  var LEAVES = [
    { id:'ibrido', short:'Ibrido', label:'Ibrido: XV-15 Hybrid-Electric Tiltrotor', desc:'Down-selected a parallel hybrid-electric architecture across a 3-engineer, 4-topology trade study. Validated against real NASA flight-test data -- the hybrid clears a cruise speed (348 KTAS) the conventional baseline can\'t reach at all (278 KTAS).', img:'img/ibrido_flight_envelope.png', pillars:[{id:'systems-architecture',strength:1},{id:'validation',strength:0.6}] },
    { id:'doosan', short:'Doosan', label:'H2/CH4 Micromixer Reacting-Flow CFD', desc:'Mechanism-level comparison (SkeleCHy, HyChem, San Diego) and FGM-vs-finite-rate workflow validation for high-hydrogen micromixer combustion.', pillars:[{id:'validation',strength:1}] },
    { id:'sovern', short:'Ti-6Al-4V', label:'Ti-6Al-4V Supply Chain Risk', desc:'Graph-based supplier concentration metrics and TOPSIS-ranked mitigations for aerospace titanium dependencies.', img:'img/s15_mitigation_layers.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'bwb', short:'H2 BWB', label:'Hydrogen Blended-Wing-Body Concept', desc:'QFD + morphological matrix + TOPSIS concept downselection inside a full SysML/MBSE model.', img:'img/MBSE1.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'afrl', short:'AFRL MDAO', label:'AFRL Tactical Mobility MDAO', desc:'OpenMDAO workflow tying propulsion, structures, and mission sizing into one coherent trade, projecting +15.7% range.', img:'img/MDAO2.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'hyperloop', short:'Hyperloop', label:'Hyperloop Mechanical Design & Subsystem Integration', desc:'Propulsion-interface redesign (LIM vs. LSM trade study) and GD&T across 50+ high-load components; cut manufacturing defects by 22%.', img:'img/cold gas thruster.PNG', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'gas-turbine', short:'Gas Turbine', label:'Gas Turbine Cycle Design Tool', desc:'1D variable-heat-capacity turbojet/turbofan cycle tool; swept 3,800+ design combinations, corrected a 46% TSFC underestimate from constant-property assumptions.', img:'img/gasturbine_comparison2D.jpg', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'trajectory', short:'Trajectory', label:'Minimum Time-to-Climb Trajectory Optimization', desc:'Compared direct transcription against SLSQP single shooting; analytical block-banded Jacobian cut per-iteration cost by 60%.', img:'img/trajectory_fullspace.png', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'vawt', short:'VAWT', label:'Vertical Axis Wind Turbine Design Comparison', desc:'Designed and parametrically compared multiple VAWT configurations against each other for rotor performance -- a real trade study, not a single-design study.', img:'img/1.JPG', pillars:[{id:'systems-architecture',strength:1}] },
    { id:'mfg', short:'MFG', label:'Neural Mean-Field Game Simulator', desc:'A Neural SDE (learned drift/diffusion) layered on a known base drift, trained to match an analytic Nash equilibrium, validated by an 84-test suite.', img:'img/mfg_w2_vs_N.png', pillars:[{id:'physics-ml',strength:1},{id:'nonlinear-dynamics',strength:1},{id:'validation',strength:0.6}] },
    { id:'option-pricing', short:'SciML ROM', label:'Scientific ML Surrogate Modeling', desc:'A physics-informed reduced-order model plus a Fourier Neural Operator residual correction.', img:'img/output2.png', pillars:[{id:'physics-ml',strength:1}] },
    { id:'f1-telemetry', short:'Telemetry ML', label:'Vehicle Telemetry ML Dashboard', desc:'Unsupervised ML (PCA, clustering, isolation forest) surfacing braking signatures, track archetypes, and anomaly patterns straight from raw telemetry -- pattern discovery with no physics baseline underneath.', pillars:[{id:'physics-ml',strength:1}] },
    { id:'drdo', short:'DRDO L-V', label:'DRDO Lotka-Volterra Dynamics', desc:'Nonlinear predator-prey dynamics and Jacobian stability analysis around equilibrium points, co-authored into a paper.', img:'img/drdo_phase_plane.jpg', pillars:[{id:'nonlinear-dynamics',strength:1}] },
    { id:'cavitation', short:'Cavitation', label:'Pump Cavitation Detection', desc:'Early-stage acoustic diagnostics scoping for a system stability/onset problem.', pillars:[{id:'nonlinear-dynamics',strength:0.6}] },
    { id:'tue', short:'TU/e FGM', label:'TU/e NH3/H2 Combustion (FGM)', desc:'Reduced-chemistry workflow validated against a higher-cost detailed-chemistry baseline: 86.7% runtime reduction, physically consistent fields.', img:'img/TUE1.png', pillars:[{id:'validation',strength:1}] },
    { id:'thesis', short:'Drone Thesis', label:'Drone Rotor Test & Validation', desc:'OpenFOAM CFD checked directly against a physical test rig\'s measured wake data.', img:'assets/mesh_cyclicami_prop.png', pillars:[{id:'validation',strength:1}] },
    { id:'iit', short:'IIT Bombay', label:'IIT Bombay Ventilation CFD', desc:'Ceiling-fan indoor-ventilation CFD validated against thermal-stratification and air-change-rate measurements.', img:'img/iit_room_top_view.png', pillars:[{id:'validation',strength:1}] },
    { id:'fsi', short:'FSI Wave', label:'FSI Elastic Wave Propagation', desc:'Coupled OpenFOAM + CalculiX fluid-structure interaction via preCICE.', pillars:[{id:'validation',strength:1}] },
    { id:'scramjet', short:'Scramjet', label:'Scramjet Inlet Nozzle Validation', desc:'Ramp-inlet validation study for scramjet inlet/nozzle geometry at high Mach numbers.', pillars:[{id:'validation',strength:1}] }
  ];
  var leavesById = {};
  LEAVES.forEach(function(l){ leavesById[l.id] = l; });

  function leafWeight(l){ var w = 0; l.pillars.forEach(function(pl){ w += pl.strength; }); return w; }
  function leafRadius(l){ return 16 + leafWeight(l) * 11; }
  function homeDomain(l){
    var best = l.pillars[0];
    for(var i = 1; i < l.pillars.length; i++){ if(l.pillars[i].strength > best.strength) best = l.pillars[i]; }
    return best;
  }

  var solo = LEAVES.filter(function(l){ return leafWeight(l) <= 1; });
  var byDomain = {};
  DOMAINS.forEach(function(d){ byDomain[d.id] = []; });
  solo.forEach(function(l){ byDomain[homeDomain(l).id].push(l.id); });

  function deg2rad(x){ return x * Math.PI / 180; }
  function capacityAtRadius(R, minChord){
    var k = 1;
    while(k < 40){
      var deltaTheta = (2 * Math.PI) / (k + 1);
      var chord = 2 * R * Math.sin(deltaTheta / 2);
      if(chord < minChord) return k;
      k++;
    }
    return k;
  }

  var MARGIN = 10, R0 = 170, RING_STEP = 110;
  var local3D = {};

  DOMAINS.forEach(function(d){
    var ids = byDomain[d.id];
    var remaining = ids.slice();
    var R = R0;
    while(remaining.length){
      var maxLeafR = Math.max.apply(null, remaining.map(function(id){ return leafRadius(leavesById[id]); }));
      var minChord = 2 * maxLeafR + MARGIN;
      var cap = capacityAtRadius(R, minChord);
      var take = remaining.splice(0, Math.min(cap, remaining.length));
      var n = take.length;
      take.forEach(function(id, i){
        var thetaDeg = d.phase + (i / n) * 360;
        var th = deg2rad(thetaDeg);
        var a = R * Math.cos(th), b = R * Math.sin(th);
        local3D[id] = vadd(vscale(d.basis.u1, a), vscale(d.basis.u2, b));
      });
      R += RING_STEP;
    }
  });

  var BRIDGE_R = 260;
  BRIDGES.forEach(function(br){ local3D[br.leaf] = vscale(br.basis.u1, BRIDGE_R); });

  function rotate3(p, ry, rx){
    var x1 = p[0] * Math.cos(ry) + p[2] * Math.sin(ry);
    var z1 = -p[0] * Math.sin(ry) + p[2] * Math.cos(ry);
    var y1 = p[1];
    var y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
    var z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);
    return { x:x1, y:y2, z:z2 };
  }

  var FOCAL = 1200;
  function project(p, ry, rx, focal, cx, cy){
    var r = rotate3(p, ry, rx);
    var scale = focal / (focal + r.z);
    return { sx:cx + r.x * scale, sy:cy - r.y * scale, z:r.z, scale:scale };
  }

  // ---- color: single-accent light theme, same rule as the rest of the
  // page -- color marks the hovered ball, it isn't used to decorate every
  // domain a different neon shade. Everything else is ink at a depth-cued
  // alpha, read once from the real CSS custom properties.
  var cs = getComputedStyle(document.body);
  function cssVar(name, fallback){ var v = cs.getPropertyValue(name); return v ? v.trim() : fallback; }
  var COL_INK = cssVar('--ink', '#14171A');
  var COL_ACCENT = cssVar('--accent', '#C13A1D');
  var COL_PANEL = cssVar('--bg-panel', '#F6F6F2');
  var COL_FAINT = cssVar('--ink-faint', '#787F86');
  function hexToRgb(hex){
    hex = hex.replace('#','');
    if(hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
    var n = parseInt(hex, 16);
    return [(n>>16)&255, (n>>8)&255, n&255];
  }
  var RGB_INK = hexToRgb(COL_INK.indexOf('#') === 0 ? COL_INK : '#14171A');
  var RGB_ACCENT = hexToRgb(COL_ACCENT.indexOf('#') === 0 ? COL_ACCENT : '#C13A1D');
  function rgba(rgb, a){ return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')'; }

  var canvas = document.getElementById('pillarsCanvas');
  var ctx = canvas.getContext('2d');
  var tip = document.getElementById('pillarsTip');
  var tipImg = document.getElementById('pillarsTipImg');
  var tipTitle = document.getElementById('pillarsTipTitle');
  var tipBody = document.getElementById('pillarsTipBody');
  var stage = root.querySelector('.pillars-stage');
  var dpr = window.devicePixelRatio || 1;
  var W, H;
  function size(){ var r = canvas.getBoundingClientRect(); W = canvas.width = r.width * dpr; H = canvas.height = r.height * dpr; }
  size();
  requestAnimationFrame(size);
  window.addEventListener('resize', size);

  var ry = 0.5, rx = 0.45;
  var velY = reduce ? 0 : 0.0012;
  var dragging = false, lastMX = 0, lastMY = 0;
  var hoverId = null;
  var lastProjected = [];

  function showTip(clientX, clientY, l){
    if(l.img){ tipImg.src = l.img; tipImg.alt = l.label; }
    else { tipImg.removeAttribute('src'); tipImg.alt = ''; }
    tipTitle.textContent = l.label;
    tipBody.textContent = l.desc;
    var rect = stage.getBoundingClientRect();
    tip.style.left = (clientX - rect.left) + 'px';
    tip.style.top = (clientY - rect.top) + 'px';
    tip.classList.add('show');
  }
  function hideTip(){ tip.classList.remove('show'); hoverId = null; }

  canvas.addEventListener('pointerdown', function(e){
    dragging = true; canvas.classList.add('dragging');
    lastMX = e.clientX; lastMY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  window.addEventListener('pointerup', function(){ dragging = false; canvas.classList.remove('dragging'); });
  window.addEventListener('pointermove', function(e){
    if(dragging){
      var dx = e.clientX - lastMX, dy = e.clientY - lastMY;
      ry += dx * 0.007; rx += dy * 0.006;
      rx = Math.max(-1.4, Math.min(1.4, rx));
      lastMX = e.clientX; lastMY = e.clientY;
      velY = 0;
    } else {
      var rect = canvas.getBoundingClientRect();
      var mx = (e.clientX - rect.left) * dpr, my = (e.clientY - rect.top) * dpr;
      var best = null, bestD = 30 * dpr;
      lastProjected.forEach(function(pp){
        var d = Math.hypot(pp.sx - mx, pp.sy - my);
        if(d < bestD){ bestD = d; best = pp.leaf.id; }
      });
      if(best !== hoverId){
        hoverId = best;
        if(best) showTip(e.clientX, e.clientY, leavesById[best]); else hideTip();
      } else if(best){
        showTip(e.clientX, e.clientY, leavesById[best]);
      }
    }
  });

  var maxRadiusAll = Math.max.apply(null, Object.keys(local3D).map(function(id){ return vnorm(local3D[id]) + leafRadius(leavesById[id]); }));

  function frame(){
    ctx.clearRect(0, 0, W, H);
    var scaleV = Math.min(W, H) / 750;
    var focal = FOCAL * scaleV;
    var cx = W / 2, cy = H / 2;

    if(!reduce) ry += velY;

    DOMAINS.forEach(function(d){
      var pts = [];
      for(var i = 0; i <= 44; i++){
        var th = (i / 44) * Math.PI * 2;
        pts.push(vadd(vscale(d.basis.u1, 280 * Math.cos(th)), vscale(d.basis.u2, 280 * Math.sin(th))));
      }
      ctx.beginPath();
      pts.forEach(function(p, i){
        var scaled = [p[0] * scaleV, p[1] * scaleV, p[2] * scaleV];
        var pp = project(scaled, ry, rx, focal, cx, cy);
        if(i === 0) ctx.moveTo(pp.sx, pp.sy); else ctx.lineTo(pp.sx, pp.sy);
      });
      ctx.strokeStyle = rgba(RGB_INK, 0.09);
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      var labelPoint = vadd(vscale(d.basis.u1, 322 * Math.cos(deg2rad(d.phase))), vscale(d.basis.u2, 322 * Math.sin(deg2rad(d.phase))));
      var lp = project(vscale(labelPoint, scaleV), ry, rx, focal, cx, cy);
      var depthT = Math.max(0, Math.min(1, (lp.scale - 0.75) / 0.5));
      ctx.font = '700 ' + (10.5 * scaleV * dpr) + 'px ' + cssVar('--mono', 'monospace');
      ctx.textAlign = 'center';
      ctx.fillStyle = rgba(RGB_INK, 0.25 + depthT * 0.4);
      ctx.fillText(d.label.split(' ')[0], lp.sx, lp.sy);
    });

    BRIDGES.forEach(function(br){
      var p0 = project([0,0,0], ry, rx, focal, cx, cy);
      var p1 = project(vscale(local3D[br.leaf], scaleV), ry, rx, focal, cx, cy);
      ctx.beginPath();
      ctx.moveTo(p0.sx, p0.sy);
      ctx.lineTo(p1.sx, p1.sy);
      ctx.strokeStyle = rgba(RGB_INK, 0.10);
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
    });

    ctx.font = '800 ' + (19 * scaleV * dpr) + 'px ' + cssVar('--sans', 'sans-serif');
    ctx.textAlign = 'center';
    ctx.fillStyle = rgba(RGB_INK, 0.9);
    ctx.fillText('I FIND TRENDS', cx, cy - 7 * scaleV * dpr);
    ctx.fillText('IN CHAOS', cx, cy + 18 * scaleV * dpr);

    var projected = LEAVES.map(function(l){
      var pp = project(vscale(local3D[l.id], scaleV), ry, rx, focal, cx, cy);
      pp.leaf = l;
      return pp;
    });
    projected.sort(function(a, b){ return a.z - b.z; });

    // MFG's weaker third tie (Validation, 0.6) isn't part of its bisector
    // plane (that's built from ML + Dynamics only) -- show it as a hover
    // thread instead, same "home + thread" rule as the flat version.
    if(hoverId === 'mfg'){
      var hp = projected.filter(function(pp){ return pp.leaf.id === 'mfg'; })[0];
      var vDom = domainById['validation'];
      var target = vadd(vscale(vDom.basis.u1, 150 * Math.cos(deg2rad(vDom.phase))), vscale(vDom.basis.u2, 150 * Math.sin(deg2rad(vDom.phase))));
      var tp = project(vscale(target, scaleV), ry, rx, focal, cx, cy);
      ctx.beginPath();
      ctx.moveTo(hp.sx, hp.sy);
      ctx.lineTo(tp.sx, tp.sy);
      ctx.setLineDash([3 * dpr, 6 * dpr]);
      ctx.strokeStyle = rgba(RGB_ACCENT, 0.7);
      ctx.lineWidth = 1.4 * dpr;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    projected.forEach(function(pp){
      var l = pp.leaf;
      var r = leafRadius(l) * pp.scale * scaleV * dpr;
      var depthT = Math.max(0, Math.min(1, (pp.scale - 0.7) / 0.55));
      var isHover = hoverId === l.id;
      var isBridge = !!bridgeByLeaf[l.id];

      ctx.beginPath();
      ctx.arc(pp.sx, pp.sy, r, 0, Math.PI * 2);
      ctx.fillStyle = isHover ? rgba(RGB_ACCENT, 0.10) : COL_PANEL;
      ctx.fill();
      ctx.lineWidth = (isHover ? 2.4 : (isBridge ? 1.8 : 1.3)) * dpr;
      ctx.strokeStyle = isHover ? COL_ACCENT : rgba(RGB_INK, 0.28 + depthT * 0.55);
      ctx.stroke();

      // Only label near-side bubbles (or whichever one is hovered) -- with
      // 19 items on 6 intersecting planes, labeling every bubble at every
      // rotation angle is what turns the resting view into an illegible
      // pile of text. Far-side items still render as plain outlined dots.
      if(isHover || pp.scale > 1.0){
        var fontSize = Math.max(8, 11 * pp.scale) * scaleV * dpr;
        ctx.font = (isHover ? '700 ' : '600 ') + fontSize + 'px ' + cssVar('--mono', 'monospace');
        ctx.textAlign = 'center';
        ctx.fillStyle = isHover ? COL_ACCENT : rgba(RGB_INK, 0.5 + depthT * 0.4);
        ctx.fillText(l.short, pp.sx, pp.sy + r + fontSize + 3);
      }
    });

    lastProjected = projected;
    if(!reduce) requestAnimationFrame(frame);
  }

  function runReveal(){
    stage.classList.add('revealed');
    frame();
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
