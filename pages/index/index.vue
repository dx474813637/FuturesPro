<template> 
	<view class="header bg-white u-p-t-40 u-p-b-10" >
		<!-- #ifdef MP-WEIXIN -->
		<up-status-bar></up-status-bar>
		<!-- #endif -->
		<image class="" style=" height: 70px" mode="heightFix" src="https://cft.100ppi.com/Public/index-logo.png" />
		<view class="u-p-l-20 u-p-r-20 box-border">
			
			<!-- <up-image src="https://cft.100ppi.com/Public/index-topbj/home-top-logo.png" height="40px" mode="heightFix"></up-image> -->
			<!-- <view class="u-primary text-thin u-m-t-5 u-m-b-30">
				买卖周期股，就用生意社股票通!
			</view> -->
			<view class="data-box u-flex u-flex-items-center u-flex-between" style="color: #5970c3;">
				<view class="u-flex-1 u-m-r-10 box-border">
					<view class="u-primary-light-bg u-radius-6 u-text-center u-p-10 u-p-t-20 u-p-b-20" @click="base.handleGoto('/pages/index/daily')" >
						<nut-icon name="comment" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
						<view class="u-font-15 text-black">快讯</view> 
					</view> 
				</view> 
				<view class="u-flex-1  box-border">
					<view class="u-primary-light-bg u-radius-6 u-text-center u-p-10 u-p-t-20 u-p-b-20" @click="base.handleGoto('/pages/index/hot')" >
						<nut-icon name="scoretop" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
						<view class="u-font-15 text-black">热点</view> 
					</view> 
				</view> 
				<view class="u-flex-1  u-m-l-10 box-border">
					<view class="u-primary-light-bg u-radius-6 u-text-center u-p-10 u-p-t-20 u-p-b-20" @click="base.handleGoto('/pages/index/cfh')">
						<nut-icon name="moneybag" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
						<view class="u-font-15 text-black">关于财富通</view> 
					</view> 
				</view> 
			</view>
		</view>
		<view class="tabs-list u-flex u-flex-items-center u-flex-between  u-p-10 box-border">
			<view class="tabs-item u-flex-1 u-flex u-flex-items-center u-flex-center u-info-light-bg u-m-10 u-p-12 u-radius-16 text-base" 
				v-for="item in tabslist"  
				:key="item.value"
				@click="tabsEvent(item)"
			>{{item.name}}</view>
		</view>
	</view>
	<!-- <view class="u-p-15 u-m-b-10" v-if="dataList.length > 0">
		<view class="u-p-10 bg-white  u-p-t-30 u-radius-12">
			<view
				class="u-p-15"
				v-for="item in dataList"
				:key="item.id"
				@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id}})" 
			>
				{{item.title}}
			</view>
			<view class="u-text-center u-p-20 u-info u-font-14" @click="base.handleGoto('/pages/index/daily')">查看更多快讯 ></view>
		</view>
	</view> -->
	
	<view  class=" u-m-t-20 u-p-l-10 u-p-r-10 box-border"> 
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
	<!-- <view  class=" u-m-t-12 u-p-14 box-border"> 
		<StockRecommendCard 
			:list="stockRecommendList" 
			:pubDate="stockPubDate"
			:updateTime="stockUpdateTime"
			theme="light"
			@cardClick="handleStockCardClick"
		></StockRecommendCard>
	</view> -->
	<view class="tabs-w  u-p-20 box-border u-flex  ">
	 	<up-tabs
	 		:list="tabslist2" 
	 		:current="tabsIndex2"  
	 		lineColor="#fff" 
	 		lineHeight="0" 
	 		:activeStyle="{
	 			color: '#fff', 
	 			backgroundColor: '#428eff',
	 			padding: '6px 20px',
	 			borderRadius: '10px',
	 			fontSize: '16px',
	 			boxSizing: 'border-box',
	 			fontWeight: 'bold',
	 			height: '35px'
	 		}" :inactiveStyle="{
	 			color: '#8e9bb6', 
	 			backgroundColor: '#ffffff',
	 			padding: '6px 20px',
	 			borderRadius: '10px',
	 			fontSize: '16px',
	 			boxSizing: 'border-box',
	 			height: '35px'
	 		}" itemStyle=" height: auto; padding: 0px 10px ; "
	 		@click="tabsEvent2"	
	 	> </up-tabs>
	 </view> 
	 
	<view class="u-p-l-10 u-p-r-10 ">
		<view class="tabs-content u-p-20" v-if="tabValue2 == '1'">
			<view class="u-text-center u-p-5 u-m-b-10 u-primary">商品价格上涨往往领先于股票价格上涨</view>
			<view class="u-m-b-20" v-if="!gptVip">
				<view class="u-radius-25 u-primary-bg text-white u-p-20 u-text-center"
					@click="gotoGPT"
				>机会多多 马上订阅</view>
			</view>
			<view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">{{infoConfig.gpt.hxyl.title}}</view>
				</view>
					<u-parse :content="infoConfig.gpt.hxyl.content"></u-parse>
				<!-- <view class="u-font-14" style="color: #67799f;">{{infoConfig.gpt.hxyl.content}}</view> -->
			</view>
			<!-- <view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">选股方法</view>
				</view>
				<view class="" style="color: #67799f;">
					<view class="u-radius-10 u-primary-light-bg u-p-20 u-m-b-20" @click="base.handleGoto({url:'/pages/analysis/analysis',params:{mode:'1'}})">
						<view> 
							<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
								<view class="u-font-17  u-flex u-flex-items-center u-warning ">
									<nut-icon name="huore" font-class-name="custom-icon" class-prefix="custom-icon" ></nut-icon>
									<view class="u-m-l-10 text-black">热点选股</view>
								</view>
								<view>
									<view class="u-primary-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
										<up-icon name="search" color="#fff" ></up-icon>
										<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
									</view>
								</view>
							</view> 
							<view class="u-font-14">{{infoConfig.gpt.xgff[0].content}}</view>
						</view>
					</view>
					<view class="u-radius-10 u-primary-light-bg u-p-20" @click="base.handleGoto({url:'/pages/analysis/analysis',params:{mode:'2'}})">
						<view> 
							<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
								<view class="u-font-17  u-flex u-flex-items-center u-primary "> 
									<nut-icon name="tongji" font-class-name="custom-icon" class-prefix="custom-icon" size="20" ></nut-icon> 
									<view class="u-m-l-10 text-black">季报选股</view>
								</view>
								<view>
									<view class="u-primary-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
										<up-icon name="search" color="#fff" ></up-icon>
										<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
									</view>
								</view>
							</view> 
							<view class="u-font-14">{{infoConfig.gpt.xgff[1].content}}</view>
						</view>
					</view>
				</view>
			</view> -->
			<view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">{{infoConfig.gpt.jtff.title}}</view>
				</view>
					<u-parse :content="infoConfig.gpt.jtff.content"></u-parse>
				<!-- <view class="u-font-14" style="color: #67799f;">{{infoConfig.gpt.jtff.content}}</view> -->
			</view>
		</view>
		<view class="tabs-content u-p-20" v-if="tabValue2 == '2'">
			<view class="u-text-center u-p-5 u-m-b-10 u-primary u-font-15">拐点就是开仓机会，判断基差拐点比价格拐点更容易</view>
			<view class="u-m-b-20" v-if="!qhtVip">
				<view class="u-radius-25 u-primary-bg text-white u-p-20 u-text-center"
					@click="gotoQHT"
				>机会多多 马上订阅</view>
			</view>
			<view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">{{infoConfig.qxt.hxyl.title}}</view>
				</view>
				<view class="u-font-14" style="color: #67799f;">
					<u-parse :content="infoConfig.qxt.hxyl.content"></u-parse>
					<!-- <rich-text v-for="(item, index) in infoConfig.qxt.hxyl.content" :nodes="item" :key="index"> </rich-text> -->
				</view>
			</view>
			<view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">{{infoConfig.qxt.jtff.title}}</view>
				</view>
				<view class="u-font-14" style="color: #67799f;">
					<u-parse :content="infoConfig.qxt.jtff.content"></u-parse>
					<!-- <view v-for="(item, index) in infoConfig.qxt.jtff.content" :key="index">{{item}}</view> -->
				</view>
			</view> 
			<view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">指标分析</view>
				</view>
				<view class="" style="color: #67799f;">
					<view class="u-radius-10 u-primary-light-bg u-p-20 u-m-b-20" @click="base.handleGoto({url:'/pages/qxt/qxt',params:{mode:'2'}})">
						<view> 
							<view class="u-flex u-flex-items-center u-flex-between  ">
								<view class="u-font-17  u-flex u-flex-items-center u-warning ">
									<nut-icon name="huore" font-class-name="custom-icon" class-prefix="custom-icon" ></nut-icon>
									<view class="u-m-l-10 text-black">基差指标</view>
								</view>
								<view>
									<view class="u-primary-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
										<up-icon name="search" color="#fff" ></up-icon>
										<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
									</view>
								</view>
							</view> 
							<!-- <view class="u-font-14">利用n天商品价格上涨幅度，筛选热点商品，从而选择合适的周期股投资机会。</view> -->
						</view>
					</view>
					<view class="u-radius-10 u-primary-light-bg u-p-20" @click="base.handleGoto({url:'/pages/qxt/qxt',params:{mode:'1'}})">
						<view> 
							<view class="u-flex u-flex-items-center u-flex-between  ">
								<view class="u-font-17  u-flex u-flex-items-center u-primary "> 
									<nut-icon name="tongji" font-class-name="custom-icon" class-prefix="custom-icon" size="20" ></nut-icon> 
									<view class="u-m-l-10 text-black">价格指标</view>
								</view>
								<view>
									<view class="u-primary-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
										<up-icon name="search" color="#fff" ></up-icon>
										<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
									</view>
								</view>
							</view> 
							<!-- <view class="u-font-14">利用季报周期内商品价格上涨幅度，提前于季报与年报，发现周期股买入信号。</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view> 
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup> 
	import useDataList from '@/composition/useDataList.js'
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	const user = userStore() 
	import {useCateStore, baseStore} from '@/stores/base.js'  
	const cate = useCateStore() 
	const {infoConfig} = toRefs(cate)
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const {
		gpt, 
		gptVip,
		qht, 
		qhtVip, 
		subsVip,
		userInfo, 
		partner, 
		login, 
		subscription_loading, 
		partner_amount, 
		partner_amount2, 
		partner_amount_list, 
		partner_amount2_list
	} = toRefs(user)   
	const keyword = ref('') 
	// const options = computed(() => {
	// 	return {
	// 		params: { 
	// 			all: 0
	// 		},
	// 		noReach: true,
	// 		api: 'list_chance_recommend_zx',
	// 		getDataCallBack: (res) => {
	// 			if (res.code == 1) {
	// 				dataList.value = [...dataList.value, ...res.list.res.pw_rec_list]
	// 				// tuan.value = res.tuan
	// 				// kg.value = res.kg
					
	// 				if(dataList.value.length >= res.list.length) {
	// 					loadstatus.value = 'nomore'
	// 				}
	// 				else {
	// 					loadstatus.value = 'loadmore'
	// 				}
	// 			}
	// 		}
	// 	}
	// })
	
	// const { 
	// 	dataList,
	// 	curP,
	// 	loadstatus,
	// 	params,
	// 	getDataList,
	// 	initDataList, 
	// } = useDataList(options)  
	
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue = ref('1');
	
	const tabslist = ref([
		{
			name: '股票通',
			value: '1', 
			disabled: false,
			icon: 'tongji',
			url: '/pages/index/gpt'
		}, 
		{
			name: '期货通',
			value: '2',
			disabled: false,
			icon: 'Kxiantu',
			url: '/pages/qxt/qxt'
		}, 
		{
			name: '合伙人',
			value: '3', 
			disabled: false,
			icon: 'tongji',
			url: '/pages/my/my'
		},  
	])
	const tabIndex2 = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue2 = ref('1'); 
	const tabslist2 = ref([
		{
			name: '股票通',
			value: '1',
			disabled: false, 
		},
		{
			name: '期货通',
			value: '2', 
			disabled: false, 
		},   
	])
	 
	
	// const stockRecommendList = ref([])
	// const stockPubDate = ref('')
	// const stockUpdateTime = ref('')
	
	onLoad(async (options) => {  
		if(options.hasOwnProperty('type')) {
			tabValue.value = options.type
		} 
		// getHotStock()
		// getStockRecommend()
	})
	
	// async function getStockRecommend() {
	// 	const res = await $api.list_hot_stock()
	// 	if(res.code == 1) {
	// 		stockRecommendList.value = res.list?.res?.list || []
	// 		stockPubDate.value = res.list?.res?.pubDate || ''
	// 		if(res.list?.res?.list?.length > 0) {
	// 			stockUpdateTime.value = res.list?.res?.list[0]?.post_date || ''
	// 		}
	// 	}
	// }
	
	function handleStockCardClick(item) {
		// base.handleGoto({
		// 	url: '/pages/product/productDetail',
		// 	params: { id: item.id }
		// })
	}
	function tabsEvent (obj) {  
		if(obj.disabled) {
			// messageManager.showText('敬请期待'); 
			return
		}  
		if(!obj.url) {
			return
		} 
		base.handleGoto(obj.url)
		// uni.navigateTo({
		// 	url: obj.url
		// })
		// tabValue.value = obj.value 
	}
	function tabsEvent2 (obj) {  
		if(obj.disabled) {
			// messageManager.showText('敬请期待'); 
			return
		}   
		tabValue2.value = obj.value
	}
	function gotoGPT() {
		// if(gptVip.value) {
		// 	base.handleGoto('/pages/analysis/analysis' )
		// 	return 
		// }
		uni.showModal({
			title: '提示',
			content: '是否订阅股票通',
			success: function (res) {
				if (res.confirm) { 
					base.handleGoto({
						url: '/pages/order/order',
						params: {type: '3'}
					}) 
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	}
	function gotoQHT() {
		// if(gptVip.value) {
		// 	base.handleGoto('/pages/analysis/analysis' )
		// 	return 
		// }
		uni.showModal({
			title: '提示',
			content: '是否订阅期货通',
			success: function (res) {
				if (res.confirm) { 
					base.handleGoto({
						url: '/pages/order/order',
						params: {type: '2'}
					}) 
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F3F8;
		padding-bottom: 120px;
	}
</style>
<style lang="scss" scoped>
	.header { 
		background-image: url('https://cft.100ppi.com/Public/index-topbj/index-topbj.png');
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
	.tabs-content {
		// background: linear-gradient(to bottom, #fff, transparent 50px, #fff); 
		background-color: #fff;
		border-radius: 10px;
		.tabs-content-item {
			background: linear-gradient(to bottom, #EBF1FF, #fff 50px );  
			box-shadow: 0 0 5px rgba(0,0,0,.05);
			border: 1rpx solid #fff;
			margin-bottom: 12px;;
			// &:first-of-type {
			// 	background: #fff;  
				
			// }
		}
	}
</style>