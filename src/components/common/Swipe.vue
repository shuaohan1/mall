<template>
<!-- 轮播图 -->
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
   props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods: {
    // 监听轮播图是否加载完成
    imageLoad(){
      // 只拿到一次
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
}
</script>

<style scoped>
img {
  height: 100%;
  width: 100%;
}

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 10px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>