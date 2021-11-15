import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import VantUI from 'vant'

import 'mint-ui/lib/style.css'
// 导入mui框架样式
import './lib/mui/css/mui.css'

Vue.use(MintUI,ElementUI,VantUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')