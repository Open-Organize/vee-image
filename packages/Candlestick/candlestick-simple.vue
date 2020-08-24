<template>
  <div>
   
    <canvas @mousemove="setView"></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
let secpainter, layer;
export default {
   props:["value"],
   
   methods:{
       doDraw(){
          let painter = layer.painter("mycanvas");
           painter.config({
            strokeStyle: "pink",
            fillStyle: "blue",
            lineWidth: 2
          });
          let dataArr=this.value;
           var canvas,ctx;
            
            var cWidth, cHeight;//坐标轴的长宽
            var originX, originY;//原点
           
            var bMargin, tobalBars, bWidth, maxXValue, maxYValue, minXValue, minYValue;
            var totalNomber;//xy轴刻度
            var yAverage, minTrueYValue, maxTrueYValue;

            
            var ctr, numctr, speed;
           
            var mousePosition = {};
             initChart(); 
            drawLineLabelMarkers(); 
            drawChartAnimate(); 
           
           function initChart(){
             
              cHeight = 800;
              cWidth = 800;
              originX = 140;
              originY = 860;
              bMargin = 1000/40;

                tobalBars = dataArr.length;
                bWidth = parseInt( cWidth/tobalBars - bMargin );
                maxXValue = 0;
                maxYValue = 0;
                var xArr = [];
                var yArr = [];
                for(var i=0; i<dataArr.length; i++){
                    xArr.push( dataArr[i][0] );
                    yArr.push( dataArr[i][1] );
                }
                yAverage = ( eval(yArr.join("+"))/yArr.length ).toFixed(2);
                var addNb = parseInt(yAverage/10); 
                
                minXValue = Math.min.apply(null,xArr); 
                minXValue = parseInt(Math.max(minXValue-addNb, 0)); 
                maxXValue = parseInt(Math.max.apply(null,xArr)+addNb); 
                
                minYValue = minTrueYValue = Math.min.apply(null,yArr);
                minYValue = parseInt(Math.max(minYValue-addNb, 0));
                maxTrueYValue = Math.max.apply(null,yArr);
                maxYValue = parseInt(maxTrueYValue+addNb);
                
                totalNomber = 5;
                // 运动相关
                ctr = 1;
                numctr = 50;
                speed = 1.5;
              
             
           }

           function drawLineLabelMarkers(){
               drawLine(originX, originY, originX, 60);
                // x轴
                drawLine(originX, originY, originX+cWidth, originY);
                drawMarkers();
           }

           //画坐标轴
           function drawLine(x, y, X, Y){
               painter
               .beginPath()
               .config("strokeStyle","pink")
                .moveTo(x, y)
                .lineTo(X, Y)
                .stroke()
                .closePath();
            }
            
            //画出x轴y轴上的刻度
            function drawMarkers(){
                
               var oneYVal = (maxYValue-minYValue)/totalNomber;
               for(var i=0; i<=totalNomber; i++){
                    var markerVal = parseInt(i*oneYVal+minYValue);
                    var xMarker = originX-10;
                    var yMarker = parseInt( originY-cHeight*(markerVal-minYValue)/(maxYValue-minYValue) );
                    
                    painter
                    .config("strokeStyle","#E0E0E0")
                    .fillText(markerVal, xMarker-40, yMarker+3, 0); // 文字
                    
                    if(i>0){
                        drawLine(originX+2, yMarker, originX+cWidth, yMarker);
                    }
                }
                var oneXVal = (maxXValue-minXValue)/totalNomber;
                for(var i=0; i<=totalNomber; i++){
                	
                    var markerVal =  parseInt(i*oneXVal+minXValue);
                    var xMarker = parseInt( originX+cWidth*(markerVal-minXValue)/(maxXValue-minXValue));
                    var yMarker = originY+30;
                    painter.fillText(markerVal, xMarker, yMarker, 0); // 文字
                    
                    if(i>0){
                        drawLine(xMarker, 60, xMarker, originY-2);
                    }
                }

                painter.fillText("体重", -1000/2, 70);
                painter.fillText("身高", originX+cWidth/2, originY+70);


            }
         

            function drawChartAnimate(){
               for(var i=0; i<dataArr.length; i++){
                    
                   
                   
                    var oX = originX+cWidth*(dataArr[i][0]-minXValue)/(maxXValue-minXValue);
                    var oY = originY - cHeight*(dataArr[i][1]-minYValue)/(maxYValue-minYValue);
                   
                    
                    painter
                    .config("fillStyle","rgba(46,199,201,0.5)")
                    .fillCircle(oX,oY,10*ctr/numctr);
                    
                   
                    
                    
                }
                if(ctr<numctr){
                    ctr++;
                    setTimeout(function(){
                        painter.clearRect(0,0,1000,1000);
                        drawLineLabelMarkers();
                        drawChartAnimate();
                    }, speed*=1.08);
                }

            }

          layer.update();
       },
       setView(event){
          //layer.delete("mycanvas");
          secpainter.clearRect(0,0,1000,1000);
          let position = $$("canvas").position(event);
          let x = position.x;
          let y = position.y;
          let dataArr=this.value;
           var canvas,ctx;
            // 图表属性
            var cWidth, cHeight;
            var originX, originY;
            // 柱状图属性
            var bMargin, tobalBars, bWidth, maxXValue, maxYValue, minXValue, minYValue;
            var totalNomber;
            var yAverage, minTrueYValue, maxTrueYValue;

            // 运动相关变量
            var ctr, numctr, speed;
            //鼠标移动
            var mousePosition = {};
             initChart(); // 图表初始化
            //drawLineLabelMarkers(); // 绘制图表轴、标签和标记
            drawChartAnimate(); 
           
           function initChart(){
              
              cHeight = 800;
              cWidth = 800;
              originX = 140;
              originY = 860;
              bMargin = 1000/40;

                tobalBars = dataArr.length;
                bWidth = parseInt( cWidth/tobalBars - bMargin );
                maxXValue = 0;
                maxYValue = 0;
                var xArr = [];
                var yArr = [];
                for(var i=0; i<dataArr.length; i++){
                    xArr.push( dataArr[i][0] );
                    yArr.push( dataArr[i][1] );
                }
                yAverage = ( eval(yArr.join("+"))/yArr.length ).toFixed(2);
                var addNb = parseInt(yAverage/10); 
                
                minXValue = Math.min.apply(null,xArr); //求最小值
                minXValue = parseInt(Math.max(minXValue-addNb, 0)); 
                maxXValue = parseInt(Math.max.apply(null,xArr)+addNb); 
                
                minYValue = minTrueYValue = Math.min.apply(null,yArr);
                minYValue = parseInt(Math.max(minYValue-addNb, 0));
                maxTrueYValue = Math.max.apply(null,yArr);
                maxYValue = parseInt(maxTrueYValue+addNb);
                
                totalNomber = 5;
                // 运动相关
                ctr = 1;
                numctr = 50;
                speed = 1.5;
              
             
           }

            function drawChartAnimate(){
               for(var i=0; i<dataArr.length; i++){
                    
                   
                   
                    var oX = originX+cWidth*(dataArr[i][0]-minXValue)/(maxXValue-minXValue);
                    var oY = originY - cHeight*(dataArr[i][1]-minYValue)/(maxYValue-minYValue);
                   if((position.x-oX)*(position.x-oX)+(position.y-oY)*(position.y-oY)<(10*ctr/numctr)*(10*ctr/numctr)){

                    secpainter
                    .config("fillStyle","rgba(46,199,201,0.5)")
                    .fillCircle(oX,oY,15*ctr/numctr)
                    .config("fillStyle", "#a427ab61")
                    .fillRect(oX, oY, 100, 40)
                    .config("fillStyle", "blue")
                    .fillText("身高："+dataArr[i][0], oX+3, oY+10)
                    .fillText("体重："+dataArr[i][1], oX+3, oY+30)
                   }
                    
                   
                    
                   
                    
                    
                }
                if(ctr<numctr){
                    ctr++;
                    //setTimeout(function(){
                        secpainter.clearRect(0,0,1000,1000);
                        //drawLineLabelMarkers();
                        drawChartAnimate();
                    //}, speed*=1.08);
                }

            }
          
          
         layer.update();
          //layer.update("mycanvas")
       }

   },

   mounted:function(){
      layer = $$("canvas")
      .attr({
        width: 2000,
        height: 1000
      })
      .layer();
    this.doDraw();

    secpainter = layer.painter("sec-view");
   }
}
</script>