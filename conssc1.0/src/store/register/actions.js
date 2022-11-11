import axios from 'axios'
import qs from 'qs'
// 注册新公司
export function registerAction (store, data) {
  store.commit('registerMutation', null)
  axios.post('api/register', qs.stringify(data)).then((response) => {
    if (response.data !== '99') {
      // 返回新增用户实体类信息
      console.log(response.data)
      store.commit('newUserMutation', response.data)
      store.commit('registerMutation', 1)
    } else {
      store.commit('registerMutation', 99)
    }
  })
}
