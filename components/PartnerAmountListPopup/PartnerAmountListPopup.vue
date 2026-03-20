<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w  ">   
				<scroll-view class="main-list  u-p-30" scroll-y > 
				
					<template v-if="!list || list.length == 0">
						<u-empty
							mode="data"
							:icon="empty"
						>
						</u-empty>
					</template> 
					<view class="u-m-t-20" v-for="item in list" :key="item.id"> 
						<view class="u-radius-10 u-p-20  bg-white u-flex u-flex-items-center u-flex-between uni-shadow-sm">
							<view class="text-base">id: {{item.id}}</view>
							<view class="u-error"> 
								<template v-if="mode == '1'"> 
									<nut-price :price="item.split_amount" ></nut-price>
								</template>
								<template v-if="mode == '2'"> 
									<nut-price :price="item.withdraw_amount" ></nut-price>
								</template>
							</view>
						</view>
					</view> 
				</scroll-view> 
			</view>  
		</PopupNormal>
	</view>
</template>

<script setup> 
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor ,empty} = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		mode: {
			type: String,
			default: '1',
		} ,
		list: {
			type: Array,
			default: () => {
				return []
			},
		}
	})   
	onMounted(async () => { 
	})  
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		background-color: #f2f2f2;
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