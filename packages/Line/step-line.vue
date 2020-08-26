<template>
  <div>
    <canvas></canvas>
  </div>
</template>
<script>
//导入image2d
import $$ from "image2d";
export default {
  props: ["value", "list"],
  methods: {
    paint() {
      //创建画笔和设置画布大小
      let painter = $$("canvas")
        .attr({
          width: 800,
          height: 800,
        })
        .painter();
      //下面一周的标记
      let week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      for (let i = 0; i <= 6; i++) {
        //画出刻度的度数
        painter
          .fillText(600 - i * 100, 0, 10 + i * 100)
          .fillText("" + week[i], 75 + 100 * i, 635);
        //画出刻度线
        painter
          .beginPath()
          .moveTo(40 + 100 * i, 610)
          .lineTo(40 + 100 * i, 620)
          .moveTo(740, 610)
          .lineTo(740, 620)
          .moveTo(30, 10 + 100 * i)
          .lineTo(40, 10 + 100 * i)
          .stroke();
      }
      //画出X轴和Y轴
      painter
        .config({
          strokeStyle: "black",
        })
        .beginPath()
        .moveTo(40, 10)
        .lineTo(40, 610)
        .moveTo(40, 610)
        .lineTo(740, 610)
        .stroke();
      //画出数据点
      let data = this.value;
      let fir = [];
      fir = data[0];
      let sec = [];
      sec = data[1];
      let thir = [];
      thir = data[2];
      //画第一条线先横线后竖线
      for (let i = 0; i < fir.length; i++) {
        painter.config({strokeStyle:"black"}).strokeCircle(i * 100 + 70, 510 - 500 * (fir[i] / 1500), 2);
        if (i > 0) {
          //将点连接到一起
          painter
            .beginPath()
            .moveTo((i - 1) * 100 + 70, 510 - fir[i - 1] / 3)
            .lineTo(i * 100 + 70, 510 - fir[i - 1] / 3)
            .lineTo(i * 100 + 70, 510 - fir[i] / 3)
            .stroke();
        }
      }
      //画第二条线先竖线后横线
      for (let i = 0; i < sec.length; i++) {
        painter.config({strokeStyle:"black"}).strokeCircle(i * 100 + 70, 510 - 500 * (sec[i] / 1500), 2);
        if (i > 0) {
          //将点连接到一起
          painter
            .beginPath()
            .config({
                strokeStyle:"aqua"
            })
            .moveTo((i - 1) * 100 + 70, 510 - sec[i - 1] / 3)
            .lineTo((i - 1) * 100 + 70, 510 - sec[i] / 3)
            .lineTo(i * 100 + 70, 510 - sec[i] / 3)
            .stroke();
        }
      }
      //画第三条线
      for (let i = 0; i < thir.length; i++) {
        painter.config({strokeStyle:"black"}).strokeCircle(i * 100 + 70, 510 - 500 * (thir[i] / 1500), 2);
        if (i > 0) {
          //将点连接到一起
          painter
            .beginPath()
            .config({
                strokeStyle:'blue',
                lineDash:[10,10]
            })
            .moveTo((i - 1) * 100 + 70, 510 - thir[i - 1] / 3)
            .lineTo(i * 100-50 + 70, 510 - thir[i - 1] / 3)
            .lineTo(i * 100-50 + 70, 510 - thir[i] / 3)
            .lineTo(i * 100 + 70, 510 - thir[i] / 3)
            .stroke();
        }
      }
    },
  },
  mounted: function () {
    this.paint();
  },
};
</script>