export default {
  id:"inflation-time-machine",
  name:"Inflation Time Machine",
  description:"A time-travel visual showing how inflation reduces purchasing power.",
  duration:8,
  defaults:{
    title:"THE COST OF INFLATION",
    amount:100000,
    inflation:6,
    years:15,
    accent:"#f59e0b"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE COST OF INFLATION"},
    {key:"amount",label:"Money Today",type:"number",default:100000,min:1000,max:10000000,step:1000},
    {key:"inflation",label:"Inflation %",type:"number",default:6,min:1,max:30,step:1},
    {key:"years",label:"Years",type:"number",default:15,min:1,max:40,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#f59e0b"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);
    const purchasing=s.amount/Math.pow(1+s.inflation/100,s.years*t);

    h.drawText(ctx,"PURCHASING POWER",960,340,30,"#94a3b8",700);

    const cx=960,cy=590;
    const r=220;

    ctx.beginPath();
    ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.strokeStyle="#334155";
    ctx.lineWidth=35;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*2*t);
    ctx.strokeStyle=s.accent;
    ctx.lineWidth=35;
    ctx.lineCap="round";
    ctx.stroke();

    const shrink=purchasing/s.amount;
    ctx.save();
    ctx.translate(cx,cy);
    ctx.scale(shrink,shrink);
    ctx.fillStyle=s.accent;
    ctx.beginPath();
    ctx.arc(0,0,65,0,Math.PI*2);
    ctx.fill();
    ctx.restore();

    h.drawText(ctx,h.formatMoney(purchasing,"₹"),960,610,65,"#ffffff",900);
    h.drawText(ctx,"VALUE AFTER "+Math.round(s.years*t)+" YEARS",960,770,26,"#cbd5e1",700);

    h.drawText(ctx,"TODAY",500,910,25,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(s.amount,"₹"),500,960,35,"#ffffff",800);

    h.drawText(ctx,"FUTURE VALUE",1400,910,25,s.accent,700);
    h.drawText(ctx,h.formatMoney(purchasing,"₹"),1400,960,35,s.accent,800);
  }
};
