<template>
	<view> 
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup> 
	const $api = inject('$api')  
 
	onLoad(() => {
		// nextTick(() => {
		// 	messageManager.showText('1这是一条来自全局组件的消息') 
		// })
		
	}) 
</script>

<style>
</style>