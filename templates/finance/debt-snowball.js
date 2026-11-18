export default {
  id:"debt-snowball",
  name:"Debt Snowball",
  description:"A growing rolling snowball that visually represents debt elimination.",
  duration:8,
  defaults:{
    title:"ELIMINATE YOUR DEBT",
    debt:500000,
    payment:50000,
    accent:"#38bdf8"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"ELIMINATE YOUR DEBT"},
    {key:"debt",label:"Starting Debt",type:"number",default:500000,min:1000,max:10000000,step:1000},
    {key:"payment",label:"Total Payment",type:"number",default:50000,min:1000,max:1000000,step:1000},
    {key:"accent",label:"Accent",type:"color",default:"#38bdf8"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);
    const remaining=Math.max(0,s.debt-s.payment*t);
    const ratio=remaining/s.debt;

    const r=50+ratio*130;
    const x=250+t*1400;
    const y=690;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(p*Math.PI*8);

    const gradient=ctx.createRadialGradient(-r/3,-r/3,5,0,0,r);
    gradient.addColorStop(0,"#ffffff");
    gradient.addColorStop(.3,s.accent);
    gradient.addColorStop(1,"#075985");

    ctx.fillStyle=gradient;
    ctx.beginPath();
    ctx.arc(0,0,r,0,Math.PI*2);
    ctx.fill();

    for(let i=0;i<18;i++){
      const a=i*2.4;
      ctx.fillStyle="rgba(255,255,255,.25)";
      ctx.beginPath();
      ctx.arc(Math.cos(a)*r*.7,Math.sin(a)*r*.7,5,0,Math.PI*2);
      ctx.fill();
    }

    ctx.restore();

    h.drawText(ctx,"REMAINING DEBT",960,360,27,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(remaining,"₹"),960,460,72,"#ffffff",900);

    h.drawText(ctx,Math.round((1-ratio)*100)+"% PAID OFF",960,900,38,s.accent,800);

    ctx.fillStyle="#334155";
    h.roundedRect(ctx,400,960,1120,20,10,"#334155");
    h.roundedRect(ctx,400,960,1120*(1-ratio),20,10,s.accent);
  }
};
