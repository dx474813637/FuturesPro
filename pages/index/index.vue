<template>
	<view> 
	<view class="u-p-20">
		<up-button type="error" @click="user.logout">退出</up-button>
		
	</view>
	<view class="u-p-20">
		<up-button type="primary" @click="base.handleGoto('/pages/my/my')">my</up-button>  
	</view> 
	<view class="u-p-20">
		<up-button type="primary" @click="base.handleGoto('/pages/analysis/analysis')">选股</up-button>  
	</view> 
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup> 
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const user = userStore() 
	const base = baseStore() 
	const $api = inject('$api')  
	 // const {
		// proxy
	 // } = getCurrentInstance();
	onLoad(async () => {
			// await user.getUserSubscription()
		nextTick(() => {
			// messageManager.showText('1这是一条来自全局组件的消息') 
			// proxy.$refs.globalToast.showText('12')
		})
		
	})  
</script>

<style>
</style>