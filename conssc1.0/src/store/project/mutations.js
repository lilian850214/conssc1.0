/* 项目列表 */
export function projectModuleDataMutation (state, data) {
  state.projectList = data.records
  state.projectPageSizePageSize = data.totalPages
  state.projectPagination.page = data.currentPage
}
export function projectModuleDataWithoutQueryMutation (state, data) {
  state.projectList = data
}
export function projectForSelectMutation (state, data) {
  state.projectForSelect = data
}
export function projectSendEditedMutation (state, data) {
  state.projectSendEditedRes = data
}
export function projectAddNewMutation (state, data) {
  state.projectAddNewRes = data
}
export function projectTrashMutation (state, data) {
  state.projectTrashRes = data
}
export function projectSetRowsPerPageMutation (state, data) {
  state.projectPagination.rowsPerPage = parseInt(data)
  state.projectPagination.page = 1
}
export function projectSetCurrentPageMutation (state, data) {
  state.projectPagination.page = data
}

/* 单个项目的进度列表 */
export function projectPlanModuleDataMutation (state, data) {
  state.projectPlanList = data.records
  state.projectPlanPageSize = data.totalPages
  state.projectPlanPage = data.currentPage
}
export function projectPlanSendEditedMutation (state, data) {
  state.projectPlanSendEditedRes = data
}
export function projectPlanAddNewMutation (state, data) {
  state.projectPlanAddNewRes = data
}
export function projectPlanTrashMutation (state, data) {
  state.projectPlanTrashRes = data
}
export function projectPlanSetRowsPerPageMutation (state, data) {
  state.projectPlanPagination.rowsPerPage = parseInt(data)
  state.projectPlanPagination.page = 1
}
export function projectPlanSetCurrentPageMutation (state, data) {
  state.projectPlanPagination.page = data
}

export function projectPlanSetProjectAutoIdMutation (state, data) {
  state.projectPlanProjectId = data
}

/* 单个项目单进度列表 */
export function projectDetailAddNewMutation (state, data) {
  state.projectDetailAddNewRes = data
}
export function projectDetailSendEditedMutation (state, data) {
  state.projectDetailSendEditedRes = data
}
export function projectDetailSetParentPlanAutoIdMutation (state, data) {
  state.projectDetailProjectPlanAutoId = data
}
export function projectDetailModuleDataMutation (state, data) {
  state.projectDetailList = data
}
export function projectDetailTrashMutation (state, data) {
  state.projectDetailTrashRes = data
}
/* 单个项目单进度列表详细内容 */
export function projectDetailContentParentInfoMutation (state, data) {
  if (data === null) {
    Object.keys(state.projectDetailContentParentInfo[0]).forEach(key => (state.projectDetailContentParentInfo[key] = null))
    state.projectDetailContent = []
  } else {
    const arr = []
    arr.push(data)
    state.projectDetailContentParentInfo = arr
  }
}
export function projectDetailContentMutation (state, data) {
  state.projectDetailContent = data
}
export function projectDetailContentAddNewMutation (state, data) {
  state.projectDetailAddNewContentRes = data
}
export function projectDetailContentListIdMutation (state, data) {
  state.projectDetailContentListId = data
}
export function projectPlanDetailContentTrashMutation (state, data) {
  state.projectDetailContentTrashRes = data
}
export function projectPlanDetailContentSendEditedMutation (state, data) {
  state.projectDetailSendEditedContentRes = data
}
