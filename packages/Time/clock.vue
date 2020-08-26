<template>
  <div>
    页面
    <canvas></canvas>
  </div>
</template>
<script>
let layer, r;
let colorArray = $$.getRandomColors(1000);
let balls = [];
import $$ from "image2d";
export default {
  props: ["value"],
  methods: {
    drawDigit(x, y, num, painter) {
      //循环数字的数量
      for (let i = 0; i < this.value[num].length; i++) {
        //循环填充数字
        for (let j = 0; j < this.value[num][i].length; j++) {
          if (this.value[num][i][j] == 1) {
            painter
              .config({
                fillStyle: colorArray[(Math.random() * 1000).toFixed(0)],
              })
              .fillCircle(
                x + j * 2 * (r + 1) + r + 1,
                y + i * 2 * (r + 1) + r + 1,
                r
              );
          }
        }
      }
      layer.update();
    },
    drawclock() {
      let painter = layer.painter("clock");
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();
      let left = 60;
      let top = 30;
      painter.clearRect();
      $$.animation(
        () => {
          //将时间画出来
          this.drawDigit(left, top, parseInt(hours / 10), painter);

          this.drawDigit(
            left + 15 * (r + 1),
            top,
            parseInt(hours % 10),
            painter
          );

          this.drawDigit(left + 15 * (r + 1) * 2, top, 10, painter);

          this.drawDigit(
            left + 15 * (r + 1) * 3,
            top,
            parseInt(minutes / 10),
            painter
          );

          this.drawDigit(
            left + 15 * (r + 1) * 4,
            top,
            parseInt(minutes % 10),
            painter
          );

          this.drawDigit(left + 15 * (r + 1) * 5, top, 10, painter);

          this.drawDigit(
            left + 15 * (r + 1) * 6,
            top,
            parseInt(seconds / 10),
            painter
          );

          this.drawDigit(
            left + 15 * (r + 1) * 7,
            top,
            parseInt(seconds % 10),
            painter
          );
        },
        1000,
        () => {
          this.drawclock();
        }
      );
      layer.update();
      // debugger
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
    r = 5;
    this.drawclock();
  },
};
</script>
<style lang="scss" scoped>
</style>