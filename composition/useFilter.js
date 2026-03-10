import {
	computed
} from 'vue'

export default function useFilter(zt) { 
	const position_status = computed(() => {
		let value = zt?.value.position_status
		let text = value
		if(value == '1') text = '低位'
		else if(value == '2') text = '中低位' 
		else if(value == '3') text = '中位' 
		else if(value == '4') text = '中高位'  
		else if(value == '5') text = '高位'  
		return text
	})  
	return {
		position_status
	}
}