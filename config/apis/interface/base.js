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

// category 商品分类
export const category = (data) => uni.$u.http.get('category', data)
// apply_partner  合伙人申请 code:推荐人id不是必填
export const apply_partner = (data) => uni.$u.http.get('apply_partner', data)
// query_ptp 合伙人发展用户 返回字段： poster：合伙人账号（不用显示）dy_poster：发展的用户账号 cdate：添加日期
export const query_ptp = (data) => uni.$u.http.get('query_ptp', data)
// query_ptp_dy 用户订阅查询 参数login 返回字段：poster：合伙人账号（不用显示） dy_poster：发展的用户账号 
	// pt_status：合伙人当前状态 type：订阅内容，2：期货通，3：股票通
	// status：订阅状态，1：已支付，0：未支付ctime：订阅时间
	// status_date：支付时间expire_date：到期日期 （trade_number：交易单号merchant_number：商户单号 不用显示）
export const query_ptp_dy = (data) => uni.$u.http.get('query_ptp_dy', data)
// my_subscription 我的订阅
export const my_subscription = (data) => uni.$u.http.get('my_subscription', data)

// get_order 获取订单 参数type 类型 值：2股票通 3期货通
export const get_order = (data) => uni.$u.http.get('get_order', data)

// 前台接口：
// gpt 股票通热点选股 参数by=五档位置5/10/20/30/60/90  zf涨幅
export const gpt = (data) => uni.$u.http.get('gpt', data)
// gpt_analysis 股票通季报选股
export const gpt_analysis = (data) => uni.$u.http.get('gpt_analysis', data)

// gpt_analysis_detail 详细页
export const gpt_analysis_detail = (data) => uni.$u.http.get('gpt_analysis_detail', data) 