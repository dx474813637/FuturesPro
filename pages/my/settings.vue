<template>
	<view class="bg-white">
		<up-cell-group>
			<up-cell
			    title="重置密码"
				icon="lock-open"
			    isLink
			    url="/pages/login/resetPwd"
			></up-cell>
			<up-cell
			    title="我的二维码"
				icon="lock-open"
			    isLink
			    url="/pages/my/myqrcode"
			>
				<template #icon>
					<nut-icon name="erweima" font-class-name="custom-icon" class-prefix="custom-icon" size="16" ></nut-icon>
				</template>
			</up-cell>
			<up-cell
			    title="更新头像和姓名"
				icon="edit-pen"
			    isLink
			    url="/pages/my/myInfo"
			> </up-cell>
			<!-- <up-cell
			    title="打开徽标页"
			    isLink
			    url="/pages/componentsB/badge/badge"
			></up-cell> -->
		</up-cell-group>
	</view>
	<view class="u-p-20 u-m-t-40" v-if="login && login != '0'">
		<u-button type="error" plain shape="circle" @click="logoutBtn">退出登录</u-button>
	</view>
</template>

<script setup>
import {userStore } from '@/stores/user.js'  
	const user = userStore() 
import {useCateStore, baseStore} from '@/stores/base.js'  
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const {gpt, gptVip, userInfo, login, partner, subscription_loading} = toRefs(user)
	async function logoutBtn() {
		await user.logout();
		setTimeout(() => {
			base.handleGoto({
				url: '/pages/index/gpt',
				type: 'reLaunch'
			})
			
		}, 2000)
	}
</script>

<style lang="scss" >
page {
	background-color: #f8f8f8;
}
</style>
<style lang="scss" scoped>

</style>