<template>
  <div>
    {{datalist}}
    <vee-line-step-line v-model="datalist"></vee-line-step-line>
  </div>
</template>
<script>
import Vue from "vue";
import { veeLineStepLine } from "vee-image";
Vue.use(veeLineStepLine);
let fir = [1220, 1332, 1101, 1034, 1290, 1330, 1220];
let sec=[850, 696, 887, 784, 974, 805, 1198];
let thir = [204, 593, 482, 353, 280, 450, 771];
export default {
  data() {
    return {
      datalist: [fir, sec, thir],
    };
  },
};
</script>