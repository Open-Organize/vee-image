<template>
  <div>
    实际值:{{params.datalist}}
    最大值:{{params.maxlist}}
    <vee-radar-radar v-model="params"></vee-radar-radar>
  </div>
</template>
<script>
import Vue from "vue";
import { veeRadarRadar } from "vee-image";
Vue.use(veeRadarRadar);
export default{
  data(){
    return{
      params:{
        datalist:[4300, 10000, 28000, 35000, 50000,19000],
        maxlist:[6500,16000,30000,38000,52000,25000]
      }
    }
  }
}
</script>