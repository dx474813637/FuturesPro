 
// import { timeFormat } from '@/utils'
// import {timeFrom} from '@/utils/index'

export default {
	install: (app) => {
		app.config.globalProperties.$filters = { 
			position2str(value) {
				let text = value
				if(value == '1') text = '低位'
				else if(value == '2') text = '中低位' 
				else if(value == '3') text = '中位' 
				else if(value == '4') text = '中高位'  
				else if(value == '5') text = '高位'  
				return text
			},  
		}
	},
}