<template>
  <div class="contentBox">
    <!-- -->
    <iframe  ref="iframe" id="iframe" src="http://10.69.100.230:8093/tradeaux/#/TradingAssistance/AdjustmentManage/strategyFormulation"
      style="width: 100%;height: 100%;" frameborder="0"></iframe>
    <!-- <iframe  ref="iframe" id="iframe" src="http://192.168.10.233:8090/#/TradingAssistance/AdjustmentManage/strategyApproval"
      style="width: 100%;height: 100%;" frameborder="0"></iframe> -->
    <!-- <iframe  ref="iframe" id="iframe" src="http://localhost:4000/#/TradingAssistance/AdjustmentManage/strategyFormulation"
      style="width: 100%;height: 100%;" frameborder="0"></iframe> -->
    <!-- <iframe src="http://192.168.0.102:3040/energy-control-platform-web/#/" style="width: 100%;height: 100%;" frameborder="0"></iframe> -->

  </div>
</template>

<script>
export default {
  name: 'iframeTest',

  data() {
    return {

    };
  },
  created() {
  },
  mounted() {
 const iframe = this.$refs.iframe;
  // 监听 iframe 加载完成事件
  iframe.onload = () => {
    iframe.contentWindow.postMessage({
        isIframe:true,
        // path:'/PriceForecast/DatasetManage'
        // path:'/TradingAssistance/AdjustmentManage/strategyFormulation'
    }, '*');
  };
  },

  methods: {

  },
};
</script>
<style>
.contentBox {
  width: 100%;
  height: 800px;
  margin: 30px auto;
  background: #ccc;
}
</style>