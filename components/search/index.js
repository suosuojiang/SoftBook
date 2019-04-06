// components/search/index.js

import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({

  behaviors:[paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type:String,
      // 当属性的变量值发生变化时自动调用observer
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    // dataArray:[],
    searching:false,
    // q是搜索的内容
    q:'',
    loading:false,
    loadingCenter:false
  },
  
  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then((res)=>{
      // console.log(res)
      this.setData({
      hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      //杜绝q为空的情况
      if(!this.data.q){
        return
      }
      // 如果loading为true就不再给服务器发送请求，以免重复
      if (this.isLocked()){
        return
      }
      // 第一次显然dataArray的长度为20
      // const length = this.data.dataArray.length
      // loading为true就不再给服务器发送请求
      if(this.hasMore()){
        this.locked()
        // this.data.loading = true
      // bookModel.search(length, this.data.q).then(res=>{
      bookModel.search(this.getCurrentStart(), this.data.q).then(res=>{
        // 把请求到的结果和之前的结果合并成新数组tempArray
        // const tempArray = this.data.dataArray.concat(res.books)
        this.setMoreData(res.books)
        // this.setData({  
          // 把新数组传递给旧数组，此后每次调用此方法，旧数组的长度也就相应变化
          // dataArray: tempArray,
        // })
        // 一次请求完成后，让loading变为false，用户可以再次发送请求
        // this.data.loading = false
        this.unlocked()
      },()=>{
        this.unlocked()
      })
      }
    },

    onCancel(event){
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },

    onDelete(event){
      this.initialize()
      this._endSearching()
    },

    onConfirm(event){
      // this.setData({
      //   // 控制搜索结果的展示
      //   searching: true
      // })
      this._changeSearching()
      this._showLoadingCenter()
      
      //前者是输入的文本，后者是事件中携带的文本
      console.log
        (event.detail.text)
      const searchWord = event.detail.value || event.detail.text
      this.setData({
        // 把请求到的结果赋值给dataArray，由于服务端设置默认20条，第一次的长度只有20
        // 被paginationBev替代 dataArray:res.books,
        q: searchWord
      })
      bookModel.search(0, searchWord).then(res=>{
        // 调用paginationBev的方法设置dataArray和total
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(searchWord)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },

    _changeSearching(){
      this.setData({
        searching: true
      })
    },

    _endSearching(){
      this.setData({
        searching: false,
        q:''
      })
    }

  }
})
