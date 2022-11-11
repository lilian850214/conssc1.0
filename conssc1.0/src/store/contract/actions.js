import axios from 'axios'
import qs from 'qs'
/*
* 合同列表
* */
// 带查询请求
export function contractModuleDataAction (store, data) {
  axios.post('api/contract', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('contractModuleDataMutation', response.data)
  })
}
export function moduleDataAction (store, data) {
  axios.post('api/test', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('contractModuleDataMutation', response.data)
  })
}
// 不带查询请求
export function contractModuleDataWithoutQueryAction (store) {
  axios.post('api/contractAll').then((response) => {
    store.commit('contractModuleDataWithoutQueryMutation', response.data)
  })
}
// 查询付款明细
export function detailForContractAction (store, data) {
  axios.post('api/detailForContract', qs.stringify(data)).then((response) => {
    store.commit('detailForContractMutation', response.data)
  })
}
// 修改
export function contractSendEditedAction (store, modifiedData) {
  store.commit('contractSendEditedMutation', 99)
  axios.post('api/contractUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('contractSendEditedMutation', 1)
    } else {
      store.commit('contractSendEditedMutation', 0)
    }
  })
}
// 新增数据
export function contractNewDateAction (store, newDateData) {
  store.commit('contractAddNewMutation', 99)
  axios.post('api/contractNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data !== 0) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('contractAddNewMutation', 1)
    } else {
      store.commit('contractAddNewMutation', 0)
    }
  })
}
// 删除数据
export function contractTrashDataAction (store, autoId) {
  store.commit('contractTrashMutation', 99)
  axios.post('api/contractTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('contractTrashMutation', 1)
    } else {
      store.commit('contractTrashMutation', 0)
    }
  })
}

/* 合同中交易方列表查询 */
export function counterpartySelectAction (store, data) {
  axios.post('api/counterparty', qs.stringify(data)).then((response) => {
    store.commit('counterpartySelectMutation', response.data)
  })
}
