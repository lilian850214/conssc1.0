import axios from 'axios'
import qs from 'qs'

/*
* 表格中查询模块数据，带查询请求
* */
export function moduleDataAction (store, data) {
  axios.post('api/projectPlan', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('moduleDataMutation', response.data)
  })
}
/*
* 修改模块数据
* */
export function sendEditedAction (store, modifiedData) {
  store.commit('sendEditedMutation', 99)
  axios.post('api/projectPlanUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('sendEditedMutation', 1)
    } else {
      store.commit('sendEditedMutation', 0)
    }
  })
}
/*
* 新增数据
* */
export function newDateAction (store, newDateData) {
  store.commit('addNewMutation', 99)
  axios.post('api/projectPlanNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data !== 0) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('addNewMutation', 1)
    } else {
      store.commit('addNewMutation', 0)
    }
  })
}
/*
* 删除数据
* */
export function trashDataAction (store, autoId) {
  store.commit('trashMutation', 99)
  axios.post('api/projectPlanTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('trashMutation', 1)
    } else {
      store.commit('trashMutation', 0)
    }
  })
}
