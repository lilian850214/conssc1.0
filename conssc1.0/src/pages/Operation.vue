<template>
    <div>
      <q-btn label="userlist" push @click="myclick"></q-btn>
      这是user list结果==》{{res2}}
     这是结果==》 {{res}}
    </div>
</template>

<script>
export default {
  name: 'Operation',
  data () {
    return {
      res: '',
      res2: '发送了'
    }
  },
  mounted () {
    // const data = { name: 'sadmin', pwd: '111111' }
    this.$axios.post('http://localhost:8888/login', { name: 'sadmin', pwd: '111111' }).then((response) => {
      this.res = response.data
    }
    )
  },
  methods: {
    myclick: function () {
      this.$axios.post('http://localhost:8888/user-detail').then((response) => {
        this.res2 = response
      }
      )
    }
  }
}
</script>

<style scoped>
</style>
