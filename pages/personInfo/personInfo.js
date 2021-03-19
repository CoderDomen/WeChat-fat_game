// pages/personInfo/personInfo.js
import URL from '../../api/url'
let uid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avaUrl: '',

    myheight: 0,
    myweight: 0,
    isQrCode: false,
    isGift: false,
    isEdit: false,
    roomId: 0,
    roomUserId: 0,
    rankData: null,


    ishandle: false,

    movabledis1: 0,
    youHeight: 130,
    totalWidth1: 100,
    leftWidth1: 0,
    canWidth1: 0,

    movabledis2: 0,
    youWeight: 30,
    totalWidth2: 80,
    leftWidth2: 0, //获取左侧已移动距离
    canWidth2: 0, //获取可移动区域总长

    tabtype: 'jl'

  },


  getgift(e) {
    console.log(e);

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
      isGift: false
    })
  },

  // 输入身高
  heightInput(e) {
    this.setData({
      ishandle: true
    })
    let val = Number(e.detail.value).toFixed(2)
    this.setData({
      myheight: val
    })
    console.log(this.data.myheight);
  },
  // 输入体重
  weightInput(e) {
    this.setData({
      ishandle: true
    })
    let val = Number(e.detail.value).toFixed(2)

    this.setData({
      myweight: val
    })
    console.log(this.data.myweight);

  },





  // this.data.leftWidth1 / this.data.canWidth1 =  this.data.youWeight / this.data.totalWidth1

  onChange(e) {
    this.setData({
      ishandle: true
    })
    this.data.leftWidth1 = e.detail.x
    // console.log(this.data.leftWidth1 / this.data.canWidth1);
    // console.log(yw /  this.data.totalWidth1);
    let yh = (this.data.leftWidth1 / this.data.canWidth1) * this.data.totalWidth1
    // console.log('--------------');

    // console.log(typeof String(yh));
    // let yharr = String(yh).split('.')
    // let yha = yharr[0]
    // let yhb = yharr[1]> 5 ? (yha++ ; yhb =0): ()
    // console.log(yh);
    // console.log(yharr[0]);
    // console.log(yharr[1].split(''));
    // let yharr11 =yharr[1].split('')[0]
    // console.log(yharr11);


    // let yha = yharr11 > 5 ? ++yharr[0] : yharr[0]
    // let yhb = yharr11 > 5 ? 0 : 5;

    // console.log(yharr);
    // console.log(yha);
    // console.log(yhb);
    // console.log('--------------');

    // console.log(yh.toFixed(1));



    this.setData({
      youHeight: Number(yh.toFixed(1)) + 130.0
    })
  },

  onChange2(e) {
    this.setData({
      ishandle: true
    })
    this.data.leftWidth2 = e.detail.x
    let yw = (this.data.leftWidth2 / this.data.canWidth2) * this.data.totalWidth2

    this.setData({
      youWeight: Number(yw.toFixed(1)) + 30.0
    })
    // console.log(this.data.youHeight);

  },

  _getMovaleDis() {
    const query = wx.createSelectorQuery()
    query.select('.movable-area1').boundingClientRect()
    query.select('.movable-view1').boundingClientRect()

    query.exec((react) => {
      // console.log(react);
      let movableArea = react[0].width
      let movableView = react[1].width
      this.data.canWidth1 = movableArea - movableView
      this.data.canWidth2 = movableArea - movableView
      //  console.log(this.data.canWidth1);
    })
  },


  // getPhoneNumber(e) {
  //   // 获取endata，iv
  //   if (e.detail.encryptedData) {
  //     console.log(e)
  //     wx.setStorageSync('encryptedData', e.detail.encryptedData)
  //     wx.setStorageSync('iv', e.detail.iv)

  //     // 提交身材
  //     this.commitbodydata()
  //     // 创建房间😀
  //     this.openroom()

  //   }

  // },



  // 提交身材
  commitbodydata() {
    // let iv = wx.getStorageSync('iv')
    // let encryptedData = wx.getStorageSync('encryptedData')
    // let sk = wx.getStorageSync('storage').wechatData.session_key
    // 获取开关状态
    wx.request({
      url: URL.GET_IS_DISPLAYFAT,
      method: 'POST',
      data: {
        uid
      },
      success: res => {
        let isDisplayFat = res.data.isDisplayFat ? (res.data.isDisplayFat == 1 ? true : false) : false

        wx.request({
          url: URL.COMMIT_BODY_DATA,
          data: {
            uid,
            height: this.data.myheight / 100,
            weight: this.data.myweight - 0,
            isDisplayFat,
            // "weight": this.data.youWeight + '',
            // "height": (this.data.youHeight / 100).toFixed(3)
            // iv,
            // sessionKey: sk,
            // encryptedData,
          },
          method: 'POST',
          success: res => {},
          fail: res => {
            console.log(res);
          }
        })

      }
    })




  },
  // 创建房间
  openroom() {
    let isSubscribe = wx.getStorageSync('storage').isSubscribe
    wx.request({
      url: URL.OPEN_ROOM,
      data: {
        isSubscribe: isSubscribe,
        uid,
        height: this.data.myheight,
        weight: this.data.myweight
        // "weight": this.data.youWeight + '',
        // "height": (this.data.youHeight / 100).toFixed(3)
      },
      method: 'POST',
      success: res => {
        if (this.data.roomId) {
          console.log('有房间id，进入房主房间');
          // 加入房主房间
          this.joinroom()
        } else {
          //首次提交操作，加入自己创建的房间
          console.log('没有房间id，进入自己房间');
          console.log('我的信息页面，此时roomId', this.data.roomId);
          wx.reLaunch({
            url: '../myinvite/myinvite',
          })
        }
      },
    })
  },

  // 加入房间
  joinroom() {
    wx.request({
      url: URL.FAT_JOIN_ROOM,
      data: {
        uid,
        "roomId": this.data.roomId //房主房间号
      },
      method: 'POST',
      success: res => {
        // 统计分享
        this.analyseShare()
        // 查看房间人数
        this.numinroom()
      },
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
        let url = res.data.menberNumber >= 5 ? `../othfat/othfat?roomId=${this.data.roomId}` : `../othinvite/othinvite?roomId=${this.data.roomId}`
        wx.reLaunch({
          url: url,
        })
      }
    })
  },

  // 确认信息
  onClick(e) {
    if (this.data.myheight == 0 || this.data.myweight == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写身高体重！',
        showCancel: false
      })
      return
    } else if (this.data.myweight < 30 || this.data.myweight > 110) {
      wx.showModal({
        title: '提示',
        content: '体重在30-110kg范围之间！',
        showCancel: false
      })
      return
    } else if (this.data.myheight < 130 || this.data.myheight > 230) {
      wx.showModal({
        title: '提示',
        content: '身高在130-230cm范围之间！',
        showCancel: false
      })
      return
    }

    // 修改身材数据操作
    if (this.data.isEdit) {
      wx.request({
        url: URL.EDIT_BODY_DATA,
        data: {
          uid,
          height: this.data.myheight / 100,
          weight: this.data.myweight - 0,
          // "weight": this.data.youWeight + '',
          // "height": (this.data.youHeight / 100).toFixed(3)
        },
        method: 'POST',
        success: res => {
          let content = ''
          if (res.data.successed) {
            content = '修改成功'
          } else {
            content = '每日只可以修改一次'
          }
          wx.showModal({
            title: '提示',
            content: content,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#00AD00',
            success: res => {
              wx.reLaunch({
                url: '../myfat/myfat'
              })
            }
          })

        },
        fail: res => {
          console.log(res);
        }
      })
    } else {
      // 提交身材
      this.commitbodydata()
      // 创建房间😀
      this.openroom()
    }

  },

  onLoad(options) {
    uid = wx.getStorageSync('uid')
    let avaimage = wx.getStorageSync('userInfo').avatarUrl
    console.log(avaimage);
    this.setData({
      avaUrl: avaimage
    })


    console.log('身材信息页面', options);
    if (options) {
      if (options.isEdit) {
        const {
          isEdit
        } = options
        this.setData({
          isEdit
        })
      } else {
        const {
          roomId,
        } = options
        this.setData({
          roomId,
        })
      }
    }


  },

  onShow() {
    // this._getMovaleDis()
  }


})