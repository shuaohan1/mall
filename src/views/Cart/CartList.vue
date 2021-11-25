<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"/>
    </scroll>
  </div>
</template>
<script>
import Scroll from '../../components/content/Scroll.vue' 
import CartListItem from './CartListItem.vue'

export default {
  props:{
    cartList:{
      type:Array,
      defaule(){
        return []
      }
    }
  },
  computed:{
  },
  components:{
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>
<style scoped>
.content{
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 90px;
}
</style>