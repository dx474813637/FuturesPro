<template>
	<view class="w">
		<up-loading-page :loading="loading"  ></up-loading-page>
		<view class="row u-flex-column u-flex-items-center u-flex-center text-white u-p-30 bg-primary">
			<up-icon :name="orderDetail.status == 1?'checkmark-circle-fill':'clock-fill' " color="#fff" size="40"></up-icon>
			<view class="u-font-18 u-m-t-10">{{pay_status}}</view>
		</view>
		<view class="card-w u-p-l-20 u-p-r-20 u-p-b-40">
			<view class="bg"></view>
			<view class="card bg-white box-border u-radius-20 u-p-12">
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20">
					<view class="text-base">订单ID</view>
					<view>{{orderDetail.order_id}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20">
					<view class="text-base">订阅商品</view>
					<view>{{orderDetail.name}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20">
					<view class="text-base">订阅时间</view>
					<view>{{orderDetail.choose_date}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20" v-if="orderDetail.status == 1">
					<view class="text-base">生效时间</view>
					<view>{{orderDetail.status_date}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20" v-if="orderDetail.status == 1">
					<view class="text-base">到期时间</view>
					<view>{{orderDetail.expire_date}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20" v-if="orderPriceInfo.time">
					<view class="text-base">订阅期限</view>
					<view>{{orderDetail.time}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-12 u-p-l-20 u-p-r-20">
					<view class="text-base">订阅金额</view>
					<view class="u-error">
						<nut-price :price="orderPriceInfo.price || orderDetail.price" size="large" thousands symbol="¥"></nut-price>
					</view>
				</view>
				<view class="u-p-20" v-if="orderDetail.status == 0">
					<up-button type="success" size="large" shape="circle" @click="wxpayBtn">微信支付</up-button>
				</view>
				<view class="u-p-20" v-if="orderDetail.status == 0">
					<up-button type="primary" plain size="large" shape="circle" @click="base.handleGoto('/pages/my/my')">个人中心</up-button>
				</view>
				<view class="u-p-20" v-if="gptVip">
					<up-button type="primary" size="large" plain  shape="circle" @click="base.handleGoto({url: '/pages/analysis/analysis', type: 'reLaunch'})">我要选股</up-button>
				</view>

			</view>
			<view class="title  u-m-t-30  ">
				<view class="u-font-15 bg-white u-p-25 u-radius-15">
					<view class="  text-base">生意社股票通具体功能：</view>
					<view class="u-radius-5 bg-white u-m-t-12">1、热点选股与季报选股2种方法</view>
					<view class="u-radius-5 bg-white u-m-t-12">2、股价90天内5档位置（高位、中高位、中位、中低位与低位）</view>
					<view class="u-radius-5 bg-white u-m-t-12">3、AI大模型财报评级与K线分析</view>
				</view>
			</view>

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
	const {gpt, qht, gptVip} = toRefs(user)
	const base = baseStore() 
	const $api = inject('$api')  
	const loading = ref(false) 
	const orderPriceInfo = ref({})
	const orderDetail = computed(() => {
		if(type.value == '3') {
			return gpt.value
		}
		if(type.value == '2') {
			return qht.value
		}
	})
	const form = ref({
		name: '',
		aaa: '',
		bbb: '',
		ccc: '',
		ddd: '',
		eee: '',
	});
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
	onLoad(async (options) => { 
		if(options.hasOwnProperty('type')) {
			type.value = options.type || '2'
		} 
		await user.getUserSubscription()
		if(!gpt.value.order_id) {
			await getOrder() 
			await user.getUserSubscription()
			
		}
		
	}) 
	onReady(() => {
		// uFormRef.value.setRules(rules)
	})
	async function getOrder() {
		if(loading.value) return
		loading.value = true
		try{ 
			const res = await $api.get_order({
				params: {
					type: type.value,
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
					id: (orderPriceInfo.value.order_id || orderDetail.value.order_id),
					price: (orderPriceInfo.value.price || orderDetail.value.price)*100, 
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
			// #ifdef MP-WEIXIN
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
						base.handleGoto({
							url: '/pages/my/my',
							type: 'reLaunch', 
						})
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