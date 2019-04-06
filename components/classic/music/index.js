// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
//调用音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  //从classicBeh中继承properties
  properties: {
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png"
  },

  attached:function(event){
    //因为music组件是由wx:if控制是否显示的，每次切换都会造成生命周期的重启
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached:function(event){
    // mMgr.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      //图片的切换
      if (!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src 
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
      
    },

    _recoverStatus:function(){
      //如果全局没有任何音乐在播，也就是mMgr.paused为true
      if(mMgr.paused){
        this.setData({
          //让播放按钮变为play状态
          playing:false
        })
        //不要再继续判断了
        return
      }
      //如果播放控件的src地址和当前页properties里的src相等
      // console.log(this.properties.src, mMgr.src)
      if(mMgr.src == this.properties.src){
        this.setData({
          //让播放按钮变为parse状态
          playing: true
        })
      }
    },

    _monitorSwitch:function(event){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
