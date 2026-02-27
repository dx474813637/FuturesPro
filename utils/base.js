import test from 'uview-plus/libs/function/test' 
export function isObjectEqual(obj1, obj2) {
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);

	if (obj1Keys.length !== obj2Keys.length) {
		return false;
	}

	for (let key of obj1Keys) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}
export function deepMerge(target = {}, source = {}) {
	target = deepClone(target)
	if (typeof target !== 'object' || typeof source !== 'object') return false
	for (const prop in source) {
		if (!source.hasOwnProperty(prop)) continue
		if (prop in target) {
			if (typeof target[prop] !== 'object' || target[prop] === null) {
				target[prop] = source[prop]
			} else if (typeof source[prop] !== 'object' || source[prop] === null) {
				target[prop] = source[prop]
			} else if (target[prop].concat && source[prop].concat) {
				target[prop] = target[prop].concat(source[prop])
			} else {
				target[prop] = deepMerge(target[prop], source[prop])
			}
		} else {
			target[prop] = source[prop]
		}
	}
	return target
}

export function deepClone(obj) {
	// 对常见的“非”值，直接返回原来值
	if ([null, undefined, NaN, false].includes(obj)) return obj
	if (typeof obj !== 'object' && typeof obj !== 'function') {
		// 原始类型直接返回
		return obj
	}
	const o = test.array(obj) ? [] : {}
	for (const i in obj) {
		if (obj.hasOwnProperty(i)) {
			o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
		}
	}
	return o
}

export function isNumber(num) {
	return !isNaN(parseFloat(num)) && isFinite(num)
}

export async function getImageBase64_readFile(tempFilePath) {
	return await new Promise(resolve => {
		//获取全局唯一的文件管理器 
		uni.getFileSystemManager().readFile({ //读取本地文件内容
			filePath: tempFilePath, // 文件路径
			encoding: 'base64', // 返回格式
			success: ({
				data
			}) => {
				// return resolve('data:image/png;base64,' + data);
				return resolve(data);
			}
		});
	});
}


import provinces from '@/utils/province.js';
import citys from '@/utils/city.js';
import areas from '@/utils/area.js';

// console.log(provinces)
// console.log(citys)
// console.log(areas)
export function initAddressData() {
	let data = deepClone(provinces);
	data.forEach((province, index) => {
		province.children = deepClone(citys[index]).map((item, i) => {
			item.children = deepClone(areas[index][i])
			return item
		}) 
	}) 
	return data
}

export function isWeixinBrowser() {
	// 获取当前浏览器的 User Agent 并转为小写
	const ua = navigator.userAgent.toLowerCase();
	// 检测是否包含微信特有的标识
	return ua.indexOf('micromessenger') !== -1;
}
 