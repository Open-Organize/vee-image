<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
import $$ from "image2d";
let layer;
export default {
  props: ["value"],
  methods: {
    treeview() {
      let nodePainter = layer.painter("node");
      let textPainter = layer.painter("text");
      let linePainter = layer.painter("line");
      $$.treeLayout({
        root: function (initTree) {
          return initTree;
        },
        id: function (treedata) {
          return treedata.name;
        },
        child: function (parentTree, initTree) {
          return parentTree.children;
        },
      })
        .config({
          // 配置树
          type: "LR",
          width: 1000,
          height: 1000,
        })
        .drawer(function (data) {
          console.log(data);
          var item, i;
          for (i in data.node) {
            item = data.node[i];

            // 绘制结点
            nodePainter
              .config("strokeStyle", "red")
              .strokeCircle(item.left, item.top, 2);

            // 文字
            textPainter
              .config({
                fillStyle: "rgb(46, 52, 61)",
                "font-size": 10,
              })
              .fillText(item.id, item.left + 10, item.top);

            // 连线条
            if (item.pid) {
              linePainter
                .config({
                  strokeStyle: "#9c27b040",
                  lineWidth: 0.01,
                })
                .moveTo(item.left, item.top)
                .bezierCurveTo(
                  item.left - 50,
                  item.top,
                  data.node[item.pid].left + 50,
                  data.node[item.pid].top,
                  data.node[item.pid].left,
                  data.node[item.pid].top
                )
                .stroke();
            }
          }

          layer.update();
        })(this.value);
    },
  },

  mounted: function () {
    layer = $$("canvas")
      .attr({
        width: 1000,
        height: 1000,
      })
      .layer();
    this.treeview();
  },
};
</script>

<style>
</style>