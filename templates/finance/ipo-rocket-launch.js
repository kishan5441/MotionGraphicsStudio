export default {
  id:"ipo-rocket-launch",
  name:"IPO Rocket Launch",
  description:"A cinematic rocket launch representing a company going public.",
  duration:8,
  defaults:{
    title:"GOING PUBLIC",
    company:"NEXTGEN TECH",
    valuation:5000,
    accent:"#38bdf8"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"GOING PUBLIC"},
    {key:"company",label:"Company",type:"text",default:"NEXTGEN TECH"},
    {key:"valuation",label:"Valuation (Cr)",type:"number",default:5000,min:1,max:100000,step:100},
    {key:"accent",label:"Accent",type:"color",default:"#38bdf8"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);

    for(let i=0;i<50;i++){
      const x=(i*137)%W;
      const y=(i*79)%H;
      ctx.fillStyle="rgba(255,255,255,.45)";
      ctx.beginPath();
      ctx.arc(x,y,2+(i%3),0,Math.PI*2);
      ctx.fill();
    }

    const t=h.easeOut(Math.max(0,(p-.15)/.85));
    const x=960;
    const y=900-t*650;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(-.15);

    const flame=100+Math.sin(p*35)*35;

    ctx.fillStyle="#f97316";
    ctx.beginPath();
    ctx.moveTo(-35,90);
    ctx.lineTo(0,90+flame);
    ctx.lineTo(35,90);
    ctx.fill();

    ctx.fillStyle="#facc15";
    ctx.beginPath();
    ctx.moveTo(-17,90);
    ctx.lineTo(0,90+flame*.65);
    ctx.lineTo(17,90);
    ctx.fill();

    ctx.fillStyle="#e2e8f0";
    ctx.beginPath();
    ctx.moveTo(0,-150);
    ctx.quadraticCurveTo(65,-80,48,70);
    ctx.lineTo(-48,70);
    ctx.quadraticCurveTo(-65,-80,0,-150);
    ctx.fill();

    ctx.fillStyle=s.accent;
    ctx.beginPath();
    ctx.arc(0,-40,23,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#64748b";
    ctx.beginPath();
    ctx.moveTo(-45,30);
    ctx.lineTo(-90,105);
    ctx.lineTo(-45,85);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(45,30);
    ctx.lineTo(90,105);
    ctx.lineTo(45,85);
    ctx.fill();

    ctx.restore();

    h.drawText(ctx,s.title,960,220,54,"#ffffff",900);
    h.drawText(ctx,s.company,960,300,28,s.accent,800);
    h.drawText(ctx,"IPO VALUATION",960,850,24,"#94a3b8",700);
    h.drawText(ctx,"₹"+s.valuation+" CRORE",960,920,55,"#ffffff",900);
  }
};
