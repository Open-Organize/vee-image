<template>
  <div>
    <div class="btn-list">
      <input type="button" @click="doChange()" value="改变数据" class="btn btn-change" />
    </div>
    <div class="line">
      <label>{{params.datalist}}</label>
      <two-value-axes v-model="params.datalist"></two-value-axes>
    </div>
  </div>
</template>

<script>
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

<style>
</style>