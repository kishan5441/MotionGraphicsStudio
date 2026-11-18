export default {
  id:"glass-kpi",
  name:"Glass KPI",
  description:"Elegant floating glass panels with animated financial metrics.",
  duration:7,
  defaults:{
    title:"THE NUMBERS THAT MATTER",
    revenue:850000,
    profit:245000,
    growth:18.5,
    accent:"#8b9cff"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE NUMBERS THAT MATTER"},
    {key:"revenue",label:"Revenue",type:"number",default:850000,min:0,max:100000000,step:10000},
    {key:"profit",label:"Profit",type:"number",default:245000,min:0,max:100000000,step:10000},
    {key:"growth",label:"Growth %",type:"number",default:18.5,min:-100,max:500,step:.5},
    {key:"accent",label:"Accent",type:"color",default:"#8b9cff"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);
    const cards=[
      {label:"TOTAL REVENUE",value:s.revenue,color:s.accent,x:330},
      {label:"NET PROFIT",value:s.profit,color:"#61d6ad",x:960},
      {label:"GROWTH RATE",value:s.growth,color:"#f0bd72",x:1590}
    ];

    cards.forEach((a,i)=>{
      const y=560+(1-t)*180;
      ctx.save();
      ctx.shadowColor="rgba(0,0,0,.25)";
      ctx.shadowBlur=35;
      ctx.fillStyle="rgba(255,255,255,.075)";
      h.roundedRect(ctx,a.x-250,y-150,500,300,28,"rgba(255,255,255,.075)");
      ctx.restore();

      ctx.strokeStyle="rgba(255,255,255,.15)";
      ctx.lineWidth=2;
      h.roundedRect(ctx,a.x-250,y-150,500,300,28,"rgba(255,255,255,.015)");
      ctx.stroke();

      ctx.fillStyle=a.color;
      ctx.beginPath();
      ctx.arc(a.x-190,y-90,7,0,Math.PI*2);
      ctx.fill();

      h.drawText(ctx,a.label,a.x,y-55,22,"#a5aec1",700);
      const value=i===2?(a.value*t).toFixed(1)+"%":h.formatMoney(a.value*t,"₹");
      h.drawText(ctx,value,a.x,y+45,44,"#ffffff",850);
      h.drawText(ctx,"FINANCIAL OVERVIEW",a.x,y+105,14,"#657087",600);
    });

    h.drawText(ctx,"A CLEARER VIEW OF PERFORMANCE",960,920,20,"#8994aa",600);
  }
};
