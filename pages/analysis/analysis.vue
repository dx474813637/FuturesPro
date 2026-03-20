<template>
	<view class="w box-border" :class="{w1: mode == 1, w2: mode == 2}" :style="{backgroundColor: analysisConfig.themeColor }"> 
		<NavBar :bgColor="bgColor"  title="" :backBtn="false" customColor="#fff" :titleStyle="`color: #fff`" placeholder ></NavBar>
		<view class="w-main">
			<view class="u-flex u-flex-end u-p-t-10 ">
				<view class="">
					<view 
						class="bg-white u-p-4 u-p-l-20 u-p-r-20 u-font-14 text-thin" 
						style="border-radius: 10px 0 0 10px;"
						@click="changeMode"
					>
						{{mode == '1' ? '季报选股' : '热点选股'}}
					</view>
				</view>
			</view>
			<template v-if="mode == '1'">
				<view class="text-white u-text-center u-p-20 u-m-b-10" style="font-size: 26px;">热点选股</view>
				<view class="u-text-center text-white text-thin" >{{riqi}}</view>
				<!-- 热点选股搜索框 -->
				<view class="u-p-20">
					<view class="bg-white u-p-20 bg-white u-radius-15">
						<view class="u-text-center u-font-17">热点商品搜索</view>
						<view class="u-flex u-flex-items-center u-flex-center u-m-t-30 u-m-b-30">
							<view class="u-flex u-flex-items-center u-m-r-20 u-flex-1" style="flex: 0 0 40%">
								<view class="text-nowrap text-base">天数：</view>
								<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-8 u-flex-1" @click="byShow = true">
									<view class="u-flex-1 u-font-13 u-p-5" >{{byName}}</view>
									<up-icon name="arrow-down-fill" size="12" color="#999"></up-icon> 
								</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-1" style="flex: 0 0 40%">
								<view class="text-nowrap text-base">涨幅 ≥ </view>
								<view class="u-flex u-flex-items-center u-m-l-20 ">
									<view class="u-border u-p-12 u-radius-8">
										<up-input
											v-model="zf1"
											placeholder="涨幅" 
											border="none"
											clearable
										  ></up-input> 
									</view>
									  <view class="u-m-l-10">％</view>
								</view>
							</view>
						</view>
						<view class=""> 
							<up-button 
								type="primary" 
								shape="circle"  
								:customStyle="{width: '70vw', fontSize: '17px', background:`linear-gradient(to top, #1678FF, #54a7ff )`}"
								@click="gotoAnalysisDetail"
							>搜 索</up-button> 
						</view>
						<view class="u-flex u-flex-items-center u-flex-center u-p-t-20">
							<view class="u-flex u-flex-items-center" @click="gptHelpShow = true">
								<view class="u-flex u-warning">
									<nut-icon name="xuzhi" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
								</view>
								<view class="u-info u-font-14">选股策略指南</view> 
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-if="mode == '2'"> 
			
				<view class="text-white u-p-l-40 u-p-r-40 u-m-b-4 " style="font-size: 26px;">季报选股</view>
				<view class="text-white u-p-l-40 u-p-r-40 u-m-b-10 text-thin u-font-13" >买卖周期股，就用生意社股票通!</view>
				<view class="u-p-20" >
					<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
						<view class="tabs-w u-flex u-flex-items-center">
							<view 
								class="tabs-item u-m-l-20 u-m-r-20 u-font-16"
								v-for="item in tabslist"
								:key="item.value"
								:class="{
									active: item.value == tabValue
								}"
								@click="tabsEvent(item)"
							> 
								{{item.name}} 
							</view>
						</view>
						<view class="u-flex u-flex-items-center u-flex-center  u-p-r-10" @click="gptHelpShow = true" v-if="tabValue == '1'">
							<view class="u-flex u-warning-light">
								<nut-icon name="xuzhi" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
							</view>
							<view class="u-info u-font-14 text-white">选股策略指南</view>
						</view>
					</view>
					<view class="bg-white u-p-30 u-radius-15">
						<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-10 u-p-l-12 u-p-r-12 u-radius-4  ">
							<view class="u-m-r-20">日期</view>
							<view class="u-flex-1 u-flex u-flex-items-center ">
								<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4 u-flex-1" @click="sdateShow = true" >
									<up-icon name="calendar" size="18" color="#666"></up-icon> 
									<view class="u-flex-1 u-font-13 u-p-5 text-nowrap" >{{sdate}}</view>
								</view> 
								<view class="u-p-5 u-m-l-10 u-m-r-10">至</view>
								<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4 u-flex-1" @click="edateShow = true" >
									<up-icon name="calendar" size="18" color="#666"></up-icon> 
									<view class="u-flex-1 u-font-13 u-p-5 text-nowrap" >{{edateString}}</view>
								</view> 
							</view>
						</view>
						<view class="u-flex u-flex-items-center u-flex-1  u-p-10 u-p-l-12 u-p-r-12 u-radius-4  "
							v-if="tabValue == 1">
							<view class="u-m-r-20">涨幅 ≥ </view>
							<view class="u-flex u-flex-items-center u-flex-1"> 
								<view class="bg-white u-flex-1" >
									<up-input 
										v-model="zf2"
										inputAlign="right"
										:customStyle="{
											backgroundColor: '#fff', 
										}"
										></up-input>
								</view>
								<view class="u-m-l-10">%</view>
							</view>
						</view>
						<template v-if="tabValue == 2">
							<view class="u-flex u-flex-between u-flex-items-center u-flex-1  u-p-10 u-p-l-12 u-p-r-12 u-radius-4  "
								>
								<view class="u-m-r-20">商品</view>
								<view class="u-flex u-flex-items-center u-flex-1" @click="menusShow = true"> 
									<view class="bg-white u-flex-1" >
										<up-input 
											v-model="prod.name" 
											inputAlign="right"
											:customStyle="{
												backgroundColor: '#fff', 
											}"
											readonly 
											placeholder="点击选择商品"
											suffixIcon="arrow-down"
										></up-input>
									</view>  
								</view>
							</view>
						</template>
						
						<view class=" u-m-t-30"> 
							<up-button 
								type="primary" 
								shape="circle"  
								:customStyle="{width: '70vw', fontSize: '17px', background:`linear-gradient(to top, #1678FF, #54a7ff )`}"
								@click="gotoAnalysisDetail"
							>搜 索</up-button> 
						</view> 
					</view>

				</view>
			</template>
		</view>
		
	</view>
	<view class="content u-p-20" > 
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">核心原理</view> 
				    </template>
					<view>
						商品价格影响上市公司利润，且商品价格上涨时间 T+n(n=5/10/20/30天)领先于股票价格上涨时间，
						因此关注商品价格，提前发现股票买入机会。
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames2" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">选股方法</view> 
				    </template>
					<view>
						<view>1.热点选股：利用n天商品价格上涨幅度，筛选热点商品，从而选择合适的周期股投资机会。</view>
						<view>2.季报选股：利用季报周期内商品价格上涨幅度，提前于季报与年报，发现周期股买入信号。</view>
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames3" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">投资策略</view> 
				    </template>
					<view>
						投资者利用"1个关键指标+2个辅助指标"规则进行选股投资，1个关键指标是指商品价格周期涨幅(如5/5，即5天涨幅超5%)，2个辅助指标是指股价90天内的5档位置与AI大模型财报评级。
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-text-center">
			<view class="u-warning u-font-14">
				股票通仅提供商品价格数据，不构成投资建议! 
			</view>
			<view class="u-warning u-font-14">
				市场有风险，投资需谨慎！
			</view> 
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	
	<MenusBar></MenusBar>
	<up-action-sheet 
		:show="byShow"
	 	title="天数"
		safeAreaInsetBottom
	 	:actions="byList"
		closeOnClickOverlay
		@close="byShow = false"
		@select="(item) => { 
			by = item.value
		}"
	>
	</up-action-sheet>
	<up-action-sheet 
		:show="sdateShow"
	 	title="起始日期"
		safeAreaInsetBottom
	 	:actions="sdateList"
		closeOnClickOverlay
		@close="sdateShow = false"
		@select="(item) => { 
			sdate = item.value
		}"
	>
	</up-action-sheet>
	<up-datetime-picker  
		:show="edateShow" 
		v-model="edate" 
		mode="date"
		title="截止日期"
		:maxDate="Number(new Date()) - 60*60*24*1000"
		placeholder ="截止日期"
		closeOnClickOverlay
		:inputProps="{
			prefixIcon: 'calendar',
			inputAlign: 'center',
			customStyle: {
				backgroundColor: '#fff',
				borderColor: `#e6d9d9!important`,
			}
		}"
		@confirm="(item) => { 
			edate = item.value
			edateShow = false
		}" 
		@close="edateShow = false" 
		@cancel="edateShow = false" 
	></up-datetime-picker> 
	 
	 <!-- 商品分类popup -->
	 <MenusPopup
	 	:show="menusShow"
	 	title="商品分类"   
	 	:onUpdateShow="handleChangeShow2"
		@confirm="menusConfirm"
	 ></MenusPopup>
	<!-- 使用指南popup -->
	<GptHotHelpPopup
		:show="gptHelpShow"
		title="选股策略指南"   
		:onUpdateShow="handleChangeShow"
	></GptHotHelpPopup>
</template>

<script setup> 
	import { timeFormat } from 'uview-plus';
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const $api = inject('$api')  
	const user = userStore() 
	const base = baseStore() 
	const {themeColor, analysisModeList} = toRefs(base)
	const top = ref(true)
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return analysisConfig.value.themeColor
	})
	const prod = ref({})
	const menusShow = ref(false)
	const gptHelpShow = ref(false)
	const activeNames = ref([1]);
	const activeNames2 = ref([]);
	const activeNames3 = ref([]);
	const mode = ref('1')
	const riqi = ref('')
	const zf1 = ref('5')
	const byShow = ref(false)
	const by = ref('5')
	const byName = computed(() => byList.value.filter(ele => ele.value == by.value)[0].name)
	const byList = ref([
		{
			name: '5天',
			value: '5',
		}, 
		{
			name: '10天',
			value: '10',
		}, 
		{
			name: '20天',
			value: '20',
		}, 
		{
			name: '30天',
			value: '30',
		}, 
		{
			name: '60天',
			value: '60',
		}, 
		{
			name: '90天',
			value: '90',
		}, 
	])
	
	const zf2 = ref('20')
	const sdate = ref('2026-01-01')
	const sdateShow = ref(false)
	const sdateList = ref([
		{
			name: '2026-01-01',
			value: '2026-01-01',
		}, 
		{
			name: '2025-10-01',
			value: '2025-10-01',
		}, 
		{
			name: '2025-07-01',
			value: '2025-07-01',
		}, 
		{
			name: '2025-04-01',
			value: '2025-04-01',
		}, 
	])
	
	const edateShow = ref(false)
	const edate = ref(Number(new Date()) - 60*60*24*1000)
	const edateString = computed(() => timeFormat(edate.value, 'yyyy-mm-dd')) 
	const tabslist = ref([
		{
			name: '按涨幅',
			value: '1'
		},
		{
			name: '按商品',
			value: '2'
		}
	])
	const tabValue = ref('1')  
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const routeParams = computed(() => {
		if(mode.value == '1') {
			return {
				m: mode.value,
				by: by.value,
				zf: zf1.value,
			}
		} 
		let obj = {
			m: mode.value,   
			sd: sdate.value,
			ed: edateString.value,
		} 
		if(tabValue.value == '1') obj.zf = zf2.value
		else {
			obj.pp = prod.value.id
			obj.cg = prod.value.pid
		}
		return obj
	})  
	const analysisConfig = computed(() => analysisModeList.value.filter(ele => ele.value == mode.value)[0] )
	onLoad((options) => {
		if(options.hasOwnProperty('mode')) {
			mode.value = options.mode || '1'
		}
		// 初始化riqi值
		riqi.value = getYesterdayDate()
		// $api.category()
	})
	onPageScroll((e) => {
		// console.log(e)
		if(e.scrollTop <= 50) {
			top.value = true 
		}
		else {
			top.value = false
		}
		
	})
	// 计算前一天的日期，格式为YYYY-MM-DD
	function getYesterdayDate() {
		const date = new Date()
		date.setDate(date.getDate() - 1)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}
	
	function changeMode() {
		if(mode.value == '1') mode.value = '2'
		else mode.value = '1'
	}
	 
	function onChange(value , name , status ) {
	  // value：v-model 绑定值
	  // name：当前操作 collapse-item 的 name
	  // status：开启状态
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
	function handleChangeShow(data) {
		gptHelpShow.value = data
	}
	function handleChangeShow2(data) {
		menusShow.value = data
	}
	
	function gotoAnalysisDetail() {
		base.handleGoto({
			url: '/pages/analysis/analysis_detail',
			params: {
				...routeParams.value
			}
		})
	}
	function menusConfirm(data) {
		handleChangeShow2(false)
		prod.value = data
	}
</script>

<style lang="scss" >
	page {
		background-color: #f8f8f8;
		padding-bottom: 60px;
	}
</style>
<style lang="scss" scoped>
.w {  
	position: relative;
	z-index: 1;
	padding-bottom: 10px;
	margin-bottom: 12px;
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100%;
		border-bottom: 0; 
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
	&.w1::after {
		border-top: 10px solid #1678FF;
	}
	&.w2::after {
		border-top: 10px solid #1678FF;
	}
	.w-main {
		position: relative; 
		z-index: 10;
	}
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 70%;
		z-index: 1;
	}
	.bg-img { 
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%; 
		overflow: hidden;
	}
}

	.tabs-w {
		.tabs-item {
			background-color: rgba(255,255,255,.4);
			color: #fff;
			border-radius: 6px;
			padding: 3px 20px; 
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-bottom: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid #fff;
				display: none;
			}
			&.active {
				background-color: #fff;
				color: #1678FF;
				&::after {
					display: block;
				}
				
			}
		}
	}
</style>