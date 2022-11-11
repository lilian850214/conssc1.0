<template>
  <div class="bg-lime-2">
    <q-avatar square  size="33px" font-size="20px" color="lime-4" text-color="black" icon="fas fa-list-ol" style="margin-top:-8px"/>
    <span class=" q-ma-lg text-bold text-h6">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Ltitle'
}
</script>

<style scoped lang="sass">
</style>
