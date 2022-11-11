<template>
  <div class="fullscreen bg-white text-center q-pa-md flex flex-center">
    <div>
      <div>
        <span style="font-size: 15vh" class="text-green-4 text-bold">S</span>
        <span style="font-size: 10vh" class="text-lime-4 text-bold">S</span>
        <span style="font-size: 6vh" class="text-yellow-4 text-bold">C</span>
      </div>
      <div class="q-mt-xl">
        <q-input v-model.trim="username" label="手机号" dense color="green-4" class="q-mt-lg">
          <template v-slot:before>
            <q-avatar square color="green-4" text-color="white" icon="fas fa-user" size="lg"/>
          </template>
        </q-input>
        <q-input v-model.trim="pwd" label="密码" dense color="green-4" class="q-mt-lg" type="password">
          <template v-slot:before>
            <q-avatar square color="green-4" text-color="white" icon="fas fa-key" size="lg"/>
          </template>
        </q-input>

        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="green"
          unelevated
          label="登录"
          size="lg"
          @click="login()"
        />
      </div>
      <div>
        还不是会员？
        <q-btn
          class=""
          text-color="purple"
          unelevated
          to="/register"
          label="注册"
          no-caps
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  computed: {
    ...mapState('Login',
      [
        'token'
      ])
  },
  mounted () {
    // 清空浏览器缓存
    sessionStorage.clear()
  },
  methods: {
    ...mapActions('Login',
      [
        'loginAction'
      ]),
    ...mapMutations('Login',
      [
        'loginMutation'
      ]),
    login () {
      this.$router.push('/')
      this.loginAction({
        name: this.username,
        pwd: this.pwd
      })
    }
  },
  watch: {
    token (val) {
      if (val.isLogin === true) {
        this.$router.push('/')
      }
    }
  }
}
</script>
