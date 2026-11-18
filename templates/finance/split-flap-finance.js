export default {
  id:"split-flap-finance",
  name:"Split-Flap Finance",
  description:"Mechanical airport-board inspired financial number reveal.",
  duration:7,
  defaults:{
    title:"MARKET OPEN",
    value:22850,
    prefix:"₹",
    accent:"#d8e4d5"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"MARKET OPEN"},
    {key:"value",label:"Number",type:"number",default:22850,min:0,max:10000000,step:10},
    {key:"prefix",label:"Prefix",type:"text",default:"₹"},
    {key:"accent",label:"Panel Color",type:"color",default:"#d8e4d5"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#121918";
    ctx.fillRect(0,0,W,H);

    h.drawText(ctx,s.title,960,260,36,"#aabbb2",800);

    const str=s.value.toLocaleString("en-IN");
    const chars=(s.prefix+str).split("");
    const total=chars.length;
    const cardW=Math.min(105,1250/total);
    const gap=12;
    const start=960-(total*(cardW+gap)-gap)/2;

    chars.forEach((ch,i)=>{
      const delay=i*.06;
      const a=h.easeOut(Math.max(0,Math.min(1,(p-delay)/.45)));
      const x=start+i*(cardW+gap);
      const y=480+(1-a)*100;

      ctx.fillStyle="#26332e";
      h.roundedRect(ctx,x,y,cardW,155,9,"#26332e");

      ctx.fillStyle="#1a2420";
      ctx.fillRect(x+3,y+76,cardW-6,3);

      h.drawText(ctx,ch,x+cardW/2,y+65,54,s.accent,900);
      h.drawText(ctx,ch,x+cardW/2,y+128,54,"#b8c8bf",900);

      ctx.strokeStyle="rgba(255,255,255,.08)";
      ctx.lineWidth=2;
      h.roundedRect(ctx,x,y,cardW,155,9,"rgba(0,0,0,0)");
      ctx.stroke();
    });

    h.drawText(ctx,"LIVE FINANCIAL INDICATOR",960,800,19,"#788c80",700);
    h.drawText(ctx,"MARKET / 01",960,900,17,"#52645a",600);
  }
};
