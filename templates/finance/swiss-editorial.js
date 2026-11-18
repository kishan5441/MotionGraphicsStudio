export default {
  id:"swiss-editorial",
  name:"Swiss Editorial",
  description:"Minimal Swiss-style financial editorial with strong typographic hierarchy.",
  duration:7,
  defaults:{
    title:"MONEY\nIS A SYSTEM.",
    subtitle:"UNDERSTANDING THE ECONOMY",
    number:"01",
    accent:"#e84b3c"
  },
  controls:[
    {key:"title",label:"Main Typography",type:"text",default:"MONEY IS A SYSTEM."},
    {key:"subtitle",label:"Subtitle",type:"text",default:"UNDERSTANDING THE ECONOMY"},
    {key:"number",label:"Section Number",type:"text",default:"01"},
    {key:"accent",label:"Accent",type:"color",default:"#e84b3c"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#f1eee7";
    ctx.fillRect(0,0,W,H);

    const t=h.easeOut(p);
    ctx.fillStyle=s.accent;
    ctx.fillRect(125,125,12,900);

    h.drawText(ctx,"FINANCE / EXPLAINED",230,160,20,"#555555",700,"left");
    h.drawText(ctx,s.number,1690,180,110,s.accent,900);

    const words=s.title.split(" ");
    const visible=Math.max(1,Math.ceil(words.length*t));
    const line=words.slice(0,visible).join(" ");

    ctx.save();
    ctx.beginPath();
    ctx.rect(220,320,1450,430);
    ctx.clip();
    h.drawText(ctx,line,230,520,108,"#171717",900,"left");
    ctx.restore();

    ctx.fillStyle="#171717";
    ctx.fillRect(230,700,300*t,5);

    h.drawText(ctx,s.subtitle.toUpperCase(),230,810,28,"#444444",700,"left");
    h.drawText(ctx,"A VISUAL GUIDE TO MODERN MONEY",230,970,17,"#777777",600,"left");
    h.drawText(ctx,"MOTION / 2026",1680,970,17,"#777777",600,"right");
  }
};
