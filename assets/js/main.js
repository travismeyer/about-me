{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* content from travismeyer.co */
const ICON={call:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',text:'<path d="M4 5h16v11H8l-4 4z"/>',teams:'<rect x="3" y="6" width="12" height="12" rx="2"/><path d="M6 10h6M9 10v5M17 9h3v6a2 2 0 0 1-2 2h-1"/>',tg:'<path d="M21 4L3 11l6 2 2 6 3-4 5 4z"/>',li:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'};
const COMMS=[
 {k:'Call',v:'(818) 646-2853',h:'tel:+18186462853',i:'call',copy:'(818) 646-2853'},
 {k:'Email',v:'travis@abinnovations.com',h:'mailto:travis@abinnovations.com',i:'mail',copy:'travis@abinnovations.com'},
 {k:'Text',v:'Send a message',h:'sms:+18186462853',i:'text'},
 {k:'Teams',v:'Chat now',h:'https://teams.microsoft.com/l/chat/0/0?users=travis@abinnovations.com',i:'teams'},
 {k:'Telegram',v:'@trvmyr',h:'https://t.me/trvmyr',i:'tg'},
 {k:'LinkedIn',v:'/in/travismeyer',h:'https://www.linkedin.com/in/travismeyer/',i:'li'}];
const CREDS=[['1Password','https://www.1password.com/'],['Allworx','https://www.allworx.com/'],['Axcient','https://www.axcient.com/'],['Barracuda','https://www.barracuda.com/'],['ConnectWise','https://www.connectwise.com/'],['DNSFilter','https://www.dnsfilter.com/'],['Huntress','https://www.huntress.com/'],['Timus Networks','https://www.timusnetworks.com/'],['WatchGuard AuthPoint','https://www.watchguard.com/wgrd-products/authpoint'],['WatchGuard Endpoint Security',''],['WatchGuard Firebox','https://www.watchguard.com/wgrd-products/network-security']];
$('#comms').innerHTML=COMMS.map(c=>`<li><a class="chn" href="${esc(c.h)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[c.i]}</svg><div><b>${esc(c.k)}</b><span>${esc(c.v)}</span></div><em aria-hidden="true"></em></a>${c.copy?`<button class="cp" type="button" data-copy="${esc(c.copy)}" aria-label="Copy ${esc(c.k.toLowerCase())}">Copy</button>`:''}</li>`).join('');
$('#comms').addEventListener('click',e=>{const b=e.target.closest('.cp');if(!b)return;try{navigator.clipboard.writeText(b.dataset.copy).then(()=>{b.textContent='Done';setTimeout(()=>b.textContent='Copy',1400)},()=>{b.textContent='—'})}catch(x){b.textContent='—'}});
const HEX=(c)=>`<svg viewBox="0 0 16 18" aria-hidden="true"><path d="M8 1l6.5 3.75v8.5L8 17l-6.5-3.75v-8.5z" fill="${c}22" stroke="${c}" stroke-width="1.4"/><circle cx="8" cy="9" r="2" fill="${c}"/></svg>`;
$('#creds').innerHTML=CREDS.map(([n,h],i)=>{const ic=HEX(['#3fd8ff','#ffb547','#ff3d9a'][i%3]);return `<li>${h?`<a href="${esc(h)}" target="_blank" rel="noopener">${ic}${esc(n)}</a>`:`<span class="c">${ic}${esc(n)}</span>`}</li>`}).join('');

/* availability: online Mon-Fri 8am-5pm Pacific */
const avFmt=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',weekday:'short',hour:'numeric',hour12:false});
function avail(){const p=Object.fromEntries(avFmt.formatToParts(new Date()).map(x=>[x.type,x.value])),h=+p.hour%24,on=!['Sat','Sun'].includes(p.weekday)&&h>=8&&h<17,el=$('#avail');el.textContent=on?'Online':'Offline';el.classList.toggle('off',!on)}
avail();setInterval(avail,30000);
/* panel focus */
function focusP(id,scroll){const p=document.getElementById(id);if(!p)return;if(scroll&&innerWidth<=1180)p.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});p.classList.remove('focus');void p.offsetWidth;p.classList.add('focus')}

/* dock */
const DOCK=[['p-id','Identity','<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'],['p-mission','Mission','<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'],['p-about','About','<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'],['p-comms','Comms','<path d="M4 5h16v11H8l-4 4z"/>'],['p-creds','Credentials','<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>']];
$('#dock').innerHTML=DOCK.map(([id,l,ic],i)=>`<button class="db" type="button" data-id="${id}" style="--dl:${(i*.7).toFixed(1)}s" aria-label="Open ${l}"><span><svg viewBox="0 0 24 24" aria-hidden="true">${ic}</svg></span><small>${l}</small></button>`).join('');
$('#dock').addEventListener('click',e=>{const b=e.target.closest('.db');if(b)openFocus(document.getElementById(b.dataset.id))});

/* core: animated plexus network */
const st=$('#stage'),cv=$('#core'),g=cv.getContext('2d');let W=0,H=0,X=0,Y=0,R=0,SX=0,FOV=800,PR=60,STATR=[];
const DOM=['Infrastructure','Cybersecurity','Cloud Solutions','Disaster Recovery','Help Desk Support','AI Solutions'];
$('#nodes').innerHTML=DOM.map((d,i)=>`<button class="node" type="button" data-i="${i}">${d}</button>`).join('');
const nodes=[...document.querySelectorAll('.node')];let paused=false,hot=-1,hotT=0;
$('#nodes').addEventListener('pointerover',()=>paused=true);$('#nodes').addEventListener('pointerout',()=>paused=false);
$('#nodes').addEventListener('click',e=>{const b=e.target.closest('.node');if(!b)return;hot=+b.dataset.i;hotT=performance.now();openFocus(document.getElementById('p-mission'))});
document.querySelectorAll('.fstat').forEach(b=>b.addEventListener('click',()=>openFocus(document.getElementById(b.dataset.p))));
function csize(){const d=Math.min(devicePixelRatio||1,2),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);X=W/2;Y=H*.5;R=Math.min(W,H)*.28;SX=W*.44;YS=SMALL?1.55:Math.max(1,Math.min(2.6,(H*.62)/(SX*.72)));FOV=Math.max(W,H)*1.2;PR=Math.min(W,H)*(SMALL?.14:.15);const sr0=st.getBoundingClientRect();STATR=[...document.querySelectorAll('.fstat')].map(b=>{const r=b.getBoundingClientRect();return [r.left-sr0.left,r.top-sr0.top,r.width,r.height]})}
const cro=new ResizeObserver(csize);cro.observe(cv);
const SMALL=innerWidth<=700,NN=SMALL?140:330;let YS=1;
const NC=['90,200,255','255,61,154','255,181,71','155,123,255','61,255,178','120,170,255'];
const P3=Array.from({length:NN},()=>{const x=(Math.random()*2-1),y=(Math.random()*2-1)*(SMALL?.6:.36)*(1-Math.abs(x)*.4),z=(Math.random()*2-1)*.42;const q=Math.random();return {ox:x,oy:y,oz:z,ph:Math.random()*6.28,sp:.25+Math.random()*.6,hub:Math.random()<.06,c:q<.05?NC[1]:q<.1?NC[2]:NC[0]}});
const HUB=[[-.62,-.14,.15],[.55,.12,-.12],[.04,.22,.3],[-.28,.18,-.25],[.3,-.18,.22],[.8,-.06,.05]].map((p,i)=>{const n=P3[i];n.ox=p[0];n.oy=p[1]*(SMALL?1.6:1);n.oz=p[2];n.hub=true;n.c=NC[i];n.dom=i;return n});
const DUST=Array.from({length:SMALL?60:140},()=>({x:Math.random(),y:Math.random(),s:Math.random()*.6+.2,v:Math.random()*.01+.002}));
const glow=document.createElement('canvas');glow.width=glow.height=64;{const c=glow.getContext('2d'),gr=c.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.15,'rgba(150,230,255,.9)');gr.addColorStop(.45,'rgba(63,160,255,.25)');gr.addColorStop(1,'rgba(63,160,255,0)');c.fillStyle=gr;c.fillRect(0,0,64,64)}
let rot=0,mx2=0,my2=0;addEventListener('pointermove',e=>{mx2=e.clientX/innerWidth*2-1;my2=e.clientY/innerHeight*2-1},{passive:true});
const PUL=Array.from({length:SMALL?8:16},()=>({i:0,j:0,p:1,s:.4+Math.random()*.6}));
const prj=[];
function drawCore(t,e,dt){
 g.clearRect(0,0,W,H);
 if(!paused&&!reduce)rot+=dt*.09;
 const ry=rot+mx2*.25,rx=.18+my2*.12,cy=Math.cos(ry),sy=Math.sin(ry),cx=Math.cos(rx),sx=Math.sin(rx);
 g.save();g.translate(X,Y);g.scale(1,.42);const hz=g.createRadialGradient(0,0,0,0,0,SX*1.1);hz.addColorStop(0,`rgba(40,120,255,${.35*e})`);hz.addColorStop(.6,`rgba(20,80,200,${.12*e})`);hz.addColorStop(1,'rgba(20,80,200,0)');g.fillStyle=hz;g.beginPath();g.arc(0,0,SX*1.1,0,6.2832);g.fill();g.restore();
 for(const d of DUST){d.x=(d.x+d.v*dt)%1;g.fillStyle=`rgba(120,200,255,${.35*d.s*e})`;g.fillRect(d.x*W,d.y*H,1.2,1.2)}
 {const ar=st.querySelector('.art'),as=ar?ar.offsetWidth:W*.6,fy=Y+as*.31,fw=as*.46,fh=as*.1,ph=reduce?0:(t*.35)%1;
  g.save();g.beginPath();g.ellipse(X,fy,fw,fh,0,0,6.2832);g.clip();g.lineWidth=1;
  for(let k=-10;k<=10;k++){const al=(.22-Math.abs(k)*.018)*e;if(al<=0)continue;g.strokeStyle=`rgba(90,200,255,${al})`;g.beginPath();g.moveTo(X+k*fw*.05,fy-fh);g.lineTo(X+k*fw*.16,fy+fh);g.stroke()}
  for(let j=0;j<9;j++){const u=(j+ph)/9,y=fy-fh+u*u*2*fh;g.strokeStyle=`rgba(90,200,255,${.26*u*e})`;g.beginPath();g.moveTo(X-fw,y);g.lineTo(X+fw,y);g.stroke()}
  g.restore();g.strokeStyle=`rgba(120,210,255,${.45*e})`;g.beginPath();g.ellipse(X,fy,fw,fh,0,0,6.2832);g.stroke();
  g.strokeStyle=`rgba(255,79,184,${.5*e})`;g.lineWidth=2;g.beginPath();g.ellipse(X,fy,fw*1.06,fh*1.06,0,t*.2,t*.2+.9);g.stroke();g.lineWidth=1}
 for(let i=0;i<P3.length;i++){const n=P3[i],w=reduce?0:t*n.sp+n.ph,x=n.ox+Math.sin(w)*.035,y=(n.oy+Math.cos(w*1.3)*.03)*YS,z=n.oz+Math.sin(w*.7)*.035;
  const x1=x*cy-z*sy,z1=x*sy+z*cy,y1=y*cx-z1*sx,z2=y*sx+z1*cx,k=FOV/(FOV+z2*SX);prj[i]=[X+x1*SX*k,Y+y1*SX*k,z2,k,x,y,z]}
 g.globalCompositeOperation='lighter';
 const E=[],TH=SMALL?.27:.23;g.lineWidth=.9;
 for(let i=0;i<P3.length;i++){const a=prj[i];for(let j=i+1;j<P3.length;j++){const b=prj[j],dx=a[4]-b[4],dy=a[5]-b[5],dz=a[6]-b[6],d=dx*dx+dy*dy+dz*dz;if(d<TH*TH){const f=1-Math.sqrt(d)/TH,dep=(2-a[2]-b[2])/2.6;const dc=Math.min(1,Math.hypot((a[0]+b[0])/2-X,(a[1]+b[1])/2-Y)/(Math.min(W,H)*.3));g.strokeStyle=`rgba(90,190,255,${(.12+f*.62)*Math.min(1,dep)*e*(.3+.7*dc)})`;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();E.push([i,j])}}}
 if(!reduce&&E.length)for(const p of PUL){p.p+=dt*p.s;if(p.p>=1){const ed=E[Math.random()*E.length|0];p.i=ed[0];p.j=ed[1];p.p=0}const a=prj[p.i],b=prj[p.j];if(!a||!b)continue;const px=a[0]+(b[0]-a[0])*p.p,py=a[1]+(b[1]-a[1])*p.p;g.drawImage(glow,px-7,py-7,14,14)}
 for(let i=0;i<P3.length;i++){const n=P3[i],a=prj[i],dep=Math.max(.25,Math.min(1,(1.3-a[2])/1.6)),s=(n.hub?2.6:1.1)*a[3];
  if(n.hub){const gs=(n.dom!=null?46:28)*a[3]*(n.dom===hot&&performance.now()-hotT<1600?1.6:1);g.globalAlpha=e*dep;g.drawImage(glow,a[0]-gs/2,a[1]-gs/2,gs,gs);g.globalAlpha=1}
  g.fillStyle=`rgba(${n.c},${(.45+.55*dep)*e})`;g.beginPath();g.arc(a[0],a[1],s+dep,0,6.2832);g.fill()}
 g.globalCompositeOperation='source-over';
 {const cy=Y,sz=SMALL?7:10,gap=sz*1.6,n=SMALL?4:7,off=reduce?0:(t*14)%gap;g.lineWidth=SMALL?1.6:2.2;
  for(const sd of[-1,1]){for(let k=0;k<n;k++){const d=k*gap+off,x=sd<0?14+d:W-14-d,a=(1-k/n)*.45*e;if(x<0||x>W)continue;g.strokeStyle=`rgba(${k===0?'255,74,92':'90,190,255'},${a})`;g.beginPath();g.moveTo(x-sd*sz*.5,cy-sz);g.lineTo(x+sd*sz*.5,cy);g.lineTo(x-sd*sz*.5,cy+sz);g.stroke()}}
  g.lineWidth=1;g.strokeStyle=`rgba(90,190,255,${.22*e})`;g.beginPath();g.moveTo(14,cy-sz*2.2);g.lineTo(14+n*gap,cy-sz*2.2);g.moveTo(14,cy+sz*2.2);g.lineTo(14+n*gap,cy+sz*2.2);g.moveTo(W-14,cy-sz*2.2);g.lineTo(W-14-n*gap,cy-sz*2.2);g.moveTo(W-14,cy+sz*2.2);g.lineTo(W-14-n*gap,cy+sz*2.2);g.stroke()}
 g.strokeStyle=`rgba(63,216,255,${.35*e})`;g.lineWidth=1;g.beginPath();for(let y=H*.1;y<H*.9;y+=8){const k=Math.round((y-H*.1)/8),L=k%5?5:11;g.moveTo(6,y);g.lineTo(6+L,y);g.moveTo(W-6,y);g.lineTo(W-6-L,y)}g.stroke();
 const used=[...STATR];HUB.forEach((n,i)=>{const nd=nodes[i],a=prj[P3.indexOf(n)],w=nd.offsetWidth,h=nd.offsetHeight,right=a[0]>X;const cl2=(p)=>[Math.max(2,Math.min(W-w-2,p[0])),Math.max(2,Math.min(H-h-2,p[1]))],hits=(p)=>used.some(u=>p[0]<u[0]+u[2]+6&&p[0]+w+6>u[0]&&p[1]<u[1]+u[3]+6&&p[1]+h+6>u[1]);const C=[[a[0]+(right?16:-w-16),a[1]-h-14],[a[0]+(right?16:-w-16),a[1]+14],[a[0]+(right?-w-16:16),a[1]-h-14],[a[0]+(right?-w-16:16),a[1]+14],[a[0]-w/2,a[1]-h-24],[a[0]-w/2,a[1]+24]].map(cl2);let pick=C.find(p=>!hits(p))||C[0];let lx=pick[0],ly=pick[1];used.push([lx,ly,w,h]);
  g.strokeStyle=`rgba(${NC[i]},${.8*e})`;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(right?lx:lx+w,ly+h/2);g.stroke();
  nd.style.transform=`translate(${lx.toFixed(1)}px,${ly.toFixed(1)}px)`});
}

/* wires from panels to the core */
const wv=$('#wires'),wg=wv.getContext('2d');let VW=0,VH=0;
function wsize(){const d=Math.min(devicePixelRatio||1,2);VW=innerWidth;VH=innerHeight;wv.width=VW*d;wv.height=VH*d;wg.setTransform(d,0,0,d,0,0)}wsize();addEventListener('resize',wsize);
const PAN=['p-id','p-mission','p-about','p-comms','p-creds'].map(id=>document.getElementById(id));

function frame(r,col,e,hex){const c=14,x=r.left+.5,y=r.top+.5,w=r.width-1,h=r.height-1;
 const pts=hex?[[x+16,y],[x+w-16,y],[x+w,y+h/2],[x+w-16,y+h],[x+16,y+h],[x,y+h/2]]:[[x+c,y],[x+w,y],[x+w,y+h-c],[x+w-c,y+h],[x,y+h],[x,y+c]];
 let per=0;for(let k=0;k<pts.length;k++){const p=pts[k],q=pts[(k+1)%pts.length];per+=Math.hypot(q[0]-p[0],q[1]-p[1])}
 wg.setLineDash([per*e,per]);wg.strokeStyle=`rgba(${col},${.55*e})`;wg.lineWidth=1;wg.beginPath();pts.forEach((p,k)=>k?wg.lineTo(p[0],p[1]):wg.moveTo(p[0],p[1]));wg.closePath();wg.stroke();wg.setLineDash([]);
 if(e<.6)return;const al=(e-.6)/.4;
 wg.shadowColor=`rgb(${col})`;wg.shadowBlur=8;wg.strokeStyle=`rgba(${col},${al})`;wg.lineWidth=2;wg.beginPath();
 if(hex){wg.moveTo(x+16,y);wg.lineTo(x,y+h/2);wg.lineTo(x+16,y+h);wg.moveTo(x+w-16,y);wg.lineTo(x+w,y+h/2);wg.lineTo(x+w-16,y+h)}
 else{wg.moveTo(x,y+c+20);wg.lineTo(x,y+c);wg.lineTo(x+c,y);wg.lineTo(x+c+26,y);wg.moveTo(x+w,y+h-c-20);wg.lineTo(x+w,y+h-c);wg.lineTo(x+w-c,y+h);wg.lineTo(x+w-c-26,y+h);
  wg.moveTo(x+w-12,y);wg.lineTo(x+w,y);wg.lineTo(x+w,y+12);wg.moveTo(x,y+h-12);wg.lineTo(x,y+h);wg.lineTo(x+12,y+h)}
 wg.stroke();wg.shadowBlur=0;
 if(!hex){wg.strokeStyle=`rgba(${col},${.5*al})`;wg.lineWidth=1;wg.beginPath();for(let k=0;k<8;k++){const tx=x+w-30-k*6;wg.moveTo(tx,y);wg.lineTo(tx,y+(k%4?3:6))}wg.stroke();
  wg.fillStyle=`rgba(${col},${.9*al})`;wg.fillRect(x-1.5,y+h*.5-10,3,20);
  wg.strokeStyle=`rgba(63,216,255,${.16*al})`;wg.beginPath();wg.moveTo(x+14,y+38);wg.lineTo(x+w-14,y+38);wg.stroke()}}
const fe=el=>el._t?Math.max(0,Math.min(1,(performance.now()-el._t-120)/650)):0;
function wires(t,e){wg.clearRect(0,0,VW,VH);if(e<=0)return;const WC=['63,216,255','255,181,71','155,123,255','255,61,154','255,181,71'];
  if(innerWidth<=1180)return;const sr=st.getBoundingClientRect(),cx=sr.left+X,cy=sr.top+Y;
 PAN.forEach((p,i)=>{const k=fe(p);if(k<1||p.classList.contains('fz'))return;const r=p.getBoundingClientRect(),left=r.left<cx,x0=left?r.right:r.left,y0=r.top+Math.min(r.height/2,60),x1=x0+(left?26:-26);let best=1e9,x2=cx,y2=cy;for(let q=0;q<prj.length;q++){const a=prj[q];if(!a||a[2]>.3)continue;const ax=sr.left+a[0],ay=sr.top+a[1],d=(ax-x1)**2+(ay-y0)**2;if(d<best){best=d;x2=ax;y2=ay}}
  wg.strokeStyle=`rgba(90,190,255,${.6*e})`;wg.lineWidth=1;wg.beginPath();wg.moveTo(x0,y0);wg.lineTo(x1,y0);wg.lineTo(x2,y2);wg.stroke();wg.globalCompositeOperation='lighter';wg.drawImage(glow,x2-14,y2-14,28,28);wg.drawImage(glow,x0-10,y0-10,20,20);wg.globalCompositeOperation='source-over';
  
  if(!reduce){const L1=Math.abs(x1-x0),L2=Math.hypot(x2-x1,y2-y0),f=((t*.35+i*.21)%1)*(L1+L2);let px,py;if(f<L1){px=x0+(left?f:-f);py=y0}else{const u=(f-L1)/L2;px=x1+(x2-x1)*u;py=y0+(y2-y0)*u}
   wg.globalCompositeOperation='lighter';wg.drawImage(glow,px-8,py-8,16,16);wg.globalCompositeOperation='source-over'}})}

/* mini wave */
const mw=$('#mw'),mg=mw.getContext('2d');let MW=0,MH=0;
new ResizeObserver(()=>{const d=Math.min(devicePixelRatio||1,2);MW=mw.clientWidth;MH=mw.clientHeight;mw.width=MW*d;mw.height=MH*d;mg.setTransform(d,0,0,d,0,0)}).observe(mw);
function mini(t){mg.clearRect(0,0,MW,MH);mg.strokeStyle='rgba(63,216,255,.15)';mg.beginPath();for(let x=0;x<MW;x+=12){mg.moveTo(x,0);mg.lineTo(x,MH)}mg.stroke();
 [['255,181,71',1.6,0],['255,61,154',1.2,1.7]].forEach(([c,w,o])=>{mg.strokeStyle=`rgba(${c},.9)`;mg.lineWidth=w;mg.beginPath();for(let x=0;x<=MW;x+=2){const y=MH/2+Math.sin(x*.045+t*2+o)*MH*.28*Math.sin(x*.012+t*.6+o);x?mg.lineTo(x,y):mg.moveTo(x,y)}mg.stroke()})}

let ready=false,readyAt=0,last=performance.now();const start=last;
function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;const t=reduce?0:(now-start)/1000;

 if(ready){const k=reduce?1:Math.min(1,(now-readyAt)/1200),e=1-Math.pow(1-k,3);if(coreVis)drawCore(t,e,dt);if(innerWidth>1180)wires(t,1);if(miniVis)mini(t)}
 requestAnimationFrame(loop)}
requestAnimationFrame(loop);

/* visibility, so off-screen canvases stop drawing */
let coreVis=true,miniVis=true;
new IntersectionObserver(es=>{coreVis=es[0].isIntersecting}).observe(st);
new IntersectionObserver(es=>{miniVis=es[0].isIntersecting}).observe(mw);
/* panel frames live inside each panel, so they scroll with it */
const FCOL={'p-id':'#3fd8ff','p-mission':'#ffb547','p-about':'#9b7bff','p-comms':'#ff3d9a','p-creds':'#ffb547'};
function buildFrame(el){const hex=false,col=hex?'#3fd8ff':FCOL[el.id];let sv=el.querySelector(':scope>.frm');
 if(!sv){sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','frm');sv.setAttribute('aria-hidden','true');el.prepend(sv)}
 const w=el.offsetWidth,h=el.offsetHeight,c=14,R=w-.5,B=h-.5;if(!w||!h)return;sv.setAttribute('viewBox',`0 0 ${w} ${h}`);sv.style.color=col;
 let o,b,x='';
 if(hex){o=`M16 .5H${w-16}L${R} ${h/2}L${w-16} ${B}H16L.5 ${h/2}Z`;b=`M16 .5L.5 ${h/2}L16 ${B}M${w-16} .5L${R} ${h/2}L${w-16} ${B}`}
 else{const nw=Math.min(90,w*.22),nx=w/2,cx2=w*.62;o=`M${c} .5H${cx2-14}L${cx2-8} 4.5H${R-40}L${R-34} .5H${R}V${B-c}L${R-c} ${B}H${nx+nw/2+8}L${nx+nw/2} ${B-6}H${nx-nw/2}L${nx-nw/2-8} ${B}H.5V${c}Z`;b=`M.5 ${c+20}V${c}L${c} .5H${c+26}M${R} ${B-c-20}V${B-c}L${R-c} ${B}H${R-c-26}M${w-12} .5H${R}V12M.5 ${h-12}V${B}H12`;
  const h2=el.querySelector('h2'),HY=h2?Math.round(h2.offsetTop+h2.offsetHeight+6)+.5:38.5;
  x+=`<path class="b" d="M${w/2-Math.min(90,w*.22)/2+6} ${B-3}H${w/2+Math.min(90,w*.22)/2-6}" stroke="currentColor" stroke-width="2"/><rect class="b" x="${w/2-3}" y="${B-9}" width="6" height="2" fill="#ff4a5c"/>`;
  let tk='';for(let k=0;k<8;k++){const tx=w-30-k*6;tk+=`M${tx} .5V${k%4?3.5:6.5}`}
  x=`<path class="b" d="${tk}" stroke="#8fe4ff" stroke-opacity=".7"/><rect class="b" x="-1" y="${h/2-10}" width="3" height="20" fill="currentColor"/><path class="b" d="M14 ${HY}H${w-14}" stroke="#6fd6ff" stroke-opacity=".35"/>`+[14,w/2,w-14].map(cx=>`<circle class="b" cx="${cx}" cy="${HY}" r="1.8" fill="#dff8ff"/>`).join('')}
 const vx=hex?[[16,.5],[w-16,.5],[R,h/2],[w-16,B],[16,B],[.5,h/2]]:[[c,.5],[R,.5],[R,B-c],[R-c,B],[.5,B],[.5,c]];x+=vx.map(([a,b2])=>`<circle class="b" cx="${a}" cy="${b2}" r="2.6" fill="#eafcff"/>`).join('');
 sv.innerHTML=`<path class="o" pathLength="1" d="${o}" fill="none" stroke="#6fd6ff" stroke-opacity=".9"/><path class="b" d="${b}" fill="none" stroke="currentColor" stroke-width="2"/>${x}`}
const fro=new ResizeObserver(es=>es.forEach(en=>buildFrame(en.target)));
PAN.forEach(el=>{buildFrame(el);fro.observe(el)});

/* identity portrait: Gemini render with the biometric lock sequence */
{const LMP=[[0.5008, 0.143], [0.2297, 0.2427], [0.2515, 0.2028], [0.2441, 0.5991], [0.3482, 0.1542], [0.2181, 0.4627], [0.2881, 0.1728], [0.417, 0.1453], [0.2141, 0.3463], [0.2267, 0.5284], [0.2938, 0.7061], [0.4477, 0.8128], [0.3647, 0.773], [0.3307, 0.7463], [0.5076, 0.8178], [0.218, 0.2881], [0.2671, 0.6591], [0.4025, 0.7964], [0.2156, 0.4031], [0.7914, 0.2349], [0.7643, 0.1957], [0.7853, 0.5931], [0.6569, 0.15], [0.8117, 0.4566], [0.7223, 0.1667], [0.5854, 0.1432], [0.8145, 0.3382], [0.8033, 0.5225], [0.7304, 0.7009], [0.568, 0.8115], [0.655, 0.7694], [0.6914, 0.7419], [0.8071, 0.2798], [0.7598, 0.6533], [0.6148, 0.7938], [0.814, 0.3961], [0.3073, 0.3563], [0.4295, 0.3619], [0.5801, 0.3583], [0.704, 0.3489], [0.3552, 0.3324], [0.3713, 0.3751], [0.6539, 0.3296], [0.6399, 0.3695], [0.2527, 0.2985], [0.3204, 0.275], [0.4373, 0.2873], [0.5702, 0.2738], [0.6888, 0.2638], [0.7555, 0.2919], [0.4995, 0.5302], [0.4991, 0.5049], [0.5011, 0.3766], [0.5016, 0.3421], [0.427, 0.546], [0.5803, 0.5455], [0.4012, 0.6677], [0.6126, 0.6675], [0.5017, 0.6417], [0.508, 0.7186], [0.5038, 0.6693], [0.5052, 0.6702], [0.3633, 0.3465], [0.6467, 0.3458], [0.2987, 0.4933], [0.7126, 0.4904], [0.3347, 0.5305], [0.6753, 0.5283]],cv=document.getElementById('idp'),im=document.getElementById('idimg'),OY=.06,CH=.8;let g,S=0,Hh=0,vis=true;
 new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(cv);
 const rs=()=>{const d=Math.min(devicePixelRatio||1,2),r=cv.getBoundingClientRect();S=r.width;Hh=r.height;cv.width=S*d;cv.height=Hh*d;g=cv.getContext('2d');g.setTransform(d,0,0,d,0,0)};new ResizeObserver(rs).observe(cv);
 function dl(P){const pts=P.concat([[-10,-10],[10,-10],[0,10]]),n=P.length;let T=[[n,n+1,n+2]];const cc=(a,b,c)=>{const[ax,ay]=pts[a],[bx,by]=pts[b],[cx,cy]=pts[c],d=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by)),A=ax*ax+ay*ay,B=bx*bx+by*by,C=cx*cx+cy*cy,ux=(A*(by-cy)+B*(cy-ay)+C*(ay-by))/d,uy=(A*(cx-bx)+B*(ax-cx)+C*(bx-ax))/d;return[ux,uy,(ax-ux)**2+(ay-uy)**2]};
  P.forEach((p,i)=>{const bad=T.filter(t=>{const[ux,uy,r]=cc(...t);return(p[0]-ux)**2+(p[1]-uy)**2<r}),E=[];bad.forEach(t=>[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]].forEach(e=>{const k=E.findIndex(f=>f[0]===e[1]&&f[1]===e[0]);k>=0?E.splice(k,1):E.push(e)}));T=T.filter(t=>!bad.includes(t));E.forEach(e=>T.push([e[0],e[1],i]))});
  const o=[],s=new Set();T.filter(t=>t.every(v=>v<n)).forEach(t=>[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]].forEach(([a,b])=>{const k=a<b?a+'-'+b:b+'-'+a;if(!s.has(k)){s.add(k);o.push([a,b])}}));return o}
 const ED=dl(LMP).sort((p,q)=>(LMP[p[0]][1]+LMP[p[1]][1])-(LMP[q[0]][1]+LMP[q[1]][1])),xs=LMP.map(p=>p[0]),ys=LMP.map(p=>p[1]),BX=[Math.min(...xs)-.03,Math.min(...ys)-.04,Math.max(...xs)+.03,Math.max(...ys)+.02];
 const cl=v=>Math.max(0,Math.min(1,v)),ea=v=>1-Math.pow(1-v,3),T0=performance.now();
 const corner=(x,y,w,h,l,col,lw)=>{g.strokeStyle=col;g.lineWidth=lw;g.beginPath();g.moveTo(x,y+l);g.lineTo(x,y);g.lineTo(x+l,y);g.moveTo(x+w-l,y);g.lineTo(x+w,y);g.lineTo(x+w,y+l);g.moveTo(x+w,y+h-l);g.lineTo(x+w,y+h);g.lineTo(x+w-l,y+h);g.moveTo(x+l,y+h);g.lineTo(x,y+h);g.lineTo(x,y+h-l);g.stroke()};
 function fr(now){requestAnimationFrame(fr);if(!g||!S||!vis||!im.complete)return;const t=(now-T0)/1000,p0=reduce?6:t%13,p=p0<6?p0:p0<7?6:Math.max(0,13-p0),W=S,H=Hh,mp=q=>[q[0]*W,(q[1]-OY)/CH*H],P=LMP.map(mp);
  g.clearRect(0,0,W,H);g.drawImage(im,0,OY*im.naturalHeight,im.naturalWidth,CH*im.naturalHeight,0,0,W,H);
  if(p0<1.8&&!reduce){const y=ea(p0/1.8)*H,gr=g.createLinearGradient(0,y-H*.22,0,y);gr.addColorStop(0,'rgba(63,216,255,0)');gr.addColorStop(1,'rgba(63,216,255,.25)');g.fillStyle=gr;g.fillRect(0,y-H*.22,W,H*.22);g.fillStyle='rgba(210,250,255,.85)';g.fillRect(0,y-1,W,1.5)}
  g.globalCompositeOperation='lighter';const mA=p<2.4?0:p<4?.6:.6-.42*cl((p-4)/1.2),pr=cl((p-2.4)/1.4);g.lineWidth=.6;
  ED.forEach((e,k)=>{if(k/ED.length>pr)return;const a=P[e[0]],b=P[e[1]];g.strokeStyle=`rgba(180,235,255,${mA})`;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()});
  P.forEach((q,k)=>{const ap=reduce?1:cl((p-1.2-k*.02)/.25);if(!ap)return;g.fillStyle=`rgba(235,252,255,${ap*(.9-.55*cl((p-4.6)/.8))})`;g.beginPath();g.arc(q[0],q[1],1.2,0,6.2832);g.fill()});
  g.globalCompositeOperation='source-over';
  const k=reduce?1:ea(cl((p-3.8)/.5)),fx=BX[0]*W,fy=(BX[1]-OY)/CH*H,fw=(BX[2]-BX[0])*W,fh=(BX[3]-BX[1])/CH*H,bx=6+(fx-6)*k,by=6+(fy-6)*k,bw=W-12+(fw-W+12)*k,bh=H-12+(fh-H+12)*k,lk=k>=1;
  corner(bx,by,bw,bh,14,lk?'rgba(255,181,71,.95)':'rgba(63,216,255,.85)',1.6);
  if(lk){g.fillStyle='rgba(0,4,14,.78)';g.fillRect(bx,Math.min(H-17,by+bh+4),bw,14);g.font='600 9.5px Oxanium,sans-serif';g.textAlign='left';g.fillStyle='rgba(255,181,71,.95)';g.fillText('LOCKED',bx+4,Math.min(H-17,by+bh+4)+10.5);g.textAlign='right';g.fillStyle='rgba(150,225,255,.95)';g.fillText('478 PTS',bx+bw-4,Math.min(H-17,by+bh+4)+10.5);g.textAlign='left'}}
 requestAnimationFrame(fr)}


/* focus window: a panel flies to centre stage; everything else dims and blurs */
const scrim=$('#scrim');let FZ=null;
function rectOf(el){const r=el.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}}
const GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>';
function decode(el,delay){if(!el||reduce)return;const tn=[...el.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(!tn)return;const fin=tn.textContent;if(fin.length>48)return;if(el._dec)clearInterval(el._dec);let f=0;const tot=Math.min(18,8+fin.length/2);
 setTimeout(()=>{el._dec=setInterval(()=>{f++;const k=f/tot;tn.textContent=fin.split('').map((c,i)=>c===' '||i/fin.length<k?c:GL[Math.random()*GL.length|0]).join('');if(f>=tot){clearInterval(el._dec);el._dec=0;tn.textContent=fin}},32)},delay||0)}
function decodePanel(p,base){p.querySelectorAll('h2,dt,dd,.chn b,.chn span,.creds a,.creds .c').forEach((el,i)=>decode(el,(base||0)+i*35))}
function centre(r){return[r.x+r.w/2,r.y+r.h/2]}
function openFocus(p){if(!p||FZ===p)return;if(FZ){closeFocus(()=>openFocus(p));return}
 document.body.classList.add('locked');p.classList.add('done','open');p.style.opacity='';const a=rectOf(p),slot=document.createElement('div');slot.className='ph-slot';slot.style.height=a.h+'px';p.after(slot);p._slot=slot;
 const vw=innerWidth,vh=innerHeight,small=vw<=700,tw=small?Math.min(vw-24,560):Math.min(760,vw*.62),zm=small?1.08:Math.max(1.15,Math.min(1.45,tw/a.w));
 p.style.setProperty('--zm',zm);p.style.width=tw+'px';p.style.maxHeight=(vh*.86)+'px';p.classList.add('fz');p.style.left='0px';p.style.top='0px';
 const nh=p.offsetHeight,b={x:(vw-tw)/2,y:Math.max(12,(vh-nh)/2),w:tw,h:nh};p.style.left=b.x+'px';p.style.top=b.y+'px';
 let x=p.querySelector(':scope>.xbtn');if(!x){x=document.createElement('button');x.type='button';x.className='xbtn';x.setAttribute('aria-label','Close');x.textContent='×';x.addEventListener('click',ev=>{ev.stopPropagation();closeFocus()});p.append(x)}
 FZ=p;scrim.classList.add('on');p.setAttribute('role','dialog');p.setAttribute('aria-modal','true');
 if(!reduce){const[ax,ay]=centre(a),[bx,by]=centre(b),dx=ax-bx,dy=ay-by,sx=a.w/b.w,sy=a.h/b.h;
  p.animate([{transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`,filter:'brightness(1.3)',easing:'cubic-bezier(.6,0,.4,1)'},
   {transform:`translate(${dx}px,${dy}px) scale(${sx},.008)`,filter:'brightness(3) drop-shadow(0 0 14px #3fd8ff)',offset:.2,easing:'cubic-bezier(.6,0,.4,1)'},
   {transform:'translate(0,0) scale(.3,.008)',filter:'brightness(3) drop-shadow(0 0 18px #3fd8ff)',offset:.45,easing:'cubic-bezier(.6,0,.4,1)'},
   {transform:'scale(1.04,.008)',filter:'brightness(2.6) drop-shadow(0 0 22px #3fd8ff)',offset:.6,easing:'cubic-bezier(.6,0,.4,1)'},
   {transform:'scale(1,1.025)',filter:'brightness(1.35) blur(1.5px)',offset:.84,easing:'cubic-bezier(.6,0,.4,1)'},
   {transform:'none',filter:'none'}],{duration:1000,easing:'linear'});
  p.classList.remove('rv');void p.offsetWidth;p.classList.add('rv');decodePanel(p,620)}
 p.tabIndex=-1;setTimeout(()=>p.focus({preventScroll:true}),reduce?0:500)}
function closeFocus(after){const p=FZ;if(!p)return;FZ=null;scrim.classList.remove('on');p.classList.remove('rv');const b=rectOf(p),a=rectOf(p._slot);a.h=p._slot.offsetHeight;
 const done=()=>{p.classList.remove('fz');['left','top','width','maxHeight'].forEach(k=>p.style[k]='');p.style.removeProperty('--zm');p.removeAttribute('role');p.removeAttribute('aria-modal');p._slot.remove();p._slot=null;document.body.classList.remove('locked');if(typeof after==='function')after()};
 if(reduce){done();return}
 const[ax,ay]=centre(a),[bx,by]=centre(b),dx=ax-bx,dy=ay-by,sx=a.w/b.w,sy=a.h/b.h;
 const an=p.animate([{transform:'none',filter:'none',easing:'cubic-bezier(.6,0,.4,1)'},
  {transform:'scale(1,1.025)',filter:'brightness(1.35) blur(1.5px)',offset:.16,easing:'cubic-bezier(.6,0,.4,1)'},
  {transform:'scale(1.04,.008)',filter:'brightness(2.6) drop-shadow(0 0 22px #3fd8ff)',offset:.4,easing:'cubic-bezier(.6,0,.4,1)'},
  {transform:'translate(0,0) scale(.3,.008)',filter:'brightness(3) drop-shadow(0 0 18px #3fd8ff)',offset:.55,easing:'cubic-bezier(.6,0,.4,1)'},
  {transform:`translate(${dx}px,${dy}px) scale(${sx},.008)`,filter:'brightness(3) drop-shadow(0 0 14px #3fd8ff)',offset:.8,easing:'cubic-bezier(.6,0,.4,1)'},
  {transform:`translate(${dx}px,${dy}px) scale(${sx},${sy})`,filter:'brightness(1.3)',easing:'cubic-bezier(.6,0,.4,1)'}],{duration:1000,easing:'linear'});an.onfinish=done}
scrim.addEventListener('click',()=>closeFocus());
addEventListener('keydown',e=>{if(e.key==='Escape'&&FZ){e.preventDefault();closeFocus()}});
document.querySelector('.os').addEventListener('click',e=>{const p=e.target.closest('.pnl');if(!p||FZ===p)return;if(e.target.closest('a,button,input'))return;openFocus(p)});
/* swipe away */
{let sx=0,sy=0,tr=false;addEventListener('touchstart',e=>{if(!FZ)return;const t=e.touches[0];sx=t.clientX;sy=t.clientY;tr=true},{passive:true});
 addEventListener('touchend',e=>{if(!FZ||!tr)return;tr=false;const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy,inner=FZ.scrollHeight>FZ.clientHeight+2;
  if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.3)closeFocus();else if(!inner&&Math.abs(dy)>80&&Math.abs(dy)>Math.abs(dx)*1.3)closeFocus()},{passive:true})}
addEventListener('resize',()=>{if(FZ)closeFocus()});

/* parallax depth: background, art and side columns move at different rates */
if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){const rt=document.documentElement;let tx=0,ty=0,cx=0,cy=0;
 addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
 (function pl(){cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;rt.style.setProperty('--px',cx.toFixed(4));rt.style.setProperty('--py',cy.toFixed(4));requestAnimationFrame(pl)})()}

/* boot */
let booted=false,bdone=false;
const OPEN=[...PAN];
document.querySelectorAll('.pnl').forEach(p=>p.addEventListener('animationend',e=>{if(e.target===p&&e.animationName==='winopen')p.classList.add('done')}));
function openEl(el){const d=parseFloat(getComputedStyle(el).getPropertyValue('--d'))||0;decodePanel(el,d*1000+520);el._t=performance.now()+(reduce?-2000:d*1000);el.classList.add('open')}
const oio=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){openEl(en.target);oio.unobserve(en.target)}}),{threshold:.18});
function go(){if(booted)return;booted=true;bdone=true;const bt=$('#boot');bt.classList.add('out');setTimeout(()=>bt.remove(),900);document.body.classList.add('ready');ready=true;readyAt=performance.now();OPEN.forEach(el=>oio.observe(el));document.querySelectorAll('.fstat b').forEach(b=>{const n=+b.dataset.n;if(reduce){b.textContent=n;return}let i=0;const iv=setInterval(()=>{b.textContent=++i;if(i>=n)clearInterval(iv)},900/n)})}
if(reduce)go();else{
 const bc=$('#bc'),bx=bc.getContext('2d');let BW=0,BH=0;
 const bsize=()=>{const d=Math.min(devicePixelRatio||1,2);BW=innerWidth;BH=innerHeight;bc.width=BW*d;bc.height=BH*d;bx.setTransform(d,0,0,d,0,0)};bsize();addEventListener('resize',bsize);
 const LOG=[['Power bus','Stable'],['Core memory','Pass'],['Display matrix','Calibrated'],['Optical array','Aligned'],['Holographic renderer','Ready'],['Network mesh','Ready'],['Panel compositor','Ready'],['Comms channels','6 found'],['Partner credentials','11 loaded'],['Focus areas','6 locked'],['Handshake','Verified'],['Interface','Online']];
 const SUB=['Identity','Mission','About','Comms','Credentials','Network'];
 $('#bsub').innerHTML=SUB.map(n=>`<li><span>${n}</span><span class="st">Standby</span><span class="bar"><i></i></span></li>`).join('');
 const subs=document.querySelectorAll('#bsub li'),T=[];const SP=1.75,at=(sec,f)=>T.push(setTimeout(f,sec*1000/SP));
 at(.6,()=>document.querySelectorAll('#boot .bx:not(.b-name),#boot .crn').forEach(el=>el.classList.add('on')));
 LOG.forEach((l,i)=>at(.75+i*.2,()=>{const d=document.createElement('div');d.className='ln';d.innerHTML='<span></span><i></i><b></b>';d.firstChild.textContent=l[0];d.querySelector('b').textContent=l[1];$('#blog').appendChild(d)}));
 subs.forEach((li,i)=>at(1.2+i*.4,()=>{li.classList.add('on');li.querySelector('.st').textContent='Online'}));
 at(3.6,()=>{const s=$('#bstat');s.textContent='All systems online';s.classList.add('ok')});
 const NAME='TRAVIS MEYER',GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#<>';let nStart=0;
 
 
 at(5.0,go);
 const stop=()=>{T.forEach(clearTimeout);go()};
 addEventListener('keydown',e=>{if(e.key==='Escape'&&!booted)stop()});
 const BP=Array.from({length:180},()=>({a:Math.random()*6.2832,r:Math.random(),s:.15+Math.random()*.5,z:Math.random()}));
 const cl=v=>Math.max(0,Math.min(1,v)),ease=v=>1-Math.pow(1-v,3);
 const b0=performance.now();
 const barc=(X,Y,r,a0,len,w,col,al)=>{bx.strokeStyle=`rgba(${col},${al})`;bx.lineWidth=w;bx.beginPath();bx.arc(X,Y,r,a0,a0+len);bx.stroke()};
 function bf(now){if(bdone)return;const t=(now-b0)/1000*SP;bx.clearRect(0,0,BW,BH);const X=BW/2,Y=BH*(BW<760?.42:.45),R=Math.min(BW,BH)*.17;
  const pv=cl((t-.8)/2.75),pct=pv<.5?2*pv*pv:1-Math.pow(-2*pv+2,2)/2;$('#bpct').textContent=Math.round(pct*100);
  if(t<.75){const k=ease(cl(t/.35)),h=t<.35?2:2+(t-.35)*30;bx.shadowColor='#3fd8ff';bx.shadowBlur=24;bx.fillStyle=`rgba(200,245,255,${t<.35?1:1-(t-.35)/.4})`;bx.fillRect(X-BW/2*k,Y-h/2,BW*k,h);bx.shadowBlur=0}
  const e=cl((t-.55)/.8);
  if(e>0){const sp=30;for(let x=X%sp;x<BW;x+=sp)for(let y=Y%sp;y<BH;y+=sp){const d=Math.hypot(x-X,y-Y)/Math.max(BW,BH),al=e*.22*(1-d*1.6);if(al>.01){bx.fillStyle=`rgba(63,216,255,${al})`;bx.fillRect(x,y,1.2,1.2)}}
   const gg=bx.createRadialGradient(X,Y,0,X,Y,R*2.4);gg.addColorStop(0,`rgba(31,123,255,${.35*e})`);gg.addColorStop(1,'rgba(31,123,255,0)');bx.fillStyle=gg;bx.fillRect(0,0,BW,BH)}
  bx.globalCompositeOperation='lighter';bx.shadowColor='#3fd8ff';bx.shadowBlur=12;
  const p1=ease(cl((t-.7)/1.1));if(p1>0)barc(X,Y,R,-Math.PI/2,6.2832*p1,2,'63,216,255',.9);
  const p2=cl((t-.9)/1.3);if(p2>0){bx.strokeStyle='rgba(63,216,255,.55)';bx.lineWidth=1.2;bx.beginPath();const n=120,m=Math.floor(n*p2);for(let i=0;i<m;i++){const a=i/n*6.2832-Math.PI/2+t*.05,L=i%10?5:12,r=R*1.13;bx.moveTo(X+Math.cos(a)*r,Y+Math.sin(a)*r);bx.lineTo(X+Math.cos(a)*(r+L),Y+Math.sin(a)*(r+L))}bx.stroke()}
  if(e>0){const n=30,lit=Math.floor(pct*n);for(let i=0;i<n;i++){const s=6.2832/n;barc(X,Y,R*.78,i*s-Math.PI/2+.03,s-.07,6,i<lit?'63,216,255':'31,123,255',i<lit?.95:.15)}}
  const p3=cl((t-1.3)/.6);if(p3>0){for(let j=0;j<3;j++)barc(X,Y,R*1.32,t*.9+j*2.094,.9*p3,3,'63,216,255',.8);for(let j=0;j<4;j++)barc(X,Y,R*1.42,-t*.5+j*1.571,.35*p3,1.2,'31,123,255',.9);for(let j=0;j<2;j++)barc(X,Y,R*1.52,t*.3+j*3.1416,.25*p3,1.5,'255,181,71',.8)}
  if(e>0&&t<4.3&&bx.createConicGradient){const cg=bx.createConicGradient(t*2.4,X,Y);cg.addColorStop(0,`rgba(63,216,255,${.25*e})`);cg.addColorStop(.06,'rgba(63,216,255,0)');cg.addColorStop(1,'rgba(63,216,255,0)');bx.fillStyle=cg;bx.beginPath();bx.arc(X,Y,R*1.5,0,6.2832);bx.fill()}
  const c2=bx.createRadialGradient(X,Y,0,X,Y,R*.62);c2.addColorStop(0,`rgba(255,255,255,${.15+pct*.55})`);c2.addColorStop(.3,`rgba(63,216,255,${.1+pct*.45})`);c2.addColorStop(1,'rgba(63,216,255,0)');bx.fillStyle=c2;bx.beginPath();bx.arc(X,Y,R*.62,0,6.2832);bx.fill();
  bx.shadowBlur=0;
  if(e>0&&t<4.1){for(const p of BP){const life=(t*p.s+p.r)%1,rr=R*(2.8-life*2.2),a=p.a+life*.6;bx.fillStyle=`rgba(${p.z>.85?'255,181,71':'63,216,255'},${e*life*.8})`;bx.fillRect(X+Math.cos(a)*rr,Y+Math.sin(a)*rr,1+p.z*1.5,1+p.z*1.5)}}
  if(t>4.1){const k=cl((t-4.1)/.9),rr=R*.8+k*Math.max(BW,BH);bx.strokeStyle=`rgba(150,235,255,${1-k})`;bx.lineWidth=3+k*20;bx.beginPath();bx.arc(X,Y,rr,0,6.2832);bx.stroke();bx.fillStyle=`rgba(180,240,255,${.35*Math.sin(k*Math.PI)})`;bx.fillRect(0,0,BW,BH)}
  bx.globalCompositeOperation='source-over';
  if(nStart){const el=$('#bname'),dt=(now-nStart)/1000;let out='';for(let i=0;i<NAME.length;i++){const c=NAME[i];out+=c===' '||dt>i*.06+.25?c:GL[Math.random()*GL.length|0]}el.textContent=out}
  requestAnimationFrame(bf)}
 requestAnimationFrame(bf)}
}
