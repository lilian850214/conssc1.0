import Vue from 'vue'
import { use } from 'echarts/core'
import ECharts from 'vue-echarts'

import {
  CanvasRenderer
} from 'echarts/renderers'

import {
  BarChart, LineChart,
  PieChart, TreemapChart
} from 'echarts/charts'

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'
import 'echarts/theme/walden'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  TreemapChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])
Vue.component('v-chart', ECharts)
