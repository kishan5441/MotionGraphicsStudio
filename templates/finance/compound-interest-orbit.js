export default {
  id:"compound-interest-orbit",
  name:"Compound Interest Orbit",
  description:"An orbital animation showing how investments compound over time.",
  duration:9,
  defaults:{
    title:"THE POWER OF COMPOUNDING",
    principal:100000,
    rate:12,
    years:15,
    accent:"#a78bfa"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE POWER OF COMPOUNDING"},
    {key:"principal",label:"Investment",type:"number",default:100000,min:1000,max:10000000,step:1000},
    {key:"rate",label:"Annual Return %",type:"number",default:12,min:1,max:50,step:1},
    {key:"years",label:"Years",type:"number",default:15,min:1,max:40,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#a78bfa"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);
    const cx=960,cy=600;
    const radius=130+t*230;

    for(let i=0;i<3;i++){
      ctx.beginPath();
      ctx.arc(cx,cy,radius+i*55,0,Math.PI*2);
      ctx.strokeStyle="rgba(167,139,250,.25)";
      ctx.lineWidth=3;
      ctx.stroke();
    }

    for(let i=0;i<12;i++){
      const a=i*Math.PI/6+p*Math.PI*2;
      const r=radius+Math.sin(i)*45;
      const x=cx+Math.cos(a)*r;
      const y=cy+Math.sin(a)*r;

      ctx.fillStyle=i%2?s.accent:"#38bdf8";
      ctx.beginPath();
      ctx.arc(x,y,8+8*t,0,Math.PI*2);
      ctx.fill();
    }

    const value=s.principal*Math.pow(1+s.rate/100,s.years*t);
    const gain=value-s.principal;

    ctx.fillStyle="#1e293b";
    ctx.beginPath();
    ctx.arc(cx,cy,105,0,Math.PI*2);
    ctx.fill();

    h.drawText(ctx,"FINAL VALUE",cx,570,21,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(value,"₹"),cx,650,48,"#ffffff",900);

    h.drawText(ctx,"INVESTMENT",500,880,24,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(s.principal,"₹"),500,935,38,"#ffffff",800);

    h.drawText(ctx,"COMPOUND GAIN",1400,880,24,s.accent,700);
    h.drawText(ctx,h.formatMoney(gain,"₹"),1400,935,38,s.accent,800);
  }
};
