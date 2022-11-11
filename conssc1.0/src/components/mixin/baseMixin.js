/* 分页 */
export const rowsPerPage = {
  data () {
    return {
      rowsPerPage: '10'
    }
  },
  methods: {
    /* 获取分页数字 */
    getRowsPerPage: function (val) {
      this.rowsPerPage = val
    }
  }
}
/* 新增drawer */
export const addDrawer = {
  data () {
    return {
      addDrawer: false
    }
  }
}
/* 提示信息tips */
export const tips = {
  data () {
    return {
      fTip: false
    }
  },
  methods: {
    /* 初始化信提示 */
    initTip () {
      this.fTip = false
    },
    updateTip (val) {
      // 监控变化之前要先重置Res为99，
      if (val !== 1) {
        this.fTip = true
      }
    }
  }
}
export const editDialog = {
  methods: {
    /* 获得行的信息赋予rowdata，准备向后台发送 */
    edit (props) {
      this.btnDisable = false
      this.initTip()
      this.editDialog = true
      this.rowData = Object.assign({}, props.row)
    }
  }
}

export const crud = {
  data () {
    /*
                    * currentPage，rowsPerPage表格分页初始化
                    * tbLoading 表格显示加载状态
                    * */
    return {
      currentPage: 1,
      rowsPerPage: null,
      tbLoading: false,
      addloading: false,
      loading: false,
      btnDisable: false
    }
  },
  methods: {
    resetData () {
      Object.keys(this.queryData).forEach(key => (this.queryData[key] = null))
      this.onRequest()
    }
  },
  watch: {
    // 数据列表发生变动
    dataList (val) {
      this.tbLoading = false
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.setRowsPerPageMutation(val)
      this.onRequest()
      this.currentPage = 1
    },
    // 翻页
    currentPage (val) {
      this.tbLoading = true
      this.setCurrentPageMutation(val)
      this.onRequest()
    }
  }
}

export const isNothing = {
  methods: {
    /* 获得行的信息赋予rowdata，准备向后台发送 */
    isNothing (val) {
      if (val === undefined || val === null || val === '' || val === {}) {
        return true
      } else {
        return false
      }
    }
  }
}
