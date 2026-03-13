<template>
	<view class="w" >
		<view class="bg"></view>
		<NavBar :bgColor="bgColor"  title="" :backBtn="false" customColor="#fff" :titleStyle="`color: #fff`" placeholder ></NavBar>
		<view class="w-main">
			<view class="u-flex u-flex-between u-flex-items-center  u-m-b-20">
				<view class="u-flex-1"></view>
				<view class="u-flex-1">
					<view class="text-white u-text-center" style="font-size: 26px;">
						<template v-if="mode == '1'">热点</template>
						<template v-else-if="mode == '2'">季报</template>选股
					</view>
				</view>
				<view class="u-flex-1 u-flex u-flex-end">
					<view 
						class="bg-white u-p-4 u-p-l-20 u-p-r-20 u-font-14 text-thin" 
						style="border-radius: 10px 0 0 10px;"
						@click="resetEvent"
					>重新筛选</view>
				</view>
			</view>
			
			<view class="u-text-center text-white text-thin u-m-b-20" >
				<template v-if="ppid">
					<text class="u-font-14">下方股票筛选，可再按股价五档位置及AI财报评分选股。</text>
				</template>
				<template v-else>
					<template v-if="mode == '1'">
						<text>最近</text>
						<text class="text-yellow text-bold u-p-4">{{tabValue}}</text>
						<text>天</text>
					</template>
					<template v-else-if="mode == '2'">
						<view>
							<text>在</text>
							<text class="text-yellow text-bold u-p-4">{{sdate}}</text>
							<text>至</text>
							<text class="text-yellow text-bold u-p-4">{{edate}}</text>
							<text>周期内</text>
						</view> 
					</template>
					<template v-if="zf">
						<text >且涨幅≥</text>
						<text class="text-yellow text-bold u-p-4">{{zf}}%</text>
					</template>
					<template v-else>
						<text>按涨幅排序</text>
					</template>
					<text>的商品有</text>
					<text class="text-yellow text-bold u-p-4">{{productlist.length}}</text>
					<text>个</text> 
				</template>
				
			</view> 
			<view class="tabs-w u-p-l-20 u-p-r-20" v-if="mode == '1'">
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
						color: '#d1dcea', 
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
							color: '#007aff', 
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
							<view class="u-flex u-flex-items-center u-p-l-20 text-white u-p-b-10" v-if="productlist.length > 10"  @click="allproductShow = true" > 
								<view class=" u-flex" style="position: relative;">
									<nut-icon name="sort" font-class-name="custom-icon" class-prefix="custom-icon" size="18" ></nut-icon>
									<up-badge type="warning"  :value="productlist.length" absolute :offset="[-8,-12]"></up-badge>
								</view>  
								<view class="u-font-16 u-m-l-8">展开</view>
							</view>
						</template>
					</up-tabs>
				</view>
				
				<view class="u-p-5 u-p-l-12 u-p-r-12 u-m-t-10" v-if="mode == '1'">
					<view class="bg-white u-radius-12 u-p-12">
						<view class="u-font-15 u-p-6 u-p-l-15 u-m-b-6  ">生意社价格行情</view>
						<view class="u-flex u-flex-items-center u-flex-between u-radius-10" style="overflow: hidden;">
							<view class="u-p-10   u-text-center u-flex-1 box-border"
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
											'text-base': item.value == 0, 
											'u-success-dark': item.value < 0
										}"
										>{{item.value}}%</view>
								</view>
							</view> 
						</view>
					</view>
				</view>
				<view class="loading-w u-flex u-flex-items-center u-flex-center" style="background-color: rgba(255,255,255,.5)" v-if="loading_product">
					 <nut-icon name="loading" size="20" custom-color="#007aff"></nut-icon>
				</view>
			</view>
			<view class="center-bottom u-m-t-10" >
				<view class="u-p-l-12 u-p-r-12 " > 
					<view class=" u-radius-12 u-p-10 u-p-l-15 uni-shadow-sm"	style="background: linear-gradient(to bottom, #cae4ff,#fff 45px);">
						<view class="u-flex u-flex-items-center u-flex-between">
							<view class="u-flex u-flex-items-start  u-p-l-10  u-p-b-10" >
								股票筛选
							</view>
							<view class="u-flex-column u-flex-items-end u-flex-1">
								<view class="u-flex u-flex-items-center  u-flex-1 u-m-b-10" style="flex: 0 0 40%">
									<view class="text-nowrap u-font-14 u-m-r-10 text-base">90天股价位置 ≤ </view>
									<view class="u-flex u-flex-items-center u-border u-p-4 u-radius-8 u-flex-1 bg-white u-info"
										style="width: 70px; flex: 0 0 70px; border-color: #c7e4ff!important" 
										@click="positionShow = true"
									>
										<view class="u-flex-1 u-font-13 u-text-center" :class="{'u-primary': terms_position}" >{{positionLabel || '请选择'}}</view>
										<!-- <up-icon name="list-dot" size="10" color="#aaa"></up-icon> -->
									</view>
								</view>
								<view class="u-flex u-flex-items-center  u-flex-1  " style="flex: 0 0 40%">
									<view class="text-nowrap u-font-14 u-m-r-10 text-base">PriceSeek评分 ≥ </view>
									<view class="u-flex u-flex-items-center u-border u-p-4 u-radius-8 u-flex-1 bg-white u-info" 
										style="width: 70px; flex: 0 0 70px; border-color: #c7e4ff!important" 
										@click="scoreShow = true"
									>
										<view class="u-flex-1 u-font-13 u-text-center" :class="{'u-primary': terms_score}">{{terms_score?terms_score+' 分' : '请选择'}}</view>
										<!-- <up-icon name="list-dot" size="10" color="#aaa"></up-icon> -->
									</view>
								</view> 
							</view>
							<view class="u-m-l-30 u-m-r-20">
								<up-button type="primary" plain  shape="circle" 
									:customStyle="{borderColor: '#97caff', backgroundColor: '#fff', height: '30px',padding: '0 16px'}" @click="stockFilterBtn"
									>搜索</up-button> 
							</view>
						</view> 
					</view>
				</view>  
			</view>
			<view class="content-w u-p-l-12 u-p-r-12 u-m-t-15">
				<view class="content-header">
					<view class="u-flex u-flex-items-baseline bg-white u-p-14 u-p-l-30 u-m-t-10" style="border-radius: 15px 15px 0 0">
						<view class="u-font-16">生产商</view>
						<view class="u-font-13 u-m-l-20 u-info">基本面评析</view>
					</view>
					<!-- <view class="tab-list-cnt box-border  " style=" border-radius: 12px 12px 0 0;" v-if="mode == '1'">
						<view class="tab-list " >
							<view class="tab-item active u-flex u-flex-items-center u-flex-start u-p-l-32" >
								<view class="u-flex u-flex-items-baseline ">
									<view class="u-font-16">生产商</view>
									<view class="u-font-13 u-m-l-20 u-info">基本面评析</view>
								</view>
								
							</view>
							<view class="tab-item " >  
							</view>
							<view :style="{'transform': `translateX(0)`}" class="tab-selected">
								<view class="left"></view>
								<view class="right"></view>
							</view> 
						</view>  
					</view>  -->
				</view>
				<view class="content-main box-border u-flex u-flex-items-start bg-white " 
					style=" border-top: 1rpx solid #d0d4d6;"
					:style="{'border-radius':'0  0 15px 15px'}"
					>  
					<view class="loading-w u-flex u-flex-items-start u-flex-center u-p-t-80" style="background-color: rgba(255,255,255,.5)" v-if="loading_product || loading_stock">
						 <nut-icon name="loading" size="20" custom-color="#007aff"></nut-icon>
					</view>
					<view class="main-left">
						<view class="cpy-list" v-if="cpylist.length > 0">
							<view 
								class="cpy-item u-p-10 u-p-t-15 u-p-b-15"
								v-for="item in cpylist"
								:key="item.cid || item.stockcode"
								:class="{
									active: (item.cid || item.stockcode) == cpyValue
								}"
								@click="cpyEvent(item)"	
							>
								<view class="u-font-14 name">{{item.stock}}</view>
								<view class="no u-info u-font-12">{{item.stockcode}}</view>
							</view>
						</view>
					</view>
					<view class="main-right">
						<view v-if="cpylist.length == 0">
							<view class="u-p-20">
								<u-empty
									mode="data"
									:icon="empty"
									text="当前筛选条件下无生产商"
								>
								</u-empty> 
								<view class="u-flex u-flex-center u-p-20"><view class="u-font-13 u-warning" @click="resetSearchEvent">重置条件</view></view>
								
							</view>
						</view>
						<view class="u-p-15 main-base-info"  v-if="cpyActive">
							<view class="u-flex u-flex-items-start u-flex-between u-m-b-10">
								<view class="u-font-30 text-nowrap u-p-l-10 u-m-r-10">
									<view class="">{{cpyActive.stock}}</view>
									<view class="u-primary">{{cpyActive.stockcode}}</view> 
								</view>
								<view class="u-p-t-6"> 
									<view class=" u-flex-column u-flex-items-end u-m-l-20">
										<view class="u-flex u-flex-items-start u-m-b-5 u-font-13"> 
											<view class="text-base text-nowrap">营收占比</view>
											<view class="u-primary u-m-l-10"> 
											{{cpyActive.portion ? cpyActive.portion : '--'}}</view>
										</view>
										<view class="u-flex u-flex-items-center u-font-13"> 
											<view class="text-base text-nowrap">产能</view>
											<view class="u-primary u-m-l-10">{{cpyActive.capacity? cpyActive.capacity + cpyActive.unit : '--'}}</view>
										</view>
									</view>   
								</view>
								
							</view>
							<view class="u-flex u-flex-items-center u-flex-between u-primary-light-bg u-p-8 u-p-l-20 u-p-r-20 u-radius-8" @click="handleChangeShow4(true)">
								<view class="u-flex u-flex-items-center">
									<view class="u-font-14 text-base ">PriceSeek评分</view>
									<up-icon name="arrow-right" size="14" color="#ccc" ></up-icon>
								</view>
								<view class="u-flex">
									<nut-tag type="primary" plain round><view class="u-p-l-10 u-p-r-10">{{cpyDataGinfo.score}} 分</view></nut-tag> 
								</view>
							</view>
							
						</view>   
						<view class="main-data u-m-b-14" style="width: 100%;">
							<ProductECharts
								:chartData="productEChartsBaseData" 
							></ProductECharts>
						</view>
						<view class="u-radius-8 u-m-4" style="background: linear-gradient(to bottom, #f6fcff, #fff, #f6fcff);"  v-if="cpyActive">
							<view class="main-data" style="width: 100%;">
								<StockECharts
									:chartData="cpyKData" 
									:show="cpyActive? true: false"
								></StockECharts>
							</view> 
							<view class="u-p-10 u-flex u-flex-wrap u-flex-items-start">
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">最新股价</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{cpyDataSinfo.price}}</view>
								</view>
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">90天位置</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{position_status}}</view>
								</view>
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">最小值</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{cpyDataSinfo.ninety_day_min}}</view>
								</view>
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">最大值</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{cpyDataSinfo.ninety_day_max}}</view>
								</view>
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">中位值</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{cpyDataSinfo.ninety_day_zw}}</view>
								</view>
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">平均值</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{cpyDataSinfo.ninety_day_avg}}</view>
								</view>
								<view class="u-flex u-flex-items-center u-flex-between u-p-10 box-border" style="flex: 0 0 50%">
									<view class="text-base u-font-13">PriceSeek评分</view>
									<view class="u-font-14 u-radius-8 u-primary-light-bg u-p-4 u-p-l-15 u-p-r-15 u-primary">{{cpyDataGinfo.score}}</view>
								</view>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view> 
	<!-- <PriceSeekInfoPopup
		:show="priceSeekInfoShow"
		:ginfo="cpyDataGinfo"
		title="PriceSeek评析"   
		:onUpdateShow="handleChangeShow4"
	></PriceSeekInfoPopup> -->
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
	<!-- <TabBar
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
					<view class="u-primary-bg u-radius-12 u-p-10 u-p-l-15 text-white"	>
						<view class="u-flex u-flex-items-center u-flex-between">
							<view class="u-flex u-flex-items-start  u-p-l-20 u-primary-light u-p-b-10" style="font-style:italic;">
								股票筛选
							</view>
							<view class="u-flex-column u-flex-items-end u-flex-1">
								<view class="u-flex u-flex-items-center  u-flex-1 u-m-b-10" style="flex: 0 0 40%">
									<view class="text-nowrap text-white u-font-14 u-m-r-10">90天股价位置 ≤ </view>
									<view class="u-flex u-flex-items-center u-border u-p-4 u-radius-8 u-flex-1 bg-white u-info"
										style="width: 60px; flex: 0 0 60px; border-color: #fff!important" 
										@click="positionShow = true"
									>
										<view class="u-flex-1 u-font-13 u-text-center" :class="{'u-primary': terms_position}" >{{positionLabel || '请选择'}}</view>
									</view>
								</view>
								<view class="u-flex u-flex-items-center  u-flex-1  " style="flex: 0 0 40%">
									<view class="text-nowrap text-white u-font-14 u-m-r-10">PriceSeek评分 ≥ </view>
									<view class="u-flex u-flex-items-center u-border u-p-4 u-radius-8 u-flex-1 bg-white u-info" 
										style="width: 60px; flex: 0 0 60px; border-color: #fff!important" 
										@click="scoreShow = true"
									>
										<view class="u-flex-1 u-font-13 u-text-center" :class="{'u-primary': terms_score}">{{terms_score?terms_score+' 分' : '请选择'}}</view>
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
	</TabBar> -->
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
	const {themeColor, analysisModeList, empty} = toRefs(base)
	const top = ref(true)
	// const gptHotFilterShow = ref(false) 
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#007aff'
	})
	const loading_product = ref(false)
	const loading_stock = ref(false)
	const allproductShow = ref(false)
	const priceSeekInfoShow = ref(false)
	const mode = ref('1')
	const zf = ref('')
	const timestamp = ref(new Date().getTime())
	
	const sdate = ref('')
	const edate = ref('')
	const is_choice = ref('1')
	const is_hot = ref('')
	const category = ref('')
	const ppid = ref('')
	
	const tabValue = ref('')
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
	const productEChartsBaseData = ref({})
	const cpyKData = ref({})
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
	const cpyIndex = computed(() => cpylist.value.findIndex(ele => ((ele.cid || ele.stockcode) == cpyValue.value)));
	const cpylist = ref([]) 
	const cpyActive = computed(() => {
		if(cpyIndex.value != -1) {
			// console.log(cpylist.value)
			return cpylist.value[cpyIndex.value]
		} 
		return false
	});
	const cpyData = ref({})
	const cpyDataStock = computed(() => cpyData.value.stock || [])
	const cpyDataGinfo = computed(() => cpyData.value.Ginfo || {})
	const cpyDataSinfo = computed(() => cpyData.value.Sinfo || {})
	
	
	const terms_position = ref('')
	const positionLabel = computed(() => positionList.value.filter(ele => ele.value == terms_position.value )[0]?.name)
	const positionList = ref([
		{
			name: '低位',
			value: '1',
		},
		{
			name: '中低位',
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
	 
	
	const terms_score = ref('') 
	const scoreList = ref([
		{
			name: '1分',
			value: 1,
		}, 
		{
			name: '1.5分',
			value: 1.5,
		}, 
		{
			name: '2分',
			value: 2,
		}, 
		{
			name: '2.5分',
			value: 2.5,
		}, 
		{
			name: '3分',
			value: 3,
		}, 
		{
			name: '3.5分',
			value: 3.5,
		}, 
		{
			name: '4分',
			value: 4,
		},  
	])
	const scoreShow = ref(false)
	onLoad(async (options) => {
		if(options.hasOwnProperty('m')) {
			mode.value = options.m || '1'
		}
		if(options.hasOwnProperty('zf')) {
			zf.value = options.zf  
		} 
		if(mode.value == '1') {
			if(options.hasOwnProperty('by')) {
				tabValue.value = options.by  
			}
		}
		if(mode.value == '2') {
			if(options.hasOwnProperty('pp')) {
				ppid.value = options.pp 
				is_choice.value = '2'
			} else is_choice.value = '1'
			if(options.hasOwnProperty('sd')) {
				sdate.value = options.sd  
			}
			if(options.hasOwnProperty('ed')) {
				edate.value = options.ed  
			}
			if(options.hasOwnProperty('cg')) {
				category.value = options.cg  
			}
			if(options.hasOwnProperty('h')) {
				is_hot.value = options.h  
			}
		}
		
		// await initData() 
	})
	watch(
		() => [tabValue.value, zf.value, sdate.value],
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
	function handleChangeShow4(data) {
		priceSeekInfoShow.value = data
	}
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
		if(mode.value == '1') {
			await getHotData() 
		}
		else if(mode.value == '2') {
			await getSeasonData() 
			await getStockData({isSetData: true, isDetail: false}) 
		} 
		await getStockData({isSetData: true, isDetail: true})
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
	async function getSeasonData() {
		if(loading_product.value) return;
		loading_product.value = true
		try{
			const res = await $api.gpt_analysis({
				zf: zf.value, 
				sdate: sdate.value, 
				edate: edate.value,
				is_choice: is_choice.value,
				is_hot: is_hot.value,
				category: category.value,
				ppid: ppid.value
			})
			if(res.code == 1) {
				if(ppid.value) {
					productlist.value = [{
						ppid: ppid.value,
						name: res.list.res.pname
					}]
					productValue.value = ppid.value
				}
				else {
					productlist.value = res.list.res.plist
					productValue.value = productlist.value[0].ppid
				}
				
				// console.log(res.list.res)
				// cpylist.value = productlist.value[productIndex.value].stock
				// cpyValue.value = cpylist.value[0].cid
			}
		} catch(e) {
			
		}
		loading_product.value = false
		
	}
	 
	 
	async function getStockData({isSetData=false, isDetail=false}) {
		if(loading_stock.value) return;
		loading_stock.value = true
		let params = {
			ppid: productActive.value.ppid,
		}
		if(isDetail) { 
			params = {
				...params,
				code: cpyActive.value?.stockcode,
			}
		} else {
			params = {
				...params,
				terms_score: terms_score.value,
				terms_position: terms_position.value
			}
		}
		try{
			const res = await $api.gpt_analysis_detail({params: {
				...params
			}})
			if(res.code == 1) {
				cpyData.value = res.list.res
				if(isSetData) {
					cpylist.value = res.list.res.stock || []
				}
				 
				productEChartsBaseData.value = res.list.res.charts_ave
				if(res.list.res.charts_k.code) {
					cpyKData.value = res.list.res.charts_k
				}
				
				
				if(!cpyValue.value) cpyValue.value = cpylist.value[0].cid || ''
				// productlist.value = res.list.res.list
				// productValue.value = productlist.value[0].ppid
			}
		} catch(e) {
			
		}
		loading_stock.value = false
		
	}
	async function resetSearchEvent() {
		cpylist.value = productlist.value[productIndex.value].stock || []
		cpyValue.value = cpylist.value[0]?.cid || ''
		init_p_s()
		await getStockData({isSetData: true, isDetail: true})  
	}
	function init_p_s() { 
		terms_position.value = ''
		terms_score.value = '' 
	}
	function resetEvent() {
		base.handleGoto({
			url: '/pages/analysis/analysis',
			params: {
				mode: mode.value
			},
			type: 'reLaunch'
		}) 
	}
	function tabsEvent (obj) {  
		if(obj.disabled) return
		tabValue.value = obj.value
		init_p_s()
	}
	async function productEvent (obj) {  
		if(obj.disabled) return
		productValue.value = obj.ppid 
		init_p_s()
		if(mode.value == '1') {
			cpylist.value = productlist.value[productIndex.value].stock
			cpyValue.value = cpylist.value[0].cid 
		}
		else if(mode.value == '2') {
			cpyValue.value = ''
			cpylist.value = []
			await getStockData({isSetData: true, isDetail: false}) 
		}
		await getStockData({isSetData: true, isDetail: true})  
	}
	async function cpyEvent (obj) {  
		if(obj.disabled) return
		let stockcode = obj.stockcode
		cpyValue.value = (obj.cid || stockcode) 
		await getStockData({isSetData: false, isDetail: true})  
		// if(stockcode) {
		// 	cpyValue.value = cpylist.value.filter(ele => ele.stockcode === stockcode)[0].cid
		// }
	}
	async function stockFilterBtn() {
		// console.log(1, productlist.value[productIndex.value].stock)
		cpyValue.value = ''
		cpylist.value = []
		// cpylist.value = productlist.value[productIndex.value].stock
		// cpyValue.value = ''
		await getStockData({isSetData: true, isDetail: false}) 
		// await getStockData({isSetData: true, isDetail: true})  
		// console.log(cpylist.value)
		if(cpylist.value[0]) {
			cpyValue.value =  cpylist.value[0]?.stockcode 
			cpyData.value.Sinfo = cpylist.value[0]?.Sinfo2
			cpyData.value = {
				...cpylist.value[0],
				Ginfo: {score: cpylist.value[0].score},
				Sinfo: cpylist.value[0]?.Sinfo2
			}
		}
		
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
		position: relative;
		background: linear-gradient(to bottom, #007aff 200px, #dcdfff 300px, #f8f8f8 );
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
			padding-bottom: 80px;
			flex: 0 0 80px;
			width: 80px; 
			border-right: 1rpx solid #d0d4d6;
			min-height: 50vh;
			.cpy-list {
				.cpy-item {
					&.active {
						background-color: #f8f8f8;
						.name {
							color: $u-primary;
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