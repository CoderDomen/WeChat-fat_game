// pages/myfat/myfat.js
import HappyShare from '../../utils/palette';
import URL from '../../api/url'
import {
  WXRequest,
  debounce
} from '../../utils/util';
let uid;
let imagePath




Page({

  /**
   * 页面的初始数据
   */
  data: {
    paintPallette: null,
    filePath: '',
    isPaint: true,

    isQrCode: false,
    myinfo:{},
    rank: 0,
    starNum: 0,

    wenAn: "",
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
    // ishuanhang:false,

    roomId: 0,
    pageNum: 1,
    pageSize: 10,
    playerInfo: [],
    roomUserId: -1,
    hasmobile: false,
    isGift: false,
    isContinue: false,
    tabdata: true,
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


  getgift(e) {
    console.log(e);

    this.setData({
      isGift: true,
      tabtype: e.currentTarget.dataset.tabtype
    })
    console.log('传值为', this.data.tabtype);

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
    let isMeArr = this.data.playerInfo.filter(item => item.isOwner == 1)
    console.log(isMeArr);

    if (isMeArr[0].display_fat != dis) {
      this.setData({
        playerInfo: [],
        pageNum: 1,
        tabdata: true
      })

      wx.request({
        url: URL.FAT_PAGE,
        data: {
          "roomId": this.data.roomId,
          "pageNum": this.data.pageNum,
          "pageSize": this.data.pageSize
        },
        method: 'POST',
        success: res => {

          let ply = res.data.message
          ply.forEach(item => {
            if (item.isWatched) {
              item.bmi = (item.bmi).toFixed(2)
              item.height = (item.height * 100).toFixed(1)
            }
          })
          ply = this.data.playerInfo.concat(res.data.message)
          console.log(ply);
          this.setData({
            playerInfo: ply
          })
        }
      })

    }

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



  // 绘画海报
  onPaint() {
    let title = '我是朋友圈'
    let girl = '/assets/images/inviteboy.png'
    let myRank = this.data.rank
    let botInfo = this.data.wenAn
    let num = this.data.starNum
    let userInfo;

    wx.getUserInfo({
      success: (res) => {
        userInfo = res.userInfo
        wx.getImageInfo({
          src: userInfo.avatarUrl,
          success: res => {
            console.log(res);
            this.setData({
              paintPallette: new HappyShare(res.path, title, girl, myRank, botInfo, num).palette(),
            });
            console.log(this.data.paintPallette);
          },
          fail: err => {
            console.log(err);
          }
        });
      },
    })

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

  // 点击保存
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

  // 像闪电一样瘦，打开公众号二维码
  showQrCode() {
    // 预览方案
    // let current = 'cloud://bipang-0g5sbcxocdb1febf.6269-bipang-0g5sbcxocdb1febf-1304885346/gz.png'
    // wx.previewImage({
    //   current,
    //   urls:[current],
    //   complete:res=>{
    //     console.log(res);
    //   }
    // })
    // 展示方案
    this.setData({
      isQrCode: true
    })

  },
  // 保存公众号二维码
  changeContinue() {
    this.setData({
      isQrCode: false,
      isContinue: true
    })
  },
  // 取消公众号二维码
  maskClick() {
    this.setData({
      isQrCode: false
    })

  },

  genxinshencai(){
    wx.navigateTo({
      url: '../personInfo/personInfo?isEdit=true',
    })
  },


  // 加载更多
  lower() {

    return debounce(() => {

      this.data.pageNum += 1;
      console.log(this.data.pageNum);
      this.getPageInfo()
    }, 800)


    // 防抖
    // function debounce(fn, wait) {
    //   var timeout = null;
    //   return function () {
    //     if (timeout !== null) clearTimeout(timeout);
    //     timeout = setTimeout(fn, wait);
    //   }
    // }

  },


  // 分享更多人
  findmore() {
    this.setData({
      isContinue: true
    })
  },

  // 偷窥
  watchWho(e) {
    console.log(e);

    let aimid = e.currentTarget.dataset.aimid
    let iv = wx.getStorageSync('iv')
    let encryptedData = wx.getStorageSync('encryptedData')
    let sk = wx.getStorageSync('storage').wechatData.session_key


    wx.request({
      url: URL.WATCH,
      data: {
        uid,
        "roomId": this.data.roomId,
        "aimId": aimid,
        iv,
        sessionKey: sk,
        encryptedData,
        uploadMobile: encryptedData ? true : false

      },
      method: 'POST',
      success: res => {
        if (res.data.success) {
          console.log(res);
          console.log(this.data.playerInfo);
          let pl = this.data.playerInfo

          pl.forEach(item => {
            if (item.userId == aimid) {
              item.isWatched = 1
              item.weight = res.data.weight
              item.bmi = (res.data.bmi).toFixed(2)
              item.display_fat = res.data.is_display_fat ? '1' : '0'

              // item.height = (res.data.height * 100).toFixed(1)
            }
          })
          this.setData({
            playerInfo: pl
          })
          console.log(this.data.playerInfo);

        } else {
          // 查看是否订阅
          wx.request({
            url: URL.MY_NUMBER,
            data: {
              uid,
              "roomId": this.data.roomId
            },
            method: 'POST',
            success: res => {
              let resdata = res.data
              if (resdata.isSubscribe) {
                wx.showModal({
                  title: '提示',
                  content: "每邀请3人可以增加一次偷窥机会哦~",
                  showCancel: false,
                  confirmText: '继续',
                  confirmColor: '#00AD00'
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: "关注公众号可以增加一次偷窥机会哦~",
                  showCancel: false,
                  confirmText: '继续',
                  confirmColor: '#00AD00',
                  success: res => {
                    this.setData({
                      isQrCode: true
                    })
                  }
                })

              }



            }
          })



        }
      }
    })

  },
  getPhoneNumber(e) {
    // 获取endata，iv
    if (e.detail.encryptedData) {
      console.log(e)
      wx.setStorageSync('encryptedData', e.detail.encryptedData)
      wx.setStorageSync('iv', e.detail.iv)
      this.setData({
        hasmobile: true
      })
      this.watchWho(e)
    }
  },


  //一、 请求排行
  getRank() {
    wx.request({
      url: URL.MY_NUMBER,
      data: {
        uid,
        "roomId": this.data.roomId
      },
      method: 'POST',
      success: res => {
     
        this.setData({
          rank: res.data.index,
          starNum: res.data.starNum,
          // wenAn: res.data.wenAn
          // wenAn: '胖胖胖胖胖胖胖胖'
        })
        let aorb = Math.round(Math.random())
        console.log(aorb);
        let paiming = this.data.rank
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




        // let ww =  this.data.wenAn.length > 8 ? true :false
        // this.setData({
        //   ishuanhang:ww
        // })
        // console.log(this.data.wenAn.length);


        // 获取二维码并绘画海报
        this.getQrcode()

      }
    })

  },

  //二、 获取分页信息
  getPageInfo() {
    wx.request({
      url: URL.FAT_PAGE,
      data: {
        "roomId": this.data.roomId,
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize
      },
      method: 'POST',
      success: res => {
        console.log(res.data);
        console.log(this.data.playerInfo);
        if (res.data.message.length == 0) {
          // wx.showModal({
          //   title: "提示",
          //   content: "没有更多好友数据!",
          //   showCancel: false,
          //   confirmText: '确定'
          // })
          this.setData({
            tabdata: false
          })
        }

        let ply = res.data.message

        ply.forEach(item => {
          if (item.isWatched) {
            item.bmi = (item.bmi).toFixed(2)
            item.height = (item.height * 100).toFixed(1)
          }
        })

        ply = this.data.playerInfo.concat(res.data.message)
        console.log(ply);

        this.setData({
          playerInfo: ply
        })




      }
    })
  },

  //三、 获取二维码(嵌入到请求排行中)
  getQrcode() {
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

                  // 绘画海报
                  this.onPaint()

                },
              })
            },
            fail: res => {
              wx.hideLoading()
              wx.showToast({
                title: '获取二维码失败',
              })
            }
          })
        }
      }
    })
  },

  // 四、获取本人数据
  getdataByuid() {
    wx.request({
      url: URL.GET_DATA_BY_UID,
      data: {
        uid,
      },
      method: 'POST',
      success: res => {
        let myinfo = res.data.data
        myinfo.bmi = myinfo.bmi.toFixed(2)
        this.setData({
          myinfo
        })
        console.log(this.data.myinfo);
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中',
    })

    uid = wx.getStorageSync('uid')
    // uid = 'c2d96d5e-5c27-490a-b722-e9a69d016e0d'
    // 获取房间id
    wx.request({
      url: URL.GET_ROOM_ID,
      data: {
        uid
      },
      method: 'POST',
      success: res => {
        console.log(res);

        this.setData({
          roomId: res.data.roomId,
          hasmobile: res.data.has_mobile
        })
        this.getRank()
        this.getPageInfo()
        this.getdataByuid()




      }
    })


  },

  // 重新获取房间数据
  onPullDownRefresh: function () {

    wx.showLoading({
      title: '加载中'
    })
    console.log(uid);
    console.log(this.data.pageNum);

    wx.showNavigationBarLoading(); //在标题栏中显示加载图标

    this.setData({
      playerInfo: [],
      pageNum: 1,
      tabdata: true
    })

    const P1 = WXRequest({
      url: URL.MY_NUMBER,
      data: {
        uid,
        "roomId": this.data.roomId
      }
    })

    const P2 = WXRequest({
      url: URL.FAT_PAGE,
      data: {
        "roomId": this.data.roomId,
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize
      },
    })


    Promise.all([P1, P2]).then(res => {
      let mydata = res[0].data
      let alldata = res[1].data

      this.setData({
        rank: mydata.index,
        starNum: mydata.starNum,
        // wenAn: mydata.wenAn
      })


      let aorb = Math.round(Math.random())
      console.log(aorb);
      let paiming = this.data.rank
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

      // let ww =  this.data.wenAn.length > 8 ? true :false
      // this.setData({
      //   ishuanhang:ww
      // })

      

      let ply = alldata.message
      ply.forEach(item => {
        if (item.isWatched) {
          item.bmi = (item.bmi).toFixed(2)
          item.height = (item.height * 100).toFixed(1)
        }

      })

      ply = this.data.playerInfo.concat(alldata.message)
      console.log(ply);
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
    console.log('我的房间id' + this.data.roomId);
    let uuid = this.data.roomId
    console.log(uuid);

    const N = this.data.rank;
    return {
      title: `我怎么第${N}胖了,快来和我比`,
      imageUrl: imagePath,
      path: `/pages/othfat/othfat?roomId=${uuid}&jump=true`,
    }
  }

})