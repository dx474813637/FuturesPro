import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import vitePluginTemplateInset from '@yck-web/vite-plugin-template-inset'; 
// import vue3InsetLoaderPlugin from 'vue3-inset-loader'
import AutoImport from 'unplugin-auto-import/vite'
import UniComponents from "@uni-helper/vite-plugin-uni-components";
import {
	NutResolver
} from "nutui-uniapp";

// const injectLoadingComponent = () => ({
// 	name: 'inject-new-request-loading',
// 	transform(code, id) {
// 		if (!id.endsWith('.vue')) return

// 		const isTargetPath = (
// 			id.includes('/pages/') ||
// 			id.includes('/page_note/') ||
// 			id.includes('/pages_user/')
// 		)

// 		if (!isTargetPath) return
// 		return code.replace(/<template>([\s\S]*?)<\/template>/,
// 			(match, content) => `<template>
// 				<global-dialog ref="msgBox" />
// 			  ${content}
// 			</template>`)
// 	}
// })
// <global-dialog ref="msgBox" />
// <up-notify ref="uNotifyRef" message="Hi uview-plus"></up-notify>

export default defineConfig({
	plugins: [
		// injectLoadingComponent(),
		UniComponents({
			resolvers: [
				NutResolver()
			]
		}),
		vitePluginTemplateInset(["<GlobalToast ref='globalToast'></GlobalToast>" ]), 
		uni(),
		AutoImport({
			imports: [
				'vue',
				'uni-app', 
				{
					'@/composition/useNormal': [
						// [
						// 	// 默认导入
						// 	['default', 'useNormal'], // import { default as axios } from 'axios',
						// ],
						// 命名导入
						'useNormal', // import { useMouse } from '@vueuse/core',
						// 设置别名
						// ['useFetch',
						// 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
					],
					'@/config/message': [ 
						['default', 'messageManager']  
					]
				},
				{
					"nutui-uniapp/composables": [
						// 在这里添加需要自动导入的API
						"useToast"
					]
				}
			]
		})
	],
});