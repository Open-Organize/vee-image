import Vue from 'vue';
import App from './App.vue';

// 引入基础样式
import '@yelloxing/normalize.css';

// 引入路由
import router from './router/index.js';

import '../packages/index'

new Vue({
  el: document.getElementById('root'),
  router,
  render: createElement => createElement(App)
});