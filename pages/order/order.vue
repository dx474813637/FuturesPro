<template>
	<view class="w">
		<up-loading-page :loading="loading"  ></up-loading-page>
		<view class="row u-flex-column u-flex-items-center u-flex-center text-white u-p-40 bg-primary">
			<up-icon :name="orderDetail.status == 1?'checkmark-circle-fill':'clock-fill' " color="#fff" size="40"></up-icon>
			<view class="u-font-18 u-m-t-10">{{pay_status}}</view>
		</view>
		<view class="card-w u-p-l-20 u-p-r-20 u-p-b-40">
			<view class="bg"></view>
			<view class="card bg-white box-border u-radius-20 u-p-20">
				<view class="row u-flex u-flex-items-center u-flex-between u-p-20">
					<view>订单ID</view>
					<view>{{orderDetail.order_id}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-20">
					<view>订阅商品</view>
					<view>{{orderDetail.name}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-20">
					<view>订阅日期</view>
					<view>{{orderDetail.choose_date}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-20">
					<view>订阅期限</view>
					<view>{{orderPriceInfo.time}}</view>
				</view>
				<view class="row u-flex u-flex-items-center u-flex-between u-p-20">
					<view>订阅金额</view>
					<view class="u-error">
						<nut-price :price="orderPriceInfo.price" size="large" thousands symbol="¥"></nut-price>
					</view>
				</view>
				<view class="u-p-20">
					<up-button type="success" size="large" shape="circle" @click="wxpayBtn">微信支付</up-button>
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
					<up-button type="primary" size="large" shape="circle" @click="submit">提 交</up-button>
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
	const {gpt, qht} = toRefs(user)
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
		await getOrder() 
		await user.getUserSubscription()
		
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
					id: orderPriceInfo.value.order_id,
					price: orderPriceInfo.value.price*100, 
				}
			})
			if(res.code == 1) {
				
			} 
		}catch(e) {
			
		}
		uni.hideLoading()
		loading.value = false
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