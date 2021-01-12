export function moduleDataMutation (state, data) {
  // const newData = data.records
  // // 赋予index值
  // newData.forEach((row, index) => {
  //   row.index = index + 1
  // })
  state.patentList = data.records
  state.pageSize = data.totalPages
  state.Page = data.currentPage
}
export function sendEditedMutation (state, data) {
  state.sendEditedRes = data
}
export function addNewMutation (state, data) {
  state.addNewRes = data
}
export function setRowsPerPageMutation (state, data) {
  state.pagination.rowsPerPage = parseInt(data)
}
export function setCurrentPageMutation (state, data) {
  state.pagination.page = data
}
