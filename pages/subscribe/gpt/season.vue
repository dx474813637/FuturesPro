<template>
	<view class="w u-flex-column box-border"> 
		<NavBar :bgColor="themeColor" title="季报选股" titleStyle="color: #fff" customColor="#fff" placeholder ></NavBar>
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-30 u-p-t-20 u-p-b-20 sub-w box-border">
			<view class="u-flex u-flex-items-center text-white " @click="handleChangeShow1(true)">
				<view>选股模式</view>
				<view class="u-m-l-6"> 
					<up-icon name="list-dot" color="#fff" size="18"></up-icon>
				</view>
			</view>
			<view @click="handleChangeShow3(true)" class="u-flex u-flex-items-center text-white u-p-8 u-p-l-20 u-p-r-20" style="background-color: rgba(0,0,0,.15); border-radius: 14px 0 0 14px;">
				<up-icon name="file-text" color="#f8f8f8"></up-icon>
				<view class="u-font-13 u-m-l-4 text-thin">使用指南</view>
			</view>
		</view>
		<view class="filter-box-w bg-white u-p-20 box-border u-flex u-flex-items-center" @click="handleChangeShow2(true)"> 
			<view class="u-flex-1">
				<text class="u-primary-light-bg text-base u-radius-6 u-p-2 u-p-l-20 u-p-r-20 u-m-r-10 text-primary">2026-01-01 至 2026-02-27</text>
				<text class="u-primary-light-bg text-base u-radius-6 u-p-2 u-p-l-20 u-p-r-20 text-primary">涨幅≥20%</text> 
			</view>
			<view class="u-flex u-flex-items-center u-p-l-20"  >
				<view class="u-m-t-10" style="position: relative;">
					<nut-icon name="shaixuan-xianxing" font-class-name="custom-icon" class-prefix="custom-icon" size="18" ></nut-icon>
					<up-badge type="error" isDot absolute :offset="[-1,-2]"></up-badge>
				</view> 
				<view class="u-font-16 text-base u-m-l-10">筛选</view>
			</view>
		</view>
		<view class="tabs-w bg-white box-border u-p-l-20 u-p-r-20" >  
			<template v-if="resultAllShow">
				<!-- <view class="tabs-mask" :class="{ active: resultAllShow }" @click="resultAllShow = false"></view> -->
				<view class="tabs-more-list box-border u-p-t-8"
					:class="{
						active: resultAllShow
					}"
				>
					<view class="u-p-10 u-p-l-20 u-info">
						在设定周期内符合 “涨幅≥10%” 的商品有
						<text class="u-error text-bold u-p-5 u-font-18" style="font-style: italic;">33</text>
						个
					</view>
					<view class="u-flex u-flex-wrap u-flex-items-start u-p-10">
						<view class="item-w u-flex u-flex-items-center u-flex-center box-border u-p-10"
							v-for="(item, index) in tabslist"
							:key="item.value"
							:class="{
								active: tabValue == item.value
							}"
							@click="tabsMoreListClick({index, value: item.value})"
							> 
							<view class="text-nowrap u-font-16 u-text-center u-radius-6 item-w-text box-border" >{{item.name}}</view>
						</view>
					</view>
					<view class="u-flex u-flex-center u-flex-items-center u-info u-font-28 u-p-16 u-border-top u-m-t-40" @click="resultAllShow=false">
						<text class="u-m-r-10 u-error">点击收起</text>
						<u-icon name="arrow-up" color="#999"></u-icon>
					</view>
				</view>
			</template> 
			<up-tabs
				:list="tabslist" 
				:current="tabIndex" 
				lineWidth="0" 
				lineColor="#fff" 
				:activeStyle="{
					color: themeColor, 
					background: '#E7F1FD', 
					padding: '7px 15px',
					borderRadius: '6px'
				}" :inactiveStyle="{
					color: '#606060',
					background: '#F5F5F5',
					padding: '7px 15px',
					borderRadius: '6px',
					fontWeight: '400'
				}" itemStyle=" height: 40px; padding: 5px 8px; "
				@click="tabsEvent"	
			> 
				<template #right>
					<view class="u-flex u-flex-items-center u-p-l-20" @click="resultAllShow = !resultAllShow"  >  
						<up-icon name="list" size="18"></up-icon> 
						<view class="u-font-16 text-base u-m-l-5 u-m-r-5">全部</view>
						<up-badge type="error" max="99" :value="19"></up-badge>
					</view>
				</template>
			</up-tabs> 
			
		</view>
		<view class="data-box-w u-flex-1">
			<scroll-view
				scroll-y
				class="box-border u-p-10"
				style="height: 100%"
			>
				<!-- 价格走势 -->
				<view class="  u-radius-16 u-m-l-20 u-m-r-20 box-border" style="background: linear-gradient(to bottom, #F3FBFE 60px, transparent, #F3FBFE);">
					<view class="u-p-20" style="color: #1E283F">价格走势</view>
					<view class="u-m-20 box-border u-radius-10" style=" height: 360px; overflow: hidden;">
						<up-image width="100%" mode="widthFix" src="http://dingxiang.netsun.testwebsite.cn/public/img/data-pic.png"></up-image>
					</view>
					<view class="u-p-20 box-border">
						<GptSearchCard></GptSearchCard>
					</view>
					
				</view>
				<!-- 生产商基本面评析 -->
				<view class="u-p-20">
					<view class="  box-border u-p-10 u-radius-16"  style="background: linear-gradient(to bottom, #F3FBFE 20px, transparent 100px, transparent , #F3FBFE );">
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view class="u-font-18" style="color:#333">生产商基本面评析</view>
							</nut-divider>
						</view>
						<view class="u-p-10">
							<view class="item   u-p-10 " v-for="item in tableData" :key="item.id">
								<GptScsCard
									:origin="item"
								></GptScsCard>
							</view> 
						</view>
					</view>
				</view>
				
			</scroll-view> 
		</view>
	</view>
	<!-- <u-safe-bottom></u-safe-bottom>
	<MenusBar></MenusBar> -->
	<!-- 选股模式popup -->
	<GptCatePopup
		:show="gptCateShow"
		title="选股模式"  
		mode="2"
		:onUpdateShow="handleChangeShow1"
	></GptCatePopup>
	<!-- 筛选popup -->
	<GptSeasonFilterPopup
		:show="gptSeasonFilterShow"
		title="季报选股筛选"   
		:onUpdateShow="handleChangeShow2"
		@submit="submitFilterEvent"
	></GptSeasonFilterPopup>
	<!-- 使用指南popup -->
	<GptHotHelpPopup
		:show="gptHotHelpShow"
		title="季报选股使用指南"   
		:onUpdateShow="handleChangeShow3"
	></GptHotHelpPopup>
</template>

<script setup> 
	import {useCateStore, baseStore} from '@/stores/base.js'  
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const gptCateShow = ref(false)
	const gptSeasonFilterShow = ref(false) 
	const gptHotHelpShow = ref(false)
	const resultAllShow = ref(false)
	
	const tabValue = ref('2')
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabslist = ref([
		{
			name: '氧化镨',
			value: '1'
		}, 
		{
			name: '氧化钕',
			value: '2'
		}, 
		{
			name: '金属镨',
			value: '3'
		}, 
		{
			name: '镨钕合金',
			value: '4'
		}, 
		{
			name: '氢氧化锂(工业级)',
			value: '5'
		}, 
		{
			name: '金属钕',
			value: '6'
		},  
		{
			name: '氧化镨',
			value: '7'
		}, 
		{
			name: '氧化钕',
			value: '8'
		}, 
		{
			name: '金属镨',
			value: '9'
		}, 
		{
			name: '镨钕合金',
			value: '10'
		}, 
		{
			name: '氢氧化锂(工业级)',
			value: '60'
		}, 
		{
			name: '金属钕',
			value: '90'
		},  
	])
	
	const tableData = ref([
				{ id: 1, name: '氢氧化锂(工业级)', data: '103.86%' },
				{ id: 2, name: '碳酸锂-电池级', data: '103.86%' },
				{ id: 3, name: '白银', data: '103.86%' },
				{ id: 4, name: '氧化镨', data: '103.86%' },
				{ id: 5, name: '氧化钕', data: '103.86%' },
				{ id: 6, name: '镨钕合金', data: '103.86%' }, 
			])
	const columns = ref([
		{ title: '商品名称', key: 'name', fixed: 'left' },
		{ title: '涨幅', key: 'age' }
	])
	
	onLoad(() => {  
	}) 
	
	function handleChangeShow1(data) {
		gptCateShow.value = data
	} 
	function handleChangeShow2(data) {
		gptSeasonFilterShow.value = data
	}
	function handleChangeShow3(data) {
		gptHotHelpShow.value = data
	}
	function submitFilterEvent(data) {
		console.log(data)
		handleChangeShow2(false)
	}
	function tabsMoreListClick(obj) {
		tabsEvent(obj)
		resultAllShow.value = false 
		// initFilterData()
		// initDataList()
	}
	function tabsEvent (obj) {
		console.log(obj)
		if(obj.disabled) {
			messageManager.showText('敬请期待'); 
			return
		}
		tabValue.value = obj.value
		// nextTick(() => {
		// 	swiperRef.value.to(obj.index)
		// })
	}
</script> 
<style lang="scss" scoped>
@keyframes listAnimation {
	from { opacity: 0; } 
	to { opacity: 1; } 
}
@keyframes listMaskAnimation {
	from { opacity: 0; } 
	to { opacity: 1; } 
}
.w {
	height: 100vh;
	background-color: $u-primary;
	.tabs-w { 
		height: 50px;
		width: 100vw;
		// background: linear-gradient(to bottom, #fae9e9, #fff);
		position: relative;
		// overflow: hidden;
		&.more-mode {
			overflow: visible
		}
		.tabs-more-list {
			position: absolute;
			background: linear-gradient(to bottom, #fff 50%, #eef4fe);
			left: 0;
			top: 0;
			width: 100%; 
			z-index: 50;
			overflow: hidden;
			border-radius: 0 0 20px 20px;
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
		.tabs-mask {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			z-index: 20;
			background-color: rgba(0,0,0,0.2);
			&.active {
				animation: listMaskAnimation .1s linear;
			}
		}
		.tabs-right {
			position: absolute;
			height: 90%;
			width: 45px;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			color: #333;
			z-index: 20;
			overflow: hidden;
			.tabs-right-text {
				height: 100%;
				width: 35px;
				box-shadow: -2px 0 10px rgba(0,0,0,.1);
				background: linear-gradient(to bottom, #fae9e9, #fff);
				
			}
		}
	}
	.sub-w {
		height: 50px;
	}
	.filter-box-w {
		border-radius: 10px 10px 0 0;
		height: 60px;
	}
	.data-box-w {
		background-color: #fff;
		height: calc(100vh - 215px - 0);
		height: calc(100vh - 215px - constant(safe-area-inset-bottom));
		height: calc(100vh - 215px - env(safe-area-inset-bottom));
		::v-deep {
			.u-table2 .u-table-header {
				background-color: #fff;
			}
		}
	}
}
</style>
