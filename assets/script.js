/* ============================================================
   Ambient network background — drifting nodes, connecting edges,
   and the occasional traveling pulse to read as "live" infrastructure.
   ============================================================ */
(function () {
  var canvas = document.getElementById('net-bg');
  if (!canvas) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ctx = canvas.getContext('2d');
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var width, height, nodes, pulses;

  var LINK_DIST = 150;
  var MOUSE_RADIUS = 170;
  var NODE_COLOR = '68, 214, 232';   // cyan
  var LINE_COLOR = '47, 111, 237';   // blue

  var mouse = { x: -9999, y: -9999 };

  function nodeCount() {
    var area = width * height;
    return Math.max(28, Math.min(70, Math.round(area / 26000)));
  }

  function resize() {
    width = canvas.width = Math.round(window.innerWidth * DPR);
    height = canvas.height = Math.round(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    seed();
  }

  function seed() {
    var count = nodeCount();
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18 * DPR,
        vy: (Math.random() - 0.5) * 0.18 * DPR,
        r: (Math.random() * 1.2 + 0.9) * DPR
      });
    }
    pulses = [];
  }

  function maybeSpawnPulse() {
    if (Math.random() > 0.985 && nodes.length > 4) {
      var a = nodes[Math.floor(Math.random() * nodes.length)];
      var best = null, bestDist = Infinity;
      for (var i = 0; i < nodes.length; i++) {
        var b = nodes[i];
        if (b === a) continue;
        var dx = b.x - a.x, dy = b.y - a.y;
        var d = dx * dx + dy * dy;
        var maxD = (LINK_DIST * DPR) * (LINK_DIST * DPR);
        if (d < maxD && d < bestDist) { bestDist = d; best = b; }
      }
      if (best) pulses.push({ a: a, b: best, t: 0 });
    }
  }

  function step() {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      var dx = n.x - mouse.x, dy = n.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var mr = MOUSE_RADIUS * DPR;
      if (dist < mr) {
        var f = (1 - dist / mr) * 0.03;
        n.x += dx * f;
        n.y += dy * f;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    var linkDist = LINK_DIST * DPR;

    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDist) {
          var alpha = (1 - d / linkDist) * 0.22;
          ctx.strokeStyle = 'rgba(' + LINE_COLOR + ',' + alpha + ')';
          ctx.lineWidth = 1 * DPR;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + NODE_COLOR + ',0.55)';
      ctx.fill();
    }

    for (var p = pulses.length - 1; p >= 0; p--) {
      var pu = pulses[p];
      pu.t += 0.02;
      if (pu.t >= 1) { pulses.splice(p, 1); continue; }
      var px = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
      var py = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
      var glowAlpha = Math.sin(pu.t * Math.PI);
      ctx.beginPath();
      ctx.arc(px, py, 2.4 * DPR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + NODE_COLOR + ',' + (0.8 * glowAlpha) + ')';
      ctx.shadowBlur = 8 * DPR;
      ctx.shadowColor = 'rgba(' + NODE_COLOR + ',0.9)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function loop() {
    step();
    maybeSpawnPulse();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX * DPR;
    mouse.y = e.clientY * DPR;
  }, { passive: true });
  window.addEventListener('mouseleave', function () {
    mouse.x = -9999; mouse.y = -9999;
  });

  resize();

  if (reduceMotion) {
    // Draw a single static frame instead of animating.
    draw();
  } else {
    loop();
  }
})();
