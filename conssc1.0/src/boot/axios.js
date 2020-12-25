import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
/*
 *实现跨域请求时，每次ajax请求都是新的session，
 * 导致无法获取登录信息，所有的请求都被判定为未登陆。
 * 设置以下的参数
 */
axios.defaults.withCredentials = true
