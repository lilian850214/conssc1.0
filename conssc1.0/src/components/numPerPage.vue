<template>
    <div>
      <span class="q-pa-lg text-subtitle2">每页显示</span>
      <q-radio v-model="rowsPerPage" val=10 label="10" color="lime-7" size="md"/>
      <q-radio v-model="rowsPerPage" val=20 label="20" color="lime-7" size="md"/>
      <q-radio v-model="rowsPerPage" val=30 label="30" color="lime-7" size="md"/>
      <q-radio v-model="rowsPerPage" val=0 label="所有" color="lime-7" size="md"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'numPerPage',
  data () {
    return {
      rowsPerPage: '10'
    }
  },
  computed: {
    ...mapState('Operation',
      [
        'cashPagination'
      ])
  },
  created () {
    this.getCashPaginationRowsPerPage(this.cashPagination.rowsPerPage)
  },
  methods: {
    getCashPaginationRowsPerPage (val) {
      switch (val) {
        case 10:
          this.rowsPerPage = '10'
          break
        case 20:
          this.rowsPerPage = '20'
          break
        case 30:
          this.rowsPerPage = '30'
          break
        case 0:
          this.rowsPerPage = '0'
          break
      }
    }
  },
  watch: {
    rowsPerPage (val) {
      console.log(val)
      this.$emit('sendRowsPerPage', this.rowsPerPage)
    }
  }
}
</script>

<style scoped>

</style>
