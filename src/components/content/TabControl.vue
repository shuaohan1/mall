<template>
<!-- 流行 新款 精选 切换 -->
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles"
     :key="index"
     :class="{active:index === currentIndex}"
     @click="itemClick(index)"
     >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      // 子传父 将要点击的事件传出去
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: pink;
}

.active span {
  border-bottom: 3px solid pink;
}
</style>