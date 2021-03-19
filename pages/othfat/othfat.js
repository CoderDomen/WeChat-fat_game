// pages/othfat/othfat.js
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
    rankData: null,
    filePath: "",
    tipMask: false,

    roomerId: -1,
    mydata: '',
    topNum: 5,
    roomId: 0,
    fzdata: {},

    playerInfo: [],
    isGift: false,
    tabtype: 'jl',

    paintPallette: null,
    wenAnArr: [

      ['',
        '靠肉肉赢得了冠军',
        '小肚腩很Q弹嘛',
        '肉肉快要藏不住了',
        '丘比特之箭都被肉肉弹开啦',
        '再吃2斤，你会更强',
        '前五离你一步之遥',
        '我胖关你PS',
        '比胖，还是差了一点点',
        '曾经那么瘦的你，去哪里了',
        '少吃亿点点,瞬间脱离前十',
        '快看我的BabyFace！',
        '又瘦了~好烦',
        '你真的有好好吃饭吗？',
        '哎呀！好歹多吃点呀',
        '平平无奇的躺瘦小天才',
        '不考虑增肥吗？',
        '说真的，很羡慕你的体重',
        '比胖你真的输了，来比瘦吧',
      ],
      [
        '',
        '干啥啥不行，比胖第一名',
        '距离荣耀一步之遥',
        '胖友圈都能看到你',
        '看来和前三无缘了',
        '是时候立Flag了',
        '555～每逢佳节胖三斤',
        '实力干饭人是你吗',
        '管不住嘴，迈不开腿',
        '胖友圈有你一席之地',
        '脱离前10还有机会吗',
        '左右为腩，还腩上加腩',
        '咱不比胖，交个朋友',
        '小胖友，你是否有很多问号',
        '快来一杯芋泥波波奶茶',
        '就静静看着大家胖起来',
        '你那么瘦，一定很烦恼吧',
        '没有那种世俗的欲望',
        '你是传说中的那道闪电吗'
      ]
    ],
    wenAn: "",
    ishuanhang: false,

  },


  // 绘画海报
  onPaint() {
    let title = 'TA是朋友圈'
    let girl = '/assets/images/boytop.png'
    let myRank = this.data.fzdata.index
    let botInfo = this.data.wenAn
    let num = this.data.fzdata.starNum
    let ava = this.data.fzdata.userImage
    wx.getImageInfo({
      src: ava,
      success: res => {
        console.log(res);
        this.setData({
          paintPallette: new HappyShare(res.path, title, girl, myRank, botInfo, num).palette(),
        });
        console.log(this.data.paintPallette);
      },
    });
  },

  // painter绘图完毕
  onImgOK(e) {
    console.log(e);
    imagePath = e.detail.path
  },




  // 查看规则
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

    let isMeArr = this.data.playerInfo.filter(item => item.user_id == uid)
    console.log(isMeArr);

    if (isMeArr.length != 0 && isMeArr[0].isDisplayFat != dis) {

      // 获取房间数据
      wx.request({
        url: URL.GET_OTHER_RESULT,
        method: 'POST',
        data: {
          uid,
          "roomId": this.data.roomId,
          "topNum": this.data.topNum
        },
        success: res => {
          if (res.data.success) {
            let ply = res.data.message

            // 显示我本人与房主的数据
            ply.forEach(item => {
              item.fat_height = (item.fat_height * 100).toFixed(1)
              if (item.user_id == uid) {
                item.fat_bmi = (item.fat_bmi).toFixed(2)
                item.isMe = true
              }
              if (item.isOwner) {
                item.fat_bmi = (item.fat_bmi).toFixed(2)
              }
            })
            this.setData({
              playerInfo: ply
            })
          }

        }
      })

    }





  },
  // 查看他人数据
  watchWho() {
    this.setData({
      tipMask: true
    })
    // wx.showModal({
    //   // showCancel:true,
    //   title: "提示",
    //   content: "只能查看自己的胖友哦",
    //   showCancel: false,
    //   confirmText: '我的胖友',
    //   success:res=>{
    //     this.onClick()

    //   }
    // })
  },
  xtap() {
    this.setData({
      tipMask: false
    })

  },
  btnContinue() {
    this.onClick()
  },

  // 我的胖友圈
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
                  url: `../../pages/myfat/myfat?$roomId=${rid}`,
                })
              } else {
                wx.navigateTo({
                  url: `../../pages/myinvite/myinvite?$roomId=${rid}`,
                })

              }
            }
          }
        })

      }
    })




  },


  // 判断房间进行操作
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
            // 房主排行
            wx.request({
              url: URL.MY_NUMBER,
              data: {
                "uid": this.data.roomerId,
                "roomId": this.data.roomId
              },
              method: 'POST',
              success: res => {
                if (res.data.successed) {
                  this.setData({
                    fzdata: res.data
                  })

                  let aorb = Math.round(Math.random())
                  console.log(aorb);
                  let paiming = this.data.fzdata.index
                  let num
                  if (paiming <= 10) {
                    num = paiming 
                  } else if (paiming > 10 && paiming <= 20) {
                    num = 11
                  }else if (paiming > 20 && paiming <= 30) {
                    num = 12
                  }else if (paiming > 30 && paiming <= 40) {
                    num = 13
                  }else if (paiming > 40 && paiming <= 50) {
                    num = 14
                  }else if (paiming > 50 && paiming <= 60) {
                    num = 15
                  }else if (paiming > 60 && paiming <= 80) {
                    num = 16
                  }else if (paiming > 80 && paiming <= 100) {
                    num = 17
                  }else if (paiming > 100) {
                    num = 18
                  }

                  let wa = this.data.wenAnArr[aorb][num]
                  console.log(wa);

                  this.setData({
                    wenAn: wa
                  })
                  // if (this.data.wenAn.length > 8) {
                  //   this.setData({
                  //     ishuanhang: true
                  //   })
                  // }


                }
                console.log('当前房主数据', this.data.fzdata);


                // 绘画海报生成
                this.onPaint()



              }
            })

            // 我的排行
            wx.request({
              url: URL.MY_NUMBER,
              data: {
                uid,
                "roomId": this.data.roomId
              },
              method: 'POST',
              success: res => {
                if (res.data.successed) {
                  this.setData({
                    mydata: res.data
                  })
                }
              }
            })

            // 获取房间数据
            wx.request({
              url: URL.GET_OTHER_RESULT,
              method: 'POST',
              data: {
                uid,
                "roomId": this.data.roomId,
                "topNum": this.data.topNum
              },
              success: res => {
                if (res.data.success) {
                  let ply = res.data.message

                  // 显示我本人与房主的数据
                  ply.forEach(item => {
                    item.fat_height = (item.fat_height * 100).toFixed(1)
                    if (item.user_id == uid) {
                      item.fat_bmi = (item.fat_bmi).toFixed(2)
                      item.isMe = true
                    }
                    if (item.isOwner) {
                      item.fat_bmi = (item.fat_bmi).toFixed(2)
                    }
                  })


                  this.setData({
                    playerInfo: ply
                  })
                }

              }
            })




          }

        }
      }
    })

  },

  // 统计分享
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
    console.log(options);
    const {
      roomId,
    } = options
    this.setData({
      roomId,
    })
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


    // 获取roomUserId 二维码
    // wx.request({
    //   url: URL.GET_ROOM_USERID,
    //   data: {
    //     uid,
    //     "roomId": this.data.roomId
    //   },
    //   method: 'POST',
    //   success: res => {
    //     if (res.data.success) {
    //       this.setData({
    //         roomUserId: res.data.roomUserId
    //       })
    //       console.log('我的id是...');

    //       // 获取二维码
    //       wx.request({
    //         url: URL.CREATE_QRCODE,
    //         method: 'POST',
    //         data: {
    //           "scene": `${this.data.roomUserId},${this.data.roomId}`,
    //           "width": 430
    //         },
    //         responseType: 'arraybuffer',
    //         success: res => {
    //           console.log(res);
    //           let fileManager = wx.getFileSystemManager();
    //           let filePath = wx.env.USER_DATA_PATH + '/inner.jpg';
    //           fileManager.writeFile({
    //             filePath: filePath,
    //             encoding: 'binary',
    //             data: res.data,
    //             success: res => {
    //               console.log(res)
    //               console.log(filePath)
    //               this.setData({
    //                 filePath
    //               })
    //               console.log(this.data.filePath);
    //             },
    //             fail: res => {
    //               console.log(res);

    //             }
    //           })
    //         }
    //       })


    //     }
    //   }
    // })


  },


  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中'
    })
    console.log(uid);
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标

    // 房主
    const P1 = WXRequest({
      url: URL.MY_NUMBER,
      data: {
        "uid": this.data.roomerId,
        "roomId": this.data.roomId
      }
    })

    // 我的
    const P2 = WXRequest({
      url: URL.MY_NUMBER,
      data: {
        uid,
        "roomId": this.data.roomId
      }
    })

    // 房间
    const P3 = WXRequest({
      url: URL.GET_OTHER_RESULT,
      data: {
        uid,
        "roomId": this.data.roomId,
        "topNum": this.data.topNum
      },
    })

    Promise.all([P1, P2, P3]).then(res => {
      let fzdata = res[0].data
      let myData = res[1].data
      let allData = res[2].data
      this.setData({
        fzdata: fzdata,
        mydata: myData
      })
      let ply = allData.message

      ply.forEach(item => {
        item.fat_height = (item.fat_height * 100).toFixed(1)
        if (item.user_id == uid) {
          item.fat_bmi = (item.fat_bmi).toFixed(2)
          item.isMe = true
        }
        if (item.isOwner) {
          item.fat_bmi = (item.fat_bmi).toFixed(2)
        }
      })

      this.setData({
        playerInfo: ply
      })
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
    // const N = this.data.fzdata.index;
    const N = this.data.mydata.index;



    return {
      title: `我怎么第${N}胖了,快来和我比`,
      imageUrl: imagePath,
      path: `/pages/othfat/othfat?roomId=${this.data.roomId}&jump=true`,
    }
  }

})