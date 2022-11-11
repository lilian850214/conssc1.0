<template>
  <div class="q-pa-lg">
<!--    费用申请-->
    <div class="q-mt-md">
      <q-chip>
        <q-avatar color="blue-6" square text-color="white">￥</q-avatar>
        <span class="text-h6 text-bold">费用申请</span>
      </q-chip>
      <div class="row q-mt-sm">
        <q-card flat class="col-12">
        <q-tabs
          v-model="feeTab"
          dense
          class="text-grey-9"
          active-color="blue"
          indicator-color="blue"
          align="left"
          narrow-indicator
        >
          <q-tab name="applyFee" label="去申请" />
          <q-tab name="applyFeeProcess" label="查进度" />
        </q-tabs>
        <q-tab-panels v-model="feeTab" animated>
          <q-tab-panel name="applyFee">
            <div class="row">
            <q-card flat square bordered class="col-lg-4 col-md-6 col-sm-12">
              <div class="bg-blue-1 text-center"><span class="text-h6">请填写申请明细</span></div>
              <q-card-section class="q-pa-sm">
                <q-input v-model="cashApplyData.remark"
                         clearable
                         dense
                         class="q-mt-md text-subtitle1"
                         input-class="q-ml-md"
                         color="blue-6">
                  <template v-slot:before>
                    <span class="inputLabel-nobg text-black">申请内容</span>
                  </template>
                </q-input>
                <q-input v-model="cashApplyData.costNum"
                         dense
                         type="number"
                         class="text-subtitle1"
                         input-class="q-ml-md"
                         color="blue-6">
                  <template v-slot:before>
                    <span class="inputLabel-nobg text-black">申请金额</span>
                  </template>
                </q-input>
                <q-input v-model="cashApplyData.contractNo"
                         dense
                         clearable
                         class="text-subtitle1"
                         input-class="q-ml-md"
                         color="blue-6"
                         hint="*无对应合同可不选择"
                         @click="openContractDialog()"
                >
                  <template v-slot:before>
                    <span class="inputLabel-nobg text-black">关联合同</span>
                  </template>
                </q-input>
                <q-input v-model="cashApplyData.contractTitle"
                         dense
                         disable
                         class="text-subtitle1"
                         input-class="q-ml-md"
                         color="white"
                >
                  <template v-slot:before>
                    <span class="inputLabel-nobg text-black">合同标题</span>
                  </template>
                </q-input>
                <q-select :options="projectForSelect" v-model="cashApplyData.projectId"
                          map-options
                          emit-value
                          dense
                          clearable
                          class="text-subtitle1"
                          input-class="q-ml-md"
                          hint="*无对应项目可不选择"
                          color="blue-6">
                  <template v-slot:before>
                    <span class="inputLabel-nobg text-black">对应项目</span>
                  </template>
                </q-select>
              </q-card-section>
              <q-card-actions  align="center">
                <q-btn flat color="blue-6" class="text-bold text-subtitle1" @click="submitTravelFee">
                  <q-icon name="fas fa-save" size="25px"/>
                  <q-tooltip>保 存</q-tooltip></q-btn>
                <q-btn flat color="grey" class="text-bold text-subtitle1" @click="resetTravelFee">
                  <q-icon name="fas fa-undo-alt" size="25px"/>
                  <q-tooltip>重 置</q-tooltip></q-btn>
              </q-card-actions>
            </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="applyFeeProcess">
            <q-card flat square>
              <q-table
                :data="data1"
                :columns="columns"
                row-key="name"
                class="q-ml-sm"
              />
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
        </q-card>

      </div>
    </div>
<!--    差旅报销-->
    <div class="q-mt-md">
      <q-chip>
        <q-avatar color="purple-6" square text-color="white"><q-icon name="fas fa-plane-departure"></q-icon></q-avatar>
        <span class="text-h6 text-bold">差旅报销</span>
      </q-chip>
      <div class="row q-mt-sm">
        <q-card flat class="col-12">
          <q-tabs
            v-model="travelTab"
            dense
            class="text-grey-9"
            active-color="purple"
            indicator-color="purple"
            align="left"
            narrow-indicator
          >
            <q-tab name="travelFee" label="去申请" />
            <q-tab name="travelFeeProcess" label="查进度" />
          </q-tabs>
          <q-tab-panels v-model="travelTab" animated>
 <!--差旅申请-->
            <q-tab-panel name="travelFee">
              <div class="row">
                <q-card flat square bordered class="col-12">
                  <div class="bg-purple-1 text-center"><span class="text-h6">请填写差旅明细</span></div>
                  <div class="row">
                  <q-card-section class="q-pa-sm col-lg-4 col-md-6 col-sm-12">
                    <q-input v-model="travelApplyData.travelLocation"
                             clearable
                             label="出差地点"
                             class="q-mt-md text-subtitle1"
                             input-class="q-ma-md"
                             color="purple"
                    error-message="* 去哪了？"
                    :error="!this.$v.travelApplyData.travelLocation.required">
                    </q-input>
                    <q-select :options="projectForSelect" v-model="cashApplyData.projectId"
                              map-options
                              emit-value
                              clearable
                              label="所属项目"
                              class="text-subtitle1"
                              input-class="q-ml-md"
                              color="purple">
                    </q-select>
                    <q-input v-model="travelApplyData.travelDuringTime"
                             label="出差时间"
                             class="text-subtitle1"
                             input-class="q-ml-md"
                             color="purple"
                             error-message="* 从哪天到哪天？"
                             :error="!this.$v.travelApplyData.travelDuringTime.required"
                    >
                    </q-input>
                    <div class="q-gutter-sm q-mt-md" >
                      <span class="text-subtitle1 text-grey-7">私车公用：</span>
                      <q-radio v-model="travelApplyData.travelCarStatus" val="1" label="是" color="purple" class="q-mt-none"/>
                      <q-radio v-model="travelApplyData.travelCarStatus" val="0" label="否" color="purple" class="q-mt-none" />
                    </div>
                    <q-input v-model="travelApplyData.travelDetail"
                             label="出差事由"
                             class="text-subtitle1"
                             input-class="q-ml-md"
                             color="purple"
                             error-message="* 干什么去了^_^？"
                             :error="!this.$v.travelApplyData.travelDetail.required"
                    >
                    </q-input>

                  </q-card-section>
                  <q-card-section class="q-pa-lg col-lg-8 col-md-6 col-sm-12">
                    <div class="q-mb-lg">
                    <q-btn color="purple" @click="editFee">
                      <q-icon name="fas fa-edit" size="sm" class="q-mr-md"></q-icon>费用明细</q-btn>
                    </div>
                    <div>
                    <q-chip square color="grey-5" size="20px">
                      <q-avatar color="red" text-color="white">
                        <q-icon name="fas fa-car" size="md"></q-icon>
                      </q-avatar>
                      <h6>￥{{ this.totalTravelFee.car|money }}</h6>
                    </q-chip>
                      <q-chip square color="grey-5" size="20px">
                        <q-avatar color="red" text-color="white">
                        <q-icon name="fas fa-train" size="sm"></q-icon>
                      </q-avatar>
                      <h6>￥{{totalTravelFee.train |money }}</h6>
                    </q-chip>
                      <q-chip square color="grey-5" size="20px">
                        <q-avatar color="red" text-color="white">
                        <q-icon name="fas fa-plane" size="sm"></q-icon>
                      </q-avatar>
                      <h6>￥{{totalTravelFee.plane |money }}</h6>
                    </q-chip>
                    </div>
                    <div class="q-mt-md">
                      <q-chip square color="grey-5" size="20px">
                        <q-avatar color="red" text-color="white">
                        <q-icon name="fas fa-bed" size="sm"></q-icon>
                      </q-avatar>
                      <h6>￥{{totalTravelFee.hotel |money }}</h6>
                    </q-chip>
                      <q-chip square color="grey-5" size="20px">
                        <q-avatar color="red" text-color="white">
                        <q-icon name="fas fa-utensils" size="sm"></q-icon>
                      </q-avatar>
                      <h6>￥{{totalTravelFee.meals |money }}</h6>
                    </q-chip>
                      <q-chip square color="grey-5" size="20px">
                        <q-avatar color="red" text-color="white">
                        <q-icon name="fas fa-question" size="sm"></q-icon>
                      </q-avatar>
                      <h6>￥{{totalTravelFee.others |money }}</h6>
                    </q-chip>
                    </div>
                    <div class="q-mt-md">
                      <q-chip square color="black" size="20px" class="text-white">
                        <q-avatar color="red" text-color="white">
                          共
                        </q-avatar>
                        <h6>￥{{totalTravelFee.car+
                          totalTravelFee.plane+
                          totalTravelFee.hotel+
                          totalTravelFee.train+
                          totalTravelFee.meals+
                          totalTravelFee.others|money}}</h6>
                      </q-chip>
                    </div>
                  </q-card-section>
                  </div>
                  <q-card-actions  align="center">
                    <q-btn flat color="purple" class="text-bold text-subtitle1" @click="submitTravelFee">
                      <q-icon name="fas fa-check" size="30px"/>
                      <q-tooltip>提 交</q-tooltip></q-btn>
                    <q-btn flat color="grey" class="text-bold text-subtitle1" @click="resetTravelFee">
                      <q-icon name="fas fa-undo-alt" size="30px"/>
                      <q-tooltip>重 置</q-tooltip></q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>
<!--查询差旅报销进度-->
            <q-tab-panel name="travelFeeProcess">
              <q-card flat square>
                <q-table
                  :data="data1"
                  :columns="columns"
                  row-key="name"
                  class="q-ml-sm"
                />
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

      </div>
    </div>
    <!--合同选择-->
    <q-dialog v-model="contractSelectDialog" persistent full-width>
      <q-card>
        <ltitle>请选择对应合同</ltitle>
        <q-card-section>
          <q-input prefix="合同编号" dense v-model="reqStringContract.contractNo"
                   class="q-ml-md"
                   input-class="q-ml-lg" color="green">
          </q-input>
          <q-input prefix="合同标题" dense v-model="reqStringContract.contractTitle"
                   class="q-ml-md"
                   input-class="q-ml-lg" color="green">
          </q-input>
          <q-input prefix="对方公司" dense v-model="reqStringContract.companyName"
                   class="q-ml-md"
                   input-class="q-ml-lg" color="green">
          </q-input>
          <div class="row">
            <div class="col-lg-10 col-md-12"></div>
            <div class="col-lg-2 col-md-12">
              <q-btn class="q-ma-sm" color="white" text-color="black" label="重 置" size="md"
              />
              <q-btn class="q-ma-sm text-black" color="lime-4" label="查 询" size="md" @click="queryContract()"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-table
            dense
            bordered
            flat
            :data="dataList"
            :pagination.sync="cashPagination"
            hide-pagination
            separator="cell">
            <template v-slot:top-right>
              <NumPerPage @sendRowsPerPage="getRowsPerPage"/>
            </template>
            <template v-slot:header>
              <q-tr class="bg-grey-2" >
                <q-th class="text-center" style="font-weight: bold;font-size: 16px" v-for="(item,index) in thName" :key="index" :class="item==='合同标题'?'sticky-td':''">
                  {{item}}</q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr>
                <q-td class="q-ma-xs text-center" style="width:1px">
                  <strong>{{props.rowIndex+1}}</strong>
                </q-td>
                <q-td key="contractNo">
                  {{ props.row.contractNo }}
                </q-td>
                <q-td key="type" class="text-center">
                  {{ props.row.type }}
                </q-td>
                <q-td key="contractTitle"  class="sticky-td" :class="props.row.contractNo===cashApplyData.contractNo?'bg-lime-2':'bg-white'">
                  <q-icon class="q-pa-xs" :color="props.row.contractNo===cashApplyData.contractNo?'red':'grey-4'" size="xs" flat name="fas fa-check" @click="selectContract(props)"></q-icon>
                  {{ props.row.contractTitle }}
                </q-td>
                <q-td key="dealNum" class="text-right">
                  {{ props.row.dealNum | money}}
                </q-td>
                <q-td key="totalNum"
                      class="text-right" :class="props.row.totalNum===props.row.dealNum?'':'text-red text-bold'" style="text-decoration-line: underline">
                  {{ props.row.totalNum | money}}
                </q-td>
                <q-td key="invoiceNum" class="text-right" :class="props.row.totalNum===props.row.invoiceNum?'':'text-red text-bold'">
                  {{ props.row.invoiceNum | money}}
                </q-td>
                <q-td key="status" :props="props" :class="props.row.status===0?'bg-yellow-1':(props.row.status===1?'bg-white':(props.row.status===2 || props.row.status===3 ?'text-grey-6':'text-red'))">
                  <span v-show="props.row.status===0">进行中</span>
                  <span v-show="props.row.status===1">已完成</span>
                  <span v-show="props.row.status===2">中止</span>
                  <span v-show="props.row.status===3">废除</span>
                </q-td>
                <q-td>
                  {{props.row.statusTrack}}
                </q-td>
                <q-td key="companyName">
                  {{ props.row.companyName }}
                </q-td>
                <q-td key="deliveryTime" class="text-center">
                  <span >{{ props.row.deliveryTime }}</span>
                </q-td>
                <q-td key="projectName">
                  {{ props.row.projectName }}
                </q-td>
                <q-td key="remark" class="overflow-ellipsis">
                  {{ props.row.remark }}
                  <q-tooltip v-if="props.row.remark!==''">{{ props.row.remark }}</q-tooltip>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <!--表格分页-->
          <div class="row justify-center q-pa-lg">
            <div class="row justify-center q-mt-md">
              <q-pagination
                v-model="currentPage"
                color="black"
                :max="cashPageSize"
                :max-pages="6"
                :boundary-numbers="true"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md text-green" >
          <q-btn label="退出"  flat size="lg" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="projectSelectDialog" persistent full-width>
      <q-card>
        <q-card-section>
          <q-chip square v-for="item in projectForSelect" :key="item.label" size="lg" class="q-ma-md"
                  clickable @click="selectProjectInDialog(item)"
                  color="grey-4">
            <q-avatar color="black" text-color="blue-3">
              <q-icon name="fas fa-project-diagram"></q-icon>
            </q-avatar>
            <strong>{{item.label}}</strong>
          </q-chip>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md text-green" >
          <q-btn label="退出"  flat size="lg" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--差旅费报销明细对话框-->
    <q-dialog v-model="editFeeDialog" persistent full-width>
    <q-card square flat>
      <h6 class="text-h6 q-ml-lg text-bold text-purple">差旅费用明细</h6>
      <q-card-section>
        <q-table
          :data="openedFeeData"
          row-key="index"
          flat
          dense
          hide-bottom
          bordered
          :rows-per-page-options="[0]"
        >
          <template v-slot:header>
            <q-tr class="text-left bg-grey-3" >
              <q-th style="font-size:16px;" v-for="(item,index) in thFeeName" :key="index" >
                {{item}}</q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr>
              <q-td auto-width style="border-left-width: 8px;border-left-color: #9c27b0;">
                <q-btn flat color="purple" padding="none">
                  <q-icon name="keyboard_arrow_down"/>
                  <q-tooltip>操作</q-tooltip>
                  <q-menu
                    anchor="center middle"
                    self="center middle">
                    <q-list >
                      <q-item dense clickable v-close-popup class="bg-purple" >
                        <q-item-section  ><span class="text-white text-subtitle1">删 除</span></q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
                <strong  >{{props.rowIndex+1}}</strong>
              </q-td>
              <q-td auto-width >
                <q-select  v-model="props.row.feeType"
                           :options="feeTypeForSelect"
                           color="purple"
                           class="q-pa-none"
                           map-options emit-value borderless dense options-dense>
                  <template v-slot:prepend>
                    <q-icon :color="props.row.feeType===null?'red':'purple'" size="md" class="q-pa-none"
                            :name="props.row.feeType==='plane'?'fas fa-plane':
                    (props.row.feeType==='train'?'fas fa-train':
                     (props.row.feeType==='car'?'fas fa-car':
                      (props.row.feeType==='meals'?'fas fa-utensils':
                      (props.row.feeType==='hotel'?'fas fa-bed':
                      (props.row.feeType==='others'?'fas fa-question':'fas fa-times')))))" />
                  </template>
                </q-select>
              </q-td>
              <q-td width="200px" >
              <q-input v-model="props.row.feeTime" borderless dense type="date" max="2200-12-31"></q-input>
            </q-td>
              <q-td width="200px">
                <q-input v-model="props.row.startAdd" borderless dense ></q-input>
              </q-td>
              <q-td  width="200px">
                <q-input v-model="props.row.endAdd" borderless dense ></q-input>
              </q-td>
              <q-td width="200px">
                <q-input v-model="props.row.num" borderless dense type="number" ></q-input>
              </q-td>
              <q-td >
                <q-input v-model="props.row.remark" borderless dense ></q-input>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:bottom-row>
            <q-tr no-hover>
              <q-td >
                <q-btn flat color="purple" @click="addThenReset()">
                  <q-icon name="fas fa-plus" size="sm">...</q-icon>
                  <q-tooltip>新增明细</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </q-card-section>
      <q-card-actions  align="center">
        <q-btn flat color="purple-6" class="text-bold text-subtitle1" @click="saveEditedFee()">
          <q-icon name="fas fa-save" size="25px"/>
          <q-tooltip>保 存</q-tooltip></q-btn>
        <q-btn label="退出"  flat size="lg" v-close-popup />
      </q-card-actions>
    </q-card>
    </q-dialog>
    <!--差旅费报销新增失败的明细-->
    <q-dialog v-model="travelFalseListDialog" persistent full-width>
      <q-card square flat>
        <h6 class="text-h6 q-ml-lg text-bold text-purple">不好！这些费用填的有不对的地方，再看看吧！</h6>
        <div class="text-subtitle1 q-ml-lg text-bold text-pink">
          <span class="block">费用分类选了吗 ？</span>
          <span class="block">时间填了吗 ？？</span>
          <span class="block">金额是不是填错了 ？？?</span>
        </div>
        <q-card-section>
          <q-table
            :data="detailFalseList"
            row-key="index"
            flat
            dense
            hide-bottom
            bordered
            :rows-per-page-options="[0]"
          >
            <template v-slot:header>
              <q-tr class="text-left bg-grey-3" >
                <q-th style="font-size:16px;" v-for="(item,index) in thFeeName" :key="index" >
                  {{item}}</q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr>
                <q-td auto-width style="border-left-width: 8px;border-left-color: #9c27b0;">
                  <q-btn flat color="purple" padding="none">
                    <q-icon name="keyboard_arrow_down"/>
                    <q-tooltip>操作</q-tooltip>
                    <q-menu
                      anchor="center middle"
                      self="center middle">
                      <q-list >
                        <q-item dense clickable v-close-popup class="bg-purple" >
                          <q-item-section  ><span class="text-white text-subtitle1">删 除</span></q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                  <strong  >{{props.rowIndex+1}}</strong>
                </q-td>
                <q-td auto-width >
                  <q-select  v-model="props.row.feeType"
                             :options="feeTypeForSelect"
                             color="purple"
                             class="q-pa-none"
                             map-options emit-value borderless dense options-dense>
                    <template v-slot:prepend>
                      <q-icon color="purple" size="md" class="q-pa-none"
                              :name="props.row.feeType==='plane'?'fas fa-plane':
                    (props.row.feeType==='train'?'fas fa-train':
                     (props.row.feeType==='car'?'fas fa-car':
                      (props.row.feeType==='meals'?'fas fa-utensils':
                      (props.row.feeType==='hotel'?'fas fa-bed':
                      (props.row.feeType==='hotel'?'fas fa-question':'fas fa-times')))))" />
                    </template>
                  </q-select>
                </q-td>
                <q-td width="200px" >
                  <q-input v-model="props.row.feeTime" borderless dense type="date" max="2200-12-31"></q-input>
                </q-td>
                <q-td width="200px">
                  <q-input v-model="props.row.startAdd" borderless dense ></q-input>
                </q-td>
                <q-td  width="200px">
                  <q-input v-model="props.row.endAdd" borderless dense ></q-input>
                </q-td>
                <q-td width="200px">
                  <q-input v-model="props.row.num" borderless dense type="number" ></q-input>
                </q-td>
                <q-td >
                  <q-input v-model="props.row.remark" borderless dense ></q-input>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions  align="center">
          <q-btn flat color="purple-6" class="text-bold text-subtitle1" @click="resendTravelFee()">
            <q-icon name="fas fa-check" size="25px"/>
            <q-tooltip>重新提交</q-tooltip></q-btn>
          <q-btn label="退出"  flat size="lg" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import NumPerPage from '../components/numPerPage'
import { rowsPerPage, crud } from '../components/mixin/baseMixin'
import { sumIntArrayByType } from '../util/sumArrayData'
export default {
  name: 'MyForm',
  components: { NumPerPage },
  mixins: [rowsPerPage, crud],
  data () {
    return {
      editFeeDialog: false,
      travelFalseListDialog: false,
      detailTitle: null,
      label: 'Click me',
      feeTab: 'applyFee',
      travelTab: 'travelFee',
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
      },
      /* -------- 差旅费用明细start------------- */
      // 差旅申请
      travelApplyData: {
        travelId: '',
        travelCreateUser: '',
        projectId: '',
        travelDuringTime: '',
        travelDetail: '',
        travelLocation: '',
        travelCarStatus: '0'
      },
      // 差旅费用明细
      openedFeeData: [],
      // 差旅明细费用分类汇总金额
      totalTravelFee: [],
      // 差旅费用明细标题
      thFeeName: [
        '',
        '费用类别',
        '费用时间',
        '开始地点',
        '结束地点',
        '金额',
        '备注'
      ],
      // 差旅分类选择
      feeTypeForSelect: [
        {
          label: '飞机',
          value: 'plane'
        },
        {
          label: '火车',
          value: 'train'
        },
        {
          label: '汽车',
          value: 'car'
        },
        {
          label: '餐饮',
          value: 'meals'
        },
        {
          label: '住宿',
          value: 'hotel'
        },
        {
          label: '其他',
          value: 'others'
        }],
      // 新增差旅明细条目预备空数据，用于向表格中添加新行
      newFeeRow: {
        feeType: null,
        feeTime: null,
        startAdd: null,
        endAdd: null,
        num: null,
        remark: null
      },
      detailFalseList: []
      /* -------- 差旅费用明细end------------- */
    }
  },
  computed: {
    ...mapState('Login',
      ['token']),
    ...mapState('Fin',
      ['']),
    ...mapState('MyForm',
      [
        'dataList',
        'cashPageSize',
        'travelFeeDetailData', // 差旅明细数据，住宿，餐费，汽车，火车等明细
        'travelFeeData', // 差旅总体数据
        'travelFalseList' // 差旅添加返回失败的条目
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
  validations: {
    travelApplyData: {
      travelDuringTime: { required },
      travelDetail: { required },
      travelLocation: { required },
      travelCarStatus: { required }
    }
  },
  methods: {
    ...mapActions('Operation',
      [
        'cashNewDateAction',
        'contractSelectAction'
      ]
    ),
    ...mapActions('MyForm',
      [
        'travelNewDataAction',
        'resendTraveldetailDataAction'
      ]
    ),
    ...mapActions('Project',
      [
        'projectForSelectAction'
      ]),
    ...mapMutations('MyForm',
      [
        'travelFeeDataMutation',
        'travelFeeDetailDataMutation'
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
    },
    /* ------ 差旅报销start------- */
    initNewFee () {
      this.newFeeRow = this.$options.data.call(this).newFeeRow
    },
    // 差旅明细费用编辑
    editFee () {
      this.initNewFee()
      this.editFeeDialog = true
    },
    saveEditedFee () {
      // 计算各项费用汇总
      var sumNum = sumIntArrayByType(this.feeTypeForSelect, this.openedFeeData)
      this.totalTravelFee = sumNum
      this.travelFeeDetailDataMutation(this.openedFeeData)
      this.editFeeDialog = false
    },
    addThenReset () {
      this.openedFeeData.push(this.newFeeRow)
      this.initNewFee()
    },
    submitTravelFee () {
      // 提交后台数据，清空前台数据
      var data = { openedFeeData: this.openedFeeData, travelApplyData: this.travelApplyData }
      this.travelNewDataAction(data)
      this.resetTravelFee()
    },
    resetTravelFee () {
      // openedFeeData，totalTravelFee，newFeeRow清空
      Object.assign(this.openedFeeData, this.$options.data.call(this).openedFeeData)
      Object.assign(this.travelApplyData, this.$options.data.call(this).travelApplyData)
      this.initNewFee()
    },
    resendTravelFee () {
      this.resendTraveldetailDataAction(this.travelFalseList)
    }
    /* ------ 差旅报销end------- */
  },
  watch: {
    // 合同号被清除，合同标题同步被清除
    contractNoChange (val) {
      if (val === null) {
        this.cashApplyData.contractTitle = null
      }
    },
    // 监控差旅详情插入失败的detail，准备二次修改后发送
    travelFalseList (val) {
      if (val.length !== 0) {
        Object.assign(this.detailFalseList, this.travelFalseList)
        this.travelFalseListDialog = true
      } else {
        this.travelFalseListDialog = false
      }
    }
  }
}
</script>

<style lang="sass">
</style>
