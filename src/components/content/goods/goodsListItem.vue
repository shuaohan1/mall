<template>
  <div class="goods-item">
    <!-- @load 在图片加载完成之后触发 -->
    <!-- v-lazy="showImage" 图片懒加载 -->
    <img v-lazy="showImage" @load="imageLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // 监听item中图片加载完成
    // 将itemImageLoad事件发送出去
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    // 跳转到详情页
    itemClick(){
      this.$router.push('/detail/'+ this.goodsItem.iid)
    }
  },
}
</script>
<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: #000;
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('../../../assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>