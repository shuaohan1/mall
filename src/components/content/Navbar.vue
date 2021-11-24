<template>
<!-- 头部信息 -->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0);
}

.left, .right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>