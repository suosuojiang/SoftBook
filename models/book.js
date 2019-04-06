import {
  HTTP
}
from '../util/http-p.js'
// 让ClassicModel继承HTTP的方法
class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list',
    })
  }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count',
    })
  }

  getDetail(bid) {
    console.log(bid)
    return this.request({
      url: `/book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`,
    })
  }

  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`,
    })
  }

  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // start: 开始记录数，默认为0
  // count: 记录条数，默认为20, 超过依然按照20条计算
  // summary: 返回完整或简介, 默认为0, 0为完整内容, 1为简介
  // q: 搜索内容, 比如你想搜索python相关书籍, 则输入python
  search(start,q){
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
    // console.log(q)
  }

  getMyBookCount(){
    return this.request({
      url: '/book/favor/count'
    })
  }
}
export {
  BookModel
}