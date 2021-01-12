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
</style>
