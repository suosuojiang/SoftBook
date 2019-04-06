// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,
      value:false
    },
    count:{
      //默认值为零
      type:Number
    },
    readOnly:{
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //数据绑定
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLikes:function(event){
      if(this.properties.readOnly){
        return
      }
      // 自定义事件
      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count-1 : count+1;
      this.setData({
        count:count,
        like:!like
      })
      //激活
      let behavior = this.properties.like?'like':'cancel'
      // 第一个参数是自定义的事件名，第三个控制冒泡捕获（非必须）
      // 第二个参数把值传给事件对象的detail属性
      this.triggerEvent('like',{
        behavior:behavior,
      },{})
    }
  }
})
