<template>
  <div class="q-ma-md">
    <!--用户图表-->
    <div class="row q-mt-lg" id="userList">
      <div class="col-md-6 col-sm-12 col-lg-3">
        <v-chart class="chart" :option="ageChart" theme="walden" autoresize/>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-3">
        <v-chart class="chart" :option="companyAgeChart" theme="walden" autoresize/>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-3">
        <v-chart class="chart" :option="educationChart" theme="walden" autoresize/>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-3">
        <v-chart class="chart" :option="statusChart" theme="walden" autoresize/>
      </div>
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
          <q-btn square color="white" class="text-black" @click="resetData"  > <span >重置</span></q-btn>
          <q-tooltip>重置</q-tooltip>
        </q-page-sticky>
        <q-page-sticky position="top-left" :offset="[0, 93]" style="z-index:999">
          <q-btn square color="white" class="text-black" icon="fas fa-times" @click="queryDrawer=false" />
        </q-page-sticky>
        <div class="q-ma-none">
          <h5 class="text-center text-bold">按条件查询</h5>
          <q-input v-model="queryData.realName"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="姓名"
          />
          <q-select v-model="queryData.depName"
                    color="green-5"
                    class="q-pa-sm q-pl-lg text-subtitle1"
                    option-value="roleId"
                    option-label="orgName"
                    options-dense
                    emit-value
                    map-options
                    prefix="部门"
                    :options="deptNameOptions"
          />
          <q-input v-model="queryData.postName"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="岗位"
          />
          <q-select v-model="queryData.postName"
                    color="green-5"
                    class="q-pa-sm q-pl-lg text-subtitle1"
                    option-value="roleId"
                    option-label="orgName"
                    options-dense
                    emit-value
                    map-options
                    prefix="岗位"
                    :options="postNameOptions"
          />
          <q-input v-model="queryData.companyNo"
                   dense
                   type="text"
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="工号"
          />
          <q-input v-model="queryData.entryDate"
                   maxlength=8
                   dense
                   type="date" max="2200-12-31"
                   hint="查询该日期以后的数据"
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="入职日期"
          />
          <q-input v-model="queryData.expectedDate"
                   dense
                   type="date" max="2200-12-31"
                   hint="查询该日期以后的数据"
                   maxlength="10"
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="转正日期"
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.expectedDate.maxLength"
          />
          <q-input v-model="queryData.birthday"
                   dense
                   type="date" max="2200-12-31"
                   hint="查询该日期以后的数据"
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="出生日期"
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.birthday.maxLength"
          />
          <q-input v-model="queryData.leaveDate"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="离职日期"
                   type="date" max="2200-12-31"
                   hint="查询该日期以后的数据"
                   error-message="日期格式错误"
                   :error="!this.$v.queryData.leaveDate.maxLength"
          />
          <q-input v-model="queryData.idNumber"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="身份证号"
          />
          <q-input v-model="queryData.education"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="学历"
          />
          <q-input v-model="queryData.university"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="毕业院校"
          />
          <q-input v-model="queryData.major"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="专业"
          />
          <q-input v-model="queryData.nation"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="民族"
          />
          <q-input v-model="queryData.marriage"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="婚姻状况"
          />
          <q-input v-model="queryData.otherLanguage"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="其他语言"
          />
          <q-input v-model="queryData.political"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="政治面貌"
          />
          <q-input v-model="queryData.otherAgreement"
                   dense
                   color="green-5"
                   class="q-pa-sm q-pl-lg text-subtitle1"
                   input-class="q-pl-md"
                   prefix="其他协议"
          />
        </div>
        <div class="q-ml-md">
          <q-checkbox v-model="queryData.sexData" val=1 label="男" color="lime-8"/>
          <q-checkbox v-model="queryData.sexData" val=0 label="女" color="lime-8" style="margin-left: 13px"/>
        </div>
        <div class="q-ml-md">
          <q-checkbox v-model="queryData.marriageData" val=1 label="已婚" color="lime-8"/>
          <q-checkbox v-model="queryData.marriageData" val=0 label="未婚" color="lime-8"/>
        </div>
        <div class="q-ma-sm">
          <div class="text-h6 text-bold text-red q-pa-lg" v-if="queryValidationTip">{{queryValidationTip}}</div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <!--员工列表-->
    <q-card class="q-mt-lg" square bordered flat>
      <div class="bg-grey-3">
        <q-avatar square  size="40px" font-size="20px" color="teal-13" text-color="black" icon="fas fa-list-ol"/>
        <span class=" q-ma-lg text-bold text-h6">员工列表</span>
      </div>
      <div class="row">
        <div class="q-gutter-sm q-mt-sm q-ml-sm">
          <q-checkbox v-model="queryData.workStatusData" val=1 label="试用" color="teal-13"/>
          <q-checkbox v-model="queryData.workStatusData" val=2 label="实习" color="teal-13"/>
          <q-checkbox v-model="queryData.workStatusData" val=3 label="正式" color="teal-13"/>
          <q-checkbox v-model="queryData.workStatusData" val=4 label="离职" color="red-6"/>
        </div>
        <q-space></q-space>
        <q-select
          flat
          dense
          v-model="rowsPerPage"
          :options="rowNumOptions"
          color="purple"
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
      <div >
      <q-table
        dense
        flat
        borderless
        :loading="tbLoading"
        :data="userListInfo"
        :columns="userListcolumns"
        :pagination.sync="userListPagination"
        hide-pagination
      >
        <template v-slot:top-right>
          <q-chip square size="18px" clickable class="bg-purple-2 text-bold" @click="addNewDialog">
            <q-avatar color="purple" text-color="white"><q-icon name="fas fa-plus" size="sm" ></q-icon></q-avatar>
            新 增
          </q-chip>
          <q-chip square size="18px" clickable class="text-bold" @click="queryDrawer=true">
            <q-avatar color="teal-13" text-color="white"><q-icon name="fas fa-search" size="sm" ></q-icon></q-avatar>
            查 询
          </q-chip>
          <q-chip square size="18px" clickable class="lime-1 text-bold" @click="printUserList()">
            <q-avatar color="black" text-color="white"><q-icon name="fas fa-print" size="sm" ></q-icon></q-avatar>
            打 印
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
          <q-tr >
            <q-td class="q-ma-none  bg-grey-2" style="width:5px">{{props.rowIndex+1}}</q-td>
            <q-td class="q-ma-none" style="width:80px">
              <q-icon class="q-pa-xs" color="teal-13" size="xs" flat name="fas fa-info-circle" @click="userDetailHandler(props)">
                <q-tooltip>档案明细</q-tooltip>
              </q-icon>
              <q-icon class="q-pa-xs" color="purple-4" size="xs" flat name="fas fa-exchange-alt" @click="changeRole(props)">
                <q-tooltip>变更岗位</q-tooltip>
              </q-icon>
              <q-icon class="q-pa-xs" color="purple-4" size="xs" flat name="fas fa-key" @click="changePwd(props)">
                <q-tooltip>变更密码</q-tooltip>
              </q-icon>
              <q-icon class="q-pa-xs" color="grey" size="xs" flat name="fas fa-undo-alt" @click="userDetailReturn(props)"
              v-if="props.row.workStatus==='4'">
                <q-tooltip v-if="props.row.workStatus==='4'">恢复</q-tooltip>
              </q-icon>
              <q-icon class="q-pa-xs" size="xs" color="red" flat name="fas fa-user-times"
                      v-if="props.row.workStatus!=='4'" @click="editUserOff(props.row)">
                <q-tooltip v-if="props.row.workStatus!=='4'">离职</q-tooltip>
              </q-icon>
              <q-icon class="q-pa-xs" color="grey" size="xs" flat name="fas fa-trash-alt">
                <q-popup-proxy :value="userDelProxy===props.row.userDetailId">
                  <q-card flat >
                  <h6 class="text-red text-bold q-ma-lg">
                    <q-icon name="warning" size="50px" class="q-mr-md"/>确认删除 <span class="text-black">{{props.row.realName}}</span> 吗？</h6>
                  <div class="text-center">
                    <q-btn  @click="trash(props)" class="q-ma-sm q-mb-lg" color="red">删除</q-btn>
                  </div>
                  </q-card>
                </q-popup-proxy>
              </q-icon>
            </q-td>
            <q-td class="text-bold  sticky-td text-left" :class="props.row.workStatus==='4'?'bg-white text-grey':'bg-grey-2'">
              <span class="block text-subtitle1 text-bold" > {{ props.row.realName }}</span>
            </q-td>
            <q-td key="companyNo" >
              {{ props.row.companyNo }}
            </q-td>
            <q-td key="depName" >
              <span class="block">{{ props.row.posId | deptName(orgList) }}</span>

            </q-td>
            <q-td key="posName">
              <span class="block">{{ props.row.posId | actualOrgName(orgList) }}</span>
              <span class="block" :class="props.row.workStatus==='4'?'text-red':'text-grey'">{{ props.row.workStatus | workStatus}}</span>
            </q-td>
            <q-td key="entryDate">
              <span class="block">{{ props.row.entryDate }}</span>
              <span class="block text-grey-7" v-if="props.row.leaveDate===null">
            {{(Math.abs(new Date(props.row.entryDate) - new Date())/ (365 * 24 * 60 * 60 * 1000)).toFixed(1)}} 年
          </span>
            </q-td>
            <q-td key="leaveDate">
              <span class="block">{{ props.row.leaveDate }}</span>
              <span class="block text-grey-7" v-if="props.row.leaveDate!=null">
            {{(Math.abs(new Date(props.row.leaveDate) - new Date(props.row.entryDate))/ (365 * 24 * 60 * 60 * 1000)).toFixed(1)}} 年
          </span>
            </q-td>
            <q-td key="birthday">
              <span class="block">{{ props.row.birthday }}</span>
              <span class="block text-grey-7">
            {{(Math.abs(new Date(props.row.birthday) - new Date())/ (365 * 24 * 60 * 60 * 1000)).toFixed(0)}} 岁
          </span>
            </q-td>
            <q-td key="education">
              <span class="block">{{ props.row.education }}</span>
            </q-td>
            <q-td key="university">
              <span class="block">{{ props.row.university }}</span>
              <span class="block text-grey-7">{{ props.row.major }}</span>
            </q-td>
            <q-td key="sex">
              {{ props.row.sex==true?'男':'女' }}
            </q-td>
            <q-td key="nation">
              {{ props.row.nation }}
            </q-td>
            <q-td key="political" :class="props.row.political==='党员'? 'text-purple-13 text-bold':''">
              {{ props.row.political }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>
    </q-card>
    <!--表格分页-->
    <div class="row justify-center q-pa-lg">
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          color="black"
          :max="userListPageSize"
          :max-pages="6"
          :boundary-numbers="true"
        />
      </div>
    </div>
    <!--新增用户-->
    <q-dialog v-model="addNewUserDialog" full-width>
      <q-card square flat>
        <q-card-section class="q-pa-none bg-grey-3">
          <q-icon class="bg-purple-3 q-pa-sm" name="fas fa-user" size="25px"></q-icon>
          <span class="text-bold text-h6 absolute-center">新增用户</span>
        </q-card-section>
        <q-card-section>
          <q-stepper
            v-model="newUserStep"
            ref="stepper"
            color="purple"
            animated
            flat
            done-color="black"
            active-color="purple"
            inactive-color="grey"
            header-class="text-bold"
          >
            <q-step
              :name="1"
              title="手机号码（即为登录用户名）"
              icon="settings"
              :done="newUserStep > 1"
            >
              <q-input v-model="NewUserName.userName"
                       dense
                       color="purple"
                       input-class="q-ml-lg text-h6"
                       :error="!this.$v.NewUserName.userName.userNameIsUnique ||!this.$v.NewUserName.userName.required "
                       :error-message="this.$v.NewUserName.userName.userNameIsUnique===false?'* 手机号码重复':'* 必填'"
                       debounce="50000"
              >
                <template v-slot:before>
                  <span class="inputLabel text-black">手机号码</span>
                </template>
              </q-input>
              <q-input v-model="NewUserName.realName"
                       dense
                       color="purple"
                       input-class="q-ml-lg text-h6"
                       :error="!this.$v.NewUserName.realName.required "
                       error-message="* 必填"
              >
                <template v-slot:before>
                  <span class="inputLabel text-black">姓名</span>
                </template>
              </q-input>
            </q-step>
            <q-step
              :name="2"
              title="当前状态"
              icon="assignment"
            >
              <div>
                <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">状态</span>
                <q-radio class="q-ml-md"   dense v-model="NewUserName.workStatus" val='1' label="试用" color="purple" />
                <q-radio class="q-ml-md"  dense v-model="NewUserName.workStatus" val='2' label="实习" color="purple" />
                <q-radio class="q-ml-md"  dense v-model="NewUserName.workStatus" val='3' label="正式" color="purple"/>
              </div>
            </q-step>
            <q-step
              :name="3"
              title="选择岗位"
              icon="create_new_folder"
              :done="newUserStep > 2"
            >
              <SetPos ref="getPosSelected" @getPid="getPosId()" class="q-ml-md"></SetPos>
            </q-step>
            <q-step
              :name="4"
              title="信息确认"
              icon="create_new_folder"
              :done="newUserStep > 3"
            >
              <div>
                <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">用户名</span>
                <span class="text-h6 text-black inline-block q-ml-lg">{{this.NewUserName.userName}}</span>
              </div>
              <div>
                <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">姓名</span>
                <span class="text-h6 text-black inline-block q-ml-lg">{{this.NewUserName.realName}}</span>
              </div>
              <div>
                <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">岗位</span>
                <span class="text-h6 text-black inline-block q-ml-lg">{{this.NewUserName.posId| actualOrgName(orgList)}}</span>
              </div>
              <div>
                <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">状态</span>
                <span class="text-h6 text-black inline-block q-ml-lg">{{this.NewUserName.workStatus |workStatus}}</span>
              </div>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation class="q-mt-lg">
                <q-btn v-if="newUserStep < 4" @click="$refs.stepper.next()" color="purple" label="下一步" />
                <q-btn v-if="newUserStep < 5 && newUserStep > 3" @click="addTbUser()" color="purple" label="保存" />
                <q-btn v-if="newUserStep > 1" flat color="purple" @click="$refs.stepper.previous()" label="后退" class="q-ml-sm" />
                <q-btn v-close-popup flat color="black" class="q-ml-md"  label="退出"/>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--变更岗位-->
    <q-dialog v-model="changePosDialog">
      <q-card square>
        <div class="bg-grey-3">
          <q-avatar square  size="40px" font-size="20px" color="purple-4" text-color="black" icon="fas fa-list-ol"/>
          <span class=" q-ma-lg text-bold text-h6">岗位选择</span>
        </div>
        <q-card-section>
       <SetRole ref="getPosSelected" @getPid="changePosId()"></SetRole>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--员工离职-->
    <q-dialog v-model="userOffDialog">
      <q-card square>
        <div class="bg-grey-3">
          <q-avatar square  size="40px" font-size="20px" color="red-4" text-color="black" icon="fas fa-user-times"/>
          <span class=" q-ma-lg text-bold text-h6">{{this.userOffData.realName}}--离职登记</span>
        </div>
        <q-card-section>
          <div class="text-subtitle1 text-bold q-mb-md">请选择要中止的合同</div>
          <q-list bordered separator dense v-for="item in personalContractList " :key="item.autoId">
            <q-item clickable v-ripple active-class="bg-red-2" class="text-black" :active="contractFalse===item.autoId" @click="selectContractFalse(item.autoId)">
              <q-item-section>
                第{{item.times}}次签订,
                {{item.contractStatus | contractStatus}},
                {{item.contractStart}}- {{item.contractEnd}}</q-item-section>
            </q-item>
          </q-list>
          <div class="q-mt-md">
          <q-input v-model="userOffReason" prefix="离职原因"
                   input-class="q-ml-md"
                   dense autofocus color="red"
          />
          <q-input v-model="userOffDate" prefix="离职日期"
                   input-class="q-ml-md"
                   dense autofocus type="date" color="red" max="2200-12-31"
          />
          <span class="block" v-if="userOffDate===null">离职日期没有填写哦~</span>
          <q-btn @click="userOff()" color="red" class="q-mt-md" flat>确认</q-btn>
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
import '../util/filter'
import { userNameIsUnique } from '../util/myValidate'
import printJS from 'print-js'
import SetRole from '../components/setRole'
import SetPos from '../components/setPos'
import { getChildList } from '../util/orgListHandler'
export default {
  name: 'UserList',
  components: { SetPos, SetRole },
  data () {
    return {
      queryExpanded: false,
      currentPage: 1,
      rowsPerPage: 20,
      tbLoading: false,
      queryDrawer: false,
      addNewUserDialog: false,
      userDelProxy: '99',
      newUserStep: 1,
      userNameTip: false,
      userOffDate: null,
      userOffReason: null,
      userOffDialog: false,
      userOffData: {},
      contractFalse: null,
      changePosDialog: false,
      deptNameOptions: [],
      postNameOptions: [],
      changePosUserData: {
        userDetailId: null,
        posId: null
      },
      NewUserName: {
        userName: null,
        posId: null,
        realName: null,
        workStatus: '1'
      },
      rowNumOptions: [
        {
          label: '所有',
          value: 0
        },
        {
          label: '20',
          value: 20
        },
        {
          label: '30',
          value: 30
        },
        {
          label: '50',
          value: 50
        }
      ],
      queryValidationTip: null,
      userListcolumns: [
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
          name: 'realName',
          label: '姓名',
          align: 'left',
          headerClasses: 'sticky-td bg-grey-2',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'companyNo',
          label: '工号',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'depName',
          label: '部门',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'posName',
          label: '岗位',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'entryDate',
          label: '入职日期',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'leaveDate',
          label: '离职日期',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'birthday',
          label: '出生日期',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'education',
          label: '学历',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'university',
          label: '毕业院校',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'sex',
          label: '性别',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'nation',
          label: '民族',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        },
        {
          name: 'political',
          label: '政治面貌',
          align: 'left',
          headerClasses: '',
          headerStyle: 'font-size:18px;font-weight:bold'
        }
      ],
      queryData: {
        birthday: null,
        companyNo: null,
        depName: null,
        education: null,
        entryDate: null,
        expectedDate: null,
        idNumber: null,
        leaveDate: null,
        major: null,
        marriageData: ['1', '0'],
        marriageDataAfter: null,
        nation: null,
        otherLanguage: null,
        phone: null,
        political: null,
        postName: null,
        posNameArray: [],
        posId: null,
        realName: null,
        sexData: ['1', '0'],
        sexDataAfter: null,
        university: null,
        workStatusData: ['1', '2', '3'],
        workStatusDataAfter: null,
        otherAgreement: null
      }
    }
  },
  validations: {
    queryData: {
      birthday: { maxLength: maxLength(10) },
      entryDate: { maxLength: maxLength(10) },
      expectedDate: { maxLength: maxLength(10) },
      leaveDate: { maxLength: maxLength(10) },
      sexData: { required },
      workStatusData: { required }
    },
    NewUserName: {
      userName: {
        required,
        userNameIsUnique
      },
      posId: { required },
      realName: { required }
    }
  },
  mounted () {
    if (this.userListInfo.length === 0) {
      this.tbLoading = true
    }
    this.handlerQueryData()
    this.userListSetCurrentPageMutation(1)
    this.selectData()
    this.userChartAction()
    this.treeDataAction()
  },
  computed: {
    ...mapState('User',
      [
        'userListInfo',
        'userListOff',
        'userListSendEditedRes',
        'userListAddNewRes',
        'userListTrashRes',
        'userListPagesNumber',
        'userListPageSize',
        'educationChart',
        'ageChart',
        'companyAgeChart',
        'statusChart',
        'setPosIdState',
        'personalContractList'
      ]),
    ...mapState('PubRes',
      [
        'orgList'
      ]
    ),
    userListPagination: {
      get () {
        return this.$store.state.User.userListPagination
      },
      set () {
      }
    }
  },
  methods: {
    ...mapMutations('User',
      [
        'userListModuleDataMutation',
        'userListModuleDataWithoutQueryMutation',
        'userListSendEditedMutation',
        'userListAddNewMutation',
        'userListTrashMutation',
        'userListSetRowsPerPageMutation',
        'userListSetCurrentPageMutation'
      ]),
    ...mapActions('User',
      [
        'userListModuleDataAction',
        'userListModuleDataWithoutQueryAction',
        'userListSendEditedAction',
        'userListNewDateAction',
        'userListTrashDataAction',
        'userListOffDataAction',
        'userChartAction',
        'setPosIdAction',
        'userContractUpdateAction',
        'personalContractAction'
      ]),
    ...mapActions('OrgChart',
      [
        'treeDataAction'
      ]),
    printUserList () {
      printJS({
        printable: 'userList',
        type: 'html',
        // properties: [
        //    { field: 'name', displayName: '姓名', columnSize:`50%`},
        //    { field: 'sex', displayName: '性别',columnSize:`50%`},
        // ],
        // header: '<div style="font-size: 20px">员工列表</div>',
        // style: '#userList {width: 100px;} .no-print{width: 0px} .itemText1 { width: 200px } .itemText2 { width: 200px } .itemText3 { width: 200px } .itemText4 { width: 200px }',
        // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
        // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
        repeatTableHeader: true,
        // scanStyles:true,
        targetStyles: ['*'],
        ignoreElements: ['no-print', 'bc', 'gb']
      })
    },
    /* 挂载后初始数据 */
    onRequest (props) {
      this.userListModuleDataAction(props)
    },
    handlerQueryData () {
      this.queryData.marriageDataAfter = sumString(this.queryData.marriageData)
      this.queryData.sexDataAfter = sumString(this.queryData.sexData)
      this.queryData.workStatusDataAfter = sumString(this.queryData.workStatusData)
      // 查询数据中若只有部门，则迭代该部门所有子节点
      if (this.queryData.postName === null) {
        if (this.queryData.depName !== null) {
          this.queryData.posNameArray = getChildList(this.queryData.depName, this.orgList)
        }
      }
    },
    /* 查询数据 */
    selectData () {
      if (this.$v.queryData.$invalid === false) {
        this.handlerQueryData()
        this.userListModuleDataAction({
          pagination: this.userListPagination,
          queryData: this.queryData
        })
      } else {
        this.queryValidationTip = '请检查查询数据！'
      }
    },
    resetData () {
      this.initQueryData()
    },
    initQueryData () {
      Object.assign(this.queryData, this.$options.data.call(this).queryData)
      this.selectData()
    },
    /* 删除数据 */
    trash (props) {
      this.userDelProxy = props.row.userDetailId
      this.userListTrashDataAction(props.row)
    },
    editUserOff (val) {
      this.personalContractAction({
        userDetailId: val.userDetailId
      })
      this.userOffReason = ''
      this.userOffDate = ''
      this.userOffData = val
      this.userOffDialog = true
    },
    selectContractFalse (val) {
      this.contractFalse = val
    },
    userOff () {
      if (this.userOffDate !== null) {
        this.userOffData.workStatus = '4'
        this.userOffData.leaveDate = this.userOffDate
        this.userListSendEditedAction(this.userOffData)
        this.userContractUpdateAction(
          {
            autoId: this.contractFalse,
            contractFalseTime: this.userOffDate,
            contractFalseReason: this.userOffReason,
            contractStatus: '0'
          }
        )
      }
    },
    userDetailReturn (props) {
      props.row.workStatus = '3'
      props.row.leaveDate = null
      this.userListSendEditedAction(props.row)
    },
    addNewDialog () {
      Object.assign(this.NewUserName, this.$options.data.call(this).NewUserName)
      this.newUserStep = 1
      this.userNameTip = false
      this.addNewUserDialog = true
    },
    getPosId () {
      this.NewUserName.posId = this.$refs.getPosSelected.posSelected
    },
    addTbUser () {
      this.userListNewDateAction(this.NewUserName)
    },
    userDetailHandler (props) {
      this.$router.push({
        name: 'PersonalInfo',
        params: {
          userDetailId: props.row.userDetailId
        }
      })
    },
    changeRole (props) {
      this.changePosUserData.userDetailId = props.row.userDetailId
      this.changePosUserData.posId = props.row.posId
      this.changePosUserData.userRealName = props.row.realName
      this.changePosDialog = true
    },
    changePosId () {
      this.changePosUserData.posId = this.$refs.getPosSelected.posSelected
      this.setPosIdAction(this.changePosUserData)
    },
    changePwd (props) {}
  },
  watch: {
    userListInfo () {
      this.tbLoading = false
      // this.userOffDialog = false
    },
    // 翻页
    currentPage (val) {
      this.tbLoading = true
      this.userListSetCurrentPageMutation(val)
      this.selectData()
    },
    // 改变每页的数量重新发起请求
    rowsPerPage (val) {
      this.userListSetRowsPerPageMutation(val.value)
      this.selectData()
      this.currentPage = 1
    },
    'queryData.workStatusData': {
      handler () {
        this.selectData()
      }
    },
    'queryData.depName': {
      handler (val) {
        this.queryData.posId = null
        this.postNameOptions = this.orgList.filter(item => item.pId === val && item.deptFlag === '0')
      }
    },
    userListAddNewRes (val) {
      if (val.userDetail !== undefined) {
        this.$router.push({
          name: 'PersonalInfo',
          params: {
            userDetailId: val.userDetail
          }
        })
      }
    },
    setPosIdState (val) {
      if (val === 1) {
        this.onRequest({
          pagination: this.userListPagination,
          queryData: this.queryData
        })
        this.changePosDialog = false
      }
    },
    userDetailUpdateState (val) {
      if (val === 1) {
        this.selectData()
      }
    },
    newUserStep (val) {
      switch (val) {
        case 2:
          if (this.$v.NewUserName.userName.userNameIsUnique === false) {
            this.newUserStep = 1
          }
          if (this.$v.NewUserName.realName.required === false) {
            this.newUserStep = 1
          }
          break
        case 4:
          if (this.NewUserName.posId === null) {
            this.newUserStep = 3
          }
      }
    },
    userListTrashRes (val) {
      if (val === '1') {
        this.userDelProxy = false
        this.selectData()
      }
    },
    userContractUpdateRes (val) {
      if (val === 1) {
        this.userOffDialog = false
      }
    },
    queryDrawer (val) {
      if (val === true) {
        this.deptNameOptions = this.orgList.filter(item => item.deptFlag === '1')
      }
    }
  }
}
</script >

<style scoped lang="sass">
</style>
