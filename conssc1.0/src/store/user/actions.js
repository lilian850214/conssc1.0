import axios from 'axios'
import qs from 'qs'

// 用户列表带查询请求
export function userListModuleDataAction (store, data) {
  console.log(data)
  axios.post('api/userlist', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('userListModuleDataMutation', response.data)
  })
}

// 查询单条员工信息
export function userListDetailDataAction (store, autoId) {
  axios.post('api/userlistDetail', qs.stringify({ userDetailId: autoId })).then((response) => {
    store.commit('userListDetailDataMutation', response.data)
  })
}
/* 修改用户详情 */
export function userListSendEditedAction (store, rowData) {
  store.commit('userDetailUpdateStateMutation', 99)
  axios.post('api/userDetailUpdate', qs.stringify(rowData)).then((response) => {
    if (response.data === true) {
      store.commit('userDetailUpdateStateMutation', 1)
    } else {
      store.commit('userDetailUpdateStateMutation', 0)
    }
  })
}
export function userDetailUserSendEditedAction (store, rowDataUser) {
  axios.post('api/userDetailUserUpdate', qs.stringify(rowDataUser)).then((response) => {
    if (response.data === true) {
      store.commit('userDetailUserUpdateStateMutation', 1)
    } else {
      store.commit('userDetailUserUpdateStateMutation', 99)
    }
  })
}
// 新增数据
export function userListNewDateAction (store, newDateData) {
  store.commit('userListAddNewMutation', 99)
  axios.post('api/userListNewData', qs.stringify(newDateData)).then((response) => {
    store.commit('userListAddNewMutation', response.data)
  })
}
// 删除数据
export function userListTrashDataAction (store, data) {
  store.commit('userListTrashMutation', '99')
  axios.post('api/userListTrashData', qs.stringify(data)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('userListTrashMutation', '1')
    } else {
      store.commit('userListTrashMutation', '0')
    }
  })
}
/*
* 获取图表数据
* */
export function userChartAction (store) {
  axios.post('api/userChart').then((response) => {
    store.commit('ChartMutation', response.data)
  })
}

/*
* 用户详情操作
* */

// 教育查询
export function queryUserEduInfoDateAction (store, data) {
  axios.post('api/queryUserEduHis', qs.stringify({ userDetailId: data })).then((response) => {
    store.commit('userEduInfoMutation', response.data)
  })
}
// 教育新增
export function userEduAddAction (store, newDateData) {
  axios.post('api/userEduHis', qs.stringify(newDateData)).then((response) => {
    if (response.data.res !== '99') {
      queryUserEduInfoDateAction(store, response.data.res)
    }
  })
}
// 教育删除
export function userEduHisTrashAction (store, data) {
  axios.post('api/userEduHisTrashData', qs.stringify({ autoId: data.autoId })).then((response) => {
    if (response.data === true) {
      queryUserEduInfoDateAction(store, data.userDetailId)
    }
  })
}
// 教育更新
export function userEduHisUpdateAction (store, modifiedData) {
  axios.post('api/userEduHisUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      queryUserEduInfoDateAction(store, modifiedData.userDetailId)
    }
  })
}

// 工作查询
export function queryUserJobInfoDateAction (store, data) {
  axios.post('api/queryUserJobHis', qs.stringify({ userDetailId: data })).then((response) => {
    store.commit('userJobInfoMutation', response.data)
  })
}
// 工作新增
export function userJobAddAction (store, newDateData) {
  axios.post('api/userJobHis', qs.stringify(newDateData)).then((response) => {
    if (response.data.res !== '99') {
      queryUserJobInfoDateAction(store, response.data.res)
    }
  })
}
// 工作删除
export function userJobHisTrashAction (store, data) {
  axios.post('api/userJobHisTrashData', qs.stringify({ autoId: data.autoId })).then((response) => {
    if (response.data === true) {
      queryUserJobInfoDateAction(store, data.userDetailId)
    }
  })
}
// 工作更新
export function userJobHisUpdateAction (store, modifiedData) {
  axios.post('api/userJobHisUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      queryUserJobInfoDateAction(store, modifiedData.userDetailId)
    }
  })
}

// 培训查询
export function queryUserTraInfoDateAction (store, data) {
  axios.post('api/queryUserTraHis', qs.stringify({ userDetailId: data })).then((response) => {
    store.commit('userTraInfoMutation', response.data)
  })
}
// 培训新增
export function userTraAddAction (store, newDateData) {
  axios.post('api/userTraHis', qs.stringify(newDateData)).then((response) => {
    if (response.data.res !== '99') {
      queryUserTraInfoDateAction(store, response.data.res)
    }
  })
}
// 培训删除
export function userTraHisTrashAction (store, data) {
  axios.post('api/userTraHisTrashData', qs.stringify({ autoId: data.autoId })).then((response) => {
    if (response.data === true) {
      queryUserTraInfoDateAction(store, data.userDetailId)
    }
  })
}
// 培训更新
export function userTraHisUpdateAction (store, modifiedData) {
  axios.post('api/userTraHisUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      queryUserTraInfoDateAction(store, modifiedData.userDetailId)
    }
  })
}
/*
*
* 劳动合同页面
*
*
* */

// 带查询请求
export function userContractListAction (store, data) {
  axios.post('api/userContractList', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('userContractListMutation', response.data)
  })
}
// userListForContract
export function userListForContractAction (store) {
  axios.post('api/userListForContract').then((response) => {
    store.commit('userListForContractMutation', response.data)
  })
}
export function personalContractAction (store, data) {
  axios.post('api/personalContract', qs.stringify(data)).then((response) => {
    store.commit('personalContractMutation', response.data)
  })
}
// 合同新增
export function userContractAddAction (store, newDateData) {
  store.commit('userContractAddMutation', '99')
  axios.post('api/userContractNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data === true) {
      store.commit('userContractAddMutation', '1')
    } else {
      store.commit('userContractAddMutation', '0')
    }
  })
}
// 合同删除
export function userContractTrashAction (store, data) {
  store.commit('userContractTrashMutation', 99)
  axios.post('api/userContractTrashData', qs.stringify({ autoId: data.autoId })).then((response) => {
    if (response.data === true) {
      store.commit('userContractTrashMutation', 1)
    } else {
      store.commit('userContractTrashMutation', 0)
    }
  })
}
// 合同更新
export function userContractUpdateAction (store, modifiedData) {
  store.commit('userContractUpdateMutation', 99)
  axios.post('api/userContractUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      store.commit('userContractUpdateMutation', 1)
    } else {
      store.commit('userContractUpdateMutation', 0)
    }
  })
}
/* 设置任职岗位 */
export function setPosIdAction (store, data) {
  store.commit('setPosIdMutation', null)
  axios.post('api/userDetailUpdate', qs.stringify(data)).then((response) => {
    if (response.data === true) {
      // 设置修改状态1为成功，0为失败
      store.commit('setPosIdMutation', 1)
    } else {
      store.commit('setPosIdMutation', 0)
    }
  })
}
/* 当修改用户名时，查询是否有重复 */
export function editUserNameUniqueAction (store, data) {
  store.commit('setEditUserNameUnique', null)
  axios.post('api/editUserNameUnique', qs.stringify(data)).then((response) => {
    if (response.data === true) {
      // 设置修改状态1为成功，0为失败
      store.commit('setEditUserNameUnique', 1)
    } else {
      store.commit('setEditUserNameUnique', 0)
    }
  })
}
