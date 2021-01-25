import Vue from 'vue'
import ECharts from 'vue-echarts'

import theme from '../theme/yellow-green'
ECharts.registerTheme('yellow-green', theme) // 引入主题
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
Vue.component('v-chart', ECharts)
