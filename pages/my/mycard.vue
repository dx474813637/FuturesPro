<template>
	<view class="wrap u-p-20"> 
		<view class="u-p-10 " v-if="cj == 0"> 
			<up-alert 
				title="当前还未创建名片" 
				type="warning"  
				showIcon 
				fontSize="16px"
			></up-alert>
		</view>
		<view class="content"> 
			<up-form 
				labelPosition="top"
				:model="form" 
				:rules="rules"
				ref="uForm"  
				errorType="toast"
			>
				<up-form-item prop="name" >
					<up-input shape="circle" 
						v-model="form.name"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入姓名`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="account-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">姓名</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<up-form-item prop="position" >
					<up-input shape="circle" 
						v-model="form.position"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入职位`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="map-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">职位</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<up-form-item prop="company" >
					<up-input shape="circle" 
						v-model="form.company"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入公司`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="map-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">公司</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<up-form-item prop="phone" >
					<up-input shape="circle" 
						v-model="form.phone"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入手机号`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="phone-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">手机号</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<up-form-item prop="tel" >
					<up-input shape="circle" 
						v-model="form.tel"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入座机`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="phone-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">座机</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<up-form-item prop="email" >
					<up-input shape="circle" 
						v-model="form.email"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入邮箱`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="email-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">邮箱</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<up-form-item prop="address" >
					<up-input shape="circle" 
						v-model="form.address"  
						border="none"
						clearable 
						inputAlign="right"
						fontSize="16px"
						:placeholder="`请输入所在地`" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template #prefix>
							<view class="u-flex u-flex-items-center" style="color: #929cb5">
								<up-icon name="map-fill" color="#929cb5"></up-icon>
								<view class="u-m-l-6 u-font-16 ">所在地</view>
							</view>
						</template>
					</up-input>
				</up-form-item>
				<u-form-item label=""  prop="img" ref="img"  > 
					<template #label>
						<view>label</view>
					</template>
					<up-upload
						:fileList="fileLists.img"
						@afterRead="afterRead"
						@delete="deletePic"
						name="img" 
						:maxCount="1"
						:maxSize="2048000"
						width="100%"
						@oversize="handleoversize"
					></up-upload>
				</u-form-item>
				<up-form-item prop="info" >
					<up-textarea v-model="info" placeholder="请输入简介" ></up-textarea>
				</up-form-item>
			</up-form>
 
		</view>  
		
		<view class="u-m-t-40 u-m-b-40">
			<up-button type="primary" shape="circle" size="large" @click="submit">提交名片信息</up-button>
		</view>
	</view>
	<up-loading-page :loading="loading"></up-loading-page>
</template>

<script setup> 
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	import { baseStore, menusStore } from '@/stores/base.js'
import { login } from '../../config/apis/interface/base'
	const user = userStore() 
	const menusstore = menusStore()
	const base = baseStore()  
	const uForm = ref(null)
	const cj = ref(0)
	const loading = ref(false)
	const form = ref({
		name: '',
		position: '',
		company: '',
		phone: '',
		tel: '',
		email: '',
		address: '',
		img: '',
		info: '',
	})
	const fileLists = reactive({ 
		img: [] 
	});
	const passwordType = ref(true) 
	const rules = computed(() => { 
		return {
			phone: [{
					required: true,
					message: '请输入手机号',
					trigger: ['blur', 'change']
				},
				{
					validator: (rule, value, callback) => uni.$u.test.mobile(value),
					message: '请输入正确的11位手机号',
					trigger: ['blur', 'change']
				},
			],
			name: {
				required: true,
				message: '请输入姓名',
				trigger: ['blur', 'change']
			},
		}  
	})
	
	onLoad(async () => {  
		await getData()
	})
	onReady(() => { 
		handleSetRules()
	})
	function handleSetRules() { 
		uForm.value.setRules(rules.value)
	} 
	function submit() { 
		uForm.value.validate().then(async valid => {
			if (valid) {
				console.log('验证通过');
				await submitCard() 
			} else {
				// console.log('验证失败');
			}
		}).catch(errors => {
			// uni.$u.toast('请检查表单内容')
		});
	}  
	async function getData() { 
		if(loading.value) return;
		loading.value = true
		// await uni.$u.sleep(1800)
		try{
			const res = await $api.login_card({
				params: {
					login: login.value
				}
			})
			if(res.code == 1) { 
				cj.value = res.cj
			}
		} catch(e) {
			
		}
		loading.value = false
		
	}  
	async function submitCard() {
		uni.showLoading( )
		// await uni.$u.sleep(1800)
		const res = await $api.edit_card({
			...form.value
		})
		if(res.code == 1) { 
			 await getData()
		}
	}
	// 新增图片
	async function afterRead(event) {
		// console.log(event)
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		let lists = [].concat(event.file)
		let obj = fileLists[event.name]
		let fileListLen = obj.length
		lists.map((item, index) => {
			obj.push({
				...item,
				status: 'uploading',
				message: '上传中'
			})
		})
		console.log(lists)
		for (let i = 0; i < obj.length; i++) {
			let item = obj[i] 
			const blob = await fetch(item.url).then(response=>response.blob()) 
			let fileN = base.blobToFile(blob, lists[i].name) 
			const result = await base.uploadFilePromise(fileN) 
			// const result = await base.uploadFilePromise(item.thumb)  
			if(result.code == 1) {
				obj.splice(i, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result.list[0],
					name: result.list[0]
				}))  
			}
			else {
				obj.splice(i, 1)  
				uni.showToast({
					title: result.msg,
					icon: 'none'
				})
			}
			
			
			
		}
		form.value[event.name]= fileLists[event.name].map(ele => ele.url).join('|')
	}  
	function deletePic(event) {
		fileLists[event.name].splice(event.index, 1) 
		form.value[event.name] = ''
	} 
	function handleoversize() {
		uni.showToast({
			title: '建议上传2M以内的图片',
			icon: 'none'
		})
	} 
</script> 
<style lang="scss" scoped>
	.u-border-bottom {
		border-bottom: 1rpx solid #e7e7e7;
	}

	.login-box {
		display: none;

		&.tel,
		&.pw {
			display: block;
		}
	}

	.inputRow {
		margin-bottom: 30rpx;
	}

	.wrap {
		// height: 100vh;
		background: #fff;
		font-size: 28rpx; 
		.content {
			width: 100%;
			margin: 0 auto;

			.title {
				color: #3B4978;
				text-align: left;
				font-size: 50rpx;
				font-weight: 500;
				margin-bottom: 50rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: #ffaa00;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $uni-color-warning;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: #666;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;

			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #666;
					font-size: 28rpx;
				}
			}

			.hint {
				// padding: 20rpx 40rpx;
				font-size: 28rpx;
				color: #333;

				.link {
					color: #007aff;
				}
			}
		}
	}
</style>
