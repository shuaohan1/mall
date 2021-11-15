<template>
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item" to="/home">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item" to="/category">
      <span class="mui-icon mui-icon-personadd"></span>
      <span class="mui-tab-label">分类</span>
    </router-link>
    <router-link class="mui-tab-item" to="/shopcart">
      <span class="mui-icon mui-icon mui-icon-locked">
        <span class="mui-badge">0</span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="mui-tab-item" to="/user">
      <span class="mui-icon mui-icon mui-icon-contact"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
