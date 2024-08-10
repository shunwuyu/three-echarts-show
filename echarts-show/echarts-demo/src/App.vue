<template>
  <div class="layout">
    <VHeader>数据中心可视化系统</VHeader>
    <div class="layout-content">
      <div class="layout-content-left">
        <Panel>
          <div>向西28° 2023/04/02 12:00 正常</div>
          <div>向西28° 2023/04/02 12:00 正常</div>
          <div>向西28° 2023/04/02 12:00 正常</div>
        </Panel>
        <Panel>
          <PieChart></PieChart>
        </Panel>
      </div>
      <div class="layout-content-right">
        <Panel>
          <LineChart></LineChart>
        </Panel>
      </div>
    </div>
  </div>
</template>
<script setup>
import VHeader from './components/Header.vue'
import Panel from './components/Panel/index.vue';
import PieChart from './components/Charts/PieChart.vue';
import LineChart from './components/Charts/LineChart.vue';
</script>
<style>
body, html {
  background-color: #000;
}
body {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.layout {
  width: 100vw;
  height: 100vh;
}
.layout-content {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
.layout-content-left {
  position: absolute;
  left: 0.3rem;
  top: 70px;
  width: 30vw;
}
.layout-content-right {
  position: absolute;
  right: 0.6rem;
  top: 70px;
  width: 30vw;
}
.panel {
  margin-bottom: 0.3rem;
}
</style>