<template>
	<view class="w">
		<up-loading-page :loading="loading"  ></up-loading-page>
		 
		<view class="row u-flex-column u-flex-items-center u-flex-center text-white u-p-20 bg-primary" v-if="!showDateChoose">
			<up-icon :name="orderDetail.status == 1?'checkmark-circle-fill':'clock-fill' " color="#fff" size="40"></up-icon>
			<view class="u-font-18 u-m-t-10">{{pay_status}}</view>
		</view>
		<view class="card-w u-p-l-20 u-p-r-20 u-p-b-40">
			<view class="bg"></view>
			<view class="card bg-white box-border u-radius-20 u-p-12">
				<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20">
					<view class="text-base u-font-15">订阅商品</view>
					<view v-if="orderDetail.name">{{orderDetail.name}}</view>
					<view v-else>
						<template v-if="type == '2'">期货通</template>
						<template v-if="type == '3'">股票通</template>
					</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20" v-if="orderDetail.order_id">
					<view class="text-base u-font-15">订单ID</view>
					<view>{{orderDetail.order_id}}</view>
				</view>
				<template v-if="showDateChoose">
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20" >
						<view class="text-base u-font-15">订阅期限</view>
						<view>
							<up-radio-group
							    v-model="dy_mode"
							    placement="row"
								@change="dyChange"
							  >
							    <up-radio
							      :customStyle="{marginBottom: '8px'}"
							      v-for="(item, index) in dy_mode_list"
							      :key="item.value"
							      :label="item.name"
							      :name="item.value" 
							    >
							    </up-radio>
							  </up-radio-group>
						</view>
					</view>
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20" v-if="orderPriceInfo.price">
						<view class="text-base u-font-15 u-flex-1">订阅金额</view>
						<view class="u-error u-flex u-flex-items-center">
							<nut-price :price="orderPriceInfo.price " size="large" thousands symbol="¥"></nut-price>
							<text class="  u-p-l-10">元/<template v-if="dy_mode == 'y'">年</template><template v-if="dy_mode == 'm'">月</template></text>
						</view> 
					</view>
					<view class="u-m-t-10">
						<!-- <view class="u-p-12" >
							<up-button type="primary" size="large" shape="circle" @click="getOrderBtn">确 认</up-button>
						</view> -->
						<view class="u-p-12" v-if="orderPriceInfo.order_id">
							<up-button type="success" size="large" shape="circle" @click="wxpayBtn">立即支付 享7天无忧退</up-button>
						</view>
						<view class="u-p-12" >
							<!-- #ifdef H5 -->
							<up-button type="primary" plain size="large" shape="circle" @click="base.handleGoto(`${baseUrl}/#/pages/my/my`, 'alink')">个人中心</up-button>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<up-button type="primary" plain size="large" shape="circle" @click="base.handleGoto('/pages/my/my')">个人中心</up-button>
							<!-- #endif -->
						</view> 
					</view>
				</template>
				<template v-else> 
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20">
						<view class="text-base u-font-15">订阅时间</view>
						<view>{{orderDetail.choose_date}}</view>
					</view>
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20" v-if="orderDetail.status == 1">
						<view class="text-base u-font-15">生效时间</view>
						<view>{{orderDetail.status_date}}</view>
					</view>
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20" v-if="orderDetail.status == 1">
						<view class="text-base u-font-15">到期时间</view>
						<view>{{orderDetail.expire_date}}</view>
					</view>
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20" v-if="orderPriceInfo.time">
						<view class="text-base u-font-15">订阅期限</view>
						<view>{{orderDetail.time}}</view>
					</view>
					<view class="row u-flex u-flex-items-center u-flex-between u-p-8 u-p-l-20 u-p-r-20">
						<view class="text-base u-font-15 u-flex-1">订阅金额</view>
						<view class="u-error u-flex u-flex-items-center">
							<nut-price :price="orderPriceInfo.price || orderDetail.price" size="large" thousands symbol="¥"></nut-price>
							<text class="  u-p-l-10">元/{{dy_mode_name}}</text>
						</view>
						<!-- <view class="u-m-l-20">
							<up-button 
								shape="circle" 
								type="primary" 
								plain 
								:customStyle="{padding: '5px 12px', height: '30px'}" 
								@click="showDateChoose = true"
							>修改期限</up-button>
						</view> -->
					</view>
					<view class="u-m-t-10">
						<view class="u-p-12" v-if="orderDetail.status == 0">
							<!-- #ifdef H5 -->
							<up-button type="primary" plain size="large" shape="circle" @click="base.handleGoto(`${baseUrl}/#/pages/my/my`, 'alink')">个人中心</up-button>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<up-button type="primary" plain size="large" shape="circle" @click="base.handleGoto('/pages/my/my')">个人中心</up-button>
							<!-- #endif -->
						</view>
						<view class="u-p-12" v-if="gptVip && type == '3'">
							<!-- #ifdef H5 -->
							<up-button type="primary" size="large" plain  shape="circle" @click="base.handleGoto(`${baseUrl}/#/pages/analysis/analysis`, 'alink')">我要选股</up-button>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<up-button type="primary" size="large" plain  shape="circle" @click="base.handleGoto({url: '/pages/analysis/analysis', type: 'reLaunch'})">我要选股</up-button>
							<!-- #endif -->
						</view>
						<view class="u-p-12" v-if="qhtVip && type == '2'"> 
							<!-- #ifdef H5 -->
							<up-button type="primary" size="large" plain  shape="circle" @click="base.handleGoto(`${baseUrl}/#/pages/qxt/qxt`, 'alink')">查看期货通</up-button>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<up-button type="primary" size="large" plain  shape="circle" @click="base.handleGoto({url: '/pages/qxt/qxt', type: 'reLaunch'})">查看期货通</up-button>
							<!-- #endif -->
						</view> 
					</view>
				</template>
				

			</view>
			<view class="u-m-t-12 u-radius-10" style="overflow: hidden;" v-if="notice2.length > 0">
				<up-notice-bar 
					:text="notice2" 
					color="#ff0000" 
					bgColor="#ffebe9" 
					direction="column"  
					speed="250" 
				></up-notice-bar>
			</view>
			<template v-if="type == '2'">
				<view class="u-radius-20 bg-white u-m-t-12" style="overflow: hidden;">
					<image src="https://cft.100ppi.com/Public/gptguide/qhzftitle.png" style="width: 100%;height: auto; display: block;" mode="widthFix"></image>
				</view>
				<view class="u-radius-20 bg-white u-m-t-12" style="overflow: hidden;">
					<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
						<view class="u-flex u-flex-items-center u-flex-center u-m-b-20">
							<view class="text-bold u-font-16" style="color: #1254B3;">{{infoConfig.qxt.hxyl.title}}</view>
						</view>
						<view class="u-font-14" style="color: #67799f;">
							<u-parse :content="infoConfig.qxt.hxyl.content"></u-parse>
							<!-- <rich-text v-for="(item, index) in infoConfig.qxt.hxyl.content" :nodes="item" :key="index"> </rich-text> -->
						</view>
					</view> 
				</view>
				<view class="u-radius-20 bg-white u-m-t-12" style="overflow: hidden;">
					<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
						<view class="u-flex u-flex-items-center u-flex-center u-m-b-20">
							<view class="text-bold u-font-16" style="color: #1254B3;">{{infoConfig.qxt.jtff.title}}</view>
						</view>
						<view class="u-font-14" style="color: #67799f;">
							<u-parse :content="infoConfig.qxt.jtff.content"></u-parse> 
						</view>
					</view> 
				</view>
				<!-- <view class="u-font-15 bg-white u-p-20 u-radius-15 u-m-t-12">
					<view class="u-p-10 u-text-center  ">基差与期货价格呈反方向运行案例</view>
					<view class="tabs-list u-flex u-flex-items-center u-flex-between  u-p-10 box-border">
						<view class="tabs-item u-flex-1 u-flex u-flex-items-center u-flex-center  u-m-10 u-p-12 u-radius-16 "
							:class="{
								'u-primary-light-bg': tabValue == item.value,
								'u-info-light-bg': tabValue != item.value,
								'u-primary': tabValue == item.value,
								'text-base': tabValue != item.value
							}"
							v-for="item in tabslist"  
							:key="item.value"
							@click="tabsEvent(item)"
						>{{item.name}}</view> 
					</view> 
					<image :src="tabslist[tabIndex].img" style="width: 100%;height: auto; display: block;" mode="widthFix"></image>
				</view> 
				<view class="u-radius-20 bg-white u-m-t-12" style="overflow: hidden;">
					<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
						<view class="u-flex u-flex-items-center u-flex-center u-m-b-20">
							<view class="text-bold u-font-16" style="color: #1254B3;">{{infoConfig.qxt.jtff.title}}</view>
						</view>
						<view class="u-font-14" style="color: #67799f;">
							<view v-for="(item, index) in infoConfig.qxt.jtff.content" :key="index">{{item}}</view>
						</view>
					</view> 
				</view>
				<view class="u-font-15 bg-white u-p-20 u-radius-15 u-m-t-12">
					<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/gptguide/qh1.png" />
				</view>
				<view class="u-font-15 bg-white u-p-20 u-radius-15 u-m-t-12">
					<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/gptguide/qh2.png" />
				</view>
				<view class="u-radius-20 bg-white u-m-t-12" style="overflow: hidden;">
					<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
						<view class="u-flex u-flex-items-center u-flex-center u-m-b-20">
							<view class="text-bold u-font-16" style="color: #1254B3;">{{infoConfig.qxt.zj.title}}</view>
						</view>
						<view class="u-font-14" style="color: #67799f;">
							<view v-for="(item, index) in infoConfig.qxt.zj.content" :key="index">{{item}}</view>
						</view>
					</view> 
				</view> -->
			</template>
			<template v-if="type == '3'">
				
				<view class="title  u-m-t-12  " >
					<view class="u-font-15   u-p-20 u-radius-15" style="background: linear-gradient(to bottom, #ffdddb, #fff3f3 60%, #ffdddb )">
						<!-- <view class="  u-primary text-bold u-font-16 u-p-10 u-text-center">商品价格与股票价格的上涨“时间差”案例</view> -->
						<view class="u-flex u-flex-center u-m-b-20">
							<image src="https://cft.100ppi.com/Public/gptguide/zftitle.png" style="width: 100%;" mode="widthFix"></image>
						</view>
						
						<!-- #ifdef H5 -->
						<view class="u-radius-8 bg-white u-p-15 u-m-t-12"
							v-for="item in recommend"
							:key="item.id"
							@click="base.handleGoto(`${baseUrl}/#/pages/index/news_detail?id=${item.id}&al=1`, 'alink')"
						>
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<view class="u-radius-8 bg-white u-p-15 u-m-t-12"
							v-for="item in recommend"
							:key="item.id"
							@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id, al: 1}})"
						>
						<!-- #endif -->
						
							<view>
								{{item.title2 || item.title}}
								<!-- <text class="u-info">（{{item.pubDate}}）</text> -->
							</view>
						</view> 
					</view>
				</view>
			</template>
			

			<view class="card bg-white box-border u-radius-20 u-p-20 u-m-t-30"
				style="background: linear-gradient(to bottom, #fff 60%, #cbe6ff );" v-if="false">
				<view class="u-text-center u-font-19 text-bold u-p-20">我要开票</view>
				<view class="u-p-30">
					<up-form :model="form" :rules="rules" ref="uFormRef" labelWidth="120">
						<up-form-item label="发票类型" prop="aaa">
							<up-radio-group v-model="form.aaa" placement="column" @change="groupChange">
								<up-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1"
									:key="index" :label="item.name" :name="item.name" >
								</up-radio>
							</up-radio-group>
						</up-form-item>
						<up-form-item label="订阅方名称" prop="name">
							<up-input v-model="form.name" clearable />
						</up-form-item>
						<up-form-item label="纳税人识别号" prop="bbb">
							<up-input v-model="form.bbb" clearable />
						</up-form-item>
						<up-form-item label="发票收件人" prop="ccc">
							<up-input v-model="form.ccc" clearable />
						</up-form-item>
						<up-form-item label="收件人电话" prop="ddd">
							<up-input v-model="form.ddd" clearable />
						</up-form-item>
						<up-form-item label="发票寄送邮箱" prop="eee">
							<up-input v-model="form.eee" clearable />
						</up-form-item>
					</up-form>
				</view>

				<view class="u-p-20">
					<up-button type="primary"  size="large" shape="circle" @click="submit">提 交</up-button>
				</view>

			</view>
		</view>
	</view>
</template>

<script setup>
	// #ifdef H5
	// import setHttp from '@/config/request.js' 
	// const baseUrl = ref(window._url3)
	// setHttp(window._url2+'/Ppi/') 
	// uni.$u.http.setBaseUrl(window._url2+'/Ppi/')
	// #endif
	import { timeFrom } from 'uview-plus';
	import useFilter from '@/composition/useFilter.js' 
	const zt = computed(() => {  
		return {
			pay_status: orderDetail.value.status
		}
	})
	const { 
		pay_status,
		bill_status,
		plot_status
	} = useFilter(zt)
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js'  
	const user = userStore() 
	const {gpt, qht, gptVip, qhtVip} = toRefs(user)
	const cate = useCateStore() 
	const {infoConfig} = toRefs(cate)
	const base = baseStore() 
	const $api = inject('$api')  
	const loading = ref(false)  
	const orderPriceInfo = ref({})
	const showDateChoose = ref(true)
	const orderDetail = computed(() => {
		if(type.value == '3') {
			return gpt.value
		}
		if(type.value == '2') {
			return qht.value
		}
		return {}
	})
	const dy_mode_list = ref([
		{
		    name: '年付',
		    value: 'y',
		    disabled: false,
		},
		{
		    name: '月付',
		    value: 'm',
		    disabled: false,
		},
	])
	const dy_mode = ref('y')
	const dy_mode_name = computed(() => {
		if(orderDetail.value.dy_mode == 'y') return '年'
		else if(orderDetail.value.dy_mode == 'm') return '月'
		return ''
	})
	const form = ref({
		name: '',
		aaa: '',
		bbb: '',
		ccc: '',
		ddd: '',
		eee: '',
	}); 
	
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue = ref('1');
	
	const tabslist = ref([
		{
			name: '基差从高到低',
			value: '1',  
			img: 'https://cft.100ppi.com/Public/gptguide/gxd.png'
		}, 
		{
			name: '基差从低到高',
			value: '2', 
			img: 'https://cft.100ppi.com/Public/gptguide/dxg.png'
		},   
	])
	const radiolist1 = [{
		name: '增值税普票',
		disabled: false
	}]
	const rules = {
		name: [{
			required: true,
			message: '请输入订阅方名称',
			trigger: ['blur', 'change'],
		}],
		aaa: [{
			required: true,
			message: '请选择发票类型',
			trigger: ['blur', 'change'],
		}],
		bbb: [{
			required: true,
			message: '请输入纳税人识别号',
			trigger: ['blur', 'change'],
		}],
		ccc: [{
			required: true,
			message: '请输入发票收件人',
			trigger: ['blur', 'change'],
		}],
		ddd: [{
			required: true,
			message: '请输入收件人电话',
			trigger: ['blur', 'change'],
		}],
		eee: [{
			required: true,
			message: '请输入发票寄送邮箱',
			trigger: ['blur', 'change'],
		}],
	};
	const uFormRef = ref(null);
	const type = ref('') 
	const notice = ref([])
	const notice2 = computed(() => {
		if(notice.value.length == 0) return []
		return notice.value.map(ele => {
			let name = ele.type == 3 ? '股票通' :'期货通' //支付${ele.price}
			return `${timeFrom(new Date(ele.choose_date).getTime())}：${ele.poster}支付${ele.price}元订阅${name}`
		})
	})
	const recommend = ref([]) 
	onLoad(async (options) => { 
		// #ifdef H5
		await user.getUserData()
		console.log(options)
		// #endif
		
		if(options.hasOwnProperty('type')) {
			type.value = options.type || '2'
		} 
		await user.getUserSubscription()
		// console.log(type.value == '2' && !qhtVip.value, type.value == '3' && !gptVip.value, qhtVip.value, gptVip.value)
		// if((type.value == '2' && !qhtVip.value) || (type.value == '3' && !gptVip.value)) {
		// 	await getOrder() 
		// 	await user.getUserSubscription()
		// } 
		getRecommend()
		getNoticeData()
			// await getOrder() 
		if(gpt.value.status != '1' && type.value == '3') {
			// dy_mode.value = gpt.value.dy_mode
			await getOrder() 
			// await user.getUserSubscription() 
		} 
		if(qht.value.status != '1' && type.value == '2') {
			// dy_mode.value = qht.value.dy_mode
			await getOrder() 
			// await user.getUserSubscription() 
		}
		// $api.list_dy_status()
		
	})  
	// #ifdef H5
	onUnload(() => {
		console.log('onUnload')
		// setHttp()
		uni.$u.http.setBaseUrl(window._url3+'/Ppi/')
	})
	// #endif
	watch(
		() => orderDetail.value.status,
		(n) => {
			console.log(n)
			if(n != 0) showDateChoose.value = false
		} 
	)
	onReady(() => {
		// uFormRef.value.setRules(rules)
	})
	async function dyChange(data) {
		// console.log(data)
		// dy_mode.value = data
		await getOrder() 
	}
	async function getNoticeData() {  
		const res = await $api.list_dy_status()
		if(res.code == 1) {
			notice.value = res.list 
		} 
	}
	async function getRecommend() {  
		const res = await $api.list_chance_recommend_zx({ params: { all: 1 } })
		if(res.code == 1) {
			recommend.value = res.list.res.pw_rec_list
		} 
	}
	async function getOrderBtn() {
		// await getOrder()
		showDateChoose.value = false
		await user.getUserSubscription() 
	}
	async function getOrder() {
		if(loading.value) return
		loading.value = true
		try{ 
			const res = await $api.get_order({
				params: {
					type: type.value,
					dy_mode: dy_mode.value
				}
			})
			if(res.code == 1) {
				orderPriceInfo.value = res.list.res
			}
		}catch(e) {
			
		}
		loading.value = false
	}
	function submit() {
		uFormRef.value.validate().then(valid => {
			if (valid) {
				uni.$u.toast('校验通过')
			} else {
				uni.$u.toast('校验失败')
			}
		}).catch(() => {
			// 处理验证错误  
			uni.$u.toast('校验失败')
		});
	}
	function groupChange() {
		
	}
	async function wxpayBtn() {
		if(loading.value) return 
		loading.value = true
		uni.showLoading({title: '正在发起微信支付...'})
		try{ 
			const res = await $api.weixin_pay({
				params: {
					id: orderPriceInfo.value.order_id,
					price: orderPriceInfo.value.price*100, 
				}
			})
			if(res.code == 1) {
				wxPay(res)
			} 
		}catch(e) {
			
		}
		// uni.hideLoading()
		loading.value = false
	}
	async function wxPay(res) { 
		if(res.list.return_code == 'SUCCESS' && res.list.result_code == 'SUCCESS') {
			
			// #ifdef H5
			wxpayEvent(res.pay)
			// #endif
			// #ifdef MP-WEIXIN || APP-PLUS
			uni.requestPayment({
			    provider: 'wxpay',
			    timeStamp: String(res.pay.timeStamp),
			    nonceStr: res.pay.nonceStr,
			    package: res.pay.package,
			    signType: res.pay.signType,
			    paySign: res.pay.paySign,
			    success: async data => {
			        console.log('success:' + JSON.stringify(data)); 
					user.getUserSubscription()
					uni.showToast({
						title: '支付成功',
						icon: 'none'
					})
					setTimeout(() => {
						
						 // #ifdef H5 
						base.handleGoto(`${baseUrl}/#/pages/my/my`, 'alink')
						// #endif 
						// #ifndef H5 
						base.handleGoto({
							url: '/pages/my/my',
							type: 'reLaunch', 
						})
						// #endif 
					}, 2000)
					
					
					// uni.showLoading()
					// // await getData()
					// await user.getUserSubscription()
			    },
			    fail: err =>{
			        console.log(err);
					if(err.errMsg == 'requestPayment:fail cancel') { 
						uni.showToast({
							title: '用户取消支付',
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						})
					}
			    }
			});
		// #endif
		}else { 
			uni.showToast({
				title: res.list.return_msg,
				icon: 'none'
			})
		}
	} 
	   // 检测支付环境中的 WeixinJSBridge
	function wxpayEvent(data) {
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data), false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data));
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(data));
			}
		} else {
			onBridgeReady(data);
		}
	}

	function onBridgeReady(data) {
		WeixinJSBridge.invoke(
		  'getBrandWCPayRequest', {
			 // 传入第一步后端接口返回的核心参数
			"appId": data.appid, //公众号
			"timeStamp": data.timeStamp, //时间戳
			"nonceStr": data.nonceStr, //随机串
			"package": data.package, //prepay_id
			"signType": data.signType, //微信签名方式RSA
			"paySign": data.paySign //微信签名
		  },
		  async function(res) {
			// 支付成功
			if (res.err_msg == "get_brand_wcpay_request:ok") {
				  // 使用以上方式判断前端返回,微信团队郑重提示：
				  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。 
				uni.showToast({
					title: '支付成功',
					icon: 'none'
				})
				uni.showLoading()
				await user.getUserSubscription()
			}
			// 支付过程中用户取消
			if (res.err_msg == "get_brand_wcpay_request:cancel") { 
				uni.showToast({
					title: '取消支付',
					icon: 'none'
				})
			}
			// 支付失败
			if (res.err_msg == "get_brand_wcpay_request:fail") {
				uni.showToast({
					title: '支付失败',
					icon: 'none'
				})
			}
			/**
			* 其它
			* 1、请检查预支付会话标识prepay_id是否已失效
			* 2、请求的appid与下单接口的appid是否一致
			* */
			if (res.err_msg == "调用支付JSAPI缺少参数：total_fee") {
				uni.showToast({
					title: res.err_msg,
					icon: 'none'
				})
			}
		  });
	}
	function tabsEvent (obj) { 
		console.log(obj)
		if(obj.disabled) {
			// messageManager.showText('敬请期待'); 
			return
		}  
		tabValue.value = obj.value
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
</style>
<style lang="scss" scoped>
	.w {
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			width: 100%;
			top: 0;
			height: 80px;
			background-color: #1576E8;
			z-index: 1;
		}

		.row {
			position: relative;
			z-index: 1;
			font-size: 18px;

			::v-deep {
				.nut-price {
					color: #ff1433 !important
				}
			}

		}

		.card-w {
			position: relative;
			z-index: 1;
		}

		.card {
			position: relative;
			z-index: 12;
		}
	}
</style>