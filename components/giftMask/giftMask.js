// components/giftMask/giftMask.js
import URL from '../../api/url'
let uid
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String
    },
    isjl: {
      type: Boolean
    },
    tabtype: {
      type: String
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isjiangli: true, //打开展示哪个

    myInfo: null,
    myRank: -1,
    rank: [],
    open: false,
    uid: ''


  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnCofirm() {
      this.triggerEvent('btnContinue')
    },

    closegift() {
      // 更新开关状态
      wx.request({
        url: URL.UPDATE_IS_DISPLAYFAT,
        method: 'POST',
        data: {
          uid: this.data.uid,
          isDisplayFat: this.data.open
        },
        success: res => {
          this.triggerEvent('closegift', {
            isDisplayFat: this.data.open
          })


        },

      })

    },
    btnjli() {
      this.setData({
        isjiangli: true,

      })
    },
    btnhd() {
      this.setData({
        isjiangli: false,
      })
    },
    imgbtn() {
      this.setData({
        open: !this.data.open
      })
    }



  },

  lifetimes: {
    created() {
      uid = wx.getStorageSync('uid')
      if (uid) {
        // 获取开关状态
        wx.request({
          url: URL.GET_IS_DISPLAYFAT,
          method: 'POST',
          data: {
            uid
          },
          success: res => {
            let isDisplayFat = res.data.isDisplayFat ? (res.data.isDisplayFat == 1 ? true : false) : false
            this.setData({
              open: isDisplayFat
            })
          }
        })
      }



      // 获取排行状态
      wx.request({
        url: URL.GET_USER_RANK,
        data: {
          uid
        },
        method: 'POST',
        success: res => {
          let rankData = res.data
          this.setData({
            myInfo: rankData.myInfo,
            myRank: rankData.myRank,
            rank: rankData.rank,
          })
        }
      })
    },
    attached() {
      this.setData({
        uid
      })
      console.log(this.data.uid == '');
      console.log('当前为', this.properties.tabtype);
      let isjl = this.properties.tabtype == 'jl' ? true : false

      this.setData({
        isjiangli: isjl
      })
      // console.log(this.data.isjiangli);
    },
    detached() {

    }

  }


})