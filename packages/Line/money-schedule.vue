<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
let layer, size;

import $$ from "image2d";
let colorArray = $$.getRandomColors(10000);
export default {
  methods: {
    /**
     * drawWave()用来绘制一条具体的wave
     * @param painter 传入的image2D的画笔
     * @param rate 比率
     * @param deep 动画进度
     * @param help wave的类型取值为1或-1即上下波开始的区别
     */
    drawWave(painter, rate, deep, help) {
      //半圆弧的起点
      let beginPoint = $$.rotate(
        size / 2,
        size / 2,
        (0.5 - rate) * Math.PI,
        size / 2 + 133,
        size / 2
      );
      //半圆弧的终点
      let endPoint = $$.rotate(
        size / 2,
        size / 2,
        (1.5 - rate) * Math.PI,
        size / 2 + 133,
        size / 2
      );
      //wave由波浪和半圆弧组成
      painter
        .beginPath()
        .moveTo(beginPoint[0], beginPoint[1])
        //绘制半圆弧
        .arc(
          size / 2,
          size / 2,
          133,
          (0.5 - rate) * Math.PI,
          2 * rate * Math.PI
        )
        //绘制波浪
        .bezierCurveTo(
          //下面为两个贝塞尔曲线的控制点
          endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * deep,
          beginPoint[1] + 200 * deep * help * (rate > 0.5 ? 1 - rate : rate),
          endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * (1 + deep),
          beginPoint[1] -
            200 * (1 - deep) * help * (rate > 0.5 ? 1 - rate : rate),
          // 上面是第一和第二个控制点，最后这个是终点，加上画笔开始位置作为起点
          beginPoint[0],
          beginPoint[1]
        )
        .fill();
    },
    /**
     * 画出完整的波浪
     * @param layer 传入的image2D的图层
     * @param rate 比率
     * @param deep 动画的进度
     * @param innerWave 内Wave的节点
     * @param outerWave 外Wave的节点
     */
    fullWave(layer, rate, deep, innerWave, outerWave) {
      innerWave.clearRect();
      outerWave.clearRect();
      let help = 1;
      if (deep > 0.5) {
        deep = deep - 0.5;
        help = -1;
      }
      deep *= 2;
      //画出内弧
      this.drawWave(
        innerWave.config(
          "fillStyle",
          colorArray[(Math.random() * 10000).toFixed(0)]
        ),
        rate,
        deep,
        help
      );
      //画出外弧
      this.drawWave(
        outerWave.config(
          "fillStyle",
          colorArray[(Math.random() * 10000).toFixed(0)]
        ),
        rate,
        deep,
        -help
      );
      layer.update();
    },
    /**
     * 启动动画的函数
     * @param layer 传入的image2D的图层
     * @param rate 比率
     * @param innerWave 内Wave的节点
     * @param outerWave 外Wave的节点
     * @param deep 动画进度
     */
    renderWave(layer, rate, innerWave, outerWave) {
      $$.animation(
        (deep) => {
          this.fullWave(layer, rate, deep, innerWave, outerWave);
        },
        5000,
        (deep) => {
          this.renderWave(layer, rate, innerWave, outerWave);
        }
      );
    },
    /**
     * 显示函数
     * 负责初始化画布
     */
    showView() {
      //进度条
      let rate = 0.5;
      //获取图层与画笔

      //准备好画动画的两个图层
      let innerWave = layer.painter("innerWave");
      // innerWave.config({
      //   fillStyle:'red'
      // })
      let outerWave = layer.painter("outerWave");
      let painter = layer.painter("mainview");
      // outerWave.config({
      //   fillStyle:'orange'
      // })
      painter
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
        .fillArc(size / 2, size / 2, size / 4, size / 3, 0, Math.PI * 2)
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
      //进度条动画
      $$.animation(
        (deep) => {
          // 根据进度rate更新弧度进度
          painter
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
          this.fullWave(
            layer,
            rate * deep,
            deep,
            innerWave.config(
              "fillStyle",
              colorArray[(Math.random() * 10000).toFixed(0)]
            ),
            outerWave.config(
              "fillStyle",
              colorArray[(Math.random() * 10000).toFixed(0)]
            )
          );
        },
        3000,
        (deep) => {
          //启动波浪动画
          this.renderWave(layer, rate, innerWave, outerWave);
        }
      );
    },
  },
  //   初始化视图和画布
  mounted: function () {
    size = 800;
    layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();
    this.showView();
  },
};
</script>

<style>
</style>