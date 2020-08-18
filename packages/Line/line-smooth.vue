<template>
  <div class="line-root-view">
    <div ref="mycanvas" class="canvas-view" :value="value" @mouseup="viewshow()">
      <canvas></canvas>
    </div>
  </div>
</template>

<script>
// import $paintertype from "../services/$paintertype";
import $$ from "image2d";
export default {
  props: ["value"],
  methods: {
    lineImage(painter,begX,endX,lineFun){
        let i
        painter.beginPath()
        for(i=begX;i<endX;i++){
            painter.lineTo(i,lineFun(i));
        }
        painter.stroke()
    },
    viewshow() {
      let leftline = ["0", "300", "600", "900", "1200", "1500"];
      let rightline = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sta", "Sun"];
      let datalist = this.value;
       let painter=$$("canvas")
        .attr({
          width: 800,
          height: 800,
        })
        .painter()
        .config({
          lineWidth: 2,
          fillStyle: "pink",
          strokeStyle: "black",
        })
        // 画出每个点
        for(let i =0;i<datalist.length;i++){
            painter.strokeCircle(100+i*100,550-datalist[i]/3,3);
        }
        // 画y轴坐标
        for(let i=0;i<6;i++){
          painter.fillText(leftline[i],0,550-i*100)
        }
        // 画y轴
        painter
        .beginPath()
        .moveTo(50, 553)
        .lineTo(50, 50)
        .stroke()
        // 画x轴坐标
        for(let i=0;i<7;i++){
          painter.fillText(rightline[i],100+i*100,600)
        }
        // 画x轴
        painter
        .beginPath()
        .moveTo(50, 550)
        .lineTo(800, 550)
        .config({
          lineWidth: 2,
          strokeStyle: "black",
        })
        .stroke()
        // 画辅助线
        painter
        .beginPath()
        for(let i =0;i<4;i++){
        painter.moveTo(50,450-i*100)
        .lineTo(800,450-i*100)}
        painter
        .config({
          strokeStyle: "gray",
          lineWidth: 0.5,
        })
        .stroke()
        // 通过数据画图
        // debugger
        // 获取差值对象
        let lineFun=$$.cardinal()
        // 设置张弛系数
        lineFun.setT(1);
        // 设置点的位置
        lineFun.setP([[100,550-datalist[0]/3],[200,550-datalist[1]/3],
        [300,550-datalist[2]/3],[400,550-datalist[3]/3],[500,550-datalist[4]/3],[600,550-datalist[5]/3],[700,550-datalist[6]/3]])
         painter.config({
          strokeStyle: '#99CCFF',
          lineWidth: 5,
        })
        this.lineImage(painter,100,700,lineFun)
    },
    
  },
  watch:{
    value:'viewshow',immediate:true,
  },
  mounted:function(){
    this.viewshow();
  }
};
</script>

<style>
.canvas-view {
  width: 1000px;
  height: 1000px;
  display: inline-block;
}
</style>