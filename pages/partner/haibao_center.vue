<template> 
	<view class="header bg-white"> 
		<NavBar :bgColor="bgColor"  :title="title" customColor="#000" :titleStyle="`color: ${themeColor}`" placeholder   >
		</NavBar>
		<view class="u-p-20 u-flex u-flex-items-center u-flex-between" > 
			<view class="u-primary u-font-18 text-bold u-p-l-20 u-flex u-flex-items-center"> 
				<view class=" ">海报中心</view>
			</view>
			<view class="text-base u-font-14 ">点击下方列表资讯生成海报</view>
		</view> 
	</view>
	<view >
		<view class="main u-p-20 box-border">
			<div class="loading-w u-flex u-flex-items-center u-flex-center" style="height: 100%;">
				<up-loading-icon :show="loadstatus == 'loading'"></up-loading-icon>
			</div>
			<view class="main-list u-p-20 box-border bg-white u-radius-10"> 
				<view class="u-m-b-12 u-p-15 box-border u-flex u-flex-items-start u-flex-between u-info-light-bg u-radius-6" v-for="item in dataList" :key="item.id">
					<view class="u-font-14 u-p-r-20">
						{{item.title}}
					</view>
					<view class="u-radius-30 u-p-5 u-border">
						<up-icon name="arrow-right" size="12" color="#aaa"></up-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup> 
	import useDataList from '@/composition/useDataList.js'
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const user = userStore() 
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const $api = inject('$api')  
	const keyword = ref('')
	const ceshi = ref({
		name: '姓名',
		avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPSGFKGZia5rYiauxAgxudU3gKzT7iamu4n4GNkPBuyQLHVMpicHu4ehAzt9ic5UP66zCyrnVyxqm0uDQ/132',
		imgList: ['https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPSGFKGZia5rYiauxAgxudU3gKzT7iamu4n4GNkPBuyQLHVMpicHu4ehAzt9ic5UP66zCyrnVyxqm0uDQ/132',
		'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPSGFKGZia5rYiauxAgxudU3gKzT7iamu4n4GNkPBuyQLHVMpicHu4ehAzt9ic5UP66zCyrnVyxqm0uDQ/132',
		'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPSGFKGZia5rYiauxAgxudU3gKzT7iamu4n4GNkPBuyQLHVMpicHu4ehAzt9ic5UP66zCyrnVyxqm0uDQ/132',
		'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPSGFKGZia5rYiauxAgxudU3gKzT7iamu4n4GNkPBuyQLHVMpicHu4ehAzt9ic5UP66zCyrnVyxqm0uDQ/132'],
		content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
		login: '18757127948',
		publishtime: '2026-02-26 09:11:59',
		likenumber: 1,
		chatnumber: 0,
	})
	const pid = ref('')
	const top = ref(true)
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#d4e5ff'
	}) 
	const title = computed(() => {
		if(top.value) return ''
		return '海报中心'
	}) 
	const options = computed(() => {
		return {
			params: {  
				pid: pid.value
				// type: type.value 
			},
			api: 'list_chance', 
			noReach: true,
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list] 
					if(dataList.value.length >= res.list.length) {
						loadstatus.value = 'nomore'
					}
					else {
						loadstatus.value = 'loadmore'
					}
				}
			}
		}
	})
	
	const { 
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList, 
	} = useDataList(options)  
	 
	onLoad(async (options) => {   
		initDataList() 
	})  
	onPageScroll((e) => { 
		handleScroll(e)
	})
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
		background-color: #F0F3F8;
		padding-bottom: 120px;
	}
</style>
<style lang="scss" scoped>
	.header { 
		background-image: url('https://p.cft.100ppi.com/Public/index-topbj/index-topbj.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0;
	}
	.list {
		.item {
			border: 1rpx solid #eee;
			color: #666;
			transition: all .3s;
			&.active {
				color: #007aff;
				border: 1rpx solid #007aff;
				background-color: #fff;
			}
		}
	}
	.main {
		position: relative;
		min-height: 30vh;
		.main-list {
			position: relative;
			z-index: 10;
		}
	}
</style>