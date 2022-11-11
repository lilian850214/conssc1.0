/* 获取最近的所属部门名称 */
export function getDept (val, arrayData) {
  // 找出传入roleId在架构中的对应条目
  var targetPos = arrayData.find(item => item.roleId === val)
  if (targetPos === undefined) {
    return ''
  } else {
    var targetPPos = getParent(targetPos, arrayData)
    if (targetPPos !== undefined) {
      if (targetPPos.deptFlag !== '1') {
        targetPPos = getParent(targetPPos, arrayData)
      }
    }
  };
  return targetPPos
}
function getParent (val, arrayData) {
  return arrayData.find(item => item.roleId === val.pId)
}
export function getChildList (val, arrayData) {
  list = []
  getChild(val, arrayData)
  return list
}
var list = []
function getChild (val, arrayData) {
  var targetPos = arrayData.filter(item => item.pId === val)
  if (targetPos.length > 0) {
    targetPos.forEach(function (item) {
      list.push(item.roleId)
      getChild(item.roleId, arrayData, list)
    })
  }
}
