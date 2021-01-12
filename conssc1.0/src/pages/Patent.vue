<template>
  <div class="q-pa-md">
    <!-- 新增专利-->
    <q-list>
      <q-expansion-item
        icon="fas fa-plus"
        label="新增专利"
        header-class="text-purple text-h6"
      >
        <q-card>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentId" prefix="申请号" color="green-5" class="q-pa-sm text-subtitle1"
                         clearable dense/>
                <q-input v-model="newData.patentName" prefix="专利名称" color="green-5" class="q-pa-sm text-subtitle1"
                         clearable dense/>
              </div>
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentType" prefix="专利类型" color="green-5" class="q-pa-sm text-subtitle1"
                         clearable dense/>
                <q-input v-model="newData.patentState" prefix="专利状态" color="green-5" class="q-pa-sm text-subtitle1"
                         clearable dense/>
              </div>
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentApplyDate"  prefix="申请日期" color="green-5" class="q-pa-sm text-subtitle1" dense>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="newData.patentApplyDate" mask="YYYY-MM-DD" color="green-5" minimal>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="退出" color="green-5" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input v-model="newData.patentPassDate"  prefix="授权日期" color="green-5" class="q-pa-sm text-subtitle1" dense>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="newData.patentPassDate" mask="YYYY-MM-DD" color="green-5" minimal>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-lg-3 col-md-6">
                <q-input v-model="newData.patentFeeMetion"  prefix="缴费提醒" color="green-5" class="q-pa-sm text-subtitle1" dense>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="newData.patentFeeMetion" mask="YYYY-MM-DD" color="green-5" minimal>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input v-model="newData.patentAgency" prefix="代理机构" color="green-5"
                         class="q-pa-sm text-subtitle1" type="text" clearable dense/>
              </div>
            </div>
            <div class="col-12">
              <q-input v-model="newData.patentRemark" prefix="专利备注" color="green-5"
                       class="q-pa-sm text-subtitle1" type="textarea" autogrow dense/>
            </div>
          </q-card-section>

          <q-card-actions align="left" class="bg-white text-green-5">
            <q-btn flat label="保 存" size="18px"  @click="addNewData"/>
            <q-btn flat label="清 空" size="18px"  style="color: #FF0080" @click="addNextNewData"/>
            <span class="q-pl-lg text-green-5 text-weight-bolder text-subtitle1" v-if="tTip">修改成功</span>
            <span class="q-pl-lg text-red-5 text-weight-bolder" v-if="fTip">修改失败</span>
            <q-spinner
            color="lime-5"
            size="2em"
            :thickness="10"
            v-if="addloading"
            class="q-ml-lg"
            />
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </q-list>
    <!--专利表格-->
    <div class="q-pa-md">
      <div class=" q-pa-none">
        <h4 class="q-mb-sm text-center">专利清单</h4>
        <q-separator color="green-5" size="2px"/>
        <div class="q-mt-lg">
          <span class="q-pa-sm" style="line-height:1.5">每页显示</span>
          <q-radio v-model="rowsPerPage" val=10 label="10" color="green-5" size="xs"/>
          <q-radio v-model="rowsPerPage" val=20 label="20" color="green-5" size="xs"/>
          <q-radio v-model="rowsPerPage" val=30 label="30" color="green-5" size="xs"/>
          <q-radio v-model="rowsPerPage" val=50 label="50" color="green-5" size="xs"/>
          <q-radio v-model="rowsPerPage" val=0 label="所有" color="green-5" size="xs"/>
        </div>
      </div>
      <q-table
        flat
        square
        :separator="'horizontal'"
        :data="patentList"
        :columns="columns"
        row-key="index"
        :loading="tbLoading"
        class="my-sticky-column-table q-pt-lg"
        :pagination.sync="pagination"
        @row-dblclick="edit"
        hide-pagination
      >
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
            <q-td>
              <q-btn size="sm" flat icon="fas fa-edit" @click="edit(props)"></q-btn>
              <q-btn size="sm" flat icon="fas fa-trash-alt" @click="trash(props)"></q-btn>
            </q-td>
            <q-td>{{ props.rowIndex+1 }}</q-td>
            <q-td>{{ props.row.patentId }}</q-td>
            <q-td>
              {{ props.row.patentName }}
            </q-td>
            <q-td>{{ props.row.patentType }}</q-td>
            <q-td>{{ props.row.patentState }}</q-td>
            <q-td>{{ props.row.patentApplyDate }}</q-td>
            <q-td>{{ props.row.patentPassDate }}</q-td>
            <q-td>{{ props.row.patentFee }}</q-td>
            <q-td>{{ props.row.patentFeeMetion }}
              <q-badge floating color="red" v-if="diffDate(props.row.patentFeeMetion)">
                即将到期
              </q-badge></q-td>
            <q-td>{{ props.row.patentAgency }}</q-td>
            <q-td>{{ props.row.patentRemark }}</q-td>
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
      <!-- 修改内容对话框-->
      <q-dialog
        v-model="editDialog"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6 q-pt-lg">申请号：{{rowData.patentId}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input standout v-model="rowData.patentName" prefix="专利名称" class="q-pt-lg text-subtitle1"
                     clearable dense/>
            <q-input standout v-model="rowData.patentType" prefix="专利类型" color="green-5" class="q-pt-lg text-subtitle1"
                     clearable dense/>
            <q-input standout v-model="rowData.patentState" prefix="专利状态" color="green-5" class="q-pt-lg text-subtitle1"
                     clearable dense/>
            <q-input standout v-model="rowData.patentApplyDate"  prefix="申请日期" class="q-pt-lg text-subtitle1" dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="rowData.patentApplyDate" mask="YYYY-MM-DD" color="green-5" minimal>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input standout v-model="rowData.patentPassDate"  prefix="授权日期" class="q-pt-lg text-subtitle1" dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="rowData.patentPassDate" mask="YYYY-MM-DD" color="green-5" minimal>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input standout v-model="rowData.patentFee" prefix="专利费用" color="green-5"
                     class="q-pt-lg text-subtitle1" type="text" clearable dense/>
            <q-input standout v-model="rowData.patentFeeMetion"  prefix="缴费提醒" class="q-pt-lg text-subtitle1" dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="rowData.patentFeeMetion" mask="YYYY-MM-DD" color="green-5" minimal>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input standout v-model="rowData.patentAgency" prefix="代理机构" color="green-5"
                     class="q-pt-lg text-subtitle1" type="text" clearable dense/>
            <q-input standout v-model="rowData.patentRemark" prefix="专利备注" color="green-5"
                     class="q-pt-lg text-subtitle1" type="textarea" autogrow dense/>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-green-5">
            <span class="q-pr-lg text-green-5 text-weight-bolder" v-if="tTip">修改成功</span>
            <span class="q-pr-lg text-red-5 text-weight-bolder" v-if="fTip">修改失败</span>
            <q-spinner
              color="lime-5"
              size="2em"
              :thickness="10"
              v-if="loading"
              class="q-ml-lg"
            />
            <q-btn flat label="保 存" size="18px"  @click="sendEditedData" :disable="btnDisable"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
    <!--  修改数据-->
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

import { mapState, mapMutations, mapActions } from 'vuex'
import { difDate } from '../util/dataTimeHandler'

export default {
  name: 'Patent',
  data () {
    return {
      /*
              * currentPage，rowsPerPage表格分页初始化
              * tbLoading 表格显示加载状态
              * */
      currentPage: 1,
      rowsPerPage: '10',
      tbLoading: false,
      selected: [],

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
              * modifiedIndex 当前修改内容对应的索引值，用于mutation中对应修改vuex的值
              *
              * */
      detail: null,
      modifiedIndex: null,
      editDialog: false,
      /*
              * rowData 双击表格行后获得改行的数据
              * newData 新增数据暂存，作为参数发送至后台
              * */
      rowData: [],
      newData: [
        {
          patentId: null,
          patentName: null,
          patentType: null,
          patentState: null,
          patentPassDate: null,
          patentFeeMetion: null,
          patentAgency: null,
          patentRemark: null

        }
      ],
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
          // format: (val) => getDate(val)
        },
        {
          name: 'patentPassDate',
          required: true,
          label: '授权日期',
          align: 'left',
          field: '',
          headerStyle: 'font-size:16px;font-weight:bold'
          // format: (val) => getDate(val)
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
  computed: {
    ...mapState('Patent', ['patentList', 'sendEditedRes', 'addNewRes', 'pageSize']),
    pagination: {
      get () {
        return this.$store.state.Patent.pagination
      },
      set () {
      }
    }
  },
  mounted () {
    if (this.patentList.length === 0) {
      // todo 为空且返回为成功
      this.tbLoading = true
    }
    /* 挂载后获取初始分页信息 */
    this.onRequest({
      pagination: this.pagination
    })
  },
  methods: {
    diffDate: function (date) {
      if (difDate(date) <= 30) {
        return true
      }
      return false
    },
    /* 不能放在计算属性中，会造成循环计算 */
    ...mapMutations('Patent', ['addNewMutation', 'sendEditedMutation', 'setCurrentPageMutation', ' setRowsPerPageMutation']),
    ...mapActions('Patent', ['trashDataAction', 'moduleDataAction', 'sendEditedAction', 'newDateAction']),
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    /* 挂载后获取初始数据 */
    onRequest (props) {
      this.moduleDataAction(props.pagination)
    },
    /* 获得行的信息赋予rowdata，准备向后台发送 */
    edit (props) {
      this.btnDisable = false
      this.initTip()
      this.editDialog = true
      this.rowData = Object.assign({}, props.row)
      console.log(this.rowData)
    },
    trash (props) {
      this.trashDataAction({ autoId: props.row.autoId })
    },
    /* 向后台发送修改后的data进行更新 */
    sendEditedData () {
      this.sendEditedMutation(99)
      // 点击保存后显示运行图标
      this.loading = true
      this.initTip()
      this.sendEditedAction(this.rowData)
    },
    /* 向后台发送新增数据 */
    addNewData () {
      this.addNewMutation(99)
      // 初始化新增状态
      this.addloading = true
      this.initTip()
      this.newDateAction(this.newData)
    },
    addNextNewData () {
      this.initTip()
      this.addloading = false
      this.newData = []
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
    patentList (val) {
      this.tbLoading = false
    },
    // 翻页
    currentPage (val) {
      this.tbLoading = true
      this.setCurrentPageMutation(val)
      this.onRequest({
        pagination: this.pagination
      })
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.setRowsPerPageMutation(val)
      this.onRequest({
        pagination: this.pagination
      })
      this.currentPage = 1
    },
    // 监控修改后返回状态
    sendEditedRes (val) {
      if (val !== 99) {
        this.loading = false
        this.updateTip(val)
        this.btnDisable = true
      }
    },
    // 监控新增后返回状态
    addNewRes (val) {
      if (val !== 99) {
        this.addloading = false
        this.updateTip(val)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
