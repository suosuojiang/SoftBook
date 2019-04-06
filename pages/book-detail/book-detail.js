// pages/book-detail/book-detail.js
import {
  BookModel
}from '../../models/book.js'
import {
  LikeModel
}from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    // posting用于控制底部显示
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    //页面如何接收参数？通过options接收组件传递过来的id
    const bid = options.bid
    console.log(options)
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    // all是所有请求都完成才触发回调函数，race则是只要有一个完成
    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      console.log(res)
      this.setData({
        book:res[0],
        comments:res[1].comments,
        likeStatus:res[2].like_status,
        likeCount:res[2].fav_nums
      })
      wx.hideLoading()
    })
  },
  //   以上promise代替了如下写法
  //   detail.then(res=>{
  //     this.setData({
  //       book:res
  //     })
  //     console.log(res)
  //   })

  //   comments.then(res=>{
  //     this.setData({
  //       comments:res.comments
  //     })
  //     console.log(res)
  //   })

  //   likeStatus.then(res => {
  //     this.setData({
  //       likeStatus: res.like_status,
  //       likeCount: res.fav_nums
  //     })
  //     console.log(res)
  //   })


  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost:function(event){
    this.setData({
      posting:true
    })
  },

  onCancel:function(event){
    this.setData({
      posting: false
    })
  },
  // input输入框和v-tag标签被提交或点击都应该传递数据到后台
  onPost:function(event){
    const comment = event.detail.text || event.detail.value
    //event.detail.value获取input的值
    
    if(!comment){
      return
    }
    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment)
    .then(res=>{
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })
      // 把新的短评添加到短评数组的第一位，并标名数量1
      console.log(this.data.comments)
      this.data.comments.unshift({
        content: comment,
        nums:1
      })
      // 把添加后的数组返回给数据
      this.setData({
        comments:this.data.comments,
        posting:false
      })

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})