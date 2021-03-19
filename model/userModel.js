import Http from '../api/http';
import URL from '../api/url';
import Store from './storeModel';

class UserModel extends Http {
	/**
	 * 获取openid
	 * @param {string} code
	 * @returns {any}
	 */
	// async _getOpenId(code) {
	// 	let url = OpenIdUrl.replace('%s', code);
	// 	let result = await this.request({
	// 		url,
	// 	});
	// 	return result.data;
	// }

	/**
	 * 是否存在uid, 有则直接返回，没有则false
	 * @returns {any}
	 */
	static hasUid() {
		let uid = Store.get('uid');
		return uid || false;
	}

	/**
	 * 设置uid
	 * @param {any} uid 用户id
	 * @returns {any}
	 */
	static setUid(uid) {
		Store.set('uid', uid);
	}

	/**
	 * 注册
	 * @returns {any}
	 */
	async register(sessionKey = '',openId, us) {
		let registerRes = await this.request({
			url: URL.REGISTER,
			method: 'POST',
			data: {
				sessionKey,
				openId,
				...us
			},
		});
		if (registerRes.data.uid) {
			UserModel.setUid(registerRes.data.uid);
		}
		return registerRes.data;
	}

	/**
	 * 登录
	 * @returns {any}
	 */
	async login() {
		// 获取code
		let {
			code
		} = await wx.login();
		let result = await this.request({
			url: URL.LOGIN,
			data: {
				code,
			},
		});
		// console.log(result.data.wechatData.session_key);

		wx.setStorageSync('storage', result.data);
		return result.data;
	}

	/**
	 * 更新用户信息
	 * @param {{nickName, avatarUrl, gender, province, city, country, userId, address, mobile}} data	 微信用户信息
	 * @returns {any}
	 */
	async updateInfo(userInfo) {
		let updateRes = await this.request({
			url: URL.UPDATE_USER_INFO,
			method: 'PUT',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: userInfo,
		});
		return updateRes;
	}

	/**
	 * 获取用户其他信息（阅读次数，体验次数，通关次数）
	 * @returns {any}
	 */
	async getElseInfo() {
		let infoRes = await this.request({
			url: URL.ELSE_INFO,
			data: {
				uid: UserModel.hasUid()
			}
		})
		return infoRes.data;
	}

	/**
	 * 更新缓存中user(用户的其他信息)的信息
	 * @param {any} key
	 * @param {any} value
	 * @returns {any}
	 */
	static updateCacheUser(key, value) {
		let user = Store.get('user');
		if (user) {
			user[key] = value;
			UserModel.saveUser2Cache(user);
		}
	}

	/**
	 * 获取缓存中user(用户的其他信息)的信息
	 * @param {any} key
	 * @param {any} value
	 * @returns {any}
	 */
	static getCacheUser(key) {
		let user = Store.get('user');
		let result = null;
		if (key) {
			result = user[key];
		} else {
			result = user;
		}
		return result;
	}


	/**
	 * 保存user到缓存
	 * @returns {any}
	 */
	static saveUser2Cache(user = {}) {
		Store.set('user', user);
	}

	/**
	 * 缓存中获取openid
	 * @returns {any}
	 */
	static hasOpenId() {
		let oid = Store.get('oid');
		return oid || false;
	}

	/**
	 * 设置openid
	 * @param {any} oid
	 * @returns {any}
	 */
	static setOpenId(oid) {
		Store.set('oid', oid);
	}

	/**
	 * 获取用户信息
	 * @returns {any}
	 */
	static getUserInfo() {
		return Store.get('userInfo') || false;
	}

	/**
	 * 设置用户信息
	 * @param {any} info
	 * @returns {any}
	 */
	static setUserInfo(info) {
		Store.set('userInfo', info);
	}

	/**
	 * 获取用户性别信息
	 * @returns {any}
	 */
	static getUserSexInfo() {
		let userInfo = UserModel.getUserInfo();
		if (userInfo) {
			return userInfo.gender;
		}
		return false;
	}

	/**
	 * 获取游戏性别信息
	 * @returns {any}
	 */
	static getGameSexInfo() {
		let result = Store.get('sexType');
		if (typeof result !== 'number') {
			// 默认性别返回 1
			return false;
		}
		return result;
	}

	/**
	 * 封装好的openId操作
	 * @returns {any}
	 */
	// async getOpenId() {
	// 	let { code } = await wx.login();
	// 	let { openid: openId } = await this._getOpenId(code);
	// 	return openId;
	// }
}

export default UserModel;