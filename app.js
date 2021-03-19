// app.js
import URL from './api/url'

App({


  onLaunch() {
    let encryptedData = wx.getStorageSync('encryptedData')
    console.log(encryptedData);
    
    this.globalData.hasmobile1 = encryptedData ? true : false

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('未授权');
        }
      }
    })

    // 获取礼包数据，全局所有页面共享使用
    wx.request({
      url: 'url',
    })

  },
  globalData: {
    userInfo: null,
    giftData: null,
    hasmobile1: false
  }

})