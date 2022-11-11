import axios from 'axios'
import qs from 'qs'
// 获取树形结构组织架构
export function treeDataAction (store) {
  axios.post('api/org').then((response) => {
    store.commit('TreeDataMutation', response.data)
  })
}

// 新增一级职位
export function orgTreeNewDataAction (store, newData) {
  axios.post('api/orgTreeNewData', qs.stringify(newData)).then((response) => {
    if (response.data.res !== '99') {
      store.commit('TreeDataMutation', response.data.res)
    }
  })
}

/*
* 组织架构节点详情
*
* */
// 获取节点详情
export function orgNodeDetailAction (store, id) {
  axios.post('api/orgNodeDetail', qs.stringify({ id: id })).then((response) => {
    store.commit('orgNodeDetailMutation', response.data)
  })
}
// 选中部门下属岗位
export function allDeptUserAction (store, data) {
  axios.post('api/allDeptUser', data).then((response) => {
    store.commit('allDeptUserMutation', response.data)
  })
}
// 选中岗位所属员工花名册
export function allPosUserAction (store, data) {
  axios.post('api/allPosUser', qs.stringify({ roleId: data })).then((response) => {
    store.commit('allPosUserMutation', response.data)
  })
}
// 更新节点
export function updateNodeAction (store, data) {
  store.commit('updateNodeMutation', 99)
  axios.post('api/updateNode', qs.stringify(data)).then((response) => {
    store.commit('updateNodeMutation', response.data)
  })
}
// 新增一级节点以下节点
export function addNewNodeAction (store, data) {
  store.commit('addNewNodeMutation', 99)
  axios.post('api/addNewNode', qs.stringify(data)).then((response) => {
    store.commit('addNewNodeMutation', response.data)
  })
}
// 删除节点
export function trashNodeAction (store, data) {
  store.commit('trashNodeMutation', 99)
  axios.post('api/roleTrashData', qs.stringify({ id: data })).then((response) => {
    store.commit('trashNodeMutation', response.data)
  })
}
