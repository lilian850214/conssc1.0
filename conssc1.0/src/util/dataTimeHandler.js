export function getAge (val) {
  const age = new Date().getFullYear() - new Date(val).getFullYear()
  return age
}
export function getDate (val) {
  const year = new Date(val).getFullYear()
  const month = new Date(val).getMonth()
  const day = new Date(val).getDate()
  return year + '-' + month + '-' + day
}

export function difDate (val) {
  const inputDate = new Date(val)
  var diffDate = Math.abs(inputDate - new Date()) / (1 * 24 * 60 * 60 * 1000)
  return diffDate
}
