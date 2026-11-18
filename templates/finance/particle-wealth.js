export default {
  id:"particle-wealth",
  name:"Particle Wealth",
  description:"Ambient particle field surrounding a premium financial statement.",
  duration:9,
  defaults:{
    title:"BUILD YOUR\nFUTURE",
    subtitle:"CONSISTENCY COMPOUNDS.",
    accent:"#b8a5ff"
  },
  controls:[
    {key:"title",label:"Main Statement",type:"text",default:"BUILD YOUR FUTURE"},
    {key:"subtitle",label:"Subtitle",type:"text",default:"CONSISTENCY COMPOUNDS."},
    {key:"accent",label:"Particle Color",type:"color",default:"#b8a5ff"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#10131c";
    ctx.fillRect(0,0,W,H);

    const t=h.easeOut(p);

    for(let i=0;i<150;i++){
      const x=(i*137.5+Math.sin(p*5+i)*35)%W;
      const y=(i*79.3+Math.cos(p*4+i*.4)*45)%H;
      const r=1.5+(i%4)*.8;

      ctx.fillStyle=i%5===0?s.accent:"rgba(207,211,255,.3)";
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fill();
    }

    const glow=ctx.createRadialGradient(960,530,20,960,530,520);
    glow.addColorStop(0,"rgba(184,165,255,.12)");
    glow.addColorStop(1,"rgba(184,165,255,0)");
    ctx.fillStyle=glow;
    ctx.fillRect(350,0,1220,H);

    const lines=s.title.split(" ");
    lines.forEach((word,i)=>{
      const a=h.easeOut(Math.max(0,Math.min(1,(p-i*.15)/.55)));
      h.drawText(ctx,word,960,500+i*125+(1-a)*65,100,a>0?"#ffffff":"#ffffff",900);
    });

    ctx.fillStyle=s.accent;
    ctx.fillRect(780,850,400*t,4);
    h.drawText(ctx,s.subtitle.toUpperCase(),960,930,21,"#a9a9bb",700);
  }
};
