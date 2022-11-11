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
    pageSize: 0,
    pieAuthChart:
      {

        title: {
          text: '审查中专利数',
          left: '3%',
          top: '30px'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
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
    pieChart:
      {

        title: {
          text: '授权专利数',
          left: '3%',
          top: '30px'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
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
      }

  }
}
