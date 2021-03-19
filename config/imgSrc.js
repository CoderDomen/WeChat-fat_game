// 所有需要使用到的图片地址
// 分页面管理

// export const BASE_URL = 'https://luoob.gitee.io/miniassets/static';
// export const BASE_URL = 'https://lurenji.utools.club/assets/miniassets/static';
// export const BASE_URL = 'http://lrj.com/miniassets/static';
// export const BASE_URL = 'http://lurenji.qicp.vip/assets/miniassets/static';
// export const BASE_URL = 'https://cdn.sifa.prod.hello4am.com';	//cdn
import {  BASE_URL } from './URI';

/**
 * 新增数据结果
 * @param {any} key	键
 * @param {any} val	值
 * @returns {any}
 */
export const AddImgRes = (key, val) => {
	ImgRes[key] = val;
};

const ImgRes = {
	// 导航栏默认头像
	HOME_AVATAR: BASE_URL + '/public/images/avatar.jpeg',
	// 首页背景
	HOME_BG: BASE_URL + '/pages/home/home_game_bg.png',
	// 首页签到
	HOME_SIGN: BASE_URL + '/pages/home/home_sign.png',
	// 首页LOGO
	HOME_LOGO: BASE_URL + '/pages/home/home_logo.png',
	// 首页知识之旅BG
	HOME_KNOWLEDEGE_TOUR: BASE_URL + '/pages/popup/popup_bg_db.png',
	// 注册提示框背景
	HOME_SM_POPUP_BG: BASE_URL + '/components/popup/sm_bg.png',
	// 注册提示框模块背景
	HOME_SM_POPUP_SHAN: BASE_URL + '/components/popup/bg_jl.png',
	// 注册提示框关闭按钮

	// 玩法提示框
	HOME_TIP_POPUP: BASE_URL + '/pages/home/home_popup.png',
	// 每日签到提示框
	HOME_SIGN_POPUP: BASE_URL + '/components/popup/daily_bg.png',
	// // 领取奖品图标
	// HOME_ICON_GIFT: BASE_URL + '/pages/home/sign_gift.png',
	// // 弓箭传说图标
	// HOME_ICON_GONG: BASE_URL + '/pages/home/sign_gong.png',
	// // 民间王者图标
	// HOME_ICON_MIN: BASE_URL + '/pages/home/sign_min.png',
	// // 七彩人生图片
	// HOME_ICON_LIFE: BASE_URL + '/lift.png',
	// // 向阳而生图标
	// HOME_ICON_XIANG: BASE_URL + '/pages/home/sign_xiang.png',
	// // 幸福社区图标
	// HOME_ICON_XING: BASE_URL + '/pages/home/sign_xing.png',


	// 背景图片
	HOME_ICON_GAMEBG: BASE_URL + '/pages/home/game_bg.png',
	// 宣传视频图标
	HOME_ICON_XUAN: BASE_URL + '/pages/home/sign_xuan2.png',
	// 领取奖品图标
	HOME_ICON_GIFT: BASE_URL + '/pages/home/sign_gift2.png',
	// 弓箭传说图标
	HOME_ICON_GONG: BASE_URL + '/pages/home/sign_gong2.png',
	// 民间王者图标
	HOME_ICON_MIN: BASE_URL + '/pages/home/sign_min2.png',
	// 向阳而生图标
	HOME_ICON_XIANG: BASE_URL + '/pages/home/sign_xiang2.png',
	// 幸福社区图标
	HOME_ICON_XING: BASE_URL + '/pages/home/sign_xing2.png',





	// 播放按钮
	HOME_ICON_PLAY: BASE_URL + '/pages/home/btn_video.png',
	// 首页小路
	HOME_LOAD: BASE_URL + '/pages/home/road.png',
	// icon高亮
	HOME_ICON_SELECTED: BASE_URL + '/pages/home/btn_selected.png',
	// icon灰度
	HOME_ICON_UNSELECTED: BASE_URL + '/pages/home/btn_unselected.png',

	// 导航栏金币
	NAV_COIN: BASE_URL + '/pages/home/icon_coin.png',
	// 导航栏护盾
	NAV_SHIELD: BASE_URL + '/pages/home/icon_shield.png',
	// 我的页面背景
	MY_BG: BASE_URL + '/pages/public/public_bg.png',
	MY_MORE_INFO: BASE_URL + '/pages/my/btn_more.png',
	MY_COIN: BASE_URL + '/pages/my/icon_coin.png',
	MY_SHIELD: BASE_URL + '/pages/my/icon_shield.png',

	// 民间王者首页背景
	FOLK_HOME_BG: BASE_URL + '/pages/folk-king/folking_game_bg.png',
	// 民间王者随机
	FOLK_HOME_RANDOM: BASE_URL + '/pages/folk-king/folking_model_random.png',
	// 民间王者好友对战
	FOLK_HOME_FRIEND: BASE_URL + '/pages/folk-king/folking_model_friend.png',

	// 民间王者对战——蓝色块
	FOLK_FRIGHT_BLUE: BASE_URL + '/pages/fright/icon_bule.png',
	// 民间王者对战——红色块
	FOLK_FRIGHT_RED: BASE_URL + '/pages/fright/icon_red.png',
	// 民间王者对战——VSLogo
	FOLK_FRIGHT_BATTLE: BASE_URL + '/pages/fright/icon_battle.png',
	// 邀请显示的图片
	FOLK_FRIGHT_INVITE: BASE_URL + '/pages/share/pic_tg.png',

	// 民间王者结果胜利
	FOLK_RESULT_WIN_BG: BASE_URL + '/components/result/bg_right.png',
	// 民间王者结果失败
	FOLK_RESULT_LOSE_BG: BASE_URL + '/components/result/bg_wrong.png',
	// 民间王者结果分享
	FOLK_RESULT_SHARE_BG: BASE_URL + '/components/result/bg_share.png',

	// 弓箭传说角色选择背景
	ARROW_ROLE_BG: BASE_URL + '/pages/arrow-legend/role_bg.png',
	// 弓箭传说角色选择男
	ARROW_ROLE_BOY: BASE_URL + '/components/arrow-legend/icon_boy.png',
	// 弓箭传说角色选择女
	ARROW_ROLE_GIRL: BASE_URL + '/components/arrow-legend/icon_girl.png',
	// 性别按钮选项
	ARROW_ROLE_BTN: BASE_URL + '/components/arrow-legend/btn_choice.png',
	// 开始游戏按钮
	ARROW_ROLE_START: BASE_URL + '/components/arrow-legend/btn_start.png',

	// 继续挑战按钮
	ARROW_RANK_CONTINUEBTN:
		BASE_URL + '/components/arrow-legend/btn_Continue.png',
	// 激活图标
	ARROW_RANK_SELECTED: BASE_URL + '/components/arrow-legend/icon_selected.png',
	// 未激活图标
	ARROW_RANK_UNSELECTED: BASE_URL + '/components/arrow-legend/icon_uncheck.png',
	// 弓箭传说难度选择背景
	ARROW_RANK_BG: BASE_URL + '/pages/arrow-legend/rank_bg.png',
	// 弓箭传说难度选择LOGO
	ARROW_RANK_LOGO: BASE_URL + '/components/arrow-legend/logo.png',

	// 弓箭传说答题鼓
	ARROW_SUBJECT_DRUM: BASE_URL + '/components/arrow-legend/icon_gu.png',
	// 弓箭传说答题头像男
	ARROW_SUBJECT_BOY: BASE_URL + '/components/arrow-legend/avatar_boy.png',
	// 弓箭传说答题头像女
	ARROW_SUBJECT_GIRL: BASE_URL + '/components/arrow-legend/avatar_girl.png',
	// 弓箭传说答题错误背景
	ARROW_SUBJECT_WRONG_BG: BASE_URL + '/components/arrow-legend/icon_wrong.png',
	// 弓箭传说答题正确背景
	ARROW_SUBJECT_RIGHT_BG: BASE_URL + '/components/arrow-legend/icon_true.png',
	// 弓箭传说答题正确gif
	ARROW_SUBJECT_RIGHT_GIF: BASE_URL + '/components/arrow-legend/right.gif',
	// 弓箭传说答题错误gif
	ARROW_SUBJECT_WRONG_GIF: BASE_URL + '/components/arrow-legend/wrong.gif',
	// 弓箭传说闯关成功
	ARROW_RESULT_WIN: BASE_URL + '/components/arrow-legend/bg_win.png',
	// 弓箭传说闯关失败
	ARROW_RESULT_LOSE: BASE_URL + '/components/arrow-legend/bg_lose.png',
	// 弓箭传说闯关失败男
	ARROW_RESULT_FAIL_BOY:
		BASE_URL + '/components/arrow-legend/icon_boy_lose.png',
	// 弓箭传说闯关失败女
	ARROW_RESULT_FAIL_GIRL:
		BASE_URL + '/components/arrow-legend/icon_girl_lose.png',
	// 返回按钮
	ARROW_RESULT_BACK: BASE_URL + '/components/arrow-legend/btn_back.png',
	// 继续挑战按钮
	ARROW_RESULT_CONTINUE:
		BASE_URL + '/components/arrow-legend/result_btn_continue.png',
	// 分享给好友按钮
	ARROW_RESULT_SHARE: BASE_URL + '/components/arrow-legend/btn_share.png',

	// 弓箭传说分享男
	ARROW_SHARE_BOY: BASE_URL + '/components/arrow-legend/bg_boy_share.png',
	// 弓箭传说分享女
	ARROW_SHARE_GIRL: BASE_URL + '/components/arrow-legend/bg_girl_share.png',
	// 关闭按钮
	ARROW_SHARE_CLOSE: BASE_URL + '/components/arrow-legend/btn_close.png',
	// 保存图片按钮
	ARROW_SHARE_SAVE: BASE_URL + '/components/arrow-legend/btn_save.png',
	// 转发按钮
	ARROW_SHARE_REDIRECT:
		BASE_URL + '/components/arrow-legend/share_btn_share.png',

	// 奖品详情 获奖 logo
	PRICE_DETAIL_LOGO_SUC: BASE_URL + '/pages/price-detail/icon_gift.png',
	// 奖品详情 未获奖 logo
	PRICE_DETAIL_LOGO_FAIL: BASE_URL + '/pages/price-detail/icon_gift_not.png',
	// 奖品详情—奖品图片
	PRICE_DETAIL_PHOTO: BASE_URL + '/pages/price-detail/price.png',
	// 知识详情背景
	KNOW_BG: BASE_URL + '/pages/knowlege-detail/bg.png',
	// 其他推荐背景
	KNOW_ELSE_INTRO: BASE_URL + '/pages/knowlege-detail/bg_viedo.png',
	// 我的页面，本赛季金币排行榜
	MY_TITLE_LOGO: BASE_URL + '/pages/my/sign_ph.png',

	// 保存图片之弓箭传说背景男
	PALETTE_ARROW_BG_BOY: BASE_URL + '/public/share/arrow_bg_share_boy.png',
	// 保存图片之弓箭传说背景女
	PALETTE_ARROW_BG_GIRL: BASE_URL + '/public/share/arrow_bg_share_girl.png',
	// 保存图片之民间王者背景
	PALETTE_FOLK_BG: BASE_URL + '/public/share/bg_share.png',
	// 保存图片之民间王者王冠
	PALETTE_FOLK_CROWN: BASE_URL + '/public/share/crown.png',
	// 保存图片之民间王者二维码
	PALETTE_FOLK_CODE: BASE_URL + '/public/share/code.png',
	// 保存图片之民间王者徽章
	PALETTE_FOLK_ICON: BASE_URL + '/public/share/icon_ch.png',
	// 保存图片之民间王者LOGO
	PALETTE_FOLK_LOGO: BASE_URL + '/public/share/logo_2.png',

	// 向阳而生介绍封面图
	SUNNY_INTRO_COVER: BASE_URL + '/components/sunny/icon_tree.png',
	// 向阳而生游戏中背景
	SUNNY_GAME_BG: BASE_URL + '/pages/sunny/game_bg.png',
	// 向阳而生手势logo
	SUNNY_GAME_FINDER: BASE_URL + '/components/sunny/icon_finger.png',
	// 向阳而生游戏中发育状况---种子1
	SUNNY_GAME_STATUS1: BASE_URL + '/components/sunny/icon_seed.png',
	// 向阳而生游戏中发育状况---发育2
	SUNNY_GAME_STATUS2: BASE_URL + '/components/sunny/icon_seedling.png',
	// 向阳而生游戏中发育状况---发育3
	SUNNY_GAME_STATUS3: BASE_URL + '/components/sunny/icon_seedling2.png',
	// 向阳而生游戏中发育状况---发育4
	SUNNY_GAME_STATUS4: BASE_URL + '/components/sunny/icon_tree3.png',
	// 向阳而生游戏中发育状况---发育5
	SUNNY_GAME_STATUS5: BASE_URL + '/components/sunny/icon_tree5.png',

	// 向阳而生游戏中除草icon
	SUNNY_GAME_GREEN: BASE_URL + '/components/sunny/icon_green.png',
	// 向阳而生游戏中嗮阳光icon
	SUNNY_GAME_SUN: BASE_URL + '/components/sunny/icon_sun.png',
	// 向阳而生游戏中浇水icon
	SUNNY_GAME_WATER: BASE_URL + '/components/sunny/icon_water.png',
	// 向阳而生游戏中施肥icon
	SUNNY_GAME_GROW: BASE_URL + '/components/sunny/icon_grow.png',

	// 向阳而生游戏中除草icon
	SUNNY_GAME_UNGREEN: BASE_URL + '/components/sunny/un_icon_green.png',
	// 向阳而生游戏中嗮阳光icon
	SUNNY_GAME_UNSUN: BASE_URL + '/components/sunny/un_icon_sun.png',
	// 向阳而生游戏中浇水icon
	SUNNY_GAME_UNWATER: BASE_URL + '/components/sunny/un_icon_water.png',
	// 向阳而生游戏中施肥icon
	SUNNY_GAME_UNGROW: BASE_URL + '/components/sunny/un_icon_grow.png',

	// 向阳而生分享按钮
	SUNNY_GAME_SHAREBTN: BASE_URL + '/components/sunny/btn_share.png',

	// 向阳而生弹窗背景
	SUNNY_GAME_POPUP_BG: BASE_URL + '/components/sunny/bg_share.png',
	// 向阳而生弹窗徽章
	SUNNY_GAME_POPUP_HZ: BASE_URL + '/components/sunny/icon_name.png',
	// 向阳而生弹窗关闭按钮
	SUNNY_GAME_POPUP_CLOSE: BASE_URL + '/components/sunny/btn_close.png',
	// 向阳而生弹窗保存按钮
	SUNNY_GAME_POPUP_SAVE: BASE_URL + '/components/sunny/btn_save.png',
	// 向阳而生弹窗转发按钮
	SUNNY_GAME_POPUP_RESHARE: BASE_URL + '/components/sunny/btn_share_popup.png',

	// 浇水成功
	SUNNY_RESULT_SUCCESS: BASE_URL + '/components/sunny/icon_win.png',
	// 浇水失败
	SUNNY_RESULT_FAIL: BASE_URL + '/components/sunny/icon_lose.png',
	// 继续浇水
	SUNNY_WATER_CONTINUE: BASE_URL + '/components/sunny/water_continue.png',
	// 继续除草
	SUNNY_GRASS_CONTINUE: BASE_URL + '/components/sunny/grass_continue.png',
	// 继续施肥
	SUNNY_FERTILIZER_CONTINUE: BASE_URL + '/components/sunny/fri_continue.png',
	// 继续洒阳光
	SUNNY_SUN_CONTINUE: BASE_URL + '/components/sunny/sun_continue.png',

	// 答题背景
	SUNNY_ANSWER_BG: BASE_URL + '/components/sunny/game_bg.png',
	// 答题面板
	SUNNY_GAME_PANNEL: BASE_URL + '/components/sunny/bg_question.png',
	// 选项背景
	SUNNY_GAME_OPTION: BASE_URL + '/components/sunny/icon_choice.png',

	// 选项正确背景
	SUNNY_RIGHT_BG: BASE_URL + '/components/sunny/icon_ture.png',
	// 选项错误背景
	SUNNY_ERROR_BG: BASE_URL + '/components/sunny/icon_wrong.png',
	// 下一题按钮
	SUNNY_NEXT_BTN: BASE_URL + '/components/sunny/btn_next.png',
	// 错误提示框
	SUNNY_ERROR_TIP: BASE_URL + '/components/sunny/icon_answer.png',

	// 幸福社区答题背景
	HAPPY_GAME_BG: BASE_URL + '/components/happiness/game_bg.png',
	// 幸福社区继续挑战按钮
	HAPPY_BTN_CONTINUE: BASE_URL + '/components/happiness/btn_continue.png',
	// 幸福社区下一题按钮
	HAPPY_BTN_NEXT: BASE_URL + '/components/happiness/btn_next.png',
	// 幸福社区问题选项
	HAPPY_QUESTION_OPTION: BASE_URL + '/components/happiness/icon_question.png',
	// 幸福社区正确选项
	HAPPY_QUESTION_TRUE: BASE_URL + '/components/happiness/icon_ture.png',
	// 幸福社区错误选项
	HAPPY_QUESTION_WRONG: BASE_URL + '/components/happiness/icon_wrong.png',
	// 幸福社区失败木材icon
	HAPPY_ICON_WOOD_FAIL: BASE_URL + '/components/happiness/icon_wood_fail.png',
	// 幸福社区成功木材icon
	HAPPY_ICON_WOOD_SUCCESS:
		BASE_URL + '/components/happiness/icon_wood_success.png',
	// 幸福社区介绍图片
	HAPPY_INTRO_PIC: BASE_URL + '/components/happiness/pic_ntroduce.png',
	// 幸福社区问题背景
	HAPPY_QUESTION_BG: BASE_URL + '/components/happiness/question_bg.png',
	// 幸福社区倒计时背景
	HAPPY_TIME_DOWN: BASE_URL + '/components/happiness/time_down.png',
	// 幸福社区错误提示背景
	HAPPY_WRONG_TIP: BASE_URL + '/components/happiness/tip_wrong.png',
	// 幸福社区海报背景
	HAPPY_SHARE_BG: BASE_URL + '/components/happiness/bg_share.png',
	// 幸福社区海报宣章
	HAPPY_SHARE_XZ: BASE_URL + '/components/happiness/icon_name.png',
	// 幸福社区保存图片
	HAPPY_SHARE_SAVE: BASE_URL + '/components/happiness/btn_save.png',
	// 幸福社区分享
	HAPPY_SHARE_RE: BASE_URL + '/components/happiness/btn_share_btn.png',
	// 幸福社区转发好友
	HAPPY_SHARE_BTN: BASE_URL + '/components/happiness/btn_share.png',
	// 幸福社区首页背景
	HAPPY_HOME_BG: BASE_URL + '/pages/happiness/home_bg.png',
	// 幸福社区二级建筑背景
	HAPPY_DETAIL_BG: BASE_URL + '/pages/happiness/detail_bg.png',
	// 幸福社区首页去获取
	HAPPY_HOME_GET: BASE_URL + '/pages/happiness/get_wood.png',
	// 幸福社区底部按钮背景
	HAPPY_BOTTOM_BTN_BG: BASE_URL + '/pages/happiness/btn_look.png',
	// 幸福社区底部按钮灰度按钮
	HAPPY_BOTTOM_BTN_LOCK: BASE_URL + '/pages/happiness/btn_unlock.png',
	// 幸福社区场所底部背景
	HAPPY_PLACE_BTN_BG: BASE_URL + '/pages/happiness/title.png',
	// 图片锁
	HAPPY_PIC_LOCK: BASE_URL + '/components/happiness/lock.png',

	//七彩人生引导页背景
	LIFE_GUIDE: BASE_URL + '/life_guide.png',
	//七彩人生life-home页面背景图
	LIFE_HOME: BASE_URL + '/life_homebgimg.png',
	//七彩人生图片锁
	LIFE_PIC_LOCK: BASE_URL + '/lifelock.png',
	//七彩人生图片锁-已解锁
	LIFE_PIC_LOCK_SUCESS: BASE_URL + '/lifelocksucess.png',
	//七彩人生8岁图片
	LIFE_8AGE: BASE_URL + '/8age.png',
	//七彩人生18岁图片
	LIFE_18AGE: BASE_URL + '/18age.png',
	// 七彩人生分享图
	LIFE_SHARE_BG: BASE_URL + '/pages/life/share.png',
	// 回答正确
	LIFE_ANSWER_RIGHT: BASE_URL + '/pages/life/popup_right.png',
	// 回答错误
	LIFE_ANSWER_WRONG: BASE_URL + '/pages/life/popup_wrong.png',
	// 闯关失败
	LIFE_PASS_RIGHT: BASE_URL + '/pages/life/result_win.png',
	// 闯关成功
	LIFE_PASS_FAIL: BASE_URL + '/pages/life/result_fail.png',
	// 返回按钮
	LIFE_BACK_BTN: BASE_URL + '/pages/life/back.png',
	//七彩人生22岁图片
	LIFE_22AGE: BASE_URL + '/22age.png',
	//七彩人生25岁图片
	LIFE_25AGE: BASE_URL + '/25age.png',
	//七彩人生35岁图片
	LIFE_35AGE: BASE_URL + '/35age.png',
	//七彩人生45岁图片
	LIFE_45AGE: BASE_URL + '/45age.png',
	//七彩人生55岁图片
	LIFE_55AGE: BASE_URL + '/55age.png',
	//七彩人生70岁图片
	LIFE_70AGE: BASE_URL + '/70age.png',
	//七彩人生手指图片
	LIFE_FINGER: BASE_URL + '/finger.png',
	//七彩人生 life-detail 页面背景
	LIFE_DETAILBG: BASE_URL + '/life-detailbg.png',
	//七彩人生 life-detail 听音频icon
	LIFE_AUDIOBGICON: BASE_URL + '/audiobgicon.png',
	
	//七彩人生 life-detail 看视频icon
	LIFE_VIDEOBGICON: BASE_URL + '/videobgicon.png',
	//七彩人生 life-detail 听音频图片按钮
	LIFE_LISTENAUDIOICON: BASE_URL + '/listenaudioicon.png',
	//七彩人生 life-detail 听音频小图片按钮
	LIFE_LISTENAUDIOICON2: BASE_URL + '/listenaudioicon2.png',
	//七彩人生 life-detail 听音频未完成图片按钮
	LIFE_UNDONE: BASE_URL + '/undone.png',
	//七彩人生 life-detail 看视频图片按钮
	LIFE_WATCHVIDEOICON: BASE_URL + '/watchvideoicon.png',
	//七彩人生 life-detail 看视频小图片按钮
	LIFE_WATCHVIDEOICON2: BASE_URL + '/watchvideoicon2.png',
	//七彩人生 life-detail 音频播放按钮
	LIFE_AUDIOPLAY: BASE_URL + '/audioplay.png',
	//七彩人生 life-detail 音频播放
	REST_TIME: BASE_URL + '/restTime.png',
	//七彩人生 life-detail 音频暂停按钮
	LIFE_AUDIOSTOP: BASE_URL + '/audiostop.png',
	//七彩人生 life-detail 音频条
	LIFE_AUDIOBAR: BASE_URL + '/audiobar.png',
	//七彩人生 life-detail 关卡数背景图
	LIFE_CHECKPOINTBG: BASE_URL + '/checkpointbg.png',
	//七彩人生 life-detail 视频播放按钮
	LIFE_VIDEOPLAY: BASE_URL + '/videoplay.png',
	//七彩人生 life-detail 闯关成功icon
	LIFE_CLEARANCEICON: BASE_URL + '/clearanceicon.png',
	//七彩人生 life-detail 等待闯关icon
	LIFE_WAITEPASS: BASE_URL + '/waitepass.png',
	//七彩人生 life-detail 游戏闯关icon
	LIFE_QUESTIONICON: BASE_URL + '/questionicon.png',
	//七彩人生 life-detail 看漫画icon
	LIFE_READCOMICSICON: BASE_URL + '/readcomicsicon.png',
	//七彩人生 life-detail 游戏闯关 开始游戏按钮图片
	LIFE_QUESTIONGAMEPLAY: BASE_URL + '/questiongameplay.png',
	//七彩人生 life-detail 看漫画按钮图片
	LIFE_READCOMICSPLAY: BASE_URL + '/readcomicsplay.png',
	//七彩人生 life-detail 关卡锁图片
	LIFE_GUANQIALOCK: BASE_URL + '/guanqialock.png',
	


};

export default ImgRes;

// 本地图片地址
export const LOCAL_IMAGES_SRC = {
	// 加载背景
	LOADING_BG: '/assets/images/loading/loading_loginBg.png',
	// 文字logo
	LOADING_TEXT_LOGO: '/assets/images/loading/loading_text_logo.png',
	// 图片logo
	LOADING_PHOTO_LOGO: '/assets/images/loading/loading_logo.png',
	// title图片
	LOADING_TITLE: '/assets/images/loading/loading_text.png',
	// 进度条面板
	LOADING_PROGRESS_PANEL: '/assets/images/loading/panel.png',
	// 法律图标01
	HOME_ICON1: '/assets/images/home/icon_1.png',
	// 法律图标02
	HOME_ICON2: '/assets/images/home/icon_2.png',
	// 法律图标03
	HOME_ICON3: '/assets/images/home/icon_3.png',
	// 法律图标04
	HOME_ICON4: '/assets/images/home/icon_4.png',
	// 白色背景图片
	ALL_BG_WHITE: '/assets/images/public/bg.jpg',
	// 音乐播放
	MUSIC_PLAY: '/assets/images/public/music_play.png',
	// 音乐暂停
	MUSIC_PASUSE: '/assets/images/public/music_pause.png',
	// 填写收货地址按钮
	WRITE_ADDRESS: '/assets/images/price-detail/icon_if.png',
	// 我知道了按钮
	I_KNOW: '/assets/images/price-detail/icon_iknow.png',
};
