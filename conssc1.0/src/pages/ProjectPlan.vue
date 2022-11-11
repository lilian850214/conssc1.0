<template>
  <div class="q-ma-sm">
    <div style="max-width: 400px" class="q-ma-lg">
      <q-select filled v-model="projectSelected"
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="this.projectList"
                option-value="autoId"
                option-label="projectName"
                prefix="当前项目 :"  color="green-5" dense
                error-message="请选择项目"
                :error="!this.$v.projectSelected.required"
                class="text-h6 text-bold text-purple"
                @input="selectProject($event.autoId)"
      />
    </div>
    <!--项目查询-->
    <div class="q-ma-md">
      <q-card class="q-mt-lg bg-grey-1" flat bordered square>
        <q-avatar size="40px" font-size="20px" color="lime-4" text-color="black" icon="fas fa-search" />
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-lg-4 col-md-6">
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
            <div class="col-xs-12 col-lg-4 col-md-6">
              <q-input v-model="queryData.planStart"
                       dense
                       color="green-5"
                       class="q-pa-sm q-pl-lg text-subtitle1"
                       prefix="开始时间"
                       type="date" max="2200-12-31"

                       error-message="日期格式错误"
                       :error="!this.$v.queryData.planStart.maxLength"/>
              <q-input v-model="queryData.planEnd"
                       dense
                       type="date" max="2200-12-31"

                       color="green-5"
                       class="q-pa-sm q-pl-lg text-subtitle1"
                       prefix="结束时间"
                       error-message="日期格式错误"
                       :error="!this.$v.queryData.planEnd.maxLength"/>
            </div>
            <div class="col-xs-12 col-lg-4 col-md-12">
              <q-input v-model="queryData.personInCharge"
                       dense
                       color="green-5"
                       class="q-pa-sm q-pl-lg text-subtitle1"
                       prefix="负责人员"/>
              <q-input v-model="queryData.planRemark"
                       dense
                       color="green-5"
                       class="q-pa-sm q-pl-lg text-subtitle1"
                       prefix="计划备注"
                       autogrow
                       type="textarea"/>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-9 col-md-12">
              <div class="q-gutter-sm q-mt-lg q-ml-sm">
                <q-radio v-model="queryData.planState" val="" label="所有" color="lime-8"/>
                <q-radio v-model="queryData.planState" val="进行中" label="进行中" color="lime-8"/>
                <q-radio v-model="queryData.planState" val="未开始" label="未开始" color="lime-8"/>
                <q-radio v-model="queryData.planState" val="作废" label="作废" color="lime-8"/>
                <q-radio v-model="queryData.planState" val="终止" label="终止" color="lime-8"/>
              </div>
            </div>
            <div class="col-lg-3 col-md-12">
              <div class="q-ma-lg">
                <q-btn class="q-ma-sm float-right" color="white" text-color="black" label="重 置" size="md" @click="resetData"
                />
                <q-btn class="q-ma-sm text-black float-right" color="lime-4" label="查 询" size="md" @click="selectData"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-ma-md">
      <q-btn @click="addNewDrawerHandler" color="lime-4" text-color="black">新增计划</q-btn>
      <q-btn to="/ProjectList" color="lime-4" text-color="black" class="q-ma-lg">返回项目列表</q-btn>
    </div>
    <!--计划列表-->
    <q-card flat class="q-mt-lg q-ma-md" square bordered>
      <div class="bg-black">
        <q-avatar square  size="40px" font-size="20px" color="lime-4" text-color="black" icon="fas fa-list-ol"/>
        <span class="text-white q-ma-lg text-bold text-h6">项目计划</span>
      </div>
      <q-table
        dense
        bordered
        flat
        :data="projectPlanList"
        :columns="columns"
        row-key="planCode"
        :pagination.sync="projectPlanPagination"
        hide-pagination
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
            <q-td class="q-ma-xs" style="width:60px">
              <q-icon class="q-pa-xs" size="xs" flat name="fas fa-info" @click="planDetailDialogHandler(props)">
                <q-tooltip>进度跟踪</q-tooltip>
              </q-icon>
              <q-icon class="q-pa-xs" size="xs" flat name="fas fa-trash-alt" @click="trash(props)"></q-icon>
              <q-icon class="q-pa-xs" size="xs" flat name="fas fa-edit" @click="edit(props)"></q-icon>
            </q-td>
            <q-td class="text-bold  sticky-td bg-white">
              {{ props.row.planName }}
            </q-td>
            <q-td>{{ props.row.planCode }}</q-td>
            <q-td>{{ props.row.planStart }}</q-td>
            <q-td>{{ props.row.planEnd }}</q-td>
            <q-td>
              <span>{{ props.row.budget }}</span>
            </q-td>
            <q-td>
              <span>{{ props.row.actualBudget }}</span>
            </q-td>
            <q-td>{{ props.row.personInCharge }}</q-td>
            <q-td :class="props.row.planState==='进行中'? 'bg-yellow-3':props.row.planState==='完成'?'bg-green-3':props.row.planState==='暂停'? 'bg-red-3':'bg-grey-3'">
              <span>{{ props.row.planState }}</span>
            </q-td>
            <q-td>{{ props.row.planRemark }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <!--表格分页-->
    <div class="row justify-center q-pa-lg">
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          color="black"
          :max="projectPlanPageSize"
          :max-pages="6"
          :boundary-numbers="true"
        />
      </div>
    </div>
    <!--新增计划drawer-->
    <q-drawer
      side="right"
      no-swipe-backdrop
      v-model="addDrawer"
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
                 type="date" max="2200-12-31"

                 error-message="日期格式错误"
                 :error="!this.$v.newData.planStart.maxLength"/>
        <q-input v-model="newData.planEnd"
                 type="date" max="2200-12-31"

                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="结束时间"
                 error-message="日期格式错误"
                 :error="!this.$v.newData.planStart.maxLength"/>
        <q-input v-model="newData.budget"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="预算金额"
                 error-message="只能填“>=0”的数字,且不为空"
                 :error="!this.$v.newData.budget.numeric || !this.$v.newData.budget.required"/>
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
          <q-btn :loading="addloading" size="md" color="lime-4" text-color="black" label="保存" @click="addNewData">
          </q-btn>
          <q-btn size="md" text-color="black" label="关闭"  @click="addDrawer=false">
          </q-btn>
          <q-icon name="fas fa-check" size="20px" color="green" v-if="tTip"></q-icon>
          <q-icon name="fas fa-times" size="20px" color="red" v-if="fTip"></q-icon>
        </div>
      </q-scroll-area>
    </q-drawer>
    <!--编辑计划drawer-->
    <q-drawer
      side="right"
      no-swipe-backdrop
      v-model="editDrawer"
      bordered
      :width="350"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <h5 class="q-pa-sm q-pa-lg text-h6">
          <p>当前修改计划</p>
          <p>项目名称：{{this.$route.params.projectName}}</p>
          <p><strong class="text-red-4">子计划名：{{this.projectPlanName}}</strong></p>
        </h5>
        <q-input v-model="rowData.planCode"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="计划代码"
                 hint="自定义，推荐便于排序的code，使得项目计划按需排序"
        />
        <q-input v-model="rowData.planName"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="计划名称"
                 error-message="必填"
                 :error="!this.$v.rowData.planName.required"/>
        <q-input v-model="rowData.planStart"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="开始时间"
                 type="date" max="2200-12-31"

                 error-message="日期格式错误"
                 :error="!this.$v.rowData.planStart.maxLength"/>
        <q-input v-model="rowData.planEnd"
                 type="date" max="2200-12-31"

                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="结束时间"
                 error-message="日期格式错误"
                 :error="!this.$v.rowData.planStart.maxLength"/>
        <q-input v-model="rowData.budget"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="预算金额"
                 error-message="只能填“>=0”的数字,且不为空"
                 :error="!this.$v.rowData.budget.numeric || !this.$v.rowData.budget.required"/>
        <q-input v-model="rowData.personInCharge"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="负责人员"/>
        <q-select v-model="rowData.planState"
                  :options="planState"
                  color="green-5"
                  class="q-pa-sm q-pl-lg text-subtitle1"
                  prefix="计划状态"/>
        <q-input v-model="rowData.planRemark"
                 color="green-5"
                 class="q-pa-sm q-pl-lg text-subtitle1"
                 prefix="计划备注"
                 autogrow
                 type="textarea"/>
        <div class="q-pa-sm q-pl-lg q-gutter-md">
          <q-btn :loading="editloading" size="md" color="lime-4" text-color="black" label="保存" @click="sendEditedData">
          </q-btn>
          <q-btn size="md" text-color="black" label="关闭"  @click="editDrawer=false">
          </q-btn>
          <q-icon name="fas fa-check" size="20px" color="green" v-if="tTip"></q-icon>
          <q-icon name="fas fa-times" size="20px" color="red" v-if="fTip"></q-icon>
        </div>
      </q-scroll-area>
    </q-drawer>
    <!--查看计划明细对话框-->
    <q-dialog v-model="planDetailDialog" full-width persistent>
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-green">
          <q-toolbar class="q-pa-sm q-ma-none">
            <q-toolbar-title class="q-pa-none q-ma-none">
              <span class="q-ml-lg">当前任务<q-icon name="fas fa-arrow-right" class="q-ml-lg q-mr-lg"/>{{currentPlanTitle}}</span>
            </q-toolbar-title>
            <q-btn flat @click="planDetailDrawer = !planDetailDrawer" dense icon="menu" label="子进度列表" />
            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-drawer side="right" bordered v-model="planDetailDrawer" :width="300" :breakpoint="300" content-class="bg-white q-pa-none">
          <plan-detail-list/>
        </q-drawer>

        <q-page-container>
          <q-page padding class="q-pr-sm">
            <plan-detail-content/>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <!-- 若未经过项目链接进入页面则必须选择一个项目-->
    <q-dialog v-model="selectedWarning">
      <q-card style="width:1000px">
        <q-card-section>
          <div class="text-h6">请选择项目</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="projectSelected"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="this.projectList"
                    option-value="autoId"
                    option-label="projectName"
                    label="当前项目"  color="green-5" dense
                    error-message="请选择项目"
                    :error="!this.$v.projectSelected.required"
                    @input="selectProject($event.autoId)"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="进入项目" color="green-5" @click="enterPage"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { maxLength, numeric, required } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import PlanDetailList from '../components/planDetailList'
import PlanDetailContent from '../components/planDetailContent'

export default {
  name: 'projectDetail',
  components: { PlanDetailContent, PlanDetailList },
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
      editloading: false,
      loading: false,
      tTip: false,
      fTip: false,
      btnDisable: false,
      addDialog: false,
      editDialog: false,
      confirmDialog: false,
      editDrawer: false,
      addDrawer: false,
      planDetailDrawer: true,
      planDetailDialog: false,
      currentPlanTitle: null,
      projectPlanName: null,
      projectSelected: null,
      projectSelectedId: null,
      selectedWarning: false,
      planState: ['进行中', '完成', '终止', '作废', '暂停'],
      columns: [
        {
          name: 'action',
          label: '',
          align: 'left',
          field: '',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planName',
          label: '计划名称',
          align: 'left',
          field: 'planName',
          headerClasses: 'sticky-td bg-white',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planCode',
          label: '代码',
          align: 'left',
          field: 'planCode',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planStart',
          label: '开始时间',
          align: 'left',
          field: 'planStart',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planEnd',
          label: '结束时间',
          align: 'left',
          field: 'planEnd',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'budget',
          label: '预算额',
          align: 'left',
          field: 'budget',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'actualBudget',
          label: '执行额',
          align: 'left',
          field: 'actualBudget',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'personInCharge',
          label: '负责人',
          align: 'left',
          field: 'personInCharge',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planState',
          label: '状态',
          align: 'left',
          field: 'planState',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planRemark',
          label: '备注',
          align: 'left',
          field: 'planRemark',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        }
      ],
      newData: {
        projectId: null,
        planCode: null,
        planName: null,
        planStart: null,
        planEnd: null,
        budget: 0,
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
        budget: 0,
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
        budget: 0,
        actualBudget: 0,
        personInCharge: null,
        planState: '',
        planRemark: null
      }
    }
  },
  mounted () {
    if (this.$route.params.autoId === null) {
      // 若项目列表中无数据，发起请求获取项目列表
      this.projectModuleDataWithoutQueryAction()
      // 路由中若没有参数值，则要求用户选择才能进入页面
      this.selectedWarning = true
    } else {
      // 路由中含参，则将页面中当前选择项与参数对应
      this.projectSelected = this.projectSelectedGetters(this.$route.params.autoId)[0]
      // 从路由中获取项目ID，以此查询该项目分项计划
      this.projectPlanSetProjectAutoIdMutation(this.$route.params.autoId)
      if (this.projectPlanList.length === 0) {
        this.tbLoading = true
      }
      /* 挂载后获取初始分页信息 */
      // 从路由中获取项目ID，以此查询该项目分项计划
      this.queryData.projectId = this.projectPlanProjectId
      this.onRequest({
        pagination: this.projectPlanPagination,
        queryData: this.queryData
      })
    }
  },
  validations: {
    newData: {
      planName: { required },
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) },
      budget: {
        numeric,
        required
      }
    },
    queryData: {
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) }
    },
    rowData: {
      planName: { required },
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) },
      budget: {
        numeric,
        required
      }
    },
    projectSelected: { required }
  },
  computed: {
    ...mapState('Project',
      [
        'projectList',
        'projectPlanList',
        'projectPlanProjectId',
        'projectPlanSendEditedRes',
        'projectPlanAddNewRes',
        'projectPlanTrashRes',
        'projectPlanPageSize'
      ]),
    ...mapGetters('Project', ['projectSelectedGetters']),
    projectPlanPagination: {
      get () {
        return this.$store.state.Project.projectPlanPagination
      },
      set () {
      }
    }
  },
  methods: {
    /* 不能放在计算属性中，会造成循环计算 */
    ...mapMutations('Project',
      [
        'projectPlanModuleDataMutation',
        'projectPlanSendEditedMutation',
        'projectPlanAddNewMutation',
        'projectPlanTrashMutation',
        'projectPlanSetRowsPerPageMutation',
        'projectPlanSetCurrentPageMutation',
        'projectPlanSetProjectAutoIdMutation',
        'projectDetailSetParentPlanAutoIdMutation'
      ]),
    ...mapActions('Project',
      [
        // 项目列表
        'projectModuleDataWithoutQueryAction',
        // 项目计划相关请求
        'projectPlanModuleDataAction',
        'projectPlanSendEditedAction',
        'projectPlanNewDateAction',
        'projectPlanTrashDataAction',
        // 项目计划明细列表请求
        'projectDetailModuleDataAction'
      ]),
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    /* 挂载后初始数据 */
    onRequest (props) {
      this.projectPlanModuleDataAction(props)
    },
    addNewDrawerHandler () {
      this.addDrawer = true
      this.editDrawer = false
    },
    editDrawerHandler () {
      this.addDrawer = false
      this.editDrawer = true
    },
    /* 查询数据 */
    selectData () {
      this.projectPlanModuleDataAction({
        pagination: this.projectPlanPagination,
        queryData: this.queryData
      })
    },
    /* 重置数据 */
    resetData () {
      Object.keys(this.queryData).forEach(key => (this.queryData[key] = null))
      this.queryData.projectBudget = 0
      this.queryData.projectId = this.projectPlanProjectId
      this.queryData.planState = ''
      this.selectData()
    },
    /* 获得行的信息赋予rowdata，准备向后台发送 */
    edit (props) {
      this.btnDisable = false
      this.initTip()
      this.editDrawerHandler()
      this.projectPlanName = props.row.planName
      this.rowData = Object.assign({}, props.row)
    },
    /* 修改数据 */
    sendEditedData () {
      if (this.$v.rowData.$invalid === false) {
        this.projectPlanSendEditedMutation(99)
        // 点击保存后显示运行图标
        this.editloading = true
        this.initTip()
        this.projectPlanSendEditedAction(this.rowData)
        this.projectPlanModuleDataAction({
          pagination: this.projectPlanPagination,
          queryData: this.queryData
        })
      }
    },
    /* 删除数据 */
    trash (props) {
      this.projectPlanTrashDataAction({ autoId: props.row.autoId })
      this.projectPlanModuleDataAction({
        pagination: this.projectPlanPagination,
        queryData: this.queryData
      })
    },
    /* 新增数据 */
    addNewData () {
      if (this.$v.newData.$invalid === false) {
        this.newData.projectId = this.$route.params.autoId
        this.projectPlanAddNewMutation(99)
        // 初始化新增状态
        this.addloading = true
        this.initTip()
        this.projectPlanNewDateAction(this.newData)
        this.projectPlanModuleDataAction({
          pagination: this.projectPlanPagination,
          queryData: this.queryData
        })
      }
    },
    /* 更新操作后的信息提示 */
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
    },
    /* 点击表格中单条项目跟踪图标显示单计划详细内容 */
    planDetailDialogHandler (props) {
      if (props.row.autoId != null) {
        this.currentPlanTitle = props.row.planName
        this.projectDetailSetParentPlanAutoIdMutation(props.row.autoId)
        // 获取单条计划详情列表
        this.projectDetailModuleDataAction(
          {
            parentPlanId: props.row.autoId
          }
        )
        this.planDetailDialog = true
      }
    },
    enterPage () {
      if (!this.$v.projectSelected.$invalid) {
        this.selectedWarning = false
      }
    },
    selectProject (val) {
      this.projectSelectedId = val
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
      this.projectPlanModuleDataAction({
        pagination: this.projectPlanPagination,
        queryData: this.queryData
      })
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.setRowsPerPageMutation(val)
      this.projectPlanModuleDataAction({
        pagination: this.projectPlanPagination,
        queryData: this.queryData
      })
      this.currentPage = 1
    },
    // 监控修改后返回状态
    projectPlanSendEditedRes (val) {
      if (val !== 99) {
        this.editloading = false
        this.updateTip(val)
        this.btnDisable = true
        this.projectPlanModuleDataAction({
          pagination: this.projectPlanPagination,
          queryData: this.queryData
        })
      }
    },
    // 监控新增后返回状态
    projectPlanAddNewRes (val) {
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
          this.projectPlanModuleDataAction({
            pagination: this.projectPlanPagination,
            queryData: this.queryData
          })
        }
      }
    },
    projectPlanTrashRes (val) {
      if (val === 1) {
        this.projectPlanModuleDataAction({
          pagination: this.projectPlanPagination,
          queryData: this.queryData
        })
      }
    },
    projectSelectedId (val) {
      // 从用户选择中获取更改后的项目ID
      this.queryData.projectId = val
      this.addDrawer = false
      this.onRequest({
        pagination: this.projectPlanPagination,
        queryData: this.queryData
      })
    }
  }
}
</script>

<style scoped lang="sass">
  .sticky-td
    position: sticky
    left: 0
    z-index: 1
</style>
