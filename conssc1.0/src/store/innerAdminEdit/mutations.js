export function moduleDataMutation (state, data) {
  state.moduleList = data.records
  // state.pagination.rowsNumber = data.totalNum
  state.pageSize = data.totalPages
  state.Page = data.currentPage
}
export function sendDetailMutation (state, data) {
  state.sendRes = data
}
export function setRowsPerPageMutation (state, data) {
  state.pagination.rowsPerPage = parseInt(data)
}
export function setCurrentPageMutation (state, data) {
  state.pagination.page = data
}
