import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tabber from '../views/Tabber.vue'
import Shopcart from '../views/Shopcart.vue'
import Category from '../views/Category.vue'
import User from '../views/User.vue'
import Detail from '../views/detail/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/tabber',
    name: 'tabber',
    component:Tabber
  },
  {
    path: '/shopcart',
    component: Shopcart,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/user',
    component: User,
  },{
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
