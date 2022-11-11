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
// 不带查询请求
export function cashModuleDataWithoutQueryAction (store) {
  axios.post('api/cashAll').then((response) => {
    store.commit('cashModuleDataWithoutQueryMutation', response.data)
  })
}
// 修改
export function cashSendEditedAction (store, modifiedData) {
  store.commit('cashSendEditedMutation', 99)
  axios.post('api/cashUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('cashSendEditedMutation', 1)
    } else {
      store.commit('cashSendEditedMutation', 0)
    }
  })
}
// 新增数据
export function cashNewDateAction (store, newDate) {
  store.commit('cashAddNewMutation', 99)
  axios.post('api/cashNewData', qs.stringify(newDate)).then((response) => {
    if (response.data !== 0) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('cashAddNewMutation', 1)
    } else {
      store.commit('cashAddNewMutation', 0)
    }
  })
}
// 删除数据
export function contractTrashDataAction (store, autoId) {
  store.commit('cashTrashMutation', 99)
  axios.post('api/cashTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('cashTrashMutation', 1)
    } else {
      store.commit('cashTrashMutation', 0)
    }
  })
}
// 查询合同信息以供选择
export function contractSelectAction (store, data) {
  axios.post('api/contract', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('cashModuleDataMutation', response.data)
  })
}
