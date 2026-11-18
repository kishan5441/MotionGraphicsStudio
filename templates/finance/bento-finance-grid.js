export default {
  id:"bento-finance-grid",
  name:"Bento Finance Grid",
  description:"A modern bento-grid financial dashboard with staggered metric reveals.",
  duration:8,
  defaults:{
    title:"YOUR FINANCIAL SNAPSHOT",
    balance:1250000,
    income:180000,
    savings:35,
    accent:"#a5b4fc"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"YOUR FINANCIAL SNAPSHOT"},
    {key:"balance",label:"Net Worth",type:"number",default:1250000,min:0,max:100000000,step:10000},
    {key:"income",label:"Monthly Income",type:"number",default:180000,min:0,max:10000000,step:1000},
    {key:"savings",label:"Savings Rate %",type:"number",default:35,min:0,max:100,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#a5b4fc"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#111821";
    ctx.fillRect(0,0,W,H);
    h.drawText(ctx,s.title,960,170,40,"#f8fafc",800);

    const t=h.easeOut(p);
    const tiles=[
      {x:250,y:300,w:700,ht:300,label:"NET WORTH",value:h.formatMoney(s.balance*t,"₹"),color:"#222e3b"},
      {x:990,y:300,w:680,ht:300,label:"MONTHLY INCOME",value:h.formatMoney(s.income*t,"₹"),color:"#243b3b"},
      {x:250,y:630,w:420,ht:230,label:"SAVINGS RATE",value:(s.savings*t).toFixed(0)+"%",color:"#35314b"},
      {x:710,y:630,w:960,ht:230,label:"FINANCIAL MOMENTUM",value:"BUILDING",color:"#303849"}
    ];

    tiles.forEach((a,i)=>{
      const delay=i*.1;
      const v=h.easeOut(Math.max(0,Math.min(1,(p-delay)/.55)));
      const y=a.y+(1-v)*90;

      ctx.fillStyle=a.color;
      h.roundedRect(ctx,a.x,y,a.w,a.ht,25,a.color);

      ctx.fillStyle=i===2?s.accent:"#a5b4fc";
      h.roundedRect(ctx,a.x+28,y+28,8,48,4,i===2?s.accent:"#a5b4fc");

      h.drawText(ctx,a.label,a.x+60,y+62,18,"#a9b5c4",700,"left");
      h.drawText(ctx,a.value,a.x+60,y+a.ht-55,i===0?52:42,"#ffffff",850,"left");

      if(i===3){
        for(let j=0;j<8;j++){
          const bh=(35+j*12)*v;
          ctx.fillStyle=s.accent;
          h.roundedRect(ctx,a.x+520+j*43,y+160-bh,18,bh,6,s.accent);
        }
      }
    });
  }
};
