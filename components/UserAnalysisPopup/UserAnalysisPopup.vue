<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">用户账号：</view>
						<view class="u-flex-1">{{list.dy_poster}}</view> 
					</view>
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">合伙人当前状态：</view>
						<view class="u-flex-1">{{list.pt_status}}</view> 
					</view>
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">订阅内容：</view>
						<view class="u-flex-1">{{type_status}}</view> 
					</view>
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">订阅状态：</view>
						<view class="u-flex-1">{{pay_status}}</view> 
					</view>
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">订阅时间：</view>
						<view class="u-flex-1">{{list.ctime}}</view> 
					</view>
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">支付时间：</view>
						<view class="u-flex-1">{{list.status_date}}</view> 
					</view>
					<view class="u-flex u-flex-items-center u-flex-between u-p-10 u-m-b-15 u-font-30">
						<view class="u-info text-nowrap">到期日期：</view>
						<view class="u-flex-1">{{list.expire_date}}</view> 
					</view>
				</scroll-view> 
			</view>  
		</PopupNormal>
	</view>
</template>

<script setup> 
	import useFilter from '@/composition/useFilter.js' 
	const zt = computed(() => {
		return {
			pay_status: props.list.status,
			type_status: props.list.type
		}
	})
	const { 
		pay_status,
		type_status
	} = useFilter(zt)
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		list: {
			type: Object,
			default: () => {
				return {}
			},
		}
	})   
	onMounted(async () => { 
	})  
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		// background-color: #f2f2f2;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.6);
		}
		.list-item {
			position: relative;
			z-index: 10;
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	}
	.nav-item {
		color: #666; 
		&.active-nav {
			background-color: #f2f2f2;
			color: $u-primary; 
		}
	}
	.main-list {
		height: 100%;
		box-sizing: border-box;
	}
	.item-card { 
		background-color: #e8e8e8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		border: 1rpx solid #e8e8e8;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
			border-color: $u-primary;
		}
	}
</style>