export default {
  id:"neo-finance-dial",
  name:"Neo Finance Dial",
  description:"Soft neumorphic financial gauge with a tactile dial.",
  duration:7,
  defaults:{
    title:"FINANCIAL HEALTH",
    score:82,
    label:"EXCELLENT",
    accent:"#8bd5c2"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"FINANCIAL HEALTH"},
    {key:"score",label:"Health Score",type:"number",default:82,min:0,max:100,step:1},
    {key:"label",label:"Status",type:"text",default:"EXCELLENT"},
    {key:"accent",label:"Accent",type:"color",default:"#8bd5c2"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#202733";
    ctx.fillRect(0,0,W,H);

    const t=h.easeOut(p);
    const cx=960,cy=600,r=220;

    h.drawText(ctx,s.title,960,190,42,"#e6edf5",800);

    ctx.save();
    ctx.shadowColor="#0e141d";
    ctx.shadowBlur=25;
    ctx.fillStyle="#202733";
    ctx.beginPath();
    ctx.arc(cx,cy,r+50,0,Math.PI*2);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle="#303b4b";
    ctx.lineWidth=25;
    ctx.beginPath();
    ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.stroke();

    ctx.strokeStyle=s.accent;
    ctx.lineWidth=25;
    ctx.lineCap="round";
    ctx.beginPath();
    ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*2*(s.score/100)*t);
    ctx.stroke();

    h.drawText(ctx,Math.round(s.score*t)+"/100",cx,cy+12,76,"#f5f7fb",900);
    h.drawText(ctx,s.label.toUpperCase(),cx,cy+75,22,s.accent,800);

    const labels=[
      ["STABILITY","82%"],
      ["LIQUIDITY","74%"],
      ["GROWTH","91%"]
    ];

    labels.forEach((a,i)=>{
      const x=400+i*560;
      ctx.save();
      ctx.shadowColor="#101720";
      ctx.shadowBlur=14;
      ctx.fillStyle="#202733";
      h.roundedRect(ctx,x-150,880,300,90,22,"#202733");
      ctx.restore();
      h.drawText(ctx,a[0],x,914,16,"#9caabd",700);
      h.drawText(ctx,a[1],x,950,23,s.accent,800);
    });
  }
};
