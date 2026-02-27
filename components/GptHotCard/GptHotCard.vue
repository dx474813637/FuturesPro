<template>
	<view class="u-p-t-14 card-w u-radius-20">
		<view class="u-flex u-flex-items-center u-flex-between u-p-r-20" @click.stop="cardClick">
			<view class=" ">
				<view class="u-flex u-flex-items-baseline u-m-b-14 u-p-l-20 ">
					<view class="u-font-32 u-m-r-10">氢氧化锂(工业级)</view>
					<!-- <up-icon name="arrow-right" size="16" color="#ccc" ></up-icon> -->
				</view>
				<view class="u-flex u-flex-items-start">
					<view class="u-flex u-flex-items-center  u-p-6 u-p-l-20 u-p-r-20 u-m-r-20 u-p-b-14" style="border-radius: 0px 10px 0 0; background-color: #f5f9fd;color: #21469F">
						<view class="u-font-14 text-thin">生产商</view>
						<!-- <view class="u-m-l-10 u-p-6" style="background-color: #e2e2e2;">
							<up-icon name="arrow-right" size="10" ></up-icon>
						</view> -->
					</view>
					<view class="u-flex u-flex-items-center u-info-light-bg u-radius-20 text-base u-p-6 u-p-l-20 u-p-r-10">
						<view class="u-font-14 text-thin">情报</view>
						<view class="u-m-l-10 u-radius-20 u-p-6" style="background-color: #e2e2e2;">
							<up-icon name="arrow-right" size="10" ></up-icon>
						</view>
					</view>
				</view>
				
			</view>
			<view class="u-text-right">
				<view class="u-flex u-flex-items-center">  
					<up-icon name="arrow-up-fill" size="14" color="#ec0000"></up-icon> 
					<view class="u-font-30 text-error u-m-l-8">103.86%</view>
				</view>
				<view class="u-font-12 u-info u-m-r-10">近5天</view>
			</view>
			
		</view>
		<view class="scs-row u-flex box-border">
			<scroll-view scroll-x class="main box-border" >
				<view class="list u-flex u-flex-items-center u-p-15 u-p-l-20 u-p-r-20" :class="{'all': showAll}">
					<view class="list-item tag">
						<view>赣锋锂业（002460）</view>
					</view> 
					<view class="list-item tag">
						<view>盛新锂能（002240）</view>
					</view> 
					<view class="list-item tag">
						<view>天齐锂业（002466）</view>
					</view> 
					<view class="list-item tag">
						<view>天华新能（300390）</view>
					</view>  
					<view class="list-item tag">
						<view>赣锋锂业（002460）</view>
					</view> 
					<view class="list-item tag">
						<view>盛新锂能（002240）</view>
					</view> 
					<view class="list-item tag">
						<view>天齐锂业（002466）</view>
					</view> 
					<view class="list-item tag">
						<view>天华新能（300390）</view>
					</view>  
					<view class="list-item tag">
						<view>赣锋锂业（002460）</view>
					</view> 
					<view class="list-item tag">
						<view>盛新锂能（002240）</view>
					</view> 
					<view class="list-item tag">
						<view>天齐锂业（002466）</view>
					</view> 
					<view class="list-item tag">
						<view>天华新能（300390）</view>
					</view>  
				</view>
			</scroll-view>
			<view class="main-right u-flex u-flex-items-center u-flex-center u-font-14 text-thin " @click="showAll = !showAll">
				<!-- 展开 -->
				<up-icon name="close" size="18" v-if="showAll"></up-icon>
				<up-icon name="list-dot" size="18" v-else></up-icon>
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
		background-color: #f5f9fd;
		border-radius: 0 0 10px 10px;
		.main {
			width: calc(100% - 50px);
			flex: 0 0 calc(100% - 50px);
			.list {
				&.all {
					flex-wrap: wrap;
					.list-item {
						margin-bottom: 5px;
					}
				}
				.list-item {
					white-space: nowrap;
					// background-color: #dae8ff;
					background-color: #ece0ff;
					margin-right: 10px;
					border-radius: 6px;
					padding: 5px 10px; 
					color: #544cc3;
					// color: #4c81c3;
					font-size: 14px; 
				}
			}
			
		}
		.main-right {
			flex: 0 0 50px;
			width: 50px;
		}
	}
</style>