<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  name:'Toast',
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  methods:{

    // 无效  暂时无法解决
    // ES6新语法 添加默认信息 message="默认",duration="200"
    show(message="默认",duration=2000){
      console.log(message,duration);
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
}
</script>
<style scoped>
  .toast {
    position:fixed;
    top:50%;
    left:50px;
    transform:translate(-50%,-50%);
    padding:8px 10px;

    z-index:999;

    color:#fff;
    background-color:rgb(0,0,0,.75)
  }
</style>