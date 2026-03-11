/**
 * Shonen.js: The Detonator (V8 - Final Form)
 * ------------------------------------------
 * Un-minified source code for educational purposes.
 * To actually use this as a bookmarklet, use the minified string in the README.
 */

(function () {
  // 1. Inject GSAP if it doesn't exist on the page
  if (typeof gsap === 'undefined') {
    let s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    s.onload = init;
    document.head.appendChild(s);
  } else {
    init();
  }

  function init() {
    // Prevent multiple initializations (Continuous Fire limit)
    if (window.shnArm) return;
    window.shnArm = true;

    // 2. Setup the Screen Flash (Difference Blend Mode)
    let f = document.createElement('div');
    Object.assign(f.style, {
      position: 'fixed', inset: '0', background: '#fff',
      opacity: '0', pointerEvents: 'none', mixBlendMode: 'difference', zIndex: '999999'
    });
    document.body.appendChild(f);

    // 3. Setup the Debris Container
    let c = document.createElement('div');
    Object.assign(c.style, {
      position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '999998'
    });
    document.body.appendChild(c);

    // 4. Inject the Self-Healing Watermark (Anti-Tamper Boss Node)
    let wm = document.createElement('div');
    wm.innerHTML = 'DESTROYED BY SHONEN.JS';
    Object.assign(wm.style, {
      position: 'fixed', bottom: '20px', right: '20px', color: '#fff',
      background: '#ff0055', padding: '5px 10px', fontFamily: 'monospace',
      fontSize: '12px', fontWeight: '900', zIndex: '999999', pointerEvents: 'none',
      letterSpacing: '2px', boxShadow: '0 0 15px #ff0055', textTransform: 'uppercase'
    });
    document.body.appendChild(wm);

    // Heartbeat loop to prevent users from deleting or hiding the watermark in DevTools
    setInterval(() => {
      if (!wm.parentNode) document.body.appendChild(wm);
      if (wm.innerHTML !== 'DESTROYED BY SHONEN.JS') wm.innerHTML = 'DESTROYED BY SHONEN.JS';
      wm.style.display = 'block'; wm.style.opacity = '1'; wm.style.visibility = 'visible';
    }, 500);

    // 5. The Detonator Event Listener
    window.addEventListener('click', function (e) {
      e.preventDefault();
      let px = e.clientX, py = e.clientY;

      // Target standard HTML elements
      let t = document.querySelectorAll('p,h1,h2,h3,img,button,li,a,span');
      let v = [];

      // Filter visible elements, skip ones that have already been destroyed
      t.forEach(el => {
        if (el.dataset.snuk) return;
        let r = el.getBoundingClientRect();
        // Check if element is actually inside the viewport
        if (r.top < window.innerHeight && r.bottom > 0 && r.left < window.innerWidth && r.right > 0 && r.width > 5 && r.height > 5) {
          v.push({ el: el, r: r });
        }
      });

      // Hardware Limit: Cap at 150 elements per blast to maintain 60fps
      v = v.slice(0, 150);
      let g = [];

      // The FLIP Technique: Clone visible, hide original instantly
      v.forEach(obj => {
        let el = obj.el, r = obj.r;
        el.dataset.snuk = "1"; // Tag as destroyed
        let cl = el.cloneNode(true);
        Object.assign(cl.style, {
          position: 'absolute', top: r.top + 'px', left: r.left + 'px',
          width: r.width + 'px', height: r.height + 'px', margin: '0',
          transformOrigin: 'center center', transition: 'none',
          boxSizing: 'border-box', pointerEvents: 'none', willChange: 'transform'
        });
        c.appendChild(cl);
        el.style.visibility = 'hidden'; 
        g.push({ c: cl, r: r, e: el });
      });

      if (g.length === 0) return;

      // 6. Visual Effects: The Cyan Shockwave Ring
      let ring = document.createElement('div');
      Object.assign(ring.style, {
        position: 'fixed', left: px + 'px', top: py + 'px',
        width: '0px', height: '0px', borderRadius: '50%',
        border: '4px solid #00e5ff', boxShadow: '0 0 30px #00e5ff, inset 0 0 30px #00e5ff',
        transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: '999997'
      });
      document.body.appendChild(ring);
      
      // Expand ring and auto-remove
      gsap.to(ring, { width: 3000, height: 3000, opacity: 0, duration: 1.2, ease: "power2.out", onComplete: () => ring.remove() });

      // Screen flash timeline
      let tl = gsap.timeline();
      tl.to(f, { opacity: 0.8, duration: 0.05 }).to(f, { opacity: 0, duration: 0.3 });

      // 7. The Physics Engine
      g.forEach(obj => {
        let r = obj.r, gh = obj.c, el = obj.e;
        let gx = r.left + r.width / 2, gy = r.top + r.height / 2;
        
        // Trigonometry mapping for direction
        let dx = gx - px, dy = gy - py;
        let dist = Math.hypot(dx, dy);
        let a = Math.atan2(dy, dx);
        
        // Mass Equation (width * height) - Heavy objects don't fly as far
        let mass = Math.min(1, (r.width * r.height) / 80000);
        let mob = 1 - (mass * 0.8);
        
        // Proximity Multiplier (closer to cursor = more violent)
        let prox = Math.max(1, 400 / (dist + 50));
        let fc = ((Math.random() * 500) + 500) * mob * prox;
        
        // Distance to the bottom of the screen
        let drop = window.innerHeight - r.top - r.height;
        
        // Shockwave delay based on distance
        let dly = dist * 0.0006;
        let spin = (Math.random() - 0.5) * (200 * mob * prox);

        // Pre-blast swell and white impact flash
        tl.fromTo(gh, { scale: 1, filter: 'brightness(1)' }, { scale: 1.1, filter: 'brightness(2)', duration: 0.05, ease: "power1.out", force3D: true }, dly);
        tl.to(gh, { filter: 'brightness(1)', duration: 0.2 }, dly + 0.05);
        
        // The Launch (X-Axis and Rotation)
        tl.to(gh, { x: Math.cos(a) * fc, rotation: spin, duration: 1.2, ease: "power3.out", force3D: true }, dly + 0.02);
        
        // True Parabolic Arc (Y-Axis upward, then floor drop)
        let arcY = Math.sin(a) * fc - (150 * prox);
        tl.to(gh, { y: arcY, duration: 0.3, ease: "power2.out", force3D: true }, dly + 0.02);
        
        // Floor Collision with Bounce Ease
        if (drop > arcY) {
          tl.to(gh, { y: drop, duration: 0.9, ease: "bounce.out", force3D: true }, dly + 0.32);
        }
      });

      // Browser Window "Camera Shake" Effect
      gsap.fromTo(document.body, { x: -10, y: 10 }, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(2, 0.1)", clearProps: "transform" });
    });

    console.log("Shonen.js: Locked and Loaded.");
  }
})();
