// const http = uni.$u.http

// all_api api=接口名称 其他参数保持一致
export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return uni.$u.http.get('all_api', data)
	} else if (methods == 'POST') {
		return uni.$u.http.post('all_api', data, config)
	}
}
 
 
 // export const create_order_post = (data, config={}) => uni.$u.http.post('create_order', data, config)
 
// login  登录接口  参数cate=1 密码登录 0或不传 验证码登录 login账号 passwd密码  captcha验证码  密码和验证码只要传对应方式的参数
export const login = (data) => uni.$u.http.get('login', data)
// logout 退出登录接口 没参数
export const logout = (data) => uni.$u.http.get('logout', data)
// get_captcha 获取验证 参数mode=login、regist、forget  mobile手机号
export const get_captcha = (data) => uni.$u.http.get('get_captcha', data)
// passwd_reset 验证码修改密码（忘记密码） passwd新密码 npasswd重复新密码  captcha验证码
export const passwd_reset = (data) => uni.$u.http.get('passwd_reset', data)


// memu  底部菜单接口，包括验证有没有登录 返回的login有值就是登录，0或空就是没登录。
export const memu = (data) => uni.$u.http.get('memu', data)
// login_cancel  小程序获取userid
export const login_cancel = (data) => uni.$u.http.get('login_cancel', data)