<template>
	<NavBar :bgColor="themeColor"  title="我的订阅" titleStyle="color: #fff" customColor="#fff" placeholder ></NavBar>
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
