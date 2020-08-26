<template>
  <div>
  
    <canvas @mousemove="setView"></canvas>
  </div>
</template>
<script>
import $$ from "image2d";
let secpainter, layer;
export default {
  props: ["value"],
  data() {

    return {};
  },
  methods: {
    doDraw() {
      let painter = layer.painter("mycanvas");
      let digit = this.value;
      var radius=8;
      const endTime=new Date(2020,7,27,8,58,59);
      var curShotTimeSeconds=0;
      let colorArray = $$.getRandomColors(1000);
      var balls=[];
      painter.config({
        strokeStyle: "black",
        fillStyle: "rgba(46,199,201,0.5)",
        lineWidth: 2
      });
      
      curShotTimeSeconds=getCurrentShotTimeSeconds()

      setInterval(function(){
         render();
         update();
      },50)

       function update(){
          var nextShotTimeSeconds=getCurrentShotTimeSeconds()
          
          var nexthours=parseInt(nextShotTimeSeconds/3600);
         var nextminutes=parseInt((nextShotTimeSeconds-nexthours*3600)/60);
         var nextseconds=nextShotTimeSeconds%60;


           var curhours=parseInt(curShotTimeSeconds/3600);
         var curminutes=parseInt((curShotTimeSeconds-curhours*3600)/60);
         var curseconds=curShotTimeSeconds%60;
          if(nextShotTimeSeconds!=curShotTimeSeconds){
              if(parseInt(nexthours/10)!=parseInt(curhours/10)){
                 addBalls(60+0,30,parseInt(curhours/10));
              }
              if(parseInt(nexthours%10)!=parseInt(curhours%10)){
                 addBalls(60+15*(radius+1),30,parseInt(curhours%10));
              }


              if(parseInt(nextminutes/10)!=parseInt(curminutes/10)){
                 addBalls(60+39*(radius+1),30,parseInt(curminutes/10));
              }
              if(parseInt(nextminutes%10)!=parseInt(curminutes%10)){
                 addBalls(60+54*(radius+1),30,parseInt(curminutes%10));
              }


              if(parseInt(nextseconds/10)!=parseInt(curseconds/10)){
                 addBalls(60+78*(radius+1),30,parseInt(curseconds/10));
              }
              if(parseInt(nextseconds%10)!=parseInt(curseconds%10)){
                 addBalls(60+93*(radius+1),30,parseInt(curseconds%10));
              }
              
              
              curShotTimeSeconds=nextShotTimeSeconds;
          }

              updateBalls();
       }
      
       function updateBalls(){
           for(let i=0;i<balls.length;i++){
              balls[i].x+=balls[i].vx;
              balls[i].y+=balls[i].vy;
              balls[i].vy+=balls[i].g;

              if(balls[i].y>=(768-radius)){
                 balls[i].y=(768-radius);
                 balls[i].vy=-balls[i].vy*0.7;

              }
              if(balls[i].x>=(1024-radius)){
                 balls[i].x=1024-radius;
                 balls[i].vx=-balls[i].vx*0.5;
              }
               if(balls[i].x<=0){
                balls[i].x=0;
                balls[i].y=0;
                
                 
              }
           }
       }
      function addBalls(x,y,num){
          for(let i=0;i<digit[num].length;i++){
             for(let j=0;j<digit[num][i].length;j++){
                  if(digit[num][i][j]==1){
                    var aBall={
                      x:x+ j*2*(radius+1)+radius+1,
                      y:y+ i*2*(radius+1)+radius+1,
                      g:3,
                      vx:Math.pow(-1,Math.ceil(Math.random()*1000))*10,
                      vy:-10*Math.random()-7,
                      color:colorArray[(Math.random()*1000).toFixed(0)]
                    }
                    balls.push(aBall)
                    
                  }
             }
          }
      }

      function getCurrentShotTimeSeconds(){
         var curTime=new Date();
         var ret=endTime.getTime()-curTime.getTime();
         ret = Math.round(ret/1000);
         return ret>=0?ret:0;
      }
      function render(){
        painter.clearRect(0,0,1024,768);
         var hours=parseInt(curShotTimeSeconds/3600);
         var minutes=parseInt((curShotTimeSeconds-hours*3600)/60);
         var seconds=curShotTimeSeconds%60;
         //绘制小时的
          renderDigit(60,30,parseInt(hours/10));
          renderDigit(60+15*(radius+1),30,parseInt(hours%10));
          renderDigit(60+30*(radius+1),30,10);//绘制冒号
         //绘制分钟的
           renderDigit(60+39*(radius+1),30,parseInt(minutes/10));
          renderDigit(60+54*(radius+1),30,parseInt(minutes%10));
          renderDigit(60+69*(radius+1),30,10);//绘制冒号
         //绘制秒
           renderDigit(60+78*(radius+1),30,parseInt(seconds/10));
          renderDigit(60+93*(radius+1),30,parseInt(seconds%10));
          
          for(let i=0;i<balls.length;i++){
            //  painter.config({
            //    fillStyle:colorArray[(Math.random()*1000).toFixed(0)]
            //  })
            //  .fillCircle(balls[i].x,balls[i].y,radius)
            darwStar(3,8,balls[i].x,balls[i].y,0);
          }
          layer.update();
      }
       
        function darwStar(r,R,x,y,rot){

             painter.beginPath()
               .config({
                  fillStyle:"#fb3",
                  strokeStyle:"red"
                })
                
                for(var i=0 ;i<5;i++){
           
                painter
                .lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x,-Math.sin((54+i*72-rot)/180*Math.PI)*r+y)
                .lineTo(Math.cos((18+(i+1)*72-rot)/180*Math.PI)*R+x, -Math.sin((18+(i+1)*72-rot)/180*Math.PI)*R+y)
             
            }
            painter
                .closePath()
                .fill()
                .stroke()
               
        }

      function renderDigit(x,y,num){
          painter
          .config({
            fillStyle:"blue"
          })
          for(let i=0;i<digit[num].length;i++){
             for(let j=0;j<digit[num][i].length;j++){
                  if(digit[num][i][j]==1){
                     //第i，j的圆心位置
                     //X：x+ j*2*(R+1)+R+1
                     //Y: y+ i*2*(R+1)+R+1
                      painter
                      .config({
                        fillStyle:"rgba(46,199,201,0.5)"
                      })
                      .fillCircle(x+ j*2*(radius+1)+(radius+1),y+ i*2*(radius+1)+(radius+1),radius)
                  }
             }
          }
          // layer.update();
      }

      
    
      
    },


    setView(event) {

      //console.log(new Date().valueOf());
      //secpainter.clearRect();
      // let position = $$("canvas").position(event);
     

     // layer.update();
    }
  },
  mounted: function() {
    
    layer = $$("canvas")
      .attr({
        width: 1024,
        height: 768
      })
      .layer();
    this.doDraw();

    secpainter = layer.painter("sec-view");
  }
};
</script>