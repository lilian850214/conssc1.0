export default function () {
  return {
    orgList: [],
    /* 合同列表 */
    dataList: [],
    cashSendEditedRes: 99,
    cashAddNewRes: 99,
    cashTrashRes: 99,
    cashPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 10, // 每页几行
      // 必须有，否则翻页数据不渲染
      rowsNumber: null
    },
    // 分页组件所需数据
    cashPageSize: 0
  }
}
