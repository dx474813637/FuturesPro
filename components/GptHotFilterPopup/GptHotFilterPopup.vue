<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white u-p-20 box-border">   
				<view class="u-flex u-flex-between u-flex-items-start u-flex-1 u-p-20 u-info-light-bg u-radius-4 u-m-b-10">
					<view>天数</view>
					<view class="u-flex-1 u-flex u-flex-wrap u-flex-end">
						<view class="u-m-l-20 u-m-b-20" v-for="item in tabslist" :key="item.value" >
							<up-tag borderColor="#d2e0ff" :text="item.name" plainFill :plain="!item.checked" type="primary" :name="item.value" @click="radioClick"></up-tag> 
						</view>
					</view>
				</view>
				<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-20 u-info-light-bg u-radius-4 u-m-b-10">
					<view>涨幅</view>
					<view class="u-flex u-flex-items-center">
						<view class="u-m-r-10">≥</view>
						<view class="bg-white" style="width: 100px;">
							<up-input v-model="zf" ></up-input>
						</view>
						<view class="u-m-l-10">%</view>
						<!-- <view class="u-m-l-20"><u-icon name="arrow-right"></u-icon></view> -->
					</view>
				</view>
			</view>  
			<template #footer>
				<view class="u-p-20">
					<up-button :color="themeColor" shape="circle" @click="submit">搜 索</up-button>
				</view>
			</template>
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
	const emits = defineEmits([ 'submit'])
	const tabslist = ref([
		{
			name: '近5天',
			checked: false,
			value: '5'
		}, 
		{
			name: '近10天',
			checked: false,
			value: '10'
		}, 
		{
			name: '近20天',
			checked: false,
			value: '20'
		}, 
		{
			name: '近30天',
			checked: false,
			value: '30'
		}, 
		{
			name: '近60天',
			checked: false,
			value: '60'
		}, 
		{
			name: '近90天',
			checked: false,
			value: '90'
		},  
	])
	const zf = ref('5')
	onMounted(async () => {  
	})  
	function radioClick(name) {
		tabslist.value.map((item, index) => {
			item.checked = item.value === name ? true : false
		})
	} 
	function submit() { 
		emits('submit', 1)  
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 250px;
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