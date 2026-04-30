<template> 
	<view class="stock-recommend box-border" :class="['stock-recommend--' + theme]">
		<view class="stock-recommend__header">
			<view class="stock-recommend__badge">
				<view class="stock-recommend__badge-dot"></view>
				<text class="stock-recommend__badge-text">{{ pubDate }} 热点周期股</text>
			</view>
			<view class="stock-recommend__update u-p-r-20" v-if="pinfo.post_date">
				<text>更新于 {{ timeFrom(new Date(pinfo.post_date).getTime()) }}</text>
			</view>
		</view>
		<view class="tab-list-cnt box-border  " style=" border-radius: 20px 20px 0 0;">
			<view class="tab-list " >
				<view class="tab-item " 
					v-for="(item, index) in tabslist" 
					:key="item.rate_type" 
					@click="tabsEvent(item, index)" 
					:class="{
						active: item.rate_type == tabValue
					}"
				>
					<!-- <view class="u-flex u-m-r-10   icon" v-if="item.icon">
						<nut-icon :name="item.icon" font-class-name="custom-icon" class-prefix="custom-icon" size="16" ></nut-icon>
					</view> -->
					<view>{{item.rate_type}}日</view>
				</view>
				<div :style="{'transform': `translateX(${tabIndex * 100}%)`}" class="tab-selected">
					<div class="left"></div>
					<div class="right"></div>
				</div> 
			</view>  
		</view> 
		<view class="tabs-w  bg-white  box-border u-p-l-10 u-p-r-10 u-p-t-20 ">
			<up-tabs
				:list="plist" 
				:current="plistIndex"  
				lineColor="#fff" 
				lineHeight="0" 
				keyName="pname"
				:activeStyle="{
					color: '#fff', 
					backgroundColor: '#428eff',
					padding: '4px 14px',
					borderRadius: '6px',
					fontSize: '14px',
					boxSizing: 'border-box', 
					height: 'auto'
				}" :inactiveStyle="{
					color: '#8e9bb6', 
					backgroundColor: '#ffffff',
					padding: '4px 14px',
					borderRadius: '6px',
					fontSize: '14px',
					boxSizing: 'border-box',
					height: 'auto'
				}" itemStyle="height: auto; padding: 0px 6px 5px 6px ; "
				@click="tabsEvent2"	
			>
				<!-- <template #right>
					<view class="u-flex u-flex-items-center u-p-l-20 text-white u-p-b-10" v-if="productlist.length > 10"  @click="allproductShow = true" > 
						<view class=" u-flex" style="position: relative;">
							<nut-icon name="sort" font-class-name="custom-icon" class-prefix="custom-icon" size="18" ></nut-icon>
							<up-badge type="warning"  :value="productlist.length" absolute :offset="[-8,-12]"></up-badge>
						</view>  
						<view class="u-font-16 u-m-l-8">展开</view>
					</view>
				</template> -->
			</up-tabs>
		 </view> 
		<view class="stock-recommend__list bg-white u-p-10 u-p-b-20">
			<view 
				class="stock-recommend__card"  
			>
				<view class="stock-recommend__product-row">
					<view class="stock-recommend__product-name">{{ pinfo.pname }}</view>
					<view class="stock-recommend__product-rate">
						<text class="stock-recommend__rate-type">{{ pinfo.rate_type }}日涨跌</text>
						<text class="stock-recommend__rate-value up">+{{ pinfo.rate }}%</text>
					</view>
				</view>
				<view>
					<view class="stock-recommend__stock-row" 
						v-for="(item, index) in stocklist" 
						:key="item.ppid"
					>
						<view class="stock-recommend__stock-left">
							<text class="stock-recommend__stock-name">{{ item.stock }}</text>
							<text class="stock-recommend__stock-code">{{ item.stockcode }}</text>
						</view>
						<view class="stock-recommend__stock-right">
							<view class="stock-recommend__stock-item">
								<text class="stock-recommend__stock-label">收盘</text>
								<text class="stock-recommend__stock-value">{{ item.close }}</text>
							</view>
							<view class="stock-recommend__stock-item">
								<text class="stock-recommend__stock-label">涨跌率</text>
								<text class="stock-recommend__stock-value up">+{{ item.close_rate }}%</text>
							</view>
						</view>
					</view> 
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { timeFrom } from 'uview-plus';

const props = defineProps({
	list: {
		type: Array,
		default: () => []
	},
	pubDate: {
		type: String,
		default: ''
	},
	updateTime: {
		type: String,
		default: ''
	},
	theme: {
		type: String,
		default: 'light',
		validator: (value) => ['light', 'dark'].includes(value)
	}
})

const tabIndex = ref(0)
const tabValue = ref(''); 
const tabslist = ref([]) 
 
const plist = computed(() => tabslist.value[tabIndex.value]?.list || [])
const plistIndex = ref(0)
const plistValue = ref(''); 
const stocklist = computed(() => plist.value[plistIndex.value]?.list || [])  
const pinfo = computed(() => stocklist.value[0] || {})  

watch(
	() => props.list,
	(n) => {
		if(!n || n.length == 0) return [];
		tabslist.value = uni.$u.deepClone(n)
		tabValue.value = tabslist.value[0].rate_type 
	},
	{
		deep: true,
		immediate: true
	}
)
const emits = defineEmits(['cardClick'])

function handleCardClick(item) {
	emits('cardClick', item)
}

function tabsEvent (obj, index) {  
	console.log(obj, index)
	tabIndex.value = index
	tabValue.value = obj.rate_type
	plistIndex.value = 0
	plistValue.value = plist.value[0].ppid
}
function tabsEvent2 (obj) {   
	console.log(obj)
	plistIndex.value = obj.index
	plistValue.value = obj.ppid
}
</script>

<style lang="scss" scoped>
	$tab-height: 42px;
	$active-color: #ffffff;
	$default-color: #e2eaff;
	$primary-color: #2081ff;
	
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
				color: #767fb8;
				font-size: 15px; 
				cursor: pointer; 
				.icon {
					color: #8198b4;
				}
				&.active {
					color: $primary-color;
					font-style: italic;
					font-weight: bold;
					font-size: 17px; 
					.icon {
						color: #1576E8;
					}
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
				width: 33%;
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
	.tabs-w {
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
						border-top: 5px solid #428eff;
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
.stock-recommend {
	padding: 0;
	overflow: hidden;
	&--light {
		--accent-primary: #428EFF;
		--accent-up: #f43f5e;
		--accent-down: #10b981;
		--text-primary: #1a1a1a;
		--text-secondary: #666666;
		--text-muted: #999999;
		--bg-card: #ffffff;
		--border-color: rgba(66, 142, 255, 0.2);
		--bg-product: rgba(66, 142, 255, 0.06);
	}
	
	&--dark {
		--accent-primary: #428EFF;
		--accent-up: #f43f5e;
		--accent-down: #10b981;
		--text-primary: #f1f5f9;
		--text-secondary: #94a3b8;
		--text-muted: #64748b;
		--bg-card: rgba(30, 41, 59, 0.6);
		--border-color: rgba(66, 142, 255, 0.3);
		--bg-product: rgba(66, 142, 255, 0.1);
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0 16rpx 0;
	}

	&__badge {
		display: inline-flex;
		align-items: center;
		gap: 8rpx;
		background: linear-gradient(135deg, rgba(66, 142, 255, 0.1), rgba(66, 142, 255, 0.05));
		border: 1rpx solid rgba(66, 142, 255, 0.3);
		padding: 6rpx 16rpx;
		border-radius: 24rpx;
	}

	&__badge-dot {
		width: 8rpx;
		height: 8rpx;
		background: var(--accent-primary);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	&__badge-text {
		font-size: 26rpx;
		font-weight: 500;
		color: var(--accent-primary);
	}

	&__update {
		font-size: 20rpx;
		color: var(--text-muted);
	}

	&__list {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
		border-radius: 0 0 12px 12px;
	}

	&__card {
		background: var(--bg-card);
		border: 1rpx solid var(--border-color);
		border-radius: 16rpx;
		overflow: hidden;
	}

	&__product-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14rpx 18rpx;
		background: var(--bg-product);
		border-bottom: 1rpx solid var(--border-color);
	}

	&__product-name {
		font-size: 26rpx;
		font-weight: 600;
		color: var(--text-primary);
	}

	&__product-rate {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	&__rate-type {
		font-size: 20rpx;
		color: var(--text-muted);
	}

	&__rate-value {
		font-size: 26rpx;
		font-weight: 600;
		font-family: 'DM Mono', monospace;

		&.up {
			color: var(--accent-up);
		}

		&.down {
			color: var(--accent-down);
		}
	}

	&__stock-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14rpx 18rpx;
		border-top: 1rpx solid #f8f8f8; 
		&:first-of-type {
			border-top: 0;
		}
	}

	&__stock-left {
		display: flex;
		align-items: baseline;
		gap: 12rpx;
	}

	&__stock-name {
		font-size: 28rpx;
		font-weight: 500;
		color: var(--text-primary);
	}

	&__stock-code {
		font-size: 24rpx;
		color: var(--text-muted);
		font-family: 'DM Mono', monospace;
	}

	&__stock-right {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}

	&__stock-item {
		display: flex;
		align-items: baseline;
		gap: 8rpx;
	}

	&__stock-label {
		font-size: 24rpx;
		color: var(--text-muted);
	}

	&__stock-value {
		font-size: 24rpx;
		font-weight: 600;
		font-family: 'DM Mono', monospace;
		color: var(--text-primary);

		&.up {
			color: var(--accent-up);
		}

		&.down {
			color: var(--accent-down);
		}
	}
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.4;
	}
}
</style>
