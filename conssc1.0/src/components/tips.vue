<template>
    <div class="bg-green">
      <span class=" q-pl-lg text-green-5 text-weight-bolder text-subtitle1" v-if="tTip">添加成功</span>
      <span class="q-pl-lg text-red-5 text-weight-bolder" v-if="fTip">添加失败</span>asda
    </div>
</template>

<script>
import { tips } from './mixin/baseMixin'
export default {
  name: 'tips',
  mixins: [tips]
}

</script>

<style scoped>

</style>
