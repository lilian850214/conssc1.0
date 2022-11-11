import qs from 'qs'
import axios from 'axios'
/* 专利申请号是否唯一 */
export function isUnique (val) {
  return new Promise(function (resolve, reject) {
    axios.post('api/patentUnique', qs.stringify({ id: val })).then((response) => {
      if (response.data === false) {
        reject('申请号重复', response.data)
      } else {
        resolve(response.data + '成功了')
      }
    })
  })
}
/* 用户名是否唯一 */
export function userNameIsUnique (val) {
  return new Promise(function (resolve, reject) {
    axios.post('api/userNameUnique', qs.stringify({ userName: val })).then((response) => {
      if (response.data === false) {
        reject(response.data)
      } else {
        resolve(response.data)
      }
    })
  })
}
/* 直接上级不能为当前岗位 */
export function notSelf (val, selectedVal) {
  return val === selectedVal
}
