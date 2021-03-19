import ImgSrc, { saveImgRes } from '../config/imgSrc';
// 用于数据预加载, 数据缓存操作
class Store {
	/**
	 * 预加载资源
	 * @returns {array}
	 */
	static preloadImgList() {
		return Object.keys(ImgSrc).map(key => ImgSrc[key]);
	}

	/**
	 * 数据缓存
	 * @param {any} key
	 * @param {any} val
	 * @returns {any}
	 */
	static set(key, val) {
		wx.setStorageSync(key, val);
	}

	/**
	 * 缓存数据读取
	 * @param {any} key
	 * @returns {any}
	 */
	static get(key) {
		const result = wx.getStorageSync(key);
		if (result || typeof result === 'number') {
			return result;
		}
		return false;
	}

	/**
	 * 获取资源缓存完成标记
	 * @returns {any}
	 */
	static hasSourceSign() {
		return Store.get('sourceLoad') || false;
	}

	/**
	 * 资源缓存完成标记
	 * @returns {any}
	 */
	static setSourceCacheSign() {
		Store.set('sourceLoad', 1);
	}

	/**
	 * 兼容旧写法, 适配器模式
	 * @returns {any}
	 */
	static setImgSrc() {
		saveImgRes(imgSrc);
	}

	/**
	 * 清空所有缓存
	 * @returns {any}
	 */
	static clearCache() {
		wx.clearStorageSync();
	}

	/**
	 * 删除指定缓存
	 * @param {any} key
	 * @returns {any}
	 */
	static remove(key) {
		wx.removeStorageSync(key);
	}
}

export default Store;
