<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white ">   
				<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-20">
					<view class="u-flex-1 u-p-20">
						<up-button type="primary" :plain="mode == '1' ?  true: false "  shape="circle" :text="`热点选股${mode == '1' ? '（当前模式）' : ''}`" ></up-button>
					</view>
					<view class="u-flex-1 u-p-20">
						<up-button  type="primary"   :plain="mode == '2' ?  true: false " shape="circle" :text="`季度选股${mode == '2' ? '（当前模式）' : ''}`" ></up-button>
					</view>
				</view>
			</view>  
		</PopupNormal>
	</view>
</template>

<script setup> 
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
			type: Array,
			default: () => {
				return []
			},
		},
		mode: {
			type: String,
			default: '0'
		}
	})   
	onMounted(async () => { 
		console.log(props.mode)
	})  
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 150px;
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