// pages/classic/classic.js
// import { HTTP } from '../../util/http.js'
// let http = new HTTP()
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // setData中的classicData最终也会传递过来
    classicData:null,
    //因为初始化加载时获取的就是最新期刊，所以这里默认true
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // getLatest()方法是个异步方法，不能用下面的方式传递结果
    // let latest = classic.getLatest()
    classicModel.getLatest((res)=>{
      // this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData:res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
      console.log(this.data)
    })  
  },
  // 此方法被绑定在pages的wxml元素中
  onLike:function(event){
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  onNext: function (event) {
    this._updateClassic('next')
  },

  _updateClassic: function(nextOrPrevious){
    let index = this.data.classicData.index

    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  /*
  onPrevious: function(event){
    let index = this.data.classicData.index

    classicModel.getPrevious(index, (res)=>{
      this.setData({
        classicData:res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  onNext: function (event) {
    let index = this.data.classicData.index

    classicModel.getNext(index, (res) => {
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  */

  _getLikeStatus:function(artID, category){
    likeModel.getClassicLikeStatus(artID, category,(res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
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