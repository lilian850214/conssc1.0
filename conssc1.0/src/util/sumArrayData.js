export function sumString (val) {
  var j = ''
  for (var i = 0; i < val.length; i++) {
    j += val[i]
  }
  return j
}
export function sumInt (val) {
  var j = 0
  for (var i = 0; i < val.length; i++) {
    j += parseInt(val[i])
  }
  return j
}
export function sumIntArray (val) {
  var j = 0
  for (var i = 0; i < val.length; i++) {
    j += parseInt(val[i].num)
  }
  return j
}

export function sumIntArrayByType (typeData, data) {
  var res = []
  const type = []
  typeData.forEach(item => {
    type.push(item.value)
  })
  type.forEach(item => {
    res[item] = sumIntArray(
      data.filter(it => {
        return it.feeType === item
      })
    )
  })
  return res
}
