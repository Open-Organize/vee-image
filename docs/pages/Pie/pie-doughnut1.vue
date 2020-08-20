<template>
  <div>
    
    <vee-pie-pie-doughnut v-model="dataList"></vee-pie-pie-doughnut>
  </div>
</template>
<script>
import Vue from "vue";
import { veePiePieDoughnut } from "vee-image";
Vue.use(veePiePieDoughnut);

export default{
    data(){
      return{
          dataList:[10,5,1,8,4]
      }
    },
    methods:{

    },

}
</script>