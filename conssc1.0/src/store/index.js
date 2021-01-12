import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import OrgChart from './orgChart'
import InnerAdminEdit from './innerAdminEdit'
import Patent from './patent'

Vue.use(Vuex)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      OrgChart,
      InnerAdminEdit,
      Patent
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
    // strict: false,
    // 持久化state数据
    plugins: [createPersistedState({
      storage: window.sessionStorage,
      reducer (val) {
        return { // 只储存state中的orgChartData
          orgChartData: val.OrgChart.orgChartData
        }
      }
    })]
  })

  return Store
}
