import {
  HTTP
}
  from '../util/http-p.js'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }

  getHot(){
      return this.request({
        url: '/book/hot_keyword',
      })
  }

  addToHistory(keyword){
    // 检查输入或点击的值是否存在于缓存中
    let words = this.getHistory()
    const has = words.includes(keyword)
    // 如果没有就加到数组最前面
    if(!has){
      //关键词大于等于10个时，删除最后一个再从首位添加
      const length = words.length
      if(length>=this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      // 把更新好的数组值放到缓存中
      wx.setStorageSync(this.key, words)
    }
    
  }
}

export {KeywordModel} 