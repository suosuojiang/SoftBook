// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    //是否是第一期
    first: Boolean,
    //是否是最新一期
    latest: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: "images/triangle.dis@left.png",
    leftSrc: "images/triangle@left.png",
    disRightSrc: "images/triangle.dis@right.png",
    rightSrc: "images/triangle@right.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function(event){
      //当当前内容不是最新的时候才绑定left事件
      if(!this.properties.latest){
        this.triggerEvent('left',{

        },{})
      }
    },
    onRight: function(event){
      if (!this.properties.first) {
        this.triggerEvent('right', {

        }, {})
      }
    }
  }
})
