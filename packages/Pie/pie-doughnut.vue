<template>
  <div>
    <canvas></canvas>
  </div>
</template>
<script>
import $$ from "image2d";
export default {
    mounted(){
        let painter = $$('canvas').attr({
           width:1000,
           height:1000
        }).painter();
         

    }
}
</script>