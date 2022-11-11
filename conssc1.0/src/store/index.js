import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Login from './logIn'
import Operation from './operation'
import OrgChart from './orgChart'
import User from './user'
import InnerAdminEdit from './innerAdminEdit'
import Patent from './patent'
import Project from './project'
import Contract from './contract'
import Fin from './fin'
import UserPermissions from './userPermissions'
import MyForm from './myForm'
import PubRes from './pubRes'
import Register from './register'
import Notice from './notice'
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
      Register,
      Login,
      PubRes,
      Operation,
      OrgChart,
      User,
      InnerAdminEdit,
      Patent,
      Project,
      Contract,
      Fin,
      MyForm,
      UserPermissions,
      Notice
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
    // strict: false,
    // 持久化state数据
    plugins: [createPersistedState({
      storage: window.sessionStorage
    })]
  })

  return Store
}
