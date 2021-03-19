import HappyShare from '../../utils/palette';
import URL from '../../api/url'
import {
  WXRequest
} from '../../utils/util';
let uid;
let imagePath


Page({
  data: {
    rankData: null,
    isPaint: true,
    wenhao: '?',
    wuren: '凑满5人马上开战',
    filePath: "",
    // hold: false // 显示保存二维码
    // uid: '',
    paintPallette: null,
    roomId: -1,
    roomUserId: -1,
    playerInfo: [],
    maindata: [],
    num: 0,
    picurl: "../../assets/images/girl.png",
    isGift: false,
    isMask: false,
    isContinue: false,
    tabtype: 'jl'



  },

  // 规则弹框
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
    console.log(e.detail.isDisplayFat);
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
    this.setData({
      isContinue: true
    })
  },
  closeContinue() {
    this.setData({
      isContinue: false
    })
  },

  findmore() {
    this.setData({
      isContinue: true
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
  //保存二维码
  onSave() {
    if (!this.data.isPaint) {
      wx.saveImageToPhotosAlbum({
        filePath: imagePath,
        success: () => {
          wx.showToast({
            title: '图片保存成功',
          });
        },
        fail: () => {
          wx.showToast({
            title: '取消保存',
            icon: 'error'
          });
        }
      });
    }
  },

  // painter绘图完毕
  onImgOK(e) {
    wx.hideLoading({
      complete: (res) => {},
    })
    this.setData({
      isPaint: false
    })
    console.log(e);
    imagePath = e.detail.path
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中',
    })

    uid = wx.getStorageSync('uid')

    // 获取房间id
    wx.request({
      url: URL.GET_ROOM_ID,
      data: {
        uid
      },
      method: 'POST',
      success: res => {
        if (res.data.success) {
          this.setData({
            roomId: res.data.roomId
          })
          console.log('我的房间id是...', this.data.roomId);

          // 获取roomUserId
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

                // 获取二维码
                wx.request({
                  url: URL.CREATE_QRCODE,
                  method: 'POST',
                  data: {
                    "scene": `${this.data.roomUserId},${this.data.roomId}`,
                    "width": 430
                  },
                  responseType: 'arraybuffer',
                  success: res => {
                    console.log(res);
                    let fileManager = wx.getFileSystemManager();
                    let filePath = wx.env.USER_DATA_PATH + '/inner.jpg';
                    fileManager.writeFile({
                      filePath: filePath,
                      encoding: 'binary',
                      data: res.data,
                      success: res => {
                        console.log(res)
                        console.log(filePath)
                        this.setData({
                          filePath
                        })
                        console.log(this.data.filePath);

                        let ava = wx.getStorageSync('userInfo')
                        console.log(ava);

                        // 绘画海报
                        wx.getImageInfo({
                          src: ava.avatarUrl,
                          success: res => {
                            console.log(res);
                            this.setData({
                              paintPallette: new HappyShare(res.path).palette(),
                            });
                            console.log(this.data.paintPallette);
                          },
                          fail: err => {
                            console.log(err);
                          }
                        });
                      },
                      fail: res => {
                        console.log(res);

                      }
                    })
                  }
                })


              }
            }
          })

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


          // 房间id获取数据
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
              maindata.shift() //移除掉房间第一人，即房主
              console.log(maindata);
              this.setData({
                maindata
              })

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
            },
          })



        }
      }
    })

  },



  //进行判断 + 重新获取房间数据
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中'
    })
    console.log(uid);
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    // 进行判断
    WXRequest({
      url: URL.MY_NUMBER,
      data: {
        uid,
        "roomId": this.data.roomId
      }
    }).then(res => {
      if (res.data.menberNumber >= 5) {
        wx.navigateTo({
          url: `../../pages/myfat/myfat`,
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
      maindata.shift()
      console.log(maindata);
      this.setData({
        maindata
      })

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
    console.log('我的房间id' + this.data.roomId);
    let uuid = this.data.roomId
    console.log(uuid);
    return {
      title: `我怎么第1胖了,快来和我比`,
      imageUrl: imagePath,
      path: `/pages/othinvite/othinvite?roomId=${uuid}&jump=true`,

    }

  }

})