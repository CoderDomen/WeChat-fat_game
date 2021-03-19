// components/tipMask/tipMask.js
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
    btnCofirm(){
      console.log('12312');
      
      this.triggerEvent('btnCofirm')
    },
    xtap(){
      console.log('XXXX');
      
      this.triggerEvent('xtap')

    }

  }
})
