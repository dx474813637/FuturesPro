<template> 
	<view class="header bg-white"> 
		<NavBar :bgColor="bgColor"  :title="title" customColor="#000" :titleStyle="`color: ${themeColor}`" placeholder   >
		</NavBar>
		<view class="    u-p-b-10" > 
			<up-image src="https://p.cft.100ppi.com/Public/index-topbj/cfhlogo.png" width="100%" mode="widthFix"></up-image>
		</view> 
	</view>
	<view >
		<view class="tabs-main">
			<div class="loading-w u-flex u-flex-items-center u-flex-center" style="height: 100%;">
				<up-loading-icon :show="loadstatus == 'loading'"></up-loading-icon>
			</div>
			<view class="tabs-main-list u-m-t-20 u-p-l-20 u-p-r-20 box-border" v-for="item in 6" :key="item">
				<MsgCard
					:origin="ceshi" 
				></MsgCard>
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
	const top = ref(true)
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#d4e5ff'
	}) 
	const title = computed(() => {
		if(top.value) return ''
		return '财富号'
	}) 
	const options = computed(() => {
		return {
			params: { 
				// type: type.value 
			},
			api: 'query_ptp_statist',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list]
					// tuan.value = res.tuan
					// kg.value = res.kg
					
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
		// initDataList() 
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
	.tabs-list {
		.tabs-item {
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
	.tabs-main {
		position: relative;
		min-height: 30vh;
		.tabs-main-list {
			position: relative;
			z-index: 10;
		}
	}
</style>