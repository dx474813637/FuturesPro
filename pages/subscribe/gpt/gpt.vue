<template>
	<NavBar :bgColor="themeColor" title="股票通" titleStyle="color: #fff" customColor="#fff" placeholder ></NavBar>
	<view>
		
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar></MenusBar>
</template>

<script setup> 
	import {useCateStore, baseStore} from '@/stores/base.js'  
	const base = baseStore() 
	const {themeColor} = toRefs(base)
</script>

<style lang="scss" scoped>

</style>
