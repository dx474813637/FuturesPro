<!-- src/components/GlobalMessage.vue -->
<template>
	<nut-toast></nut-toast>
</template>

<script setup> 
	// import {
	// 	ref
	// } from 'vue';
	import {
		useToast
	} from 'nutui-uniapp/composables'
	const toast = useToast()
	function showText(content) { 
		toast.text(content);
	}

	function showSuccess(content) {
		toast.success(content);
	}

	function showError(content) {
		toast.error(content);
	}

	function showWarning(content) {
		toast.warning(content);
	}

	function showLoading(content='加载中') {
		toast.loading(content, {
			duration: 5000
		});
	}

	function hide() {
		toast.hide();
	}

	// 将方法暴露出去，让父组件可以调用
	defineExpose({
		showText,
		showSuccess,
		showError,
		showWarning,
		showLoading,
		hide
	});
</script>

<style>
	.global-message {
		/* 你的样式，通常需要固定定位 */
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.8);
		color: #fff;
		padding: 10px 20px;
		border-radius: 8px;
		z-index: 9999;
	}
</style>