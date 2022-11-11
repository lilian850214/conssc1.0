import axios from 'axios'
import qs from 'qs'

// 请求组织架构非树形
export function orgListDataWithoutTreeAction (store) {
  axios.post('api/orgList').then((response) => {
    store.commit('orgListDataMutation', response.data)
  })
}
// 修改密码
export function changeUserPwdAction (store, data) {
  axios.post('api/userUpdate', qs.stringify(data)).then((response) => {
    store.commit('changeUserPwdMutation', response.data)
  })
}
