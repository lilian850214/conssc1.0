/* 单独进入项目看版页面，用户选择项目后，从项目列表中对应筛选出用户选择的项目，显示在selected中 */
export function projectSelectedGetters (state, id) {
  return (id) => state.projectList.filter(item => item.autoId === id)
}
