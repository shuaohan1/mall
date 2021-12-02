import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import Vant from 'vant'

import 'vant/lib/index.css';
import 'mint-ui/lib/style.css'
// 导入mui框架样式
import './lib/mui/css/mui.css'



Vue.use(MintUI)
Vue.use(Vant)

Vue.config.productionTip = false

// 添加事件总线 将$bus设置为Vue实例
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
