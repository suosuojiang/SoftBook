// pages/book/book.js

import {
  BookModel
} from '../../models/book.js'

import {
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searching: false,
    more:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
    .then(res => {
      this.setData({
        books : res
      })
    })
    //    当接口调用层层嵌套时的正确写法
    // bookModel.getHotList()
    //   .then(res => {
    //     console.log(res)
    //     嵌套时返回的必须是promise对象
    //     return bookModel.getMyBookCount()
    //   })
    //   .then(res => {
    //     console.log(res)
    //     return bookModel.getMyBookCount()
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })

    // 错误写法
    // const hotList = bookModel.getHotList()
    // hotList.then(
    //   res=>{
    //     console.log(res)
    //     bookModel.getMyBookCount()
    //     .then(res=>{
    //       console.log(res)
    //       bookModel.getMyBookCount()
    //       .then (res=>{
    //         console.log(res)
    //       })
    //   })
    // })
  },

  onSearching:function(event){
    this.setData({
      searching : true
    })
  },

  //此方法由
  onCancel: function (event) {
    this.setData({
      searching: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   * 页面触底时，通过random方法给more传递不同的值，由于more是组件的属性
   * 每次more变化，属性中observe绑定的方法load_more就会触发，
   * 向服务端发送search请求，传递搜索内容和返回的起始位置
   * 组件的wxml文件利用服务器返回的结果进行页面渲染
   */
  onReachBottom(){
    this.setData({
      more: random(16)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})