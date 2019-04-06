// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      //当这里为number 时，拼串的0会被忽视，所以不可以为Number
      type: String,
      //当我们改变了index的值时，小程序主动来调用observer
      //并传递三个值：新值、旧值、路径
      //observer里
      observer: function (newVal, oldVal, changedPath) {
        let val = newVal<10 ? "0" + newVal : newVal
        this.setData({
          _index: val
        })
      }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: "",
    month: "",
    _index: "",
    months: [
      "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
    ]
  },

  // observers: function (newVal,oldVal,changedPath) {
  //   let val = newVal<10 ? "0" + newVal : newVal
  //   this.setData({
  //     index: val
  //   })
  // },
  attached: function(){
    let date = new Date
    let year = date.getFullYear()
    let month = date.getMonth()
    
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
