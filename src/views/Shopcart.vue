<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </navbar>
    <cart-list class="cart-list" :cart-list="cartList"/>
    <bottom-bar/>
    <tabber/>
  </div>
</template>

<script>
import Navbar from '../components/content/Navbar.vue'
import CartList from './Cart/CartList.vue'
import Tabber from './Tabber.vue'
import BottomBar from './Cart/BottomBar.vue'
// getters的映射的局部属性
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  components:{
    Tabber,
    Navbar,
    CartList,
    BottomBar,
    BottomBar
  },
  computed:{
    // getters的映射的局部属性
    // 两种方法 
    // 1.数组 一一对应的名字 是getters里面的
    ...mapGetters(['cartCount','cartList']),
    // 2.对象 名字是自定义的
    // ...mapGetters({
    //   count:'cartCount',
    //   list:'cartList'
    // })
    
    // cartList(){
    //   return this.$store.getters.cartList
    // },
    // cartCount(){
    //   return this.$store.getters.cartCount
    // }
  },
  methods: {}
}
</script>
<style scoped>
.cart {
  position: relative;
  overflow: hidden;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.nav-bar {
  height: 44px;
  background-color: pink;
}

.cart-list {
  width: 100%;
  height: 100vh;
}
</style>
