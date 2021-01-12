import axios from 'axios'
export function treeDataAction (store) {
  axios.post('api/org').then((response) => {
    store.commit('TreeDataMutation', response.data)
  })
}

export function permissionDataAction (store, rolesId) {
  axios.post('api/permissionSet', { rolesId: rolesId }).then((response) => {
    console.log('action中' + response.data)
    store.commit('permissionDataMutation', response.data)
  })
}
