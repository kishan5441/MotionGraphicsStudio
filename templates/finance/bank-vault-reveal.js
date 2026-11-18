export default {
  id:"bank-vault-reveal",
  name:"Bank Vault Reveal",
  description:"A dramatic mechanical vault door opening to reveal wealth.",
  duration:8,
  defaults:{
    title:"THE POWER OF SAVINGS",
    amount:1000000,
    accent:"#fbbf24"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE POWER OF SAVINGS"},
    {key:"amount",label:"Savings Amount",type:"number",default:1000000,min:1000,max:100000000,step:1000},
    {key:"accent",label:"Accent",type:"color",default:"#fbbf24"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const open=h.easeOut(Math.max(0,(p-.15)/.65));
    const cx=960,cy=610;

    ctx.fillStyle="#334155";
    ctx.beginPath();
    ctx.arc(cx,cy,290,0,Math.PI*2);
    ctx.fill();

    ctx.strokeStyle="#94a3b8";
    ctx.lineWidth=25;
    ctx.beginPath();
    ctx.arc(cx,cy,270,0,Math.PI*2);
    ctx.stroke();

    ctx.fillStyle="#0f172a";
    ctx.beginPath();
    ctx.arc(cx,cy,220,0,Math.PI*2);
    ctx.fill();

    for(let i=0;i<12;i++){
      const a=i*Math.PI/6;
      const x=cx+Math.cos(a)*245;
      const y=cy+Math.sin(a)*245;
      ctx.fillStyle="#cbd5e1";
      ctx.beginPath();
      ctx.arc(x,y,13,0,Math.PI*2);
      ctx.fill();
    }

    ctx.save();
    ctx.translate(cx,cy);
    ctx.rotate(-open*Math.PI*.85);
    ctx.fillStyle="#64748b";
    ctx.beginPath();
    ctx.arc(0,0,205,0,Math.PI*2);
    ctx.fill();

    ctx.strokeStyle="#cbd5e1";
    ctx.lineWidth=15;
    ctx.beginPath();
    ctx.arc(0,0,165,0,Math.PI*2);
    ctx.stroke();

    ctx.fillStyle="#0f172a";
    ctx.beginPath();
    ctx.arc(0,0,80,0,Math.PI*2);
    ctx.fill();

    ctx.restore();

    const glow=ctx.createRadialGradient(cx,cy,30,cx,cy,300);
    glow.addColorStop(0,"rgba(251,191,36,.4)");
    glow.addColorStop(1,"rgba(251,191,36,0)");
    ctx.fillStyle=glow;
    ctx.fillRect(cx-300,cy-300,600,600);

    h.drawText(ctx,h.formatMoney(s.amount,"₹"),960,960,52,s.accent,900);
  }
};
