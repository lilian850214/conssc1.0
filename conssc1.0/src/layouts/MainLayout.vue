<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class=" text-dark" height-hint="98" style="background: linear-gradient(145deg,#DCE35B 15%,#45B649 75%)">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <q-avatar square>
            <img src="../assets/sc.png">
          </q-avatar>
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
      <!-- drawer content -->
      <mainmenu></mainmenu>
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
    console.log('before')
  }
}
</script>
