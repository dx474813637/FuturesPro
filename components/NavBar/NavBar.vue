<template>
	<view>
		<!-- <up-navbar 
			leftText="返回" 
			:title="$attrs.title" 
			:title="$attrs.title" 
			:safeAreaInsetTop="$attrs.safeAreaInsetTop || false" 
			:bgColor="$attrs.bgColor || '#fff'"
			:fixed="$attrs.fixed || true"
		> --> 
		<up-navbar 
			v-bind="$attrs"
		>
			<template #left>
				<slot name="left">
					<view class="u-nav-slot u-flex" :style="{color: $attrs.customColor}"> 
						<template v-if="backBtnShow">
							<nut-icon name="rect-left" @click="goBack"></nut-icon>
							<up-line direction="column" :hairline="false" length="20" margin="0 12px"></up-line> 
						</template> 
						<nut-icon name="home" @click="base.handleGoto('/pages/index/index')"></nut-icon> 
					</view> 
				</slot>
			</template>
		</up-navbar>
	</view>
</template>

<script setup>
	import { computed } from 'vue'
	import { baseStore } from '@/stores/base.js'
	const base = baseStore()  
	const backBtnShow = computed(() => {
		// 获取当前页面栈数量
		// const pages = uni.$u.pages()
		const pages = getCurrentPages()
		// 如果页面栈数量大于1，则显示返回按钮，否则不显示
		return pages.length > 1
	})
	function goBack() {
		uni.navigateBack()
	} 
</script>

<style lang="scss" scoped>
</style>