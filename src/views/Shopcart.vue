<template>
  <div class="cart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </navbar>
    <cart-list class="cart-list" :cart-list="cartList"/>
    <tabber/>
  </div>
</template>

<script>
import Navbar from '../components/content/Navbar.vue'
import CartList from './Cart/CartList.vue'
import Tabber from './Tabber.vue'
export default {
  data () {
    return {}
  },
  components:{
    Tabber,
    Navbar,
    CartList
  },
  computed:{
    cartList(){
      return this.$store.getters.cartList
    },
    cartCount(){
      return this.$store.getters.cartCount
    }
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
  width: 100vw;
  height: 100vh;
}
</style>
