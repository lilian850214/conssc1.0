import axios from 'axios'
import qs from 'qs'
/*
* cash列表
* */
// 带查询请求
export function cashModuleDataAction (store, data) {
  axios.post('api/finCash', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('cashModuleDataMutation', response.data)
  })
}
