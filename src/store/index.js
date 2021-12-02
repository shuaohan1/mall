import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCounter(state,info){
      info.count++
    },
    addToCart(state,info){
      state.cartList.push(info)
    }
  },
  getters:{
    cartList(state) {
      return state.cartList
    },
    cartCount(state,getters){
      return getters.cartList.length
    },
  },
  actions: {
    addCart(context,info){
      console.log(info);
      return new Promise((resolve,reject)=>{
        // 1.查看是否添加过
      // find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined
      const oldInfo = context.state.cartList.find(item=>item.iid === info.iid)
      // 2. 加一或者新添加
      if(oldInfo) {
        // oldInfo.count +=1
        context.commit('addCounter',oldInfo)
        resolve('数量加一')
      }else {
        info.count = 1
        // 点击
        info.checked = false
        // context.state.cartList.push(info)
        context.commit('addToCart',info)
        resolve('商品加一')
      }
      })
    }
  },
  modules: {
  }
})
