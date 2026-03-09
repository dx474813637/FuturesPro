#1.获取手机验证码
##请求url：www.100ppi.com/extra/ppi2vip/index.php?f=get_yzm

##请求参数
|参数|是否必须|描述|示例|默认值|
|mode|是	|验证码用途类型<br />登录：login<br />注册：regist<br />忘记密码：forget|login|无|
|mobile|是|11位手机号码|13812345678|无|

返回说明
mode_is_error	mode参数错误，mode必须为login、regist、forget 之一
mobile_is_error	手机号格式错误
mobile_is_black	手机号被拉黑
mobile_is_over	验证码数量超出限制
msg_failed	手机号发送错误
msg_successful	手机号发送成功


#2.密码登录
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=login

请求参数
参数	是否必须	描述	示例	默认值
login	是	账号	zhangsan	无
pwd	是	密码	123456	无

返回说明
login_null	账号未输入
pwd_null	密码未输入
pwd_error	密码错误
successful	密码校验成功
token	令牌


#3.验证码登录
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=login_yzm

请求参数
参数	是否必须	描述	示例	默认值
login	是	账号	zhangsan	无
yzm	是	验证码	123456	无

返回说明
login_null	账号未输入
yzm_null	验证码未输入
yzm_error	验证码错误
successful	验证码校验成功
token	令牌

#4.忘记密码
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=forget

请求参数
参数	是否必须	描述	示例	默认值
login	是	账号	zhangsan	无
passwd	是	密码	123456	无
npasswd	是	重复密码	123456	无
yzm	是	验证码	123456	无

返回说明
login_null	账号未输入
login_error	账号格式错误（11位手机号）
passwd_error	密码错误
yzm_error	验证码错误
login_error	账号不存在
successful	密码修改成功


#5.期货通、股票通订阅状态
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=my_subscription

请求参数
参数	是否必须	描述	示例	默认值
poster	是	账号	zhangsan	无

返回说明
order_id	订单id
type	2期现通 3股票通
price	价格
status	1已支付 0未支付
choose_date	订阅时间
status_date	生效时间（年月日时分秒）
status_date2	生效时间（年月日）
expire_date	过期时间
bill_status	null：未申请开票
0：已申请审核未通过
1：已申请审核已通过
plot	null：未申请开票
0：发票未寄送
1：发票已寄送


#6.期货通、股票通获取订单
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=get_order

请求参数
参数	是否必须	描述	示例	默认值
poster	是	账号	zhangsan	无
type	是	类型
2股票通
3期货通	2	无

返回说明
poster_null	账号名为空
poster_permission	账号权限错误
type_null	订阅类型为空
type_error	订阅类型数据错误
successful	订阅成功
order_id	订单号
price	价格

#7.期现通、股票通支付成功后通知
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=set_order

请求参数
参数	是否必须	描述	示例	默认值
poster	是	账号名	ppi	无
order_id	是	订单id	1	无
ip	否	请求方IP地址	123.53.32.150	无
trade_number	否	微信支付订单号	123456	无
merchant_number	否	微信支付商户号	123456	无

返回说明
poster_null	账号名为空
poster_permission	账号权限错误
order_id_error	订单号数据错误
successful	成功


#8.股票通数据（热点选股）
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=gpt

请求参数
参数	是否必须	描述	示例	默认值
poster	是	账号名	ppi	无
by	否	五档位置
5/10/20/30/60/90	5	5
zf	否	涨幅	5	无

返回说明
poster_permission	账号权限错误
successful	成功
list	列表数据


#9.股票通数据（季报选股）
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=gpt_analysis

请求参数
参数	是否必须	描述	示例	默认值
poster	是	账号名	ppi	无
is_hot	否	选择季度热点商品时is_hot=1	1	无
is_choice	否	按涨幅搜索 1
按商品搜索 2	1	1
sdate	否	起始日期	2026-01-01	今年一月一日
edate	否	截止日期	2026-03-06	今天
zf	否	涨幅	20	20
category	否	八大行业
11 能源
12 有色
13 钢铁
14 化工
15 像素
16 纺织
17 建材
18 农副	11	无
ppid	否	商品ppid值	827	无

返回说明
poster_permission	账号权限错误
successful	成功

res结构说明
list_date	按涨幅搜索的起始日期列表
list_ppid	按商品搜索的商品列表
list_hs	季度热点商品列表（网页版只显示前11个）
zf_num	按涨幅搜索结果数量
plist	按涨幅搜索结果


plist按涨幅搜索结果结构说明
name	商品名
ppid	商品ppid
stock	生产商基本面评析
图表地址拼接：
https://www.100ppi.com/graph/cindex.php?f=graph_gpt_ave&ppid=<{$plist[n].ppid}>&sdate=<{$sdate}>&edate=<{$edate}>

生产商基本面评析plist.stock结构说明
stock	名称
stockcode	股票代码
score	Priceseek评分
score_remark	Priceseek评分内容
capacity	产能
unit	产能单位
portion	营收占比
股票代码跳转链接地址拼接：
if(stock.first_code == 0 || stock.first_code == 3
)
https://finance.sina.com.cn/realstock/company/sz<{$plist[n].stock[i].stockcode}>/nc.shtml

if(stock.first_code == 6)
https://finance.sina.com.cn/realstock/company/sh<{$plist[n].stock[i].stockcode}>/nc.shtml

#10.股票通数据（季报选股详细页）
请求url：www.100ppi.com/extra/ppi2vip/index.php?f=gpt_analysis_detail

请求参数
参数	是否必须	描述	示例	默认值
poster	是	账号名	ppi	无
ppid	是	商品ppid值	827	无
code	否	股票代码	600549	无
terms_score	否	90天股价位置≤
1 低位
2 中地位
3中位
4 中高位
5 高位	1	无
terms_position	否	PriceSeek评分大于等于
1 2 3 4 5
	1	无

返回说明
poster_permission	账号权限错误
ppid_error	ppid错误
code_error	股票代码错误
successful	成功

res结构说明
pid	商品pid值
stock	生产商基本面评析
Sinfo	股价信息
Ginfo	Priceseek信息
生意社价格图表拼接：
https://www.100ppi.com/graph/cindex.php?f=graph_gpt_ave&ppid=<{$ppid}>&sdate=<{$sdate}>&edate=<{$edate}>
k线图拼接
https://www.100ppi.com/graph/cindex.php?f=graph_stock_k&code=<{$code}>&sdate=<{$sdate}>

Sinfo结构说明
price	最新股价
ninety_day_position	90天位置
1 低位
2 中地位
3中位
4 中高位
ninety_day_min	90天最小值
ninety_day_max	90天最大值
ninety_day_zw	90天中位值
ninety_day_avg	90天平均值


Ginfo结构说明
score	Priceseek评分


stock结构说明
Sinfo2.price	最新股价
Sinfo2.ninety_day_position	90天位置
1 低位
2 中地位
3中位
4 中高位
Sinfo2.ninety_day_min	90天最小值
Sinfo2.ninety_day_max	90天最大值
Sinfo2.ninety_day_zw	90天中位值
Sinfo2.ninety_day_avg	90天平均值
score	Priceseek评分
K线图拼接：
https://www.100ppi.com/graph/cindex.php?f=graph_stock_k&code=<{$stock[i].stockcode}>&sdate=<{$sdate}>
