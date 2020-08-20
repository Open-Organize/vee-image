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
        let dataArr=this.value
       var canvas,ctx;
            // 图表属性
            var cWidth, cHeight, cMargin, cSpace;
            var originX, originY;
            // 图属性
            var bMargin, tobalBars, bWidth, maxValue, minValue;
            var totalYNomber;
            var gradient;
            var showArr;
            
            //范围选择属性
            var dragBarX,dragBarWidth;

            // 运动相关变量
            var ctr, numctr, speed;
            //鼠标移动
            var mousePosition = {};

            
            
            initChart(); // 图表初始化
            
            drawLineLabelMarkers(); // 绘制图表轴、标签和标记
            drawBarAnimate(); // 绘制柱状图的动画
       
      

      painter.config({
        strokeStyle: "black",
        fillStyle: "blue",
        lineWidth: 2
      });

     
      
       function initChart(){
                // 图表信息
            cMargin = 60;
		        cSpace = 80;
		        
		        
		        cHeight = 1000 - cMargin*2-cSpace*2;
		        cWidth = 1000 - cMargin*2-cSpace*2;
		        originX = cMargin + cSpace;
            originY = cMargin + cHeight;
            if(dataArr){
              showArr = dataArr.slice( 0,parseInt(dataArr.length/2) );
            }
            

            // 柱状图信息
            tobalBars = showArr.length;
            bWidth = parseInt( cWidth/tobalBars/3);
            bMargin = parseInt( (cWidth-bWidth*tobalBars)/(tobalBars+1) );
            maxValue=0;
            minValue=9999999;
            for (let i=0;i<dataArr.length;i++){
              //let data=dataArr[i][1]
              //data[0] data[1] data[2] data[3] 
              //开盘      收盘      最低   最高
              //["2017/10/1", [2320.26,2302.6,2287.3,2362.94]]
               var barval=dataArr[i][1][3];
               if(barval>maxValue){
                 maxValue=barval;
               }
               var barval2=dataArr[i][1][2];
               if(barval2<minValue){
                 minValue=barval2;
               }
            }
            maxValue+=20;
            minValue-=20;
            totalYNomber=10;
            
            ctr=1;
            numctr=50;
            
            dragBarWidth = 30;
            dragBarX = cWidth/2+cSpace+cMargin-dragBarWidth/2;
            }


      
       function drawLineLabelMarkers(){
     
                // y轴
                drawLine(originX, originY, originX, cMargin);
                // x轴
                drawLine(originX, originY, originX+cWidth, originY);

                // 绘制标记
                drawMarkers();

            }

       function drawLine(x, y, X, Y){
                
                painter.beginPath()
                .moveTo(x, y)
                .lineTo(X, Y)
                .stroke()
                .closePath();

            }

      function drawMarkers(){
             var oneVal = (maxValue-minValue)/totalYNomber;
                
                for(var i=0; i<=totalYNomber; i++){
                    var markerVal =  parseInt(i*oneVal+minValue);
                    var xMarker = originX-10;
                    var yMarker = parseInt( originY-cHeight*(markerVal-minValue)/(maxValue-minValue) );
                    
                   painter.fillText(markerVal, xMarker-30, yMarker+3, 0); // 文字
                    if(i>0){
                        drawLine(originX+2, yMarker, originX+cWidth, yMarker);
                    }
                }
                
                // 绘制 x
                var textNb = 6;
                
                for(var i=0; i<tobalBars; i++){
                    if(tobalBars>textNb &&  i%parseInt(tobalBars/6) != 0 ){
                    	continue;
                    }
                	var markerVal = dataArr[i][0];
                    var xMarker = parseInt( originX+cWidth*(i/tobalBars)+bMargin+bWidth/2 );
                    var yMarker = originY+30;
                    painter
                    .fillText(markerVal, xMarker, yMarker, 0)
                                // 文字
                }
                // 绘制标题 y
                painter
                //.save()
                //.rotate(Math.PI/2)
                .fillText("指 数", -1000/2, cSpace-20)
                //.restore()
                // 绘制标题 x
               .fillText("日 期", originX+cWidth/2, originY+cSpace-20);
      }

      function drawBarAnimate(){
           var parsent = ctr/numctr;
                for(var i=0; i<tobalBars; i++){
                    var oneVal = parseInt(maxValue/totalYNomber);
                    var data = dataArr[i][1];
                    var color = "#30C7b9";
                    var barVal = data[0];
                    var disY = 0;
                    //开盘0 收盘1 最低2 最高3   跌30C7C9  涨D7797F
                    if(data[1]>data[0]){ //涨
                    	color = "#D7797F";
                    	barVal = data[1];
                    	disY = data[1]-data[0];
                    }else{
                    	disY = data[0]-data[1];
                    }
                    var showH = disY/(maxValue-minValue)*cHeight*parsent;
                    showH = showH>2 ? showH : 2 ;
                    
                    var barH = parseInt( cHeight*(barVal-minValue)/(maxValue-minValue));
                    var y = originY - barH;
                    var x = originX + ((bWidth+bMargin)*i + bMargin)*parsent;
                    
                    drawRect( x, y, bWidth, showH,  color,true);  //开盘收盘  高度减一避免盖住x轴
                    
                    //最高最低的线
                    showH = (data[3]-data[2])/(maxValue-minValue)*cHeight*parsent;
                    showH = showH>2 ? showH : 2 ;
                    
                    y = originY - parseInt( cHeight*(data[3]-minValue)/(maxValue-minValue));
                    drawRect( parseInt(x+bWidth/2-1), y, 2, showH, color);  //最高最低  高度减一避免盖住x轴
                }
                 
               if(ctr<numctr){
                     ctr++;
                 // setTimeout(function(){
                       painter.clearRect(0,0,1000, 1000);
                       drawLineLabelMarkers();
                        drawBarAnimate();
                        //drawDragBar();
                   // }, speed*=0.03);
                }
      }
      function drawRect(x, y, X, Y, color, ifBigBar,ifDrag){
           
                
                if( parseInt(x)%2 !== 0){
                	x += 1;
                }
                if( parseInt(y)%2 !== 0){
                	y += 1;
                }if( parseInt(X)%2 !== 0){
                	X += 1;
                }
                if( parseInt(Y)%2 !== 0){
                	Y += 1;
                }
                 painter
                .config("fillStyle",color)
                .fillRect( parseInt(x), parseInt(y), parseInt(X), parseInt(Y) )
                .closePath()
      }

          layer.update();
      },
      setView(event){

          layer.update();
      }
   },
    mounted: function() {
    
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