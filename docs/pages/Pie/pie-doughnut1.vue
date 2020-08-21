<template>
  <div>
    
    <vee-pie-pie-doughnut1 v-model="dataList"></vee-pie-pie-doughnut1>
  </div>
</template>
<script>
import Vue from "vue";
import { veePiePieDoughnut1 } from "vee-image";
Vue.use(veePiePieDoughnut1);

export default{
    data(){
      return{
          dataList:[10,5,1,8,4]
      }
    }
}
</script>