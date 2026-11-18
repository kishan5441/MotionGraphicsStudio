export default {
  id:"cash-flow-river",
  name:"Cash Flow River",
  description:"Animated streams of income, expenses and net cash flow.",
  duration:8,
  defaults:{
    title:"FOLLOW THE MONEY",
    income:150000,
    expenses:95000,
    accent:"#14b8a6"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"FOLLOW THE MONEY"},
    {key:"income",label:"Monthly Income",type:"number",default:150000,min:1000,max:10000000,step:1000},
    {key:"expenses",label:"Monthly Expenses",type:"number",default:95000,min:1000,max:10000000,step:1000},
    {key:"accent",label:"Accent",type:"color",default:"#14b8a6"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);
    const net=s.income-s.expenses;
    const mid=960;

    function stream(y,color,width,offset){
      ctx.beginPath();
      ctx.moveTo(160,y);
      ctx.bezierCurveTo(500,y+100,550,y-100,900,y);
      ctx.bezierCurveTo(1200,y+100,1300,y-100,1760,y+offset);
      ctx.lineWidth=width;
      ctx.strokeStyle=color;
      ctx.lineCap="round";
      ctx.stroke();
    }

    stream(440,"#22c55e",Math.max(8,s.income/8000),Math.sin(p*8)*40);
    stream(650,"#ef4444",Math.max(8,s.expenses/8000),Math.cos(p*8)*40);

    for(let i=0;i<24;i++){
      const x=(160+(i*85+p*500)%1600);
      const y=440+Math.sin(i+p*7)*30;
      ctx.fillStyle="#bbf7d0";
      ctx.beginPath();
      ctx.arc(x,y,5,0,Math.PI*2);
      ctx.fill();
    }

    h.drawText(ctx,"INCOME",260,360,26,"#22c55e",800);
    h.drawText(ctx,h.formatMoney(s.income,"₹"),260,400,36,"#ffffff",800);

    h.drawText(ctx,"EXPENSES",260,750,26,"#ef4444",800);
    h.drawText(ctx,h.formatMoney(s.expenses,"₹"),260,790,36,"#ffffff",800);

    h.drawCard(ctx,650,850,620,140,s.accent);
    h.drawText(ctx,"NET CASH FLOW",960,900,23,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(net*t,"₹"),960,960,48,net>=0?"#22c55e":"#ef4444",900);
  }
};
