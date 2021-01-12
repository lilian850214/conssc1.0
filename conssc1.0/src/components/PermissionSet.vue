<template>
  <div class="col-md-8 col-xs-12">
    <q-card class="my-card" flat >
      <template>
        <div class="q-pa-md">
          <q-table
            title="权限设置"
            :data="this.$store.state.OrgChart.orgChartSeleced"
            :columns="columns"
            row-key="permissionCode"
          />
        </div>
      </template>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PermissionSet',
  data () {
    return {
      columns: [
        {
          name: 'permissionCode',
          required: true,
          label: '权限名称',
          align: 'left',
          field: 'permissionCode'
        },
        {
          name: 'roleId',
          required: true,
          label: '权限开通',
          align: 'left',
          field: 'roleId'
        },
        {
          name: 'permissionId',
          required: true,
          label: '权限编号',
          align: 'left',
          field: 'permissionId'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
