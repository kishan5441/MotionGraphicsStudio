export default {
  id:"isometric-ledger",
  name:"Isometric Ledger",
  description:"A minimal isometric finance structure built from layered geometric blocks.",
  duration:8,
  defaults:{
    title:"THE BUSINESS ENGINE",
    income:800,
    costs:460,
    profit:340,
    accent:"#72c7b1"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE BUSINESS ENGINE"},
    {key:"income",label:"Income",type:"number",default:800,min:0,max:10000,step:10},
    {key:"costs",label:"Costs",type:"number",default:460,min:0,max:10000,step:10},
    {key:"profit",label:"Profit",type:"number",default:340,min:0,max:10000,step:10},
    {key:"accent",label:"Accent",type:"color",default:"#72c7b1"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(p);

    function cube(x,y,w,depth,height,color){
      ctx.fillStyle=color;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+w,y-depth/2);
      ctx.lineTo(x+w,y-depth/2+height);
      ctx.lineTo(x,y+height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle="rgba(255,255,255,.16)";
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+w,y-depth/2);
      ctx.lineTo(x+w+depth/2,y);
      ctx.lineTo(x+depth/2,y+depth/2);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle="rgba(0,0,0,.22)";
      ctx.beginPath();
      ctx.moveTo(x+depth/2,y+depth/2);
      ctx.lineTo(x+w+depth/2,y);
      ctx.lineTo(x+w+depth/2,y+height);
      ctx.lineTo(x+depth/2,y+height+depth/2);
      ctx.closePath();
      ctx.fill();
    }

    const base=760;
    cube(450,base,350,100,Math.max(10,260*t),"#3e8c85");
    cube(800,base-90,350,100,Math.max(10,200*t),"#557caa");
    cube(1150,base-180,350,100,Math.max(10,310*t),s.accent);

    h.drawText(ctx,"REVENUE",600,880,22,"#a9b6c9",700);
    h.drawText(ctx,s.income.toLocaleString("en-IN"),600,920,35,"#ffffff",800);
    h.drawText(ctx,"COSTS",960,790,22,"#a9b6c9",700);
    h.drawText(ctx,s.costs.toLocaleString("en-IN"),960,830,35,"#ffffff",800);
    h.drawText(ctx,"PROFIT",1320,700,22,"#a9b6c9",700);
    h.drawText(ctx,s.profit.toLocaleString("en-IN"),1320,740,35,s.accent,800);
  }
};
