<template>
  <div>
    <canvas @mousemove="setView"></canvas>
  </div>
</template>
<script>
import $$ from "image2d";
let secpainter, layer;
export default {
  props: ["value"],
  data() {
    return {};
  },
  methods: {
    doDraw() {
      let painter = layer.painter("mycanvas");

      painter.config({
        strokeStyle: "black",
        fillStyle: "blue",
        lineWidth: 2
      });

      let data = this.value;
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }

      let start = 0;
      for (let i = 0; i < data.length; i++) {
        let svg = data[i] / sum;
        
        let deg = Math.PI * 2 * svg;

        let theta=deg+start;

        painter
        .fillArc(500, 500, 0, 300, start, deg)
        //.strokeArc(500, 500, 0, 300, start, deg)
        

        painter.beginPath()
        .moveTo(500,500)
        .lineTo(500+300*Math.cos(theta),500+300*Math.sin(theta))
        .stroke()

        start += deg;
      }

      layer.update();
    },
    setView(event) {
      secpainter.clearRect();
      let position = $$("canvas").position(event);
      let x=position.x;
      let y= position.y;
       if (
        (position.x - 500) * (position.x - 500) +
          (position.y - 500) * (position.y - 500) <
        350 * 350
      ) {
         
        
      let data = this.value;
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }

      let start = 0;
      for (let i = 0; i < data.length; i++) {
        let svg = data[i] / sum;
        let deg = Math.PI * 2 * svg;
        let theta=deg/2+start;
        if(theta>start&&theta<deg){
         secpainter.beginPath()
        .moveTo(500,500)
        .lineTo(500+350*Math.cos(theta),500+350*Math.sin(theta))
        .stroke()
        }
        
        start += deg;
      }
        
        
       
      }

      layer.update();
    }
  },
  mounted: function() {
    let size = 1000;
    layer = $$("canvas")
      .attr({
        width: size,
        height: size
      })
      .layer();
    this.doDraw();

    secpainter = layer.painter("sec-view");
  }
};
</script>