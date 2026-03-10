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
			<view class="u-text-center text-white text-thin" style="margin-top: 70px;">
				<text>最近</text>
				<text class="text-yellow text-bold u-p-4">{{tabValue}}</text>
				<text>天</text>
				<text>且涨幅≥</text>
				<text class="text-yellow text-bold u-p-4">{{zf}}%</text>
				<text>的热点商品有</text>
				<text class="text-yellow text-bold u-p-4">{{productlist.length}}</text>
				<text>个</text> 
			</view> 
			<view class="tabs-w u-p-l-20 u-p-r-20" v-if="true">
				<up-tabs   
					:list="tabslist" 
					:current="tabIndex"  
					lineColor="#fff" 
					lineHeight="1"
					lineWidth="25"
					:activeStyle="{
						color: '#fff', 
						fontWeight: '800'
					}" :inactiveStyle="{
						color: '#f1c9ca', 
					}" itemStyle=" height: 25px; padding: 5px 12px; "
					@click="tabsEvent"	
				></up-tabs>
			</view> 
			<view class="" style="position: relative;">
				<!-- 筛选结果后的商品tabs -->
				<view class="product-tabs u-m-t-15 u-p-l-12 u-p-r-12 box-border">  
					<up-tabs
						:list="productlist" 
						:current="productIndex"  
						lineColor="#fff" 
						lineHeight="0" 
						:activeStyle="{
							color: '#E62C3A', 
							backgroundColor: 'rgba(255,255,255, 1)',
							padding: '4px 15px',
							borderRadius: '15px',
							fontSize: '14px',
							boxSizing: 'border-box',
							fontWeight: 'bold',
							height: '28px'
						}" :inactiveStyle="{
							color: '#fff', 
							backgroundColor: 'rgba(255,255,255, .35)',
							padding: '4px 15px',
							borderRadius: '15px',
							fontSize: '14px',
							boxSizing: 'border-box',
							height: '28px'
						}" itemStyle=" height: auto; padding: 0px 3px 5px 3px ; "
						@click="productEvent"	
					>
						<template #right>
							<view class="u-flex u-flex-items-center u-p-l-20 text-white u-p-b-10"  @click="allproductShow = true" > 
								<view class=" u-flex" style="position: relative;">
									<nut-icon name="sort" font-class-name="custom-icon" class-prefix="custom-icon" size="18" ></nut-icon>
									<up-badge type="warning"  :value="productlist.length" absolute :offset="[-8,-12]"></up-badge>
								</view>  
								<view class="u-font-16 u-m-l-8">展开</view>
							</view>
						</template>
					</up-tabs>
				</view>
				
				<view class="u-p-5 u-p-l-12 u-p-r-12 u-m-b-12">
					<view class="bg-white u-radius-12 u-p-12">
						<view class="u-font-15 u-p-6 u-p-l-15 u-m-b-6 text-base">生意社价格行情</view>
						<view class="u-flex u-flex-items-center u-flex-between u-radius-10" style="overflow: hidden;">
							<view class="u-p-10 u-error-light-bg u-text-center u-flex-1 box-border"
								v-for="item in productZfByDay" :key="item.index"
								:class="{
									'u-error-light-bg': item.value > 0, 
									'u-info-light-bg': item.value == 0, 
									'u-success-light-bg': item.value < 0
								}"
							>
								<view class="u-font-12  u-m-b-10 ">{{item.name}}</view>
								<view class="u-flex u-flex-items-center u-flex-center"> 
									<view 
										class="u-font-20" 
										:class="{
											'u-error': item.value > 0, 
											'text-info': item.value == 0, 
											'u-success': item.value < 0
										}"
										>{{item.value}}%</view>
								</view>
							</view> 
						</view>
					</view>
				</view>
				<view class="loading-w u-flex u-flex-items-center u-flex-center" style="background-color: rgba(255,255,255,.5)" v-if="loading_product">
					 <nut-icon name="loading" size="20" custom-color="#f00"></nut-icon>
				</view>
			</view>
			
			<view class="content-w u-p-l-12 u-p-r-12">
				<view class="content-header">
					<view class="tab-list-cnt box-border  " style=" border-radius: 12px 12px 0 0;">
						<view class="tab-list " >
							<view class="tab-item active u-flex u-flex-items-center u-flex-start u-p-l-32" >
								<view class="u-flex u-flex-items-baseline ">
									<view class="u-font-16">生产商</view>
									<view class="u-font-13 u-m-l-20 u-info">基本面评析</view>
								</view>
								
							</view>
							<view class="tab-item " >  
							</view>
							<div :style="{'transform': `translateX(0)`}" class="tab-selected">
								<!-- <div class="left"></div> -->
								<div class="right"></div>
							</div> 
						</view>  
					</view> 
				</view>
				<view class="content-main box-border u-flex u-flex-items-start bg-white " 
					style="border-radius: 0 15px 15px 15px; border-top: 1rpx solid #f5f5f5;"
					>  
					<view class="loading-w u-flex u-flex-items-start u-flex-center u-p-t-80" style="background-color: rgba(255,255,255,.5)" v-if="loading_product || loading_stock">
						 <nut-icon name="loading" size="20" custom-color="#f00"></nut-icon>
					</view>
					<view class="main-left">
						<view class="cpy-list">
							<view 
								class="cpy-item u-p-10 u-p-t-15 u-p-b-15"
								v-for="item in cpylist"
								:key="item.cid"
								:class="{
									active: item.cid == cpyValue
								}"
								@click="cpyEvent(item)"	
							>
								<view class="u-font-14 name">{{item.stock}}</view>
								<view class="no u-info u-font-12">{{item.stockcode}}</view>
							</view>
						</view>
					</view>
					<view class="main-right">
						<view class="u-p-15 main-base-info" >
							<view class="u-flex u-flex-items-start u-flex-between u-m-b-10">
								<view class="u-font-30">
									<view class="">{{cpyActive.stock}}</view>
									<view class="u-error">{{cpyActive.stockcode}}</view> 
								</view>
								<view> 
									<view class=" u-flex-column u-flex-items-end" v-if="cpyActive">
										<view class="u-flex u-flex-items-center u-m-b-5 u-font-13"> 
											<view class="text-base">营收占比</view>
											<view class="u-error u-m-l-10"> 
											{{cpyActive.portion ? cpyActive.portion : '--'}}</view>
										</view>
										<view class="u-flex u-flex-items-center u-font-13"> 
											<view class="text-base">产能</view>
											<view class="u-error u-m-l-10">{{cpyActive.capacity? cpyActive.capacity + cpyActive.unit : '--'}}</view>
										</view>
									</view>   
								</view>
								
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-primary-light-bg u-p-8 u-p-l-20 u-p-r-20 u-radius-8">
								<view class="u-flex u-flex-items-center">
									<view class="u-font-14 text-base ">PriceSeek评分</view>
									<up-icon name="arrow-right" size="14" color="#ccc" ></up-icon>
								</view>
								<view class="u-flex">
									<nut-tag type="primary" plain round><view class="u-p-l-10 u-p-r-10">{{cpyDataGinfo.score}} 分</view></nut-tag> 
								</view>
							</view>
							
						</view>  
						<view class="main-data">
							<web-view 
								:fullscreen="false" 
								style="width: 100%; height: 170px; border: none!important"
								src="https://www.100ppi.com/graph/cindex.php?f=graph_gpt_ave&ppid=120&sdate=2026-01-01&edate=2026-03-09"></web-view>
						</view>
						<view class="main-data">
							<web-view 
								:fullscreen="false" 
								style="width: 100%; height: 220px; border: none!important"
								src="https://www.100ppi.com/graph/cindex.php?f=graph_stock_k&code=000301&sdate=2026-01-01"></web-view>
						</view>
						<view class="u-p-20 u-flex u-flex-wrap u-flex-items-start">
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">最新股价</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{cpyDataSinfo.price}}</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">90天位置</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{position_status}}</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">最小值</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{cpyDataSinfo.ninety_day_min}}</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">最大值</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{cpyDataSinfo.ninety_day_max}}</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">中位值</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{cpyDataSinfo.ninety_day_zw}}</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">平均值</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{cpyDataSinfo.ninety_day_avg}}</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
								<view class="text-base u-font-13">PriceSeek评分</view>
								<view class="u-font-14 u-radius-8 u-error-light-bg u-p-4 u-p-l-15 u-p-r-15 u-error">{{cpyDataGinfo.score}}</view>
							</view>
						</view>
					</view>
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
	<ProductLabelPopup
		:show="allproductShow"
		title="商品筛选结果"   
		:list="productlist"
		:ppid="productValue"
		:onUpdateShow="handleChangeShow3"
		@submit="confirmProductLabel"
	></ProductLabelPopup>
	<up-action-sheet 
		:show="scoreShow"
	 	title="PriceSeek评分 大于等于"
		safeAreaInsetBottom
	 	:actions="scoreList"
		closeOnClickOverlay
		@close="scoreShow = false"
		@select="(item) => { 
			terms_score = item.value
		}"
	>
	</up-action-sheet>
	<up-action-sheet 
		:show="positionShow"
	 	title="90天股价位置 小于等于"
		safeAreaInsetBottom
	 	:actions="positionList"
		closeOnClickOverlay
		@close="positionShow = false"
		@select="(item) => { 
			terms_position = item.value
		}"
	>
	</up-action-sheet>
	<u-safe-bottom></u-safe-bottom> 
	<MenusBar></MenusBar>
	<TabBar
		:customStyle="{ 
			background: 'transparent',  
			paddingBottom: '60px'
		}"
		:mainStyle="{
			height: 'auto'
		}"
		>
		<view class="center-bottom" > 
			<view class="u-p-12 " >
				<view class="bg-white u-radius-12 u-p-10 u-p-l-15 u-p-r-15 "	> 
					<view class="u-error-bg u-radius-12 u-p-10 u-p-l-15 text-white"	>
						<view class="u-flex u-flex-items-center u-flex-between">
							<view class="u-flex u-flex-items-start" >
								<up-image height="20px" src="https://wx.rawmex.cn/Public/rdxg-bg/gpsx.png" mode="heightFix"></up-image>
							</view>
							<view class="u-flex-column u-flex-items-end u-flex-1">
								<view class="u-flex u-flex-items-center  u-flex-1 u-m-b-10" style="flex: 0 0 40%">
									<view class="text-nowrap text-white u-font-14 u-m-r-10">90天股价位置 ≤ </view>
									<view class="u-flex u-flex-items-center u-border u-p-4 u-radius-8 u-flex-1 bg-white" style="width: 60px; flex: 0 0 60px" @click="positionShow = true">
										<view class="u-flex-1 u-font-13  u-error u-text-center" >{{positionLabel}}</view>
										<up-icon name="list-dot" size="10" color="#aaa"></up-icon> 
									</view>
								</view>
								<view class="u-flex u-flex-items-center  u-flex-1  " style="flex: 0 0 40%">
									<view class="text-nowrap text-white u-font-14 u-m-r-10">PriceSeek评分 ≥ </view>
									<view class="u-flex u-flex-items-center u-border u-p-4 u-radius-8 u-flex-1 bg-white" style="width: 60px; flex: 0 0 60px" @click="scoreShow = true">
										<view class="u-flex-1 u-font-13  u-error u-text-center" >{{terms_score}} 分</view>
										<up-icon name="list-dot" size="10" color="#aaa"></up-icon> 
									</view>
								</view> 
							</view>
							<view class="u-m-l-20 u-m-r-20">
								<up-button  size="mini" shape="circle" color="transparent" :customStyle="{borderColor: '#fff', height: '30px'}" @click="stockFilterBtn">搜索</up-button>
							</view>
						</view>
					</view>
				</view>
			</view>  
		</view>
	</TabBar> 
</template>

<script setup>
	import useFilter from '@/composition/useFilter.js' 
	const zt = computed(() => {
		return {
			position_status: cpyDataSinfo.value.ninety_day_position
		}
	})
	const { 
		position_status
	} = useFilter(zt)
	import { timeFormat } from 'uview-plus';
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js'  
	const $api = inject('$api')  
	const user = userStore() 
	const base = baseStore() 
	const {themeColor, analysisModeList} = toRefs(base)
	const top = ref(true)
	// const gptHotFilterShow = ref(false) 
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#E62C3A'
	})
	const loading_product = ref(false)
	const loading_stock = ref(false)
	const allproductShow = ref(false)
	const mode = ref('1')
	const zf = ref('5')
	
	const tabValue = ref('5')
	const tabIndex = computed(() => tabslist.value.findIndex(ele => ele.value == tabValue.value));
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
	
	const productValue = ref('')
	const productIndex = computed(() => productlist.value.findIndex(ele => ele.ppid == productValue.value));
	const productlist = ref([])
	const productActive = computed(() => {
		if(productIndex.value != -1) {   
			return productlist.value[productIndex.value]
		} 
		return {}
	});
	const productZfByDay = computed(() => { 
		if(productActive.value.pid) {
			let keys = Object.keys(productActive.value).filter(ele => ele.includes('rate_'))  
			return keys.map(ele => {
				let num = ele.split('_')[1]
				return {
					value: productActive.value[ele],
					index: num,
					name: `${num}天涨`
				}
			})
		}
		return []
	})
	
	const cpyValue = ref('')
	const cpyIndex = computed(() => cpylist.value.findIndex(ele => ele.cid == cpyValue.value));
	const cpylist = ref([]) 
	const cpyActive = computed(() => {
		if(cpyIndex.value != -1) {
			return cpylist.value[cpyIndex.value]
		} 
		return {}
	});
	const cpyData = ref({})
	const cpyDataStock = computed(() => cpyData.value.stock || [])
	const cpyDataGinfo = computed(() => cpyData.value.Ginfo || {})
	const cpyDataSinfo = computed(() => cpyData.value.Sinfo || {})
	
	const terms_position = ref('3')
	const positionLabel = computed(() => positionList.value.filter(ele => ele.value == terms_position.value )[0].name)
	const positionList = ref([
		{
			name: '低位',
			value: '1',
		},
		{
			name: '中地位',
			value: '2',
		},
		{
			name: '中位',
			value: '3',
		},
		{
			name: '中高位',
			value: '4',
		},
		{
			name: '高位',
			value: '5',
		},
	])
	const positionShow = ref(false)
	 
	
	const terms_score = ref('2.5') 
	const scoreList = ref([
		{
			name: '1分',
			value: '1',
		}, 
		{
			name: '1.5分',
			value: '1.5',
		}, 
		{
			name: '2分',
			value: '2',
		}, 
		{
			name: '2.5分',
			value: '2.5',
		}, 
		{
			name: '3分',
			value: '3',
		}, 
		{
			name: '3.5分',
			value: '3.5',
		}, 
		{
			name: '4分',
			value: '4',
		},  
	])
	const scoreShow = ref(false)
	onLoad(async (options) => {
		if(options.hasOwnProperty('mode')) {
			mode.value = options.mode || '1'
		}
		if(options.hasOwnProperty('by')) {
			tabValue.value = options.by  
		}
		if(options.hasOwnProperty('zf')) {
			zf.value = options.zf  
		}
		
		// await initData() 
	})
	watch(
		() => [tabValue.value, zf.value],
		async (n) => {
			await initData() 
		},
		{
			deep: true
		}
	) 
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
	function handleChangeShow3(data) {
		allproductShow.value = data
	}
	function confirmProductLabel(data) { 
		allproductShow.value = false
		productEvent(data)
	}
	
	async function initData() {
		cpyData.value = {}
		cpyValue.value = ''
		cpylist.value = []
		await getHotData()
		await getStockData()
	}
	async function getHotData() {
		if(loading_product.value) return;
		loading_product.value = true
		try{
			const res = await $api.gpt({params: {by: tabValue.value, zf: zf.value }})
			if(res.code == 1) {
				productlist.value = res.list.res.list
				productValue.value = productlist.value[0].ppid
				
				cpylist.value = productlist.value[productIndex.value].stock
				cpyValue.value = cpylist.value[0].cid
			}
		} catch(e) {
			
		}
		loading_product.value = false
		
	}
	async function getStockData() {
		if(loading_stock.value) return;
		loading_stock.value = true
		try{
			const res = await $api.gpt_analysis_detail({params: {
				ppid: productActive.value.ppid, 
				code: cpyActive.value.stockcode,
				terms_score: terms_score.value,
				terms_position: terms_position.value
			}})
			if(res.code == 1) {
				cpyData.value = res.list.res
				cpylist.value = res.list.res.stock || []
				if(!cpyValue.value) cpyValue.value = cpylist.value[0].cid || ''
				// productlist.value = res.list.res.list
				// productValue.value = productlist.value[0].ppid
			}
		} catch(e) {
			
		}
		loading_stock.value = false
		
	}
	
	function resetEvent() {
		
	}
	function tabsEvent (obj) {  
		if(obj.disabled) return
		tabValue.value = obj.value 
	}
	async function productEvent (obj) {  
		if(obj.disabled) return
		productValue.value = obj.ppid 
		cpylist.value = productlist.value[productIndex.value].stock
		cpyValue.value = cpylist.value[0].cid
		await getStockData()  
	}
	async function cpyEvent (obj) {  
		if(obj.disabled) return
		cpyValue.value = obj.cid 
		await getStockData()  
	}
	async function stockFilterBtn() {
		cpylist.value = productlist.value[productIndex.value].stock
		cpyValue.value = ''
		await getStockData() 
	}
</script>

<style lang="scss" >
	page {
		background-color: #f8f8f8; 
		padding-bottom: 60px;
	}
</style>
<style lang="scss" scoped> 
	.loading-w {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.w {
		background-repeat: no-repeat;
		background-size: 100% auto;
		background-position: 0 0;
	}
	.product-tabs {
		position: relative;
		::v-deep {
			.u-tabs__wrapper__nav__item-active {
				.u-tabs__wrapper__nav__item__text {
					position: relative;
					&::after {
						content: '';
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						margin-left: auto;
						margin-right: auto;
						width: 0;
						height: 0;
						border-top: 5px solid #fff;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
						border-bottom: 0;
					}
				}
			}
			
		}
		.all-w {
			position: relative;
		}
	}
	
	$tab-height: 32px;
	$active-color: #ffffff;
	$default-color: #f8f8f8;
	$primary-color: #343433;
	
	@mixin tabSelected($bgColor, $skewX) {
		position: absolute;
		width: 12px;
		height: $tab-height;
		background: $bgColor;
		transform: skewX($skewX); // 重点
	}
	
	.tab-list-cnt {
		position: relative;
		// top: 0;
		border-radius: 12px 12px 0 0;
		background-color: $default-color;
		overflow: hidden;
		z-index: 2;
		.tab-list {
			position: relative;
			display: flex;
			border-radius: 12px 12px 0 0;
		
			.tab-item {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
				height: $tab-height;
				color: #8E9295;
				font-size: 17px; 
				cursor: pointer; 
				&.active {
					color: $primary-color;
					// font-style: italic;
					// font-weight: bold;
					font-size: 19px; 
				}
			} 
		
			.tab-selected {
				position: absolute;
				width: 50%;
				height: $tab-height;
				// background: #ffffff;
				background: linear-gradient(135deg, #fff3f3, #fff);
				border-radius: 12px 12px 0 0;
				box-shadow: 24px 40px 0 $active-color, -24px 40px 0 0 $active-color; // 重点
				opacity: 1;
				z-index: -1;
				transition: .3s ease-in-out;
		 
				.right {
					@include tabSelected($default-color, 22deg);
					right: -14px;
					border-bottom-left-radius: 15px;
					z-index: 10;
				}
			} 
			.tab-selected::after {
				content: '';
				@include tabSelected($active-color, 25deg);
				right: -6px;
				border-top-right-radius: 20px;
			}
		} 
	}

	.content-main {
		position: relative;
		min-height: 50vh;
		.main-left {
			position: relative;
			flex: 0 0 80px;
			width: 80px; 
			border-right: 1rpx solid #f5f5f5;
			.cpy-list {
				.cpy-item {
					&.active {
						.name {
							color: $u-error;
						}
					}
				}
			}
		}
		.main-right {
			position: relative;
			flex: 1;
			width: calc(100% - 80px); 
			padding-bottom: 80px;
		}
	}
	.tabs-more-list {
		position: absolute;
		background: linear-gradient(to bottom, #fff 50%, #eef4fe);
		left: 0;
		top: 0;
		width: 100%; 
		z-index: 50;
		overflow: hidden;
		border-radius: 20px;
		box-shadow: 0 5px 5px rgba(0,0,0,.1);
		.item-w {
			// flex: 0 0 20%
			.item-w-text {
				background-color: #f5f5f5;
				color: #606060; 
				padding: 7px 15px;
				height: 40px; 
			} 
			&.active {
				animation: listAnimation .2s linear; 
				.item-w-text {
					background-color: #E7F1FD;
					color: $u-primary;
				} 
			}
		}
		&.active {
			animation: listAnimation .2s linear;  
		}
	}
</style>