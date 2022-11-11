import axios from 'axios'
import qs from 'qs'
/*
* 差旅报销申请
* */
// 新增差旅数据
export function travelNewDataAction (store, travelData) {
  // store.commit('travelNewDateMutation', 99)
  store.commit('travelFeeDataMutation', travelData.travelApplyData)
  axios.post('api/travelNewDate', qs.stringify(travelData.travelApplyData))
    .then((response) => {
      // 后台返回id后在前端插入travelId再次向后台提交差旅明细数据
      if (response.data !== false) {
        const travelId = response.data
        for (let i = 0; i < travelData.openedFeeData.length; i++) {
          travelData.openedFeeData[i].travelId = travelId
        }
        store.commit('travelFeeDetailDataMutation', travelData.openedFeeData)
        axios.post('api/travelDetailNewDate', travelData.openedFeeData).then((response) => {
          if (response.data !== []) {
            store.commit('travelFalseListMutation', response.data)
          }
        })
      }
    })
}
// 补充提交修改后的数据
export function resendTraveldetailDataAction (store, travelDetailData) {
  axios.post('api/travelDetailNewDate', travelDetailData).then((response) => {
    if (response.data !== []) {
      store.commit('travelFalseListMutation', response.data)
    }
  })
}
/*
* 差旅报销进度查询
* */
