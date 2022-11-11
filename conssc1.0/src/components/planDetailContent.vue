<template>
  <div>
    <q-card square flat bordered class="q-mb-lg">
      <q-table dense flat square
               :data="projectDetailContentParentInfo"
               hide-pagination
               :columns="columnsForProjectDetailContentParentInfo"
               row-key="planName"
               class="text-center"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>
              {{ props.row.planDetailListName }}
            </q-td>
            <q-td>
              {{ props.row.planStart }}
            </q-td>
            <q-td>
              {{ props.row.planEnd }}
            </q-td>
            <q-td>
              {{ props.row.personInCharge }}
            </q-td>
            <q-td :class="props.row.planState === '进行中' ? 'bg-yellow-3' :( props.row.planState === '完成' ? 'bg-green-3' : (props.row.planState === '暂停' ? 'bg-red-3' : 'bg-grey-3'))">
              {{ props.row.planState }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <q-card square flat bordered>
      <div class="bg-black">
        <q-avatar square size="38px" font-size="20px" color="lime-4" text-color="black" icon="fas fa-plus"/>
        <span class="text-white q-ma-lg text-bold text-subtitle1">新增内容</span>
        <q-icon name="fas fa-check" size="20px" color="green" v-if="newAddtTip"></q-icon>
        <q-icon name="fas fa-times" size="20px" color="red" v-if="newAddfTip"></q-icon>
      </div>
      <div class="q-ma-sm">
        <q-editor
          v-model="newData.listContent"
          flat
          dense
          square
          content-class="bg-grey-2 text-h6"
          toolbar-text-color="black"
          toolbar-toggle-color="red"
          :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          }],
        ['unordered', 'ordered'],
      ]"
        />
        <q-input dense v-model="newData.contentDate" prefix="日期"
                 type="date" max="2200-12-31"

                 class="q-pa-none" color="green"></q-input>
        <q-btn :loading="addloading" class="q-ma-sm text-black" color="lime-4" size="md" @click="addNewData">保存</q-btn>
        <span class="text-red text-h6 q-ma-lg">{{validationTips}}</span>
      </div>
      <q-timeline>
        <q-timeline-entry v-for="item in projectDetailContent"
                          color="lime-7"
                          class="q-ma-sm"
                          :key="item.index"
        >
          <template v-slot:title>
            <span class="q-mr-lg text-bold">{{ item.contentDate}}</span>
            <q-icon name="fas fa-edit" size="16px" class="q-mr-md" color="grey" @click="edit(item)"></q-icon>
            <q-icon name="fas fa-trash" size="16px" class="q-mr-md" color="grey" @click="trash(item)"></q-icon>
          </template>
          <div v-html="item.listContent" class="text-subtitle1 q-pa-sm"></div>
        </q-timeline-entry>
      </q-timeline>
    </q-card>
<!--content编辑对话框-->
    <q-dialog
      v-model="editDialog"
      full-width
    >
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-bold">请修改内容</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-editor
            v-model="rowData.listContent"
            dense
            square
            content-class="bg-grey-2 text-h6"
            toolbar-text-color="black"
            toolbar-toggle-color="red"
            :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          }],
        ['unordered', 'ordered'],
      ]"
          />
          <q-input dense v-model="rowData.contentDate" prefix="日期"
                   type="date" max="2200-12-31"

                   class="q-pa-none" color="green"></q-input>
          <p class="text-red text-h6 q-ma-lg">{{validationTips}}</p>
        </q-card-section>

        <q-card-actions class="q-pt-none">
          <q-btn :loading="editloading" class="q-ma-sm text-black" color="lime-4" size="md" @click="sendEditedData">保存</q-btn>
          <q-icon name="fas fa-check" size="20px" color="green" v-if="tTip"></q-icon>
          <q-icon name="fas fa-times" size="20px" color="red" v-if="fTip"></q-icon>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { maxLength, required } from 'vuelidate/lib/validators'
export default {
  name: 'planDetailContent',
  data () {
    return {
      visible: true,
      planState: null,
      options: ['进行中', '终止', '完成', '废除'],
      addloading: false,
      editloading: false,
      tTip: false,
      fTip: false,
      newAddtTip: false,
      newAddfTip: false,
      validationTips: null,
      editDialog: false,
      columnsForProjectDetailContentParentInfo: [
        {
          name: 'planDetailListName',
          required: true,
          label: '任务名称',
          align: 'center',
          headerClasses: 'bg-black text-lime',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planStart',
          required: true,
          label: '开始时间',
          align: 'center',
          headerClasses: 'bg-black text-lime',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planEnd',
          required: true,
          label: '结束时间',
          align: 'center',
          headerClasses: 'bg-black text-lime',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'personInCharge',
          required: true,
          label: '负责人',
          align: 'center',
          headerClasses: 'bg-black text-lime',
          headerStyle: 'font-size:16px;font-weight:bold'
        },
        {
          name: 'planState',
          required: true,
          label: '状态',
          align: 'center',
          headerClasses: 'bg-black text-lime',
          headerStyle: 'font-size:16px;font-weight:bold'
        }
      ],
      newData: {
        listId: null,
        listContent: '',
        contentDate: null
      },
      rowData: {
        listId: null,
        listContent: '',
        contentDate: null
      }
    }
  },
  computed: {
    ...mapState('Project',
      [
        'projectDetailProjectPlanAutoId',
        'projectDetailAddNewContentRes',
        'projectDetailSendEditedContentRes',
        'projectDetailContent',
        'projectDetailContentParentInfo',
        'projectDetailContentListId',
        'projectDetailList'
      ])
  },
  validations: {
    newData: {
      listContent: { required },
      contentDate: { maxLength: maxLength(10), required }
    },
    rowData: {
      listContent: { required },
      contentDate: { maxLength: maxLength(10), required }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions('Project',
      [
        'projectDetailContentModuleDataAction',
        'projectDetailContentNewDateAction',
        'projectPlanDetailContentTrashDataAction',
        'projectPlanDetailContentSendEditedAction'
      ]),
    ...mapMutations('Project',
      [
        'projectDetailContentParentInfoMutation',
        'projectPlanDetailContentTrashMutation',
        'projectPlanDetailContentMutation'
      ]),
    /* 请求数据 */
    onRequest (props) {
      this.projectDetailContentModuleDataAction(props)
    },
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    },
    initNewAddTip () {
      this.newAddtTip = false
      this.newAddfTip = false
    },
    addNewData () {
      if (this.$v.newData.$invalid === false) {
        this.validationTips = null
        this.newData.listId = this.projectDetailContentListId
        // 初始化新增状态
        this.addloading = true
        this.initNewAddTip()
        this.projectDetailContentNewDateAction(this.newData)
      } else {
        this.validationTips = '请检查输入内容和日期，均为必填项！'
      }
    },
    /* 删除数据 */
    trash (val) {
      this.projectPlanDetailContentTrashDataAction({ autoId: val.autoId })
      this.onRequest({
        listId: this.projectDetailContentParentInfo[0].autoId
      })
    },
    /* 获得行的信息赋予rowdata，准备向后台发送 */
    edit (props) {
      this.initTip()
      this.editDialog = true
      Object.assign(this.rowData, props)
    },
    /* 修改数据 */
    sendEditedData () {
      if (this.$v.rowData.$invalid === false) {
        // 点击保存后显示运行图标
        this.editloading = true
        this.initTip()
        this.projectPlanDetailContentSendEditedAction(this.rowData)
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
    updateNewAddTip (val) {
      // 监控变化之前要先重置Res为99，
      if (val === 0) {
        this.newAddtTip = false
        this.newAddfTip = true
      }
      if (val === 1) {
        this.newAddtTip = true
        this.newAddfTip = false
      }
    }
  },
  watch: {
    // 监控新增后返回状态
    projectDetailAddNewContentRes (val) {
      if (val !== 99) {
        // 显示操作返回结果
        this.updateNewAddTip(val)
        // 返回状态后变更加载状态
        this.addloading = false
        // 操作成功
        if (val === 1) {
          // 使数据集为空等待添加下一条
          const _this = this
          setTimeout(function () {
            _this.newData.listContent = ''
            _this.newData.contentDate = null
            this.initNewAddTip()
          }, 800)
          this.onRequest({
            listId: this.projectDetailContentParentInfo[0].autoId
          })
        }
      }
    },
    projectDetailSendEditedContentRes (val) {
      if (val === 1) {
        this.editloading = false
        this.updateTip(val)
        this.onRequest({
          listId: this.projectDetailContentParentInfo[0].autoId
        })
      }
    },
    // 监控父级计划发生改变
    projectDetailContentParentInfo (val) {
      this.onRequest({
        listId: val[0].autoId
      })
    }
  }
}
</script>

<style scoped>

</style>
