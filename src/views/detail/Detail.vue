<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-botton-bar @addToCart="addCart"/>
    <!-- 回调顶部 -->
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>
<script>
// 导航栏
import DetailNavBar from './childComps/DetailNavBar.vue'
// 轮播图
import DetailSwiper from './childComps/DetailSwiper.vue'
// 商品信息
import DetailBaseInfo from './childComps/DetailBaseInfo'
// 商家信息
import DetailShopInfo from './childComps/DetailShopInfo.vue'
// 商品的详情信息
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
// 商品的参数信息
import DetailParamInfo from './childComps/DetailParamInfo.vue'
// 商品的评论信息
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
// 商品的推荐参数  在goodsList组件中使用
import goodsList from '../../components/content/goods/goodsList.vue'
// 底部导航栏
import DetailBottonBar from './childComps/DetailBottonBar.vue'
// 回到顶部
import BackTop from '../../components/content/BackTop.vue'

import {debounce} from '../../components/content/utils'
import Scroll from '../../components/content/Scroll.vue'

import {Toast} from 'vant'

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '../../network/detail'
export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      // 轮播图数据
      topImages:[],
      goods:{},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo: {},
      recommend:[],
      // 获取图片加载完成
      themeTops:[],
      getThemeTopY:null,
      // 
      currentIndex:0,
      isShow:false
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    goodsList,
    DetailBottonBar,
    BackTop
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    this.getDetail()
    // 3.请求推荐数据
    this.getRecommend()
    // 4.给getThemeTops赋值（对赋值进行防抖）
    // 获取所有主题的offsetTop
    this.getThemeTopY = debounce(()=>{
        this.themeTops=[]
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.params.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTops);
        // 给上拉跳到指定主题设置的
        //  条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
        this.themeTops.push(Number.MAX_VALUE)
      })
  },
  methods: {
    // 2.根据iid请求详情数据
    getDetail(){
      getDetail(this.iid).then(res=>{
        console.log(res);
        // 1.获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 3.获取商家店铺信息
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情信息
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 6.获取评论信息
        if(data.rate.list){
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    // 3.请求推荐数据
    getRecommend(){
      getRecommend().then(res=>{
        console.log(res);
        this.recommend = res.data.list
      })
    },

    // 监听商品的详情信息是否加载完成
    imageLoad(){
      // 加载完之后进行一次刷新scrollHeight
      this.$refs.scroll.refresh()
      // 在监听调用this.getThemeTopY
      this.getThemeTopY()
    },
    // 点击某某回到某某指定位置
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTops[index],200)
    },
    // 下拉获取y值的位置
    contentScroll(position){
      // 1.获取y值
      const positionY = -position.y
      // console.log(positionY);
      // 2.positionY和主题中的值进行对比
      let length = this.themeTops.length
      for(let i = 0; i < length-1; i++){
        if(this.currentIndex !==i && (positionY >=this.themeTops[i] && positionY < this.themeTops[i+1])){
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 回到顶部  判断BackTop是否显示
      this.isShow = (-position.y>1000)
    },
    // 回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    // 加入购物车
    addCart(){
      console.log('-------');
      // 1.获取展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.oldPrice
      // 2.将商品添加到Store 购物车中（1.actions会返回一个Promise 2.映射mapActions）
      // 2.1. 使用映射关系
      this.$store.dispatch('addCart',product).then(res=>{
        console.log(res);
        Toast('加入购物车成功 亲~')
        // this.$toast('加入购物车成功 亲~')
      })

      // 2.2. 常规
      // this.$store.dispatch('addCart',product).then(res=>{
      //   Toast('提示内容');
      // })
    }
  },
}
</script>
<style scoped>
.detail {
    height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 11;
    background-color: #fff;
  }

  .detail-nav {
    height: 44px;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 50px;
  }
</style>