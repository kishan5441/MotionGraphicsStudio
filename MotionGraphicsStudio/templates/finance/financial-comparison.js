
export default {
 id:"financial-comparison",
 name:"Financial Comparison",
 description:"Cinematic side-by-side financial comparison.",
 duration:6,

 defaults:{
  eyebrow:"SIDE BY SIDE",
  heading:"Two Different Numbers",
  subtitle:"Compare the financial outcomes",
  labelA:"OPTION A",
  labelB:"OPTION B",
  valueA:78000,
  valueB:53200,
  currency:"₹",
  caption:"Illustrative comparison",
  accent:"#a78bfa",
  background:"#0b1020"
 },

 controls:[
  {key:"eyebrow",label:"Small label",type:"text",default:"SIDE BY SIDE"},
  {key:"heading",label:"Main heading",type:"text",default:"Two Different Numbers"},
  {key:"subtitle",label:"Subtitle",type:"text",default:"Compare the financial outcomes"},
  {key:"labelA",label:"Left label",type:"text",default:"OPTION A"},
  {key:"valueA",label:"Left value",type:"number",default:78000,min:0},
  {key:"labelB",label:"Right label",type:"text",default:"OPTION B"},
  {key:"valueB",label:"Right value",type:"number",default:53200,min:0},
  {key:"currency",label:"Currency",type:"select",default:"₹",options:[
   {label:"INR ₹",value:"₹"},{label:"USD $",value:"$"},
   {label:"EUR €",value:"€"},{label:"GBP £",value:"£"}
  ]},
  {key:"caption",label:"Caption",type:"text",default:"Illustrative comparison"},
  {key:"accent",label:"Accent color",type:"color",default:"#a78bfa"},
  {key:"background",label:"Background",type:"color",default:"#0b1020"}
 ],

 render(ctx,p,s,h){
  const {W,H}=h;
  h.drawBackground(ctx,p,s,W,H);
  h.drawHeading(ctx,h.easeOut(p*2),s,W);

  const a=Math.max(0,Number(s.valueA)||0);
  const b=Math.max(0,Number(s.valueB)||0);
  const max=Math.max(a,b,1);
  const reveal=h.easeOut(Math.max(0,Math.min(1,(p-.12)/.75)));

  const cards=[
   {x:260,label:s.labelA,value:a,color:s.accent},
   {x:1010,label:s.labelB,value:b,color:"#f4a261"}
  ];

  cards.forEach((item)=>{
   const local=reveal;
   h.drawCard(ctx,item.x,485,650,370,item.color);

   ctx.save();
   ctx.globalAlpha=local;
   h.drawText(ctx,item.label,item.x+325,575,22,"#aab6cc",800);
   h.drawText(ctx,h.formatMoney(item.value*local,s.currency),item.x+325,685,52,item.color,900);

   h.roundedRect(ctx,item.x+105,770,440,12,6,"#29364d");
   h.roundedRect(ctx,item.x+105,770,440*(item.value/max)*local,12,6,item.color);
   ctx.restore();
  });

  ctx.save();
  ctx.globalAlpha=reveal;
  h.drawText(ctx,"VS",960,680,32,"#ffffff",900);
  h.drawText(ctx,s.caption,W/2,930,18,"#8f9db5",500);
  ctx.restore();
 }
};
