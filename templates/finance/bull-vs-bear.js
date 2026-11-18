export default {
  id:"bull-vs-bear",
  name:"Bull vs Bear",
  description:"A dramatic market battle between bullish and bearish forces.",
  duration:7,
  defaults:{
    title:"BULLS VS BEARS",
    bull:"BULLISH",
    bear:"BEARISH",
    accent:"#22c55e"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"BULLS VS BEARS"},
    {key:"bull",label:"Bull Label",type:"text",default:"BULLISH"},
    {key:"bear",label:"Bear Label",type:"text",default:"BEARISH"},
    {key:"accent",label:"Bull Color",type:"color",default:"#22c55e"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const t=h.easeOut(Math.min(1,p*1.5));
    const center=960;
    const left=300+t*150;
    const right=1620-t*150;

    function animal(x,y,color,flip){
      ctx.save();
      ctx.translate(x,y);
      ctx.scale(flip?-1:1,1);

      ctx.fillStyle=color;
      ctx.beginPath();
      ctx.ellipse(0,0,135,90,0,0,Math.PI*2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(105,-35,58,0,Math.PI*2);
      ctx.fill();

      ctx.strokeStyle=color;
      ctx.lineWidth=22;
      ctx.lineCap="round";

      ctx.beginPath();
      ctx.moveTo(80,-75);
      ctx.quadraticCurveTo(35,-160,5,-105);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(125,-75);
      ctx.quadraticCurveTo(165,-150,185,-100);
      ctx.stroke();

      ctx.restore();
    }

    animal(left,580,s.accent,false);
    animal(right,580,"#ef4444",true);

    const clash=Math.sin(p*Math.PI*3)*25;
    h.drawText(ctx,"VS",center+clash,580,100,"#ffffff",900);

    h.drawText(ctx,s.bull,400,790,40,s.accent,900);
    h.drawText(ctx,s.bear,1520,790,40,"#ef4444",900);

    const power=Math.round(50+50*Math.sin(p*Math.PI));
    h.drawText(ctx,p<.5?"BUYING PRESSURE":"SELLING PRESSURE",960,900,27,"#cbd5e1",700);
    h.drawText(ctx,power+"%",960,970,55,"#ffffff",900);
  }
};
