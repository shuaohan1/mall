<template>
<!-- 十点抢券 列表 -->
  <div class="recommends">
    <div class="item-recommends" v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  // 动态传值
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
.recommends{
  display: flex;
  width: 100vw;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}

.item-recommends {
  flex: 1;
}

.item-recommends img {
  width: 68px;
  height: 68px;
}
</style>