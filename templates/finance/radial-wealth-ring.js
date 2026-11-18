export default {
  id:"radial-wealth-ring",
  name:"Radial Wealth Ring",
  description:"A precise radial wealth allocation graphic with concentric animated rings.",
  duration:8,
  defaults:{
    title:"WEALTH ALLOCATION",
    equity:55,
    fixed:25,
    alternatives:20,
    accent:"#7dd3b0"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"WEALTH ALLOCATION"},
    {key:"equity",label:"Equity %",type:"number",default:55,min:0,max:100,step:1},
    {key:"fixed",label:"Fixed Income %",type:"number",default:25,min:0,max:100,step:1},
    {key:"alternatives",label:"Alternatives %",type:"number",default:20,min:0,max:100,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#7dd3b0"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawText(ctx,s.title,960,180,43,"#ffffff",800);

    const t=h.easeOut(p);
    const cx=960,cy=600;
    const data=[
      {name:"EQUITY",v:s.equity,r:240,c:s.accent},
      {name:"FIXED INCOME",v:s.fixed,r:175,c:"#8da9e8"},
      {name:"ALTERNATIVES",v:s.alternatives,r:110,c:"#e8bb7e"}
    ];

    data.forEach((a,i)=>{
      ctx.strokeStyle="rgba(255,255,255,.09)";
      ctx.lineWidth=20;
      ctx.beginPath();
      ctx.arc(cx,cy,a.r,0,Math.PI*2);
      ctx.stroke();

      ctx.strokeStyle=a.c;
      ctx.lineWidth=20;
      ctx.lineCap="round";
      ctx.beginPath();
      ctx.arc(cx,cy,a.r,-Math.PI/2,-Math.PI/2+Math.PI*2*a.v/100*t);
      ctx.stroke();

      const x=450+i*530;
      h.drawText(ctx,a.name,x,940,19,a.c,700);
      h.drawText(ctx,(a.v*t).toFixed(0)+"%",x,985,34,"#ffffff",850);
    });

    ctx.fillStyle="#1b2732";
    ctx.beginPath();
    ctx.arc(cx,cy,65,0,Math.PI*2);
    ctx.fill();
    h.drawText(ctx,"100%",cx,cy+12,32,"#ffffff",900);
  }
};
