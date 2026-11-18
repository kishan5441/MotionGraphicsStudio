export default {
  id:"dot-matrix-wealth",
  name:"Dot Matrix Wealth",
  description:"A modern dot-matrix wealth visualization with a growing data field.",
  duration:8,
  defaults:{
    title:"WEALTH IS BUILT",
    value:72,
    accent:"#67e8c0"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"WEALTH IS BUILT"},
    {key:"value",label:"Progress %",type:"number",default:72,min:0,max:100,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#67e8c0"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawText(ctx,s.title,960,210,52,"#ffffff",850);

    const cols=35,rows=15;
    const gap=37;
    const sx=960-(cols-1)*gap/2;
    const sy=430;

    const total=Math.round(cols*rows*s.value/100*h.easeOut(p));
    for(let i=0;i<cols*rows;i++){
      const col=i%cols,row=Math.floor(i/cols);
      const x=sx+col*gap,y=sy+row*gap;
      const active=i<total;

      ctx.fillStyle=active?s.accent:"rgba(148,163,184,.16)";
      ctx.beginPath();
      ctx.arc(x,y,active?7:4,0,Math.PI*2);
      ctx.fill();
    }

    h.drawText(ctx,Math.round(s.value*h.easeOut(p))+"%",960,1040,76,s.accent,900);
  }
};
