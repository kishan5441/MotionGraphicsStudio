
import {drawBackground,drawHeading,drawCard,drawText,formatMoney,easeOut,roundedRect} from "../../engine/helpers.js";

export default {
 id:"revenue-counter",
 name:"Revenue Counter",
 description:"A cinematic financial count-up animation.",
 duration:6,

 defaults:{
  eyebrow:"BUSINESS BREAKDOWN",
  heading:"Monthly Revenue",
  subtitle:"A small business example",
  amount:78000,
  currency:"₹",
  caption:"Illustrative figures only",
  accent:"#a78bfa",
  background:"#0b1020",
  style:"glow"
 },

 controls:[
  {key:"eyebrow",label:"Small label",type:"text",default:"BUSINESS BREAKDOWN"},
  {key:"heading",label:"Main heading",type:"text",default:"Monthly Revenue"},
  {key:"subtitle",label:"Subtitle",type:"text",default:"A small business example"},
  {key:"amount",label:"Revenue amount",type:"number",default:78000,min:0},
  {key:"currency",label:"Currency",type:"select",default:"₹",options:[
   {label:"Indian Rupee ₹",value:"₹"},
   {label:"US Dollar $",value:"$"},
   {label:"Euro €",value:"€"},
   {label:"Pound £",value:"£"}
  ]},
  {key:"caption",label:"Bottom caption",type:"text",default:"Illustrative figures only"},
  {key:"accent",label:"Accent color",type:"color",default:"#a78bfa"},
  {key:"background",label:"Background",type:"color",default:"#0b1020"},
  {key:"style",label:"Number style",type:"select",default:"glow",options:[
   {label:"Glow",value:"glow"},
   {label:"Clean",value:"clean"},
   {label:"Impact",value:"impact"}
  ]}
 ],

 render(ctx,p,s,h){
  const {W,H}=h;
  h.drawBackground(ctx,p,s,W,H);
  h.drawHeading(ctx,h.easeOut(p*2),s,W);

  const t=h.easeOut(Math.max(0,Math.min(1,(p-.12)/.72)));
  const slide=(1-h.easeOut(p))*45;

  h.drawCard(ctx,360,470,1200,390,s.accent);

  ctx.save();
  ctx.globalAlpha=t;
  h.drawText(ctx,"TOTAL REVENUE",W/2,565,23,"#aab6cc",800);

  const amount=(Number(s.amount)||0)*t;
  const value=h.formatMoney(amount,s.currency);

  if(s.style==="glow"){
   ctx.shadowColor=s.accent;
   ctx.shadowBlur=55;
  }
  h.drawText(ctx,value,W/2,700+slide,105,"#ffffff",900);
  ctx.shadowBlur=0;

  h.roundedRect(ctx,570,790,780,9,5,"#29364d");
  h.roundedRect(ctx,570,790,780*t,9,5,s.accent);

  h.drawText(ctx,s.caption,W/2,830,19,"#8f9db5",500);
  ctx.restore();

  if(s.style==="impact"){
   ctx.save();
   ctx.globalAlpha=t;
   ctx.strokeStyle=s.accent;
   ctx.lineWidth=3;
   ctx.beginPath();
   ctx.arc(W/2,700,155+90*t,0,Math.PI*2);
   ctx.stroke();
   ctx.restore();
  }
 }
};
