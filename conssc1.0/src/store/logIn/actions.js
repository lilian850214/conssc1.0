import axios from 'axios'
import qs from 'qs'
export function loginAction (store, data) {
  axios.post('api/login', qs.stringify(data)).then((response) => {
    store.commit('loginMutation', response.data)
  })
}
export function loginOutAction () {
  axios.post('api/exit')
}
