<template>
  <div class="q-ma-sm">
    <!--用户图表-->
    <div class="row q-mt-lg">
    </div>
    <!--查询drawer-->
    <q-drawer
      side="right"
      no-swipe-backdrop
      v-model="queryDrawer"
      bordered
      :width="300"
      :breakpoint="500"
      content-class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-page-sticky position="top-left" :offset="[0, 0]" style="z-index:999">
          <q-btn square color="green" @click="selectData" ><span class="text-h6">查</span></q-btn>
          <q-tooltip>查询</q-tooltip>
        </q-page-sticky>
        <q-page-sticky position="top-left" :offset="[0, 50]" style="z-index:999">
          <q-btn square color="white" class="text-black" @click="initQueryData"  > <span >重置</span></q-btn>
        </q-page-sticky>
        <q-page-sticky position="top-left" :offset="[0, 93]" style="z-index:999">
          <q-btn square color="white" class="text-black" icon="fas fa-times" @click="queryDrawer=false" />
        </q-page-sticky>
        <div class="q-ma-none">
          <h5 class="text-center text-bold">按条件查询</h5>
          <q-input v-model="queryData.userDetailId"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">姓名</span>
            </template>
          </q-input>
            <q-select
              class="q-pl-lg"
              fill-input
              v-model="queryData.contractType"
              use-input
              hide-selected
              input-debounce="0"
              :options="contractTypeOption"
              input-class="q-ml-md text-subtitle1"
              color="green"
              clearable
              emit-value
              map-options
              popup-content-class="q-pa-none"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    无结果
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:before>
                <span class="text-subtitle1 inputLabel text-black">合同类型</span>
              </template>
            </q-select>
          <q-select
            class="q-pl-lg"
            use-input
            fill-input
            v-model="queryData.contractPhase"
            hide-selected
            input-debounce="0"
            :options="contractPhaseOption"
            input-class="q-ml-md text-subtitle1"
            color="green"
            clearable
            emit-value
            map-options
            popup-content-class="q-pa-none"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  无结果
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">合同阶段</span>
            </template>
          </q-select>
          <q-input v-model="queryData.times"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">签订次数</span>
            </template>
          </q-input>
          <q-input v-model="queryData.contractStart"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
                   type="date"
                   max="2200-12-31"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">合同开始</span>
            </template>
          </q-input>
          <q-input v-model="queryData.contractEnd"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
                   type="date"
                   max="2200-12-31"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">合同结束</span>
            </template>
          </q-input>
          <q-input v-model="queryData.contractStatus"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">合同状态</span>
            </template>
          </q-input>
          <q-input v-model="queryData.contractFalseTime"
                   maxlength=8
                   dense
                   type="date" max="2200-12-31"
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">中止时间</span>
            </template>
          </q-input>
          <q-input v-model="queryData.contractFalseReason"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">中止原因</span>
            </template>
          </q-input>
          <q-input v-model="queryData.remark"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-ml-md"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">备注</span>
            </template>
          </q-input>
        </div>
        <div class="q-ma-sm">
          <div class="text-h6 text-bold text-red q-pa-lg" v-if="queryValidationTip">{{queryValidationTip}}</div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <!--新增合同-->
    <q-card flat bordered class="q-ma-md" :style="addDisplay">
      <div class="bg-grey-3">
        <q-avatar square  size="40px" font-size="20px" color="teal-13" text-color="black" icon="fas fa-plus"/>
        <span class=" q-ma-lg text-bold text-h6">新增合同</span>
      </div>
      <q-card-section class="q-mb-xl">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
            <q-select
              dense
              outlined
              fill-input
              v-model="newData.userDetailId"
              use-input
              hide-selected
              input-debounce="0"
              label="姓名"
              :options="nameListOptions"
              @filter="filterFn"
              option-value="userDetailId"
              option-label="realName"
              input-class="q-pl-lg text-bold text-h6"
              color="green"
              clearable
              emit-value
              map-options
              popup-content-class="q-pa-none"
              error-message="必填"
              :error="!this.$v.newData.userDetailId.required"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    无结果
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label >{{ scope.opt.realName }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.idNumber }}
                      <span v-if="scope.opt.workStatus==='4'" class="text-red">(已离职)</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
            <q-input dense v-model="newData.contractStart"
                     color="green"
                     input-class="q-ml-md"
                     type="date"
                     max="2200-12-31"
                     error-message="请检查格式，且必填"
                     :error="!this.$v.newData.contractStart.required || !this.$v.newData.contractStart.maxLength">
              <template v-slot:before>
                <span class="text-subtitle1  text-black">合同开始</span>
              </template>
            </q-input>
            <q-input dense v-model="newData.contractEnd" color="green"
                     input-class="q-ml-md"
                     type="date"
                     max="2200-12-31"
                     error-message="请检查格式，且必填"
                     :error="!this.$v.newData.contractEnd.required || !this.$v.newData.contractEnd.maxLength">
              <template v-slot:before>
                <span class="text-subtitle1  text-black">合同结束</span>
              </template>
            </q-input>
            <q-input dense v-model="newData.times" color="green" input-class="q-ml-md q-mt-sm text-subtitle1" type="number">
              <template v-slot:before>
                <span class="text-subtitle1  text-black">签订次数</span>
              </template>
            </q-input>
          </div>
          <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
            <q-select
              dense
              fill-input
              v-model="newData.contractType"
              use-input
              hide-selected
              input-debounce="0"
              :options="contractTypeOption"
              input-class="q-ml-md text-subtitle1"
              color="green"
              clearable
              emit-value
              map-options
              popup-content-class="q-pa-none"
              error-message="*必填"
              :error="!this.$v.newData.contractType.required"
            >
              <template v-slot:before>
                <span class="text-subtitle1 text-black">合同类型</span>
              </template>
            </q-select>
            <q-select
              dense
              fill-input
              v-model="newData.contractPhase"
              use-input
              hide-selected
              input-debounce="0"
              :options="contractPhaseOption"
              input-class="q-ml-md text-subtitle1"
              color="green"
              clearable
              emit-value
              map-options
              popup-content-class="q-pa-none"
              error-message="*必填"
              :error="!this.$v.newData.contractPhase.required"
            >
              <template v-slot:before>
                <span class="text-subtitle1 text-black">合同阶段</span>
              </template>
            </q-select>
            <q-select
              dense
              fill-input
              v-model="newData.contractStatus"
              use-input
              hide-selected
              input-debounce="0"
              :options="contractStatusOption"
              input-class="q-ml-md text-subtitle1"
              color="green"
              clearable
              emit-value
              map-options
              popup-content-class="q-pa-none"
              error-message="*必填"
              :error="!this.$v.newData.contractStatus.required"
              >
              <template v-slot:before>
                <span class="text-subtitle1 text-black">合同状态</span>
              </template>
            </q-select>
          </div>
          <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
            <q-input dense v-model="newData.contractFalseTime"
                     color="green"
                     input-class="q-ml-md q-mt-sm text-subtitle1"
                     type="date"
                     max="2200-12-31"
                     error-message="请检查格式，且必填"
                     :error="!this.$v.newData.contractFalseTime.maxLength">
              <template v-slot:before>
                <span class="text-subtitle1  text-black">中止时间</span>
              </template>
            </q-input>
            <q-input dense v-model="newData.contractFalseReason" color="green" input-class="q-ml-md q-mt-sm text-subtitle1" >
              <template v-slot:before>
                <span class="text-subtitle1  text-black">中止原因</span>
              </template>
            </q-input>
            <q-input dense v-model="newData.remark" class="q-mt-md" color="green" input-class="q-ml-md" type="textarea" autogrow>
              <template v-slot:before>
                <span class="text-subtitle1  text-black">合同备注</span>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row float-right">
          <span class="q-pl-sm q-pt-md  text-purple">请填写后直接点击保存，以此逐条增加。</span>
          <q-btn flat color="purple" class="q-ma-xs text-subtitle1 q-mt-none" @click="addContract">
            <q-icon name="fas fa-file-import" size="xs" class="q-mr-sm"></q-icon>保存
          </q-btn>
        </div>
        <div>
        </div>
      </q-card-section>
    </q-card>
    <!--合同列表-->
    <q-card  class="q-mt-lg q-ma-md" square bordered flat>
      <q-page-sticky position="top-left" :offset="[0, 0]" style="z-index:999">
        <q-btn square color="green" icon="fas fa-search" @click="queryDrawer=true" />
        <q-tooltip>点击进行条件查询</q-tooltip>
      </q-page-sticky>
      <div class="bg-grey-3">
        <q-avatar square  size="40px" font-size="20px" color="teal-13" text-color="black" icon="fas fa-list-ol"/>
        <span class=" q-ma-lg text-bold text-h6">合同列表</span>
      </div>
      <div class="row">
        <div class="q-gutter-sm q-mt-sm q-ml-sm">
          <q-checkbox v-model="queryData.contractStatusArray" val=1
                      label="正常" color="teal-13"/>
          <q-checkbox v-model="queryData.contractStatusArray" val=2 label="到期" color="teal-13"/>
          <q-checkbox v-model="queryData.contractStatusArray" val=0 label="解除" color="red"/>
        </div>
        <q-space></q-space>
        <q-select
          flat
          dense
          v-model="rowsPerPage"
          :options="rowNumOptions"
          color="teal"
          class="q-ma-md text-bold"
        >
          <template v-slot:before>
            <span class="inputLabel text-black">每页显示</span>
          </template>
          <template v-slot:prepend>
            <span class="q-ml-sm" />
          </template>
        </q-select>
      </div>
      <q-table
        dense
        flat
        borderless
        :loading="tbLoading"
        :data="userContractInfo"
        :columns="userContractColumns"
        :pagination.sync="userContractInfoPagination"
        hide-pagination
      >
        <template v-slot:top-left>
          <q-chip square size="18px" clickable class="bg-purple-2 text-bold" @click="addNewDialog">
            <q-avatar color="purple" text-color="white"><q-icon name="fas fa-plus" size="sm" ></q-icon></q-avatar>
            新 增
          </q-chip>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="bg-grey-2"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr  :props="props">
            <q-td class="q-ma-xs bg-grey-2" style="width:10px"><strong>{{props.rowIndex+1}}</strong></q-td>
            <q-td class="q-ma-xs" style="width:50px">
              <q-icon class="q-pa-xs" color="grey" size="xs" flat name="fas fa-trash-alt">
                <q-popup-proxy :value="userDelProxy===props.row.autoId">
                  <q-card flat >
                    <h6 class="text-red text-bold q-ma-lg">
                      <q-icon name="warning" size="50px" class="q-mr-md"/>确认删除 <span class="text-black">{{props.row.realName}}</span> 吗？</h6>
                    <div class="text-center">
                      <q-btn  @click="trash(props)" class="q-ma-sm q-mb-lg" color="red">删除</q-btn>
                    </div>
                  </q-card>
                </q-popup-proxy>
              </q-icon>
              <q-icon class="q-pa-xs" color="grey" size="xs" flat name="fas fa-edit" @click="edit(props)"></q-icon>
            </q-td>
            <q-td class="sticky-td text-left" :class="props.row.contractStatus==='1'?'bg-teal-1 text-bold':'bg-white'">
              {{ props.row.realName}}
            </q-td>
            <q-td>
              {{ props.row.contractType|contractType }}
            </q-td>
            <q-td>
              {{ props.row.contractPhase |contractPhase }}
            </q-td>
            <q-td >
              {{ props.row.contractStart }}
            </q-td>
            <q-td >
              {{ props.row.contractEnd }}
              <q-badge color="yellow-6" text-color="black" class="q-ml-sm"  align="top"
                       v-if="props.row.contractStatus==='1' && props.row.contractEnd !==null
&&(Math.abs(new Date(props.row.contractEnd) - new Date())/ (24 * 60 * 60 * 1000)).toFixed(0)<300 ">
                {{(Math.abs(new Date(props.row.contractEnd) - new Date())/ (24 * 60 * 60 * 1000)).toFixed(0)}} 天
              </q-badge>
            </q-td>
            <q-td :class="props.row.contractStatus==='1'?'bg-teal-1 text-bold':'bg-white'">
              {{ props.row.contractStatus |contractStatus}}
            </q-td>
            <q-td >
              第{{ props.row.times }}次签订
            </q-td>
            <q-td >
              {{ props.row.contractFalseTime }}
            </q-td>
            <q-td >
              {{ props.row.contractFalseReason }}
            </q-td>
            <q-td >
              {{ props.row.remark }}
            </q-td>
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
          :max="userContractInfoPageSize"
          :max-pages="6"
          :boundary-numbers="true"
        />
      </div>
    </div>
    <!--修改劳动合同-->
    <q-dialog v-model="editDialog" full-width>
        <q-card square>
          <div class="bg-grey-3">
            <q-avatar square  size="40px" font-size="25px" color="teal-13" text-color="black" icon="fas fa-edit"/>
            <span class="q-ml-lg text-bold text-h6">修改劳动合同</span>
          </div>
          <q-card-section class="q-mb-xl">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                <h6 class="text-center text-bold">
                  {{this.editData.realName}}
                </h6>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                <q-input dense v-model="editData.contractStart"
                         color="green"
                         input-class="q-ml-md"
                         type="date"
                         max="2200-12-31"
                         error-message="请检查格式，且必填"
                         :error="!this.$v.editData.contractStart.required || !this.$v.editData.contractStart.maxLength">
                  <template v-slot:before>
                    <span class="text-subtitle1  text-black inputLabel">合同开始</span>
                  </template>
                </q-input>
                <q-input dense v-model="editData.contractEnd" color="green"
                         input-class="q-ml-md"
                         type="date"
                         max="2200-12-31"
                         error-message="请检查格式，且必填"
                         :error="!this.$v.editData.contractEnd.required || !this.$v.editData.contractEnd.maxLength">
                  <template v-slot:before>
                    <span class="text-subtitle1  text-black inputLabel">合同结束</span>
                  </template>
                </q-input>
                <q-input dense v-model="editData.times"  color="green" input-class="q-ml-md q-mt-sm text-subtitle1" type="number">
                  <template v-slot:before>
                    <span class="text-subtitle1  text-black inputLabel">签订次数</span>
                  </template>
                </q-input>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                <q-select
                  dense
                  fill-input
                  v-model="editData.contractType"
                  hide-selected
                  input-debounce="0"
                  use-input
                  :options="contractTypeOption"
                  input-class="q-ml-md text-subtitle1 "
                  color="green"
                  clearable
                  emit-value
                  map-options
                  popup-content-class="q-pa-none"
                  error-message="*必填"
                  :error="!this.$v.editData.contractType.required"
                >
                  <template v-slot:before>
                    <span class="text-subtitle1 text-black inputLabel">合同类型</span>
                  </template>
                </q-select>
                <q-select
                  dense
                  fill-input
                  v-model="editData.contractPhase"
                  use-input
                  hide-selected
                  input-debounce="0"
                  :options="contractPhaseOption"
                  input-class="q-ml-md text-subtitle1"
                  color="green"
                  clearable
                  emit-value
                  map-options
                  popup-content-class="q-pa-none"
                  error-message="*必填"
                  :error="!this.$v.editData.contractPhase.required"
                >
                  <template v-slot:before>
                    <span class="text-subtitle1 text-black inputLabel">合同阶段</span>
                  </template>
                </q-select>
                <q-select
                  dense
                  fill-input
                  v-model="editData.contractStatus"
                  use-input
                  hide-selected
                  input-debounce="0"
                  :options="contractStatusOption"
                  input-class="q-ml-md text-subtitle1"
                  color="green"
                  clearable
                  emit-value
                  map-options
                  popup-content-class="q-pa-none"
                  error-message="*必填"
                  :error="!this.$v.editData.contractStatus.required"
                >
                  <template v-slot:before>
                    <span class="text-subtitle1 text-black inputLabel">合同状态</span>
                  </template>
                </q-select>
              </div>
              <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                <q-input dense v-model="editData.contractFalseTime"
                         color="green"
                         input-class="q-ml-md q-mt-sm text-subtitle1"
                         type="date"
                         max="2200-12-31"
                         clearable
                         error-message="请检查格式，且必填"
                         :error="!this.$v.editData.contractFalseTime.maxLength">
                  <template v-slot:before>
                    <span class="text-subtitle1  text-black inputLabel">中止时间</span>
                  </template>
                </q-input>
                <q-input dense v-model="editData.contractFalseReason" color="green" input-class="q-ml-md q-mt-sm text-subtitle1" >
                  <template v-slot:before>
                    <span class="text-subtitle1  text-black inputLabel">中止原因</span>
                  </template>
                </q-input>
                <q-input dense v-model="editData.remark" class="q-mt-md" color="green" input-class="q-ml-md" type="textarea" autogrow>
                  <template v-slot:before>
                    <span class="text-subtitle1  text-black inputLabel">合同备注</span>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row float-right">
              <q-btn flat color="purple" class="q-ma-xs text-subtitle1 q-mt-none" @click="sendEditContract()">
                <q-icon name="fas fa-file-import" size="xs" class="q-mr-sm"></q-icon>保存
              </q-btn>
            </div>
            <div>
            </div>
          </q-card-section>
        </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'
import { sumString } from '../util/sumArrayData'
// import { idIsName } from '../util/myValidate'
export default {
  name: 'StaffList',
  data () {
    return {
      addDisplay: 'display:none',
      queryExpanded: false,
      currentPage: 1,
      rowsPerPage: 20,
      tbLoading: false,
      queryDrawer: false,
      addNewUserDialog: false,
      editDialog: false,
      userDelProxy: '99',
      nameListOptions: [],
      contractTypeOption: [
        {
          label: '固定期限',
          value: '1'
        },
        {
          label: '无固定期限',
          value: '2'
        },
        {
          label: '劳务合同',
          value: '3'
        },
        {
          label: '其他',
          value: '4'
        }],
      contractPhaseOption: [
        {
          label: '新签',
          value: '1'
        },
        {
          label: '续签',
          value: '2'
        }],
      contractStatusOption: [
        {
          label: '正常',
          value: '1'
        },
        {
          label: '到期',
          value: '2'
        },
        {
          label: '解除',
          value: '0'
        }],
      NewUserName: {
        userName: null
      },
      rowNumOptions: [
        {
          label: '所有',
          value: 0
        },
        {
          label: '20条',
          value: 20
        },
        {
          label: '30条',
          value: 30
        },
        {
          label: '50条',
          value: 50
        }
      ],
      userContractColumns: [
        {
          name: 'index',
          label: 'NO.',
          align: 'left',
          field: '',
          headerClasses: '',
          headerStyle: 'font-size:10px;'
        },
        {
          name: 'action',
          label: '操作',
          align: 'center',
          field: '',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'userDetailId',
          label: '姓名',
          align: 'left',
          headerClasses: 'sticky-td bg-grey-2',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractType',
          label: '合同类型',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractPhase',
          label: '合同阶段',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractStart',
          label: '合同开始',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractEnd',
          label: '合同结束',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractStatus',
          label: '合同状态',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'times',
          label: '签订次数',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractFalseTime',
          label: '中止时间',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'contractFalseReason',
          label: '中止原因',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'remark',
          label: '合同备注',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        }
      ],
      queryValidationTip: null,
      addNewValidationTip: null,
      newData: {
        autoId: null,
        userDetailId: null,
        times: null,
        contractStart: null,
        contractEnd: null,
        contractFalseTime: null,
        contractFalseReason: null,
        contractStatus: null,
        contractType: null,
        contractPhase: null,
        remark: null
      },
      queryData: {
        autoId: null,
        userDetailId: null,
        times: null,
        contractStart: null,
        contractEnd: null,
        contractFalseTime: null,
        contractFalseReason: null,
        contractStatusArray: ['1', '2'],
        contractStatusAfter: null,
        contractType: null,
        contractPhase: null,
        remark: ''
      },
      editData: {
        autoId: null,
        realName: null,
        userDetailId: null,
        times: null,
        contractStart: null,
        contractEnd: null,
        contractFalseTime: null,
        contractFalseReason: null,
        contractStatus: null,
        contractType: null,
        contractPhase: null,
        remark: null
      }
    }
  },
  validations: {
    queryData: {
      contractStart: { maxLength: maxLength(10) },
      contractEnd: { maxLength: maxLength(10) },
      contractFalseTime: { maxLength: maxLength(10) }
    },
    newData: {
      userDetailId: { required },
      contractStart: { maxLength: maxLength(10), required },
      contractEnd: { maxLength: maxLength(10), required },
      contractFalseTime: { maxLength: maxLength(10) },
      contractStatus: { required },
      contractType: { required },
      contractPhase: { required }
    },
    editData: {
      userDetailId: { required },
      contractStart: { maxLength: maxLength(10), required },
      contractEnd: { maxLength: maxLength(10), required },
      contractFalseTime: { maxLength: maxLength(10) },
      contractStatus: { required },
      contractType: { required },
      contractPhase: { required },
      times: { required }
    },
    NewUserName: {
      userName: { }
    }
  },
  mounted () {
    if (this.userContractInfo.length === 0) {
      this.tbLoading = true
    }
    this.handlerQueryData()
    this.userContractListSetCurrentPageMutation(1)
    this.selectData()
    this.onRequest()
  },
  computed: {
    ...mapState('User',
      [
        'userContractInfo',
        'userList',
        'userListForContract',
        'userContractInfoPageSize',
        'userContractUpdateRes',
        'userContractAddRes'
      ]),
    userContractInfoPagination: {
      get () {
        return this.$store.state.User.userContractInfoPagination
      },
      set () {
      }
    }
  },
  methods: {
    ...mapMutations('User',
      [
        'userContractListSetRowsPerPageMutation',
        'userContractListSetCurrentPageMutation'
      ]),
    ...mapActions('User',
      [
        'userContractListAction',
        'userContractAddAction',
        'userListForContractAction',
        'userContractUpdateAction',
        'userContractTrashAction'
      ]),
    /* 挂载后初始数据 */
    onRequest () {
      this.userListForContractAction()
    },
    handlerQueryData () {
      this.queryData.contractStatusAfter = sumString(this.queryData.contractStatusArray)
    },
    /* 查询数据 */
    selectData () {
      if (this.$v.queryData.$invalid === false) {
        this.userContractListAction({
          pagination: this.userContractInfoPagination,
          queryData: this.queryData
        })
      } else {
        this.queryValidationTip = '请检查查询数据！'
      }
    },
    /* 编辑数据 */
    edit (props) {
      this.editData = props.row
      this.editDialog = true
    },
    sendEditContract () {
      this.userContractUpdateAction(this.editData)
    },
    initEditData () {
      Object.assign(this.editData, this.$options.data.call(this).editData)
    },
    initQueryData () {
      Object.assign(this.queryData, this.$options.data.call(this).queryData)
      this.selectData()
    },
    initNewData () {
      Object.assign(this.newData, this.$options.data.call(this).newData)
      this.selectData()
    },
    /* 删除数据 */
    trash (props) {
      this.userDelProxy = props.row.autoId
      this.userContractTrashAction(props.row)
      this.selectData()
    },
    addNewDialog () {
      this.addDisplay = ''
    },
    addContract () {
      if (this.$v.newData.$invalid !== true) {
        this.userContractAddAction(this.newData)
      }
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.nameListOptions = this.userListForContract
        })
        return
      }

      update(() => {
        const needle = val
        this.nameListOptions = this.userListForContract.filter(v => {
          if (v.realName.includes(needle)) { return v }
        })
      })
    }
  },
  watch: {
    userContractInfo () {
      this.tbLoading = false
    },
    // 翻页
    currentPage (val) {
      this.tbLoading = true
      this.userContractListSetCurrentPageMutation(val)
      this.selectData()
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.userContractListSetRowsPerPageMutation(val.value)
      this.selectData()
      this.currentPage = 1
    },
    'queryData.contractStatusArray': {
      handler () {
        this.handlerQueryData()
        this.selectData()
      }
    },
    userContractUpdateRes (val) {
      if (val === 1) {
        this.selectData()
        this.editDialog = false
        this.initEditData()
      }
    },
    userContractAddRes (val) {
      console.log(val)
      if (val === '1') {
        this.initNewData()
      }
    },
    userContractTrashRes (val) {
      if (val === 1) {
        this.selectData()
      }
    }
  }
}
</script >

<style scoped lang="sass">
  .inputLabel
    width: 75px
    text-align-last: justify
    font-size: 16px
    padding: 3px 3px
</style>
