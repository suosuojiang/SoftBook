// pages/my/my.js

import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

import {
  ClassicModel
} from '../../models/classic.js'

const classicModel = new ClassicModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    showAvatar: false,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
    // wx.getUserInfo({
    //   success:data=>{
    //     console.log(data)
    //   }
    // }) 
  },

  getMyFavor(){
    classicModel.getMyFavor(res=>{
      console.log(res)
      this.setData({
        classics:res
      })
      console.log(this.data.classics)
    })
  },

  onPreviewTap: function (event) {
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },

  getMyBookCount(){
    bookModel.getMyBookCount().then(res=>{
      this.setData({
        bookCount:res.count
      })
    })    
  },

  userAuthorized(){
    // 获取用户数会否授权的状态
    wx.getSetting({
      success:data=>{
        // console.log(data)
        // 如果用户已经授权了
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data=>{
              this.setData({
                userInfo: data.userInfo,
                showAvatar: true
              })
            }
          })
        }
      }
    })
  },

  // 获取用户信息
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    console.log(userInfo)
    if(userInfo){
      this.setData({
        userInfo: userInfo,
        showAvatar: true
      })
      this.getMyBookCount()
    }
    // console.log(this.data.avatar)
  },

  // 跳转到about详情页
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
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