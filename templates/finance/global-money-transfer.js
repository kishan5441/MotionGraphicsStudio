export default {
  id:"global-money-transfer",
  name:"Global Money Transfer",
  description:"A global finance transfer animation with moving money along a curved route.",
  duration:9,
  defaults:{
    title:"MONEY MOVES THE WORLD",
    amount:50000,
    from:"INDIA",
    to:"UNITED STATES",
    accent:"#38bdf8"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"MONEY MOVES THE WORLD"},
    {key:"amount",label:"Transfer Amount",type:"number",default:50000,min:100,max:10000000,step:100},
    {key:"from",label:"From Country",type:"text",default:"INDIA"},
    {key:"to",label:"To Country",type:"text",default:"UNITED STATES"},
    {key:"accent",label:"Accent",type:"color",default:"#38bdf8"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const left={x:350,y:620};
    const right={x:1570,y:620};

    ctx.strokeStyle="#334155";
    ctx.lineWidth=4;

    for(let i=0;i<8;i++){
      ctx.beginPath();
      ctx.ellipse(960,600,350+i*45,130+i*22,0,0,Math.PI*2);
      ctx.stroke();
    }

    ctx.fillStyle="#22c55e";
    ctx.beginPath();
    ctx.arc(left.x,left.y,80,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#2563eb";
    ctx.beginPath();
    ctx.arc(right.x,right.y,80,0,Math.PI*2);
    ctx.fill();

    h.drawText(ctx,"IN",left.x,left.y+15,45,"#ffffff",900);
    h.drawText(ctx,"OUT",right.x,right.y+15,38,"#ffffff",900);

    ctx.beginPath();
    ctx.moveTo(left.x,left.y-100);
    ctx.bezierCurveTo(650,180,1250,180,right.x,right.y-100);
    ctx.strokeStyle=s.accent;
    ctx.lineWidth=7;
    ctx.stroke();

    const t=(p*1.5)%1;
    const x=left.x+(right.x-left.x)*t;
    const y=520-360*Math.sin(t*Math.PI);

    ctx.fillStyle=s.accent;
    ctx.beginPath();
    ctx.arc(x,y,20,0,Math.PI*2);
    ctx.fill();

    h.drawText(ctx,s.from,left.x,770,25,"#ffffff",800);
    h.drawText(ctx,s.to,right.x,770,25,"#ffffff",800);

    h.drawText(ctx,h.formatMoney(s.amount,"₹"),960,900,55,"#ffffff",900);
    h.drawText(ctx,"INTERNATIONAL TRANSFER",960,960,22,"#94a3b8",700);
  }
};
