export default {
  id:"floating-glass-cards",
  name:"Floating Glass Cards",
  description:"Floating translucent financial cards with subtle depth and staggered movement.",
  duration:8,
  defaults:{
    title:"A NEW WAY TO INVEST",
    first:"EQUITY",
    second:"BONDS",
    third:"CASH",
    accent:"#9b9cff"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"A NEW WAY TO INVEST"},
    {key:"first",label:"First Asset",type:"text",default:"EQUITY"},
    {key:"second",label:"Second Asset",type:"text",default:"BONDS"},
    {key:"third",label:"Third Asset",type:"text",default:"CASH"},
    {key:"accent",label:"Accent",type:"color",default:"#9b9cff"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#121827";
    ctx.fillRect(0,0,W,H);

    const t=h.easeOut(p);
    h.drawText(ctx,s.title,960,180,43,"#ffffff",800);

    const cards=[
      {x:510,y:560,label:s.first,color:"#8c9cff",angle:-.08},
      {x:960,y:520,label:s.second,color:"#68d6c0",angle:0},
      {x:1410,y:560,label:s.third,color:"#e6b978",angle:.08}
    ];

    cards.forEach((a,i)=>{
      const lift=(1-t)*180+i*18;
      ctx.save();
      ctx.translate(a.x,a.y+lift);
      ctx.rotate(a.angle);

      ctx.shadowColor="rgba(0,0,0,.3)";
      ctx.shadowBlur=35;
      ctx.fillStyle="rgba(255,255,255,.09)";
      h.roundedRect(ctx,-185,-140,370,280,26,"rgba(255,255,255,.09)");
      ctx.restore();

      ctx.save();
      ctx.translate(a.x,a.y+lift);
      ctx.rotate(a.angle);
      ctx.strokeStyle="rgba(255,255,255,.18)";
      ctx.lineWidth=2;
      h.roundedRect(ctx,-185,-140,370,280,26,"rgba(255,255,255,.01)");
      ctx.stroke();

      ctx.fillStyle=a.color;
      ctx.beginPath();
      ctx.arc(-125,-80,9,0,Math.PI*2);
      ctx.fill();

      h.drawText(ctx,"ASSET CLASS",0,-70,17,"#98a5b9",700);
      h.drawText(ctx,a.label,0,25,39,"#ffffff",900);
      h.drawText(ctx,"PORTFOLIO COMPONENT",0,90,14,"#718097",600);
      ctx.restore();
    });

    h.drawText(ctx,"DIVERSIFICATION BY DESIGN",960,900,20,"#8995a9",700);
  }
};
