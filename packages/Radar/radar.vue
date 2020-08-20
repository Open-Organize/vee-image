<template>
  <div :value="value">
    <canvas></canvas>
  </div>
</template>
<script>
import $$ from "image2d";
let layer;
let per = [];
export default {
  props: ["value"],
  methods: {
    paint() {
      let painter = layer.painter("radar");
      //算出每个数据在对应线上所占用的百分比
      for (let i = 0; i < this.value.datalist.length; i++) {
        per.push(this.calcper(i));
      }
     
//画出雷达图的边框
      for (let i = 5; i > 0; i--) {
        painter
          .beginPath()
          .config({
            lineWidth: 1,
            strokeStyle: "#dbdbdb",
          })
          .moveTo(500, 500 - 40 * i);
        for (let j = 0; j <= 6; j++) {
          //连线
          painter.lineTo(
            500 + 40 * Math.sin((Math.PI / 3) * j) * i,
            500 - 40 * Math.cos((Math.PI / 3) * j) * i
          );
        }
        //填充颜色以及画线
        painter
          .config({
            fillStyle: i % 2 != 0 ? "#e6e6e6" : "#f5f5f5",
          })
          .fill()
          .stroke();
      }
      //画出雷达图中的数据线
      for (let i = 0; i < 6; i++) {
        painter
          .beginPath()
          .config({
            lineWidth: 1,
            strokeStyle:'#bbbbbb'
          })
          .moveTo(500, 500)
          .lineTo(
            500 + Math.cos(((i * 60 + 30) / 180) * Math.PI) * 200,
            500 + Math.sin(((i * 60 + 30) / 180) * Math.PI) * 200
          )
          .stroke();
      }
      layer.update();
      // debugger;
    },
    secview() {},
    calcper(i) {
      return this.value.datalist[i] / this.value.maxlist[i];
    },
  },
  mounted: function () {
    let size = 1000;
    layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();
    this.paint();
  },
};
</script>