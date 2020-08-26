import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import menu from '../pages/menu.vue';

import Bar from './Bar';
import Candlestick from './Candlestick';
import Gauge from './Gauge';
import Line from './Line';
import Pie from './Pie';
import Radar from './Radar';
import Tree from './Tree';
import Time from './Time'
export default new VueRouter({
  routes: [{
    path: '/menu',
    component: menu
  },
  ...Bar,
  ...Candlestick,
  ...Gauge,
  ...Line,
  ...Pie,
  ...Radar,
  ...Tree,
  ...Time,
  {
    path: '/*',
    redirect: '/menu'
  }]
});