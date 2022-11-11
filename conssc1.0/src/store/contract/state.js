export default function () {
  return {
    /* 合同列表 */
    dataList: [],
    counterpartySelectList: [],
    costDetailList: [],
    contractSendEditedRes: 99,
    contractAddNewRes: 99,
    contractTrashRes: 99,
    contractPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 10, // 每页几行
      // 必须有，否则翻页数据不渲染
      rowsNumber: null
    },
    // 分页组件所需数据
    contractPageSize: 0
  }
}
