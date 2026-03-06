<template>
	<view class=" card-w u-radius-20 ">
		<view class="u-flex u-flex-items-start u-flex-between u-p-t-20 u-p-l-30 u-p-r-30 " @click.stop="cardClick">
			<view class=" ">
				<view class="u-flex u-flex-items-baseline ">
					<view class="u-font-36 u-m-r-10">螺纹钢</view>
					<!-- <up-icon name="arrow-right" size="16" color="#ccc" ></up-icon> -->
				</view> 
			</view>
			<view >
				<view class="u-flex u-flex-items-center u-radius-8 u-primary-light-bg" style="overflow: hidden;">   
					<view class="u-font-14 u-info   u-primary-bg u-p-4 u-p-l-12 u-p-r-12 text-white  ">合约代码</view>
					<view class="u-font-30 text-primary u-p-l-18 u-p-r-18">2605</view>
				</view>
			</view> 
		</view> 
		<view class="u-flex u-flex-items-center u-p-b-10  u-p-l-20 u-p-r-20"> 
			<view class="u-flex u-flex-items-center   u-radius-8   u-p-6 ">
				<view class="u-font-14 text-thin">品种:高线;牌号:HPB300;直径:Φ8</view> 
			</view>
		</view>
		 
		<view class="scs-row u-flex u-flex-items-start u-flex-wrap box-border" >
			 <view class="item u-flex u-flex-items-center u-flex-between">
				 <view class="u-info u-m-r-8 u-font-14">基准价</view>
				 <view class="text-black">120558.2</view>
			 </view>
			 <view class="item u-flex u-flex-items-center u-flex-between">
				 <view class="u-info u-m-r-8 u-font-14">期货收盘价</view>
				 <view class="text-black">120333</view>
			 </view>
			 <view class="item u-flex u-flex-items-center u-flex-between">
				 <view class="u-info u-m-r-8 u-font-14">基差</view>
				 <view class="text-black">-1663</view>
			 </view>
			 <view class="item u-flex u-flex-items-center u-flex-between">
				 <view class="u-info u-m-r-8 u-font-14">基差率</view>
				 <view class="text-black">-1.63%</view>
			 </view>
		</view>
	</view>
</template>

<script setup>
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const base = baseStore()
	const props = defineProps({
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		},
		customStyle: {
			type: Object,
			default: () => ({})
		},
		cardClickDefault: {
			type: Boolean,
			default: true
		}
	})
	const emits = defineEmits(['cardClick'])
	const showAll = ref(false)
	const showZf = ref(false) 
	function gotoDetail() {
		return
		base.handleGoto({
			url: '/pages/product/productDetail',
			params: {
				id: props.origin.id, 
			}
		})
	}
	function cardClick() {
		if(props.cardClickDefault) {
			gotoDetail()
			return
		}
		emits('cardClick', {data: props.origin})
	}
</script>

<style lang="scss" scoped>
	.card-w {
		// background: linear-gradient(to top, #fff, #ebf6ff);
		// box-shadow: 0 0 5px rgba(0,0,0,.1);
		border: 1rpx solid #f2f6f9;
	}
	.scs-row {
		width: 100%;
		min-height: 50px;
		background-color: #f5f9fd;
		border-radius: 0 0 10px 10px;
		.item {
			flex: 0 0 50%;
			width: 50%;
			box-sizing: border-box;
			padding: 5px 10px
		}
	}
</style>