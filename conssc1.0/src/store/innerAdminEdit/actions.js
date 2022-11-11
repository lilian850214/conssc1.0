import axios from 'axios'
import qs from 'qs'
// window.qs = qs
/*
* 表格中查询模块数据
* */
export function moduleDataAction (store, data) {
  console.log(data)
  axios.post('api/moduleData', qs.stringify(data)).then((response) => {
    store.commit('moduleDataMutation', response.data)
  })
}
/*
* 修改模块数据，发送至后台
* */
export function sendDetailAction (store, modifiedData) {
  axios.post('api/moduleDetailUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data > 0) {
      // 若修改成功，重新异步获取最新List
      moduleDataAction(store, this.state.InnerAdminEdit.pagination)
      store.commit('sendDetailMutation', 1)
    } else {
      store.commit('sendDetailMutation', 0)
    }
  })
}
