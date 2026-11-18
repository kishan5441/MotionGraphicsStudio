export default {
  id:"liquid-asset-flow",
  name:"Liquid Asset Flow",
  description:"An elegant liquid-inspired animated composition representing capital movement.",
  duration:8,
  defaults:{
    title:"CAPITAL IN MOTION",
    amount:250000,
    accent:"#65cdb9"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"CAPITAL IN MOTION"},
    {key:"amount",label:"Capital",type:"number",default:250000,min:0,max:10000000,step:1000},
    {key:"accent",label:"Liquid Color",type:"color",default:"#65cdb9"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#101b25";
    ctx.fillRect(0,0,W,H);

    h.drawText(ctx,s.title,960,190,43,"#ffffff",800);

    const t=h.easeOut(p);
    const base=820;
    const level=base-390*t;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0,base);
    for(let x=0;x<=W;x+=20){
      const y=level+
        Math.sin(x*.008+p*5)*20+
        Math.sin(x*.017-p*4)*12;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H);
    ctx.lineTo(0,H);
    ctx.closePath();

    const grad=ctx.createLinearGradient(0,level,0,H);
    grad.addColorStop(0,s.accent);
    grad.addColorStop(1,"#235c70");
    ctx.fillStyle=grad;
    ctx.fill();
    ctx.restore();

    for(let i=0;i<20;i++){
      const x=(i*137+p*120)%W;
      const y=level-20-Math.abs(Math.sin(i*2+p*5))*100;
      ctx.strokeStyle="rgba(255,255,255,.2)";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.arc(x,y,5+i%8,0,Math.PI*2);
      ctx.stroke();
    }

    h.drawText(ctx,h.formatMoney(s.amount*t,"₹"),960,540,62,"#ffffff",900);
    h.drawText(ctx,"AVAILABLE CAPITAL",960,600,20,"rgba(255,255,255,.8)",700);
  }
};
