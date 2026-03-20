<template>
	<view class="wrap">  
		<up-image v-if="img" :src="img" width="100%" height="auto" mode="widthFix"></up-image>
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
	const img = ref('')
	onLoad(async () => {  
		await getData()
	})   
	async function getData() { 
		if(loading.value) return;
		loading.value = true
		// await uni.$u.sleep(1800)
		try{
			const res = await $api.about( )
			if(res.code == 1) { 
				img.value = res.list
			}
		} catch(e) {
			
		}
		loading.value = false
		
	}   
</script> 
<style lang="scss" scoped> 

	.wrap {
		// height: 100vh;
		background: #fff;
		font-size: 28rpx;  
	}
</style>
