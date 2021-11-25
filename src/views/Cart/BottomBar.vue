<template>
  <div class="bottom-menu">
    <check-button class="select-all" 
                  @checkBtnClick="checkBtnClick" 
                  :is-checked="isSelectAll"/>
    <span>全选</span>
    <span class="total-price">合计: {{totalPrice | currency}}</span>
    <span class="buy-product" @click="product">结算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue';
import {Toast} from 'vant'
import {mapGetters} from 'vuex'
	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      // 总价格  方法一
      totalPrice(){
        let money = 0
        this.cartList.forEach((item)=>{
          if(item.checked){
            money += item.count * item.price
          }
        })
        return money
      },
      // 总价格 方法二
		  // totalPrice() {
      //   const cartList = this.$store.getters.cartList;
      //   return cartList.filter(item => {
      //     return item.checked
      //   }).reduce((preValue, item) => {
      //     return preValue + item.count * item.price
      //   }, 0).toFixed(2)  //toFixed(2)保留2位小数
      // },

      // 结算中选中的商品数量
      checkLength(){
        // filter()过滤   返回过滤选中商品的长度
        return this.cartList.filter(item=>item.checked).length
      },
      // 1.全选的显示 使用every 所有的对象都选中全选就选中  方法一
      isSelectAll () {
        // 如果在没有数据的情况下就是没选中
        if(this.cartList.length === 0) return false
        // every 所有对象都要符合条件 整体才返回true
        return this.cartList.every(item=>{
          return item.checked
        })
      },

      // 2.全选的显示 使用find  方法二
      // isSelectAll () {
      //   // 如果在没有数据的情况下就是没选中
      //    if(this.$store.state.cartList.length === 0) return false
      //   // find()查找指定的  查找有没有不选中的 如果有没选中的全选就不选中
      //   return !this.$store.state.cartList.find(item=>!item.checked)
      // }

      // 3.全选的显示 使用filter  方法三
      // isSelectAll(){
      //   if(this.$store.state.cartList.length === 0) return false
      //   return !(this.$store.state.cartList.filter(item=>!item.checked).length)
        
      // }
    },
    // 过滤器
     filters:{
        currency(value){
          if(!value) return 0.00  //toFixed(2)保留2位小数
          return '￥'+value.toFixed(2)+'元'
        }
      },
    methods: {
      // 全选反选 方法一
      checkBtnClick(){
        let falg = !this.isSelectAll
        this.cartList.forEach(item=>{
          item.checked = falg
        })
      },

      // 全选反选 方法二
      // checkBtnClick () {
      //   if(this.isSelectAll){  //全部选中 
      //     this.$store.state.cartList.forEach(item=>{
      //       item.checked = false
      //     })
      //   }else{  //部分或全部不选中
      //     this.$store.state.cartList.forEach(item=>{
      //       item.checked = true
      //     })
      //   }
      // }

      // 点击结算 没有数量的话提示
      product(){
        if(!this.isSelectAll){
          Toast('请选择商品')
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 50px;
    font-size: 16px;
    color: #f00;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }

  .buy-product {
    border-radius: 10px;
  }
</style>
