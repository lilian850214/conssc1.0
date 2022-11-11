export default function () {
  return {
    /* 项目列表 */
    projectList: [],
    projectForSelect: [],
    projectSendEditedRes: 99,
    projectAddNewRes: 99,
    projectTrashRes: 99,
    projectPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 10, // 每页几行
      rowsNumber: 20
    },
    projectPagesNumber: 1,
    projectPageSize: 0,

    /* 单个项目的进度列表 */
    projectPlanList: [],
    projectPlanProjectId: null,
    projectPlanSendEditedRes: 99,
    projectPlanAddNewRes: 99,
    projectPlanTrashRes: 99,
    projectPlanPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 10, // 每页几行
      rowsNumber: 20
    },
    projectPlanPagesNumber: 1,
    projectPlanPageSize: 0,

    /* 单个项目单进度列表 */
    projectDetailList: [],
    projectDetailContent: [],
    projectDetailProjectPlanAutoId: null,
    projectDetailContentListId: null,
    projectDetailSendEditedRes: 99,
    projectDetailSendEditedContentRes: 99,
    projectDetailAddNewRes: 99,
    projectDetailAddNewContentRes: 99,
    projectDetailTrashRes: 99,
    projectDetailContentTrashRes: 99,
    projectDetailContentParentInfo: [
      {
        autoId: null,
        planDetailListName: null,
        planStart: null,
        planEnd: null,
        personInCharge: null,
        planState: null

      }
    ]
  }
}
