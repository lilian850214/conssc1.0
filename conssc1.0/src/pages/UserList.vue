<template>
  <div class="q-pa-lg">
   <p> userlist</p>
  <staff-list></staff-list>
  </div>
</template>

<script>
import StaffList from '../components/StaffList'
export default {
  name: 'UserList',
  components: { StaffList }
}
</script>

<style scoped>

</style>
