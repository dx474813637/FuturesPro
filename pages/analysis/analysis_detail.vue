<template>
	<view class="w" :style="{backgroundImage: 'url(https://wx.rawmex.cn/Public/rdxg-bg/info-top.png)' }">
		<NavBar :bgColor="bgColor"  title="" :backBtn="false" customColor="#fff" :titleStyle="`color: #fff`" placeholder ></NavBar>
		<view class="w-main">
			<view class="u-flex u-flex-end u-p-t-10 ">
				<view class="">
					<view 
						class="bg-white u-p-4 u-p-l-20 u-p-r-20 u-font-14 text-thin" 
						style="border-radius: 10px 0 0 10px;"
						@click="resetEvent"
					>重新筛选</view>
				</view>
			</view>
			<view class="u-text-center text-white text-thin" style="margin-top: 80px;">
				最近5天且涨幅≥5%的热点商品有 47个
			</view>
			<view class="u-p-20">
				<view class="tabs-w">
					<up-tabs 
						:scrollable="false"
						:list="tabslist" 
						:current="tabIndex"  
						lineColor="#fff" 
						lineHeight="2"
						:activeStyle="{
							color: '#fff', 
							fontWeight: '800'
						}" :inactiveStyle="{
							color: '#eee', 
						}" itemStyle=" height: 30px; padding: 5px 8px; "
						@click="tabsEvent"	
					>
						<!-- <template #right>
							<view class="u-flex u-flex-items-center u-p-l-20 text-white"  @click="handleChangeShow2(true)" > 
								<view class="u-m-t-10" style="position: relative;">
									<nut-icon name="shaixuan-xianxing" font-class-name="custom-icon" class-prefix="custom-icon" size="18" ></nut-icon>
									<up-badge type="error" isDot absolute :offset="[-1,-2]"></up-badge>
								</view> 
								<view class="u-font-16 u-m-l-10">筛选</view>
							</view>
						</template> -->
					</up-tabs>
				</view>
			</view>
			
			
			
			
		</view>
	</view>
	<!-- 筛选popup -->
	<!-- <GptHotFilterPopup
		:show="gptHotFilterShow"
		title="热点商品筛选"   
		:onUpdateShow="handleChangeShow2"
		@submit="submitFilterEvent"
	></GptHotFilterPopup> -->
</template>

<script setup>
	import { timeFormat } from 'uview-plus';
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const $api = inject('$api')  
	const user = userStore() 
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const top = ref(true)
	// const gptHotFilterShow = ref(false) 
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#E62C3A'
	})
	
	
	const tabValue = ref('5')
	const tabIndex = computed(() => {
		tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabslist = ref([
		{
			name: '5天涨',
			value: '5'
		}, 
		{
			name: '10天涨',
			value: '10'
		}, 
		{
			name: '20天涨',
			value: '20'
		}, 
		{
			name: '30天涨',
			value: '30'
		}, 
		{
			name: '60天涨',
			value: '60'
		}, 
		{
			name: '90天涨',
			value: '90'
		},  
	])
	
	
	onPageScroll((e) => { 
		if(e.scrollTop <= 50) {
			top.value = true 
		}
		else {
			top.value = false
		}
		
	})
	// function handleChangeShow2(data) {
	// 	gptHotFilterShow.value = data
	// }
	// function submitFilterEvent(data) {
	// 	console.log(data)
	// 	handleChangeShow2(false)
	// }
	function resetEvent() {
		
	}
	function tabsEvent (obj) {  
		if(obj.disabled) {
			// nextTick(() => {
			// 	messageManager.showText('敬请期待'); 
				
			// })
			return
		}
		tabValue.value = obj.value
		// nextTick(() => {
		// 	swiperRef.value.to(obj.index)
		// })
	}
</script>

<style lang="scss" >
	page {
		background-color: #f8f8f8; 
	}
</style>
<style lang="scss" scoped>
	.w {
		background-repeat: no-repeat;
		background-size: 100% auto;
		background-position: 0 0;
	}
</style>