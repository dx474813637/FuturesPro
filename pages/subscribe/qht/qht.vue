<template>
	<view class="w u-flex-column box-border"> 
		<NavBar :bgColor="themeColor" title="期货通" titleStyle="color: #fff" customColor="#fff" placeholder ></NavBar>
		<view class="u-flex u-flex-between u-flex-items-center u-p-l-30 u-p-t-20 u-p-b-20 sub-w box-border">
			<view class="u-flex u-flex-items-center text-white ">
				<view class="u-m-r-12"> 
					<up-icon name="list-dot" color="#fff" size="18"></up-icon>
				</view>
				<view>生意社:3月3日商品现货与期货价格对比表</view>
			</view>
			<!-- <view @click="handleChangeShow3(true)" class="u-flex u-flex-items-center text-white u-p-8 u-p-l-20 u-p-r-20" style="background-color: rgba(0,0,0,.15); border-radius: 14px 0 0 14px;">
				<up-icon name="file-text" color="#f8f8f8"></up-icon>
				<view class="u-font-13 u-m-l-4 text-thin">使用指南</view>
			</view> -->
		</view>
		<view class="filter-box-w bg-white u-p-20 box-border u-flex u-flex-items-center u-p-l-40 u-p-r-40"> 
				<up-datetime-picker
					hasInput 
					:show="qhtFilterShow" 
					v-model="date" 
					mode="date"
					title="日期筛选"
					placeholder ="日期筛选"
					closeOnClickOverlay
					:inputProps="{
						prefixIcon: 'calendar',
						inputAlign: 'center', 
						customStyle: {
							backgroundColor: '#F4F8FC',
							border: `0!important`,
						}
					}"
					@close="qhtFilterShow = false" 
					@cancel="qhtFilterShow = false" 
				></up-datetime-picker> 
			<!-- <view class="tabs-w">
				<up-tabs 
					:list="tabslist" 
					:current="tabIndex" 
					lineWidth="0" 
					lineColor="#fff" 
					:activeStyle="{
						color: themeColor, 
						background: '#E7F1FD', 
						padding: '7px 15px',
						borderRadius: '4px'
					}" :inactiveStyle="{
						color: '#606060',
						background: '#F5F5F5',
						padding: '7px 15px',
						borderRadius: '4px',
						fontWeight: '400'
					}" itemStyle=" height: 40px; padding: 5px 8px; "
					@click="tabsEvent"	
				>
					<template #right>
						<view class="u-flex u-flex-items-center u-p-l-20"  @click="handleChangeShow2(true)" > 
							<view class="u-m-t-10" style="position: relative;">
								<nut-icon name="shaixuan-xianxing" font-class-name="custom-icon" class-prefix="custom-icon" size="18" ></nut-icon>
								<up-badge type="error" isDot absolute :offset="[-1,-2]"></up-badge>
							</view> 
							<view class="u-font-16 text-base u-m-l-10">筛选</view>
						</view>
					</template>
				</up-tabs>
			</view> -->
		</view>
		<view class="data-box-w u-flex-1">
			<scroll-view
				scroll-y
				class="box-border u-p-10"
				style="height: 100%"
			>
				<view class="item   u-p-10 " v-for="item in tableData" :key="item.id">
					<QhtCard
						:origin="item"
					></QhtCard>
				</view>
			</scroll-view>
			<!-- <u-table2
				:data="tableData" 
				height="calc(100vh - 174px)"
				:columns="columns"
			>
				<template #cell="scope">
					<view>{{scope.row.age}}</view>
				</template>
			</u-table2> -->
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
	<MenusBar></MenusBar>  
	<!-- 使用指南popup -->
	<!-- <GptHotHelpPopup
		:show="gptHotHelpShow"
		title="热点选股使用指南"   
		:onUpdateShow="handleChangeShow3"
	></GptHotHelpPopup> -->
</template>

<script setup> 
	import {useCateStore, baseStore} from '@/stores/base.js'  
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const gptCateShow = ref(false)
	const qhtFilterShow = ref(false) 
	const gptHotHelpShow = ref(false)
	const date = ref(new Date().getTime()-60*60*24*1000)
	const tabValue = ref('5')
	const tabIndex = computed(() => {
		tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabslist = ref([
		{
			name: '近5天',
			value: '5'
		}, 
		{
			name: '近10天',
			value: '10'
		}, 
		{
			name: '近20天',
			value: '20'
		}, 
		{
			name: '近30天',
			value: '30'
		}, 
		{
			name: '近60天',
			value: '60'
		}, 
		{
			name: '近90天',
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
				{ id: 7, name: '镨钕氧化物', data: '103.86%' },
				{ id: 8, name: '金属钕', data: '103.86%' },
				{ id: 9, name: '金属镨', data: '103.86%' },
				{ id: 10, name: '丁二烯', data: '103.86%' },
				{ id: 11, name: '锡', data: '103.86%' },
				{ id: 12, name: '溴素', data: '103.86%' },
				{ id: 13, name: '丁二烯', data: '103.86%' },
				{ id: 14, name: '镨钕氧化物', data: '103.86%' },
				{ id: 15, name: '丁二烯', data: '103.86%' },
				{ id: 16, name: '镨钕氧化物', data: '103.86%' },
				{ id: 17, name: '丁二烯', data: '103.86%' },
				{ id: 18, name: '镨钕氧化物', data: '103.86%' },
				{ id: 19, name: '丁二烯', data: '103.86%' },
				{ id: 20, name: '镨钕氧化物', data: '103.86%' },
				{ id: 21, name: '丁二烯', data: '103.86%' },
				{ id: 22, name: '镨钕氧化物', data: '103.86%' },
				{ id: 23, name: '丁二烯', data: '103.86%' },
				{ id: 24, name: '镨钕氧化物', data: '103.86%' },
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
		qhtFilterShow.value = data
	}
	function handleChangeShow3(data) {
		gptHotHelpShow.value = data
	}
	function submitFilterEvent(data) {
		console.log(data)
		handleChangeShow2(false)
	}
	function tabsEvent (obj) { 
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
.w {
	height: 100vh;
	background-color: $u-primary;
	padding-bottom: 60px;
	.sub-w {
		height: 50px;
	}
	.filter-box-w {
		border-radius: 10px 10px 0 0;
		height: 60px;
	}
	.data-box-w {
		background-color: #fff; 
		height: calc(100% - 157px - 0);
		height: calc(100% - 157px - constant(safe-area-inset-bottom));
		height: calc(100% - 157px - env(safe-area-inset-bottom));
		::v-deep {
			.u-table2 .u-table-header {
				background-color: #fff;
			}
		}
	}
}
</style>
