<template>
  <div ref="mycanvas" class="canvas-view" :value="value">
    <canvas @mousemove="secView"></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
let layer, secpainter;
export default {
  props: ["value"],
  methods: {
    viewshow() {
      let size = 800;
      let painter = layer.painter("firview").config({
        lineWidth: 1,
        fillStyle: "pink",
        strokeStyle: "black",
      });
      // 画圆形刻度尺
      painter.strokeCircle(size / 2, size / 2, size / 2 - 200);
      // .config({ textAlign: "center" });
      for (let i = 0; i < 12; i++) {
        let y = $$.rotate(
          size / 2,
          size / 2,
          (Math.PI * 2 * i) / 12,
          size - 200,
          size / 2
        );
        let y_y = $$.rotate(
          size / 2,
          size / 2,
          (Math.PI * 2 * (i + 6)) / 12,
          size - 200,
          size / 2
        );
        let yy = $$.rotate(
          size / 2,
          size / 2,
          (Math.PI * 2 * i) / 12,
          size - 180,
          size / 2
        );
        let yyy = $$.rotate(
          size / 2,
          size / 2,
          (Math.PI * 2 * i) / 12,
          size - 160,
          size / 2
        );

        painter
          //   数字
          .config({
            lineWidth: 1,
            fillStyle: "pink",
            strokeStyle: "black",
          })
          .fillText(i * 30, yyy[0], yyy[1])
          // 刻度
          .moveTo(y[0], y[1])
          .lineTo(yy[0], yy[1])
          .stroke()
          // 绘制灰色实线
          .config({
            lineWidth: 0.2,
            strokeStyle: "gray",
          })
          .moveTo(y[0], y[1])
          .lineTo(y_y[0], y_y[1])
          .stroke();
      }
      // 绘制水平刻度尺
      painter
        .config({
          lineWidth: 1,
          strokeStyle: "black",
        })
        .beginPath()
        .moveTo(size / 2, size / 2)
        .lineTo(600, size / 2)
        .stroke();
      let rules = ["0", "2", "4", "6", "8", "10"];
      painter.config({
        "font-size": 12,
        textAlign: "center",
      });
      for (let i = 0; i < rules.length; i++) {
        painter
          // 数字
          .fillText(rules[i], size / 2 + i * 40, size / 2 - 15)
          // 刻度
          .beginPath()
          .moveTo(size / 2 + i * 40, size / 2)
          .lineTo(size / 2 + i * 40, size / 2 - 10)
          .stroke();
      }
      //   绘制灰色内圈
      for (let i = 1; i < 5; i++) {
        painter
          .config({
            lineWidth: 0.2,
            strokeStyle: "gray",
          })
          .strokeCircle(size / 2, size / 2, i * 40);
      }
      //   绘制心型线的点
      let heartlist = [];
      for (let i = 0; i < 101; i++) {
        let theta = (i / 101) * 2 * Math.PI;
        let r = 100 * (1 + Math.sin((theta / Math.PI) * Math.PI));
        heartlist.push([
          r * Math.cos(theta) + size / 2,
          r * Math.sin(theta) + size / 2,
        ]);
        painter
          .config({
            lineWidth: 1,
            strokeStyle: "red",
          })
          .strokeCircle(
            r * Math.cos(theta) + size / 2,
            r * Math.sin(theta) + size / 2,
            2
          );
      }
      //将所有的点连起来
      for (let i = 1; i < heartlist.length; i++) {
        painter
          .beginPath()
          .config({
            strokeStyle: "#ba16d5",
            lineWidth: 1,
          })
          .moveTo(heartlist[i - 1][0], heartlist[i - 1][1])
          .lineTo(heartlist[i][0], heartlist[i][1])
          .stroke();
      }
      painter
        .beginPath()
        .moveTo(heartlist[100][0], heartlist[100][1])
        .lineTo(heartlist[0][0], heartlist[0][1])
        .stroke();
      layer.update();
    },
    secView(event) {
      //下面的代码可能是这个导致代码运行时越来越卡
      // let secpainter = layer.painter("sec-view");
      secpainter.clearRect();
      let position = $$("canvas").position(event);
      let x = position.x;
      let y = position.y;

      if (
        (position.x - 400) * (position.x - 400) +
          (position.y - 400) * (position.y - 400) <
        200 * 200
      ) {
        let r = Math.sqrt(
          (position.x - 400) * (position.x - 400) +
            (position.y - 400) * (position.y - 400)
        );
        let theta;
        if (position.y > 400 && position.x < 400) {
          theta = Math.atan((position.y - 400) / (position.x - 400)) + Math.PI;
        } else if (position.y < 400 && position.x < 400) {
          theta = Math.atan((position.y - 400) / (position.x - 400)) + Math.PI;
        } else if (position.y < 400 && position.x > 400) {
          theta =
            Math.atan((position.y - 400) / (position.x - 400)) + Math.PI * 2;
        } else {
          theta = Math.atan((position.y - 400) / (position.x - 400));
        }
        secpainter
          // 绘制悬浮直线和悬浮虚线圆
          .config("strokeStyle", "gray")
          .beginPath()
          .config({
            strokeStyle: "pink",
            lineWidth: 3,
            lineDash: [],
          })
          .moveTo(400, 400)
          .lineTo(400 + Math.cos(theta) * 200, 400 + Math.sin(theta) * 200)
          .stroke()
          .config({
            lineDash: [5, 5],
            strokeStyle: "gray",
          })
          .strokeCircle(400, 400, r)
          // 绘制水平刻度值
          .config("fillStyle", "#000")
          .fillRect(380 + r, 370, 40, 20)
          .config("fillStyle", "#fff")
          .fillText((r / 20).toFixed(3), 380 + r, 380)
          //绘制角度刻度值
          .config({
            fillStyle: "#277eab3d",
          })
          .fillRect(
            400 + Math.cos(theta) * 200,
            400 + Math.sin(theta) * 200,
            60,
            30
          )
          .config({
            fillStyle: "white",
          })
          .fillText(
            ((theta / (Math.PI * 2)) * 360).toFixed(3),
            400 + Math.cos(theta) * 200,
            398 + Math.sin(theta) * 200 + 20
          )
          .config({
            fillStyle: "#a427ab61",
          })
          .fillRect(x, y, 100, 30)
          .config({
            fillStyle: "green",
          })
          .fillText(`x:${x},y:${y.toFixed(0)}`, x + 15, y + 15);
        for (let i = 0; i < 101; i++) {
          let theta1 = (i / 101) * 2 * Math.PI;
          if (theta1 != theta) {
          } else {
            debugger;
            let r1 = 100 * (1 + Math.sin((theta1 / Math.PI) * Math.PI));
            secpainter
              .config({
                lineWidth: 1,
                strokeStyle: "black",
                lineDash: [],
              })
              .strokeCircle(
                r1 * Math.cos(theta1) + 800 / 2,
                r1 * Math.sin(theta1) + 800 / 2,
                5
              );
          }
        }
      }
      layer.update();
    },
  },
  mounted: function () {
    let size = 800;
    layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();
    this.viewshow();
    secpainter = layer.painter("sec-view");
  },
};
</script>

<style>
</style>