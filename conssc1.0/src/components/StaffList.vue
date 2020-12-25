<template>
  <div>
  <q-btn label="userlist" push @click="myclick"></q-btn>
  <q-table
    class="my-sticky-column-table"
    title="员工列表"
    dense
    :data="res2"
    :columns="columns"
    row-key="name"
  />
  </div>
</template>

<script>
export default {
  name: 'StaffList',
  data () {
    return {
      res2: ''
      // columns: [
      //   {
      //     name: 'realname',
      //     label: '姓名',
      //     field: 'realname'
      //   },
      //   {
      //     name: 'userId',
      //     label: '用户id',
      //     field: 'userId'
      //   },
      //   {
      //     name: 'birthday',
      //     label: '出生日期',
      //     field: 'birthday',
      //     format: val => getAge(val)
      //   }
      // ]
    }
  },
  mounted () {
  },
  methods: {
    myclick: function () {
      this.$axios
        .post('http://localhost:8888/userlist')
        .catch((error) => {
          this.res2 = error.message
          console.log(error.response.message)
        })
        .then((response) => {
          this.res2 = response.data
        })
    }
  }
}
</script>

<style lang="sass">
  .my-sticky-column-table
    /* specifying max-width so the example can
      highlight the sticky column on any browser window */
    max-width: 1000px

    thead tr:first-child th:first-child
      /* bg color is important for th; just specify one */
      background-color: #e6e6e6

    td:first-child
      background-color: #dcffcc

    th:first-child,
    td:first-child
      position: sticky
      left: 0
      z-index: 1

    tr:hover
      background-color: #dcffcc
</style>
