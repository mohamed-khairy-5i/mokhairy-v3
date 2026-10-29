/* MoKhairy — Style D: immersive layer (preloader · cursor · magnetic · tilt · WebGL) */
(function () {
  'use strict';
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var fine = false;
  try { fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches; } catch (e) {}

  /* ============================================================
     Hero letter split — Latin chars animate one by one.
     Arabic is cursive: NEVER split, just show. (variants.js
     rewrites innerHTML on lang switch, so we always re-capture.)
     ============================================================ */
  function splitNode(node, inEm) {
    var out = [];
    if (node.nodeType === 3) {
      var parts = node.textContent.split(/(\s+)/);
      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { out.push('<span class="wsp"> </span>'); return; }
        /* wrap each WORD so line-breaking stays word-based, chars animate inside */
        out.push('<span class="wd">');
        for (var i = 0; i < part.length; i++) {
          out.push('<span class="ch' + (inEm ? ' ch-em' : '') + '">' + part[i] + '</span>');
        }
        out.push('</span>');
      });
    } else if (node.nodeType === 1) {
      var tag = node.tagName.toLowerCase();
      var inner = '';
      Array.prototype.forEach.call(node.childNodes, function (c) { inner += splitNode(c, inEm || tag === 'em'); });
      out.push('<' + tag + '>' + inner + '</' + tag + '>');
    }
    return out.join('');
  }

  function isArabic() { return document.documentElement.getAttribute('dir') === 'rtl'; }

  var splitGen = 0;
  function doSplit(animate) {
    splitGen++;
    var gen = splitGen;
    document.querySelectorAll('[data-split]').forEach(function (el) {
      if (isArabic() || reduced || !animate) { el.style.opacity = '1'; return; }
      el.dataset.origHtml = el.innerHTML;           // always fresh (lang may have changed)
      var tmp = document.createElement('div');
      tmp.innerHTML = el.dataset.origHtml;
      var html = '';
      Array.prototype.forEach.call(tmp.childNodes, function (n) { html += splitNode(n, false); });
      el.innerHTML = html;
      el.style.opacity = '1';
      var chars = el.querySelectorAll('.ch');
      chars.forEach(function (ch, i) {
        setTimeout(function () { ch.classList.add('on'); }, 20 * i + 80);
      });
      /* after the entrance completes, restore clean markup so the
         gradient <em> renders normally (background-clip:text cannot
         paint through nested inline-blocks reliably) */
      setTimeout(function () {
        if (gen === splitGen && el.isConnected) el.innerHTML = el.dataset.origHtml;
      }, chars.length * 20 + 950);
    });
  }

  /* At load: if EN + animated preloader, hide raw titles so letters
     take over cleanly after the preloader slides away. */
  var pre = document.getElementById('preloader');
  var willAnimateLetters = !reduced && !isArabic() && !!pre;
  if (willAnimateLetters) {
    document.querySelectorAll('[data-split]').forEach(function (el) { el.style.opacity = '0'; });
  } else {
    doSplit(false);
  }

  function finishPre() {
    if (!pre) return;
    pre.classList.add('done');
    setTimeout(function () { pre.style.display = 'none'; }, 900);
    doSplit(true);
  }
  if (pre) {
    if (reduced) { finishPre(); }
    else {
      var p = 0;
      var t = setInterval(function () {
        p += Math.random() * 22 + 10;
        if (p >= 100) { p = 100; clearInterval(t); setTimeout(finishPre, 200); }
        var c = document.getElementById('preCount');
        if (c) c.textContent = Math.floor(p) + '%';
      }, 85);
      setTimeout(function () { if (pre && !pre.classList.contains('done')) finishPre(); }, 2800);
    }
  }

  /* Re-split after language toggle (variants.js rewrites innerHTML first). */
  var langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      setTimeout(function () { doSplit(!isArabic() && !reduced); }, 60);
    });
  }

  /* ============================================================
     Custom cursor (fine pointers only)
     ============================================================ */
  if (fine && !reduced) {
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    if (dot && ring) {
      var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
      document.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      }, { passive: true });
      (function loop() {
        rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
      document.querySelectorAll('a,button').forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('hot'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('hot'); });
      });
    }
  }

  /* ============================================================
     Magnetic buttons
     ============================================================ */
  if (fine && !reduced) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.18 + 'px,' + y * 0.22 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ============================================================
     3D tilt cards
     ============================================================ */
  if (fine && !reduced) {
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateX(' + (-py * 4) + 'deg) rotateY(' + (px * 5) + 'deg)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ============================================================
     WebGL scene — particles + wireframe torus knot.
     Silently skips if THREE failed to load or WebGL is blocked;
     the CSS gradient background remains as fallback.
     ============================================================ */
  function initScene() {
    if (window.__noThree || !window.THREE) return;
    var canvas = document.getElementById('webgl');
    if (!canvas) return;
    try {
      var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
      renderer.setSize(innerWidth, innerHeight);

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
      camera.position.z = 7;

      /* particles */
      var N = 1400;
      var pos = new Float32Array(N * 3);
      var col = new Float32Array(N * 3);
      var c1 = new THREE.Color(0x22d3ee), c2 = new THREE.Color(0xa78bfa);
      for (var i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
        var mixc = c1.clone().lerp(c2, Math.random());
        col[i * 3] = mixc.r; col[i * 3 + 1] = mixc.g; col[i * 3 + 2] = mixc.b;
      }
      var pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      var pMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
      scene.add(new THREE.Points(pGeo, pMat));

      /* torus knot: wireframe + glowing vertex dots */
      var knotGeo = new THREE.TorusKnotGeometry(1.55, 0.45, 220, 28);
      var group = new THREE.Group();
      group.add(new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.16 })));
      group.add(new THREE.Points(knotGeo, new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.02, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })));
      scene.add(group);
      if (innerWidth < 980) { group.position.set(0, 2.1, 0); group.scale.setScalar(0.72); }
      else { group.position.set(2.4, 0.2, 0); }

      /* mouse parallax */
      var tmx = 0, tmy = 0, cmx = 0, cmy = 0;
      document.addEventListener('mousemove', function (e) {
        tmx = (e.clientX / innerWidth - 0.5) * 2;
        tmy = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive: true });

      var clock = new THREE.Clock();
      var maxScroll = 1;
      function measure() { maxScroll = Math.max(document.body.scrollHeight - innerHeight, 1); }
      measure();

      (function animate() {
        requestAnimationFrame(animate);
        var t = clock.getElapsedTime();
        group.rotation.z = (window.scrollY / maxScroll) * Math.PI * 0.9;
        cmx += (tmx - cmx) * 0.045;
        cmy += (tmy - cmy) * 0.045;
        group.rotation.x = t * 0.18 + cmy * 0.25;
        group.rotation.y = t * 0.24 + cmx * 0.35;
        camera.position.x = cmx * 0.55;
        camera.position.y = -cmy * 0.4;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      })();

      addEventListener('resize', function () {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        measure();
        if (innerWidth < 980) { group.position.set(0, 2.1, 0); group.scale.setScalar(0.72); }
        else { group.position.set(2.4, 0.2, 0); group.scale.setScalar(1); }
      });
    } catch (err) { /* WebGL unavailable — static fallback stays */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initScene);
  else initScene();
})();
