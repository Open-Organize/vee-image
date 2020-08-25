<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
let layer;
let size = 800;
let oldValue=0;
import $$ from "image2d";
export default {
  methods: {
    // 获取颜色
    getColor(value) {
      if (value <= 30) return "rgb(144,222,226)";
      else if (value > 70) return "rgb(223,144,226)";
      else return "rgb(236,166,178)";
    },
    // 绘制指针和数值变换图层
    drawpainter() {
      // 绘制数据的画笔
      let tepainter = layer.painter("text");
      // 绘制指针的画笔
      let popainter = layer.painter("pointer");
      let preValue = oldValue-0;
      // debugger
      let value = (Math.random() * 100).toFixed(2) ;
      oldValue = value-0;
      tepainter
        .clearRect()
        .config({
          fillStyle: this.getColor(value),
          textAlign: "center",
        })
        .fillText(value + "%", size / 2, size / 2 + 80);
      $$.animation(
        (deep) => {
          //  指针的颜色变化依赖值
          let val = preValue + deep * (value - preValue);
          // 旋转角度
          let cgdeg = (Math.PI / 8) * (7 + val / 10);
          // 定一个指针原点画指针
          popainter
            .clearRect()
            .beginPath()
            .config("fillStyle", this.getColor(val))
            .moveTo(
              ...$$.rotate(size / 2, size / 2, cgdeg, size / 2 - 25, size / 2)
            )
            .lineTo(
              ...$$.rotate(size / 2, size / 2, cgdeg, size / 2, size / 2 - 15)
            )
            .lineTo(
              ...$$.rotate(size / 2, size / 2, cgdeg, (size / 8) * 7, size / 2)
            )
            .lineTo(
              ...$$.rotate(size / 2, size / 2, cgdeg, size / 2, size / 2 + 15)
            )
            // .closePath()
            .fill()
            .config("fillStyle", "white")
            .fillCircle(size / 2, size / 2, 5);
          // 这里必须要更新到画布，不然指针颜色和进度颜色会不同步
          
          layer.update();
          // debugger
        },
        1000,
        () => {
          
          // preValue = value;
          this.drawpainter();
        }
      );
      layer.update();
      
    },
    viewShow() {
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
            0.006
          );
        }
      }
      // 绘制表盘刻度文字
      for (let i = 1; i <= 11; i++) {
        bkpainter
          .config("fillStyle", this.getColor(i * 10))

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
      // 倒立的完成率
      bkpainter
        .config({
          fillStyle: "black",
          "font-size": 24,
        })
        .fillText("完成率", size / 2, size / 4, Math.PI);
      // 启动指针动画
      this.drawpainter();
      layer.update();
    },
  },
  // 初始化图层对象
  mounted: function () {
    layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();
    this.viewShow();
  },
};
</script>

<style>
</style>