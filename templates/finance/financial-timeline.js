export default {
  id:"financial-timeline",
  name:"Financial Timeline",
  description:"A clean horizontal timeline for business and financial milestones.",
  duration:9,
  defaults:{
    title:"THE JOURNEY OF WEALTH",
    first:"START",
    second:"INVEST",
    third:"GROW",
    fourth:"FREEDOM",
    accent:"#80d9ba"
  },
  controls:[
    {key:"title",label:"Heading",type:"text",default:"THE JOURNEY OF WEALTH"},
    {key:"first",label:"Stage 1",type:"text",default:"START"},
    {key:"second",label:"Stage 2",type:"text",default:"INVEST"},
    {key:"third",label:"Stage 3",type:"text",default:"GROW"},
    {key:"fourth",label:"Stage 4",type:"text",default:"FREEDOM"},
    {key:"accent",label:"Accent",type:"color",default:"#80d9ba"}
  ],
  render(ctx,p,s,h){
    const {W,H}=h;
    ctx.fillStyle="#f3f1eb";
    ctx.fillRect(0,0,W,H);

    h.drawText(ctx,s.title,960,220,47,"#202624",850);

    const labels=[s.first,s.second,s.third,s.fourth];
    const xs=[300,720,1140,1560];
    const t=h.easeOut(p);

    ctx.strokeStyle="#d5d8d1";
    ctx.lineWidth=7;
    ctx.beginPath();
    ctx.moveTo(xs[0],590);
    ctx.lineTo(xs[3],590);
    ctx.stroke();

    ctx.strokeStyle=s.accent;
    ctx.beginPath();
    ctx.moveTo(xs[0],590);
    ctx.lineTo(xs[0]+(xs[3]-xs[0])*t,590);
    ctx.stroke();

    labels.forEach((label,i)=>{
      const active=t>=i/3;
      const x=xs[i];
      ctx.fillStyle=active?s.accent:"#d5d8d1";
      ctx.beginPath();
      ctx.arc(x,590,active?24:17,0,Math.PI*2);
      ctx.fill();

      h.drawText(ctx,"0"+(i+1),x,490,19,"#8b938c",700);
      h.drawText(ctx,label,x,690,26,"#242a27",850);
      h.drawText(ctx,active?"MILESTONE":"UP NEXT",x,735,14,"#818981",600);
    });

    h.drawText(ctx,"EVERY FINANCIAL JOURNEY STARTS SOMEWHERE",960,930,18,"#777f78",700);
  }
};
