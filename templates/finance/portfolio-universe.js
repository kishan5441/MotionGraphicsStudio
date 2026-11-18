export default {
  id:"portfolio-universe",
  name:"Portfolio Universe",
  description:"A 3D-inspired investment universe with orbiting asset classes.",
  duration:9,
  defaults:{
    title:"YOUR INVESTMENT UNIVERSE",
    equity:50,
    debt:30,
    gold:20,
    accent:"#8b5cf6"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"YOUR INVESTMENT UNIVERSE"},
    {key:"equity",label:"Equity %",type:"number",default:50,min:0,max:100,step:1},
    {key:"debt",label:"Debt %",type:"number",default:30,min:0,max:100,step:1},
    {key:"gold",label:"Gold %",type:"number",default:20,min:0,max:100,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#8b5cf6"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const cx=960,cy=610;
    const assets=[
      {name:"EQUITY",v:s.equity,c:"#22c55e",r:290},
      {name:"DEBT",v:s.debt,c:"#38bdf8",r:210},
      {name:"GOLD",v:s.gold,c:"#f59e0b",r:135}
    ];

    const t=h.easeOut(p);

    assets.forEach((a,i)=>{
      ctx.beginPath();
      ctx.ellipse(cx,cy,a.r,a.r*.32,0,0,Math.PI*2);
      ctx.strokeStyle="rgba(148,163,184,.3)";
      ctx.lineWidth=3;
      ctx.stroke();

      const angle=p*Math.PI*2*(i%2?-.6:1)+i*2;
      const x=cx+Math.cos(angle)*a.r;
      const y=cy+Math.sin(angle)*a.r*.32;

      const radius=18+a.v*.55;

      const g=ctx.createRadialGradient(x-radius/3,y-radius/3,2,x,y,radius);
      g.addColorStop(0,"#ffffff");
      g.addColorStop(.3,a.c);
      g.addColorStop(1,"#111827");

      ctx.fillStyle=g;
      ctx.beginPath();
      ctx.arc(x,y,radius,0,Math.PI*2);
      ctx.fill();

      h.drawText(ctx,a.name+" "+a.v+"%",x,cy+a.r*.32+60,23,a.c,800);
    });

    const g=ctx.createRadialGradient(cx-30,cy-30,5,cx,cy,100);
    g.addColorStop(0,"#ffffff");
    g.addColorStop(.25,s.accent);
    g.addColorStop(1,"#312e81");

    ctx.fillStyle=g;
    ctx.beginPath();
    ctx.arc(cx,cy,95,0,Math.PI*2);
    ctx.fill();

    h.drawText(ctx,"PORTFOLIO",cx,cy+10,24,"#ffffff",900);
  }
};
