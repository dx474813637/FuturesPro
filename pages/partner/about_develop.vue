<template>
	<view class="wrap">  
		<!--  #ifdef  APP-PLUS -->
		<image 
			v-if="img" 
			:src="img" 
			mode="widthFix" 
			style="width: 100%; height: auto;"
			@longpress="base.handleLongPress(img)" 
		/>
		<!--  #endif -->
		<!--  #ifdef  H5 || MP-WEIXIN -->
		<image 
			v-if="img" 
			:src="img" 
			mode="widthFix" 
			show-menu-by-longpress
			style="width: 100%; height: auto;" 
		/>
		<!--  #endif -->
		<!-- <up-image v-if="img" :src="img" width="100%" height="auto" mode="widthFix"></up-image> -->
		<view class="u-text-center u-p-20">
			长按图片进行保存或者转发
		</view>
	</view>
	<up-loading-page :loading="loading"></up-loading-page>
</template>

<script setup> 
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	import { baseStore, menusStore } from '@/stores/base.js' 
	const user = userStore() 
	const {login} = toRefs(user)
	const menusstore = menusStore()
	const base = baseStore()   
	const loading = ref(false) 
	const img = ref('https://cft.100ppi.com/Public/gptguide/lhfz.jpg')
	onLoad(async () => {   
	})    
</script> 
<style lang="scss" scoped> 

	.wrap {
		// height: 100vh;
		background: #fff;
		font-size: 28rpx;  
	}
</style>
