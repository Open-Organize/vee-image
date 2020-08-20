<template>
  <div>
    <canvas @mouseup="viewShow()"></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
export default {
  methods: {
    // 获取颜色
    getColor(value) {
      if (value <= 30) return "rgb(144,222,226)";
      else if (value > 70) return "rgb(223,144,226)";
      else return "rgb(236,166,178)";
    },
    viewShow() {
      let size = 800;
      let layer = $$("canvas")
        .attr({
          width: size,
          height: size,
        })
        .layer();
      // 绘制背景的画笔
      let bkpainter = layer.painter("back-view");
      // 绘制弧形刻度
      bkpainter.config("textAlign", "center");
      for (let i = 1; i <= 10; i++) {
        bkpainter.config("fillStyle", this.getColor(i * 10)).fillArc(
          size / 2,
          size / 2,
          size * 0.4,
          size * 0.5,
          // 大刻度
          (Math.PI / 8) * (i + 6),
          Math.PI / 8 - 0.015
        );
        for (let j = 1; j <= 4; j++) {
          bkpainter.config("fillStyle", "#fff").fillArc(
            size / 2,
            size / 2,
            size * 0.5 - 10,
            size * 0.5,
            //   小刻度
            (Math.PI / 8) * (i + 6) - 0.006 + (Math.PI / 40) * j,
            0.0066
          );
        }
      }
      for (let i = 1; i <= 11; i++) {
        bkpainter
          .config("fillStyle", this.getColor(i * 10))
          // 表盘刻度文字
          .fillText(
            (i - 1) * 10,
            ...$$.rotate(
              size / 2,
              size / 2,
              (Math.PI / 8) * (i + 6),
              size * 0.9 - 20,
              size / 2
            )
          );
      }
      bkpainter
        .config({
            "fillStyle":"black",
            'font-size':24
        })
        .fillText("完成率", size / 2, size / 4);
      layer.update();
    },
  },
  mounted: function () {
    this.viewShow();
  },
};
</script>

<style>
</style>