<template>
	<view class="wrap ">  
		<NavBar :bgColor="bgColor"  title="" customColor="#fff" :titleStyle="`color: #fff`" placeholder >
		</NavBar>
		<view class="u-p-30">
			<view class="u-m-b-60">
				<up-image src="https://p.cft.100ppi.com/Public/minpian/bslogo.png" height="45px" mode="heightFix"></up-image>
			</view>
			<view class="u-radius-10 bg-white u-p-30">
				<view class="u-flex u-flex-items-start u-flex-between">
					<view class="avatar-w"> 
						<up-avatar :src="card.img" :text=" !card.img ? card.name : ''" shape="square" size="75" mode="aspectFill" bgColor="#EEF6F9"></up-avatar>
					</view>
					<view class="content-w u-flex-1 u-m-l-20">
						<view class="u-font-18">{{card.name}}</view>
						<view class="text-base u-font-14">{{card.position}}</view>
						<view class="u-m-t-12 u-info">{{card.phone}}</view>
					</view>
				</view>
			</view>
			<view class="u-radius-10 bg-white u-p-30 u-m-t-30">
				<view class=" " style="line-height: 30px;">
					生意社财富通平台是由上市公司网盛生意宝（002095）旗下大宗商品数据服务平台生意社，打造的面向股票与期货投资者的数据服务平台，主要服务包括股票通与期货通服务，股票通包括1000+只周期股，期货通包括50+个期货商品。
				</view>
			</view>
		</view>
		<!-- <view class="u-flex u-flex-items-center u-flex-center" style="height: 240px;">
			<up-image src="https://p.cft.100ppi.com/Public/minpian/biaoyu.png" width="100%" mode="widthFix"></up-image>
		</view> -->
		
	</view>
	<up-loading-page :loading="loading"></up-loading-page>
	<u-safe-bottom></u-safe-bottom>
	
	<MenusBar></MenusBar>
</template>

<script setup> 
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	import { baseStore, menusStore } from '@/stores/base.js' 
	const user = userStore() 
	const {login} = toRefs(user)
	const menusstore = menusStore()
	const base = baseStore()   
	const {themeColor} = toRefs(base)
	const loading = ref(false)  
	const _login = ref('')
	const top = ref(true)
	const card = ref({})
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#3A6CDF'
	}) 
	onLoad(async (options) => {  
		_login.value = login.value
		if(options.hasOwnProperty('login')) {
			_login.value = options.login
		}
		await getData()
	})   
	onPageScroll((e) => { 
		handleScroll(e)
	})
	async function getData() { 
		if(loading.value) return;
		loading.value = true
		// await uni.$u.sleep(1800)
		try{
			const res = await $api.web_login_card({params: {login: _login.value}})
			if(res.code == 1) { 
				// qrcode.value = res.list
				card.value = res.list
			}
		} catch(e) {
			
		}
		loading.value = false
		
	}   
	// 滚动事件处理函数
	const handleScroll = (e) => {
		// 直接使用回调提供的滚动信息
		const scrollTop = e.scrollTop
		// 当滚动距离超过80px时，top设为false，否则设为true
		top.value = scrollTop < 60
	}
</script> 
<style lang="scss" > 
 page {
	 background-color: #EEF6F9;
 }
</style>
<style lang="scss" scoped> 

	.wrap { 
		background-image: url('https://p.cft.100ppi.com/Public/minpian/mp-topbg.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0;
	}
</style>
