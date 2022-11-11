/* 合同列表 */
export function contractModuleDataMutation (state, data) {
  state.dataList = data.records
  state.contractPageSize = data.totalPages
  state.contractPagination.page = data.currentPage
}
export function contractModuleDataWithoutQueryMutation (state, data) {
  state.dataList = data
}
export function detailForContractMutation (state, data) {
  state.costDetailList = data
}
export function contractSendEditedMutation (state, data) {
  state.contractSendEditedRes = data
}
export function contractAddNewMutation (state, data) {
  state.contractAddNewRes = data
}
export function contractTrashMutation (state, data) {
  state.contractTrashRes = data
}
export function setRowsPerPageMutation (state, data) {
  state.contractPagination.rowsPerPage = parseInt(data)
  state.contractPagination.page = 1
}
export function setCurrentPageMutation (state, data) {
  state.contractPagination.page = data
}
export function counterpartySelectMutation (state, data) {
  state.counterpartySelectList = data
}
