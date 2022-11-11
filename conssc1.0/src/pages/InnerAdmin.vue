<template>
  <div class="q-ma-sm" >
  InnerAdmin
    <!--修改操作区域-->
    <div class="q-pa-md">
      <q-card class="my-card" flat>
        <q-card-section>
          <p class="text-subtitle1 text-bold">如需修改权限说明，请先单击需修改的模块内容，再修改保存</p>
          <p>
            <span class="text-bold">提示：当前修改权限为</span>
            <span class="q-pl-lg text-red-6">{{sendCode}}</span>
          </p>
          <q-input v-model="detail" color="black" style="font-size:20px;font-weight: 500" >
          </q-input>
          <div class="q-mt-sm">
            <q-btn @click="sendDetail" color="green-5" label="保 存"></q-btn>
            <q-spinner
              color="lime-5"
              size="2em"
              :thickness="10"
              v-if="loading"
              class="q-ml-lg"
            />
            <span class="q-pl-lg text-green-5 text-weight-bolder" v-if="tTip">修改成功</span>
            <span class="q-pl-lg text-red-5 text-weight-bolder" v-if="fTip">修改失败</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!--权限表格-->
    <div class="q-pa-md">
      <div class=" q-pa-none">
        <span class="q-pa-sm" style="line-height:1.5">每页显示</span>
        <q-radio v-model="rowsPerPage" val=10 label="10" color="green-5" size="xs"/>
        <q-radio v-model="rowsPerPage" val=20 label="20" color="green-5" size="xs"/>
        <q-radio v-model="rowsPerPage" val=30 label="30" color="green-5" size="xs"/>
        <q-radio v-model="rowsPerPage" val=50 label="50" color="green-5" size="xs"/>
        <q-radio v-model="rowsPerPage" val=0 label="所有" color="green-5" size="xs"/>
      </div>
      <q-table
        flat
        square
        :separator="'none'"
        :data="moduleList"
        :columns="columns"
        row-key="permissionCode"
        :loading="tbLoading"
        class="my-sticky-column-table q-pt-lg"
        :pagination.sync="pagination"
        @row-click="setDetail"
        hide-pagination
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-green bg-grey-3"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          color="green"
          :max="pageSize"
          :max-pages="6"
          :boundary-numbers="true"
        >
        </q-pagination>
      </div>
    </div>

    <!--  检查是否未点击数据即进行修改-->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">提示</div>
        </q-card-section>

        <q-card-section class="q-pa-lg">
          请先选择需要修改的内容。
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'InnerAdmin',
  data () {
    return {
      /*
      * currentPage，rowsPerPage表格分页初始化
      * tbLoading 表格显示加载状态
      * */
      currentPage: 1,
      rowsPerPage: '10',
      tbLoading: false,

      /*
      * alert 未点击表格而直接保存alert对话框
      * loading 保存后返回的sendRes，显示成功或失败的提示
      * tTip fTip 更新成功或失败的文本提示
      *
      * */
      alert: false,
      loading: false,
      tTip: false,
      fTip: false,

      /*
      * detail 要修改的内容
      * sendCode 当前修改内容对应的权限代码
      * modifiedIndex 当前修改内容对应的索引值，用于mutation中对应修改vuex的值
      *
      * */
      detail: null,
      sendCode: null,
      modifiedIndex: null,
      columns: [
        {
          name: 'permissionId',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'permissionId',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'permissionCode',
          required: true,
          label: '权限代码',
          align: 'left',
          field: 'permissionCode',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'permissionName',
          required: true,
          label: '权限名称',
          align: 'left',
          field: 'permissionName',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'permissionDetail',
          required: true,
          label: '权限说明',
          align: 'left',
          field: 'permissionDetail',
          headerStyle: 'font-size:16px;font-weight:bold'
        }
      ]
    }
  },
  mounted () {
    if (this.moduleList.length === 0) {
      this.tbLoading = true
    }
    /* 挂载后获取初始分页信息 */
    this.onRequest({
      pagination: this.pagination
    })
  },
  methods: {
    onRequest (props) {
      this.$store.dispatch('InnerAdminEdit/moduleDataAction', props.pagination)
    },
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    // 点击表格行以后获得改行的信息赋予data，准备向后台发送
    setDetail (evt, row) {
      this.initTip()
      this.sendCode = row.permissionCode // 使修改区域显示当前修改权限所对应的指令
      this.detail = row.permissionDetail // 使修改区域获取点击行指令明细
      this.id = row.permissionId // 使修改区域获取点击行指令ID，用于向后台传输ID进行update
    },
    // 向后台发送data更新
    sendDetail () {
      if (this.sendCode == null) {
        this.alert = true
      } else {
        // 点击保存后显示运行图标
        this.initTip()
        this.loading = true
        // state中sendRes是否为null，不为null则重置，再传送异步请求
        if (this.$store.state.InnerAdminEdit.sendRes != null) {
          this.$store.commit('InnerAdminEdit/sendDetailMutation', null)
        }
        this.$store.dispatch('InnerAdminEdit/sendDetailAction', {
          permissionDetail: this.detail,
          permissionId: this.id
        })
      }
    }
  },
  computed: {
    sendRes: function () {
      return this.$store.state.InnerAdminEdit.sendRes
    },
    pagination: {
      get () {
        return this.$store.state.InnerAdminEdit.pagination
      },
      set () {}
    },
    moduleList: function () {
      return this.$store.state.InnerAdminEdit.moduleList
    },
    pageSize: function () {
      return this.$store.state.InnerAdminEdit.pageSize
    }
  },
  watch: {
    currentPage (val) {
      this.tbLoading = true
      this.$store.commit('InnerAdminEdit/setCurrentPageMutation', val)
      this.onRequest({
        pagination: this.pagination
      })
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.$store.commit('InnerAdminEdit/setRowsPerPageMutation', val)
      this.onRequest({
        pagination: this.pagination
      })
    },
    sendRes (val) {
      // 监控变化之前要先重置sendRes为null，
      if (val === 0) {
        this.loading = false
        this.tTip = false
        this.fTip = true
      }
      if (val === 1) {
        this.loading = false
        this.tTip = true
        this.fTip = false
      }
    },
    moduleList (val) {
      this.tbLoading = false
    }
  }
}
</script>

<style scoped>

</style>
