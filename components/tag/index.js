// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    // 启动插槽
    multipleSlots:true
  },
  // 可以在外部设置组件样式
  externalClasses:['tag-class'],

  properties: {
    text:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 为组件绑定一个事件tapping，并传递text值
    onTap(event){
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
