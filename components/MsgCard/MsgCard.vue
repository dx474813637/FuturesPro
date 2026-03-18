<template>
	<view class="u-p-30 bg-white u-radius-12 box-border">
		<view class="album  ">
			<view class="album__content ">
				<view class="u-m-b-10 u-flex u-flex-items-center u-flex-between u-p-r-14" >
					<view class="album__avatar u-flex u-flex-center u-flex-items-start"  @click="gotoHome" >
						<up-image :src="origin.avatar" bgColor="#eee" mode="aspectFill" width="40px" height="40px" shape="circle"></up-image>
					</view>
					<view class="u-flex-1 u-p-l-20">
						<view class="u-font-17  ">{{origin.name}}</view> 
					</view>
					<view @click.stop="followBtn">
						<up-tag text="+ 关注" shape="circle" plain type="primary"  > </up-tag>
					</view>
				</view>
				<view class=" u-p-b-30   text-base" v-if="origin.content" style="word-break: break-all;" @click="gotodetail"> 
					<rich-text :nodes="`${origin.content}`"></rich-text> 
				</view>
				<view class="u-m-b-30" v-if="origin.imgList && origin.imgList.length > 0 && reply!= 1" >
					<up-album maxCount="3" :previewFullImage="true" :urls="origin.imgList" multipleSize="80"></up-album>
				</view> 
				<view class="album__content__footer u-flex u-flex-between u-flex-items-center u-p-r-5 " @click="gotodetail">
					<view class="item text-base u-font-26">{{$u.timeFrom(origin.publishtime*1000)}}</view>
					<view class="item" >
						<view class="u-flex u-flex-items-center u-font-28 text-base">
							<view class="more-btn u-flex u-flex-items-center text-error" v-if="manager == 1 || origin.isMe == 1"  @click.stop="deleteBtn">
								<up-icon :name="'trash'" :color="'#dd524d'" size="19"></up-icon>
								<text class="u-p-l-5">删除</text> 
							</view>
							<view class="more-btn u-flex u-flex-items-center u-m-l-30" @click.stop="likeBtn">
								<up-icon :name="'thumb-up'" :color="'#999'" size="19"></up-icon>
								<text class="u-p-l-5" v-if="origin.likenumber == 0">点赞</text>
								<text class="u-p-l-5" v-if="origin.likenumber > 0">{{origin.likenumber}}</text>
							</view>
							<view class="more-btn u-flex u-flex-items-center u-m-l-30" @click.stop="commentBtn" v-if="detail != 1">
								<up-icon :name="'chat'" :color="'#999'" size="19"></up-icon>
								<text class="u-p-l-5" v-if="origin.chatnumber == 0">评论</text>
								<text class="u-p-l-5" v-if="origin.chatnumber > 0">{{origin.chatnumber}}</text>
							</view>
						</view>
					</view>
				</view>
				 
				
			</view>
		</view>
	</view>
</template>
<script setup>
import {userStore } from '@/stores/user.js'  
	const user = userStore() 
import { baseStore} from '@/stores/base.js'  
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const show = ref(false)
	const props = defineProps({  
		origin: {
			type: Object,
			default: () => {
				return {}
			}
		},
		manager: {
			type: [String, Number],
			default: 0
		},
		detail: {
			type: [String, Number],
			default: 0
		},
		reply: {
			type: [String, Number],
			default: 0
		},
		front: {
			type: [String, Number],
			default: 0
		}
	})   
	onMounted(() => {
		
	})
	const emits = defineEmits([ 'comment', 'like', 'delete'])
	function commentBtn() {
		if(props.front == 1) return
		emits('comment', {data: props.origin})
	}
	function likeBtn() {
		if(props.front == 1) return
		emits('like', {data: props.origin, reply: props.reply})
	}
	function deleteBtn() {
		if(props.front == 1) return
		uni.showModal({
			title: '提示',
			content: '是否删除',
			success: (res) => {
				if (res.confirm) {
					emits('delete', {data: props.origin, reply: props.reply})
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	} gotoHome
	function gotoHome() {
		// if(props.detail == 1 || props.reply == 1 || props.front == 1) return
		base.handleGoto({
			url: '/pages/index/cfh_user',
			params: {
				login: props.origin.login
			}
		})
	}
	function gotodetail() {
		if(props.detail == 1 || props.reply == 1 || props.front == 1) return
		// base.handleGoto({
		// 	url: '/pages/index/dynamic/dynamic',
		// 	params: {
		// 		id: props.origin.id
		// 	}
		// })
	}
	function followBtn() {
		
	}
</script> 
<style lang="scss" scoped>
	.more-btns {
		width: 30px;
		height: 18px;
		border-radius: 4px;
		background-color: #eee;
		.custom-icon {
			color: #999;
		}
	}
	.more-w {
		position: absolute;
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgba(0,0,0,.8);
		border-radius: 4px;
	}
	.position-group {
		position: relative;
		background-color: #eee;
		color: #666;
		&:after {
			content: '';
			position: absolute;
			bottom: 100%;
			left: 10px;
			width: 0;
			height: 0;
			border-top: 0;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 8px solid #eee;
		}
	}
</style>
