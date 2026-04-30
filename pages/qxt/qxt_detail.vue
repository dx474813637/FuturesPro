<template>
	<view class="w">
		<view class="bg"></view>
		<NavBar :bgColor="bgColor" :title="title" :backBtn="false" customColor="#fff" :titleStyle="`color: #fff`"
			placeholder></NavBar>
		<view class="w-main">
			<view class="u-flex u-flex-between u-flex-items-center  u-m-b-20">
				<view class="u-flex-1"></view>
				<view class="u-flex-1 u-flex u-flex-center text-nowrap">
					<view class="text-white  " style="font-size: 26px;">{{mode_title}}</view>
				</view>
				<view class=" u-flex-1 u-flex u-flex-end">
					<view class="bg-white u-p-4 u-p-l-20 u-p-r-20 u-font-14 text-thin"
						style="border-radius: 10px 0 0 10px;" @click="resetEvent">重新筛选</view>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<up-sticky :bgColor="bgColor">
			<!-- #endif -->
				<!-- #ifndef H5 -->
				<up-sticky offsetTop="98">
				<!-- #endif -->
					<view>
						<view class="tabs-w u-p-l-20 u-p-r-20">
							<up-tabs :list="qxt_position_list" :current="tabIndex" lineColor="#fff" lineHeight="1"
								lineWidth="25" :activeStyle="{
							color: '#fff', 
							fontWeight: '800'
						}" :inactiveStyle="{
							color: '#d1dcea', 
						}" itemStyle=" height: 25px; padding: 5px 12px; " @click="tabsEvent"></up-tabs>
						</view>
						<!-- 筛选结果后的商品tabs -->
						<view class="product-tabs u-m-t-15 u-p-l-12 u-p-r-12 box-border">
							<up-tabs :list="productlist" :current="productIndex" lineColor="#fff" lineHeight="0"
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
						}" itemStyle=" height: auto; padding: 0px 3px 5px 3px ; " @click="productEvent">
								<template #right>
									<view class="u-flex u-flex-items-center u-p-l-20 text-white u-p-b-10"
										@click="allproductShow = true">
										<view class=" u-flex" style="position: relative;">
											<nut-icon name="sort" font-class-name="custom-icon"
												class-prefix="custom-icon" size="18"></nut-icon>
											<up-badge type="warning" :value="productlist.length" absolute
												:offset="[-8,-12]"></up-badge>
										</view>
										<view class="u-font-16 u-m-l-8">展开</view>
									</view>
								</template>
							</up-tabs>
						</view>
					</view>

				<!-- #ifdef H5 -->
				</up-sticky>
				<!-- #endif -->
			<!-- #ifndef H5 -->
			</up-sticky>
			<!-- #endif -->
			<view class="" style="position: relative;" v-if="mode == '1'">
				<view class="u-p-5 u-p-l-12 u-p-r-12 u-m-t-10">
					<view class="bg-white u-radius-12 u-p-12">
						<view class="u-flex u-flex-between u-flex-items-center u-m-b-6">
							<view class="u-font-15 u-p-6 u-p-l-15   ">{{name_tj}}内价格统计</view>
							<view class="u-flex u-flex-items-center u-p-r-20">
								<view class="u-font-14 u-m-r-8 text-base" @click="tongjiShow = !tongjiShow">展开</view>
								<view><up-switch size="15" activeColor="#ffaa00" v-model="tongjiShow"></up-switch>
								</view>
							</view>
						</view>
						<view class=" u-flex u-flex-wrap u-flex-items-start u-font-13" v-if="RinfoData.id"
							:class="{'tongjiShow': !tongjiShow}">
							<view class="more-btn   u-flex-items-end u-flex-center">
								<view class="u-flex u-flex-items-center u-flex-center u-p-b-10"
									@click="tongjiShow = true">
									<view class="u-m-r-20 text-base">更多数据</view>
									<up-icon name="arrow-down"></up-icon>
								</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">当日价格</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData.price}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">日涨跌幅</view>
								<view class="u-text-right u-flex-1 " :class="{
									'u-success': RinfoData.zdf.includes('-'),
									'u-error': !RinfoData.zdf.includes('-')
								}">{{RinfoData.zdf}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">{{name_tj}}位置</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_position`]}}
								</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">最小值</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_min`]}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">最大值</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_max`]}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">中位值</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_zw`]}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">顶位差</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_dw`]}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">底位差</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_xw`]}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">平均值</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_avg`]}}</view>
							</view>
							<view
								class="u-flex u-flex-items-center u-primary-light-bg u-radius-6 u-m-l-12 u-p-8 u-p-l-16 u-p-r-16 box-border u-m-b-12"
								style="flex: 0 0 48%; width: 48%;">
								<view class="text-base">标准差</view>
								<view class="u-text-right u-flex-1 u-primary">{{RinfoData[`${keys_front}_std`]}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="loading-w u-flex u-flex-items-center u-flex-center"
					style="background-color: rgba(255,255,255,.5)" v-if="loading_product">
					<nut-icon name="loading" size="20" custom-color="#007aff"></nut-icon>
				</view>
			</view>
			<!-- <view class="center-bottom u-m-t-10" >
				<view class="u-p-l-12 u-p-r-12 " > 
					<view class=" u-radius-12 u-p-20 uni-shadow-sm"	style="background: linear-gradient(to bottom, #cae4ff,#fff 45px);">
						<view class="u-flex u-flex-items-center u-flex-between">  
							<view class="u-flex u-flex-items-center  u-flex-1 " >
								<view class="text-nowrap u-font-14 u-m-r-20 text-base u-m-l-10">具体档位</view>
								<view class="u-flex u-flex-items-center u-border u-p-8 u-radius-8 u-flex-1 bg-white u-info"
									style="width: 40vw; flex: 0 0 40vw; border-color: #c7e4ff!important" 
									@click="positionShow = true"
								>
									<view class="u-flex-1 u-font-13 u-text-center" 
										:class="{'u-primary': terms_position}" 
									>{{positionLabel || '请选择'}}
									</view>
								</view>
							</view>  
							<view class="u-m-l-30 u-m-r-20">
								<up-button type="primary" plain  shape="circle" 
									:customStyle="{borderColor: '#97caff', backgroundColor: '#fff', height: '30px',padding: '0 16px'}" 
									@click="stockFilterBtn"
									>搜索</up-button> 
							</view>
						</view> 
					</view>
				</view>  
			</view> -->
			<view class="content-w u-p-l-12 u-p-r-12 u-m-t-15">
				<view class="content-header">
					<view class="u-flex u-flex-items-center u-flex-between bg-white u-p-14 u-p-l-30 u-m-t-10"
						style="border-radius: 15px 15px 0 0">
						<view class="u-flex u-flex-items-baseline u-flex-1">
							<!-- <view class="u-font-16 u-m-r-14">数据图表</view> -->
							<view style="width: 180x; flex: 0 0 180px" v-if="mode == '2'">
								<up-subsection :list="type_list" mode="button" :current="typeIndex"
									@change="changeECharts"></up-subsection>
							</view>
							<!-- <view class="u-font-13 u-m-l-20 u-info">基本面评析</view> -->
						</view>
						<view class="u-flex u-flex-items-center">
							<view class="u-font-14 u-m-r-8 text-base" @click="prodChart = !prodChart">显示图表</view>
							<view><up-switch size="15" activeColor="#ffaa00" v-model="prodChart"></up-switch></view>
						</view>
					</view>
				</view>
				<view class="content-main box-border u-flex u-flex-items-start bg-white "
					style=" border-top: 1rpx solid #d0d4d6;" :style="{'border-radius':'0  0 15px 15px'}">
					<view class="loading-w u-flex u-flex-items-start u-flex-center u-p-t-80"
						style="background-color: rgba(255,255,255,.5)" v-if="loading_product || loading_stock">
						<nut-icon name="loading" size="20" custom-color="#007aff"></nut-icon>
					</view>
					<view class="main-right">
						<view class="main-data u-m-b-14" style="width: 100%;" v-if="mode == '1'">
							<ProductPriceECharts :show="prodChart" :chartData="productEChartsBaseData">
							</ProductPriceECharts>
						</view>
						<view class="main-data u-m-b-14" style="width: 100%;" v-else-if="mode == '2'">
							<ProductBasisECharts :show="prodChart" :chartData="productEChartsBasisData" :type="type">
							</ProductBasisECharts>


						</view>
						<view
							class="u-text-center  u-primary-light-bg box-border u-m-l-10 u-m-r-10 u-radius-8 u-primary">
							<view class="u-flex u-flex-items-center u-flex-between">
								<view class="u-p-20  ">当前周期 {{name_tj}}</view>
								<view
									class="u-font-14 u-p-6 u-p-r-16 u-p-l-16 u-m-r-20 u-warning-light-bg u-warning u-flex u-flex-items-baseline u-radius-6"
									@click="base.handleGoto({
									url: '/pages/qxt/qxt_detail',
									params: {
										m: mode == '1' ? '2': '1', 
										position: tabValue,
										ppid: productValue
									},
									type: 'redirectTo'
								})">
									<view>{{mode == '1' ? '基差': '价格'}}查询</view>
									<view class="u-flex u-flex-items-center">
										<up-icon name="arrow-right" size="12" color="#ff9040"></up-icon>
									</view>
								</view>
							</view>
							<view class="u-p-10 u-info-light-bg">
								<view class="u-flex u-flex-items-center u-font-14 text-base" v-if="mode == '1'">
									<view class="u-flex-1 ">日期</view>
									<view class="u-flex-1 u-text-center">现价</view>
									<view class="u-flex-1 u-text-center">涨跌幅</view>
									<view class="u-flex-1 u-text-center">位置</view>
								</view>
								<view class="u-flex u-flex-items-center u-font-14 text-base" v-else-if="mode == '2'">
									<view class="u-flex-1 ">日期</view>
									<view class="u-flex-1 u-text-center">现价</view>
									<view class="u-flex-1 u-text-center">期价</view>
									<view class="u-flex-1 u-text-center">基差</view>
									<view class="u-flex-1 u-text-center">位置</view>
								</view>
							</view>
						</view>
						<view class="main-list u-p-10  " v-if="mode == '1'">

							<view class="u-flex u-flex-items-center u-text-center u-p-15 u-m-b-10 "
								v-for="item in dataList" :key="item.id" :class="{
									'u-success-light-bg': item.zdf.includes('-'),
									'u-error-light-bg': +item.zdf.slice(0, -1) > 0, 
								}">
								<view class="u-flex-1   u-font-14">{{item.cdate}}</view>
								<view class="u-flex-1 u-text-center" :class="{
									'u-success': item.zdf.includes('-'),
									'u-error': +item.zdf.slice(0, -1) > 0 
								}">{{item.price}}</view>
								<view class="u-flex-1 u-text-center" :class="{
									'u-success': item.zdf.includes('-'),
									'u-error': +item.zdf.slice(0, -1) > 0,
									'u-info': +item.zdf.slice(0, -1) == 0
								}">{{item.zdf}}</view>
								<view class="u-flex-1 u-text-center">{{item[`${keys_front}_position`]}}</view>
							</view>
							<template v-if="dataList.length == 0">
								<u-empty mode="data" :icon="empty">
								</u-empty>
							</template>
							<template v-else>
								<u-loadmore :status="loadstatus" />
							</template>

						</view>
						<view class="main-list u-p-10 u-font-14 " v-else-if="mode == '2'">

							<view
								class="u-flex u-flex-items-center u-text-center u-p-10 u-p-t-20 u-p-b-20 u-m-b-10 u-radius-8"
								style="background: linear-gradient(to top, #eaf4ff, #fff, #eaf4ff);"
								v-for="item in dataList" :key="item.id">
								<view class="u-flex-1 text-nowrap">{{item.pubDate}}</view>
								<view class="u-flex-1 u-text-center">{{item.price}}</view>
								<view class="u-flex-1 u-text-center">{{item.zl_price}}</view>
								<view class="u-flex-1 u-text-center">{{item.zl_xqc}}</view>
								<view class="u-flex-1 u-text-center u-flex u-flex-center">
									<up-popover text="text5" color="#fff" bgColor="#333" popupBgColor="#333"
										:forcePosition="{ bottom: '0'}" direction="bottom">
										<template #trigger>
											<view class="u-primary-bg  text-white u-p-2 u-p-l-10 u-p-r-10 u-radius-6  ">
												{{item.data_statist[`${keys_front}_basis_position`]}}
											</view>
										</template>
										<template #content>
											<view style="padding: 6px 10px;text-align: left;" >
												<div>基差最大值：{{item.basis_max}}</div>
												<div>基差最小值：{{item.basis_min}}</div>
											</view>
										</template>
									</up-popover>

								</view>
							</view>
							<template v-if="dataList.length == 0">
								<u-empty mode="data" :icon="empty">
								</u-empty>
							</template>
							<template v-else>
								<u-loadmore :status="loadstatus" />
							</template>

						</view>
						<!-- <view class="main-list u-p-14  " v-else-if="mode == '2'">
							
							<view
								class="u-p-15 u-m-b-12 u-font-14 u-radius-10" style="background: linear-gradient(to top, #eaf4ff, #fff, #eaf4ff);"
								v-for="item in dataList"
								:key="item.id" 
							>
								<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
									<view >{{item.pubDate}}</view>
									<view class="u-flex u-flex-items-center" >
										<text class="text-base u-m-r-10">基差{{name_tj}}位置</text>
										<view class="u-primary-bg  text-white u-p-2 u-p-l-20 u-p-r-20 u-radius-6  ">{{item.data_statist[`${keys_front}_basis_position`]}}</view>
									</view>
								</view> 
								<view class="u-flex u-flex-items-center u-flex-between">
									<view class=" " >
										<view class="text-base ">主力合约价格</view>
										<view>{{item.zl_price}}</view>
									</view>
									<view class="u-text-center" >
										<view class="text-base ">主力基差</view>
										<view>{{item.zl_xqc}}</view>
									</view>
									<view class="u-text-right">
										<view class="text-base ">现货价格</view>
										<view>{{item.price}}</view>
									</view>
								</view> 
							</view>
							<template v-if="dataList.length == 0">
								<u-empty
									mode="data"
									:icon="empty"
								>
								</u-empty>
							</template>
							<template v-else>
								<u-loadmore
									:status="loadstatus"
								/>
							</template>
							
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- <PriceSeekInfoPopup
		:show="priceSeekInfoShow"
		:ginfo="cpyDataGinfo"
		:title="`技术指标分析`"   
		:onUpdateShow="handleChangeShow4"
	></PriceSeekInfoPopup> -->
	<ProductLabelPopup :show="allproductShow" title="期货通列表" :list="productlist" :ppid="productValue"
		:onUpdateShow="handleChangeShow3" @submit="confirmProductLabel"></ProductLabelPopup>
	<!-- <up-action-sheet 
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
	</up-action-sheet> -->
	<up-action-sheet :show="positionShow" title="档位位置" safeAreaInsetBottom :actions="positionList" closeOnClickOverlay
		@close="positionShow = false" @select="(item) => { 
			terms_position = item.value
		}">
	</up-action-sheet>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar></MenusBar>
</template>

<script setup>
	import useDataList from '@/composition/useDataList.js'
	import useFilter from '@/composition/useFilter.js'
	const zt = computed(() => {
		return {
			position_status: cpyDataSinfo.value.ninety_day_position
		}
	})
	const {
		position_status
	} = useFilter(zt)
	import {
		timeFormat
	} from 'uview-plus';
	import {
		userStore
	} from '@/stores/user.js'
	import {
		useCateStore,
		baseStore
	} from '@/stores/base.js'
	const $api = inject('$api')
	const user = userStore()
	const cate = useCateStore()
	const base = baseStore()
	const {
		themeColor,
		analysisModeList,
		empty
	} = toRefs(base)
	const {
		qxt_position_list,
		qxt_one,
		qxt
	} = toRefs(cate)
	const top = ref(true)
	// const gptHotFilterShow = ref(false) 
	const bgColor = computed(() => {
		if (top.value) return 'transparent'
		return '#007aff'
	})
	const mode_title = computed(() => {
		if (mode.value == '1') return '价格指标分析'
		if (mode.value == '2') return '基差指标分析'
		return ''
	})
	const title_sub = computed(() => {
		if (mode.value == '1') return KinfoData.value.intro
		if (mode.value == '2') return '基差指标分析'
		return ''
	})
	const api_name = computed(() => {
		if (mode.value == '1') return 'dashboard'
		if (mode.value == '2') return 'dashboard_sf'
		return ''
	})
	const title = computed(() => {
		if (top.value) return ''
		return mode_title.value
	})
	const originalData = ref({})
	const FinfoData = computed(() => originalData.value.Finfo || {})
	const KinfoData = computed(() => originalData.value.Kinfo || {})
	const RinfoData = computed(() => originalData.value.Rinfo || {})
	const productEChartsBaseData = computed(() => originalData.value.charts_price || {})
	const productEChartsXqData = ref({})
	const productEChartsBasisData = computed(() => {
		if (type.value == '1') return productEChartsXqData.value
		return originalData.value.charts_jicha || {}
	})
	// const productEChartsBasisData = computed(() => originalData.value.charts_jicha || {})  
	const keys_front = computed(() => qxt_position_list.value.filter(ele => tabValue.value == ele.value)[0].keys_front)
	const name_tj = computed(() => qxt_position_list.value.filter(ele => tabValue.value == ele.value)[0].name_tj)
	const tongjiShow = ref(true)

	const options = computed(() => {
		return {
			params: {
				ppid: productValue.value,
				position_type: tabValue.value,
				position_value: terms_position.value
			},
			api: api_name.value,
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list.res.pw_rec_list]
					if (res.list.res.curr_page == 1) {
						originalData.value = res.list.res
					}
					if (dataList.value.length >= res.list.res.pw_page_total) {
						loadstatus.value = 'nomore'
					} else {
						loadstatus.value = 'loadmore'
					}
				}
			}
		}
	})
	const {
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList,
	} = useDataList(options)


	const prodChart = ref(true)
	const loading_type = ref(false)
	const loading_product = ref(false)
	const loading_stock = ref(false)
	const allproductShow = ref(false)
	// const priceSeekInfoShow = ref(false)
	const mode = ref('1')
	// const zf = ref('')
	// const timestamp = ref(new Date().getTime())

	// const sdate = ref('')
	// const edate = ref('')
	// const is_choice = ref('1')
	// const is_hot = ref('')
	// const category = ref('') 

	const tabValue = ref('sixty_day_position')
	const tabIndex = computed(() => qxt_position_list.value.findIndex(ele => ele.value == tabValue.value));


	const productValue = ref('')
	const productIndex = computed(() => productlist.value.findIndex(ele => ele.value == productValue.value));
	const productlist = ref([])
	// const productActive = computed(() => {
	// 	if(productIndex.value != -1) {   
	// 		return productlist.value[productIndex.value]
	// 	} 
	// 	return {}
	// });
	// const productEChartsBaseData = ref({})
	// const cpyKData = ref({})
	// const productZfByDay = computed(() => { 
	// 	if(productActive.value.pid) {
	// 		let keys = Object.keys(productActive.value).filter(ele => ele.includes('rate_'))  
	// 		return keys.map(ele => {
	// 			let num = ele.split('_')[1]
	// 			return {
	// 				value: productActive.value[ele],
	// 				index: num,
	// 				name: `${num}天涨`
	// 			}
	// 		})
	// 	}
	// 	return []
	// })

	// const cpyValue = ref('')
	// const cpyIndex = computed(() => cpylist.value.findIndex(ele => ((ele.cid || ele.stockcode) == cpyValue.value)));
	// const cpylist = ref([]) 
	// const cpyActive = computed(() => {
	// 	if(cpyIndex.value != -1) {
	// 		// console.log(cpylist.value)
	// 		return cpylist.value[cpyIndex.value]
	// 	} 
	// 	return false
	// });
	// const cpyData = ref({})
	// const cpyDataStock = computed(() => cpyData.value.stock || [])
	// const cpyDataGinfo = computed(() => cpyData.value.Ginfo || {})
	// const cpyDataSinfo = computed(() => cpyData.value.Sinfo || {})


	const terms_position = ref('')
	const positionLabel = computed(() => positionList.value.filter(ele => ele.value == terms_position.value)[0]?.name)
	const positionList = ref([{
			name: '低位',
			value: '低位',
		},
		{
			name: '中低位',
			value: '中低位',
		},
		{
			name: '中位',
			value: '中位',
		},
		{
			name: '中高位',
			value: '中高位',
		},
		{
			name: '高位',
			value: '高位',
		},
	])
	const positionShow = ref(false)

	const type = ref('2')
	const typeIndex = computed(() => type_list.value.findIndex(ele => ele.value == type.value));
	const type_list = ref([{
			name: '日基图',
			value: '2'
		},
		{
			name: '现期图',
			value: '1'
		}
	])
	// const terms_score = ref('')  
	// const scoreShow = ref(false)
	onLoad(async (options) => {
		if (options.hasOwnProperty('m')) {
			mode.value = options.m || '1'
		}
		if (options.hasOwnProperty('ppid')) {
			// ppid.value = options.ppid 
			productValue.value = options.ppid
		}
		if (options.hasOwnProperty('position')) {
			tabValue.value = options.position
		}
		if (qxt.value.length == 0) {
			cate.getQxtData()
		}

		// await initData() 
	})
	watch(
		() => [tabValue.value, productValue.value],
		async (n) => {
			await initData()
		}, {
			deep: true,
		}
	)
	watch(
		() => qxt_one.value,
		async (n) => {
			productlist.value = n
		}, {
			deep: true,
			immediate: true,
		}
	)
	onPageScroll((e) => {
		if (e.scrollTop <= 50) {
			top.value = true
		} else {
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
	// function handleChangeShow4(data) {
	// 	priceSeekInfoShow.value = data
	// }
	function handleChangeShow3(data) {
		allproductShow.value = data
	}
	async function changeECharts(data) {
		type.value = type_list.value[data].value;
		if (type.value == 2) {
			return
		}
		await getChartsData()
	}

	function confirmProductLabel(data) {
		allproductShow.value = false
		productEvent(data)
	}

	async function initData() {
		// cpyData.value = {}
		// cpyValue.value = ''
		// cpylist.value = []
		await getDashboardData()
		// if(mode.value == '1') {
		// 	await getDashboardData() 
		// }
		// else if(mode.value == '2') {
		// 	await getBasisDashboardData() 
		// 	// await getStockData({isSetData: true, isDetail: false}) 
		// } 
		// await getStockData({isSetData: true, isDetail: true})
	}
	async function getChartsData() {
		if (loading_type.value) return;
		loading_type.value = true
		try {
			const res = await $api.qxt_charts_xianqi({
				params: {
					ppid: productValue.value,
					source: type.value
				}
			})
			if (res.code == 1) {
				productEChartsXqData.value = res.list.res
			}
		} catch (e) {

		}
		loading_type.value = false
	}
	async function getDashboardData() {
		if (loading_product.value) return;
		loading_product.value = true
		try {
			await initDataList()
		} catch (e) {

		}
		loading_product.value = false

	}
	async function getBasisDashboardData() {
		if (loading_product.value) return;
		loading_product.value = true
		try {
			const res = await $api.dashboard_sf({
				params: {
					ppid: productValue.value,
					position_type: tabValue.value,
					position_value: terms_position.value,
				}
			})
			if (res.code == 1) {
				// productlist.value = res.list.res.list
				// productValue.value = productlist.value[0].ppid

				// cpylist.value = productlist.value[productIndex.value].stock
				// cpyValue.value = cpylist.value[0].cid
			}
		} catch (e) {

		}
		loading_product.value = false

	}
	// async function getSeasonData() {
	// 	if(loading_product.value) return;
	// 	loading_product.value = true
	// 	try{
	// 		const res = await $api.gpt_analysis({
	// 			zf: zf.value, 
	// 			sdate: sdate.value, 
	// 			edate: edate.value,
	// 			is_choice: is_choice.value,
	// 			is_hot: is_hot.value,
	// 			category: category.value,
	// 			ppid: ppid.value
	// 		})
	// 		if(res.code == 1) {
	// 			if(ppid.value) {
	// 				productlist.value = [{
	// 					ppid: ppid.value,
	// 					name: res.list.res.pname
	// 				}]
	// 				productValue.value = ppid.value
	// 			}
	// 			else {
	// 				productlist.value = res.list.res.plist
	// 				productValue.value = productlist.value[0].ppid
	// 			}

	// 			// console.log(res.list.res)
	// 			// cpylist.value = productlist.value[productIndex.value].stock
	// 			// cpyValue.value = cpylist.value[0].cid
	// 		}
	// 	} catch(e) {

	// 	}
	// 	loading_product.value = false

	// }


	// async function getStockData({isSetData=false, isDetail=false}) {
	// 	if(loading_stock.value) return;
	// 	loading_stock.value = true
	// 	let params = {
	// 		ppid: productActive.value.ppid,
	// 	}
	// 	if(isDetail) { 
	// 		params = {
	// 			...params,
	// 			code: cpyActive.value?.stockcode,
	// 		}
	// 	} else {
	// 		params = {
	// 			...params,
	// 			terms_score: terms_score.value,
	// 			terms_position: terms_position.value
	// 		}
	// 	}
	// 	try{
	// 		const res = await $api.gpt_analysis_detail({params: {
	// 			...params
	// 		}})
	// 		if(res.code == 1) {
	// 			cpyData.value = res.list.res
	// 			if(isSetData) {
	// 				cpylist.value = res.list.res.stock || []
	// 			}

	// 			productEChartsBaseData.value = res.list.res.charts_ave
	// 			if(res.list.res.charts_k.code) {
	// 				cpyKData.value = res.list.res.charts_k
	// 			}


	// 			if(!cpyValue.value) cpyValue.value = cpylist.value[0].cid || ''
	// 			// productlist.value = res.list.res.list
	// 			// productValue.value = productlist.value[0].ppid
	// 		}
	// 	} catch(e) {

	// 	}
	// 	loading_stock.value = false

	// }
	// async function resetSearchEvent() {
	// 	cpylist.value = productlist.value[productIndex.value].stock || []
	// 	cpyValue.value = cpylist.value[0]?.cid || ''
	// 	init_p_s()
	// 	await getStockData({isSetData: true, isDetail: true})  
	// }
	function init_p_s() {
		terms_position.value = ''
		// terms_score.value = '' 
	}

	function resetEvent() {
		base.handleGoto({
			url: '/pages/qxt/qxt',
			params: {
				mode: mode.value
			},
			type: 'reLaunch'
		})
	}

	function tabsEvent(obj) {
		if (obj.disabled) return
		tabValue.value = obj.value
		init_p_s()
	}
	async function productEvent(obj) {
		if (obj.disabled) return
		productValue.value = obj.value
		init_p_s()
		// if(mode.value == '1') {
		// 	cpylist.value = productlist.value[productIndex.value].stock
		// 	cpyValue.value = cpylist.value[0].cid 
		// }
		// else if(mode.value == '2') {
		// 	cpyValue.value = ''
		// 	cpylist.value = []
		// 	await getStockData({isSetData: true, isDetail: false}) 
		// }
		// await getStockData({isSetData: true, isDetail: true})  
	}
	// async function cpyEvent (obj) {  
	// 	if(obj.disabled) return
	// 	let stockcode = obj.stockcode
	// 	cpyValue.value = (obj.cid || stockcode) 
	// 	await getStockData({isSetData: false, isDetail: true})  
	// 	// if(stockcode) {
	// 	// 	cpyValue.value = cpylist.value.filter(ele => ele.stockcode === stockcode)[0].cid
	// 	// }
	// }
	async function stockFilterBtn() {
		await initData()
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
		padding-bottom: 60px;
	}
</style>
<style lang="scss" scoped>
	.more-btn {
		display: none !important;
	}

	.tongjiShow {
		height: 40px;
		overflow: hidden;
		position: relative;

		.more-btn {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 40px;
			display: flex !important;
			background: linear-gradient(to top, #fff, #fff, transparent);
		}
	}

	.w {
		position: relative;
		background: linear-gradient(to bottom, #007aff 200px, #dcdfff 300px, #f8f8f8);
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
		box-shadow: 0 5px 5px rgba(0, 0, 0, .1);

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