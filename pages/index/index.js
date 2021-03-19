// index.js
// 获取应用实例

let us, encryptedData, iv, baseInfo, uid
import URL from '../../api/url'
import {
  checkUserStatus,
  userInfo
} from '../../utils/util';

const app = getApp()



Page({
  data: {
    rankData: null,
    tre: false,
    roomId: -1,
    jump: false,
    isMask: false,
    isGift: false,
    isContinue: false,
    tabtype: 'jl',



    isuid:'',
    istxxx: true,
    isfm: false

  },

  // 填写信息点击
  txxxClick() {
    this.setData({
      istxxx: false,
      isfm: true,

    })
  },

  // 封面点击
  fmClick() {
    this.setData({
      isfm: false,
    })
  },





  getRule() {
    this.setData({
      isMask: true
    })

  },


  btnCofirm() {
    this.setData({
      isMask: false
    })
  },

  getgift(e) {
    this.setData({
      isGift: true,
      tabtype: e.currentTarget.dataset.tabtype
    })
  },
  opengift(e) {
    console.log(e);

    this.setData({
      isGift: true,
      tabtype: e.detail.tabtype
    })

  },

  closegift() {
    this.setData({
      isGift: false
    })
  },
  btnContinue() {
    this.setData({
      isContinue: true
    })
  },
  closeContinue() {
    this.setData({
      isContinue: false
    })
  },


  getuserinfo(e) {
    console.log(e);

    if (uid) {
      console.log('本地存在uid');
    }
    if (e.detail.userInfo) {
      console.log(e);
      wx.showLoading({
        title: '加载中',
      })
      us = new userInfo(e.detail)
      checkUserStatus(us).then(res => {
        console.log(res.data);
        console.log('注册后登录返回结果信息', res);
        if (res.data.userId) {
          uid = res.data.userId
        }
        // 分享
        if (this.data.jump) {
          console.log(this.data.jump);
          wx.request({
            url: URL.HAVE_BODY_DATA,
            data: {
              "uid": res.data.userId
            },
            method: 'POST',
            success: res => {
              if (res.data.successed) {
                wx.hideLoading()

                console.log(this.data.roomId);
                // 有
                wx.navigateTo({
                  url: `/pages/othinvite/othinvite?roomId=${this.data.roomId}`,
                })
              } else {
                // 没有身材数据
                wx.navigateTo({
                  url: `/pages/personInfo/personInfo?roomId=${this.data.roomId}`
                })
              }
            },
            fail: res => {
              console.log(res);
            }
          })
        } else {
          // 不是分享
          wx.request({
            url: URL.HAVE_BODY_DATA,
            data: {
              "uid": res.data.userId
            },
            method: 'POST',
            success: res => {
              if (res.data.successed) {
                // 有  获取房间号
                let rid;
                wx.request({
                  url: URL.GET_ROOM_ID,
                  data: {
                    uid
                  },
                  method: 'POST',
                  success: res => {
                    rid = res.data.roomId
                    // 判断房间人数
                    wx.request({
                      url: URL.MY_NUMBER,
                      data: {
                        uid,
                        "roomId": rid
                      },
                      method: 'POST',
                      success: res => {
                        if (res.data.successed) {
                          wx.hideLoading()

                          if (res.data.menberNumber >= 5) {
                            wx.navigateTo({
                              // url: `../../pages/myfat/myfat?$roomId=${{rid}}`,
                              url: `../../pages/myfat/myfat`,
                            })
                          } else {
                            wx.navigateTo({
                              // url: `../../pages/myinvite/myinvite?$roomId=${{rid}}`,
                              url: `../../pages/myinvite/myinvite`,
                            })
                          }

                        }
                      }
                    })

                  }
                })
              } else {
                // 无
                wx.navigateTo({
                  url: '/pages/personInfo/personInfo'
                })
              }
            }
          })
        }
      })

    } else {
      //用户按了拒绝按钮
    }
  },


  onLoad: function (options) {
    uid = wx.getStorageSync('uid')
    console.log(uid);
    this.setData({
      isuid:uid
    })
    if (options.roomId) {
      this.setData({
        roomId: options.roomId,
        jump: options.jump
      })
    }
    console.log('是否分享' + this.data.jump);
    console.log('分享者的房间id' + this.data.roomId);

  },



  onPullDownRefresh: function () {
    // wx.startPullDownRefresh()
    wx.showLoading({
      title: '加载中'
    })
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(() => {
      wx.hideLoading()
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '加载成功',
      })
    }, 500)
  },







  onShareAppMessage: function (res) {
    return {
      title: '比比谁更胖,过年比胖,不服来战!',
      imageUrl: "../../assets/images/bg2.png",
      path: "/pages/index/index",
    }
  }





})