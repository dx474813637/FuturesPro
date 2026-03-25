<template>
	<view class="wrap">  
		<up-image :src="img" width="100%" height="auto" mode="widthFix"></up-image>
		<view class="u-text-center u-p-20">
			长按图片进行保存或者转发
		</view>
		<view class="u-p-t-10 u-p-b-40 u-p-10 u-flex u-flex-items-center u-flex-between">
			<!-- <view class="u-flex-2 u-p-5">
				<up-button type="primary" shape="circle" @click="downloadBtn">下载海报</up-button>
			</view> -->
			<view class="u-flex-1 u-p-5">
				<up-button type="error" shape="circle" @click="shareBtn">分享页面</up-button>
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
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	import { baseStore, menusStore } from '@/stores/base.js' 
	const user = userStore() 
	const {login} = toRefs(user)
	const menusstore = menusStore()
	const base = baseStore()   
	const overlayshow = ref(false) 
	const img = ref('https://p.cft.100ppi.com/Public/huodong1.jpg')
	onLoad(async () => {  
		// await getData()
	})   
	// async function getData() { 
	// 	if(loading.value) return;
	// 	loading.value = true
	// 	// await uni.$u.sleep(1800)
	// 	try{
	// 		const res = await $api.about( )
	// 		if(res.code == 1) { 
	// 			img.value = res.list
	// 		}
	// 	} catch(e) {
			
	// 	}
	// 	loading.value = false
		
	// }   
	function shareBtn() {
		overlayshow.value = true
	}
</script> 
<style lang="scss" scoped> 

	.wrap {
		// height: 100vh;
		background: #fff;
		font-size: 28rpx;  
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
