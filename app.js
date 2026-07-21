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
  cat.style.backgroundImage = "url('assets/cat_idle_bits.png')";

  if(reduce) return;

  var played = false;
  new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !played){
      played = true;
      cat.style.backgroundImage = "url('assets/cat_run.png')";
      cat.style.transition = 'left 2.6s cubic-bezier(.4,0,.2,1)';
      requestAnimationFrame(function(){
        cat.style.left = 'calc(100% - 34px)';
      });
      setTimeout(function(){
        cat.style.backgroundImage = "url('assets/cat_idle_gt.png')";
      }, 2700);
    }
  }, { threshold:0.4 }).observe(runway);
}

/* ============================================================
   ARCHIVE MECHANIC — twin ring carousels fly into the
   spine-connected archive on scroll-past OR click of either ring
   ============================================================ */
var PREVIEW_LEFT = ['mfg', 'gas-turbine', 'telemetry-ml', 'boeing'];
var PREVIEW_RIGHT = ['option-pricing', 'bwb', 'iit', 'scramjet'];

function initArchiveMechanic(){
  var highlights = document.getElementById('archivePreview');
  var archiveZone = document.getElementById('archiveZone');
  if(!highlights || !archiveZone) return;

  var leftData = PREVIEW_LEFT.map(function(id){ return readArcCard(id); }).filter(Boolean);
  var rightData = PREVIEW_RIGHT.map(function(id){ return readArcCard(id); }).filter(Boolean);

  function readArcCard(id){
    var el = archiveZone.querySelector('.arc-card[data-id="' + id + '"]');
    if(!el) return null;
    return { id:id, date: el.querySelector('.arc-date').textContent, title: el.querySelector('.arc-title').textContent };
  }

  var leftEls = buildRing('ringLeft', leftData, 'left');
  var rightEls = buildRing('ringRight', rightData, 'right');

  function buildRing(stageId, items, spinDir){
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
    var RADIUS = 150, TILT = 22 * Math.PI / 180;
    var theta = spinDir === 'left' ? 0 : Math.PI;
    var alive = true;
    new IntersectionObserver(function(e){ alive = e[0].isIntersecting; }, { threshold:0.02 }).observe(highlights);
    (function spin(){
      if(alive) theta += (spinDir === 'left' ? 0.006 : -0.006);
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
    archiveZone.classList.add('open');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        if(reduce){ buildSandSpine(); return; }
        flyToArchive(leftEls);
        flyToArchive(rightEls);
        setTimeout(buildSandSpine, 500);
      });
    });
  }

  if(reduce){
    openArchive();
  } else {
    var ringLeftEl = document.getElementById('ringLeft');
    var ringRightEl = document.getElementById('ringRight');
    if(ringLeftEl) ringLeftEl.addEventListener('click', openArchive);
    if(ringRightEl) ringRightEl.addEventListener('click', openArchive);
    var wasVisible = false;
    new IntersectionObserver(function(entries){
      var isIntersecting = entries[0].isIntersecting;
      if(isIntersecting) wasVisible = true;
      if(wasVisible && !isIntersecting && !merged) openArchive();
    }, { threshold:0, rootMargin:'0px 0px -40% 0px' }).observe(highlights);
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

    var N = 160;
    var parts = [];
    for(var i=0;i<N;i++) parts.push({ t:i/N, size:0.6+Math.random()*1.0, alpha:0.22+Math.random()*0.5 });
    var scrollV = 0, lastSY = window.scrollY, baseT = 0;
    window.addEventListener('scroll', function(){
      var dy = window.scrollY - lastSY;
      scrollV += dy*0.00012;
      lastSY = window.scrollY;
    }, { passive:true });

    (function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      scrollV *= 0.85;
      baseT += scrollV + 0.00016;
      var zRect = zone.getBoundingClientRect();
      parts.forEach(function(p){
        var t = ((p.t+baseT)%1+1)%1;
        var pos = posAt(t);
        var screenY = zRect.top + pos.y;
        var vhFrac = screenY/window.innerHeight;
        var fade = Math.min(1,Math.max(0,(1-vhFrac)/0.25)) * Math.min(1,Math.max(0,vhFrac/0.25));
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
    { name:'ANSYS Fluent', lat:42, lon:15 },
    { name:'OpenFOAM', lat:-18, lon:35 },
    { name:'OpenMDAO', lat:-12, lon:-55 },
    { name:'MATLAB', lat:30, lon:50 },
    { name:'Python', lat:8, lon:120 },
    { name:'PyTorch', lat:-26, lon:-120 },
    { name:'Systems / MBSE', lat:52, lon:95 },
    { name:'C++', lat:-45, lon:170 }
  ];

  function toXYZ(lat, lon, r){
    var phi = (90-lat)*Math.PI/180, th = (lon+180)*Math.PI/180;
    return { x:-r*Math.sin(phi)*Math.cos(th), y:r*Math.cos(phi), z:r*Math.sin(phi)*Math.sin(th) };
  }
  var R = 130;
  var pts = SKILLS.map(function(s){ var p = toXYZ(s.lat,s.lon,R); p.name = s.name; return p; });

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

  function drawWireRing(ring, focal, cx, cy){
    var proj = ring.map(function(p){ return project(p, focal, cx, cy); });
    for(var i = 0; i < proj.length - 1; i++){
      var a = proj[i], b = proj[i+1];
      var depth = Math.max(0, Math.min(1, ((a.z+b.z)/2 + R) / (2*R)));
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.strokeStyle = 'rgba(75,80,87,' + (depth * 0.5).toFixed(2) + ')';
      ctx.lineWidth = dpr;
      ctx.stroke();
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
    var focal = 460*dpr;

    var g = ctx.createRadialGradient(cx,cy,0,cx,cy,R*dpr*1.2);
    g.addColorStop(0,'rgba(20,23,26,0.07)');
    g.addColorStop(1,'rgba(20,23,26,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx,cy,R*dpr*1.2,0,Math.PI*2); ctx.fill();

    latRings.forEach(function(ring){ drawWireRing(ring, focal, cx, cy); });
    lonRings.forEach(function(ring){ drawWireRing(ring, focal, cx, cy); });

    lastProjected = pts.map(function(p){
      var pp = project(p, focal, cx, cy);
      pp.name = p.name;
      return pp;
    });
    var order = lastProjected.map(function(_,i){ return i; }).sort(function(a,b){ return lastProjected[a].z-lastProjected[b].z; });
    order.forEach(function(i){
      var pp = lastProjected[i];
      var depth = Math.max(0.15, Math.min(1,(pp.z+R)/(2*R)));
      var isHover = i===hoverIdx;
      var rad = (isHover?7:5.5)*dpr*pp.scale;
      if(isHover){
        ctx.beginPath(); ctx.arc(pp.sx,pp.sy,rad+3*dpr,0,Math.PI*2);
        ctx.strokeStyle = 'rgba(193,58,29,' + (depth*0.6).toFixed(2) + ')';
        ctx.lineWidth = 1.5*dpr; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(pp.sx,pp.sy,rad,0,Math.PI*2);
      ctx.fillStyle = isHover ? 'rgba(193,58,29,' + depth.toFixed(2) + ')' : 'rgba(75,80,87,' + (depth*0.9).toFixed(2) + ')';
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  if(reduce){
    ctx.clearRect(0,0,W,H);
    var cx0=W/2, cy0=H/2;
    var focal0 = 460*dpr;
    latRings.forEach(function(ring){ drawWireRing(ring, focal0, cx0, cy0); });
    lonRings.forEach(function(ring){ drawWireRing(ring, focal0, cx0, cy0); });
    pts.forEach(function(p){
      var r = rotate(p, 0.6, -0.2);
      var scale = 460*dpr/(460*dpr+r.z);
      ctx.beginPath(); ctx.arc(cx0+r.x*scale, cy0-r.y*scale, 4*dpr, 0, Math.PI*2);
      ctx.fillStyle='rgba(75,80,87,0.7)'; ctx.fill();
    });
  } else {
    requestAnimationFrame(frame);
  }
}
