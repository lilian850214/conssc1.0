<template>
  <div class="q-pa-none" style="max-width: 300px">
    <q-card class="bg-grey-3" square>
      <q-card-section>
        <div class="text-h5">刘玲玲</div>
        <div class="text-subtitle2 text-right">运营部</div>
        <div class="text-subtitle2 text-right">运营经理</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <q-btn flat label="待我审批">
          <q-badge color="red" align="middle" class="q-ml-sm">
          22
        </q-badge></q-btn>
        <q-btn flat>个人信息</q-btn>
      </q-card-actions>
    </q-card>
    <q-list   class="rounded-borders menu-list q-pt-lg"  :default-active="'/Operation'"  dense>
      <q-item clickable v-ripple to="/Operation" active-class="bg-lime-2 text-dark" >
      <q-item-section avatar>
        <q-icon name="fas fa-clipboard" ></q-icon>
      </q-item-section>
      <q-item-section class="text-h6 q-pl-none">
        运营看板
      </q-item-section>
    </q-item>
      <q-item clickable v-ripple to="/OrgChart" active-class="bg-lime-2 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-sitemap" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          组织 AND 权限
        </q-item-section>
      </q-item>
      <q-expansion-item
        expand-separator
        icon="fas fa-users"
        label="行政人事"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/PersonalInfo" active-class="bg-lime-2 text-dark">
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            个人信息
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/UserList"  active-class="bg-lime-2 text-dark">
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            员工列表
          </q-card-section>
        </q-item>

        <q-item clickable dense  to="/HrTest" active-class="bg-lime-2 text-dark" >
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
        <q-item clickable dense  to="/ProjectBoard" active-class="bg-lime-2 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            项目看板
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/ProjectAnalysis" active-class="bg-lime-2 text-dark"  >
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
        <q-item clickable dense to="/FinCash" active-class="bg-lime-2 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            资金流转
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/FinAnalysis" active-class="bg-lime-2 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            财务分析
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item
        icon="fas fa-warehouse"
        label="仓库管理"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/ProductHouseware" active-class="bg-lime-2 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            产品仓库
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/AdminHouseware" active-class="bg-lime-2 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            行政仓库
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-item clickable v-ripple to="/InnerAdmin" active-class="bg-lime-2 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-key" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          模块修改
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Patent" active-class="bg-lime-2 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-file-powerpoint" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          专利信息
        </q-item-section>
      </q-item>
 </q-list>
  </div>
</template>

<script>
export default {
  name: 'mainmenu',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
  .menu-list .q-item
    border-radius: 0 32px 32px 0
</style>
