# 💥 Shonen.js: The Detonator

[![Status: Viral Alpha](https://img.shields.io/badge/Status-Viral_Alpha-ff0055?style=for-the-badge)](https://shonenjs.anthonygracey.com)
[![Engine: GSAP + Vanilla JS](https://img.shields.io/badge/Engine-GSAP_3.12-00e5ff?style=for-the-badge)](https://greensock.com/)

**A JavaScript physics engine designed to turn any DOM into an interactive 2D physics sandbox.**

The Detonator is a client-side injection script that hijacks the DOM, converts static elements into hardware-accelerated physics objects, and blasts them across the viewport using mass-based gravity and collision mechanics.

---

## ⚠️ THE REAL PROJECT: Shonen.js (Alpha)

**The Detonator is just a toy.** I built it as a stress-test for the physics engine powering **[Shonen.js](https://shonenjs.anthonygracey.com)**—a high-performance frontend UI framework that brings anime-inspired combat mechanics to standard web development. 

If you want to use genuine 2D fighting game mechanics—like **Katana Cleaves, Domain Expansions, Hit Stops, and Perfect Parries**—in your own React or Vanilla JS projects, the actual framework is currently in closed Alpha.

👉 **[ENTER THE LAB & JOIN THE WAITLIST HERE](https://shonenjs.anthonygracey.com)**

---

## 🚀 How to Install & Use (Bookmarklet)

You don't need to `npm install` anything. The Detonator runs entirely in your browser via a Bookmarklet.

1. **Show your Bookmarks Bar** in Chrome/Safari/Edge (`Ctrl+Shift+B` or `Cmd+Shift+B`).
2. **Right-click** the bar and select **Add Page** (or "Add Bookmark").
3. Name it `Shonen.js Detonator`.
4. Copy the entire minified JavaScript payload below and paste it into the **URL** field.
5. Save it.

### The Payload (Copy this):
```javascript
javascript:(function(){if(typeof gsap==='undefined'){let s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';s.onload=init;document.head.appendChild(s);}else{init();}function init(){if(window.shnArm)return;window.shnArm=true;let f=document.createElement('div');Object.assign(f.style,{position:'fixed',inset:'0',background:'#fff',opacity:'0',pointerEvents:'none',mixBlendMode:'difference',zIndex:'999999'});document.body.appendChild(f);let c=document.createElement('div');Object.assign(c.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'999998'});document.body.appendChild(c);let wm=document.createElement('div');wm.innerHTML='DESTROYED BY SHONEN.JS';Object.assign(wm.style,{position:'fixed',bottom:'20px',right:'20px',color:'#fff',background:'#ff0055',padding:'5px 10px',fontFamily:'monospace',fontSize:'12px',fontWeight:'900',zIndex:'999999',pointerEvents:'none',letterSpacing:'2px',boxShadow:'0 0 15px #ff0055',textTransform:'uppercase'});document.body.appendChild(wm);setInterval(()=>{if(!wm.parentNode)document.body.appendChild(wm);if(wm.innerHTML!=='DESTROYED BY SHONEN.JS')wm.innerHTML='DESTROYED BY SHONEN.JS';wm.style.display='block';wm.style.opacity='1';wm.style.visibility='visible';},500);window.addEventListener('click',function(e){e.preventDefault();let px=e.clientX,py=e.clientY;let t=document.querySelectorAll('p,h1,h2,h3,img,button,li,a,span');let v=[];t.forEach(el=>{if(el.dataset.snuk)return;let r=el.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0&&r.left<window.innerWidth&&r.right>0&&r.width>5&&r.height>5){v.push({el:el,r:r});}});v=v.slice(0,150);let g=[];v.forEach(obj=>{let el=obj.el,r=obj.r;el.dataset.snuk="1";let cl=el.cloneNode(true);Object.assign(cl.style,{position:'absolute',top:r.top+'px',left:r.left+'px',width:r.width+'px',height:r.height+'px',margin:'0',transformOrigin:'center center',transition:'none',boxSizing:'border-box',pointerEvents:'none',willChange:'transform'});c.appendChild(cl);el.style.visibility='hidden';g.push({c:cl,r:r,e:el});});if(g.length===0)return;let ring=document.createElement('div');Object.assign(ring.style,{position:'fixed',left:px+'px',top:py+'px',width:'0px',height:'0px',borderRadius:'50%',border:'4px solid #00e5ff',boxShadow:'0 0 30px #00e5ff, inset 0 0 30px #00e5ff',transform:'translate(-50%, -50%)',pointerEvents:'none',zIndex:'999997'});document.body.appendChild(ring);gsap.to(ring,{width:3000,height:3000,opacity:0,duration:1.2,ease:"power2.out",onComplete:()=>ring.remove()});let tl=gsap.timeline();tl.to(f,{opacity:0.8,duration:0.05}).to(f,{opacity:0,duration:0.3});g.forEach(obj=>{let r=obj.r,gh=obj.c,el=obj.e;let gx=r.left+r.width/2,gy=r.top+r.height/2;let dx=gx-px,dy=gy-py;let dist=Math.hypot(dx,dy);let a=Math.atan2(dy,dx);let mass=Math.min(1,(r.width*r.height)/80000);let mob=1-(mass*0.8);let prox=Math.max(1,400/(dist+50));let fc=((Math.random()*500)+500)*mob*prox;let drop=window.innerHeight-r.top-r.height;let dly=dist*0.0006;let spin=(Math.random()-0.5)*(200*mob*prox);tl.fromTo(gh,{scale:1,filter:'brightness(1)'},{scale:1.1,filter:'brightness(2)',duration:0.05,ease:"power1.out",force3D:true},dly);tl.to(gh,{filter:'brightness(1)',duration:0.2},dly+0.05);tl.to(gh,{x:Math.cos(a)*fc,rotation:spin,duration:1.2,ease:"power3.out",force3D:true},dly+0.02);let arcY=Math.sin(a)*fc-(150*prox);tl.to(gh,{y:arcY,duration:0.3,ease:"power2.out",force3D:true},dly+0.02);if(drop>arcY){tl.to(gh,{y:drop,duration:0.9,ease:"bounce.out",force3D:true},dly+0.32);}});gsap.fromTo(document.body,{x:-10,y:10},{x:0,y:0,duration:0.5,ease:"elastic.out(2, 0.1)",clearProps:"transform"});});console.log("Shonen.js: Final Form.");}})();
```

### 🎯 Firing the Weapon

1. Navigate to your own projects or almost any standard website (like Wikipedia or Hacker News).
2. Click the `Shonen.js Detonator` in your bookmarks bar to arm the script.
3. **Click anywhere on the webpage.** 4. Scroll down, and click again. Keep firing until the DOM is nothing but rubble.

---

## ⚙️ How the Engineering Works

If you're a frontend dev wondering how the UI shatters so cleanly:

* **Hardware Acceleration:** The engine injects `willChange: transform` and forces GSAP's `force3D` rendering to offload the layout thrashing to your GPU, maintaining 60fps.
* **Mass-Based Physics:** It calculates the area `(width * height)` of every DOM node it captures. Massive images drop heavily with low rotation; tiny `<span>` tags act like shrapnel and fly into the corners.
* **The FLIP Technique:** The script utilizes `getBoundingClientRect()` to perfectly clone visible elements, sets the originals to `visibility: hidden`, and places `position: fixed` ghosts precisely over them before detonating.
* **Parabolic Arcs:** Uses `Math.atan2` trigonometry alongside a localized proximity multiplier to launch elements upward and outward before dropping them to a `bounce.out` floor collision.

*(Note: This is entirely client-side. Refresh the page, and the website will heal itself.)*
