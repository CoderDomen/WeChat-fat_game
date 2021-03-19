// components/qrMask/qrMask.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // maskClick(){
    //  this.triggerEvent('maskClick')
    // }

    bcpic() {
      wx.saveImageToPhotosAlbum({
        filePath: '/assets/images/fxmtc.png',
        success: () => {
          wx.showToast({
            title: '图片保存成功',
          });
          this.triggerEvent('changeContinue')

          


        },
      });

    },
    cancel() {
      wx.saveImageToPhotosAlbum({
        filePath: '/assets/images/fxmtc.png',
        success: () => {},
      });
      this.triggerEvent('maskClick')
    }

  }
})