<script setup>
	import {
		isWeixinBrowser
	} from '@/utils/base.js'
	import {
		routingIntercept,
		permissionBase
	} from '@/config/permission/index.js'
	import {
		inject,
		nextTick,
		toRefs
	} from 'vue'
	import {
		baseStore
	} from '@/stores/base';
	import {
		userStore
	} from '@/stores/user';
	import {
		onLaunch,
		onShow,
		onHide,
	} from "@dcloudio/uni-app";
	// const $ws = inject('$ws') 
	const $http = inject('$http')
	const base = baseStore()
	const userS = userStore()
	const {
		user
	} = toRefs(userS)
	const {
		urlParams
	} = toRefs(base)
	onLaunch(async () => {
		// #ifdef H5
		if (window._userid) {
			uni.setStorageSync('userid', window._userid)
			uni.setStorageSync('poster', window._poster)
		}
		// #endif
		// #ifdef MP-WEIXIN
		if (uni.canIUse('getUpdateManager')) {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function() {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function(res) {
								console.log('success====', res);
								// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function() {
						// 新的版本下载失败
						uni.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
						});
					});
				}
			});
		}

		// #endif
		const launchInfo = uni.getLaunchOptionsSync();
		console.log('首次启动路径:', launchInfo.path, launchInfo);
		console.log('首次启动参数:', launchInfo.query);
		urlParams.value = launchInfo.query
		routingIntercept({
			$http
		})
		await userS.getUserData()
		let params = ''
		for (let key in launchInfo.query) {
			if (!params) params += '?'
			else params += '&'
			params += `${key}=${launchInfo.query[key]}`
		}
		permissionBase({
			url: '/' + launchInfo.path + params
		}, {
			$http
		})
	});
	onShow(async (options) => {
		// if(!isWeixinBrowser()) {
		// 	uni.reLaunch({
		// 		url: '/pages/noWxBrowser/noWxBrowser'
		// 	})
		// }

		// #ifdef H5
		if (window._userid) {
			uni.setStorageSync('userid', window._userid)
			uni.setStorageSync('poster', window._poster)
			uni.setStorageSync('_operator', window._operator)
		}
		// #endif
		if (options.query.hasOwnProperty('scene')) {
			let arr = decodeURIComponent(options.query.scene).split('&')
			arr.forEach(item => {
				let arr2 = item.split('=')
				options.query[arr2[0]] = arr2[1]
			})
		}
		// console.log('opt', options) 
		if (options.query?.share_other) {
			if (options.query.hasOwnProperty('scene')) {
				$http.setToken({
					shareother: options.query.share_other
				})
				uni.setStorageSync('share_other', options.query.share_other)
			}

			base.saveShareInfo(options.query.share_other)


		}
		if (options.query?.poster) {
			$http.setToken({
				poster2: options.query.poster
			})
			uni.setStorageSync('poster2', options.query.poster)
		}
		if (options.query?.tid) {
			$http.setToken({
				tid2: options.query.tid
			})
			uni.setStorageSync('tid2', options.query.tid)
		}
		if (options.query?.operator) {
			$http.setToken({
				operator: options.query.operator
			})
			user.value.operator = options.query.operator
			uni.setStorageSync('operator', options.query.operator)
		}
		if (options.query?.gdt_vid || options.query?.qz_gdt) {
			$http.setToken({
				clickId: options.query.gdt_vid || options.query.qz_gdt
			})
		}
		// if(uni.getStorageSync('WebSocketInfo')) $ws.init()

		// if(options.query?.route && options.query.route != '/pages/home/home2' && userS.login == 0) {
		// 	uni.redirectTo({
		// 		url: '/pages/home/home2', 
		// 	})
		// }
		// if(!userS.user_info.user) {
		// 	uni.redirectTo({
		// 		url: '/pages/index/index'
		// 	})
		// 	// base.handleGoto({url: '/pages/index/index', type: 'redirectTo'}) 
		// }

	});
	onHide((options) => {
		// console.log('App Hide')
		// uni.closeSocket()
		// if(uni.getStorageSync('WebSocketInfo')) $ws.completeClose()
	});
</script>

<style lang="scss">
	@import "uview-plus/index.scss";
	@import "nutui-uniapp/styles/index.scss";
	@import '@/common/iconfont.css';
	@import '@/common/ext.scss';
	/*每个页面公共css */
	$u-error: #F12E24;
</style>