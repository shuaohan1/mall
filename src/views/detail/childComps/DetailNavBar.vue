<template>
  <div class="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" 
            class="title-item" 
            :class="{active: index === currentIndex}"
            @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from '../../../components/content/Navbar.vue'
export default {
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  },
}
</script>
<style scoped>
.detail {
  background-color: #fff;
}
.title {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
}

.title-item {
  flex: 1;
}

.active {
  color: pink;
}

.back {
  margin-top: 1px;
}
</style>