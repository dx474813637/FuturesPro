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
export default defineConfig({
	server: {
		hmr: true,
		proxy: { 
			'/Ppi': { // 匹配请求路径，
				target: 'https://wx.rawmex.cn/', // 代理的目标地址
				// 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
				changeOrigin: true,
				// secure: true, // 是否https接口
				// ws: true, // 是否代理websockets

				// 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
				//简单来说，就是是否改路径 加某些东西
				// rewrite: (path) => path.replace(/^\/tqapi/, '')
			}, 
		}
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
		rollupOptions: {
			output: {
				// 在这里修改静态资源路径
				chunkFileNames: `assets_h5_100ppi/[name]-[hash].js`,
				entryFileNames: `assets_h5_100ppi/[name]-[hash].js`,
				assetFileNames: `assets_h5_100ppi/[name]-[hash].[ext]`,
			} 
		},
		assetsDir: 'assets_h5_100ppi'
	},
	// base: '/100ppi',
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