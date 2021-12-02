<template>
  <div class="catrgory">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="conent">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content">
        <tab-content-category :subcategories="showSubcategory"/>
      </scroll>
    </div>
    <tabber/>
  </div>
</template>

<script>
import NavBar from '../components/content/Navbar.vue'
import TabMenu from './childComps/TabMenu.vue'
import TabContentCategory from './childComps/TabContentCategory.vue'

import {getCategory,getSubcategory,getCategoryDetail} from '../network/category'
import Tabber from './Tabber.vue'
import Scroll from '../components/content/Scroll.vue'
export default {
  data () {
    return {
      categories:[],
      categoryData:{},
      currentIndex: -1
    }
  },
  created () {
    this._getCategory()
  },
  mounted () {},
  components:{
    TabMenu,
    NavBar,
    TabContentCategory,
    Tabber,
    Scroll
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex ===-1) return{}
        return this.categoryData[this.currentIndex].subcategories
    }
  },
  methods:{
    _getCategory(){
      getCategory().then(res=>{
        console.log(res);
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {}
            }
          }
        // 3.请求第一个分类数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index){
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then(res=>{
        console.log(res);
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
      })
    },
    _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
          console.log(res);
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
    /**
     * 事件响应相关的方法
     */
    selectItem(index){
      this._getSubcategories(index)
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: pink;
  color: #fff;
}

.conent {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 50px;
  display: flex;
}

#tab-content {
  overflow: hidden;
    height: 100%;
    flex: 1;
  }
</style>
