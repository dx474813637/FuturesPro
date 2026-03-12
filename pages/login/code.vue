<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips  ">验证码已发送至 {{ filterLogin }}</view>
			<up-code-input
				v-model="captcha" 
				mode="line" 
				:maxlength="maxlength" 
				focus 
				borderColor="#999"
				hairline
				fontSize="22"
				size="40"
				@change="change"
				@finish="finish"
			></up-code-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			
		</view>
		<view class="u-flex u-flex-center u-flex-items-center">
			<up-code
				ref="uCode"
				@change="codeChange"
				change-text="X秒后重新获取"
				@start="disabled = true"
				@end="disabled = false"
			></up-code>
			<text
				@tap="getCode"
				:text="tips"
				class="u-page__code-text u-m-t-80"
			>{{tips}}</text>
			
		</view>
	</view>
</template>
<script setup>
	import {userStore } from '@/stores/user.js'  
	const user = userStore() 
	import { baseStore, menusStore } from '@/stores/base.js'
	const menusstore = menusStore()
	const base = baseStore() 
	const $api = inject('$api') 
	const tips = ref('')
	const disabled = ref(false)
	const maxlength = ref(6)
	const captcha = ref('')
	const second = ref(60)
	const show = ref(false)
	const error = ref(false)
	const login = ref('')
	const uCode = ref(null)
	const filterLogin = computed(() => login.value.replace(/^([1-9]{3})[0-9]{4}([0-9]{4})$/, "$1****$2"))
	onLoad((opt) => { 
		if(opt.hasOwnProperty('login')) {
			login.value = opt.login
			// getCode() 
		}else {
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
	})
	onReady(() => {
		if(!login.value || disabled.value) return
		getCode() 
	})
	function codeChange(text) {
		tips.value = text;
	} 
	async function getCode() {
		if(disabled.value) return
		disabled.value = true
		uni.showLoading({
			title: '正在获取验证码'
		}) 
		uCode.value.start();
		const res = await $api.get_captcha({params: {mode: 'login' , mobile: login.value }})
		if(res.code == 1) {
			uni.showToast({
				title: '验证码已发送'
			})
		}
	} 
	// change事件侦听
	function change(value) {
		// console.log('change', value);
	} 
	// 输入完验证码最后一位执行
	async function finish(value) {
		uni.showLoading({
			title: '验证中...'
		})
		let res = await $api.login({params: {cate: 0, login:  login.value, captcha: captcha.value }})
		// uni.hideLoading()
		if(res.code == 1) {
			// uni.setStorageSync('login', res.data.back.login)
			// this.setLogin(1)
			// await this.wode()
			await menusstore.getMenusData() 
			await user.getUserSubscription()
			naviBack()
			
		}else {
			captcha.value = '' 
		}
		
	} 
	function naviBack() {
		if(uni.getStorageSync('prePage')) {
			uni.redirectTo({
				url: uni.getStorageSync('prePage'),
				success() {
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					uni.removeStorageSync('prePage')
				}
			})
		}else {
			uni.reLaunch({
				url: '/pages/my/my',
				success() {
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
				}
			})
		}
	} 
</script> 

<style lang="scss">
	.u-page {
		&__code-text {
			color: $u-primary;
			font-size: 15px;
			padding-top: 10px;
		}
	}
</style>
<style lang="scss" scoped>
.wrap {
	height: 100vh;
	padding: 80rpx 0;
	box-sizing: border-box;
	background: linear-gradient(-45deg, #C1CDF6, #E7ECFA, #E7ECFA, #C1CDF6);
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
		padding: 0 80rpx;
	}
}

.title {
	font-size: 50rpx;
	color: #005298;
	padding: 0 80rpx;
}

.key-input .tips {
	font-size: 30rpx;
	color: #606f98;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
	padding: 0 80rpx;
}
.captcha {
	color: $uni-color-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	padding: 0 80rpx;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
