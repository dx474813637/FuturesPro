<template>
	<view class="wrap u-p-40"> 
		<view class="u-info-light-bg u-radius-8 u-m-b-20 u-p-12 box-border">
			<image
				src="https://cft.100ppi.com/Public/gptguide/ermtop.png" 
				mode="widthFix" 
				style="width: 100%; height: auto;display: block;" 
			/>
		</view>
		<!--  #ifdef  APP-PLUS -->
		<image 
			v-if="qrcode" 
			:src="qrcode" 
			mode="widthFix" 
			style="width: 100%; height: auto;"
			@longpress="base.handleLongPress(qrcode)" 
		/>
		<!--  #endif -->
		<!--  #ifdef  H5 || MP-WEIXIN -->
		<image 
			v-if="qrcode" 
			:src="qrcode" 
			mode="widthFix" 
			show-menu-by-longpress
			style="width: 100%; height: auto;" 
		/>
		<!--  #endif -->
		<!-- <up-image v-if="qrcode" :src="qrcode" width="100%" height="auto" mode="widthFix"></up-image> -->
		<view class="u-text-center u-p-20">
			长按图片进行保存或者转发
		</view>
	</view>
	<up-loading-page :loading="loading"></up-loading-page>
</template>

<script setup>
	const $api = inject('$api')
	import {
		userStore
	} from '@/stores/user.js'
	import {
		baseStore,
		menusStore
	} from '@/stores/base.js'
	const user = userStore()
	const {
		login
	} = toRefs(user)
	const menusstore = menusStore()
	const base = baseStore()
	const loading = ref(false)
	const qrcode = ref('')
	onLoad(async () => {
		await getData()
	})
	async function getData() {
		if (loading.value) return;
		loading.value = true
		// await uni.$u.sleep(1800)
		try {
			const res = await $api.my_ewm()
			if (res.code == 1) {
				qrcode.value = res.list
			}
		} catch (e) {

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