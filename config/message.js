// 全局消息管理器
class MessageManager {
	constructor() {
		this.toastInstance = null;
	}

	// 注册toast实例
	registerToast(instance) {
		this.toastInstance = instance;
	}

	// 显示文本消息
	showText(message) { 
		if (this.toastInstance) {
			this.toastInstance.showText(message);
		} else {
			// 后备方案：如果没有注册实例，使用uni.showToast
			uni.showToast({
				title: message,
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}

	// 显示成功消息
	showSuccess(message) {
		if (this.toastInstance) {
			this.toastInstance.showSuccess(message);
		} else {
			uni.showToast({
				title: message,
				icon: 'success',
				mask: true,
				duration: 2000
			});
		}
	}

	// 显示错误消息
	showError(message) {
		if (this.toastInstance) {
			this.toastInstance.showError(message);
		} else {
			uni.showToast({
				title: message,
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}

	// 显示警告消息
	showWarning(message) {
		if (this.toastInstance) {
			this.toastInstance.showWarning(message);
		} else {
			uni.showToast({
				title: message,
				icon: 'none',
				mask: true,
				duration: 2000
			});
		}
	}

	// 显示加载消息
	showLoading(message) {
		if (this.toastInstance) {
			this.toastInstance.showLoading(message);
		} else {
			uni.showToast({
				title: message,
				icon: 'loading',
				mask: true,
				duration: 5000
			});
		}
	}

	// 隐藏消息
	hide() {
		if (this.toastInstance) {
			this.toastInstance.hide();
		} else {
			uni.hideToast();
		}
	}
}

// 导出单例实例
export default new MessageManager();