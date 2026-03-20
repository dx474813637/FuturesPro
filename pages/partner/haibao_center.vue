<template> 
	<view class="header bg-white"> 
		<NavBar :bgColor="bgColor"  :title="title" customColor="#000" :titleStyle="`color: ${themeColor}`" placeholder   >
		</NavBar>
		<view class="u-p-20 u-flex u-flex-items-center u-flex-between" > 
			<view class="u-primary u-font-18 text-bold u-p-l-20 u-flex u-flex-items-center"> 
				<view class=" ">推广海报</view>
			</view>
			<view class="text-base u-font-14 ">点击下方资讯下载或转发海报推广</view>
		</view> 
	</view>
	<view >
		<!-- <view class="u-flex u-flex-between u-flex-items-center u-flex-1  u-p-10 u-p-l-40 u-p-r-20 u-radius-4 bg-white ">
			<view class="u-m-r-20">商品</view>
			<view class="u-flex u-flex-items-center u-flex-1" @click="menusShow = true"> 
				<view class="bg-white u-flex-1" >
					<up-input 
						v-model="prod.name" 
						inputAlign="right"
						:customStyle="{
							backgroundColor: '#fff', 
						}"
						readonly 
						shape="circle"
						placeholder="点击选择商品"
						suffixIcon="arrow-down"
					></up-input>
				</view>  
			</view>
		</view> -->
		<view class="main u-p-20 box-border">
			<div class="loading-w u-flex u-flex-items-center u-flex-center" style="height: 100%;" v-if="loadstatus == 'loading'">
				<up-loading-icon :show="loadstatus == 'loading'"></up-loading-icon>
			</div>
			
			<view class="main-list u-p-20 box-border bg-white u-radius-10"> 
				<view 
					class="u-m-b-12 u-p-15 box-border u-flex u-flex-items-start u-flex-between u-info-light-bg u-radius-6" 
					v-for="item in dataList" 
					:key="item.id"
					@click="base.handleGoto({url: '/pages/partner/haibao_detail', params: {id: item.id, uid: share_id ,login: login }})"
				>
					<view class="u-font-14 u-p-r-20">
						{{item.title}}
					</view>
					<view class="u-radius-30 u-p-5 u-border">
						<up-icon name="arrow-right" size="12" color="#aaa"></up-icon>
					</view>
				</view>
				
				<template v-if="dataList.length == 0">
					<u-empty
						mode="data"
						:icon="empty"
					>
					</u-empty>
				</template>
				<template v-else>
					<u-loadmore
						:status="loadstatus"
					/>
				</template>
			</view>
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
	 <!-- 商品分类popup -->
	<!-- <MenusPopup
		:show="menusShow"
		title="商品分类"   
		:onUpdateShow="handleChangeShow2"
		@confirm="menusConfirm"
	></MenusPopup> -->
</template>

<script setup> 
	import useDataList from '@/composition/useDataList.js'
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const user = userStore() 
	const base = baseStore() 
	const {themeColor, empty} = toRefs(base)
	const { login, share_id } = toRefs(user)
	const $api = inject('$api')  
	const keyword = ref('')
	const menusShow = ref(false) 
	const prod = ref({})
	const top = ref(true)
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return '#d4e5ff'
	}) 
	const title = computed(() => {
		if(top.value) return ''
		return '推广海报'
	}) 
	const options = computed(() => {
		return {
			params: {  
				pid: prod.value.id
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
		// await initTjData()
		initDataList() 
	})  
	onPageScroll((e) => { 
		handleScroll(e)
	})
	async function initTjData() {
		const res = await $api.list_chance_recommend()
	}
	// 滚动事件处理函数
	const handleScroll = (e) => {
		// 直接使用回调提供的滚动信息
		const scrollTop = e.scrollTop
		// 当滚动距离超过80px时，top设为false，否则设为true
		top.value = scrollTop < 60
	} 
	function handleChangeShow2(data) {
		menusShow.value = data
	}
	function menusConfirm(data) {
		handleChangeShow2(false)
		prod.value = data
		initDataList()
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
			z-index: 9;
		}
	}
</style>