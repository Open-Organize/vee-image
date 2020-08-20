<template>
  <div @mouseup="viewshow()">
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
let backpainter, wavepainter;

export default {
  methods: {
    //   绘制具体的一条波浪
    drawerWave(painter, rate, deep, help) {
      let size = 800;
      // 半圆弧的起始点
      let beginPoint = $$.rotate(
        size / 2,
        size / 2,
        (0.5 - rate) * Math.PI,
        size / 2 + 133,
        size / 2
      );
      //   半圆弧的终点
      let endPoint = $$.rotate(
        size / 2,
        size / 2,
        (0.5 + rate) * Math.PI,
        size / 2 + 133,
        size / 2
      );
      //   wave是由半圆弧和波浪组成
      painter
        .moveTo(beginPoint[0], beginPoint[1])
        //   绘制半圆弧

        .arc(
          size / 2,
          size / 2,
          133,
          (0.5 - rate) * Math.PI,
          2 * rate * Math.PI
        )
        // 绘制波浪（该死的贝塞尔曲线）
        // .bezierCurveTo(
        //   endPoint[0] +
        //     deep * (beginPoint[0] - endPoint[0]) +
        //     (beginPoint[0] - endPoint[0]) / 2,
        //   endPoint[1] + 20,
        //   endPoint[0] + deep * (beginPoint[0] - endPoint[0]),
        //   endPoint[1] - 20,
        //   endPoint[0],
        //   endPoint[1]
        // )
        .fill();
    },
    //   绘制完整的两条波浪
    fullWave(painter, rate, deep) {
      var help = 1;
      if (deep > 0.5) {
        deep = deep - 0.5;
        help = -1;
      } else {
        deep = deep * 2;
      }
      //   绘制内弧
      this.drawerWave(painter.config("fillStyle", "red"), rate, deep, help);
      //   绘制外弧
      this.drawerWave(painter.config("fillStyle", "pink"), rate, deep, -help);
    },
    // 启动动画
    rendarWave(painter, rate, deep, layer, id) {
      $$.animation(
        (deep) => {
          painter.clearRect();
          this.fullWave(painter, rate, deep);
        },
        2000,
        () => {
          
          this.rendarWave(painter, rate, deep);
        }
      );
    },
    viewshow() {
      // 进度条

      let rate = 0.25;
      // 获取画布和画笔
      let size = 800;
      let help = -1;
      let layer = $$("canvas")
        .attr({
          width: size,
          height: size,
        })
        .layer();
      let backpainter = layer.painter("back-view");
      let wavepainter = layer.painter("wave-view");
      backpainter
        // 画三个外圆
        .config({
          lineWidth: 3,
          fillStyle: "#ff9800",
        })
        .fillArc(size / 2, size / 2, size / 6, size / 5, 0, Math.PI * 2)
        .config({
          lineWidth: 3,
          fillStyle: "#ff980075",
        })
        .fillArc(size / 2, size / 2, size / 5, size / 4, 0, Math.PI * 2)
        .config({
          lineWidth: 3,
          fillStyle: "#ff980021",
        })
        .fillArc(size / 2, size / 2, size / 4, size / 3, 0, Math.PI * 2);

      // 绘制三行文字
      backpainter
        .config({
          "font-size": 30,
          fillStyle: "gray",
          textAlign: "center",
        })
        .fillText("借钱", size / 2, size / 2 - 60)
        .config({
          "font-size": 40,
          fillStyle: "black",
          textAlign: "center",
        })
        .fillText("￥100,000,000,000", size / 2, size / 2)
        .config({
          "font-size": 30,
          fillStyle: "gray",
          textAlign: "center",
        })
        .fillText("总额度一个亿", size / 2, size / 2 + 60)
        // 配置进度条：
        .config({
          "arc-start-cap": "round",
          "arc-end-cap": "round",
        });

      // 绘制进度条并启动该动画
      $$.animation(
        (deep) => {
          // 根据进度rate更新弧度进度

          backpainter
            .config("fillStyle", "pink")
            .fillArc(
              size / 2,
              size / 2,
              size / 4,
              size / 3.5,
              -Math.PI / 2,
              -Math.PI * 2 * rate * deep
            );
          layer.update();
          // 初始化wave
          this.fullWave(wavepainter, rate * deep, deep);
        },
        2000,
        (deep) => {
          // 启动
          this.rendarWave(wavepainter, rate, deep);
        }
      );
    },
  },

  // 实时监听视图的变化
  watch: {
    value: "viewshow",
    immediate: true,
  },
  //   初始化视图和画布
  mounted: function () {
    let size = 800;
    this.viewshow();

    let layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();

    let wavepainter = layer.painter("wave-view");
  },
};
</script>

<style>
</style>