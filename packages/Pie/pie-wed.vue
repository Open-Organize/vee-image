<template>
    <div>
        <canvas></canvas>
    </div>
</template>
<script>
import $$ from "image2d";
let secpainter, layer;

export default {
    methods:{
        doDraw(){
             let painter = layer.painter("mycanvas");
             let radius=200;
             painter.config({
                strokeStyle: "black",
                fillStyle: "rgba(46,199,201,0.5)",
                lineWidth: 2
            });
        
        
        
       
         darwStar(100,200,300,300,30);
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
       
        // painter.beginPath()
        // .moveTo(x,y)
        // .lineTo(X,Y)
        // .closePath()
        // .stroke()

        layer.update();
 
      }
    },
    mounted:function(){
    layer = $$("canvas")
      .attr({
        width: 1024,
        height: 768
      })
      .layer();
    this.doDraw();

    secpainter = layer.painter("sec-view");
    }
}
</script>