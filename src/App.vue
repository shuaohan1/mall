<template>
  <div id="app">
    <div>
      <router-view/>
    <tabber></tabber>
    </div>
  </div>
</template>

<script>
import tabber from '@/views/Tabber.vue'
export default {
  components:{
    tabber
  }
}
</script>

<style>
  /* @import "./assets/css/base.css" */
  
</style>
