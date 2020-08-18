<template>
  <div>
    <div class="btn-list">
      <input type="button" @click="doChange()" value="改变数据" class="btn btn-change" />
    </div>
    <div class="line">
      <label>{{params.datalist}}</label>
      <vee-line-two-value-axes v-model="params.datalist"></vee-line-two-value-axes>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { veeLineTwoValueAxes } from "vee-image";
Vue.use(veeLineTwoValueAxes);
export default {
  data() {
    return {
      params: {
        datalist: [1, 2, 3, 4, 5],
      },
    };
  },
  methods:{
    doChange(){
    }
  }
};
</script>