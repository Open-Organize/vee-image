<template>
  <div :value="value">
    <canvas @mousemove="secview"></canvas>
  </div>
</template>
<script>
import $$ from "image2d";
let sum, layer,sec;
let per = [];
export default {
  props: ["value"],
  methods: {
    paint() {
      let painter = layer.painter("pieview");
      //算出每个数据所占用的百分比
      for (let i = 0; i < this.value.length; i++) {
        per.push(this.calcper(i));
      }
      let color = ["#2ee547eb", "#e5d02eeb", "#61a0a8", "#a643ed", "#a94442"];
      //按照传入的每个数据所占的百分比生成扇图
      for (let i = 0; i < this.value.length; i++) {
        let x = 0;
        if (i > 0) {
          for (let j = 0; j < i; j++) {
            x += per[j];
          }
        }
        painter
          .config({
            fillStyle: "" + color[i] + "",
          })
          .fillArc(500, 500, 200, 350, 2 * x * Math.PI, 2 * Math.PI * per[i]);
      }
      layer.update();
    },
    secview(event) {
      //创建第二图层
      sec = layer.painter("sec-view");
      //将图层清空
      sec.clearRect();
      let position = $$("canvas").position(event);
      let x = position.x;
      let y = position.y;
      //将点与圆心进行比较判断
      if (
        (position.x - 500) * (position.x - 500) +
          (position.y - 500) * (position.y - 500) >
          200 * 200 &&
        (position.x - 500) * (position.x - 500) +
          (position.y - 500) * (position.y - 500) <
          350 * 350
      ) {
        let color = ["#2ee547eb", "#e5d02eeb", "#61a0a8", "#a643ed", "#a94442"];
        let theta;
        //分情况进行判断,算出角度的值
        if (position.y > 500 && position.x < 500) {
          theta = Math.atan((position.y - 500) / (position.x - 500)) + Math.PI;
        } else if (position.y < 500 && position.x < 500) {
          theta = Math.atan((position.y - 500) / (position.x - 500)) + Math.PI;
        } else if (position.y <= 500 && position.x >= 500) {
          theta =
            Math.atan((position.y - 500) / (position.x - 500)) + Math.PI * 2;
        } else {
          theta = Math.atan((position.y - 500) / (position.x - 500));
        }
        let optiontheta = [];
        let optioncolor = [
          "#2ee547eb",
          "#e5d02eeb",
          "#61a0a8",
          "#a643ed",
          "#a94442",
        ];
        //按照传入的每个数据所占的百分比算出其角度值范围
        for (let i = 0; i < this.value.length; i++) {
          let x = 0;
          if (i > 0) {
            for (let j = 0; j < i; j++) {
              x += per[j];
            }
            optiontheta.push([2 * Math.PI * x, 2 * Math.PI * (x + per[i])]);
          } else {
            optiontheta.push([0, 2 * Math.PI * per[i]]); 
          }
          
        }
        //悬浮的扇面变化
        for(let i =0;i<optiontheta.length;i++){
          let x = 0;
          if (i > 0) {
            for (let j = 0; j < i; j++) {
              x += per[j];
            }
          }
          if (theta > [i][0] && optiontheta[i][1] >= theta) {
              sec
                .config({
                  fillStyle: "" + optioncolor[i] + "",
                })
                .fillArc(
                  500,
                  500,
                  200,
                  400,
                  2 * Math.PI * x,
                  2 * Math.PI * per[i]
                );
              break;

            }
        }
      }
      //将图层更新到画布上
      layer.update();
      //在使用图层后将其删除  否则会不断的创建图层占用资源导致死机
      layer.delete('sec-view')
    },
    calcper(num) {
      sum = 0;
      for (let i = 0; i < this.value.length; i++) {
        sum += this.value[i];
      }
      return this.value[num] / sum;
    },
  },
  mounted: function () {
    let widthsize = 1000;
    let heightsize = 1000;
    layer = $$("canvas")
      .attr({
        width: widthsize,
        height: heightsize,
      })
      .layer();
    this.paint();
    
  },
};
</script>