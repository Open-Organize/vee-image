<template>
  <div>
    <canvas></canvas>
  </div>
</template>
<script>
import $$ from "image2d";
let layer;
export default {
  methods: {
    doDraw() {
      let size = 600;
      let painter = layer.painter("mycanvas");
      let colorArray = $$.getRandomColors(1000);
      // for (let i = 0; i < 20; i++) {
      //   painter
      //     .clearRect()
      //     .config("fillStyle", colorArray[i])
      //     .fillCircle(size / 4, size / 4, size / 4)
      //     .fillCircle((size / 4) * 3, size / 4, size / 4)
      //     .fillCircle(size / 4, (size / 4) * 3, size / 4)
      //     .fillCircle((size / 4) * 3, (size / 4) * 3, size / 4);
      //   layer.update();
      // };

      let i = 0;
      setInterval(() => {
        painter
          .clearRect()
          .config("fillStyle", colorArray[i])
          .fillCircle(size / 4, size / 4, size / 6)
           .config("fillStyle", colorArray[i+50])
          .fillCircle((size / 4) * 3, size / 4, size / 6)
           .config("fillStyle", colorArray[i+100])
          .fillCircle(size / 4, (size / 4) * 3, size / 6)
           .config("fillStyle", colorArray[i+150])
          .fillCircle((size / 4) * 3, (size / 4) * 3, size / 6);
        layer.update();
        i++;
        if (i == 1000) i = 0;
      }, 20);
    },
  },
  mounted: function () {
    let size = 600;
    layer = $$("canvas")
      .attr({
        width: size,
        height: size,
      })
      .layer();
    this.doDraw();
  },
};
</script>
<style scoped>
div {
  text-align: center;
  margin: 0 auto;
}
</style>