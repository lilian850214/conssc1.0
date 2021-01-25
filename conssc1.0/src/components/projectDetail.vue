<template>
  <div class="q-ma-md">
    <q-btn @click="drawerRight=true" color="lime-4" text-color="black">新增计划</q-btn>
    <q-btn to="/ProjectList" color="lime-4" text-color="black" class="q-ma-lg">返回列表</q-btn>
    <!--项目查询-->
    <q-card class="q-pt-lg q-pa-none" flat>
      <q-card-section>
        <p class="text-h6 q-pl-lg q-pa-sm half-round bg-lime-4 fixed-width">搜索条件</p>
        <div class="row">
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.planCode"
                     dense
                     color="green-5"
                     class="q-pa-sm q-pl-lg text-subtitle1"
                     prefix="计划代码"
            />
            <q-input v-model="queryData.planName"
                     dense
                     color="green-5"
                     class="q-pa-sm q-pl-lg text-subtitle1"
                     prefix="计划名称"
                     />
          </div>
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.planStart"
                     dense
                     color="green-5"
                     class="q-pa-sm q-pl-lg text-subtitle1"
                     prefix="开始时间"
                     type="date"
                     error-message="日期格式错误"
                     :error="!this.$v.queryData.planStart.maxLength"/>
            <q-input v-model="queryData.planEnd"
                     dense
                     type="date"
                     color="green-5"
                     class="q-pa-sm q-pl-lg text-subtitle1"
                     prefix="结束时间"
                     error-message="日期格式错误"
                     :error="!this.$v.queryData.planEnd.maxLength"/>
          </div>
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.personInCharge"
                     dense
                     color="green-5"
                     class="q-pa-sm q-pl-lg text-subtitle1"
                     prefix="负责人员"/>
            <q-select v-model="queryData.planState"
                      dense
                      :options="planState"
                      color="green-5"
                      class="q-pa-sm q-pl-lg text-subtitle1"
                      prefix="计划状态"/>
          </div>
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.planRemark"
                     dense
                     color="green-5"
                     class="q-pa-sm q-pl-lg text-subtitle1"
                     prefix="计划备注"
                     autogrow
                     type="textarea"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row float-right">
          <q-btn class="q-ma-sm" color="white" text-color="black" label="重 置" size="md" @click="resetData"
          />
          <q-btn class="q-ma-sm text-black" color="lime-4" label="查 询" size="md" @click="selectData"
          />
        </div>
      </q-card-section>
    </q-card>

    <!--计划列表-->
    <q-table
      dense
      flat
      class="q-ma-sm"
      title="项目计划"
      :data="projectPlanList"
      :columns="columns"
      row-key="planCode"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td class="q-ma-xs" style="width:80px">
            <q-icon class="q-pa-sm" size="sm" flat name="fas fa-edit"></q-icon>
            <q-icon size="sm" flat name="fas fa-trash-alt"></q-icon>
          </q-td>
          <q-td>{{ props.row.planCode }}</q-td>
          <q-td>
            {{ props.row.planName }}
          </q-td>
          <q-td>{{ props.row.planStart }}</q-td>
          <q-td>{{ props.row.planEnd }}</q-td>
          <q-td>
            <span>{{ props.row.planBudget }} || </span>
            <span>{{ props.row.actualBudget }}</span>
          </q-td>
          <q-td>{{ props.row.personInCharge }}</q-td>
          <q-td :class="props.row.planState==='完成'?'bg-green-4':'bg-yellow-11'">
            <q-select v-model="props.row.planState"
                      :options="planState"
                      dense
                      borderless
                      class="q-pa-none"/>
          </q-td>
          <q-td>{{ props.row.planRemark }}</q-td>
        </q-tr>
      </template>
      <!--新增计划-->
      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">单击行以获得计划明细</q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- 计划跟踪-->
    <div class="col-md-12 col-sm-12 q-pa-md">
      <q-splitter
        v-model="splitterModel"
      >

        <template v-slot:before>
          <q-tabs
            v-model="tab"
            dense
            vertical
            class="text-lime-10"
          >
            <q-tab name="mails" icon="mail" label="Mails"/>
            <q-tab name="alarms" icon="alarm" label="Alarms"/>
            <q-tab name="movies" icon="movie" label="Movies"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="mails">
              <div class="text-h4 q-mb-md">Mails</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h4 q-mb-md">Alarms</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h4 q-mb-md">Movies</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                ullam. In, libero.</p>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </div>
    <!--新增计划drawer-->
    <q-drawer
      side="right"
      no-swipe-backdrop
      overlay
      v-model="drawerRight"
      bordered
      :width="350"
      :breakpoint="500"
      content-class=""
    >
      <q-scroll-area class="fit">
        <h5 class="q-pa-sm q-pl-lg text-h6">新增计划所属项目：
          <p><strong>{{this.$route.params.projectName}}</strong></p></h5>
        <q-input v-model="newData.planCode"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="计划代码"
                 hint="自定义，推荐便于排序的code，使得项目计划按需排序"
        />
        <q-input v-model="newData.planName"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="计划名称"
                 error-message="必填"
                 :error="!this.$v.newData.planName.required"/>
        <q-input v-model="newData.planStart"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="开始时间"
                 type="date"
                 error-message="日期格式错误"
                 :error="!this.$v.newData.planStart.maxLength"/>
        <q-input v-model="newData.planEnd"
                 type="date"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="结束时间"
                 error-message="日期格式错误"
                 :error="!this.$v.newData.planStart.maxLength"/>
        <q-input v-model="newData.planBudget"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="预算金额"
                 error-message="只能填“>=0”的数字,且不为空"
                 :error="!this.$v.newData.planBudget.numeric || !this.$v.newData.planBudget.required"/>
        <q-input v-model="newData.personInCharge"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="负责人员"/>
        <q-select v-model="newData.planState"
                  :options="planState"
                  color="green-5"
                  class="q-pa-sm q-pl-lg text-subtitle1"
                  prefix="计划状态"/>
        <q-input v-model="newData.planRemark"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="计划备注"
                 autogrow
                 type="textarea"/>
        <div class="q-pa-sm q-pl-lg q-gutter-md">
          <q-btn size="md" color="lime-4" text-color="black" label="保存" @click="addNewData">
          </q-btn>
          <q-btn size="md" color="lime-4" text-color="black" label="关闭"  @click="drawerRight=false">
          </q-btn>
        </div>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { maxLength, numeric, required } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'projectDetail',
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
                  * addloading 保存后返回的addRes，显示成功或失败的提示
                  * */
      alert: false,
      addloading: false,
      loading: false,
      tTip: false,
      fTip: false,
      btnDisable: false,
      addDialog: false,
      editDialog: false,
      confirmDialog: false,
      drawerRight: false,
      tab: 'mails',
      splitterModel: 10,
      planState: ['进行中', '完成', '作废', '未开始'],
      projectPlan: [
        {
          planCode: '001',
          planName: '客户沟通',
          planStart: '2020-01-01',
          planEnd: '2020-01-01',
          planBudget: 2000,
          actualBudget: 5000,
          personInCharge: 'lilian',
          planState: '作废',
          planRemark: null
        }
      ],
      columns: [
        {
          name: 'action',
          label: '',
          align: 'left',
          field: '',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planCode',
          label: '代码',
          align: 'left',
          field: 'planCode',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planName',
          label: '计划名称',
          align: 'left',
          field: 'planName',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planStart',
          label: '开始时间',
          align: 'left',
          field: 'planStart',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planEnd',
          label: '结束时间',
          align: 'left',
          field: 'planEnd',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planBudget',
          label: '预算 || 实际',
          align: 'left',
          field: 'planBudget',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'personInCharge',
          label: '负责人',
          align: 'left',
          field: 'personInCharge',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planState',
          label: '状态',
          align: 'left',
          field: 'planState',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'planRemark',
          label: '备注',
          align: 'left',
          field: 'planRemark',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        }
      ],
      newData: {
        projectId: null,
        planCode: null,
        planName: null,
        planStart: null,
        planEnd: null,
        planBudget: 0,
        actualBudget: 0,
        personInCharge: null,
        planState: '未开始',
        planRemark: null
      },
      rowData: {
        projectId: null,
        planCode: null,
        planName: null,
        planStart: null,
        planEnd: null,
        planBudget: 0,
        actualBudget: 0,
        personInCharge: null,
        planState: '未开始',
        planRemark: null
      },
      queryData: {
        projectId: null,
        planCode: null,
        planName: null,
        planStart: null,
        planEnd: null,
        planBudget: 0,
        actualBudget: 0,
        personInCharge: null,
        planState: '未开始',
        planRemark: null
      }
    }
  },
  mounted () {
    this.setAutoIdMutation(this.$route.params.autoId)
    if (this.projectPlanList.length === 0) {
      // todo 为空且返回为成功
      this.tbLoading = true
    }
    /* 挂载后获取初始分页信息 */
    this.queryData.projectId = this.autoId
    this.onRequest({
      pagination: this.pagination,
      queryData: this.queryData,
      autoId: this.autoId
    })
  },
  validations: {
    newData: {
      planName: { required },
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) },
      planBudget: {
        numeric,
        required
      }
    },
    queryData: {
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) }
    }
  },
  computed: {
    ...mapState('ProjectPlan', ['projectPlanList', 'autoId', 'sendEditedRes', 'addNewRes', 'trashRes', 'pageSize', 'pieChart', 'pieAuthChart']),
    pagination: {
      get () {
        return this.$store.state.Patent.pagination
      },
      set () {
      }
    }
  },
  methods: {
    /* 不能放在计算属性中，会造成循环计算 */
    ...mapMutations('ProjectPlan', ['addNewMutation', 'sendEditedMutation', 'setCurrentPageMutation', 'setRowsPerPageMutation', 'setAutoIdMutation']),
    ...mapActions('ProjectPlan',
      [
        'trashDataAction',
        'moduleDataAction',
        'sendEditedAction',
        'newDateAction'
      ]),
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    /* 挂载后初始数据 */
    onRequest (props) {
      this.moduleDataAction(props)
    },
    /* 查询数据 */
    selectData () {
      this.moduleDataAction({
        pagination: this.pagination,
        queryData: this.queryData,
        autoId: this.autoId
      })
    },
    resetData () {
      Object.keys(this.queryData).forEach(key => (this.queryData[key] = null))
      this.queryData.projectBudget = 0
      this.selectData()
    },
    /* 获得行的信息赋予rowdata，准备向后台发送 */
    edit (props) {
      this.btnDisable = false
      this.initTip()
      this.editDialog = true
      this.rowData = Object.assign({}, props.row)
    },
    /* 修改数据 */
    sendEditedData () {
      if (this.$v.rowData.$invalid === false) {
        this.sendEditedMutation(99)
        // 点击保存后显示运行图标
        this.loading = true
        this.initTip()
        this.sendEditedAction(this.rowData)

        this.moduleDataAction({
          pagination: this.pagination,
          queryData: this.queryData,
          autoId: this.autoId
        })
      }
    },
    /* 删除数据 */
    trash (props) {
      this.trashDataAction({ autoId: props.row.autoId })
      this.moduleDataAction({
        pagination: this.pagination,
        queryData: this.queryData
      })
    },
    /* 新增数据 */
    addNewData () {
      if (this.$v.newData.$invalid === false) {
        this.newData.projectId = this.$route.params.autoId
        console.log(this.newData)
        this.addNewMutation(99)
        // 初始化新增状态
        this.addloading = true
        this.initTip()
        this.newDateAction(this.newData)
        this.moduleDataAction({
          pagination: this.pagination,
          queryData: this.queryData
        })
      }
    },
    updateTip (val) {
      // 监控变化之前要先重置Res为99，
      if (val === 0) {
        this.tTip = false
        this.fTip = true
      }
      if (val === 1) {
        this.tTip = true
        this.fTip = false
      }
    }
  },
  watch: {
    // 项目列表发生变动
    projectList (val) {
      this.tbLoading = false
    },
    // 翻页
    currentPage (val) {
      this.tbLoading = true
      this.setCurrentPageMutation(val)
      this.moduleDataAction({
        pagination: this.pagination,
        queryData: this.queryData
      })
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.setRowsPerPageMutation(val)
      this.moduleDataAction({
        pagination: this.pagination,
        queryData: this.queryData
      })
      this.currentPage = 1
    },
    // 监控修改后返回状态
    sendEditedRes (val) {
      if (val !== 99) {
        this.loading = false
        this.updateTip(val)
        this.btnDisable = true
        this.sendMetion = false
        this.moduleDataAction({
          pagination: this.pagination,
          queryData: this.queryData
        })
      }
    },
    // 监控新增后返回状态
    addNewRes (val) {
      if (val !== 99) {
        // 显示操作返回结果
        this.updateTip(val)
        // 返回状态后变更加载状态
        this.addloading = false
        // 操作成功
        if (val === 1) {
          // 使数据集为空等待添加下一条
          const _this = this
          setTimeout(function () {
            Object.keys(_this.newData).forEach(key => (_this.newData[key] = null))
          }, 800)
          this.moduleDataAction({
            pagination: this.pagination,
            queryData: this.queryData
          })
        }
      }
    },
    trashRes (val) {
      if (val === 1) {
        this.moduleDataAction({
          pagination: this.pagination,
          queryData: this.queryData
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
