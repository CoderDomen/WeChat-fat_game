// pages/othinvite/othinvite.js
import HappyShare from '../../utils/palette';
import URL from '../../api/url'
import {
  WXRequest
} from '../../utils/util';
let uid;
let imagePath



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: uid,
    filePath: "",
    roomId: 0,
    playerInfo: [],
    maindata: [],
    num: 0,
    fzinfo: {},
    myinfo: {},
    roomUserId: -1,
    paintPallette: null,
    isGift: false,
    isMask: false,
    isContinue: false,

    rankData: null,
    tabtype: 'jl'

  },

  getRule() {
    this.setData({
      isMask: true
    })
  },
  btnCofirm() {
    console.log('1231321');
    this.setData({
      isMask: false
    })
  },

  // 礼包弹框
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

  closegift(e) {
    this.setData({
      isGift: false
    })
    let dis = e.detail.isDisplayFat ? '1' : '0'
    if (dis != this.data.myinfo.is_display_fat) {
      // 获取本人数据
      wx.request({
        url: URL.GET_DATA_BY_UID,
        data: {
          uid,
        },
        method: 'POST',
        success: res => {
          let myinfo = res.data.data
          // myinfo.height = (myinfo.height * 100).toFixed(1)
          myinfo.bmi = myinfo.bmi.toFixed(2)
          this.setData({
            myinfo
          })
          console.log(this.data.myinfo);
        }
      })

    }




  },
  btnContinue() {
    this.onClick()

  },


  closeContinue() {
    this.setData({
      isContinue: false
    })
  },


  onClick() {
    let rid;
    wx.request({
      url: URL.GET_ROOM_ID,
      data: {
        uid
      },
      method: 'POST',
      success: res => {
        rid = res.data.roomId

        wx.request({
          url: URL.MY_NUMBER,
          data: {
            uid,
            "roomId": rid
          },
          method: 'POST',
          success: res => {
            if (res.data.successed) {
              if (res.data.menberNumber >= 5) {
                wx.navigateTo({
                  url: `../../pages/myfat/myfat?$roomId=${{rid}}`,
                })
              } else {
                wx.navigateTo({
                  url: `../../pages/myinvite/myinvite?$roomId=${{rid}}`,
                })

              }
            }
          }
        })

      }
    })
  },

  // 点击 + 号
  imageClick(e) {
    if (!e.currentTarget.dataset.image) {
      console.log(e);
      this.setData({
        isContinue: true

      })
    }

  },


  // painter绘图完毕
  onImgOK(e) {
    console.log(e);
    imagePath = e.detail.path
  },

  // 绘画
  onImg() {
    console.log(this.data.fzinfo);
    let title = 'TA是朋友圈'
    let girl = '/assets/images/inviteboy2.png'
    wx.getImageInfo({
      src: this.data.fzinfo.userImage,
      success: res => {
        console.log(res);
        this.setData({
          paintPallette: new HappyShare(res.path, title, girl).palette(),
        });
        console.log(this.data.paintPallette);
      },
    });
  },

  // 根据当前房间号获取数据
  getRoomInfo() {

    // 获取本人数据
    wx.request({
      url: URL.GET_DATA_BY_UID,
      data: {
        uid,
      },
      method: 'POST',
      success: res => {
        let myinfo = res.data.data
        // myinfo.height = (myinfo.height * 100).toFixed(1)
        myinfo.bmi = myinfo.bmi.toFixed(2)
        this.setData({
          myinfo
        })
        console.log(this.data.myinfo);
      }
    })

    // 获取房间数据
    wx.request({
      url: URL.WAITING_ROOM,
      data: {
        "roomId": this.data.roomId
      },
      method: 'POST',
      success: res => {
        let ii = []
        let maindata = res.data.message
        maindata.forEach(item => {
          ii.push(item)
        })
        // main信息
        let nickN = wx.getStorageSync('userInfo').nickName
        let avat = wx.getStorageSync('userInfo').avatarUrl
        console.log(nickN);
        let num = maindata.findIndex(item => {
          return item.userName == nickN && item.userImage == avat
        })
        console.log(num);
        maindata.splice(num, 1)
        this.setData({
          maindata
        })


        // 房主信息
        let fz = ii.filter((item, index) => {
          return item.isOwner == 1
        })
        this.setData({
          fzinfo: fz[0]
        })
        console.log(this.data.fzinfo);

        // center信息
        for (let i = ii.length; i < 5; i++) {
          if (i % 2 == 1) {
            ii.push({
              "userImage": "../../assets/images/blue.png",
            })
          } else if (i % 2 == 0) {
            ii.push({
              "userImage": "../../assets/images/pink.png",
            })
          }
        }
        this.setData({
          playerInfo: ii,
          num: res.data.num
        })
        console.log(this.data.playerInfo);

        // 绘画
        this.onImg()




      },
    })

  },

  // 查看房间人数
  numinroom() {
    wx.request({
      url: URL.MY_NUMBER,
      data: {
        uid,
        "roomId": this.data.roomId //房主房间号
      },
      method: 'POST',
      success: res => {
        if (res.data.menberNumber >= 5) {
          wx.reLaunch({
            url: `../othfat/othfat?roomId=${this.data.roomId}`
          })
        } else {
          this.getRoomInfo()
        }
      }
    })
  },


  // 一、 判断是否自己房间
  isMyHome() {
    // 根据房间id获取房主uid
    wx.request({
      url: URL.GET_ROOMMER_ID,
      data: {
        "roomId": this.data.roomId
      },
      method: 'POST',
      success: res => {
        if (res.data.success) {
          this.setData({
            roomerId: res.data.roomerId
          })
          // 自己分享自己点入
          if (uid === this.data.roomerId) {
            wx.request({
              url: URL.MY_NUMBER,
              data: {
                uid,
                "roomId": this.data.roomId
              },
              method: 'POST',
              success: res => {
                if (res.data.successed) {
                  if (res.data.menberNumber >= 5) {
                    wx.reLaunch({
                      url: `../../pages/myfat/myfat?$roomId=${this.data.roomId}`,
                    })
                  } else {
                    wx.reLaunch({
                      url: `../../pages/myinvite/myinvite?$roomId=${this.data.roomId}`,
                    })

                  }
                }
              }
            })
          } else {
            // 查看房间人数
            this.numinroom()
          }
        }
      }
    })

  },


  // 二、 统计分享
  analyseShare() {
    wx.request({
      url: URL.GET_ROOM_USERID,
      data: {
        uid,
        "roomId": this.data.roomId
      },
      method: 'POST',
      success: res => {
        if (res.data.success) {
          this.setData({
            roomUserId: res.data.roomUserId
          })

          wx.request({
            url: URL.ANALYSE_SHARE,
            data: {
              uid,
              "roomId": this.data.roomId, //房主房间号
              'roomUserId': this.data.roomUserId
            },
            method: 'POST',
            success: res => {
              console.log(res);
            },
          })
        }
      }
    })


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uid = wx.getStorageSync('uid')

    if (options.scene) {
      const scene = decodeURIComponent(options.scene);
      console.log(scene);
      let roomId = scene.split(",")[1]
      this.setData({
        roomId,
      })
      console.log('分享的房间id' + this.data.roomId);
    } else {
      const {
        roomId,
      } = options
      this.setData({
        roomId,
      })
      console.log('分享的房间id' + this.data.roomId);
    }

    if (!uid) {
      wx.reLaunch({
        url: `../index/index?roomId=${this.data.roomId}&jump=true`,
      })
      return
    }

    // 判断身材
    wx.request({
      url: URL.HAVE_BODY_DATA,
      data: {
        uid
      },
      method: 'POST',
      success: res => {
        if (res.data.successed) {
          // 加入房间
          wx.request({
            url: URL.FAT_JOIN_ROOM,
            data: {
              uid,
              "roomId": this.data.roomId //房主房间号
            },
            method: 'POST',
            success: res => {

              // 判断房间进行操作
              this.isMyHome()

              // 统计分享
              this.analyseShare()
            },
          })
        } else {
          wx.reLaunch({
            url: `/pages/personInfo/personInfo?roomId=${this.data.roomId}`,
          })
        }
      },
      fail: res => {
        console.log(res);
      }
    })


  },


  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中'
    })
    console.log(this.data.roomId);
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标

    WXRequest({
      url: URL.MY_NUMBER,
      data: {
        uid,
        "roomId": this.data.roomId
      }
    }).then(res => {
      if (res.data.menberNumber >= 5) {
        wx.reLaunch({
          url: `../othfat/othfat?roomId=${this.data.roomId}`
        })
      } else {
        return WXRequest({
          url: URL.WAITING_ROOM,
          data: {
            "roomId": this.data.roomId
          }
        })

      }
    }).then(res => {
      let ii = []
      let maindata = res.data.message
      maindata.forEach(item => {
        ii.push(item)
      })
      // main信息
      let nickN = wx.getStorageSync('userInfo').nickName
      let avat = wx.getStorageSync('userInfo').avatarUrl
      console.log(nickN);
      let num = maindata.findIndex(item => {
        return item.userName == nickN && item.userImage == avat
      })
      console.log(num);
      maindata.splice(num, 1)
      this.setData({
        maindata
      })


      // 房主信息
      let fz = ii.filter((item, index) => {
        return item.isOwner == 1
      })
      this.setData({
        fzinfo: fz[0]
      })
      console.log(this.data.fzinfo);

      // center信息
      for (let i = ii.length; i < 5; i++) {
        if (i % 2 == 1) {
          ii.push({
            "userImage": "../../assets/images/blue.png",
          })
        } else if (i % 2 == 0) {
          ii.push({
            "userImage": "../../assets/images/pink.png",
          })
        }
      }
      this.setData({
        playerInfo: ii,
        num: res.data.num
      })
      console.log(this.data.playerInfo);
      wx.hideLoading()
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '加载成功',
      })

    }).catch(err => {
      wx.hideLoading()
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    })



  },



  onShareAppMessage: function (res) {

    console.log(this.data.roomId);

    return {
      title: `我怎么第1胖了,快来和我比`,
      imageUrl: imagePath,

      path: `/pages/othinvite/othinvite?roomId=${this.data.roomId}&jump=true`,
    }
  }


})