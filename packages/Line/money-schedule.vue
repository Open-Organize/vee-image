<template>
  <div @mouseup="viewshow()">
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
let backpainter, owavepainter, iwavepainter;
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
        .bezierCurveTo(
          // rate > 0.5 ? 1 - rate : rate是用来控制波动大小的，为了好看，0-0.5和0.5-1取对称
          endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * deep,
          beginPoint[1] + 300 * deep * help * (rate > 0.5 ? 1 - rate : rate),
          endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * (1 + deep),
          beginPoint[1] -
            300 * (1 - deep) * help * (rate > 0.5 ? 1 - rate : rate),

          // 上面是第一和第二个看着点，最后这个是终点，加上画笔开始位置作为起点
          beginPoint[0],
          beginPoint[1]
        )
        .fill();
    },
    //   绘制完整的两条波浪
    fullWave(painter1, painter2, rate, deep) {
      painter1.clearRect();
      painter2.clearRect();
      var help = 1;
      if (deep > 0.5) {
        deep = deep - 0.5;
        help = -1;
      } else {
        deep = deep * 2;
      }
      //   绘制内弧
      
      this.drawerWave(painter1.config("fillStyle", "black"), rate, deep, help);
      //   绘制外弧
      
      // this.drawerWave(painter2.config("fillStyle", "pink"), rate, deep, -help);
    },
    // 启动动画
    rendarWave(painter1, painter2, rate, layer) {
      $$.animation(
        (deep) => {
          this.fullWave(painter1, painter2, rate, deep);
        },
        2000,
        () => {
          this.rendarWave(painter1, painter2, rate, layer);
        }
      );
    },
    viewshow() {
      // 进度条
      let rate = 0.5;
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
      let owavepainter = layer.painter("owave-view");
      let iwavepainter = layer.painter("iwave-view");
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
          this.fullWave(owavepainter, iwavepainter, rate * deep, deep);
        },
        2000,
        (deep) => {
          // 启动
          this.rendarWave(owavepainter, iwavepainter, rate, layer);
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

    let owavepainter = layer.painter("owave-view");
    let iwavepainter = layer.painter("iwave-view");
  },
};
</script>

<style>
</style>