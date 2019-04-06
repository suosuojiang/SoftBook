import {HTTP} from '../util/http.js'
// 让ClassicModel继承HTTP的方法
class ClassicModel extends HTTP{
  // 接收pages/classic中的如下函数
  //   (res) => {
  //   this.setData({
  //     classicData: res
  //   })
  //   console.log(this.data)
  // }
  getLatest(sCallback){
    //this指的就是HTTP
    this.request({
      url: 'classic/latest',
      success: (res) => {
        //把结果回传给pages
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  //把getPrevious和getNext合并
  getClassic(index, nextOrPrevious, sCallback) {

    let key = nextOrPrevious == 'next'?
        this._getKey(index+1) : this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        //模版字符串，除了变量还可以{函数}
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index),res)
          //把结果回传给pages
          sCallback(res)
        }
      })
    }
    else{
      sCallback(classic)
    }
  }

  /*
  getPrevious(index, sCallback){
    this.request({
      url:'classic/' + index + '/previous',
      success: (res) => {
        //把结果回传给pages
        sCallback(res)
      }
    })
  }

  getNext(index, sCallback){
    this.request({
      url: 'classic/' + index + '/next',
      success: (res) => {
      //把结果回传给pages
      sCallback(res)
      }
    })
  }
  */
  getById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }

  isFirst(index){
    return index == 1 ? true : false;
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor(sCallback){
    // const params = {
    //   url:'classic/favor',
    //   success:success
    // }
    // this.request(params)
    this.request({
      url: '/classic/favor',
      success: (res) => {
        console.log(res)
        //把结果回传给pages
        sCallback(res)
      }
    })
  }

  _setLatestIndex(index){
    // 同步写入缓存
    // 传入一个期刊号index，就可以用latest:index的模式保存
    wx.setStorageSync('latest', index)
  }

  //这个方法用来读取缓存中的内容
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index){
    let key = 'classic-' + index
    return key
  }
}
export {ClassicModel}