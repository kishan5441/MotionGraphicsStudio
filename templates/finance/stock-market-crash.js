export default {
  id:"stock-market-crash",
  name:"Stock Market Crash",
  description:"A dramatic falling market animation with bold typography and impact effects.",
  duration:7,
  defaults:{
    title:"MARKET CRASH",
    loss:25,
    index:"MARKET INDEX",
    accent:"#ef4444"
  },
  controls:[
    {key:"title",label:"Main Heading",type:"text",default:"MARKET CRASH"},
    {key:"loss",label:"Market Fall %",type:"number",default:25,min:1,max:90,step:1},
    {key:"index",label:"Index Label",type:"text",default:"MARKET INDEX"},
    {key:"accent",label:"Accent",type:"color",default:"#ef4444"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);

    const t=h.easeOut(p);
    const shake=(p>.35&&p<.75)?Math.sin(p*100)*12:0;

    ctx.save();
    ctx.translate(shake,0);

    ctx.fillStyle="rgba(239,68,68,.07)";
    ctx.fillRect(0,0,W,H);

    const points=[];
    for(let i=0;i<=30;i++){
      const x=200+i*50;
      const trend=i/30;
      const drop=trend*trend*260*t;
      const noise=Math.sin(i*3.1)*35*t;
      points.push({x,y:390+noise+drop});
    }

    ctx.beginPath();
    points.forEach((v,i)=>{
      if(i===0)ctx.moveTo(v.x,v.y);
      else ctx.lineTo(v.x,v.y);
    });

    ctx.strokeStyle=s.accent;
    ctx.lineWidth=9;
    ctx.lineJoin="round";
    ctx.stroke();

    const last=points[points.length-1];

    ctx.fillStyle=s.accent;
    ctx.beginPath();
    ctx.arc(last.x,last.y,17,0,Math.PI*2);
    ctx.fill();

    ctx.restore();

    const scale=1+Math.max(0,1-p*2)*.35;
    ctx.save();
    ctx.translate(960,680);
    ctx.scale(scale,scale);
    h.drawText(ctx,s.title,0,0,100,"#ffffff",1000);
    ctx.restore();

    h.drawText(ctx,"-"+(s.loss*t).toFixed(1)+"%",960,820,85,s.accent,900);
    h.drawText(ctx,s.index,960,930,26,"#94a3b8",700);
  }
};
