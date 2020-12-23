<template>
  <div class="q-pa-none" style="max-width: 350px">
    <q-list   class="rounded-borders" active-class="bg-teal-1 text-grey-8">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="fas fa-clipboard" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          运营看板
        </q-item-section>
      </q-item>
      <q-expansion-item
        expand-separator
        icon="fas fa-users"
        label="行政人事"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            个人信息
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            员工列表
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            人事测评
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="fas fa-truck"
        label="项目研发"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            项目看板
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            项目分析
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="fas fa-hand-holding-usd"
        label="财务中心"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            资金流转
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            财务分析
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="fas fa-warehouse"
        label="仓库管理"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            产品仓库
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/operation"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            行政仓库
          </q-card-section>
        </q-item>
      </q-expansion-item>
 </q-list>
  </div>
</template>

<script>
export default {
  name: 'mainmenu',
  data () {
    return {
      active: true
    }
  }
}
</script>

<style scoped>

</style>
