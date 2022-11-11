import axios from 'axios'
import qs from 'qs'

/*
* 项目列表
* */

// 带查询请求
export function projectModuleDataAction (store, data) {
  axios.post('api/project', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('projectModuleDataMutation', response.data)
  })
}
// 不带查询请求
export function projectModuleDataWithoutQueryAction (store) {
  axios.post('api/projectAll').then((response) => {
    store.commit('projectModuleDataWithoutQueryMutation', response.data)
  })
}
// 查询只含有label和value的列表
export function projectForSelectAction (store) {
  axios.post('api/projectForSelect').then((response) => {
    store.commit('projectForSelectMutation', response.data)
  })
}
// 修改
export function projectSendEditedAction (store, modifiedData) {
  store.commit('projectSendEditedMutation', 99)
  axios.post('api/projectUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectSendEditedMutation', 1)
    } else {
      store.commit('projectSendEditedMutation', 0)
    }
  })
}
// 新增数据
export function projectNewDateAction (store, newDateData) {
  store.commit('projectAddNewMutation', 99)
  axios.post('api/projectNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data !== 0) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectAddNewMutation', 1)
    } else {
      store.commit('projectAddNewMutation', 0)
    }
  })
}
// 删除数据
export function projectTrashDataAction (store, autoId) {
  store.commit('projectTrashMutation', 99)
  axios.post('api/projectTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectTrashMutation', 1)
    } else {
      store.commit('projectTrashMutation', 0)
    }
  })
}
/*
* 单个项目的进度列表
* */
// 查询
export function projectPlanModuleDataAction (store, data) {
  axios.post('api/projectPlan', qs.stringify(data.pagination) + '&' + qs.stringify(data.queryData)).then((response) => {
    store.commit('projectPlanModuleDataMutation', response.data)
  })
}
// 修改
export function projectPlanSendEditedAction (store, modifiedData) {
  store.commit('projectPlanSendEditedMutation', 99)
  axios.post('api/projectPlanUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectPlanSendEditedMutation', 1)
    } else {
      store.commit('projectPlanSendEditedMutation', 0)
    }
  })
}
// 新增
export function projectPlanNewDateAction (store, newDateData) {
  axios.post('api/projectPlanNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data !== 0) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectPlanAddNewMutation', 1)
    } else {
      store.commit('projectPlanAddNewMutation', 0)
    }
  })
}
// 删除
export function projectPlanTrashDataAction (store, autoId) {
  store.commit('projectPlanTrashMutation', 99)
  axios.post('api/projectPlanTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectPlanTrashMutation', 1)
    } else {
      store.commit('projectPlanTrashMutation', 0)
    }
  })
}

/*
* 单个项目单进度列表
* */
// 查询
export function projectDetailModuleDataAction (store, data) {
  axios.post('api/projectPlanDetailList', qs.stringify(data)).then((response) => {
    store.commit('projectDetailModuleDataMutation', response.data)
  })
}
// 修改
export function projectDetailSendEditedAction (store, modifiedData) {
  // 发送编辑状态初始化
  store.commit('projectDetailSendEditedMutation', 99)
  axios.post('api/projectPlanDetailListUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectDetailSendEditedMutation', 1)
    } else {
      store.commit('projectDetailSendEditedMutation', 0)
    }
  })
}
// 新增
export function projectDetailNewDateAction (store, newDateData) {
  store.commit('projectDetailAddNewMutation', 99)
  axios.post('api/projectPlanDetailListNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data === false || response.status === 500) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectDetailAddNewMutation', 0)
    } else {
      store.commit('projectDetailAddNewMutation', 1)
    }
  })
}
// 删除
export function projectDetailTrashDataAction (store, autoId) {
  store.commit('projectDetailTrashMutation', 99)
  axios.post('api/projectPlanDetailListTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectDetailTrashMutation', 1)
    } else {
      store.commit('projectDetailTrashMutation', 0)
    }
  })
}

/*
* 单个项目单进度列表详细内容
* */
// 查询
export function projectDetailContentModuleDataAction (store, data) {
  axios.post('api/projectPlanDetailContent', qs.stringify(data)).then((response) => {
    store.commit('projectDetailContentMutation', response.data)
  })
}
// 新增
export function projectDetailContentNewDateAction (store, newDateData) {
  store.commit('projectDetailContentAddNewMutation', 99)
  axios.post('api/projectPlanDetailContentNewData', qs.stringify(newDateData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectDetailContentAddNewMutation', 1)
    } else {
      store.commit('projectDetailContentAddNewMutation', 0)
    }
  })
}
// 删除
export function projectPlanDetailContentTrashDataAction (store, autoId) {
  store.commit('projectPlanDetailContentTrashMutation', 99)
  axios.post('api/projectPlanDetailContentTrashData', qs.stringify(autoId)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectPlanDetailContentTrashMutation', 1)
    } else {
      store.commit('projectPlanDetailContentTrashMutation', 0)
    }
  })
}
// 修改
export function projectPlanDetailContentSendEditedAction (store, modifiedData) {
  // 发送编辑状态初始化
  store.commit('projectPlanDetailContentSendEditedMutation', 99)
  axios.post('api/projectPlanDetailContentUpdate', qs.stringify(modifiedData)).then((response) => {
    if (response.data === true) {
      // 设置修改状态sendRes为1，0。1为成功，0为失败
      store.commit('projectPlanDetailContentSendEditedMutation', 1)
    } else {
      store.commit('projectPlanDetailContentSendEditedMutation', 0)
    }
  })
}
