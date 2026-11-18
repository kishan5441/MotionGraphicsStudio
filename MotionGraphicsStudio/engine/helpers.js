
export function easeOut(t){
 t=Math.max(0,Math.min(1,t));
 return 1-Math.pow(1-t,3);
}

export function roundedRect(ctx,x,y,w,h,r,fill,stroke){
 ctx.beginPath();
 if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);
 else ctx.rect(x,y,w,h);
 if(fill){ctx.fillStyle=fill;ctx.fill()}
 if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke()}
}

export function drawText(ctx,str,x,y,size,color="#fff",weight=700,align="center"){
 ctx.save();
 ctx.font=`${weight} ${size}px Inter, "Noto Sans Devanagari", sans-serif`;
 ctx.fillStyle=color;
 ctx.textAlign=align;
 ctx.textBaseline="middle";
 ctx.fillText(String(str),x,y);
 ctx.restore();
}

export function formatMoney(value,currency="₹"){
 return currency+Math.round(Number(value)||0).toLocaleString("en-IN");
}

export function drawBackground(ctx,progress,settings,W,H){
 const bg=settings.background||"#0b1020";
 const accent=settings.accent||"#a78bfa";
 ctx.fillStyle=bg;
 ctx.fillRect(0,0,W,H);

 const glow=ctx.createRadialGradient(W*.5,H*.5,10,W*.5,H*.5,1000);
 glow.addColorStop(0,accent+"24");
 glow.addColorStop(1,"transparent");
 ctx.fillStyle=glow;
 ctx.fillRect(0,0,W,H);

 ctx.strokeStyle="rgba(180,195,230,.045)";
 ctx.lineWidth=1;
 for(let x=0;x<W;x+=80){
  ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();
 }
 for(let y=0;y<H;y+=80){
  ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
 }

 for(let i=0;i<24;i++){
  const x=(i*313+progress*90*(i%3+1))%W;
  const y=(i*197+Math.sin(progress*8+i)*16)%H;
  ctx.fillStyle=accent+"30";
  ctx.beginPath();ctx.arc(x,y,2+(i%3),0,Math.PI*2);ctx.fill();
 }
}

export function drawHeading(ctx,progress,settings,W){
 const p=easeOut(progress);
 ctx.save();
 ctx.globalAlpha=p;
 ctx.fillStyle=settings.accent||"#a78bfa";
 ctx.font='800 22px Inter, sans-serif';
 ctx.textAlign="center";
 ctx.fillText((settings.eyebrow||"FINANCIAL EXPLAINER").toUpperCase(),W/2,160);

 const heading=settings.heading||"Financial Story";
 ctx.fillStyle="#ffffff";
 ctx.font='900 66px Inter, "Noto Sans Devanagari", sans-serif';
 ctx.fillText(heading,W/2,265);

 ctx.fillStyle="#aab6cc";
 ctx.font='500 25px Inter, "Noto Sans Devanagari", sans-serif';
 ctx.fillText(settings.subtitle||"",W/2,330);
 ctx.restore();
}

export function drawCard(ctx,x,y,w,h,accent="#a78bfa"){
 roundedRect(ctx,x,y,w,h,28,"rgba(20,30,50,.94)","rgba(160,180,220,.16)");
}
