<template>
	<view>
		<view style="width: 100%; height: 300px;position: relative;">
			<l-echart ref="chartRef"></l-echart>
			<view class="customTooltips" :style="{ left: position[0] + 'px', top: position[1] + 'px' }"
				v-if="params.length && position.length && showTip">
				<view>这是个自定的tooltips</view>
				<view>{{ params[0]['axisValue'] }}</view>
				<view v-for="item in params">
					<view>
						<text>{{ item.seriesName }}</text>
						<text>{{ item.value }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		chartData: {
			type: Object,
			default: () => {
				return {}
			}
		}
	})
	const chartRef = ref(null)
	const chartInstance = ref(null)
	// 仅在小程序环境下引入 ECharts
	// #ifdef MP
	const echarts = require('../../static/echarts.min.js') // 根据实际路径调整
	// #endif
	// #ifndef MP
	const echarts = null // H5 和 App 环境不需要手动引入
	// #endif

	const position = ref([])
	const params = ref([])
	const showTip = ref(false)

	const optionRef = computed(() => {
		if (!props.chartData.data_data) return false
		let yname = Object.keys(props.chartData.data_data)
		let ydata1 = Object.values(props.chartData.data_data[yname[0]])
		let ydata2 = Object.values(props.chartData.data_data[yname[1]])
		let xdata = props.chartData.date_data.split(',')
		
		return {
			title: {
				left: 'center',
				text: props.chartData.name + '价格走势',
				subtext: props.chartData.spec,
			}, 
			tooltip: {
				trigger: 'axis',
				// shadowBlur: 0,
				textStyle: {
					textShadowBlur: 0,
				},
				renderMode: 'richText',
				position: (point, params, dom, rect, size) => {
					// 假设自定义的tooltips尺寸
					const box = [170, 170]
					// 偏移
					const offsetX = point[0] < size.viewSize[0] / 2 ? 20 : -box[0] - 20
					const offsetY = point[1] < size.viewSize[1] / 2 ? 20 : -box[1] - 20
					const x = point[0] + offsetX
					const y = point[1] + offsetY 
					position.value = [x, y]
					params.value = params
					console.log(params.value)
				},
				formatter: (params, ticket, callback) => {},
			},
			legend: {
				data: yname
			},
			xAxis: [{
				type: 'category',
				axisLine: {
					lineStyle: {
						color: '#999999'
					}
				},
				axisLabel: {
					color: '#666666'
				},
				data: xdata
			}],
			yAxis: [{
					type: 'value',
					axisTick: {
						show: false
					},
					name: yname[0],
					axisLine: {
						lineStyle: {
							color: '#999999'
						}
					},
					axisLabel: {
						color: '#666666'
					}
				},
				{
					type: 'value',
					axisTick: {
						show: false
					},
					name: yname[1],
					axisLine: {
						lineStyle: {
							color: '#999999'
						}
					},
					axisLabel: {
						color: '#666666'
					}
				}
			],
			series: [{
					name: yname[0], 
					type: 'line',
					yAxisIndex: 0,
					label: {
						show: true,
						// position: 'inside'
					},
					data: ydata1
				},
				{
					name: yname[1], 
					yAxisIndex: 1,
					type: 'line',
					label: {
						show: true
					},
					data: ydata2
				}
			]
		}

	})
	onMounted(() => {
		// console.log(props.chartData)
	})
	watch(
		() => optionRef.value,
		async (n) => {
			// const chart = await chartRef.value.init(echarts)
			// chart.setOption(optionRef.value)
			// chartInstance.value.setOption(optionRef.value)
			// chartInstance.value.resize()
			if (!optionRef.value) return
			await initChart()
		}, {
			deep: true
		}
	) 
	// 初始化图表 
	const initChart = async () => {
		if (!chartRef.value) return

		try {
			const chart = await chartRef.value.init(echarts)
			chart.setOption(optionRef.value)
			
			chart.on('showTip', (params) => {
				showTip.value = true
				console.log( 'showTip::' )
			})
			chart.on('hideTip', (params) => {
				setTimeout(() => {
					showTip.value = false
				}, 300)
			})
		} catch (error) {
			console.error('图表初始化失败:', error)
		}
	}
</script>

<style lang="scss" scoped>

	.customTooltips {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 20rpx;
		width: 80px;
		height: auto;
	}
</style>