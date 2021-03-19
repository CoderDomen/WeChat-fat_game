// components/fontswiper/fontSwiper.js
import URL from '../../api/url'
let uid


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
    text: '',
    marqueePace: 1, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marquee_margin: 30, //间距
    size: 14,
    interval: 20 // 时间间隔
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrolltxt() {
      var that = this;
      var length = that.data.length; //滚动文字的宽度
      var windowWidth = that.data.windowWidth; //屏幕宽度
      if (length > windowWidth) {
        var interval = setInterval(function () {
          var maxscrollwidth = length + that.data.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
          var crentleft = that.data.marqueeDistance;
          if (crentleft < maxscrollwidth) { //判断是否滚动到最大宽度
            that.setData({
              marqueeDistance: crentleft + that.data.marqueePace
            })
          } else {
            that.setData({
              marqueeDistance: 0 // 直接重新滚动
            });
            clearInterval(interval);
            that.scrolltxt();
          }
        }, that.data.interval);
      } else {
        that.setData({
          marquee_margin: "1000"
        }); //只显示一条不滚动右边间距加大，防止重复显示
      }
    },

  },
  ready() {
    console.log('onShow');
    var that = this;

    // 获取排行状态
    wx.request({
      url: URL.GET_USER_RANK,
      data: {
        uid:""
      },
      method: 'POST',
      success: res => {
        // Xxxx胖友圈已有xx名胖友，暂列第一；xxxx胖友圈已有xxx名胖友，暂列第xxxx，
        let rankArr = res.data.rank
        let text = rankArr.reduce((cur, item, index) => {
          return `${cur}${item.user_name}胖友圈已有${item.menber_num}名胖友，暂列第${index + 1}；`
        }, '')
        this.setData({
          text
        })
        // console.log(this.data.text);


        var length = that.data.text.length * that.data.size; //文字长度
        var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
        console.log(length, windowWidth);
        that.setData({
          length: length,
          windowWidth: windowWidth
        });
        that.scrolltxt(); // 第一个字消失后立即从右边出现

      }
    })






  }
})