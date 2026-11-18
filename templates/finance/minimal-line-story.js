export default {
  id:"minimal-line-story",
  name:"Minimal Line Story",
  description:"A refined editorial line chart with progressive data storytelling.",
  duration:8,
  defaults:{
    title:"A DECADE OF GROWTH",
    start:100,
    end:460,
    accent:"#a6e3c5"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"A DECADE OF GROWTH"},
    {key:"start",label:"Starting Value",type:"number",default:100,min:0,max:10000,step:10},
    {key:"end",label:"Ending Value",type:"number",default:460,min:0,max:10000,step:10},
    {key:"accent",label:"Line Color",type:"color",default:"#a6e3c5"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#111820";
    ctx.fillRect(0,0,W,H);

    h.drawText(ctx,s.title,220,180,43,"#f2f4f7",800,"left");
    h.drawText(ctx,"INDEXED PERFORMANCE",220,225,18,"#7f8b9a",600,"left");

    const x=240,y=400,w=1450,hh=400;
    ctx.strokeStyle="rgba(255,255,255,.09)";
    ctx.lineWidth=2;

    for(let i=0;i<5;i++){
      ctx.beginPath();
      ctx.moveTo(x,y+i*hh/4);
      ctx.lineTo(x+w,y+i*hh/4);
      ctx.stroke();
    }

    const points=[];
    for(let i=0;i<=40;i++){
      const t=i/40;
      points.push({
        x:x+w*t,
        y:y+hh-(.12+.78*t+Math.sin(i*.8)*.04)*hh
      });
    }

    const count=Math.floor(points.length*h.easeOut(p));
    ctx.beginPath();
    points.slice(0,Math.max(1,count)).forEach((v,i)=>{
      if(i===0)ctx.moveTo(v.x,v.y);
      else ctx.lineTo(v.x,v.y);
    });
    ctx.strokeStyle=s.accent;
    ctx.lineWidth=6;
    ctx.lineJoin="round";
    ctx.stroke();

    if(count>0){
      const q=points[Math.min(count-1,40)];
      ctx.fillStyle=s.accent;
      ctx.beginPath();
      ctx.arc(q.x,q.y,11,0,Math.PI*2);
      ctx.fill();
    }

    h.drawText(ctx,"2016",x,860,19,"#7f8b9a",600,"left");
    h.drawText(ctx,"2026",x+w,860,19,"#7f8b9a",600,"right");
    h.drawText(ctx,String(Math.round(s.start+(s.end-s.start)*h.easeOut(p))),1450,350,55,s.accent,800,"right");
  }
};
