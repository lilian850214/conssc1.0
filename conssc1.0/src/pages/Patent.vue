<template>
  <div class="q-pa-md">
    <!--专利图表-->
    <div class="row q-mt-lg">
      <div class="col-md-6 col-sm-12">
        <v-chart :options="pieChart" theme="yellow-green" auto-resize/>
      </div>
      <div class="col-md-6 col-sm-12">
        <v-chart :options="pieAuthChart" theme="yellow-green" auto-resize/>
      </div>
    </div>
    <!--专利查询-->
    <q-card class="q-pt-lg" flat>
      <q-card-section>
          <p class="text-h6 q-pl-lg q-pa-sm half-round bg-lime-4 fixed-width">搜索条件</p>
      <div class="row">
        <div class="col-xs-12 col-lg-3 col-md-6">
          <q-input v-model="queryData.patentId"
                   clearable dense
                   prefix="申请号"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
          />
          <q-input v-model="queryData.patentName"
                   clearable dense
                   prefix="专利名称"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
          />
        </div>
        <div class="col-xs-12 col-lg-3 col-md-6">
          <q-input v-model="queryData.patentType" prefix="专利类型" color="green-5" class="q-pa-sm text-subtitle1"
                   clearable dense/>
          <q-select v-model="queryData.patentState" prefix="专利状态" :options="patentStateOptions" color="green-5"
                    class="q-pa-sm text-subtitle1" dense/>
        </div>
        <div class="col-xs-12 col-lg-3 col-md-6">
          <q-input v-model="queryData.patentApplyDate"

                   type="date" max="2200-12-31"
                   prefix="申请日启"
                   hint="包含该日期"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
                   dense
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.patentApplyDate.maxLength"/>
          <q-input v-model="queryData.patentApplyDateEnd"
                   type="date" max="2200-12-31"
                   prefix="申请日止"
                   color="green-5" class="q-pa-sm text-subtitle1"
                   dense
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.patentApplyDateEnd.maxLength"/>
        </div>
        <div class="col-xs-12 col-lg-3 col-md-6">
          <q-input v-model="queryData.patentPassDate"

                   type="date" max="2200-12-31"
                   prefix="授权日启"
                   hint="包含该日期"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
                   dense
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.patentPassDate.maxLength"
          />
          <q-input v-model="queryData.patentPassDateEnd"
                   type="date" max="2200-12-31"

                   prefix="授权日止"
                   color="green-5" class="q-pa-sm text-subtitle1"
                   dense
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.patentPassDateEnd.maxLength"/>
        </div>
      </div>
      <div class="col-12">
        <q-input v-model="queryData.patentAgency" prefix="代理机构" color="green-5"
                 class="q-pa-sm text-subtitle1" type="text" clearable dense/>
        <q-input v-model="queryData.patentRemark" prefix="专利备注" color="green-5"
                 class="q-pa-sm text-subtitle1" type="textarea" autogrow dense name="patentRemark"/>
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
    <!--专利表格-->
    <div class="q-pa-md q-pt-lg">
      <div class=" q-pa-none">
        <p class="text-h6 q-pl-lg q-pa-sm half-round bg-lime-4 fixed-width q-mb-none">专利列表</p>
        <div>
          <span class="q-pa-lg text-subtitle2">每页显示</span>
          <q-radio v-model="rowsPerPage" val=10 label="10" color="lime-7" size="md"/>
          <q-radio v-model="rowsPerPage" val=20 label="20" color="lime-7" size="md"/>
          <q-radio v-model="rowsPerPage" val=30 label="30" color="lime-7" size="md"/>
          <q-radio v-model="rowsPerPage" val=0 label="所有" color="lime-7" size="md"/>
        </div>
      </div>
      <q-table
        flat
        square
        dense
        :separator="'horizontal'"
        :data="patentList"
        :columns="columns"
        row-key="index"
        :loading="tbLoading"
        class="my-sticky-column-table q-pt-none"
        :pagination.sync="pagination"
        @row-dblclick="edit"
        hide-pagination
      >
        <template v-slot:top-right>
        <q-btn color="lime-4" class="text-black" style="margin-right:-15px" label="新增专利" @click="addDialog=true" />
      </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th></q-th>
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
            <q-td class="q-ma-xs" >
              <q-icon class="q-pa-sm" size="sm" flat name="fas fa-edit" @click="edit(props)"></q-icon>
              <q-icon size="sm" flat name="fas fa-trash-alt" @click="trash(props)"></q-icon>
            </q-td>
            <q-td>{{ props.rowIndex+1 }}</q-td>
            <q-td>{{ props.row.patentId }}</q-td>
            <q-td>
              {{ props.row.patentName }}
            </q-td>
            <q-td>{{ props.row.patentType }}</q-td>
            <q-td :class="props.row.patentState==='授权'?'bg-grey-3':''">{{ props.row.patentState }}</q-td>
            <q-td>{{ props.row.patentApplyDate }}</q-td>
            <q-td>{{ props.row.patentPassDate }}</q-td>
            <q-td>{{ props.row.patentFee }}</q-td>
            <q-td>{{ props.row.patentFeeMetion }}
              <q-badge floating color="red" v-if="diffDate(props.row.patentFeeMetion)">
                即将到期
              </q-badge>
            </q-td>
            <q-td>{{ props.row.patentAgency }}</q-td>
            <q-td>{{ props.row.patentRemark }}</q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          color="black"
          :max="pageSize"
          :max-pages="6"
          :boundary-numbers="true"
        />
      </div>
      <!-- 修改内容-->
      <q-dialog
        v-model="editDialog"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6 q-pt-lg">申请号：{{rowData.patentId}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input v-model="rowData.patentName" prefix="专利名称" class="q-pt-lg text-subtitle1"
                     clearable dense
                     error-message="必填"
                     color="green-5"
                     :error="!this.$v.rowData.patentName.required"/>
            <q-input v-model="rowData.patentType" prefix="专利类型" color="green-5" class="q-pt-lg text-subtitle1"
                     clearable dense/>
            <q-select v-model="rowData.patentState" prefix="专利状态" :options="patentStateOptions" color="green-5"
                      class="q-pt-lg text-subtitle1" dense/>
            <q-input v-model="rowData.patentApplyDate"
                     color="green-5"
                     type="date" max="2200-12-31"

                     prefix="申请日期"
                     class="q-pt-lg text-subtitle1"
                     dense
                     error-message="必填"
                     :error="!this.$v.rowData.patentApplyDate.maxLength"/>
            <q-input v-model="rowData.patentPassDate"
                     type="date" max="2200-12-31"

                     prefix="授权日期"
                     class="q-pt-lg text-subtitle1"
                     dense
                     color="green-5"
                     error-message="日期格式错误"
                     :error="!this.$v.rowData.patentPassDate.maxLength"
            />

            <q-input v-model="rowData.patentFee" prefix="专利费用" color="green-5"
                     class="q-pt-lg text-subtitle1" type="text" clearable dense/>
            <q-input v-model="rowData.patentFeeMetion"
                     color="green-5"
                     type="date" max="2200-12-31"

                     prefix="缴费提醒"
                     class="q-pt-lg text-subtitle1"
                     dense
                     error-message="日期格式错误"
                     :error="!this.$v.rowData.patentFeeMetion.maxLength"
            />
            <q-input v-model="rowData.patentAgency" prefix="代理机构" color="green-5"
                     class="q-pt-lg text-subtitle1" type="text" clearable dense/>
            <q-input v-model="rowData.patentRemark" prefix="专利备注" color="green-5"
                     class="q-pt-lg text-subtitle1" type="textarea" autogrow dense/>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-green-5">
            <span class="q-pr-lg text-green-5 text-weight-bolder" v-if="tTip">修改成功</span>
            <span class="q-pr-lg text-red-5 text-weight-bolder" v-if="fTip">修改失败</span>
            <q-btn :loading="loading" flat label="保 存" class="bg-lime-4 text-black" @click="sendEditedData" :disable="btnDisable"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- 新增专利-->
      <q-dialog
        v-model="addDialog"
        full-width
      >
        <q-card class="bg-grey-2">
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentId"
                         clearable
                         prefix="申请号"
                         color="green-5"
                         class="q-pa-sm text-subtitle1"
                         error-message="申请号重复"
                         :error="!this.$v.newData.patentId.isUnique"
                         debounce="50000"></q-input>
                <q-input v-model="newData.patentName"
                         clearable
                         prefix="专利名称"
                         color="green-5"
                         class="q-pa-sm text-subtitle1"
                         hint=""
                         error-message="必填"
                         :error="!this.$v.newData.patentName.required"
                />
              </div>
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentType" prefix="专利类型"
                         color="green-5"
                         class="q-pa-sm text-subtitle1"
                         clearable
                         hint="请确保同一类型名称相同，否则图表将统计出错"
                         error-message="必填"
                         :error="!this.$v.newData.patentType.required"/>
                <q-select v-model="newData.patentState" prefix="专利状态"
                          :options="patentStateOptions"
                          color="green-5"
                          class="q-pa-sm text-subtitle1"
                          error-message="必填"
                          :error="!this.$v.newData.patentState.required"/>
              </div>
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentApplyDate"
                         type="date" max="2200-12-31"

                         prefix="申请日期"
                         color="green-5"
                         class="q-pa-sm text-subtitle1"
                         clearable
                         error-message="日期格式错误"
                         :error="!this.$v.newData.patentApplyDate.maxLength"/>
                <q-input v-model="newData.patentPassDate"
                         type="date" max="2200-12-31"

                         prefix="授权日期"
                         color="green-5"
                         class="q-pa-sm text-subtitle1"
                         clearable
                         error-message="日期格式错误"
                         :error="!this.$v.newData.patentPassDate.maxLength"
                />
              </div>
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentFeeMetion"
                         type="date" max="2200-12-31"

                         prefix="缴费提醒"
                         color="green-5" class="q-pa-sm text-subtitle1"
                         clearable
                         error-message="日期格式错误"
                         :error="!this.$v.newData.patentFeeMetion.maxLength"/>
                <q-input v-model="newData.patentAgency" prefix="代理机构" color="green-5"
                         class="q-pa-sm text-subtitle1" type="text" clearable/>
              </div>
            </div>
            <div class="col-12">
              <q-input v-model="newData.patentRemark" prefix="专利备注" color="green-5"
                       class="q-pa-sm text-subtitle1" type="textarea" autogrow/>
            </div>
          </q-card-section>

          <q-card-actions align="left" class="bg-grey-2 text-green-5">
            <q-btn :loading="addloading" class="q-ma-md text-black" color="lime-4" label="保 存" size="18px" @click="addNewData"
                   :disabled="this.$v.newData.$invalid">
            </q-btn>
            <!--操作结果提示-->
            <span class="q-pl-lg text-green-5 text-weight-bolder text-subtitle1" v-if="tTip">添加成功</span>
            <span class="q-pl-lg text-red-5 text-weight-bolder" v-if="fTip">添加失败</span>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </div>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex'
import { difDate } from '../util/dataTimeHandler'
import { helpers, maxLength, required } from 'vuelidate/lib/validators'
import { isUnique } from '../util/myValidate'
import VChart, { THEME_KEY } from 'vue-echarts'

export default {
  name: 'Patent',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'dark'
  },
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

      /*
                  * detail 要修改的内容
                  * sendCode 当前修改内容对应的权限代码
                  *
                  *
                  * */
      detail: null,
      editDialog: false,
      addDialog: false,
      /*
                  * rowData 双击表格行后获得改行的数据
                  * newData 新增数据暂存，作为参数发送至后台
                  * */
      patentStateOptions: ['审查中', '授权', '撤回', '失效'],
      rowData: {},
      newData:
          {
            patentId: null,
            patentName: null,
            patentType: null,
            patentState: null,
            patentPassDate: null,
            patentFeeMetion: null,
            patentAgency: null,
            patentRemark: null

          },
      queryData: {
        patentId: null,
        patentName: null,
        patentType: null,
        patentState: null,
        patentApplyDate: null,
        patentApplyDateEnd: null,
        patentPassDate: null,
        patentPassDateEnd: null,
        patentAgency: null,
        patentRemark: null
      },
      columns: [
        {
          name: 'index',
          label: '#',
          align: 'left',
          field: '',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'patentId',
          required: true,
          label: '申请号',
          align: 'left',
          field: '',
          headerClasses: '',
          headerStyle: 'font-size:16px;font-weight:bold',
          style: 'width:10px'
        },
        {
          name: 'patentName',
          required: true,
          label: '专利名称',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentType',
          required: true,
          label: '专利类型',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentState',
          required: true,
          label: '专利状态',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentApplyDate',
          required: true,
          label: '申请日期',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentPassDate',
          required: true,
          label: '授权日期',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentFee',
          required: true,
          label: '专利费用',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentFeeMetion',
          required: true,
          label: '缴费提醒',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
          // format: (val) => getDate(val)
        },
        {
          name: 'patentAgency',
          required: true,
          label: '代理机构',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'patentRemark',
          required: true,
          label: '专利备注',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
        }
      ]
    }
  },
  mounted () {
    if (this.patentList.length === 0) {
      // todo 为空且返回为成功
      this.tbLoading = true
    }
    /* 挂载后获取初始分页信息 */
    this.onRequest({
      pagination: this.pagination,
      queryData: this.queryData
    })
    this.patentChartAction()
  },
  validations: {
    newData: {
      patentId: {
        isUnique: (val) => !helpers.req(val) || isUnique(val).catch(reason => {
        })
      },
      patentName: { required },
      patentState: { required },
      patentType: { required },
      patentApplyDate: { maxLength: maxLength(10) },
      patentFeeMetion: { maxLength: maxLength(10) },
      patentPassDate: { maxLength: maxLength(10) }
    },
    rowData: {
      patentName: { required },
      patentApplyDate: { maxLength: maxLength(10) },
      patentPassDate: { maxLength: maxLength(10) },
      patentFeeMetion: { maxLength: maxLength(10) }
    },
    queryData: {
      patentApplyDate: { maxLength: maxLength(10) },
      patentPassDate: { maxLength: maxLength(10) },
      patentApplyDateEnd: { maxLength: maxLength(10) },
      patentPassDateEnd: { maxLength: maxLength(10) }
    }
  },
  computed: {
    ...mapState('Patent', ['patentList', 'sendEditedRes', 'addNewRes', 'trashRes', 'pageSize', 'pieChart', 'pieAuthChart']),
    pagination: {
      get () {
        return this.$store.state.Patent.pagination
      },
      set () {
      }
    }
  },
  methods: {
    /* 日期判断，小于30天的进行提醒 */
    diffDate: function (date) {
      if (difDate(date) <= 30) {
        return true
      }
      return false
    },
    /* 不能放在计算属性中，会造成循环计算 */
    ...mapMutations('Patent', ['addNewMutation', 'sendEditedMutation', 'setCurrentPageMutation', 'setRowsPerPageMutation']),
    ...mapActions('Patent',
      [
        'trashDataAction',
        'moduleDataAction',
        'sendEditedAction',
        'newDateAction',
        'patentChartAction'
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
        queryData: this.queryData
      })
    },
    resetData () {
      Object.keys(this.queryData).forEach(key => (this.queryData[key] = null))
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
          queryData: this.queryData
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
    // 专利列表发生变动
    patentList (val) {
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

<style lang="sass">
  .half-round
    border-radius: 0 32px 32px 0
  .fixed-width
    width: 150px
</style>
