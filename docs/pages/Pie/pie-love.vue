<template>
  <vee-pie-pie-love v-model="params.love"></vee-pie-pie-love>
</template>

<script>
import Vue from 'vue'
import { veePiePieLove } from "vee-image";
Vue.use(veePiePieLove);
export default {
  data(){
    return{
      params:{
        love:[[0,0,1,1,0,0,1,1,0,0],
              [0,1,1,1,1,1,1,1,1,0],
              [1,1,1,1,1,1,1,1,1,1],
              [0,1,1,1,1,1,1,1,1,0],
              [0,0,1,1,1,1,1,1,0,0],
              [0,0,0,1,1,1,1,0,0,0],
              [0,0,0,0,1,1,0,0,0,0]
        ]
      }
    }
  }
  
};
</script>

<style>

</style>