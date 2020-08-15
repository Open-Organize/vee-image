import Vue from 'vue';
import App from './App.vue';

// 引入基础样式
import '@yelloxing/normalize.css';

new Vue({
    el: document.getElementById('root'),
    render: createElement => createElement(App)
});