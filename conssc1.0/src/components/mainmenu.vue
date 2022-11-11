<template>
  <div class="q-pa-none" style="max-width: 250px">
    <q-card class="bg-grey-2" square flat>
      <q-card-section>
        <div class="text-h6 text-bold text-left block">
          <p >Hello, {{token.userDetail.realName}} </p>
          <p >
            {{token.userDetail.posId| deptName(orgList)}}
            <q-icon name="link" class="q-mr-sm q-ml-sm" size="25px"/>{{token.userDetail.posId| actualOrgName(orgList)}}</p>
        </div>
      </q-card-section>
    </q-card>
    <q-list   class="rounded-borders menu-list q-mt-lg"  :default-active="'/Operation'"  dense>
      <q-item clickable v-ripple  to="/Operation" active-class="bg-grey-4 text-dark" >
      <q-item-section avatar>
        <q-icon name="fas fa-clipboard" ></q-icon>
      </q-item-section>
      <q-item-section class="text-h6 q-pl-none">
        运营看板
      </q-item-section>
    </q-item>
      <q-item clickable v-ripple to="/MyForm" active-class="bg-grey-4 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-clipboard" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          我的申请
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/OrgTree" active-class="bg-grey-4 text-dark">
        <q-item-section avatar>
          <q-icon name="fas fa-sitemap" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          组织 与 权限
        </q-item-section>
      </q-item>
      <q-expansion-item
        icon="fas fa-users"
        label="行政人事"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/Notice"  active-class="bg-grey-4 text-dark">
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            通知公告
          </q-card-section>
        </q-item>
        <q-item clickable dense :to="{name:'PersonalInfo',params:{userDetailId:token.userDetail.userDetailId}}" active-class="bg-grey-4 text-dark">
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            个人信息
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/UserList"  active-class="bg-grey-4 text-dark">
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            员工列表
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/UserContract"  active-class="bg-grey-4 text-dark">
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            劳动合同
          </q-card-section>
        </q-item>
        <q-item clickable dense  to="/HrTest" active-class="bg-grey-4 text-dark" >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            人事测评
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item
        icon="fas fa-truck"
        label="项目研发"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense  to="/ProjectList" active-class="bg-grey-4 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            项目列表
          </q-card-section>
        </q-item>
        <q-item clickable dense  :to="{name:'ProjectBoard',params:{autoId:null,projectName:null}}" active-class="bg-purple-2 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            项目看板
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/ProjectAnalysis" active-class="bg-grey-4 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            项目分析
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item
        icon="fas fa-hand-holding-usd"
        label="财务中心"
        default-opened
        header-class="text-h6"
      >
        <q-item clickable dense to="/Contract" active-class="bg-grey-4 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            合同管理
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/FinCash" active-class="bg-grey-4 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            资金流转
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/FinAnalysis" active-class="bg-grey-4 text-dark"  >
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
        <q-item clickable dense to="/ProductHouseware" active-class="bg-grey-4 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            产品仓库
          </q-card-section>
        </q-item>
        <q-item clickable dense to="/AdminHouseware" active-class="bg-grey-4 text-dark"  >
          <q-item-section avatar>
            <q-icon></q-icon>
          </q-item-section>
          <q-card-section class="text-subtitle1 q-pa-xs q-pl-lg">
            行政仓库
          </q-card-section>
        </q-item>
      </q-expansion-item>
      <q-item clickable v-ripple to="/InnerAdmin" active-class="bg-grey-4 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-key" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          模块修改
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Patent" active-class="bg-grey-4 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-file-powerpoint" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          专利信息
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/InterAdmin" active-class="bg-grey-4 text-dark" >
        <q-item-section avatar>
          <q-icon name="fas fa-file-powerpoint" ></q-icon>
        </q-item-section>
        <q-item-section class="text-h6 q-pl-none">
          后台管理
        </q-item-section>
      </q-item>
 </q-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'mainmenu',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('Login',
      ['token']),
    ...mapState('PubRes',
      [
        'orgList'
      ]
    )
  },
  methods: {
    ...mapActions('Login',
      ['loginOutAction']),
    ...mapMutations('Login',
      ['loginOutMutation']),
    loginOut () {
      this.loginOutAction()
      sessionStorage.clear()
      this.$router.push('/login')
      // 想清空vuex中的数据，让页面重新加载
      window.location.reload()
    },
    changePwd () {
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
