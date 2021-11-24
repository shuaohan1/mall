<template>
  <div class="tabber">
    <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="search">分类</van-tabbar-item>
    <van-tabbar-item replace to="/shopcart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped>
.tabber {
  position: relative;
  height: 50px;
}
</style>
