<template>
	<view class="w u-p-20 u-p-t-30" >
		<!-- <view class="status-w u-text-center u-p-t-20 u-p-b-40 u-font-40 text-bold text-white u-line-2" >
			{{ tuan.title }}
		</view> 
		<view class="u-m-b-20">
			<view class="tuan-card u-radius-8 bg-white u-p-30">
				<view class="card-row u-flex u-flex-items-center u-flex-between u-m-b-20"> 
					<view class="item u-flex-1 ">
						<view class="text-error u-m-b-20">
							{{title}}
						</view> 
						<view class="u-p-20 u-radius-6 u-info-light-bg text-base u-font-28">
							<u-parse :content="tuan.info"></u-parse> 
						</view> 
					</view> 
				</view> 
			</view> 
		</view>
		<view class="u-p-20  text-bold u-info u-font-28">
			列表
		</view> -->
		<view class="list">  
			<view class="list-item u-m-b-20 u-border u-p-30 u-radius-14 u-flex u-flex-between uni-shadow-sm text-base" 
				v-for="item in dataList" :key="item.id"
				@click="analysisEvent(item)"
			>
				<view class="u-flex u-flex-items-center u-info-light-bg u-radius-6 u-p-6 u-p-l-12 u-p-r-20">
					<up-icon name="account-fill"></up-icon>
					<view class="u-m-l-10">
						<up-copy :content="item.dy_poster">
						    <text>{{item.dy_poster}}</text>
						</up-copy>
					</view>
				</view>
				<view class="u-flex u-flex-items-center">
					<up-icon name="clock"></up-icon>
					<view class="u-m-l-10 u-m-r-30">{{item.cdate}}</view>
					<up-icon name="arrow-right"></up-icon>
				</view> 
			</view>
			<template v-if="dataList.length == 0">
				<u-empty mode="data" :icon="base.empty" />
			</template>
			<template v-else>
				<view class="u-p-t-30"><u-loadmore :status="loadstatus" /></view>
				
			</template>  
				
				
			<u-safe-bottom></u-safe-bottom>
		</view>	 
	</view>
	<UserAnalysisPopup
		:show="showUserAnalysis" 
		title="发展用户" 
		mode="center"
		:list="user_analysis"
		:onUpdateShow="handleChangeShow" 
	></UserAnalysisPopup>
	<MenusBar></MenusBar>
</template>

<script setup>  
	import useDataList from '@/composition/useDataList.js'
	// import { share } from '@/composition/share.js'
	import { baseStore } from '@/stores/base'
	import {userStore} from '@/stores/user'
	const user = userStore()
	// const { tmp_id_list } = toRefs(user)
	const base = baseStore(); 
	// const {
	// 	setOnlineControl,
	// 	onlineControl
	// } = share()
	const $api = inject('$api')    
	const user_analysis = ref({})
	const showUserAnalysis = ref(false)
	const analysis_loading = ref(false)
	const options = computed(() => {
		return {
			params: { 
				type: type.value 
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
	const type = ref('3')
	onLoad(async (options) => {  
		if(options.hasOwnProperty('type')) {
			type.value = options.type
		}
		if(type.value == '2') {
			uni.setNavigationBarTitle({
				title: '期货通发展列表'
			})
		} else if(type.value == '3') {
			uni.setNavigationBarTitle({
				title: '股票通发展列表'
			})
		}
		initDataList() 
	})  
	onUnload(() => {
		// uni.$off('updateData', initDataList)
	}) 
	
	 
	function handleChangeShow(data) {
		showUserAnalysis.value = data
	}
	async function analysisEvent(data) {
		// if(analysis_loading.value) return
		// user_analysis.value = {}
		// uni.showLoading();
		// analysis_loading.value = true
		// try{
		// 	const res = await $api.query_ptp_dy({params: {login: data.dy_poster}})
		// 	if(res.code == 1) {
		// 		showUserAnalysis.value = true
		// 		user_analysis.value = res.list.pt_status? res.list : res.list.res
		// 	}
		// }catch(e){
		// 	uni.hideLoading()
		// 	//TODO handle the exception
		// }
		// analysis_loading.value = false
		
	}
	
</script>

<style scoped lang="scss">
.w {
	// min-height: 100vh;
	padding-bottom: 60px;
	// background: linear-gradient(to bottom, #F12E24,  #F12E24 100px, #f8f8f8 180px);
} 
.card {
	
}
</style>