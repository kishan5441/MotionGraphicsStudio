export default {
  id:"parallax-layers",
  name:"Parallax Layers",
  description:"Multi-layer financial landscape with smooth parallax depth.",
  duration:9,
  defaults:{
    title:"THE ECONOMIC LANDSCAPE",
    label1:"CONSUMPTION",
    label2:"INVESTMENT",
    label3:"GROWTH",
    accent:"#a7c9e8"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE ECONOMIC LANDSCAPE"},
    {key:"label1",label:"Layer 1",type:"text",default:"CONSUMPTION"},
    {key:"label2",label:"Layer 2",type:"text",default:"INVESTMENT"},
    {key:"label3",label:"Layer 3",type:"text",default:"GROWTH"},
    {key:"accent",label:"Accent",type:"color",default:"#a7c9e8"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#e9eef0";
    ctx.fillRect(0,0,W,H);

    h.drawText(ctx,s.title,960,160,40,"#24313c",850);

    const t=h.easeOut(p);
    const layers=[
      {y:470,amp:65,speed:1,color:"#c5d8df",label:s.label1},
      {y:610,amp:85,speed:1.7,color:"#8daebc",label:s.label2},
      {y:760,amp:110,speed:2.5,color:"#426d82",label:s.label3}
    ];

    layers.forEach((a,i)=>{
      ctx.beginPath();
      ctx.moveTo(0,H);
      for(let x=0;x<=W;x+=15){
        const y=a.y+Math.sin(x*.004+p*4*a.speed)*a.amp*t;
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,H);
      ctx.closePath();
      ctx.fillStyle=a.color;
      ctx.fill();

      h.drawText(ctx,a.label,1450-i*170,a.y-55,20,i===2?"#ffffff":"#405362",800);
    });

    h.drawText(ctx,"ECONOMIC FORCES SHAPE THE FUTURE",960,1000,18,"#53636b",700);
  }
};
