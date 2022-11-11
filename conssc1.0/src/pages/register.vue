<template>
  <div class="fullscreen bg-white text-center q-pa-md flex flex-center">
    <div>
      <div>
        <span style="font-size: 15vh" class="text-green-4 text-bold">S</span>
        <span style="font-size: 10vh" class="text-lime-4 text-bold">S</span>
        <span style="font-size: 6vh" class="text-yellow-4 text-bold">C</span>
      </div>
      <div class="q-mt-xl">
        <q-input v-model.trim="newCompany.companyName" label="公司全称" dense color="green-4" class="q-mt-lg">
          <template v-slot:before>
            <q-avatar square color="green-4" text-color="white" icon="fas fa-user" size="lg"/>
          </template>
        </q-input>
        <q-input v-model.trim="newCompany.finId" label="公司税号" dense color="green-4" class="q-mt-lg">
          <template v-slot:before>
            <q-avatar square color="green-4" text-color="white" icon="fas fa-user" size="lg"/>
          </template>
        </q-input>
        <q-input v-model.trim="newCompany.adminUser" label="联系人" dense color="green-4" class="q-mt-lg">
          <template v-slot:before>
            <q-avatar square color="green-4" text-color="white" icon="fas fa-user" size="lg"/>
          </template>
        </q-input>
        <q-input v-model.trim="newCompany.adminPhone" label="联系号码" dense color="green-4" class="q-mt-lg">
          <template v-slot:before>
            <q-avatar square color="green-4" text-color="white" icon="fas fa-key" size="lg"/>
          </template>
        </q-input>

        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="green"
          unelevated
          label="注册"
          size="lg"
          @click="register()"
        />
      </div>
    </div>
    <!--注册成功后引导入登录页面-->
    <q-dialog v-model="goToLogin">
      <q-card>
        <q-card-section>
          <q-input v-model.trim="initPwd" label="设置密码" dense color="green-4" class="q-mt-lg">
            <template v-slot:before>
              <q-avatar square color="green-4" text-color="white" icon="fas fa-key" size="lg"/>
            </template>
          </q-input>
          <q-input v-model.trim="initPwdConfirm" label="确认密码" dense color="green-4" class="q-mt-lg">
            <template v-slot:before>
              <q-avatar square color="green-4" text-color="white" icon="fas fa-key" size="lg"/>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="去登陆" @click="goLogin()" :disable="initPwd===null"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    {{this.newCompany}}
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      newCompany: {
        orgId: '',
        companyName: '',
        finId: '',
        adminUser: '',
        adminPhone: ''
      },
      initPwd: null,
      initPwdConfirm: null,
      changePwdTips: '',
      goToLogin: false
    }
  },
  computed: {
    ...mapState('Register',
      [
        'registerResState',
        'newUserId'
      ]),
    ...mapState('PubRes',
      [
        'changeUserPwdResState'
      ])
  },
  methods: {
    ...mapActions('Register',
      [
        'registerAction'
      ]),
    ...mapActions('PubRes',
      [
        'changeUserPwdAction'
      ]),
    register () {
      this.registerAction(this.newCompany)
    },
    goLogin () {
      if (this.initPwd === this.initPwdConfirm) {
        this.changeUserPwdAction({
          userId: this.newUserId,
          userPwd: this.initPwd
        })
        this.$router.push('/login')
      } else {
        this.changePwdTips = '两次密码输入不一致'
      }
    }
  },
  watch: {
    registerResState (val) {
      if (val === 1) {
        this.goToLogin = true
      }
    }
  }
}
</script>
