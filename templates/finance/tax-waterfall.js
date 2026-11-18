export default {
  id:"tax-waterfall",
  name:"Tax Waterfall",
  description:"A flowing waterfall-style breakdown of income, taxes and take-home pay.",
  duration:8,
  defaults:{
    title:"WHERE DOES YOUR MONEY GO?",
    income:1200000,
    tax:180000,
    accent:"#38bdf8"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"WHERE DOES YOUR MONEY GO?"},
    {key:"income",label:"Annual Income",type:"number",default:1200000,min:10000,max:100000000,step:10000},
    {key:"tax",label:"Annual Tax",type:"number",default:180000,min:0,max:10000000,step:10000},
    {key:"accent",label:"Accent",type:"color",default:"#38bdf8"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const net=s.income-s.tax;
    const t=h.easeOut(p);

    const bars=[
      {name:"GROSS INCOME",v:s.income,c:"#22c55e"},
      {name:"TAX",v:s.tax,c:"#ef4444"},
      {name:"TAKE HOME",v:net,c:s.accent}
    ];

    const max=Math.max(s.income,1);
    const base=800;
    const bw=230;
    const xs=[400,845,1290];

    bars.forEach((b,i)=>{
      const bh=Math.max(5,Math.abs(b.v)/max*360*t);
      ctx.fillStyle=b.c;
      h.roundedRect(ctx,xs[i],base-bh,bw,bh,18,b.c);

      h.drawText(ctx,b.name,xs[i]+bw/2,base+55,22,"#cbd5e1",800);
      h.drawText(ctx,h.formatMoney(b.v,"₹"),xs[i]+bw/2,base-bh-35,30,"#ffffff",800);
    });

    ctx.setLineDash([10,12]);
    ctx.strokeStyle="#64748b";
    ctx.lineWidth=3;

    ctx.beginPath();
    ctx.moveTo(630,500);
    ctx.lineTo(845,620);
    ctx.moveTo(1075,620);
    ctx.lineTo(1290,500);
    ctx.stroke();
    ctx.setLineDash([]);

    h.drawText(ctx,"YOUR NET INCOME",960,950,25,"#94a3b8",700);
    h.drawText(ctx,h.formatMoney(net,"₹"),960,1010,45,s.accent,900);
  }
};
