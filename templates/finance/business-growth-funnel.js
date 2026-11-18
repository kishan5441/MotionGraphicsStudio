export default {
  id:"business-growth-funnel",
  name:"Business Growth Funnel",
  description:"A perspective funnel showing how leads become paying customers.",
  duration:8,
  defaults:{
    title:"FROM LEADS TO REVENUE",
    leads:10000,
    customers:750,
    revenue:1500000,
    accent:"#06b6d4"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"FROM LEADS TO REVENUE"},
    {key:"leads",label:"Total Leads",type:"number",default:10000,min:1,max:1000000,step:100},
    {key:"customers",label:"Customers",type:"number",default:750,min:1,max:100000,step:10},
    {key:"revenue",label:"Revenue",type:"number",default:1500000,min:1000,max:100000000,step:1000},
    {key:"accent",label:"Accent",type:"color",default:"#06b6d4"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);
    const cx=960;
    const sections=[
      {label:"LEADS",value:s.leads,color:"#38bdf8",top:650,bottom:510,y:390},
      {label:"PROSPECTS",value:Math.round(s.leads*.35),color:"#818cf8",top:510,bottom:370,y:550},
      {label:"CUSTOMERS",value:s.customers,color:"#22c55e",top:370,bottom:230,y:710}
    ];

    sections.forEach((a,i)=>{
      const width=a.top*t;
      const bottomWidth=a.bottom*t;
      const y=a.y;

      ctx.beginPath();
      ctx.moveTo(cx-width/2,y);
      ctx.lineTo(cx+width/2,y);
      ctx.lineTo(cx+bottomWidth/2,y+130);
      ctx.lineTo(cx-bottomWidth/2,y+130);
      ctx.closePath();

      const grad=ctx.createLinearGradient(0,y,0,y+130);
      grad.addColorStop(0,a.color);
      grad.addColorStop(1,"#0f172a");

      ctx.fillStyle=grad;
      ctx.fill();

      ctx.strokeStyle="rgba(255,255,255,.3)";
      ctx.lineWidth=3;
      ctx.stroke();

      h.drawText(ctx,a.label,cx,y+55,25,"#ffffff",800);
      h.drawText(ctx,a.value.toLocaleString("en-IN"),cx,y+95,31,"#ffffff",900);
    });

    h.drawText(ctx,"CONVERSION TO REVENUE",960,900,24,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(s.revenue*t,"₹"),960,970,52,s.accent,900);
  }
};
