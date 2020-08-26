<template>
  <div>
    <h3>真不错</h3>
    <br />
    <br />
    <br />
    <br />
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
// 初始化图层和画布宽高以及随机色
let layer;
let width = 1000;
let height = 1000;

// 存随机色
let colorArray = $$.getRandomColors(1000);
// 用exec查找正则所匹配的时间数并存入数组
let temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
// 存时间
let data = [];
// 存要动的小球
let balls = [];
// 注意这里的temp[0]存的是当前时间
data.push(temp[1], temp[2], 10, temp[3], temp[4], 10, temp[5], temp[6]);
export default {
  props: ["value"],
  methods: {
    // 绘制数字点阵
    digitRender(index, num) {
      let painter = layer.painter("digit");
      let R = width / 200 - 1;
      for (let i = 0; i < this.value[num].length; i++) {
        for (let j = 0; j < this.value[num][i].length; j++) {
          // 遍历每一个查看值是否需要画小圆圈
          if (this.value[num][i][j] == 1) {
            painter
              .config(
                "fillStyle",
                colorArray[(Math.random() * 1000).toFixed(0)]
              )
              .fillCircle(
                j * 2 * (R + 1) + (R + 1) + index * (width / 12.5),
                i * 2 * (R + 1) + (R + 1),
                R
              );
          }
        }
        layer.update();
      }
    },
    // 更新时钟
    updateDigitTime() {
      // 用exec查找正则所匹配的时间数并存入数组
      let temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
      // 存新的时间
      let newdata = [];
      let changeNumArray = [];
      // 注意这里的temp[0]存的是当前时间
      newdata.push(
        temp[1],
        temp[2],
        10,
        temp[3],
        temp[4],
        10,
        temp[5],
        temp[6]
      );
      for (let i = data.length - 1; i >= 0; i--) {
        // 时间变化
        if (newdata[i] !== data[i]) {
          // 把变化的值和索引存在数组中
          changeNumArray.push(i + "_" + data[i]);
        }
      }
      //增加小球
      for (let i = 0; i < changeNumArray.length; i++) {
        this.addBalls(
          changeNumArray[i].split("_")[0],
          changeNumArray[i].split("_")[1]
        );
      }
      data = [].concat(newdata);
    },
    // 更新小球状态
    updateBalls() {
      let R = width / 200 - 1;
      for (let i = 0; i < balls.length; i++) {
        balls[i].stepY += balls[i].disY;
        balls[i].x += balls[i].stepX;
        balls[i].y += balls[i].stepY;
        if (balls[i].x > width || balls[i].y > height) {
          balls.splice(i, 1);
          i--;
        }
      }
    },
    // 增加要运动的小球
    addBalls(index, num) {
      let numArray = [1, 2, 3,4];
      let R = width / 200 - 1;
      for (let i = 0; i < this.value[num].length; i++) {
        for (let j = 0; j < this.value[num][i].length; j++) {
          if (this.value[num][i][j] == 1) {
            let ball = {
              x: j * 2 * (R + 1) + (R + 1) + index * (width / 12.5),
              y: i * 2 * (R + 1) + (R + 1),
              // xy轴的运动步长
              stepX: Math.floor(Math.random() * 4 - 2),
              stepY: -2 * numArray[Math.floor(Math.random() * numArray.length)],
              color: colorArray[(Math.random() * 1000).toFixed(0)],
              // y轴的变化值
              disY: 1,
            };
            balls.push(ball);
          }
        }
      }
    },
    // 画小球
    digitBall(i) {
      let rpainter = layer.painter("ball");
      let R = width / 200 - 1;
      rpainter
        .config("fillStyle", balls[i].color)
        .fillCircle(balls[i].x, balls[i].y, R);
    },
    // 渲染时钟
    rendarClock() {
      layer.delete("digit");
      for (let i = 0; i < data.length; i++) {
        this.digitRender(i, data[i]);
      }
    },
    // 渲染小球
    rendarBalls() {
      layer.delete("ball");
      for (let i = 0; i < balls.length; i++) {
        this.digitBall(i);
      }
    },
  },
  mounted: function () {
    layer = $$("canvas")
      .attr({
        width: width,
        height: height,
      })
      .layer();
    // clearInterval(oTimer);
    // 每隔1000毫秒调用一次绘制函数
    setInterval(() => {
      this.updateDigitTime();
      this.rendarClock();
    }, 100);
    setInterval(() => {
      this.updateBalls();
      this.rendarBalls();
    }, 40);
    
    
    
  },
};
</script>

<style scoped>
div {
  margin-top: 250px;
  display: inline-block;
}
div > canvas {
  margin-left: 365px;
}
div > h3 {
  color: blueviolet;
  text-align: center;
}
</style>

