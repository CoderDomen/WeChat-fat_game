export default class HappyShare {
  // 用户头像
  avatar = null;


  constructor(avatar, title, girl, myRank = '1', botInfo, num) {
    // this.avatar = avatar || ImgSrc.HOME_AVATAR;
    this.dw = '/assets/images/bg_erweima.png'
    this.hg = '/assets/images/hg.png';
    this.avatar = avatar;
    this.title = title || '我是朋友圈';
    this.girlbtop = '/assets/images/code_girl.png'
    // this.girlbtop = girl || '/assets/images/invitegirl.png'
    this.center = String(myRank)
    this.bot = botInfo || "你这么瘦!快把首胖让出去!";
    this.num = num || false
    this.content = "第      胖";
    this.erweima = `${wx.env.USER_DATA_PATH}/inner.jpg`;
  }
  palette() {

    // let t = this.num ? '260px' : '320px'
    // let t = '120px'
    // let botfontsize = this.num ? '50px' : '40px'
    let botfontsize = '40px'

    let obj = {
      width: '1000px',
      height: '800px',
      background: '#fff',
      views: [

        // bg
        {
          type: 'image',
          url: this.dw,
          css: {
            width: '1000px',
            height: '800px',
          }
        },
        // bk
        {
          type: 'rect',
          css: {
            width: '750px',
            height: '500px',
            top: '200px',
            left: '125px',
            rotate: '0',
            borderWidth: '12px',
            borderRadius: '30px',
            borderColor: '#FFE372',
            color: '#fff',
          },
        },
        // ava
        {
          type: 'image',
          url: this.avatar,
          css: {
            width: '187px',
            height: '187px',
            top: '107px',
            left: '145px',
            borderRadius: '50%',
            borderWidth: '5px',
            borderColor: '#EC2F2B',
            borderStyle: 'solid'
          },
        },
        // hg
        {
          type: 'image',
          url: this.hg,
          css: {
            width: '120px',
            height: '120px',
            top: '35px',
            left: '255px',
            mode: 'widthFix',
          },
        },
        // girlbtop
        {
          type: 'image',
          url: this.girlbtop,
          css: {
            // width: '280px',
            width: '220px',
            top: '50px',
            // right: '20px',
            right: '125px',
            mode: 'widthFix',
          },
        },
        // title
        {
          type: 'text',
          text: this.title,
          css: {
            width: '100%',
            textAlign: 'center',
            fontSize: '50px',
            top: '220px',
            color: 'black',
          },
        },
        // content
        {
          type: 'text',
          text: this.content,
          css: {
            width: '100%',
            textAlign: 'center',
            color: 'black',
            fontSize: '120px',
            fontWeight: '1000',
            top: '360px',
          },
        },
        // center
        {
          type: 'text',
          text: this.center,
          css: {
            width: '100%',
            textAlign: 'center',
            color: 'black',
            fontSize: '180px',
            fontWeight: '1000',
            top: '300px',
          },
        },
        // bot
        {
          type: 'text',
          text: this.bot,
          css: {
            width: '100%',
            textAlign: 'center',
            fontSize: botfontsize,
            color: '#EC2F2B',
            bottom: '150px'
          },
        },

      ],
    };
    if (this.num) {
      let w = this.num * 50
      let l = 500 - this.num * 25
      obj.views.push({
        type: 'image',
        url: `/assets/images/xx${this.num}.png`,
        css: {
          width: `${w}px`,
          mode: 'widthFix',
          bottom: '220px',
          left: `${l}px`
        }
      })
    }
    if (this.title == '我是朋友圈') {
      //erweima
      obj.views.push({
        type: 'image',
        url: this.erweima,
        css: {
          width: '100px',
          bottom: '150px',
          right: '145px',
          mode: 'widthFix',
        },
      })

    }
    console.log(obj);


    return obj
  }
}