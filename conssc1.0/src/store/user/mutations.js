/* 员工列表 */
export function userListModuleDataMutation (state, data) {
  state.userListInfo = data.records
  state.userListPageSize = data.totalPages
  state.userListPagination.page = data.currentPage
}

export function userListDetailDataMutation (state, data) {
  state.userDetailInfo = data.personalInfo
  state.tbUserInfo = data.personalUserInfo
  state.userDetailDirectPPos = data.directPPos
  state.orgNameList = data.orgNameList
  state.userEduHisInfo = data.userEduHisInfo
  state.userJobHisInfo = data.userJobHisInfo
  state.userTraHisInfo = data.userTraHisInfo
  state.userContractInfo = data.userContractList
}
export function userListSendEditedMutation (state, data) {
  state.userListSendEditedRes = data
}
export function userListAddNewMutation (state, data) {
  state.userListAddNewRes = data
}
export function userListTrashMutation (state, data) {
  state.userListTrashRes = data
}
export function userListSetRowsPerPageMutation (state, data) {
  state.userListPagination.rowsPerPage = parseInt(data)
  state.userListPagination.page = 1
}
export function userListSetCurrentPageMutation (state, data) {
  state.userListPagination.page = data
}
/* 选择岗位 */
export function setPosIdMutation (state, data) {
  state.setPosIdState = data
}
export function setEditUserNameUnique (state, data) {
  state.editUserNameUniqueRes = data
}
/* 图表区域 */
export function ChartMutation (state, data) {
  state.ageChart.dataset.source = data.ageChart
  state.companyAgeChart.dataset.source = data.companyAgeChart
  state.educationChart.series[0].data = data.educationChart
  for (var i = 0; i < data.statusChart.length; i++) {
    switch (data.statusChart[i].name) {
      case '1':
        data.statusChart[i].name = '试用'
        break
      case '2':
        data.statusChart[i].name = '实习'
        break
      case '3':
        data.statusChart[i].name = '正式'
        break
      case '4':
        data.statusChart[i].name = '离职'
        break
    }
  }
  state.statusChart.series[0].data = data.statusChart
}
export function userDetailUpdateStateMutation (state, data) {
  state.userDetailUpdateState = data
}
/* 教育经历 */
export function userEduInfoMutation (state, data) {
  state.userEduHisInfo = data
}
/* 工作经历 */
export function userJobInfoMutation (state, data) {
  state.userJobHisInfo = data
}
/* 培训经历 */
export function userTraInfoMutation (state, data) {
  state.userTraHisInfo = data
}
/*
* 劳动合同页面
*
*
* */
export function userContractListMutation (state, data) {
  state.userContractInfo = data.records
  state.userContractInfoPageSize = data.totalPages
  state.userContractInfoPagination.page = data.currentPage
}
export function userListForContractMutation (state, data) {
  state.userListForContract = data
}
export function userContractListSetRowsPerPageMutation (state, data) {
  state.userContractInfoPagination.rowsPerPage = parseInt(data)
  state.userContractInfoPagination.page = 1
}
export function userContractListSetCurrentPageMutation (state, data) {
  state.userContractInfoPagination.page = data
}
export function userContractUpdateMutation (state, data) {
  state.userContractUpdateRes = data
}
export function userContractAddMutation (state, data) {
  state.userContractAddRes = data
}
export function userContractTrashMutation (state, data) {
  state.userContractTrashRes = data
}
export function userDetailUserUpdateStateMutation (state, data) {
  state.userDetailUserUpdateState = data
}
export function personalContractMutation (state, data) {
  state.personalContractList = data
}
