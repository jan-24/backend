<template>
  <div class="box">
    <div id="he-plugin-simple"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  mounted () {
    window.WIDGET = {
      "CONFIG":
      {
        "modules": "01234",
        "background": "5",
        "tmpColor": "FFFFFF",
        "tmpSize": "16",
        "cityColor": "FFFFFF",
        "citySize": "16",
        "aqiColor": "FFFFFF",
        "aqiSize": "16",
        "weatherIconSize": "24",
        "alertIconSize": "18",
        "padding": "10px 10px 10px 10px",
        "shadow": "0",
        "language": "auto",
        "fixed": "false",
        "vertical": "top",
        "horizontal": "left",
        "key": "c5c5536822e7495397d8de1127457a63"
      }
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0';
    var res = document.getElementsByTagName("head")[0].appendChild(script);
  }
};
</script>
<style lang="less" scoped>
.box {
  /deep/#weather-view-he {
    z-index: 99;
  }
}
</style>
