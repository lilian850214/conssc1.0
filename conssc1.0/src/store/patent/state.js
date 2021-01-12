export default function () {
  return {
    patentList: [],
    sendEditedRes: 99,
    addNewRes: 99,
    pagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 10, // 每页几行
      rowsNumber: 20
    },
    pagesNumber: 1,
    pageSize: 0
  }
}
