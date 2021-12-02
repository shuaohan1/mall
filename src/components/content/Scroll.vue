<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    // 通过ref获取指定的div
    // 创建
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 将点击事件设置为true
      click:true,
      // 监听滚动
      probeType:this.probeType,
      // 上拉加载
      pullUpLoad:this.pullUpLoad
    }),

    // 监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    // 监听上拉加载更多  监听Scroll滚动到底部
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods: {
    // 回到顶部
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    },
    // 监听item中图片加载完成
    refresh(){
      this.scroll.refresh()
      // console.log('-----');
    },
    // 完成上拉加载更多
    finishPullUp(){
      this.scroll.finishPullUp()
    },
  },
}
</script>
<style scoped>

</style>