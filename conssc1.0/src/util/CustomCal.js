export function getAge (val) {
  const age = new Date().getFullYear() - new Date(val).getFullYear()
  return age
}
