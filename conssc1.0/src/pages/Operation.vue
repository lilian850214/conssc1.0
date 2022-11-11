<template>
  <div class="q-pa-lg q-ml-lg">
    <div class="row q-mt-xl">
      <q-card flat   bordered class="col-md-4 q-ml-sm q-mt-md">
        <q-card-section class="q-pa-none bg-grey-4">
          <div class="text-h6 text-center text-bold"><span>通知公告</span></div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none q-pt-lg">
          <q-list separator dense>
            <q-item clickable v-ripple>
              <q-item-section>
                Single line item
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>Item with caption</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label overline>OVERLINE</q-item-label>
                <q-item-label>Item with caption</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card flat bordered  class="col-md-4 q-ml-sm q-mt-md">
        <q-card-section class="q-pa-none bg-grey-4">
          <div class="text-h6 text-center text-bold"><span>新员工预告</span></div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none q-pt-lg">
          <div class="q-pa-sm q-gutter-md">
            <q-chip size="lg"  square>
              <q-avatar color="black" text-color="blue-3">
              <q-icon name="fas fa-address-card"></q-icon>
              </q-avatar>
              <span class="q-ml-md">标定工程师</span>
              <span class="q-ml-md text-bold">李泽宇</span>
            </q-chip>
            <q-chip size="lg"  square>
              <q-avatar color="black" text-color="blue-3">
                <q-icon name="fas fa-address-card"></q-icon>
              </q-avatar>
              <span class="q-ml-md">标定工程师</span>
              <span class="q-ml-md text-bold">李泽宇</span>
            </q-chip>
            <q-chip size="lg"  square>
              <q-avatar color="black" text-color="blue-3">
                <q-icon name="fas fa-address-card"></q-icon>
              </q-avatar>
              <span class="q-ml-md">标定工程师</span>
              <span class="q-ml-md text-bold">李泽宇</span>
            </q-chip>
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered  class="col-md-2 q-ml-sm q-mt-md">
        <q-card-section class="q-pa-none bg-grey-4">
          <div class="text-h6 text-center text-bold"><span>常用下载</span></div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none q-pt-lg">
          <q-list separator dense>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>PPT模板</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>EXCEL模板</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>WORD模板</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>出差申请</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions vertical align="right">
          <q-btn flat>修改/上传</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="row q-mt-xl">
      <q-card flat square bordered class="col-md-5 q-ml-sm q-mt-md">
        <q-card-section class="q-pa-none bg-lime-2">
          <div class="text-h6 text-center text-bold"><span class="">项目列表</span></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>循环列表，项目列表</div>
        </q-card-section>
      </q-card>
      <q-card flat square bordered class="col-md-5 q-ml-md q-mt-md">
        <q-card-section class="q-pa-none bg-lime-2">
          <div class="text-h6 text-center text-bold"><span class="">试验进度</span></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>test1</div>
          <q-linear-progress size="20px" value="0.3" color="green">
            <div class="absolute-full flex flex-center">
              <q-badge color="white" text-color="accent" label="2400000次" />
            </div>
          </q-linear-progress>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-mt-xl">
      <q-card flat square bordered class="col-md-5 q-ml-sm q-mt-md">
      <q-card-section class="q-pa-none bg-light-green-2">
        <div class="text-h6 text-center text-bold"><span class="">销售订单</span></div>
      </q-card-section>
      <q-separator />
      <q-card-section>
          <q-table
            :data="data1"
            :columns="columns"
            row-key="name"
            class="q-ml-sm"
          />
      </q-card-section>
    </q-card>
      <q-card flat square bordered class="col-md-5 q-ml-md q-mt-md">
        <q-card-section class="q-pa-none bg-light-green-2">
          <div class="text-h6 text-center text-bold"><span class="">采购跟踪</span></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-table
            :data="data1"
            :columns="columns"
            row-key="name"
            class="q-ml-sm"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="text-purple-6 text-h6 text-bold q-mt-lg "><span class="q-ml-sm">费用审批</span>
      </div>
    <div class="row">
    <q-card flat square class="col-10">
      <q-table
        :data="data1"
        :columns="columns"
        row-key="name"
        class="q-ml-sm"
      />
    </q-card></div>
    <div class="text-purple-6 text-h6 text-bold q-mt-lg "><span class="q-ml-sm">差旅审批</span>
    </div>
    <div class="row">
      <q-card flat square class="col-10">
        <q-table
          :data="data1"
          :columns="columns"
          row-key="name"
          class="q-ml-sm"
        />
      </q-card></div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { rowsPerPage, crud } from '../components/mixin/baseMixin'
export default {
  name: 'Operation',
  mixins: [rowsPerPage, crud],
  data () {
    return {
      data1: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          style: 'border-left-width: 8px;border-left-color: #2196f3;background-color:#eeeeee'
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      contractSelectDialog: false,
      projectSelectDialog: false,
      thName: [
        'NO.',
        '合同编号',
        '类型',
        '合同标题',
        '合同金额',
        '已付',
        '已收发票',
        '状态',
        '跟踪信息',
        '对方名称',
        '预计交付',
        '所属项目',
        '合同备注'
      ],
      // 要查询的合同信息
      reqStringContract: {
        contractNo: null,
        type: '',
        contractTitle: null,
        companyName: null,
        projectId: null
      },
      cashApplyData: {
        remark: null,
        costNum: 0,
        contractNo: null,
        contractTitle: null,
        projectId: null,
        status: null,
        costTime: null,
        createUserId: null
      }
    }
  },
  computed: {
    ...mapState('Login',
      ['token']),
    ...mapState('PubRes',
      [
        'orgList'
      ]),
    ...mapState('Fin',
      ['']),
    ...mapState('Operation',
      [
        'dataList',
        'cashPageSize'
      ]),
    ...mapState('Project',
      [
        'projectForSelect'
      ]),
    cashPagination: {
      get () {
        return this.$store.state.Operation.cashPagination
      },
      set () {
      }
    },
    contractNoChange () {
      return this.cashApplyData.contractNo
    }
  },
  mounted () {
    this.orgListDataWithoutTreeAction()
  },
  methods: {
    ...mapActions('PubRes',
      [
        'orgListDataWithoutTreeAction'
      ]),
    ...mapActions('Operation',
      [
        'cashNewDateAction',
        'contractSelectAction'
      ]
    ),
    ...mapActions('Project',
      [
        'projectForSelectAction'
      ]),
    ...mapMutations('Operation',
      [
        'setRowsPerPageMutation',
        'setCurrentPageMutation'
      ]),
    cashApply () {
      this.cashApplyData.createUserId = this.token.loginUserInfo.userId
      this.cashNewDateAction(this.cashApplyData)
    }, /* 获取待选择合同信息 */
    onRequest () {
      this.contractSelectAction({
        pagination: this.cashPagination,
        queryData: this.reqStringContract
      })
      this.projectForSelectAction()
    },
    selectContract (props) {
      this.cashApplyData.contractNo = props.row.contractNo
      this.cashApplyData.contractTitle = props.row.contractTitle
      this.contractSelectDialog = false
    },
    openContractDialog () {
      this.onRequest()
      this.contractSelectDialog = true
    }
    // go () {
    //   window.open('http://localhost:8888/camunda/app/', '_blank')
    // }
  },
  watch: {
    // 合同号被清除，合同标题同步被清除
    contractNoChange (val) {
      if (val === null) {
        this.cashApplyData.contractTitle = null
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .card-width-100
    width: 100%
</style>
