import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,info){
      console.log(info);
      // 1.查看是否添加过
      // find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined
      const oldInfo = state.cartList.find(item=>item.iid === info.iid)
      // 2. 加一或者新添加
      if(oldInfo) {
        oldInfo.count +=1
      }else {
        info.count = 1
        // 点击
        info.checked = false
        state.cartList.push(info)
      }
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
  },
  modules: {
  }
})
