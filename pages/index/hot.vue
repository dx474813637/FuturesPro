<template>
	<view class="header bg-white">
		<NavBar :bgColor="bgColor" :title="title" customColor="#000" :titleStyle="`color: ${themeColor}`" placeholder>
		</NavBar>
		<image class="" style=" height: 70px" mode="heightFix" src="https://cft.100ppi.com/Public/index-logo.png" />
	</view>
	<view  class=" u-m-10 box-border"> 
		<!--  #ifdef  APP-PLUS -->
		<image  
			src="https://cft.100ppi.com/Public/gptguide/dinyue.png" 
			mode="widthFix" 
			style="width: 100%; height: auto; display: block;"
			@longpress="base.handleLongPress('https://cft.100ppi.com/Public/gptguide/dinyue.png')" 
		/>
		<!--  #endif -->
		<!--  #ifdef  H5 || MP-WEIXIN -->
		<image  
			src="https://cft.100ppi.com/Public/gptguide/dinyue.png" 
			mode="widthFix" 
			show-menu-by-longpress
			style="width: 100%; height: auto; display: block;" 
		/>
		<!--  #endif -->
	</view>
	<view  class=" u-m-t-12 u-p-14 box-border"> 
		<StockRecommendCard 
			:list="stockRecommendList" 
			:pubDate="stockPubDate"
			:updateTime="stockUpdateTime"
			theme="light"
			@cardClick="handleStockCardClick"
		></StockRecommendCard>
	</view> 
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup> 
	import {
		userStore
	} from '@/stores/user.js'
	import {
		useCateStore,
		baseStore
	} from '@/stores/base.js'
	const user = userStore()
	const base = baseStore()
	const {
		themeColor
	} = toRefs(base)
	const $api = inject('$api')
	const keyword = ref('') 
	const top = ref(true)
	const dataList2 = ref([])
	const bgColor = computed(() => {
		if (top.value) return 'transparent'
		return '#d4e5ff'
	})
	const title = computed(() => {
		if (top.value) return ''
		return '热点'
	}) 
	
	const stockRecommendList = ref([])
	const stockPubDate = ref('')
	const stockUpdateTime = ref('') 

	onLoad(async (options) => { 
		getStockRecommend()
	}) 
	async function getStockRecommend() {
		const res = await $api.list_hot_stock()
		if(res.code == 1) {
			stockRecommendList.value = res.list?.res?.list || []
			stockPubDate.value = res.list?.res?.pubDate || ''
			if(res.list?.res?.list?.length > 0) {
				stockUpdateTime.value = res.list?.res?.list[0]?.post_date || ''
			}
		}
	}
	// 滚动事件处理函数
	const handleScroll = (e) => {
		// 直接使用回调提供的滚动信息
		const scrollTop = e.scrollTop
		// 当滚动距离超过80px时，top设为false，否则设为true
		top.value = scrollTop < 60
	} 
</script>

<style lang="scss">
	page {
		background-color: #F0F3F8;
		padding-bottom: 120px;
		::v-deep {
			.nut-step.nut-step-wait .nut-step-icon.is-icon {
				background-color: transparent!important;
				border: 0!important;
				align-items: start;
			}
			.nut-steps-vertical .nut-step-line {
				background: #eee!important;
				top: 20px!important;
				height: 90%!important;
			}
			.nut-step {
				background-color: #fff!important;
				padding: 0 20px;
			}
			.nut-step-title {
				margin: 0!important;
			}
			.nut-step-main {
				padding-right: 0!important;
			}
			
		}
		.ww {
			position: sticky;
			top: 44px;
			z-index: 20;
			transform: translateZ(0);
        	will-change: position;
			::v-deep {  
				.nut-step {
					background-color: #ebf1fc!important;
					padding: 0 20px;
				}
				
			}
		}
	}
</style>
<style lang="scss" scoped>
	.header {
		background-image: url('https://view.cft.100ppi.com/Public/index-topbj/index-topbj.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0; 
	}

	.tabs-list {
		.tabs-item {
			border: 1rpx solid #eee;
			color: #666;
			transition: all .3s;

			&.active {
				color: #007aff;
				border: 1rpx solid #007aff;
				background-color: #fff;
			}
		}
	}

	.tabs-main {
		position: relative;
		min-height: 30vh;

		.tabs-main-list {
			position: relative;
			z-index: 10;
		}
	}
</style>