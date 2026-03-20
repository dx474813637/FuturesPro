<template>
	<view class="w " > 
		<up-sticky bgColor="#fff">
			<view class="tabs-w u-flex u-flex-center">
				<up-tabs
					:scrollable="false"
					:list="tabslist" 
					:current="tabIndex"  
					lineColor="#007aff" 
					lineHeight="0" 
					:activeStyle="{
						color: '#fff', 
						backgroundColor: '#007aff',
						padding: '4px 15px',
						borderRadius: '20px',
						fontSize: '18px',
						boxSizing: 'border-box', 
						height: '35px'
					}" :inactiveStyle="{
						color: '#666', 
						backgroundColor: '#eee',
						padding: '4px 15px',
						borderRadius: '20px',
						fontSize: '18px',
						boxSizing: 'border-box',
						height: '35px'
					}" itemStyle=" height: 40px; padding: 5px 10px ; "
					@click="tabsEvent"	
				></up-tabs>
			</view>
		</up-sticky>
		
		<view class="list u-p-20" >  
			<template v-if="tabValue == 'user'">
				<view class="list-item u-m-b-20 u-border u-p-30 u-radius-14 u-flex u-flex-between uni-shadow-sm text-base"
					v-for="item in dataList" :key="item.id"
					@click="analysisEvent(item)"
				>
					<view class="u-flex u-flex-items-center u-info-light-bg u-radius-6 u-p-6 u-p-l-12 u-p-r-20">
						<up-icon name="account-fill"></up-icon>
						<view class="u-m-l-10"> 
							<text>{{item.dy_poster}}</text> 
						</view>
					</view>
					<view class="u-flex u-flex-items-center">
						<up-icon name="clock"></up-icon>
						<view class="u-m-l-10 u-m-r-30">{{item.cdate}}</view>
						<up-icon name="arrow-right"></up-icon>
					</view> 
				</view>
			</template>
			<template v-else>
				<view class="list-item u-m-b-20 u-border u-p-30 u-radius-14  uni-shadow-sm text-base"
					v-for="item in dataList" :key="item.id"
				>
					<view class="u-flex u-flex-between u-m-b-15">
						<view class="u-flex u-flex-items-center u-info-light-bg u-radius-6 u-p-6 u-p-l-12 u-p-r-20">
							<up-icon name="account-fill"></up-icon>
							<view class="u-m-l-10">
								<text>{{item.poster}}</text>
							</view>
						</view>
						<view class="u-flex u-flex-items-center"> 
							<view class=" ">
								<template v-if="item.type == 2">期货通</template>
								<template v-else-if="item.type == 3">股票通</template> 
							</view> 
							<view class="u-m-l-10" :class="{'u-error': item.status != 1, 'u-success': item.status == 1}">
								<template v-if="item.status == 1">已支付</template>
								<template v-else-if="item.status == 2">已过期</template>
								<template v-else-if="item.status == 0" >未支付</template>
							</view> 
						</view> 
					</view>
					<view class="u-flex u-flex-between u-m-b-15">
						<view class="u-flex u-flex-items-center ">
							<text>订阅时间</text> 
						</view>
						<view class="u-flex u-flex-items-center"> 
							<view class="u-m-l-10  ">{{item.choose_date}}</view> 
						</view> 
					</view>
					<view class="u-flex u-flex-between u-m-b-15" v-if="item.status != 0">
						<view class="u-flex u-flex-items-center ">
							<text>支付时间</text> 
						</view>
						<view class="u-flex u-flex-items-center"> 
							<view class="u-m-l-10  ">{{item.status_date}}</view> 
						</view> 
					</view>
					<view class="u-flex u-flex-between" v-if="item.status != 0">
						<view class="u-flex u-flex-items-center ">
							<text>到期日期</text> 
						</view>
						<view class="u-flex u-flex-items-center"> 
							<view class="u-m-l-10  ">{{item.expire_date}}</view> 
						</view> 
					</view> 
				</view> 
			</template>
			
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
	// const type = ref('3')
	const options = computed(() => {
		return {
			params: {
				// role: role.value,
				type: configData.value.type
			},
			api: configData.value.api,
			noReach: true,
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
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue = ref('user');
	
	const configData = computed(() => tabslist.value.filter(ele => ele.value == tabValue.value)[0] )
	const tabslist = ref([
		{
			name: '用户',
			value: 'user',
			api: 'query_ptp',
			disabled: false, 
		},
		{
			name: '股票通',
			value: 'gpt',
			type: '3',
			api: 'query_ptp_statist',
			disabled: false, 
		},
		{
			name: '期货通',
			value: 'qht', 
			type: '2',
			api: 'query_ptp_statist',
			disabled: false, 
		},  
	])
	const { 
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList, 
	} = useDataList(options) 
	onLoad(async (options) => {  
		if(options.hasOwnProperty('mode')) {
			tabValue.value = options.mode
		}
		// if(options.hasOwnProperty('type')) {
		// 	type.value = options.type
		// }
		uni.setNavigationBarTitle({
			title: configData.value.name + '发展列表'
		})
		initDataList() 
	})   
	
	function tabsEvent (obj) {  
		if(obj.disabled) {
			messageManager.showText('敬请期待'); 
			return
		}
		tabValue.value = obj.value
		nextTick(() => {
			uni.setNavigationBarTitle({
				title: configData.value.name + '发展列表'
			}) 
			initDataList()  
			
		})
	} 
	function handleChangeShow(data) {
		showUserAnalysis.value = data
	}
	async function analysisEvent(data) {
		if(analysis_loading.value) return
		user_analysis.value = {}
		uni.showLoading();
		analysis_loading.value = true
		try{
			const res = await $api.query_ptp_dy({params: {login: data.dy_poster}})
			if(res.code == 1) {
				if(res.list[0]) {
					showUserAnalysis.value = true
					user_analysis.value = res.list[0]  
				}
				else {
					messageManager.showText(data.dy_poster+'无订阅记录'); 
				}
			}
		}catch(e){
			uni.hideLoading()
			//TODO handle the exception
		}
		analysis_loading.value = false
		
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