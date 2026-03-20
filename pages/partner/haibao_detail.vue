<template> 
	<view class="header bg-white"> 
		<up-alert title="长按图片进行保存或转发" center  type="error" ></up-alert>
		<view class="u-p-20" v-if="haibaoData.list">
			<up-image :src="haibaoData.list" width="100%" height="auto" mode="widthFix"></up-image>
			<view class="u-text-center u-error">长按图片进行保存或转发</view>
			<view class="u-p-t-40 u-p-b-40 u-flex u-flex-items-center u-flex-between">
				<!-- <view class="u-flex-2 u-p-5">
					<up-button type="primary" shape="circle" @click="downloadBtn">下载海报</up-button>
				</view> -->
				<view class="u-flex-1 u-p-5">
					<up-button type="error" shape="circle" @click="shareBtn">分享页面</up-button>
				</view>
			</view>
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar> 
	<up-overlay :show="overlayshow" @click="overlayshow = false">
		<view class="share-warp bg-white u-radius-10 u-p-20 u-p-l-30 u-p-r-30 u-flex u-flex-items-center u-font-14">
			<view>点击右上角“</view>
			<up-icon name="more-dot-fill"></up-icon>
			<view>”分享</view>
		</view>
	</up-overlay>
</template>

<script setup> 
	import useDataList from '@/composition/useDataList.js'
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const user = userStore() 
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base)
	// const { login, share_id } = toRefs(user)
	const $api = inject('$api')   
	const hid = ref('')
	const uid = ref('')
	const login = ref('')
	const loading = ref(true)
	const overlayshow = ref(false)
	const haibaoData = ref({})
	onLoad(async (options) => { 
		if(options.hasOwnProperty('id')) {
			hid.value = options.id
		}  
		if(options.hasOwnProperty('uid')) {
			uid.value = options.uid
		}  
		if(options.hasOwnProperty('login')) {
			login.value = options.login
		}  
		await initHaibaoData()
	})   
	// async function initData() {
	// 	initDetailData()
	// 	initHaibaoData()
	// }
	// async function initDetailData() {
	// 	const res = await $api.detail_chance({params: {id: hid.value}})
	// }
	async function initHaibaoData() {
		// if(loading.value) return
		// loading.value = true
		const res = await $api.haibao({params: {id: hid.value, uid: uid.value,login: login.value}})
		if(res.list) {
			uni.setNavigationBarTitle({
				title: res.title
			})
			haibaoData.value = res
		}
	}
	function shareBtn() {
		overlayshow.value = true
	}
	function downloadBtn() {
		if (!haibaoData.value.list) {
			uni.showToast({
				title: '海报图片不存在',
				icon: 'none'
			});
			return;
		}
		
		// 生成带名称的文件名
		const fileName = generateFileName();
		
		// 检查是否是 H5 平台
		if (process.env.VUE_APP_PLATFORM === 'h5' || typeof window !== 'undefined' && window.location) {
			// H5 平台使用传统下载方式
			saveImageToH5(fileName);
			uni.showToast({
				title: '下载成功',
				icon: 'success'
			});
		} else {
			// 非 H5 平台使用 uniapp API 保存到相册
			saveImageToAlbum();
		}
	}
	
	// H5 平台下载方式
	function saveImageToH5(fileName) {
		// 直接使用 a 标签下载，避免 Canvas 跨域问题
		const a = document.createElement('a');
		a.href = haibaoData.value.list;
		a.download = fileName;
		
		// 触发下载
		document.body.appendChild(a);
		a.click();
		
		// 清理
		setTimeout(function() {
			document.body.removeChild(a);
		}, 100);
	}
	
	// 非 H5 平台保存到相册
	function saveImageToAlbum() {
		// 显示加载提示
		uni.showLoading({
			title: '正在保存...'
		});
		
		// 使用 uni.getImageInfo 获取网络图片的本地路径
		uni.getImageInfo({
			src: haibaoData.value.list,
			success: function(res) {
				// 获取图片本地路径成功后，保存到相册
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: function() {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						});
					},
					fail: function(err) {
						uni.hideLoading();
						// 处理保存失败的情况
						if (err.errMsg.includes('auth')) {
							// 权限不足，引导用户开启权限
							uni.showModal({
								title: '提示',
								content: '需要保存图片到相册的权限，请在设置中开启',
								confirmText: '去设置',
								cancelText: '取消',
								success: function(res) {
									if (res.confirm) {
										// 跳转到设置页面
										uni.openSetting({
											success: function(res) {
											console.log('设置权限结果:', res.authSetting);
										}
										});
									}
								}
							});
						} else {
							uni.showToast({
								title: '保存失败，请稍后重试',
								icon: 'none'
							});
						}
					}
				});
			},
			fail: function(err) {
				uni.hideLoading();
				uni.showToast({
					title: '获取图片信息失败',
					icon: 'none'
				});
				console.error('获取图片信息失败:', err);
			}
		});
	}
	// 生成带名称的文件名
	function generateFileName() {
		// 获取海报标题，如果没有则使用默认名称
		let title = haibaoData.value.title || '海报';
		
		// 移除文件名中的非法字符
		title = title.replace(/[\/:*?"<>|]/g, '');
		
		// 限制文件名长度
		if (title.length > 20) {
			title = title.substring(0, 20) + '...';
		}
		
		// 添加时间戳，确保文件名唯一
		const timestamp = new Date().getTime();
		
		return `${title}_${timestamp}.png`;
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F3F8;
		padding-bottom: 80px;
	}
</style>
<style lang="scss" scoped>
	.header { 
		// background-image: url('https://p.cft.100ppi.com/Public/index-topbj/index-topbj.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0;
	} 
	.share-warp {
		position: fixed;
		top: 10px;
		right: 10px;
		&:after {
			content: '';
			position: absolute;
			right: 20px;
			bottom: 100%;
			width: 0;
			height: 0;
			border-top: 0;
			border-left: 6px solid transparent; 
			border-right: 6px solid transparent; 
			border-bottom: 6px solid #fff; 
		}
	}
</style>