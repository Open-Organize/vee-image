<template>
  <div>
    <button @click="change(),loveview()">所以爱会变的对吗</button>
    <button @click="disappear(),loveview()">不，爱还会消失</button>
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
// 初始化图层和画布宽高以及随机色
let layer, color;
let width = 520;
let height = 520;
// 存随机色
let colorArray = $$.getRandomColors(1000);
export default {
  props: ["value"],
  methods: {
    loveview() {
      //   debugger;
      let painter = layer.painter("digit");
      let R = width / 20 - 1;
      for (let i = 0; i < this.value.length; i++) {
        for (let j = 0; j < this.value[i].length; j++) {
          // 遍历每一个查看值是否需要画小圆圈
          if (this.value[i][j] == 1) {
            painter
              .config("fillStyle", color)
              .fillCircle(
                j * 2 * (R + 1) + (R + 1),
                i * 2 * (R + 1) + (R + 1),
                R
              );
          }
        }
        layer.update();
      }
    },
    change() {
      color = "green";
    },
    disappear() {
      color = "white";
    },
  },
  watch: {
    value: "loveview",
    immediate: true,
  },
  mounted: function () {
    color = "pink";
    layer = $$("canvas")
      .attr({
        width: width,
        height: height,
      })
      .layer();
    this.loveview();
  },
};
</script>

<style scoped>
div {
  display: inline-block;
}
button {
  color: green;
}
</style>