<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="text-dark  bg-grey-3" height-hint="86">
      <q-toolbar>
        <q-btn dense flat round icon="arrow_left" @click="left = !left"  color="blue" size="20px"></q-btn>
        <q-toolbar-title class="text-left">
          <span class="text-bold">长春一东离合器股份有限公司苏州研发中心</span>
        </q-toolbar-title>
        <div>
          <q-btn flat @click="loginOut" >退出登录</q-btn>
          <q-btn flat @click="changePwd()">修改密码</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer  show-if-above  v-model="left" side="left" :width="250" bordered>
      <q-scroll-area class="fit">
      <!-- drawer content -->
      <mainmenu></mainmenu>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-grey-6 bg-white " style="height:30px;">
      <div class="q-pt-xs text-center " >CONSSC @ {{new Date().getFullYear()}}</div>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapMutations } from 'vuex'
import mainmenu from 'components/mainmenu'
export default {
  name: 'MainLayout',
  components: {
    mainmenu
  },
  data () {
    return {
      left: false,
      token: {
        isLogin: false,
        message: '',
        username: '',
        userRealName: '',
        userTitle: ''
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    ...mapMutations('Login',
      [
        'loginMutation'
      ]),
    loginOut () {
      this.loginMutation(this.token)
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="sass">
// 文档阴影装饰
.doc-card-title
  margin-left: -28px
  padding:  5px 10px 5px 24px
  background: #e0e0e0
  color: black
  position: relative
  border-radius: 3px 5px 5px 0
  &:after
    content: ""
    position: absolute
    top: 100%
    left: 0%
    width: 0
    height: 0
    border: 0 solid transparent
    border-top-color: #bebebe
    border-width:  9px 0 0 11px
  .sticky-td
    position: sticky!important
    left: 0
    z-index: 1
    font-size: 18px!important
  .chart
    min-height: 300px
    min-width: 380px
  .inputLabel
    width: 75px
    text-align-last: justify
    font-size: 14px
    background-color: #eee
    padding: 6px 6px
  .inputLabel-nobg
    width: 75px
    text-align-last: justify
    font-size: 14px
    padding: 6px 6px 0px 6px
  .iconPos
    margin-top: -3px!important
</style>
<style  lang="sass" media="screen">
  .border-left
    border-left: 1px solid
  .border-right
    border-right: 1px solid
  .border-top
    border-top: 1px solid
  .border-bottom
    border-bottom: 1px solid
  .border-all
    border-top: 1px solid
    border-left: 1px solid
    border-right: 1px solid
  .print-only
    display: none
  .overflow-ellipsis
    max-width: 300px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
  .text-underline
    text-decoration: underline
</style>
<style  lang="sass" media="print">
  .print-only
    display: block
</style>
