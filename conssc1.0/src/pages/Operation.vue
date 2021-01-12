<template>
  <div class="q-pa-lg">
  </div>
</template>

<script>
// import { getAge } from '../util/CustomCal'
export default {
  name: 'Operation',
  components: { },
  data () {
    return {
      res: ''
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
    // const data = { name: 'sadmin', pwd: '111111' }
    this.$axios.post('http://localhost:8888/login', {
      name: 'sadmin',
      pwd: '111111'
    }).then((response) => {
      this.res = response.data
    }
    )
  }
}
</script>

<style lang="sass">
</style>
