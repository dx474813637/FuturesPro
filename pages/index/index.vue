<template>
	<view> 
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup> 
	const $api = inject('$api')  
	 // const {
		// proxy
	 // } = getCurrentInstance();
	onLoad(() => {
		nextTick(() => {
			// messageManager.showText('1这是一条来自全局组件的消息') 
			// proxy.$refs.globalToast.showText('12')
		})
		
	}) 
</script>

<style>
</style>