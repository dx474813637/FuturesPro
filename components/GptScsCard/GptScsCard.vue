<template>
	<view class="u-p-20 card-w u-radius-12 bg-white">
		<view class=" " @click.stop="cardClick">
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-18">
				<view class="u-flex u-flex-items-baseline u-flex-between  ">
					<view class="u-font-32">中国稀土（000831）</view>
					<!-- <up-icon name="arrow-right" size="16" color="#ccc" ></up-icon> -->
				</view>
				<view>
					<view class="u-flex u-flex-items-end">
						<view class="u-font-14 u-info ">PriceSeek评分</view>
						<view class="u-font-19 text-error u-m-l-8">3.8分</view>
					</view>
				</view>
				
			</view>
			<view class="u-flex u-flex-items-center u-flex-between">
				<view class="u-flex u-flex-items-center">
					<view class="u-flex u-flex-items-center"> 
						<view class="text-base">产能</view>
						<view class="text-primary u-info-light-bg u-p-4 u-p-l-10 u-p-r-10 u-radius-4 u-m-l-10 u-font-14">21万吨</view>
					</view>
					<view class="u-flex u-flex-items-center u-m-l-20"> 
						<view class="text-base">营收占比</view>
						<view class="text-primary u-info-light-bg u-p-4 u-p-l-10 u-p-r-10 u-radius-4 u-m-l-10 u-font-14">100%</view>
					</view>
				</view> 
				<view class="u-flex u-flex-items-center u-error-light-bg u-radius-20 text-base u-p-6 u-p-l-20 u-p-r-10 u-m-l-10">
					<view class="u-font-14 text-error">K线对比</view>
					<view class="u-m-l-10 u-radius-20 u-p-6 " style="background-color: #fececc;" >
						<up-icon name="arrow-right" size="10" color="#fe346a" ></up-icon>
					</view>
				</view>
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
		.main {
			width: calc(100% - 50px);
			flex: 0 0 calc(100% - 50px);
			.list {
				height: 50px;
				width: 100%;
				&.all {
					width: 100%;
					flex-wrap: wrap;
					height: auto;
					padding-top: 12px!important;
					// padding-bottom: 5px;
					.list-item {
						margin-bottom: 5px;
						flex: 0 0 48%;
						width: 48%;
						// margin-left: 2%
						// margin-left: 3%;
						&:nth-of-type(2n+1) {
							margin-left: 0;
						}
					}
				}
				.list-item {
					white-space: nowrap;
					// background-color: #dae8ff;
					background-color: #ece0ff;
					margin-left: 5px;
					border-radius: 6px;
					padding: 4px 10px; 
					color: #544cc3;
					// color: #4c81c3;
					font-size: 14px; 
					box-sizing: border-box;
					text-align: center;
				}
			}
			
		}
		.main-right {
			flex: 0 0 50px;
			width: 50px;
		}
	}
</style>