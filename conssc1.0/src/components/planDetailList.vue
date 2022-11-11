<template>
  <div>
    <div class="q-mt-md">
      <q-page-sticky position="top-right" :offset="[-300,-25]" style="z-index: 999">
        <q-btn square  color="lime-4" icon="fas fa-plus" class="text-black" @click="addListItemDialog=true" size="sm">
          <q-tooltip>新增进度</q-tooltip>
        </q-btn>
      </q-page-sticky>
      <p class="text-h6 q-ma-lg"><strong>子进度列表</strong></p>
      <q-list  separator v-for="(item,index) in projectDetailList" :key="index">
        <q-item clickable active-class="text-bold bg-yellow-2 text-black"
                :active="listLink===item.planDetailListName">
          <q-item-section @click="showContent(item)">
            <span>{{index+1}}：{{item.planDetailListName}}</span>
            <q-item-label caption>
              <span :class="item.planState==='完成'?'text-green':item.planState==='进行中'?'text-yellow-10':'text-grey'">
                {{item.planState}}
              </span>
              <span class="q-ml-sm">{{item.planStart}}</span>
              <span class="float-right q-gutter-sm">
              <q-icon name="fas fa-edit" style="font-size: 10px;" class="text-grey"  @click="edit(item)"></q-icon>
              <q-icon name="fas fa-trash" style="font-size: 10px;" class="text-grey"  @click="trash(item.autoId)"></q-icon>
                </span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </div>
<!--修改editDialog-->
      <q-dialog v-model="editDialog" full-width>
        <q-card>
          <q-card-section class="q-pt-none">
            <p class="text-h6 text-bold q-pa-md">修改内容</p>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="rowData.planDetailListName"
                     prefix="进度名称"  class="q-pa-sm" color="green"/>
            <q-input dense v-model="rowData.planStart"
                     prefix="开始时间" type="date" max="2200-12-31"
                      class="q-pa-sm" color="green"
                     error-message="日期格式错误"
                     :error="!this.$v.rowData.planStart.maxLength"
            />
            <q-input dense v-model="rowData.planEnd"
                     prefix="结束时间" type="date" max="2200-12-31"
                      class="q-pa-sm" color="green"
                     error-message="日期格式错误"
                     :error="!this.$v.rowData.planEnd.maxLength"/>
            <q-input dense v-model="rowData.personInCharge"
                     prefix="负责人" class="q-pa-sm" color="green"/>
            <q-select dense prefix="状态" class="q-pa-sm" v-model="rowData.planState" :options="planState"  color="green"></q-select>
          </q-card-section>
          <q-card-actions align="right">
            <q-icon name="fas fa-check" size="20px" color="green" v-if="tTip"></q-icon>
            <q-icon name="fas fa-times" size="20px" color="red" v-if="fTip"></q-icon>
            <q-btn class="q-ma-sm text-black" :loading="loading" label="保存" color="lime-4" @click="sendEditedData" />
          </q-card-actions>
        </q-card>
      </q-dialog>
<!--新增Dialog-->
      <q-dialog v-model="addListItemDialog">
        <q-card>
          <q-card-section class="q-pt-none">
            <p class="text-h6 text-bold q-pa-md">新增进度</p>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="newData.planDetailListName"
                     prefix="进度名称"  class="q-pa-sm" color="green"
                     error-message="必填"
                     :error="!this.$v.newData.planDetailListName.required"/>
            <q-input dense v-model="newData.planStart"
                     prefix="开始时间" type="date" max="2200-12-31"

                     class="q-pa-sm" color="green"
                     error-message="日期格式错误"
                     :error="!this.$v.newData.planStart.maxLength"
            />
            <q-input dense v-model="newData.planEnd"
                     prefix="结束时间" type="date" max="2200-12-31"

                     class="q-pa-sm" color="green"
                     error-message="日期格式错误"
                     :error="!this.$v.newData.planEnd.maxLength"/>
            <q-input dense v-model="newData.personInCharge"
                     prefix="负责人" class="q-pa-sm" color="green"/>
            <q-select dense prefix="状态" class="q-pa-sm" v-model="newData.planState" :options="planState"  color="green"
                      error-message="必填"
                      :error="!this.$v.newData.planState.required"/>
          </q-card-section>
          <q-card-actions align="right">
            <q-icon name="fas fa-check" size="20px" color="green" v-if="tTip"></q-icon>
            <q-icon name="fas fa-times" size="20px" color="red" v-if="fTip"></q-icon>
            <q-btn class="q-ma-sm text-black" :loading="loading" label="保存" color="lime-4" @click="addNewData" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { maxLength, required } from 'vuelidate/lib/validators'
export default {
  name: 'planDetailList',
  data () {
    return {
      addloading: false,
      loading: false,
      tTip: false,
      fTip: false,
      editDialog: false,
      addListItemDialog: false,
      listLink: null,
      planState: ['进行中', '完成', '终止', '废除'],
      newData: {
        planDetailListName: null,
        parentPlanId: null,
        planStart: null,
        planEnd: null,
        personInCharge: null,
        planState: null
      },
      rowData: {
        planDetailListName: null,
        parentPlanId: null,
        planStart: null,
        planEnd: null,
        personInCharge: null,
        planState: null
      }
    }
  },
  validations: {
    newData: {
      planDetailListName: { required },
      parentPlanId: {},
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) },
      personInCharge: {},
      planState: { required }
    },
    rowData: {
      planDetailListName: {},
      parentPlanId: {},
      planStart: { maxLength: maxLength(10) },
      planEnd: { maxLength: maxLength(10) },
      personInCharge: {},
      planState: {}
    }
  },
  computed: {
    ...mapState('Project',
      [
        'projectDetailProjectPlanAutoId',
        'projectDetailAddNewRes',
        'projectDetailTrashRes',
        'projectDetailSendEditedRes',
        'projectDetailList'
      ])
  },
  mounted () {
  },
  methods: {
    ...mapActions('Project',
      [
        'projectDetailNewDateAction',
        'projectDetailTrashDataAction',
        'projectDetailSendEditedAction',
        'projectDetailModuleDataAction',
        'projectDetailContentModuleDataAction'
      ]),
    ...mapMutations('Project',
      [
        'projectDetailAddNewMutation',
        'projectDetailSendEditedMutation',
        'projectDetailContentParentInfoMutation',
        'projectDetailContentListIdMutation',
        'projectDetailContentMutation'
      ]),
    /* 挂载后初始数据 */
    onRequest (props) {
      this.projectDetailModuleDataAction(props)
    },
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    /* 获得信息赋予，准备向后台发送 */
    edit (row) {
      this.btnDisable = false
      this.initTip()
      this.editDialog = true
      this.rowData = Object.assign({}, row)
    },
    /* 删除数据 */
    trash (val) {
      this.projectDetailTrashDataAction({ autoId: val })
    },
    addNewData () {
      if (this.$v.newData.$invalid === false) {
        this.newData.parentPlanId = this.projectDetailProjectPlanAutoId
        // 初始化新增状态
        this.addloading = true
        this.initTip()
        this.projectDetailNewDateAction(this.newData)
        this.onRequest({
          parentPlanId: this.projectDetailProjectPlanAutoId
        })
      }
    },
    /* 修改数据 */
    sendEditedData () {
      if (this.$v.rowData.$invalid === false) {
        this.initTip()
        // 点击保存后显示运行图标
        this.loading = true
        this.projectDetailSendEditedAction(this.rowData)
        this.onRequest({
          parentPlanId: this.projectDetailProjectPlanAutoId
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
    showContent (val) {
      this.listLink = val.planDetailListName
      this.projectDetailContentParentInfoMutation(val)
      this.projectDetailContentListIdMutation(val.autoId)
    }
  },
  watch: {
    projectDetailList (val) {
      if (val.length === 0) {
        this.projectDetailContentParentInfoMutation(val)
      } else {
        this.listLink = val[0].planDetailListName
        this.projectDetailContentParentInfoMutation(val[0])
        this.projectDetailContentListIdMutation(val[0].autoId)
      }
    },
    // 监控新增后返回状态
    projectDetailAddNewRes (val) {
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
            this.initTip()
          }, 800)
          this.onRequest({
            parentPlanId: this.projectDetailProjectPlanAutoId
          })
        }
      }
    },
    projectDetailTrashRes (val) {
      if (val === 1) {
        this.onRequest({
          parentPlanId: this.projectDetailProjectPlanAutoId
        })
        // todo 成功后连带删除content
      }
    },
    // 监控修改后返回状态
    projectDetailSendEditedRes (val) {
      if (val === 1) {
        this.loading = false
        this.updateTip(val)
        this.onRequest({
          parentPlanId: this.projectDetailProjectPlanAutoId
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
