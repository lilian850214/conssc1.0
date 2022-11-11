<template>
  <div class="q-pa-md">
      <q-btn color="lime-4" class="text-black" style="margin-right:-15px" label="新增项目" @click="addDrawer=true"/>
    <!--项目查询-->
    <q-card class="q-mt-lg bg-grey-1" flat bordered square>
      <q-avatar size="40px" font-size="20px" color="lime-4" text-color="black" icon="fas fa-search" />
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.projectName"
                     clearable dense
                     prefix="项目名称"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
            />
            <q-input v-model="queryData.projectCode"
                     clearable dense
                     prefix="项目代码"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
            />
          </div>
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.projectManger" prefix="项目经理" color="green-5" class="q-pa-sm text-subtitle1"
                     clearable dense/>
            <q-select v-model="queryData.projectState" prefix="项目状态"
                      :options="projectStateOptions"
                      color="green-5"
                      class="q-pa-sm text-subtitle1"
                      dense
            />
          </div>
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.projectStart"
                     type="date" max="2200-12-31"
                     prefix="开始日期"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
                     dense
                     clearable
                     error-message="日期格式错误"
                     :error="!this.$v.queryData.projectStart.maxLength"/>
            <q-input v-model="queryData.projectEnd"
                     type="date" max="2200-12-31"
                     prefix="结束日期"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
                     dense
                     clearable
                     error-message="日期格式错误"
                     :error="!this.$v.queryData.projectEnd.maxLength"
            />
          </div>
          <div class="col-xs-12 col-lg-3 col-md-6">
            <q-input v-model="queryData.projectBudget" prefix="项目预算" color="green-5"
                     class="q-pa-sm text-subtitle1" type="number" dense
                     hint="查询大于该数字的记录"
                     error-message="只能填“>=0”的数字,且不为空"
                     :error="!this.$v.queryData.projectBudget.numeric || !this.$v.queryData.projectBudget.required"/>
            <q-input v-model="queryData.projectRemark" prefix="项目备注" color="green-5"
                     class="q-pa-sm text-subtitle1" type="text" autogrow dense/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-10 col-md-12"></div>
          <div class="col-lg-2 col-md-12">
            <q-btn class="q-ma-sm" color="white" text-color="black" label="重 置" size="md" @click="resetData"
            />
            <q-btn class="q-ma-sm text-black" color="lime-4" label="查 询" size="md" @click="selectData"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!--项目列表-->
    <q-card flat class="q-mt-lg">
    <!-- 项目表格-->
    <q-table
      grid
      title=""
      :data="projectList"
      :columns="columns"
      row-key="index"
      :pagination.sync="projectPagination"
      hide-pagination
    >
      <template v-slot:top-right>
          <span class="q-pa-lg text-subtitle2">每页显示</span>
          <q-radio v-model="rowsPerPage" val=10 label="10" color="lime-7" size="md"/>
          <q-radio v-model="rowsPerPage" val=20 label="20" color="lime-7" size="md"/>
          <q-radio v-model="rowsPerPage" val=30 label="30" color="lime-7" size="md"/>
          <q-radio v-model="rowsPerPage" val=0 label="所有" color="lime-7" size="md"/>
      </template>
      <template v-slot:item="props">
        <div class=" col-xs-12 col-md-6 col-lg-3 q-mt-lg q-pa-sm">
          <q-card square>
            <q-card-section class="text-center bg-grey-2">
              <p class="text-h5 text-bold q-ma-xs">
                {{ props.row.projectName }}
              </p>
              <q-badge floating class="text-subtitle1"
                       :color="props.row.projectState==='进行中'? 'green-5':props.row.projectState==='完成'?'purple':props.row.projectState==='暂停'? 'warning':'black'">
                {{ props.row.projectState }}
              </q-badge>
            </q-card-section>
            <q-card-section class="text-left q-pa-none bg-grey-2">
              <q-btn flat class="text-bold text-subtitle1" label="进度跟踪" @click="pushToDetail(props)"/>
              <q-btn flat class="text-bold text-subtitle1" label="编辑项目" @click="edit(props)"/>
              <q-btn flat text-color="grey" label="删除项目" @click="trash(props)"/>
            </q-card-section>
            <q-separator/>
            <q-card-section class="text-left text-subtitle1">
              <div class="row q-mt-sm">
                <div class="col-6 q-pa-sm">
                  <span class="bg-grey-3 q-pa-sm q-mr-sm">开始</span>
                  <strong>{{ props.row.projectStart }}</strong>
                </div>
                <div class="col-6 q-pa-sm">
                  <span class="bg-grey-3 q-pa-sm q-mr-sm">结束</span>
                  <strong>{{ props.row.projectEnd}}</strong>
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col-6 q-pa-sm">
                  <span class="bg-grey-3 q-pa-sm q-mr-sm">经理</span>
                  <strong>{{ props.row.projectManger }}</strong>
                </div>
                <div class="col-6 q-pa-sm">
                  <span class="bg-grey-3 q-pa-sm q-mr-sm">预算</span>
                  <strong>{{ props.row.projectBudget }}</strong>
                </div>
              </div>
              <div class="row">
                <div class="col-12 q-pa-sm">
                  <q-separator class="q-mt-lg"/>
                  <p class="q-pa-sm">{{ props.row.projectRemark }}</p>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <!--表格分页-->
    <div class="row justify-center q-pa-lg">
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          color="black"
          :max="projectPageSize"
          :max-pages="6"
          :boundary-numbers="true"
        />
      </div>
    </div>
    </q-card>
    <!--新增项目-->
    <q-drawer
      side="right"
      no-swipe-backdrop
      v-model="addDrawer"
      bordered
      overlay
      :width="350"
      :breakpoint="500"
      content-class=""
    >
      <q-scroll-area class="fit">
        <h5 class="q-pa-sm q-pl-lg text-h6">新增项目</h5>
        <q-card flat class="q-ma-sm">
        <q-input v-model="newData.projectName"
                 clearable dense
                 prefix="项目名称"
                 color="green-5"
                 class="q-pa-sm text-subtitle1"
                 error-message="必填"
                 :error="!this.$v.newData.projectName.required"
        ></q-input>
        <q-input v-model="newData.projectCode"
                 clearable dense
                 prefix="项目代码"
                 color="green-5"
                 class="q-pa-sm text-subtitle1"
        />
        <q-input v-model="newData.projectManger" prefix="项目经理" color="green-5" class="q-pa-sm text-subtitle1"
                 clearable dense/>
        <q-select v-model="newData.projectState" prefix="项目状态"
                  :options="projectStateOptions"
                  color="green-5"
                  class="q-pa-sm text-subtitle1"
                  dense
                  error-message="必填"
                  :error="!this.$v.newData.projectState.required"/>
        <q-input v-model="newData.projectStart"
                 type="date" max="2200-12-31"

                 prefix="开始日期"
                 color="green-5"
                 class="q-pa-sm text-subtitle1"
                 dense
                 clearable
                 error-message="日期格式错误"
                 :error="!this.$v.newData.projectStart.maxLength"/>
        <q-input v-model="newData.projectEnd"
                 type="date" max="2200-12-31"

                 prefix="结束日期"
                 color="green-5"
                 class="q-pa-sm text-subtitle1"
                 dense
                 clearable
                 error-message="日期格式错误"
                 :error="!this.$v.newData.projectEnd.maxLength"
        />
        <q-input v-model="newData.projectBudget" prefix="项目预算" color="green-5"
                 class="q-pa-sm text-subtitle1" type="number"  hint="只能为数字，查询大于该数字的记录" clearable dense
                 error-message="只能填“>=0”的数字,且不为空"
                 :error="!this.$v.newData.projectBudget.numeric || !this.$v.newData.projectBudget.required"
        />
        <q-input v-model="newData.projectRemark" prefix="项目备注" color="green-5"
                 class="q-pa-sm text-subtitle1" type="text" autogrow dense/>
        <div class="q-pa-sm q-pl-lg q-gutter-md">
          <!--操作结果提示-->
          <span class="q-pl-lg text-green-5 text-weight-bolder text-subtitle1" v-if="tTip">添加成功</span>
          <span class="q-pl-lg text-red-5 text-weight-bolder" v-if="fTip">添加失败</span>
          <q-btn :loading="addloading" size="md" color="lime-4" text-color="black" label="保存" @click="addNewData"/>
          <q-btn size="md" text-color="black" label="关闭"  @click="addDrawer=false"/>
        </div>
        </q-card>
      </q-scroll-area>
    </q-drawer>
    <!--编辑项目-->
    <q-dialog v-model="editDialog" full-width>
      <q-card>
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-xs-12 col-lg-4 col-md-6">
              <q-input v-model="rowData.projectName"
                       clearable dense
                       prefix="项目名称"
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       error-message="必填"
                       :error="!this.$v.rowData.projectName.required"
              />
              <q-input v-model="rowData.projectCode"
                       clearable dense
                       prefix="项目代码"
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
              />
            </div>
            <div class="col-xs-12 col-lg-4 col-md-6">
              <q-input v-model="rowData.projectManger" prefix="项目经理" color="green-5" class="q-pa-sm text-subtitle1"
                       clearable dense/>
              <q-select v-model="rowData.projectState" prefix="项目状态"
                        :options="projectStateOptions"
                        color="green-5"
                        class="q-pa-sm text-subtitle1"
                        dense
                        error-message="必填"
                        :error="!this.$v.rowData.projectState.required"/>
            </div>
            <div class="col-xs-12 col-lg-4 col-md-6">
              <q-input v-model="rowData.projectStart"
                       type="date" max="2200-12-31"

                       prefix="开始日期"
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       dense
                       clearable
                       error-message="日期格式错误"
                       :error="!this.$v.rowData.projectStart.maxLength"/>
              <q-input v-model="rowData.projectEnd"
                       type="date" max="2200-12-31"

                       prefix="结束日期"
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       dense
                       clearable
                       error-message="日期格式错误"
                       :error="!this.$v.rowData.projectEnd.maxLength"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-lg-4">
              <q-input v-model="rowData.projectBudget" prefix="项目预算" color="green-5"
                       class="q-pa-sm text-subtitle1" type="number"  hint="只能填“>=0”的数字,且不为空" clearable dense
                       error-message="只能填“>=0”的数字,且不为空"
                       :error="!this.$v.rowData.projectBudget.numeric || !this.$v.rowData.projectBudget.required"/>
            </div>
            <div class="col-xs-12 col-lg-8">
              <q-input v-model="rowData.projectRemark" prefix="项目备注" color="green-5"
                       class="q-pa-sm text-subtitle1" type="text" autogrow dense/>
            </div>
          </div>
        </q-card-section>

        <q-card-section align="right" class="bg-white text-green-5">
          <span class="q-pr-lg text-green-5 text-weight-bolder" v-if="tTip">修改成功</span>
          <span class="q-pr-lg text-red-5 text-weight-bolder" v-if="fTip">修改失败</span>
          <q-btn :loading="loading" flat label="保 存" class="bg-lime-4 text-black" @click="sendEditedData" :disable="btnDisable"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { maxLength, required, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ProjectList',
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
      addDrawer: false,
      editDialog: false,
      projectStateOptions: ['进行中', '完成', '终止', '作废', '暂停'],
      rowData: {
        projectName: null,
        projectCode: null,
        projectManger: null,
        projectState: null,
        projectStart: null,
        projectEnd: null,
        projectRemark: null,
        projectBudget: 0
      },
      newData: {
        projectName: null,
        projectCode: null,
        projectManger: null,
        projectState: null,
        projectStart: null,
        projectEnd: null,
        projectRemark: null,
        projectBudget: 0
      },
      queryData: {
        projectName: null,
        projectCode: null,
        projectManger: null,
        projectState: null,
        projectStart: null,
        projectEnd: null,
        projectRemark: null,
        projectBudget: 0
      },
      columns: [
        {
          name: 'projectName',
          required: true,
          label: '项目名称',
          align: 'left',
          field: row => row.projectName,
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        }
      ]
    }
  },
  mounted () {
    if (this.projectList.length === 0) {
      this.tbLoading = true
    }
    /* 挂载后获取初始分页信息 */
    this.onRequest({
      pagination: this.projectPagination,
      queryData: this.queryData
    })
  },
  validations: {
    newData: {
      projectName: { required },
      projectManger: {},
      projectState: { required },
      projectStart: { maxLength: maxLength(10) },
      projectEnd: { maxLength: maxLength(10) },
      projectBudget: { required, numeric }
    },
    rowData: {
      projectName: { required },
      projectState: { required },
      projectStart: { maxLength: maxLength(10) },
      projectEnd: { maxLength: maxLength(10) },
      projectBudget: { required, numeric }
    },
    queryData: {
      projectStart: { maxLength: maxLength(10) },
      projectEnd: { maxLength: maxLength(10) },
      projectBudget: { required, numeric }
    }
  },
  computed: {
    ...mapState('Project',
      [
        'projectList',
        'projectSendEditedRes',
        'projectAddNewRes',
        'projectTrashRes',
        'projectPageSize'
      ]),
    projectPagination: {
      get () {
        return this.$store.state.Project.projectPagination
      },
      set () {
      }
    }
  },
  methods: {
    /* 不能放在计算属性中，会造成循环计算 */
    ...mapMutations('Project',
      [
        'projectModuleDataMutation',
        'projectAddNewMutation',
        'projectSendEditedMutation',
        'projectSetCurrentPageMutation',
        'projectSetRowsPerPageMutation'
      ]),
    ...mapActions('Project',
      [
        'projectNewDateAction',
        'projectTrashDataAction',
        'projectSendEditedAction',
        'projectModuleDataAction'
      ]),
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    /* 挂载后初始数据 */
    onRequest (props) {
      this.projectModuleDataAction(props)
    },
    /* 查询数据 */
    selectData () {
      this.projectModuleDataAction({
        pagination: this.projectPagination,
        queryData: this.queryData
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
        this.projectSendEditedMutation(99)
        // 点击保存后显示运行图标
        this.loading = true
        this.initTip()
        this.projectSendEditedAction(this.rowData)

        this.projectModuleDataAction({
          pagination: this.projectPagination,
          queryData: this.queryData
        })
      }
    },
    /* 删除数据 */
    trash (props) {
      this.projectTrashDataAction({ autoId: props.row.autoId })
      this.projectModuleDataAction({
        pagination: this.projectPagination,
        queryData: this.queryData
      })
    },
    /* 新增数据 */
    addNewData () {
      if (this.$v.newData.$invalid === false) {
        this.projectAddNewMutation(99)
        // 初始化新增状态
        this.addloading = true
        this.initTip()
        this.projectNewDateAction(this.newData)
        this.projectModuleDataAction({
          pagination: this.projectPagination,
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
    },
    pushToDetail (props) {
      this.$router.push({
        name: 'ProjectBoard',
        params: {
          autoId: props.row.autoId,
          projectName: props.row.projectName
        }
      })
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
      this.projectSetCurrentPageMutation(val)
      this.projectModuleDataAction({
        pagination: this.projectPagination,
        queryData: this.queryData
      })
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.projectSetRowsPerPageMutation(val)
      this.projectModuleDataAction({
        pagination: this.projectPagination,
        queryData: this.queryData
      })
      this.currentPage = 1
    },
    // 监控修改后返回状态
    projectSendEditedRes (val) {
      if (val !== 99) {
        this.loading = false
        this.updateTip(val)
        this.btnDisable = true
        this.sendMetion = false
        this.moduleDataAction({
          pagination: this.projectPagination,
          queryData: this.queryData
        })
      }
    },
    // 监控新增后返回状态
    projectAddNewRes (val) {
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
            pagination: this.projectPagination,
            queryData: this.queryData
          })
        }
      }
    },
    projectTrashRes (val) {
      if (val === 1) {
        this.moduleDataAction({
          pagination: this.projectPagination,
          queryData: this.queryData
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
