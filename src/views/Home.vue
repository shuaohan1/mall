<template>
  <div class="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <!-- 多添加的一个来进行吸顶效果 -->
    <tab-control class="tab-control" :titles="['流行','新款','精选']" 
                     @tabClick="tabClick" 
                     ref="tabControl1" 
                     v-show="isTabFixed" />
    
    <!-- scroll 滚动 -->
    <scroll class="content" ref="scroll" 
                            :probe-type="3" 
                            @scroll="contentScroll" 
                            :pull-up-load="true" 
                            @pullingUp="loadMore">
      <swipe class="home-swipe" :banners="banners" @swiperImageLoad = "swiperImageLoad"/>
        <recomment :recommends="recommends"/>
        <feature></feature>
        <!-- @tabClick 子组件传出来的点击事件 -->
        <tab-control :titles="['流行','新款','精选']" 
                     @tabClick="tabClick" 
                     ref="tabControl2" />
        <goods-list class="goods-list" :goods="showGoods"/>
    </scroll>
    <!-- 底部导航栏 -->
    <tabber/>
    <!-- native 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
// 子组件
import Swipe from '../components/common/Swipe.vue'
import Recomment from '../components/common/Recomment.vue'
import Feature from '../components/common/Feature.vue'

// 公共组件
import TabControl from '../components/content/TabControl.vue'
import Navbar from '../components/content/Navbar.vue'
import GoodsList from '../components/content/goods/goodsList.vue'
import Scroll from '../components/content/Scroll.vue'
import BackTop from '../components/content/BackTop.vue'
import {debounce} from '../components/content/utils'

import {getHomeMultidata,getHomeGoods} from '../network/home'
import Tabber from './Tabber.vue'
export default {
  destroyed() {
    console.log('---------');
  },
  name: 'home',
  data() {
    return {
      // 轮播图列表数据
      recommends:[],
      // 轮播图数据
      banners:[],
      // 商品数据
      goods:{
        // 流行
        'pop':{page:0,list:[]},
        // 新款
        'new':{page:0,list:[]},
        // 精选
        'sell':{page:0,list:[]}
      },
      // 默认流行页
      currentType:'pop',
      // 回顶部
      isShow:false,
      // 是否吸顶（position:fixed）
      tabOffsetTop:0,
      isTabFixed:false
    }
  },
  components: {
    Navbar,
    Swipe,
    Recomment,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    Tabber,
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  // activated()：在vue对象存活的情况下，
  // 进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
  activated() {
    // 刷新
    this.$refs.scroll.refresh()
  },
  mounted() {
    // 防抖函数 将refresh函数传入debounce函数 变量接收防抖函数返回新函数
    const refresh = debounce(this.$refs.scroll.refresh,50)
    // 3.监听item中图片加载完成
    // 监听事件总线的自定义事件（$bus本身是undefined 要在main.js里创建一个Vue实例）
    this.$bus.$on('itemImageLoad',()=>{

      // 加载完之后进行刷新scrollHeight   refresh()
      refresh()
    })
  },
  methods: {
    // 1.请求多个数据
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        // console.log(res);
        this.recommends = res.data.recommend.list
        this.banners = res.data.banner.list
      })
    },
    // 2.请求商品数据
    getHomeGoods(type){
      // 在原来的page上加1
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res);
        // 获取数据res
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1 
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },

    // 事件监听的相关方法
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
      }
      // 防止吸顶后上拉的index设置为最新的index
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    // 监听滚动
    contentScroll(position){
      // 1.回到顶部 判断BackTop是否显示
      // 当-position.y大于1000的时候为true
      this.isShow = (-position.y)>1000

      // 2.决定BackTop是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
      console.log('加载更多');
    },
    // 在轮播图加载完后获取tab-control的顶部高度
    swiperImageLoad(){
      // 组件都有属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    }
  }

}
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: #fff;
  /* 2.既然home-nav已经脱离标准流高度将不进入整体计算 那么将整体头部的内边距设置为44px来显示 */
  /* padding-top: 44px; */

  position: relative;
}
.home-nav {
  color: #fff;
  background-color: pink;
  /* 1.fixed 定位 脱离标准流 下面的轮播图会将它覆盖 设置z-index显示到上面来 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.home-swipe {
  height: 200px;
  background-color: rosybrown;
}

.goods-list {
  height: 100%;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;

  /* 不起作用 */
  /* height: calc(100% - 94px);
  overflow: hidden;
  margin-top: 44px; */
}

.tab-control {
  background-color: #fff;
  position: relative;
  z-index: 9;
}
</style>
