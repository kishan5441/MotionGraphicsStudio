export default {
  id:"budget-pie-explosion",
  name:"Budget Pie Explosion",
  description:"An exploded 3D-inspired budget allocation pie chart.",
  duration:8,
  defaults:{
    title:"HOW YOUR MONEY IS SPENT",
    housing:40,
    food:25,
    savings:20,
    other:15,
    accent:"#a78bfa"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"HOW YOUR MONEY IS SPENT"},
    {key:"housing",label:"Housing %",type:"number",default:40,min:0,max:100,step:1},
    {key:"food",label:"Food %",type:"number",default:25,min:0,max:100,step:1},
    {key:"savings",label:"Savings %",type:"number",default:20,min:0,max:100,step:1},
    {key:"other",label:"Other %",type:"number",default:15,min:0,max:100,step:1},
    {key:"accent",label:"Accent",type:"color",default:"#a78bfa"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    h.drawBackground(ctx,p,s,W,H);
    h.drawHeading(ctx,Math.min(1,p*2),s,W);

    const values=[
      {n:"HOUSING",v:s.housing,c:"#8b5cf6"},
      {n:"FOOD",v:s.food,c:"#38bdf8"},
      {n:"SAVINGS",v:s.savings,c:"#22c55e"},
      {n:"OTHER",v:s.other,c:"#f59e0b"}
    ];

    const total=values.reduce((a,b)=>a+Math.max(0,b.v),0)||1;
    let angle=-Math.PI/2;

    const cx=960,cy=610,r=240;
    const progress=h.easeOut(p);

    values.forEach((v,i)=>{
      const sweep=Math.PI*2*Math.max(0,v.v)/total;
      const mid=angle+sweep/2;
      const explode=35*progress;
      const ox=Math.cos(mid)*explode;
      const oy=Math.sin(mid)*explode;

      ctx.save();
      ctx.translate(ox,oy);

      ctx.fillStyle=v.c;
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,angle,angle+sweep*progress);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle="#0f172a";
      ctx.lineWidth=5;
      ctx.stroke();

      ctx.restore();

      const lx=cx+Math.cos(mid)*340;
      const ly=cy+Math.sin(mid)*340;

      h.drawText(ctx,v.n,lx,ly,23,v.c,800);
      h.drawText(ctx,v.v+"%",lx,ly+35,25,"#ffffff",700);

      angle+=sweep;
    });

    h.drawText(ctx,"BUDGET ALLOCATION",960,950,24,"#94a3b8",700);
  }
};
