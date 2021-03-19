// components/gift/gift.js
import URL from '../../api/url'

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasmobile1: app.globalData.hasmobile1,
    hasSK: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    opengift(e) {
      console.log(e);
      let tabtype = e.currentTarget.dataset.tabtype
      this.triggerEvent('opengift', {
        tabtype
      })
    },

    getPhoneNumber(e) {
      console.log(e);
      if (e.detail.encryptedData) {
        wx.setStorageSync('encryptedData', e.detail.encryptedData)
        wx.setStorageSync('iv', e.detail.iv)
        let iv = wx.getStorageSync('iv')
        let encryptedData = wx.getStorageSync('encryptedData')
        let sk = wx.getStorageSync('storage').wechatData.session_key
        let uid = wx.getStorageSync('uid')
        wx.request({
          url: URL.UPDATE_MOBILE,
          method: "POST",
          data: {
            uid,
            iv,
            sessionKey: sk,
            encryptedData,
          },
          success: res => {
            this.opengift(e)
            app.globalData.hasmobile1 = true
            this.setData({
              hasmobile1: app.globalData.hasmobile1
            })
            console.log(app.globalData.hasmobile1);
            console.log(this.data.hasmobile1);


          }
        })
      }
    },


  },

  lifetimes: {
    created() {


    },
    attached() {
      let hasSK = wx.getStorageSync('storage').wechatData ? true : false
      this.setData({
        hasSK
      })

      console.log(!this.data.hasmobile1 && this.data.hasSK);
      console.log('当前是否获取手机', this.data.hasmobile1);
      console.log('当前是否有sk', this.data.hasSK);


    }
  },
  pageLifetimes: {
    show: function () {
      console.log(app.globalData.hasmobile1);
      this.setData({
        hasmobile1: app.globalData.hasmobile1
      })
      console.log(this.data.hasmobile1);

      // 页面被展示
      let hasSK = wx.getStorageSync('storage').wechatData ? true : false
      this.setData({
        hasSK
      })

      console.log(!this.data.hasmobile1 && this.data.hasSK);
      console.log('当前是否获取手机', this.data.hasmobile1);
      console.log('当前是否有sk', this.data.hasSK);

    },

  }

})