<template>
  <div class="detail-swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    
  }
}
</script>
<style scoped>
.my-swipe {
  height: 300px;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>