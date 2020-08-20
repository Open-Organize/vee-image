<template>
  <div>
    <canvas @mousemove="setView"></canvas>
    <!-- <input type="text" :value="value" ref="myinput" @input="doinit()"> -->
  </div>
</template>

<script>
let secpainter,layer;
import $$ from "image2d";
export default {

  methods: {
    doDraw() {
      let painter = layer.painter("mycanvas");
     

      painter.config({
        strokeStyle: "gray",
        fillStyle: "blue",
        lineWidth: 2
      });

      for (let i = 0; i < 5; i++) {
        if (i >= 4) {
          painter.config({
            strokeStyle: "black"
          });
        } else {
          painter.config({
            strokeStyle: "pink"
          });
        }
        painter.strokeCircle(500, 500, 70 + 70 * i);
      }
      //画出横纵坐标轴
      painter
        .beginPath()
        .moveTo(150, 500)
        .lineTo(850, 500)
        .moveTo(500, 150)
        .lineTo(500, 850)
        .config({
          strokeStyle: "gray"
        })
        .stroke();
      //画分割层
      for (let i = 0; i < 12; i++) {
        let x = 500 + 350 * Math.cos(Math.PI / 6 + (Math.PI / 6) * i);
        let y = 500 - 350 * Math.sin(Math.PI / 6 + (Math.PI / 6) * i);
        painter
          .beginPath()
          .moveTo(500, 500)
          .lineTo(x, y)
          .stroke();
      }

      //画刻度

      for (let i = 0; i < 360; i++) {
        let x = 500 + 350 * Math.cos(Math.PI / 180 + (Math.PI / 180) * i);
        let y = 500 - 350 * Math.sin(Math.PI / 180 + (Math.PI / 180) * i);
        // painter.beginPath()
        // .moveTo(500,500)
        // .lineTo(x,y)
        // .stroke()
      }
      //画花瓣
      for (let i = 1; i <= 350; i++) {
        let r = i;
        let pai = Math.PI;
        let angel = pai / 4.5 + ((pai * 25) / (180 * 350)) * i;
        let x = 500 + r * Math.cos(angel);
        let y = 500 - r * Math.sin(angel);
        painter.strokeCircle(x, y, 0.5);
      }

      for (let i = 1; i <= 350; i++) {
        let r = i;
        let pai = Math.PI;
        let angel = pai / 4.5 + ((pai * 25) / (180 * 350)) * i;
        let x = 500 + r * Math.sin(angel);
        let y = 500 - r * Math.cos(angel);
        painter.strokeCircle(x, y, 0.5);
      }

      for (let i = 1; i <= 350; i++) {
        let r = i;
        let pai = Math.PI;
        let angel =
          pai / 360.5 +
          ((pai * 25) / (180 * 350)) *
            (Math.sin(((i / 400) * pai) / 4) * 4) *
            i;
        let x = 500 + r * Math.sin(angel);
        let y = 500 - r * Math.cos(angel);
        painter.strokeCircle(x, y, 0.5);
      }

      for (let i = 1; i <= 350; i++) {
        let pai = Math.PI;
        let r = i;
        let angel = 0;
        angel += pai / 700;
        let t = Math.sin(angel);
        r = Math.sqrt(t * t + angel * angel);
        //let ll = pai/360.5+((pai*25)/(180*350))*i;
        let x = 500 + r * Math.cos(angel);
        let y = 500 - r * Math.sin(angel);
        painter.strokeCircle(x, y, 0.5);
      }

      layer.update();
    },

    setView(event) {
      secpainter.clearRect();
      let position = $$("canvas").position(event);
      let x = position.x;
      let y = position.y;
      
      if (
        (position.x - 500) * (position.x - 500) +
          (position.y - 500) * (position.y - 500) <
        350 * 350
      ) {
        let r = Math.sqrt(
          (position.x - 500) * (position.x - 500) +
            (position.y - 500) * (position.y - 500)
        );
        let theta;
        if (position.y > 500 && position.x < 500) {
          theta = Math.atan((position.y - 500) / (position.x - 500)) + Math.PI;
        } else if (position.y < 500 && position.x < 500) {
          theta = Math.atan((position.y - 500) / (position.x - 500)) + Math.PI;
        } else if (position.y < 500 && position.x > 500) {
          theta =
            Math.atan((position.y - 500) / (position.x - 500)) + Math.PI * 2;
        } else {
          theta = Math.atan((position.y - 500) / (position.x - 500));
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
          .moveTo(500, 500)
          .lineTo(500 + Math.cos(theta) * 350, 500 + Math.sin(theta) * 350)
          .stroke()
          .config({
            lineDash: [5, 5],
            strokeStyle: "gray",
          })
          .strokeCircle(500, 500, r)

          // 绘制水平刻度值
          .config("fillStyle", "#000")
          .fillRect(480 + r, 470, 40, 20)
          .config("fillStyle", "#fff")
          .fillText((r / 20).toFixed(3), 480 + r, 480)
          //绘制角度刻度值
          .config({
            fillStyle: "#277eab3d",
          })
          .fillRect(
            500 + Math.cos(theta) * 350,
            500 + Math.sin(theta) * 350,
            60,
            30
          )
          .config({
            fillStyle: "white",
          })
          .fillText(
            ((theta / (Math.PI * 2)) * 460).toFixed(3),
            500 + Math.cos(theta) * 350,
            498 + Math.sin(theta) * 350 + 20
          )
          .config({
            fillStyle: "#a427ab61",
          })
          .fillRect(x, y, 100, 30)
          .config({
            fillStyle: "green",
          })
          .fillText(`x:${x},y:${y.toFixed(0)}`, x + 15, y + 15);
        // for (let i = 0; i < 101; i++) {
        //   let theta1 = (i / 101) * 2 * Math.PI;
        //   if (theta1 != theta) {
        //   } else {
        //     debugger;
        //     let r1 = 100 * (1 + Math.sin((theta1 / Math.PI) * Math.PI));
        //     secpainter
        //       .config({
        //         lineWidth: 1,
        //         strokeStyle: "black",
        //         lineDash: [],
        //       }) 
        //       .strokeCircle(
        //         r1 * Math.cos(theta1) + 1000 / 2,
        //         r1 * Math.sin(theta1) + 1000 / 2,
        //         5
        //       );
        //   }
        // }
      }
      layer.update();
      
    }
  },
  mounted: function() {
     let size = 1000;
    layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();
        this.doDraw();

    secpainter = layer.painter("sec-view");
  }
};
</script>