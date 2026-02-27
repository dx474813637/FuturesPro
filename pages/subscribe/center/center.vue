<template>
	<NavBar bgColor="#16182C" title="订阅中心" titleStyle="color: #fff" customColor="#fff" placeholder ></NavBar>
	<view class="u-p-10 "> 
		<view class="box-user u-p-20 u-p-t-30 u-p-b-30 u-flex u-flex-items-start u-radius-15">
			<nut-avatar custom-color="rgb(245, 106, 0)" size="50" bg-color="rgb(253, 227, 207)">
				<view class="u-flex u-flex-items-center u-flex-center" style="height: 50px;">
					<nut-icon name="my2" size="22"></nut-icon>
				</view>
			</nut-avatar>
			<view class="content u-m-l-20 u-flex-1">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-5">
					<view class="name vip-color">靓丽的小熊猫</view>
					<view class="u-info u-flex u-flex-items-center" @click="base.handleGoto('/pages/subscribe/index/index')">
						<view class="u-m-r-10">我的订阅</view>
						<nut-icon name="rect-right" size="12"></nut-icon>
					</view>
				</view>
				<view>
					<!-- <view class="u-info u-font-12">描述文字</view> -->
					<view class="u-flex u-flex-items-center">
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
	<view class="" style="background-image: linear-gradient(to bottom, #353755, #2A2A46); border-radius: 20px 20px 0 0;">
		<view class="tabs-w u-p-l-20" >
			<up-tabs 
				:scrollable="false"
				:list="tabslist" 
				:current="tabIndex" 
				lineWidth="0" 
				lineColor="#fff" 
				:activeStyle="{
					color: '#FDE5A9', 
					transform: 'scale(1.4)', 
				}" :inactiveStyle="{
					color: '#8088af',
					transform: 'scale(1.1)', 
				}" itemStyle=" height: 40px; padding: 5px 25px;font-weight: bold; font-style: italic;"
				@click="tabsEvent"	
			>
			</up-tabs>
		</view> 
		<view >
			<!-- 现货通 -->
			<view v-if="tabValue == 'xh'">
				<view class="swiper-item u-p-10 u-p-l-40 u-p-r-40 u-p-b-40">
					<view class="swiper-item-box u-radius-15 text-white u-p-b-40" style="background-color: #373A60;background-image: linear-gradient(to bottom, rgba(135, 102, 25, 0.4) , transparent 100px);">
						<view class="u-flex u-flex-items-center u-flex-center u-p-10 u-p-r-40 u-p-t-20 " style="color: #FFFDD1;">
							<nut-icon name="huangguan1" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon>
							<view class="u-m-l-10 text-bold u-font-18">现货通</view>
						</view>
						<view class="u-p-10 u-p-l-40 u-p-r-40 u-p-b-10" style="word-break: break-all; color: #D9CCAD;">
							是指客户通过订阅的方式查看生意社商品基准价，利用价格5档位置、价格均线关系以及基差5档位置，进行“买入时点”判断的分析方法，同时包括PriceSeek行情分析等服务！
						</view>
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view style="color:#9899BD">适用人群</view>
							</nut-divider>
						</view>
						<view class="u-p-10 u-flex u-flex-wrap u-flex-items-start  u-p-l-40 u-p-r-40">
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">生产商</view>
							</view>
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">经销商</view>
							</view>
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">终端用户</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 期货通 -->
			<view v-else-if="tabValue == 'qh'">
				<view class="swiper-item u-p-10 u-p-l-40 u-p-r-40 u-p-b-40">
					<view class="swiper-item-box u-radius-15 text-white u-p-b-40" style="background-color: #373A60;background-image: linear-gradient(to bottom, rgba(135, 102, 25, 0.4) , transparent 100px);">
						<view class="u-flex u-flex-items-center u-flex-center u-p-10 u-p-r-40 u-p-t-20 " style="color: #FFFDD1;">
							<nut-icon name="huangguan1" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon>
							<view class="u-m-l-10 text-bold u-font-18">期货通</view>
						</view>
						<view class="u-p-10 u-p-l-40 u-p-r-40 u-p-b-10" style="word-break: break-all; color: #D9CCAD;">
							是指客户通过订阅的方式查看生意社商品基准价与期货价格的价差（基差）表格，及对应50+期货商品的现货历史价格、每日最新价格、期现基差、行情动态和基差分析工具！
						</view>
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view style="color:#9899BD">适用人群</view>
							</nut-divider>
						</view>
						<view class="u-p-10 u-flex u-flex-wrap u-flex-items-start  u-p-l-40 u-p-r-40">
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">期货公司研究所</view>
							</view>
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">期货投资机构</view>
							</view>
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">个人期货投资者</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 股票通 -->
			<view v-else-if="tabValue == 'gp'">
				<view class="swiper-item u-p-10 u-p-l-40 u-p-r-40 u-p-b-40">
					<view class="swiper-item-box u-radius-15 text-white u-p-b-40" style="background-color: #373A60;background-image: linear-gradient(to bottom, rgba(135, 102, 25, 0.4) , transparent 100px);">
						<view class="u-flex u-flex-items-center u-flex-center u-p-10 u-p-r-40 u-p-t-20 " style="color: #FFFDD1;">
							<nut-icon name="huangguan1" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon>
							<view class="u-m-l-10 text-bold u-font-18">股票通</view>
						</view>
						<view class="u-p-10 u-p-l-40 u-p-r-40 u-p-b-10" style="word-break: break-all; color: #D9CCAD;">
							期股特指原材料生产商型的上市公司，公司利润高低由原材料价格波动决定。因此利用原材料价格的涨跌数据，提前于季报与年报，发现周期股买入信号，是投资周期股的有力方法。
						</view>
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view style="color:#9899BD">适用人群</view>
							</nut-divider>
						</view>
						<view class="u-p-10 u-flex u-flex-wrap u-flex-items-start  u-p-l-40 u-p-r-40">
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">股票投资机构</view>
							</view>
							<view class="item u-flex u-flex-items-center u-m-b-20" style="flex: 0 0 50%">
								<nut-avatar custom-color="#666170" size="25" bg-color="#F5F8D7">
									<view class="u-flex u-flex-items-center u-flex-center" style="height: 25px;">
										<nut-icon name="my2" size="14"></nut-icon> 
									</view>
								</nut-avatar>
								<view class="u-m-l-20  " style="color: #DACCB1">个人股票投资者</view>
							</view> 
						</view>
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view style="color:#9899BD">核心原理</view>
							</nut-divider>
							<view class="tag-style u-radius-6 u-p-10 u-p-l-20 u-p-r-20 u-m-b-20">
								商品价格影响上市公司利润，且商品价格上涨时间T+n(n=5/10/20/30天) 领先于股票价格上涨时间，因此关注商品价格，提前发现股票买入机会。
							</view> 
						</view>
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view style="color:#9899BD">选股方法</view>
							</nut-divider>
							<view class="tag-style u-radius-6 u-p-10 u-p-l-20 u-p-r-20 u-m-b-20">
								1，热点选股：利用n天商品价格上涨幅度，筛选热点商品，从而选择合适的价值周期股投资机会。 
							</view>
							<view class="tag-style u-radius-6 u-p-10 u-p-l-20 u-p-r-20">
								2，季报选股：利用季报周期内商品价格上涨幅度，提前于季报与年报，发现价值周期股买入信号。
							</view>
						</view>
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view style="color:#9899BD">投资策略</view>
							</nut-divider>
							<view class="tag-style u-radius-6 u-p-10 u-p-l-20 u-p-r-20 u-m-b-20">
								投资者利用"1个关键指标+2个辅助指标"规则进行选股投资， 
							</view>
							<view class="tag-style u-radius-6 u-p-10 u-p-l-20 u-p-r-20 u-m-b-20">
								1个关键指标是指商品价格周期涨幅(如5/5，即5天涨幅超5%),
							</view>
							<view class="tag-style u-radius-6 u-p-10 u-p-l-20 u-p-r-20">
								2个辅助指标是指股价90天内的5档位置与AI大模型财报评级。
							</view>
						</view>
					</view>
				</view>
			</view>
	 
		</view> 
		<view>
			
		</view>
	</view>
	<view v-if="tabValue == 'xh'" class="u-m-t-20 u-p-20 u-p-l-50 u-p-r-50" style="background: #2F2F4C;">
		<view class="u-flex u-flex-between u-flex-items-center u-info ">
			<view class="text-white">订阅分类</view>
			<view class="u-flex u-flex-items-center">
				<view>（ 9 / 200 ）</view>
				<nut-icon name="arrow-right"></nut-icon>
			</view>
		</view>
		<view class="u-p-t-20 u-flex u-flex-items-start u-flex-wrap">
			<view class="u-m-r-10 u-m-b-10">
				<nut-tag round custom-color="#fdf9c9" text-color="#8D4E0D" closeable close-icon-size="8">
					<text class="u-font-15">柴油</text>
				</nut-tag> 
			</view>
			<view class="u-m-r-10 u-m-b-10">
				<nut-tag round custom-color="#fdf9c9" text-color="#8D4E0D" closeable close-icon-size="8">
					<text class="u-font-15">白银</text>
				</nut-tag> 
			</view>
			<view class="u-m-r-10 u-m-b-10">
				<nut-tag round custom-color="#fdf9c9" text-color="#8D4E0D" closeable close-icon-size="8">
					<text class="u-font-15">玻璃</text>
				</nut-tag> 
			</view>
			<view class="u-m-r-10 u-m-b-10">
				<nut-tag round custom-color="#fdf9c9" text-color="#8D4E0D" closeable close-icon-size="8">
					<text class="u-font-15">白糖</text>
				</nut-tag> 
			</view>
			<view class="u-m-r-10 u-m-b-10">
				<nut-tag round custom-color="#fdf9c9" text-color="#8D4E0D" closeable close-icon-size="8">
					<text class="u-font-15">菜籽油</text>
				</nut-tag> 
			</view>
			<view class="u-m-r-10 u-m-b-10">
				<nut-tag round custom-color="#fdf9c9" text-color="#8D4E0D" closeable close-icon-size="8">
					<text class="u-font-15">二氯甲烷</text>
				</nut-tag> 
			</view>
		</view>
		<view class="u-flex u-flex-center u-flex-items-center u-info u-p-30 u-border u-radius-14 u-m-t-20 u-m-b-20" style="border-style: dashed; border-color: #9899BD!important;">
			<nut-icon name="uploader" size="20"></nut-icon>
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<!-- <MenusBar></MenusBar> -->
	<TabBar 
		:customStyle="{
			boxShadow: '0px -3px 10px rgba(0,0,0,0.1)',
			background: '#443E5E', 
			borderRadius: '20px 20px 0 0 ' 
		}"
		:mainStyle="{
			height: 'auto'
		}"
		>
		<view class="center-bottom">
			<view class="u-p-t-40 u-p-l-40 u-p-r-40 text-thin" style="color: #d4d0e7;" v-if="tabValue == 'gp'">
				买卖周期股，就用生意社股票通!一年只需300元，获取N多投资机会!
			</view>
			<view class="u-p-t-40 u-p-l-40 u-p-r-40  u-flex u-flex-items-center checkbox" style="color: #d4d0e7;" v-if="tabValue == 'xh'">
				<view class="text-white">订阅类型：</view>
				<nut-checkbox v-model="xhCheck" shape="button"><view >现货通（手机端 + 电脑端）</view></nut-checkbox>
			</view>
			<view class="u-p-30">
				<up-button 
					class="custom-style"  
					size="large"
					:customStyle="{borderRadius: '14px'}"
					color="linear-gradient(to right, #FFE19B, #FDEBBF, #FFD385)"
					:disabled="btnDisabled"
				>
					<view class="u-font-18" style="color: #312A2F;">
						{{btnText}}
					</view>
				</up-button>
			</view>
		</view>
	</TabBar> 
	
</template>

<script setup> 
	const $api = inject('$api') 
	import { baseStore } from '@/stores/base.js'
	const base = baseStore() 
	const tabIndex = computed(() => {
		tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue = ref('gp');
	const xhCheck = ref(false)
	const swiperRef = ref()
	const tabslist = ref([
		{
			name: '股票通',
			value: 'gp'
		},
		{
			name: '现货通',
			value: 'xh',
			disabled: true,
		},
		{
			name: '期货通',
			value: 'qh',
			disabled: true,
		}, 
	])
	const btnDisabled = computed(() => {
		if(tabValue.value == 'xh') {
			if(!xhCheck.value) return true
		}
		return false
	})
	const btnText = computed(() => {
		if(tabValue.value == 0) {
			if(!xhCheck.value) return '请先勾选上方订阅类型'
		}
		return '我要订阅'
	})
	
	onLoad((options) => {
		if(options.hasOwnProperty('tabValue')) {
			tabValue.value = options.tabValue || 'gp'
		}
	})
	
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

<style lang="scss">
	page {
		padding-bottom: 200px;
		box-sizing: border-box;
		min-height: 100vh;
		background: #ffffff;
		// background: linear-gradient(-45deg, #0B143C, #0B143C, #1A317C);
		background: #16182C;
		// background: linear-gradient(-10deg,rgba(255, 255, 255, 1) 0%, rgba(232, 250, 255, 1) 51%, rgba(199, 246, 255, 1) 80%, rgba(219, 225, 255, 1) 100%);
	}
</style>
<style lang="scss" scoped>
	.tabs-w {
		::v-deep {
			
			.u-tabs__wrapper__nav__item__text--disabled {
				color: #8088af!important
			}
		}
	}
	
	.checkbox {
		::v-deep {
			--nut-checkbox-label-color: #4f4f4f;
			--nut-checkbox-button-background: #a1a1bf;
			--nut-checkbox-button-border-color: #4f4f4f; 
			.nut-checkbox__button--active {
				border: 1px solid #FFD68C; 
				color: #FFD68C; 
				&::after {
					background-color: #FFD68C;
				}
			}
		}
	}
	.tag-style {
		background-color: #5f6289;
		color: #e5e3bc
	}
	.swiper-item-box {
		// box-shadow: 0 0 10px rgba(0,0,0,.4);
	}
	.box-user {
		// background: #30304B;
		.content {
			.name {}
		}
	}

	.page-title {
		font-family: '黑体';
		font-size: 24px;
		color: #000;
	}

	.header-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50vh;
		// background: linear-gradient(45deg, #fff, #000);
		opacity: 0.2;
	}

	.header-box {
		position: relative;
		z-index: 100;
	}
</style>