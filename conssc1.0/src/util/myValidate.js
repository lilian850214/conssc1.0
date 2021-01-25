import qs from 'qs'
import axios from 'axios'
export function isUnique (val) {
  return new Promise(function (resolve, reject) {
    axios.post('api/patentUnique', qs.stringify({ id: val })).then((response) => {
      if (response.data === true) {
        reject('申请号重复', response.data)
      } else {
        resolve(response.data + '成功了')
      }
    })
  })
}
