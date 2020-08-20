<template>
  <div>
    {{params.datalist}}
    <vee-pie-pie-doughnut v-model="params.datalist"></vee-pie-pie-doughnut>
  </div>
</template>
<script>
import Vue from "vue";
import { veePiePieDoughnut } from "vee-image";
Vue.use(veePiePieDoughnut);
export default {
  data(){
    return  {
      params:{
        datalist:[53,68,72,94,86],
      }
    }
  }
};
</script>