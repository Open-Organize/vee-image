import Bar_barBackground from '../packages/Bar/bar-background.vue';
import Candlestick_candlestickSimple from '../packages/Candlestick/candlestick-simple.vue';
import Line_barBackground from '../packages/Line/line-smooth.vue';
import Line_barIrregularty from '../packages/Line/line-irregularty.vue';
import Pie_pieDoughnut from '../packages/pie/pie-doughnut.vue';
import Pie_pieDoughnut1 from '../packages/pie/pie-doughnut1.vue';
import Radar_radar from '../packages/Radar/radar.vue';
import Tree_treeBasic from '../packages/Tree/tree-basic.vue';
import Line_twoValueAxes from '../packages/Line/two-value-axes.vue';
import Line_stepLine from '../packages/Line/step-line.vue';
import Line_moneySchedule from '../packages/Line/money-schedule.vue';
import Pie_pieGauge from '../packages/Pie/pie-gauge.vue';
import Pie_pieWed from '../packages/pie/pie-wed.vue';
import Pie_pieClock from '../packages/Pie/pie-clock.vue';
import Pie_pieLove from '../packages/Pie/pie-love.vue';
import Time_clock from '../packages/Time/clock.vue';
import Time_stupidClock from '../packages/Time/stupidClock.vue';

let veeBarBarBackground = { install: Vue => { Vue.component('veeBarBarBackground', Bar_barBackground) } };
let veeCandlestickCandlestickSimple = { install: Vue => { Vue.component('veeCandlestickCandlestickSimple', Candlestick_candlestickSimple) } };
let veeLineBarIrregularty = { install: Vue => { Vue.component('veeLineBarIrregularty', Line_barIrregularty) } };
let veeLineBarBackground = { install: Vue => { Vue.component('veeLineBarBackground', Line_barBackground) } };
let veePiePieDoughnut = { install: Vue => { Vue.component('veePiePieDoughnut', Pie_pieDoughnut) } };
let veePiePieDoughnut1 = { install: Vue => { Vue.component('veePiePieDoughnut1', Pie_pieDoughnut1) } };

let veeRadarRadar = { install: Vue => { Vue.component('veeRadarRadar', Radar_radar) } };
let veeTreeTreeBasic = { install: Vue => { Vue.component('veeTreeTreeBasic', Tree_treeBasic) } };
let veeLineTwoValueAxes = { install: Vue => { Vue.component('veeLineTwoValueAxes', Line_twoValueAxes) } };
let veeLineStepLine = { install: Vue => { Vue.component('veeLineStepLine', Line_stepLine) } };
let veeLineMoneySchedule = { install: Vue => { Vue.component('veeLineMoneySchedule', Line_moneySchedule) } };
let veePiePieGauge = { install: Vue => { Vue.component('veePiePieGauge', Pie_pieGauge) } };
let veePiePieWed = { install: Vue => { Vue.component('veePiePieWed', Pie_pieWed) } };
let veePiePieClock = { install: Vue => { Vue.component('veePiePieClock', Pie_pieClock) } };
let veePiePieLove = { install: Vue => { Vue.component('veePiePieLove', Pie_pieLove) } };
let veeTimeClock = { install: Vue => { Vue.component('veeTimeClock', Time_clock) } };
let veeTimeStupidClock = { install: Vue => { Vue.component('veeTimeStupidClock', Time_stupidClock) } };



export {
    veeBarBarBackground,
    veeCandlestickCandlestickSimple,
    veeLineBarIrregularty,
    veeLineBarBackground,
    veePiePieDoughnut,
    veeRadarRadar,
    veeTreeTreeBasic,
    veeLineTwoValueAxes,
    veeLineStepLine,
    veeLineMoneySchedule,
    veePiePieGauge,
    veePiePieWed,
    veePiePieDoughnut1,
    veePiePieClock,
    veePiePieLove,
    veeTimeClock,
    veeTimeStupidClock,

};