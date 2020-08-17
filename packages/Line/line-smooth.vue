<template>
  <div>
    <div class="btn-list">
      <input type="button" @click="doChange()" value="改变数据" class="btn btn-change" />
    </div>
    <div class="line">
      <label>{{params.datalist}}</label>
      <line-smooth v-model="params.datalist"></line-smooth>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        datalist: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    };
  },
  methods: {
    doChange() {
      // debugger
      this.params.datalist = [
        +(Math.random() * 1500).toFixed(0),
        +(Math.random() * 1500).toFixed(0),
        +(Math.random() * 1500).toFixed(0),
        +(Math.random() * 1500).toFixed(0),
        +(Math.random() * 1500).toFixed(0),
        +(Math.random() * 1500).toFixed(0),
        +(Math.random() * 1500).toFixed(0),
      ];
    },
  },
};
</script>