import { config } from '../config.js'

const tips = {
  1: "抱歉，出现了一个错误",
  1005: "appkey无效，请前往七月官网申请",
  3000: "期刊不存在"
}

class HTTP {
  //Es6解构的写法，传参就可以写对象了
  request({url, data = {}, method = 'GET'}){
  // request(url,data={},method='GET'){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,data={},method='GET') {
    // if (!params.method) {
    //   params.method = 'GET'
    // }
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // console.log(res)
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }