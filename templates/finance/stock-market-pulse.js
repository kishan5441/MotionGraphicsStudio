export default {
  id:"stock-market-pulse",
  name:"Stock Market Pulse",
  description:"A cinematic animated stock market candlestick chart.",
  duration:8,
  defaults:{
    title:"MARKET MOVEMENT",
    symbol:"NIFTY 50",
    start:22000,
    end:22850,
    accent:"#22c55e"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"MARKET MOVEMENT"},
    {key:"symbol",label:"Market",type:"text",default:"NIFTY 50"},
    {key:"start",label:"Starting Value",type:"number",default:22000,min:100,max:100000,step:100},
    {key:"end",label:"Ending Value",type:"number",default:22850,min:100,max:100000,step:100},
    {key:"accent",label:"Accent",type:"color",default:"#22c55e"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    h.drawText(ctx,s.symbol,250,300,36,"#94a3b8",800,"left");

    const x=250,y=390,w=1420,height=380;
    ctx.strokeStyle="#334155";
    ctx.lineWidth=2;

    for(let i=0;i<5;i++){
      ctx.beginPath();
      ctx.moveTo(x,y+i*height/4);
      ctx.lineTo(x+w,y+i*height/4);
      ctx.stroke();
    }

    const count=32;
    const visible=Math.floor(count*h.easeOut(p));
    const delta=s.end-s.start;

    for(let i=0;i<visible;i++){
      const t=i/(count-1);
      const base=s.start+delta*t;
      const noise=Math.sin(i*2.3)*Math.abs(delta)*.12;
      const open=base+noise;
      const close=base+Math.sin(i*1.8)*Math.abs(delta)*.08;
      const high=Math.max(open,close)+Math.abs(delta)*.035;
      const low=Math.min(open,close)-Math.abs(delta)*.035;
      const scale=v=>y+height-(v-s.start+Math.abs(delta)*.3)/(Math.abs(delta)*1.6)*height;

      const cx=x+i*43+8;
      const up=close>=open;
      ctx.strokeStyle=up?"#22c55e":"#ef4444";
      ctx.fillStyle=ctx.strokeStyle;
      ctx.lineWidth=4;

      ctx.beginPath();
      ctx.moveTo(cx,scale(high));
      ctx.lineTo(cx,scale(low));
      ctx.stroke();

      const top=Math.min(scale(open),scale(close));
      const bh=Math.max(8,Math.abs(scale(open)-scale(close)));
      ctx.fillRect(cx-10,top,20,bh);
    }

    const current=s.start+(s.end-s.start)*h.easeOut(p);
    h.drawText(ctx,h.formatMoney(current,"₹"),960,870,72,"#ffffff",900);
    h.drawText(ctx,"LIVE MARKET SIMULATION",960,940,20,"#64748b",600);
  }
};
