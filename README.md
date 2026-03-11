# Shonen.js: DOMinator (Alpha)

💥 Turn any webpage into a 2D destruction playground.

The **DOMinator** is a bookmarklet that hijacks the DOM, turns visible elements into physics objects, and blasts them across the viewport using mass-based gravity and collisions.

Built with **GSAP + vanilla JS** as a stress test for the engine behind **Shonen.js**.

---

## Shonen.js (the real project)

The DOMinator is just a toy.

Underneath it is **Shonen.js** — a high-performance frontend framework for anime-inspired interactions:

- Katana Slices  
- Perfect Parries  
- Hit Stop / Freeze Frames  
- Domain Expansions  
- Impact Rings, Auras, and more

Shonen.js is currently in **closed Alpha**.

👉 **Want early access?**  
Join the waitlist: [shonenjs.anthonygracey.com](https://shonenjs.anthonygracey.com)

---

## Install the DOMinator (Bookmarklet)

You don’t need `npm install` or a build step. It runs entirely in your browser.

1. Show your bookmarks bar (`Cmd+Shift+B` or `Ctrl+Shift+B`).  
2. Right-click the bar → **Add Page / Add Bookmark**.  
3. Name it: **Shonen.js DOMinator**.  
4. Paste the entire payload below into the **URL** field.  
5. Save.

```js
javascript:(function(){if(typeof gsap==='undefined'){let s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';s.onload=init;document.head.appendChild(s);}else{init();}function init(){if(window.shnArm)return;window.shnArm=true;let f=document.createElement('div');Object.assign(f.style,{position:'fixed',inset:'0',background:'#fff',opacity:'0',pointerEvents:'none',mixBlendMode:'difference',zIndex:'999999'});document.body.appendChild(f);let c=document.createElement('div');Object.assign(c.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'999998'});document.body.appendChild(c);let wm=document.createElement('div');wm.innerHTML='DOMINATED BY SHONEN.JS';Object.assign(wm.style,{position:'fixed',bottom:'20px',right:'20px',color:'#fff',background:'#ff0055',padding:'5px 10px',fontFamily:'monospace',fontSize:'12px',fontWeight:'900',zIndex:'999999',pointerEvents:'none',letterSpacing:'2px',boxShadow:'0 0 15px #ff0055',textTransform:'uppercase'});document.body.appendChild(wm);setInterval(()=>{if(!wm.parentNode)document.body.appendChild(wm);if(wm.innerHTML!=='DOMINATED BY SHONEN.JS')wm.innerHTML='DOMINATED BY SHONEN.JS';wm.style.display='block';wm.style.opacity='1';wm.style.visibility='visible';},500);window.addEventListener('click',function(e){e.preventDefault();let px=e.clientX,py=e.clientY;let t=document.querySelectorAll('p,h1,h2,h3,img,button,li,a,span');let v=[];t.forEach(el=>{if(el.dataset.snuk)return;let r=el.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0&&r.left<window.innerWidth&&r.right>0&&r.width>5&&r.height>5){v.push({el:el,r:r});}});v=v.slice(0,150);let g=[];v.forEach(obj=>{let el=obj.el,r=obj.r;el.dataset.snuk='1';let cl=el.cloneNode(true);Object.assign(cl.style,{position:'absolute',top:r.top+'px',left:r.left+'px',width:r.width+'px',height:r.height+'px',margin:'0',transformOrigin:'center center',transition:'none',boxSizing:'border-box',pointerEvents:'none',willChange:'transform'});c.appendChild(cl);el.style.visibility='hidden';g.push({c:cl,r:r,e:el});});if(g.length===0)return;let ring=document.createElement('div');Object.assign(ring.style,{position:'fixed',left:px+'px',top:py+'px',width:'0px',height:'0px',borderRadius:'50%',border:'4px solid #00e5ff',boxShadow:'0 0 30px #00e5ff, inset 0 0 30px #00e5ff',transform:'translate(-50%, -50%)',pointerEvents:'none',zIndex:'999997'});document.body.appendChild(ring);gsap.to(ring,{width:3000,height:3000,opacity:0,duration:1.2,ease:'power2.out',onComplete:()=>ring.remove()});let tl=gsap.timeline();tl.to(f,{opacity:0.8,duration:0.05}).to(f,{opacity:0,duration:0.3});g.forEach(obj=>{let r=obj.r,gh=obj.c,el=obj.e;let gx=r.left+r.width/2,gy=r.top+r.height/2;let dx=gx-px,dy=gy-py;let dist=Math.hypot(dx,dy);let a=Math.atan2(dy,dx);let mass=Math.min(1,(r.width*r.height)/80000);let mob=1-(mass*0.8);let prox=Math.max(1,400/(dist+50));let fc=((Math.random()*500)+500)*mob*prox;let drop=window.innerHeight-r.top-r.height;let dly=dist*0.0006;let spin=(Math.random()-0.5)*(200*mob*prox);tl.fromTo(gh,{scale:1,filter:'brightness(1)'},{scale:1.1,filter:'brightness(2)',duration:0.05,ease:'power1.out',force3D:true},dly);tl.to(gh,{filter:'brightness(1)',duration:0.2},dly+0.05);tl.to(gh,{x:Math.cos(a)*fc,rotation:spin,duration:1.2,ease:'power3.out',force3D:true},dly+0.02);let arcY=Math.sin(a)*fc-(150*prox);tl.to(gh,{y:arcY,duration:0.3,ease:'power2.out',force3D:true},dly+0.02);if(drop>arcY){tl.to(gh,{y:drop,duration:0.9,ease:'bounce.out',force3D:true},dly+0.32);}});gsap.fromTo(document.body,{x:-10,y:10},{x:0,y:0,duration:0.5,ease:'elastic.out(2, 0.1)',clearProps:'transform'});});console.log('SHONEN.JS // DOMinator ARMED.');}})();
```

---

## How to Fire It
1.  Open any site – your own project, docs, Wikipedia, Hacker News, whatever.
2.  Click the Shonen.js DOMinator bookmark to arm it.
3.  Click anywhere on the page to blast the DOM.
4.  Scroll, click again, keep firing until the layout is rubble.
5.  Refresh the page to restore reality.

All effects are client-side only. No tracking, no network calls.

---

## How it Works (For Frontend Nerds)

Under the hood, the DOMinator does a few fun things:
- **Hardware acceleration**: Forces GPU-accelerated transforms (`will-change: transform` + GSAP `force3D`) to keep the chaos smooth.
- **Mass-based physics**: Approximates mass from element area (width * height). Bigger nodes fall heavier; small tags turn into shrapnel.
- **FLIP ghosting**: Uses `getBoundingClientRect()` to clone visible nodes, hides the originals, and overlays fixed-position ghosts before detonation.
- **Parabolic launch**: Uses `Math.atan2` and a proximity multiplier to fling elements upward and outward, then drops them into a bounce.out floor collision.

This repo is the playground.
The framework behind it—**Shonen.js**—is where the real combat system lives.
