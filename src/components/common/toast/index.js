// 加入购物车提示信息 toast


import Toast from './Toast'

const obj = {}

// 一开始执行install函数
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new的方式 根据组件构造器 可以创建出来一个组件对象
  const toast = new toastContrustor()
  // 3.将组件对象，手动挂载到toast上
  //   $mount 手动挂载   careateElement()创建一个节点
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的是div 向body添加一个节点  appendChild()添加子节点
  document.body.appendChild(toast.$el)

  // 5.将$toast 添加到toast组件对象
  Vue.prototype.$toast = toast
}
export default obj
