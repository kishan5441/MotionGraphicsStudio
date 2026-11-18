export default {
  id:"kinetic-statement",
  name:"Kinetic Statement",
  description:"Oversized animated financial typography with precise editorial motion.",
  duration:7,
  defaults:{
    title:"THINK LONG TERM",
    subtitle:"SHORT TERM NOISE. LONG TERM VALUE.",
    accent:"#f0c674"
  },
  controls:[
    {key:"title",label:"Main Statement",type:"text",default:"THINK LONG TERM"},
    {key:"subtitle",label:"Supporting Line",type:"text",default:"SHORT TERM NOISE. LONG TERM VALUE."},
    {key:"accent",label:"Accent",type:"color",default:"#f0c674"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#f4f1e9";
    ctx.fillRect(0,0,W,H);

    const words=s.title.split(" ");
    const t=h.easeOut(p);

    h.drawText(ctx,"A FINANCIAL PERSPECTIVE",150,160,20,"#77736b",700,"left");

    words.forEach((word,i)=>{
      const delay=i*.12;
      const a=h.easeOut(Math.max(0,Math.min(1,(p-delay)/.55)));
      const y=430+i*125+(1-a)*100;
      h.drawText(ctx,word,150,y,112,i===words.length-1?s.accent:"#171717",900,"left");
    });

    ctx.fillStyle=s.accent;
    ctx.fillRect(150,900,600*t,8);
    h.drawText(ctx,s.subtitle.toUpperCase(),150,970,22,"#55524c",700,"left");
  }
};
