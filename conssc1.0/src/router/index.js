import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store/* , ssrContext */ }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  // 全局守卫
  Router.beforeEach((to, from, next) => {
    if (to.meta.requiredLogin && !store.state.Login.token.isLogin) {
      // 要求登录，且登录状态为false进入login页面
      next({ name: 'Login' })
    } else if (to.meta.redirectAlreadyLogin && store.state.Login.token.isLogin) {
      // 要求已经登录，且登录状态为true进入主页，针对登录以后不再显示登录页面
      next({ name: 'Operation' })
    } else {
      next()
    }
  })
  return Router
}
