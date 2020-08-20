<template>
  <ul class='view'>
    <li>
      <h2>折线图<em>Line</em></h2>
      <ul>
        <li
          @click="$router.push('/lineSmooth')"
          style="background-image:url('./assets/images/Line/line-smooth.jpg')"
        >
          Smoothed Line Chart
        </li>
        <li
          @click="$router.push('/twoValueAxes')"
          style="background-image:url('./assets/images/Line/two-value-axes.png')"
        >
          TwoValueAxes Line Chart
        </li>
        <li
        @click="$router.push('/stepLine')"
        style="background-image:url('./assets/images/Line/line-step.jpg')">
          Step Line Chart
        </li>
        <li
        @click="$router.push('/moneySchedule')"
        style="background-image:url('./assets/images/Line/money-schedule.png')">
          Money Schedule Chart
        </li>
      </ul>
    </li>
    <li>
      <h2>柱状图<em>Bar</em></h2>
      <ul>
        <li
          @click="$router.push('/barBackground')"
          style="background-image:url('./assets/images/Candlestick/candlestick-simple.jpg')"
        >
         Candlestick
        </li>
      </ul>
    </li>
    <li>
      <h2>饼图<em>Pie</em></h2>
      <ul>
        <li
          @click="$router.push('/pieDoughnut')"
          style="background-image:url('./assets/images/Pie/pie-doughnut.jpg')"
        >
          Doughnut Chart
        </li>
        <li
          @click="$router.push('/pieGauge')"
          style="background-image:url('./assets/images/Pie/pie-gauge.png')"
        >
          Gauge Chart(一切以实物为准)
        </li>
      </ul>
    </li>
    <li>
      <h2>K&nbsp;线图<em>Candlestick</em></h2>
      <ul>
        <li
          @click="$router.push('/candlestickSimple')"
          style="background-image:url('./assets/images/Bar/bar-background.jpg')"
        >
          Bar background
        </li>
      </ul>
    </li>
    <li>
      <h2>雷达图<em>Radar</em></h2>
      <ul>
        <li
          @click="$router.push('/radar')"
          style="background-image:url('./assets/images/Radar/radar.jpg')"
        >
          Basic Candlestick
        </li>
      </ul>
    </li>
    <li>
      <h2>树图<em>Tree</em></h2>
      <ul>
        <li
          @click="$router.push('/treeBasic')"
          style="background-image:url('./assets/images/Tree/tree-basic.jpg')"
        >
          From Left to Right Tree
        </li>
      </ul>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
ul.view {
  padding: 30px;
  background-color: #f3f3f3;
  & > li {
    & > h2 {
      font-size: 24px;
      margin-bottom: 20px;
      & > em {
        font-size: 20px;
        padding-left: 10px;
        color: #999;
        font-weight: normal;
        font-style: normal;
      }
    }
    & > ul {
      & > li {
        display: inline-block;
        padding-left: 10px;
        width: 250px;
        margin-bottom: 30px;
        border-radius: 2px;
        background-color: #f9f9f9;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        height: 229px;
        line-height: 40px;
        background-size: 100% auto;
        background-position-y: 40px;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
  }
}
</style>