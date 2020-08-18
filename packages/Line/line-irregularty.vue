<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
export default {
  props: ["value"],
  mounted() {
    let painter = $$("canvas")
      .attr({
        width: 1000,
        height: 1000
      })
      .painter();

    painter.config({
      strokeStyle: "gray",
      fillStyle: "blue",
      lineWidth: 2
    });

    for (let i = 0; i < 5; i++) {
        
      if (i >= 4) {
        painter.config({
          strokeStyle: "black"
        });
      } else {
        painter.config({
          strokeStyle: "pink"
        });
      }
      painter.strokeCircle(500, 500, 70 + 70 * i);
    }
//画出横纵坐标轴
    painter.beginPath()
    .moveTo(150,500)
    .lineTo(850,500)
    .moveTo(500,150)
    .lineTo(500,850)
    .config({
        strokeStyle:"gray"
    })
    .stroke()
    
    for(let i=0;i<12;i++){
        let x= 500+350*Math.cos(Math.PI/6+Math.PI/6*i);
        let y= 500-350*Math.sin(Math.PI/6+Math.PI/6*i);
        painter.beginPath()
        .moveTo(500,500)
        .lineTo(x,y)
        .stroke()
    }

    for(let i=1;i<=350;i++){
        let r =i;
        let pai=Math.PI;
        let angel = pai/4.5+((pai*25)/(180*350))*i;
        let x=500+r*Math.cos(angel);
        let y=500-r*Math.sin(angel);
        painter.strokeCircle(x,y,0.5);
    }

    for(let i=1;i<=350;i++){
        let r =i;
        let pai=Math.PI;
        let angel = pai/4.5+((pai*25)/(180*350))*i;
        let x=500+r*Math.sin(angel);
        let y=500-r*Math.cos(angel);
        painter.strokeCircle(x,y,0.5);
    }

    for(let i=1;i<=350;i++){
        let r =i;
        let pai=Math.PI;
        let angel = pai/360.5+((pai*25)/(180*350))*(Math.sin(i/400*pai/4)*4)*i;
        let x=500+r*Math.sin(angel);
        let y=500-r*Math.cos(angel);
        painter.strokeCircle(x,y,0.5);
    }

    for(let i=1;i<=350;i++){
        let pai=Math.PI;
        let r =i;
        let angel=0;
        angel+=pai/700;
        let t=Math.sin(angel);
        r=Math.sqrt(t*t+angel*angel);
        let ll = pai/360.5+((pai*25)/(180*350))*i;
        let x=500+r*Math.cos(ll);
        let y=500-r*Math.sin(ll);
        painter.strokeCircle(x,y,0.5);
    }
    
    

  }
};
</script>