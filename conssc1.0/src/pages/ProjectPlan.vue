<template>
  <div>
    <div style="max-width: 300px" class="q-ma-lg">
      <q-select v-model="model" :options="options" label="当前项目"  color="green-5" dense/>
    </div>
    <project-detail></project-detail>
  </div>
</template>

<script>
import ProjectDetail from '../components/projectDetail'
export default {
  name: 'ProjectBoard',
  components: { ProjectDetail }
}
</script>

<style scoped>

</style>
