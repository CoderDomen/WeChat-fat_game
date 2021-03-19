import { checkUserStatus } from '../utils/util';
import Store from '../model/storeModel';
import UserModel from '../model/userModel';
    
class Http {

    /**
     * 封装 wx.request
     * @param {any} options 对应 wx.request options
     * @returns {any}
     */
    request(options) {
        return new Promise((resolve, reject) => {
            Object.assign(options, {
                async success(res) {
                    // 用户不存在，则重新拉起注册操作，然后再发起该次请求
                    if(
                        (res.data.code && res.data.code === 404) 
                        &&
                        (res.data.message && res.data.message.includes('用户不存在')) 
                    ) {
                        // 清空所有缓存
			            Store.clearCache();
                        let Reres = await checkUserStatus();
                        const {successed, uid} = Reres.data;
                        if(successed && uid) {
                            options.data.uid = UserModel.hasUid();
                            wx.request(options);
                        }
                    } else {
                        resolve(res);
                    }
                },
                fail(error) {
                    console.log(error)
                    wx.showToast({
                      title: '发生错误',
                      icon: 'none'
                    })
                }
            })
            wx.request(options);
        })
    }
}

export default Http;