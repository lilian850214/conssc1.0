<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class=" text-dark" height-hint="98" style="background: linear-gradient(145deg,#DCE35B 15%,#45B649 75%)">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <q-avatar square>
            <img src="../assets/sc.png">
          </q-avatar>
          <q-btn push @click="login">登录</q-btn>
        </q-toolbar-title>
        <q-space ></q-space>
        <span class="text-h5">YSEC</span>
      </q-toolbar>

<!--      <q-tabs align="left">-->
<!--        <q-route-tab to="/page1" label="Page One" />-->
<!--        <q-route-tab to="/page2" label="Page Two" />-->
<!--        <q-route-tab to="/page3" label="Page Three" />-->
<!--      </q-tabs>-->
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
      <!-- drawer content -->
      <mainmenu></mainmenu>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-6 text-white" style="height:30px;">
         <div class="q-pa-sm text-center ">CONSSC @ {{new Date().getFullYear()}}</div>
    </q-footer>

  </q-layout>
</template>

<script>
import mainmenu from 'components/mainmenu'
export default {
  name: 'MainLayout',
  components: {
    mainmenu
  },
  data () {
    return {
      left: false
    }
  },
  mounted () {
  },
  methods: {
    login: function () {
      this.$axios.post('http://localhost:8888/login', {
        name: 'sadmin',
        pwd: '111111'
      }).then((response) => {
        this.res = response.data
      }
      )
    }
  }
}
</script>
<style lang="sass">
  .my-sticky-column-table
    /* specifying max-width so the example can
      highlight the sticky column on any browser window */
    /*max-width: 1000px*/
    font-size: 20px!important
    border-bottom: rgba(0, 0, 0, 0.12) solid 1px

    thead tr:first-child th:first-child
      /* bg color is important for th; just specify one */
      background-color: #ffffff

    td:first-child
      background-color: #f5f5f5
      font-size: 18px
      font-weight: bolder

    th:first-child,
    td:first-child
      position: sticky
      left: 0
      z-index: 1
    td:first-child
      border-left: rgba(0, 0, 0, 0.12) solid 1px
    td:last-child
      border-right: rgba(0, 0, 0, 0.12) solid 1px

    tr:hover
      background-color: #f5f5f5

    td
      font-size: 16px
</style>
