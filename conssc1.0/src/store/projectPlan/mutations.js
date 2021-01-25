export function moduleDataMutation (state, data) {
  state.projectPlanList = data.records
  state.pageSize = data.totalPages
  state.Page = data.currentPage
}
export function sendEditedMutation (state, data) {
  state.sendEditedRes = data
}
export function addNewMutation (state, data) {
  state.addNewRes = data
}
export function trashMutation (state, data) {
  state.trashRes = data
}
export function setRowsPerPageMutation (state, data) {
  state.pagination.rowsPerPage = parseInt(data)
  state.pagination.page = 1
}
export function setCurrentPageMutation (state, data) {
  state.pagination.page = data
}

export function setAutoIdMutation (state, data) {
  state.autoId = data
}
