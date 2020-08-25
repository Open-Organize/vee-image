<template>
  <div :value="value" ref="clock">
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
let layer;
export default {
  props: ["value"],
  methods: {
    digitRender(num) {
      let width = 1000;
      let height = 1000;
      let painter = layer.painter("digit");
      let R = height / 200 - 1;
      for (let i = 0; i < this.value[num].length; i++) {
        for (let j = 0; j < this.value[num][i].length; j++) {
          if (this.value[num][i][j] == 1) {
            painter
              .config("fillStyle", "pink")
              .fillCircle(
                j * 2 * (R + 1) + (R + 1) + num * (width / 12.5),
                i * 2 * (R + 1) + (R + 1),
                R
              );
          }
        }
        layer.update();
      }
    },
    viewShow() {
      for (let i = 0; i < 11; i++) {
        this.digitRender(i);
      }
    },
  },
  mounted: function () {
    let width = 1000;
    let height = 1000;
    layer = $$("canvas")
      .attr({
        width: width,
        height: height,
      })
      .layer();
    this.viewShow();
  },
};
</script>

<style>
</style>