export default function () {
  return {
    userListInfo: [],
    userListPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 20, // 每页几行
      rowsNumber: 20
    },
    userListPagesNumber: 1,
    userListPageSize: 0,
    /* 图表数据 */
    educationChart:
      {
        title: {
          text: '学历分布',
          subtext: '在职人员'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} 人 : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '2%',
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        label: {
          show: true
        }
      },
    statusChart:
      {
        title: {
          text: '人员状态',
          subtext: '所有人员'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} 人 : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '2%',
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        label: {
          show: true
        }
      },
    ageChart: {
      title: {
        text: '年龄分布',
        subtext: '在职人员'
      },
      grid: {
        top: '25%'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.value.res + '人'
        }
      },
      dataset: {
        dimensions: ['type', 'res'],
        source: []
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      series: [
        {
          type: 'bar'
        }
      ]
    },
    companyAgeChart: {
      title: {
        text: '在职年限',
        subtext: '在职人员'
      },
      grid: {
        top: '25%'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.value.res + '人'
        }
      },
      dataset: {
        dimensions: ['type', 'res'],
        source: []
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      series: [
        {
          type: 'bar'
        }
      ]
    },
    /* 新增用户 */
    userDetailInfo: null,
    userDetailDirectPPos: null,
    tbUserInfo: null,
    orgNameList: [],
    userListAddNewRes: null,
    editUserNameUniqueRes: null,
    /* 教育经历 */
    userEduHisInfo: [],
    /* 工作经历 */
    userJobHisInfo: [],
    /* 培训经历 */
    userTraHisInfo: [],
    /* 劳动合同 */
    userContractInfo: [],
    userListForContract: [],
    personalContractList: [],
    userContractInfoPagination: {
      sortBy: 'desc',
      descending: false,
      page: 1, // 第几页
      rowsPerPage: 20, // 每页几行
      rowsNumber: 20
    },
    userContractPagesNumber: 1,
    userContractInfoPageSize: 0,
    userContractUpdateRes: 99,
    userContractAddRes: 99,
    userContractTrashRes: 99,
    /* 调薪记录 */
    userPayrollInfo: [],
    userListSendEditedRes: null,
    userListTrashRes: false,
    userDetailUpdateState: null,
    userDetailUserUpdateState: null,
    setPosIdState: null
  }
}
