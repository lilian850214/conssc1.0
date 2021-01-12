<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="row">
      <div class="col-md-4 col-xs-12">
        <q-card class="my-card" flat>
        <q-card-actions align="around">
          <q-btn flat>新增部门</q-btn>
          <q-btn flat>新增岗位</q-btn>
        </q-card-actions>
        <q-separator />
        <q-card-section class="text-subtitle2">
          <template>
            <q-tree
              :nodes="treeData"
              node-key="roleId"
              label-key="name"
              no-connectors
              selected-color="red"
              :selected.sync="selected"
              default-expand-all
              @update:selected ="getPermissions"
            >
            </q-tree>
          </template>
        </q-card-section>
      </q-card></div>
      <div class="flex-break"></div>
      <permission-set></permission-set>
    </div>
  </div>
</template>

<script>

import PermissionSet from './PermissionSet'
export default {
  name: 'OrgTree',
  components: { PermissionSet },
  data () {
    return {
      selected: null,
      treeData: this.$store.state.OrgChart.orgChartData
    }
  },
  mounted () {
    // 进入action进行异步请求
  },
  beforeCreate () {
    // todo 当岗位数据改变时使得orgChartData为空
    if (this.$store.state.OrgChart.orgChartData.length === 0) {
      this.$store.dispatch('OrgChart/treeDataAction')
    }
  },
  methods: {
    getPermissions (rolesId) {
      console.log('点击了')
      this.$store.dispatch('OrgChart/permissionDataAction', rolesId)
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 250px
</style>
