export function TreeDataMutation (state, data) {
  state.orgChartData = data
}
export function orgNodeDetailMutation (state, data) {
  if (data.posJd === '99') {
    // 点击的是部门节点
    state.selectedNodeDetail = {}
    state.activeTab = 'deptDescription'
  } else {
    // 否则显示岗位tab
    state.selectedNodeDetail = data.posJd
    state.activeTab = 'posDescription'
  }
  state.parentNode = data.deptJd
}

export function addNewNodeMutation (state, data) {
  if (data === true) { state.addNewNodeRes = 1 } else { state.addNewNodeRes = 99 }
}
export function trashNodeMutation (state, data) {
  if (data === true) { state.trashNodeRes = 1 } else { state.trashNodeRes = 99 }
}
export function updateNodeMutation (state, data) {
  if (data === true) { state.updateNodeRes = 1 } else { state.updateNodeRes = 99 }
}
// 岗位任职者列表
export function allPosUserMutation (state, data) {
  if (data.length !== 0) { state.allPosUser = data } else { state.allPosUser = [] }
}
// 点击的部门所属任职者列表
export function allDeptUserMutation (state, data) {
  if (data.length !== 0) { state.allDeptUser = data } else { state.allDeptUser = [] }
}
export function editDeptJdMutation (state, data) {
  state.parentNode.roleJd = data
}
export function editPosJdMutation (state, data) {
  state.selectedNodeDetail.roleJd = data
}
