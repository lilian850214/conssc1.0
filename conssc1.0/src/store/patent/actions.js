import axios from 'axios'
import qs from 'qs'
// window.qs = qs
/*
* 表格中查询模块数据
* */
export function moduleDataAction (store, data) {
  axios.post('api/patent', qs.stringify(data)).then((response) => {
    store.commit('moduleDataMutation', response.data)
  })
}
/*
* 修改模块数据，发送至后台
* */
export function sendEditedAction (store, modifiedData) {
  axios.post('api/patentUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 若修改成功，重新异步获取最新List
      moduleDataAction(store, this.state.Patent.pagination)
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('sendEditedMutation', 1)
    } else {
      store.commit('sendEditedMutation', 0)
    }
  })
}
/*
* 新增数据，发送至后台
* */
export function newDateAction (store, newDateData) {
  axios.post('api/patentNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data !== 0) {
      // 若修改成功，重新异步获取最新List
      moduleDataAction(store, this.state.Patent.pagination)
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('addNewMutation', 1)
    } else {
      store.commit('addNewMutation', 0)
    }
  })
}
/*
* 删除数据，发送至后台
* */
export function trashDataAction (store, autoId) {
  axios.post('api/patentTrashData', qs.stringify(autoId)).then((response) => {
    moduleDataAction(store, this.state.Patent.pagination)
  })
}
