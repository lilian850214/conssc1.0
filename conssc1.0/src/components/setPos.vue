<template>
  <q-card flat square >
    <q-card-section>
        <q-tree
      :nodes="orgChartData"
      node-key="roleId"
      label-key="orgName"
      selected-color="purple"
      :selected.sync="posSelected"
    >
      <template v-slot:default-header="prop">
        <div class="text-subtitle2">
          <q-icon :name="prop.node.deptFlag==='1'?'fas fa-cube':'fas fa-address-card'"
                  :color="prop.node.deptFlag==='1'?'grey-8':(prop.node.roleId===posSelected?'purple-4':'grey-5')"
                  size="22px" class="q-mr-sm q-ml-sm" style="margin-top: -3px"/>
          <span :class="prop.node.roleId===posSelected?'bg-grey-3 text-h6 q-pa-sm text-bold':''">{{ prop.node.orgName }}</span>
        </div>
      </template>
    </q-tree>
    </q-card-section>
  </q-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'setPos',
  data: function () {
    return {
      posSelected: null,
      expandAll: false
    }
  },
  mounted () {
  },
  computed: {
    ...mapState('PubRes',
      [
        'orgList'
      ]
    ),
    ...mapState('OrgChart',
      [
        'orgChartData'
      ]
    )
  },
  methods: {
  },
  watch: {
    posSelected (val) {
      if (val !== null) {
        this.selectable = this.orgList.find(item => item.roleId === val)
        if (this.selectable !== null) {
          if (this.selectable.deptFlag === '1') {
            this.posSelected = null
          } else {
            this.$emit('getPid', this.posSelected)
          }
        }
      }
    }
  }
}

</script>

<style scoped>

</style>
