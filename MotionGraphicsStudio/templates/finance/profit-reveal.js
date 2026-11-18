
export default {
 id:"profit-reveal",
 name:"Profit Reveal",
 description:"Reveal revenue, expenses and the final profit.",
 duration:7,

 defaults:{
  eyebrow:"THE BUSINESS MATH",
  heading:"Where Does The Money Go?",
  subtitle:"Understanding a business's monthly numbers",
  revenue:78000,
  expenses:53200,
  currency:"₹",
  caption:"Example figures · Before tax",
  accent:"#35d39a",
  background:"#0b1020"
 },

 controls:[
  {key:"eyebrow",label:"Small label",type:"text",default:"THE BUSINESS MATH"},
  {key:"heading",label:"Main heading",type:"text",default:"Where Does The Money Go?"},
  {key:"subtitle",label:"Subtitle",type:"text",default:"Understanding monthly numbers"},
  {key:"revenue",label:"Revenue",type:"number",default:78000,min:0},
  {key:"expenses",label:"Expenses",type:"number",default:53200,min:0},
  {key:"currency",label:"Currency",type:"select",default:"₹",options:[
   {label:"INR ₹",value:"₹"},{label:"USD $",value:"$"},
   {label:"EUR €",value:"€"},{label:"GBP £",value:"£"}
  ]},
  {key:"caption",label:"Caption",type:"text",default:"Example figures · Before tax"},
  {key:"accent",label:"Profit color",type:"color",default:"#35d39a"},
  {key:"background",label:"Background",type:"color",default:"#0b1020"}
 ],

 render(ctx,p,s,h){
  const {W,H}=h;
  h.drawBackground(ctx,p,s,W,H);
  h.drawHeading(ctx,h.easeOut(p*2),s,W);

  const revenue=Math.max(0,Number(s.revenue)||0);
  const expenses=Math.max(0,Number(s.expenses)||0);
  const profit=revenue-expenses;
  const max=Math.max(revenue,expenses,1);
  const reveal=h.easeOut(Math.max(0,Math.min(1,(p-.12)/.75)));

  h.drawCard(ctx,230,465,1460,430,s.accent);

  const items=[
   {label:"REVENUE",value:revenue,color:"#6ca8ff"},
   {label:"EXPENSES",value:expenses,color:"#f4a261"},
   {label:"PROFIT",value:profit,color:s.accent}
  ];

  items.forEach((item,i)=>{
   const x=475+i*485;
   const local=h.easeOut(Math.max(0,Math.min(1,(p-.16-i*.09)/.55)));

   ctx.save();
   ctx.globalAlpha=local;
   h.drawText(ctx,item.label,x,560,22,"#aab6cc",800);

   const val=h.formatMoney(item.value*local,s.currency);
   h.drawText(ctx,val,x,665,43,item.color,900);

   h.roundedRect(ctx,x-145,745,290,13,7,"#29364d");
   h.roundedRect(ctx,x-145,745,290*(item.value/max)*local,13,7,item.color);
   ctx.restore();
  });

  h.drawText(ctx,s.caption,W/2,835,18,"#8f9db5",500);

  if(p>.78){
   const end=h.easeOut((p-.78)/.22);
   ctx.save();
   ctx.globalAlpha=end;
   h.drawText(ctx,profit>=0?"OPERATING SURPLUS":"OPERATING LOSS",W/2,965,19,s.accent,800);
   ctx.restore();
  }
 }
};
