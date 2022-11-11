export function moduleDataMutation (state, data) {
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
export function patentChartMutation (state, data) {
  state.pieChart.series[0].data = data.all
  state.pieAuthChart.series[0].data = data.auth
}
