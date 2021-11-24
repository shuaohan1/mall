import { request } from "./request";

export function getDetail(iid){
  return request({
    url:'/detail',
    params: {
      iid
    }
  })
}

// 获取商品推荐
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

// 将服务器的数据封装到一个类中 通过一个对象将数据传递到组件
// 提取商品数据
export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.lowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    console.log(this.oldPrice);
  }
}
// 提取商家数据
export class Shop {
  constructor(shopIfo){
    this.logo = shopIfo.shopLogo
    this.name = shopIfo.name
    this.fans = shopIfo.cFans
    this.sells = shopIfo.cSells
    this.score = shopIfo.score
    this.goodsCoint = shopIfo.cGoods
  }
}

// 提取参数数据
export class GoodsParam {
  constructor(info,rule) {
    // images可能没有值（有些商品有值，有些商品没值）
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}