/* 合同列表 */
export function cashModuleDataMutation (state, data) {
  state.dataList = data.records
  state.cashPageSize = data.totalPages
  state.cashPagination.page = data.currentPage
}
export function cashModuleDataWithoutQueryMutation (state, data) {
  state.dataList = data
}

export function cashSendEditedMutation (state, data) {
  state.cashSendEditedRes = data
}
export function cashAddNewMutation (state, data) {
  state.cashAddNewRes = data
}
export function cashTrashMutation (state, data) {
  state.cashTrashRes = data
}
export function setRowsPerPageMutation (state, data) {
  state.cashPagination.rowsPerPage = parseInt(data)
  state.cashPagination.page = 1
}
export function setCurrentPageMutation (state, data) {
  state.cashPagination.page = data
}
