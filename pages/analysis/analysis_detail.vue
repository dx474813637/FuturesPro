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
				<text class="text-yellow text-bold u-p-4">5</text>
				<text>天</text>
				<text>且涨幅≥</text>
				<text class="text-yellow text-bold u-p-4">5%</text>
				<text>的热点商品有</text>
				<text class="text-yellow text-bold u-p-4">47</text>
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
				></up-tabs>
			</view>
			
			<view class="u-p-5 u-p-l-12 u-p-r-12 u-m-b-12">
				<view class="bg-white u-radius-12 u-p-12">
					<view class="u-font-15 u-p-6 u-p-l-15 u-m-b-6 text-base">生意社价格行情</view>
					<view class="u-flex u-flex-items-center u-flex-between u-radius-10" style="overflow: hidden;">
						<view class="u-p-10 u-error-light-bg u-text-center u-flex-1 box-border">
							<view class="u-font-12  u-m-b-10 ">近5天</view>
							<view class="u-flex u-flex-items-center u-flex-center"> 
								<view class="u-font-20 text-error">3.86%</view>
							</view>
						</view>
						<view class="u-p-10 u-success-light-bg u-text-center u-flex-1 box-border">
							<view class="u-font-12  u-m-b-10 ">近10天</view>
							<view class="u-flex u-flex-items-center u-flex-center"> 
								<view class="u-font-20 u-success">103.86%</view>
							</view>
						</view>
						<view class="u-p-10 u-info-light-bg u-text-center u-flex-1 box-border">
							<view class="u-font-12  u-m-b-10 ">近20天</view>
							<view class="u-flex u-flex-items-center u-flex-center"> 
								<view class="u-font-20 text-info">0%</view>
							</view>
						</view>
						<view class="u-p-10 u-success-light-bg u-text-center u-flex-1 box-border">
							<view class="u-font-12  u-m-b-10 ">近30天</view>
							<view class="u-flex u-flex-items-center u-flex-center"> 
								<view class="u-font-20 u-success">103.86%</view>
							</view>
						</view>
						<view class="u-p-10 u-error-light-bg u-text-center u-flex-1 box-border">
							<view class="u-font-12  u-m-b-10 ">近60天</view>
							<view class="u-flex u-flex-items-center u-flex-center"> 
								<view class="u-font-20 text-error">103.86%</view>
							</view>
						</view>
						<view class="u-p-10 u-error-light-bg u-text-center u-flex-1 box-border">
							<view class="u-font-12  u-m-b-10 ">近90天</view>
							<view class="u-flex u-flex-items-center u-flex-center"> 
								<view class="u-font-20 text-error">103.86%</view>
							</view>
						</view>
					</view>
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
				<view class="content-main box-border u-flex u-flex-items-start bg-white " style="border-radius: 0 15px 15px 15px; border-top: 1rpx solid #f5f5f5;"> 
					<view class="main-left">
						<view class="cpy-list">
							<view 
								class="cpy-item u-p-10 u-p-t-15 u-p-b-15"
								v-for="item in cpylist"
								:key="item.value"
								:class="{
									active: item.value == cpyValue
								}"
								@click="cpyEvent(item)"	
							>
								<view class="u-font-14 name">{{item.name}}</view>
								<view class="no u-info u-font-12">600028</view>
							</view>
						</view>
					</view>
					<view class="main-right">2</view>
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
				<view class="bg-white u-radius-12 u-p-10 "	> 
					<view class="u-error-bg u-radius-8 u-p-10 text-white"	>
						<view class="u-flex u-flex-items-center u-flex-between">
							<view class="u-flex u-flex-items-start">
								<up-image height="25px" src="https://wx.rawmex.cn/Public/rdxg-bg/gpsx.png" mode="heightFix"></up-image>
							</view>
							<view>
								<view class="u-flex u-flex-items-center u-m-r-20 u-flex-1" style="flex: 0 0 40%">
									<view class="text-nowrap text-base">90天股价位置 ≤ </view>
									<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-8 u-flex-1" @click="positionShow = true">
										<view class="u-flex-1 u-font-13 u-p-5" >{{positionLabel}}</view>
										<up-icon name="arrow-down-fill" size="12" color="#999"></up-icon> 
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>  
		</view>
	</TabBar> 
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
	
	const productValue = ref('1')
	const productIndex = computed(() => {
		productlist.value.findIndex(ele => ele.value == productValue.value)
	});
	const productlist = ref([
		{
			name: '液化天然气',
			value: '1'
		},
		{
			name: '苯酚',
			value: '12'
		},
		{
			name: '甲醇',
			value: '13'
		},
		{
			name: '柴油',
			value: '14'
		}, 
		{
			name: '液化天然气',
			value: '15'
		},
		{
			name: '苯酚',
			value: '16'
		},
		{
			name: '甲醇',
			value: '17'
		},
		{
			name: '柴油',
			value: '18'
		}, 
	])
	
	
	const cpyValue = ref('1')
	const cpyIndex = computed(() => {
		cpylist.value.findIndex(ele => ele.value == cpyValue.value)
	});
	const cpylist = ref([
		{
			name: '中国石化',
			value: '1'
		},
		{
			name: '广汇能源',
			value: '12'
		},
		{
			name: '中国海油',
			value: '13'
		},
		{
			name: '海新能科',
			value: '14'
		}, 
		{
			name: '中国石油',
			value: '15'
		},
		{
			name: '洪通燃气',
			value: '16'
		},
		{
			name: '陕西黑猫',
			value: '17'
		}, 
	])
	
	
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
		if(obj.disabled) return
		tabValue.value = obj.value 
	}
	function productEvent (obj) {  
		if(obj.disabled) return
		productValue.value = obj.value 
	}
	function cpyEvent (obj) {  
		if(obj.disabled) return
		cpyValue.value = obj.value 
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
		background-repeat: no-repeat;
		background-size: 100% auto;
		background-position: 0 0;
	}
	.product-tabs {
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
		min-height: 50vh;
		.main-left {
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
			flex: 1;
			width: calc(100% - 80px); 
		}
	}
</style>