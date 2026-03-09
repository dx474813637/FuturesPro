<template> 

	<view> 
		<NavBar :bgColor="bgColor"  title="我的订阅" :backBtn="false" :titleStyle="`color: ${themeColor}`" placeholder ></NavBar>
		<view class="header">
			<view class="u-p-10 ">
				<view class="box-user u-p-20 u-p-t-30 u-p-b-30 u-flex u-flex-items-start u-radius-15" @click="base.handleGoto('/pages/login/login')">
					<nut-avatar custom-color="#e0ecff" size="50" bg-color="#77bfff">
						<view class="u-flex u-flex-items-center u-flex-center" style="height: 50px;">
							<nut-icon name="my2" size="22"></nut-icon>
						</view>
					</nut-avatar>
					<view class="content u-m-l-20 u-flex-1">
						<view class="u-flex u-flex-items-center u-flex-between u-m-b-5">
							<view class="name">靓丽的小熊猫</view>
							<!-- <view class="u-info u-flex u-flex-items-center" @click="base.handleGoto('/pages/subscribe/index/index')">
								<view class="u-m-r-10">我的订阅</view>
								<nut-icon name="rect-right" size="12"></nut-icon>
							</view> -->
						</view>
						<view>
							<!-- <view class="u-info u-font-12">描述文字</view> -->
							<view class="u-flex u-flex-items-center tags-w">
								<view class="  u-flex ">
									<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
										<view class="u-flex u-flex-items-center">
											<nut-icon name="huiyuanvip" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
											<text >现货通</text>
										</view> 
									</nut-tag> 
								</view>
								<view class="u-m-l-10 u-flex">
									<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
										<view class="u-flex u-flex-items-center">
											<nut-icon name="huiyuanvip" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
											<text>期货通</text>
										</view> 
									</nut-tag>  
								</view>
								<view class="u-m-l-10 u-flex">
									<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
										<view class="u-flex u-flex-items-center">
											<nut-icon name="huiyuanvip" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
											<text>股票通</text>
										</view> 
									</nut-tag>   
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
	<!-- <view class="u-p-20"><u-button @click="user.logout">退出</u-button></view> -->
	<!-- #ifdef H5 -->
	<up-sticky >  
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<up-sticky offsetTop="98">  
	<!-- #endif -->
		<view class="tab-list-cnt box-border  " style=" border-radius: 20px 20px 0 0;">
			<view class="tab-list " >
				<view class="tab-item " 
					v-for="item in tabslist" 
					:key="item.value" 
					@click="tabsEvent(item)" 
					:class="{
						active: item.value == tabValue
					}"
				>
					{{item.name}}
				</view>
				<div :style="{'transform': `translateX(${tabIndex * 100}%)`}" class="tab-selected">
					<div class="left"></div>
					<div class="right"></div>
				</div> 
			</view>  
		</view> 
		
	<!-- #ifdef H5 -->
	</up-sticky>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	</up-sticky>
	<!-- #endif -->
	<view class="tabs-content u-p-20" v-if="tabValue == 'gp'">
		
		<view class="vip-card u-p-20 u-radius-10 u-m-b-12" @click="base.handleGoto('/pages/subscribe/center/center?tabValue=gp')">
			<view class="u-flex u-flex-items-center u-flex-between">
				<view class="u-flex u-flex-items-center">
					<view class="u-font-18" style="color: #29455f">订阅股票通</view>
					<view class="tags-w u-flex u-m-l-10">
						<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
							<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
								<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
							</view> 
						</nut-tag> 
					</view> 
				</view>
				<view class="u-flex u-flex-items-center">
					<view class="u-font-14 " style="color: #9f5200">去订阅</view>
					<view class="tags-w u-flex u-m-l-10">
						<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
					</view> 
				</view>
			</view>
			<view class="u-m-t-10">
				<view class=" u-warning u-p-12 u-radius-8 u-font-13" style="background-color: rgba(255,255,255,.8)">买卖周期股，就用生意社股票通!一年只需300元，获取N多投资机会! </view>
			</view>
		</view>
		<view class="vip-card u-p-20 u-radius-10 u-m-b-12" @click="base.handleGoto('/pages/order/order')">
			<view class="u-flex u-flex-items-center u-flex-between">
				<view class="u-flex u-flex-items-center">
					<view class="u-font-18" style="color: #29455f">股票通</view>
					<view class="tags-w u-flex u-m-l-10">
						<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
							<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
								<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
							</view> 
						</nut-tag> 
					</view> 
				</view>
				<view class="u-flex u-flex-items-center"> 
					<view class="u-font-14 " style="color: #9f5200">待支付 / 2028-03-07 到期</view>
					<view class="tags-w u-flex u-m-l-10">
						<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
					</view> 
				</view>
			</view> 
		</view>
		<view class="tabs-content-item u-p-20 u-p-b-40 u-radius-16">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="text-bold u-font-18 u-p-l-10" style="color: #1254B3;">选股方法</view>
			</view>
			<view class="" style="color: #67799f;">
				<view class="u-radius-10 u-warning-light-bg u-p-20 u-m-b-20" @click="base.handleGoto('/pages/subscribe/gpt/hot')">
					<view> 
						<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
							<view class="u-font-17  u-flex u-flex-items-center u-warning ">
								<nut-icon name="huore" font-class-name="custom-icon" class-prefix="custom-icon" ></nut-icon>
								<view class="u-m-l-10 text-black">热点选股</view>
							</view>
							<view>
								<view class="u-warning-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
									<up-icon name="search" color="#fff" ></up-icon>
									<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
								</view>
							</view>
						</view> 
						<view class="u-font-14">利用n天商品价格上涨幅度，筛选热点商品，从而选择合适的价值周期股投资机会。</view>
					</view>
				</view>
				<view class="u-radius-10 u-error-light-bg u-p-20" @click="base.handleGoto('/pages/subscribe/gpt/season')">
					<view> 
						<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
							<view class="u-font-17  u-flex u-flex-items-center u-error "> 
								<nut-icon name="tongji" font-class-name="custom-icon" class-prefix="custom-icon" size="20" ></nut-icon> 
								<view class="u-m-l-10 text-black">季报选股</view>
							</view>
							<view>
								<view class="u-error-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
									<up-icon name="search" color="#fff" ></up-icon>
									<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
								</view>
							</view>
						</view> 
						<view class="u-font-14">利用季报周期内商品价格上涨幅度，提前于季报与年报，发现价值周期股买入信号。</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="text-bold u-font-18" style="color: #1254B3;">核心原理</view>
			</view>
			<view class="" style="color: #67799f;">
				商品价格影响上市公司利润，且商品价格上涨时间 T+n(n=5/10/20/30天)领先于股票价格上涨时间，因此关注商品价格，提前发现股票买入机会。
			</view>
		</view>
		<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="text-bold u-font-18" style="color: #1254B3;">投资策略</view>
			</view>
			<view class="" style="color: #67799f;">
				<view>投资者利用"1个关键指标+2个辅助指标"规则进行选股投资，1个关键指标是指商品价格周期涨幅(如5/5，即5天涨幅超5%)，2个辅助指标是指股价90天内的5档位置与AI大模型财报评级。</view>
			</view>
		</view>
	</view>
	<!-- 期货内容 -->
	<view class="tabs-content u-p-20" v-else-if="tabValue == 'qh'">
		
		<view class="vip-card u-p-20 u-radius-10 u-m-b-12" @click="base.handleGoto('/pages/subscribe/center/center?tabValue=qh')">
			<view class="u-flex u-flex-items-center u-flex-between">
				<view class="u-flex u-flex-items-center">
					<view class="u-font-18" style="color: #29455f">订阅期货通</view>
					<view class="tags-w u-flex u-m-l-10">
						<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
							<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
								<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
							</view> 
						</nut-tag> 
					</view> 
				</view>
				<view class="u-flex u-flex-items-center">
					<view class="u-font-14 " style="color: #9f5200">去订阅</view>
					<view class="tags-w u-flex u-m-l-10">
						<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
					</view> 
				</view>
			</view>
			<view class="u-m-t-10">
				<view class=" u-warning u-p-12 u-radius-8 u-font-13" style="background-color: rgba(255,255,255,.8)">关注基差变化，把握投资机会！一年只需1999元，即可关注50+期货商品。</view>
			</view>
		</view>
		<view class="vip-card u-p-20 u-radius-10 u-m-b-12">
			<view class="u-flex u-flex-items-center u-flex-between" @click="base.handleGoto('/pages/order/order')">
				<view class="u-flex u-flex-items-center">
					<view class="u-font-18" style="color: #29455f">期货通</view>
					<view class="tags-w u-flex u-m-l-10">
						<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
							<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
								<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
							</view> 
						</nut-tag> 
					</view> 
				</view>
				<view class="u-flex u-flex-items-center"> 
					<view class="u-font-14 " style="color: #9f5200">待支付 / 2028-03-07 到期</view>
					<view class="tags-w u-flex u-m-l-10">
						<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
					</view> 
				</view>
			</view> 
			<view class="u-m-t-20">
				<view class=" u-warning-light-bg text-primary u-p-12 u-radius-18 u-font-16 u-text-center" @click="base.handleGoto('/pages/subscribe/qht/qht')">查 看</view>
			</view>
		</view>
		 
		<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="text-bold u-font-18" style="color: #1254B3;">核心原理</view>
			</view>
			<view class="" style="color: #67799f;">
				现货价格决定期货价格，期货价格影响现货价格；因此关注基差变化（基差=现货价格-期货价格），发现期货投资机会。
			</view>
		</view> 
		<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="text-bold u-font-18" style="color: #1254B3;">投资策略</view>
			</view>
			<view class="" style="color: #67799f;">
				利用1个关键指标+1个辅助指标，发现期货开仓方向。1个关键指标是指不同周期的基差5档位置，1个辅助指标是现货价格的30/60/90周期5档位置。
			</view>
		</view> 
	</view>
	<u-safe-bottom></u-safe-bottom>
	
	<MenusBar></MenusBar>
</template>


<script setup>   
import {userStore } from '@/stores/user.js'  
	const user = userStore() 
import {useCateStore, baseStore} from '@/stores/base.js'  
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const top = ref(true)
	const bgColor = computed(() => {
		// if(top.value) return '#BEDAFF'
		return '#BEDAFF'
	})
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue = ref('gp');
	
	const tabslist = ref([
		{
			name: '股票通',
			value: 'gp',
			disabled: false
		},
		{
			name: '期货通',
			value: 'qh', 
			disabled: false
		}, 
		// {
		// 	name: '敬请期待',
		// 	value: '', 
		// 	disabled: true
		// },
		// {
		// 	name: '现货通',
		// 	value: 'xh', 
		// 	disabled: true
		// },
	])
	onPageScroll((e) => { 
		handleScroll(e)
	})
	// 组件挂载时添加滚动事件监听
	onMounted(() => { 
	})
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
		background-color: #F5F6FA;  
		padding-bottom: 100px;
	}
</style>
<style lang="scss" scoped>
	$tab-height: 52px;
	$active-color: #ffffff;
	$default-color: #ede6f2;
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
					font-style: italic;
					font-weight: bold;
					font-size: 19px; 
				}
			}
			// .tab-icon {
			// 	width: 18px;
			// 	height: 18px;
			// 	margin-right: 8px;
			// 	margin-top: 1px;
			// }
		
			.tab-selected {
				position: absolute;
				width: 50%;
				height: $tab-height;
				background: #ffffff;
				border-radius: 12px 12px 0 0;
				box-shadow: 24px 40px 0 $active-color, -24px 40px 0 0 $active-color; // 重点
				opacity: 1;
				z-index: -1;
				transition: .3s ease-in-out;
		
				.left {
					@include tabSelected($default-color, -15deg);
					left: -18px;
					border-bottom-right-radius: 12px;
				}
		
				.right {
					@include tabSelected($default-color, 15deg);
					right: -18px;
					border-bottom-left-radius: 12px;
				}
			}
			.tab-selected::before {
				content: '';
				@include tabSelected($active-color, -15deg);
				left: -6px;
				border-top-left-radius: 12px;
			}
			.tab-selected::after {
				content: '';
				@include tabSelected($active-color, 15deg);
				right: -6px;
				border-top-right-radius: 12px;
			}
		} 
	}
	.vip-card {
		background: linear-gradient(to right, #D1ECFB, #DFE3FA, #FCE5EC, #FADBDB, #FDDFC9);
	}
	.tabs-content {
		background: linear-gradient(to bottom, #fff, transparent 50px); 
		.tabs-content-item {
			background: linear-gradient(to bottom, #EBF1FF, #fff 50px);  
			border: 1rpx solid #fff;
			margin-bottom: 12px;;
			&:first-of-type {
				background: #fff;  
				
			}
		}
	}
	.tags-w {
		::v-deep {
			--nut-tag-border-width: 0
		}
	}
	.header { 
		background: linear-gradient(to bottom, #BEDAFF, #e3e7fa , #F5F6FA );
	}
	.box-user {
		
	}
</style>
