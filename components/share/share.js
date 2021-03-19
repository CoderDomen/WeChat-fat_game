// components/share/share.js

import HappyShare from '../../utils/palette';
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
    paintPallette: null

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // painter绘图完毕
    onImgOK(e){
      console.log(e);
			const imagePath = e.detail.path;
      wx.saveImageToPhotosAlbum({
				filePath: imagePath,
				success: () => {
					wx.showToast({
						title: '图片保存成功',
					});		
				},
		
			});
    },

    onSave(e) {
      const {
        userInfo
      } = e.detail;
      if (!userInfo) {
        wx.showToast({
          title: '请先授权',
          icon: 'none',
          mask: true,
        });
      } else {
        wx.showLoading({
          title: '正在保存中'
        });
        console.log(userInfo.avatarUrl);

        wx.getImageInfo({
          src: userInfo.avatarUrl,
          success: res => {
            console.log(res);
            
            this.setData({
              paintPallette: new HappyShare(res.path).palette(),
            });
            wx.hideLoading()
          },
          fail:err=>{
            this.triggerEvent('exit')
            wx.hideLoading()

            console.log(err);
            
          }
        });

      
      }


    },
    onExit() {
      this.triggerEvent('exit')
    }
  }
})