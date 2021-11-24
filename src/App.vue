<template>
  <div id="app">
    <div>
      <!-- keep-alive页面缓存 不会再次进行销毁和创建
        exclude   除了某个   exclude="(组件里的name属性)"
       -->
      <keep-alive exclude="Detail">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  /* @import "./assets/css/base.css" */
  
</style>
