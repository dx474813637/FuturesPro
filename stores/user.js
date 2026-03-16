import {
	defineStore
} from 'pinia';
import apis from '@/config/apis/index'; 
import { menusStore } from '@/stores/base'; 
export const userStore = defineStore('user', {
	state: () => {
		return { 
			login: '', 
			subscription_loading: false,
			gpt: {},
			qht: {}, 
			partner: 0,
			userInfo: uni.getStorageSync('userInfo') || {}
		};
	},
	getters: { 
		gptExpireTimestamp(){
			return new Date(this.gpt.expire_date).getTime() || 0
		},
		gptVip() {
			return this.gptExpireTimestamp > new Date().getTime() 
		}
	}, 
	actions: {
		async getUserData() {
			const menus = menusStore()
			await menus.getMenusData()
			if(this.login && this.login != '0') {
				await this.getUserSubscription()
			}
			
		}, 
		async getUserSubscription() {
			if(this.subscription_loading) return
			this.subscription_loading = true
			try{
				const res = await apis.my_subscription()
				if(res.code == 1) {
					this.gpt = res.list.res.gpt
					this.qht = res.list.res.qht
					this.userInfo = res.info
					uni.setStorageSync('userInfo', res.info)
				}
			}catch(e) {
				
			} 
			this.subscription_loading = false
		}, 
		clearLogout() {
			this.login = ''  
			this.userInfo = {}
			this.gpt = {}
			this.qht = {}
			uni.removeStorageSync('userInfo')  
		},
		async logout() {
			uni.showLoading()
			const res = await apis.logout();
			if(res.code == 1) {
				this.clearLogout()
				messageManager.showSuccess(res.msg); 
			}
		}, 
		async getUserInfo(data) { 
			this.user_info = data;
			
			data.tid && uni.$u.http.setToken({
				tid: data.tid
			})  
			data.id && uni.$u.http.setToken({
				poster: data.id
			})  
		},
		async refreshUserData() {
			const res = await apis.memu()
			if(res.code == 1) {   
				// this.getUserInfo(res.info)
				this.login = res.login 
			}
		}, 
		saveUserInfo(data) {
			// this.user = data; 
			// uni.setStorageSync('poster', data.poster) 
			// uni.setStorageSync('user', data) 
			uni.setStorageSync('userid', data.userid) 
		},
		get_xcx_code() {
			return new Promise((resolve, rejected) => {
				uni.login({
					success: function (res){
						resolve(res.code);
					},
					fail: err => {
						// md5flag = true
						rejected(err)
					}
				});
			});
		},
		async refreshToken() {
			try{
				let code = await this.get_xcx_code();
				console.log('code打印:',code)
				return apis.login_cancel({params: {code}}) 
			}catch(e){
				return e
			}
		},
		async getNewToken() {
			this.refreshToken().then(res => {
				console.log('获取token成功，存入头部',res)
				this.saveUserInfo(res) 
				let userid = "" 
				userid = res.userid
				uni.$u.http.setToken({
					userid: userid
				}) 
			}) 
		}
	},
});