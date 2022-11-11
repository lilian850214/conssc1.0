import Vue from 'vue'
import { getDept } from 'src/util/orgListHandler'

Vue.filter('money', function (val) {
  if (val === null || isNaN(val)) {
    val = 0
  }
  const sign = (val === (val = Math.abs(val)))
  val = Math.floor(val * 100 + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
  }

  return (((sign) ? '' : '-') + val + '.' + cents)
})
Vue.filter('actualOrgName', function (val, arrayData) {
  if (val === undefined || val === null || val === '') { return '' } else {
    const res = arrayData.find(item => item.roleId === val)
    if (res === undefined || null) {
      return '无'
    } else {
      return res.orgName
    }
  }
})
Vue.filter('deptName', function (val, arrayData) {
  if (val === null) {
    return ''
  } else {
    return getDept(val, arrayData).orgName
  }
})

Vue.filter('parentName', function (val, arrayData) {
  if (val === null) {
    return ''
  } else {
    var posRes = arrayData.find(item => item.roleId === val)
    if (posRes !== undefined) {
      return arrayData.find(item => item.roleId === posRes.pId).orgName
    } else {
      return ''
    }
  }
})

Vue.filter('workStatus', function (val) {
  var res = ''
  switch (val) {
    case '1':
      res = '试用'
      break
    case '2':
      res = '实习'
      break
    case '3':
      res = '正式'
      break
    case '4':
      res = '离职'
      break
    default:
      res = '未知'
  }
  return res
})
Vue.filter('contractStatus', function (val) {
  var res = ''
  switch (val) {
    case '1':
      res = '正常'
      break
    case '0':
      res = '解除'
      break
    case '2':
      res = '到期'
      break
    default:
      res = '未知'
  }
  return res
})

Vue.filter('contractPhase', function (val) {
  var res = ''
  switch (val) {
    case '1':
      res = '新签'
      break
    case '2':
      res = '续签'
      break
    default:
      res = '未知'
  }
  return res
})
Vue.filter('contractType', function (val) {
  var res = ''
  switch (val) {
    case '1':
      res = '固定期限'
      break
    case '2':
      res = '无固定期限'
      break
    case '3':
      res = '劳务合同'
      break
    case '4':
      res = '其他'
      break
    default:
      res = '未知'
  }
  return res
})
Vue.filter('userRealName', function (val, arrayData) {
  var res = arrayData.find(item => item.userDetailId === val)
  console.log(res)
  if (res === undefined) {
    return val
  } else {
    return res.realName
  }
})
