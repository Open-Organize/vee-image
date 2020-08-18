import Bar_barBackground from '../packages/Bar/bar-background.vue';
import Candlestick_candlestickSimple from '../packages/Candlestick/candlestick-simple.vue';
import Line_barBackground from '../packages/Line/line-smooth.vue';
import Pie_pieDoughnut from '../packages/pie/pie-doughnut.vue';
import Radar_radar from '../packages/Radar/radar.vue';
import Tree_treeBasic from '../packages/Tree/tree-basic.vue';
import Line_twoValueAxes from '../packages/Line/two-value-axes.vue'

let veeBarBarBackground = { install: Vue => { Vue.component('veeBarBarBackground', Bar_barBackground) } };
let veeCandlestickCandlestickSimple = { install: Vue => { Vue.component('veeCandlestickCandlestickSimple', Candlestick_candlestickSimple) } };
let veeLineBarBackground = { install: Vue => { Vue.component('veeLineBarBackground', Line_barBackground) } };
let veePiePieDoughnut = { install: Vue => { Vue.component('veePiePieDoughnut', Pie_pieDoughnut) } };
let veeRadarRadar = { install: Vue => { Vue.component('veeRadarRadar', Radar_radar) } };
let veeTreeTreeBasic = { install: Vue => { Vue.component('veeTreeTreeBasic', Tree_treeBasic) } };
let veeLineTwoValueAxes = { install: Vue => { Vue.component('veeLineTwoValueAxes', Line_twoValueAxes) } };
let veeLineStepLine = { install: Vue => { Vue.component('veeLineStepLine', Line_stepLine) } };

export {

    veeBarBarBackground, 
    veeCandlestickCandlestickSimple,
    veeLineBarBackground,
    veePiePieDoughnut,
    veeRadarRadar,
    veeTreeTreeBasic,
    veeLineTwoValueAxes,
    veeLineStepLine

};