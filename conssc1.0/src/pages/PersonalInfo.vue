<template>
  <div class="q-ma-sm">
    <q-btn flat color="black" to="/UserList" ><q-icon name="fas fa-angle-double-left" class="iconPos q-mr-sm" size="20px"></q-icon>返回列表</q-btn>
    <q-card square class="q-mt-lg" flat>
      <q-tabs v-model="personalInfoTab"
              align="left"
              class="text-black bg-grey-3"
              active-bg-color="white">
        <q-tab
          name="hr"
          content-class="text-subtitle1"
          active-class="text-blod"
        >岗位信息</q-tab>
        <q-tab
          name="personal"
          content-class="text-subtitle1"
         >个人信息</q-tab>
        <q-tab
          name="jobHis"
          content-class="text-subtitle1"
        >工作经历</q-tab>
        <q-tab
          name="traHis"
          content-class="text-subtitle1"
        >培训背景</q-tab>
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="personalInfoTab"
          animated
          transition-prev="scale"
          transition-next="scale"
        >
          <q-tab-panel name="hr">
            <q-card flat borderless class="q-mt-lg">
              <div class="q-ml-md">
                <q-chip square size="20px" class="bg-purple-2 text-bold">
                  <q-avatar color="purple" text-color="white">1</q-avatar>
                  岗位信息
                </q-chip>
                <q-btn color="purple" outline class="q-ml-md text-bold" @click="hrUpdate">
                  <span>保 存</span>
                </q-btn>
              </div>
              <q-card-section class="q-mb-lg">
                <div class="row">
                  <div class="col-lg-3 col-md-6 col-xs-12 q-pa-xs">
                    <div>
                    <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">部门</span>
                    <span class="text-subtitle1 text-black inline-block q-ml-lg">{{rowData.posId  | deptName(orgList) }}</span>
                    </div>
                    <div>
                    <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">岗位</span>
                    <span class="text-subtitle1 text-black inline-block q-ml-lg">{{rowData.posId| actualOrgName(orgList)}}</span>
                    </div>
                    <div>
                    <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">上级</span>
                    <span class="text-subtitle1 text-black inline-block q-ml-lg">{{rowData.posId| parentName(orgList)}}</span>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-xs-12 q-pa-xs">
                    <q-input v-model="rowData.realName"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4">
                      <template v-slot:before>
                        <span class="inputLabel text-black">姓名</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.companyNo"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4">
                      <template v-slot:before>
                        <span class="inputLabel text-black">工号</span>
                      </template>
                    </q-input>
                    <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">用户名</span>
                    <span class="text-subtitle1 text-black inline-block q-ml-lg">{{rowDataUser.userName}}</span>
                  </div>
                  <div class="col-lg-3 col-md-6 col-xs-12 q-pa-xs">
                    <q-input v-model="rowData.entryDate"
                             dense
                             type="date"
                             max="2200-12-31"
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4">
                      <template v-slot:before>
                        <span class="inputLabel text-black">入职日</span>
                      </template>
                    </q-input>
                    <q-select
                      flat
                      dense
                      map-options
                      emit-value
                      v-model="rowData.workStatus"
                      :options="workStatusOption"
                      color="purple"
                      class="text-subtitle1 q-mt-sm"
                    >
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">状态</span>
                      </template>
                      <template v-slot:prepend>
                        <span class="q-ml-sm" />
                      </template>
                    </q-select>
                    <q-input v-model="rowData.leaveDate"
                             type="date"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4" disable>
                      <template v-slot:before>
                        <span class="inputLabel text-black">离职日</span>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-3 col-md-6 col-xs-12 q-pa-xs">
                    <q-input v-model="rowData.expectedDate"
                             dense
                             type="date"
                             max="2200-12-31"
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4">
                      <template v-slot:before>
                        <span class="inputLabel text-black">转正日</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.probationPeriod"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4">
                      <template v-slot:before>
                        <span class="inputLabel text-black">试用期</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.otherAgreement"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4">
                      <template v-slot:before>
                        <span class="inputLabel text-black">附加协议</span>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
              <div class="q-ml-md">
                <q-chip square size="20px" class="bg-purple-2 text-bold">
                  <q-avatar color="purple" text-color="white">2</q-avatar>
                  劳动合同
                </q-chip>
              </div>
              <q-card-section class="q-mb-lg">
                <q-table
                  dense
                  bordered
                  hide-pagination
                  flat
                  :data="userContractInfo"
                  :columns="contractColumns"
                  row-key="name"
                >
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
                    <q-tr>
                      <q-td class="q-ma-none  bg-grey-2" style="width:5px">
                        {{props.rowIndex+1}}
                      </q-td>
                      <q-td>{{props.row.contractStart}}</q-td>
                      <q-td>{{props.row.contractEnd}}</q-td>
                      <q-td>
                        第 {{props.row.times}} 次签订
                      </q-td>
                      <q-td>{{props.row.contractPhase | contractPhase}}</q-td>
                      <q-td>{{props.row.contractStatus | contractStatus}}</q-td>
                      <q-td>{{props.row.contractFalseTime}}</q-td>
                      <q-td>{{props.row.contractFalseReason}}</q-td>
                      <q-td>{{props.row.remark}}</q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
              <div class="q-ml-md">
                <q-chip square size="20px" class="bg-purple-2 text-bold">
                  <q-avatar color="purple" text-color="white">3</q-avatar>
                  调薪记录
                </q-chip>
              </div>
              <q-card-section class="q-mb-lg">
                <q-table
                  dense
                  bordered
                  flat
                  :data="userPayrollInfo"
                  :columns="payrollColumns"
                />
              </q-card-section>
              <div class="q-ml-md">
                <q-chip square size="20px" class="bg-purple-2 text-bold">
                  <q-avatar color="purple" text-color="white">4</q-avatar>
                  调岗记录
                </q-chip>
              </div>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="personal">
            <q-card flat borderless class="q-mt-lg">
              <div class="q-ml-md">
                <q-chip square size="20px" class="bg-purple-2 text-bold">
                  <q-avatar color="purple" text-color="white">1</q-avatar>
                  个人信息
                </q-chip>
                <q-btn color="purple" outline class="q-ml-md text-bold" @click="personalUpdate()">
                  <span>保 存</span>
                </q-btn>
              </div>
              <q-card-section class="q-mb-md">
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <span class="text-subtitle1 inputLabel text-black inline-block q-mt-sm">手机号码</span>
                    <span class="text-black inline-block text-subtitle1 text-bold" style="margin-left: 20px">{{rowData.phone}}</span>
                    <q-btn class="q-ml-lg" color="purple" @click="editUserName">
                      修改
                      <q-tooltip>修改成功后，登录名同步变更为修改后手机号码</q-tooltip>
                    </q-btn>
                    <q-input v-model="rowData.idNumber"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">身份证号</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.birthday"
                             dense
                             type="date"
                             max="2200-12-31"
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">出生日期</span>
                      </template>
                    </q-input>
                    <div class="q-mt-sm">
                      <span class="inline-block inputLabel text-subtitle1">性别</span>
                      <q-radio class="q-ml-lg"  style="margin-right: 30px" dense v-model="rowData.sex" val='true' label="男" color="purple" name="test" />
                      <q-radio class="q-ml-lg" dense v-model="rowData.sex" val='false' label="女" color="purple"/>
                    </div>
                    <div class="q-mt-sm">
                      <span class="inline-block inputLabel text-subtitle1">婚姻</span>
                      <q-radio class="q-ml-lg" style="margin-right: 17px" dense v-model="rowData.marriage" val=true label="已婚" color="purple" name="test" />
                      <q-radio class="q-ml-lg" dense v-model="rowData.marriage" val=false label="未婚" color="purple"/>
                    </div>
                    <div class="row">
                      <div class="col-6">
                    <q-input v-model="rowData.domicile"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">籍贯</span>
                      </template>
                    </q-input>
                      </div>
                      <div class="col-6">
                    <q-input v-model="rowData.nation"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">民族</span>
                      </template>
                    </q-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <q-input v-model="rowData.origin"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">户口</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.english"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">英语等级</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.otherLanguage"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">其他语言</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.political"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">政治面貌</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.politicalTime"
                             dense
                             type="date"
                             max="2200-12-31"
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">入党时间</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.firstWorkTime"
                             dense
                             type="date"
                             max="2200-12-31"
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             hint="首次参加工作时间"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">参加工作</span>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-4 col-md-12 col-xs-12 q-pa-sm">
                    <q-input v-model="rowData.address"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">现住址</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.bankName"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">薪资银行</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.payrollCard"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">银行卡号</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.otherCard"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             placeholder="其他需要用到的卡片号码"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">其他卡号</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.otherQualification"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">资格证书</span>
                      </template>
                    </q-input>
                    <q-input v-model="rowData.otherRemark"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">其他备注</span>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-mb-xl">
                <div class="row q-mb-none">
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <q-input v-model="rowData.homeName"
                             dense
                             class="q-mt-sm text-subtitle1"
                             input-class="q-ml-md"
                             color="purple-4"
                             style="vertical-align: bottom">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">配偶姓名</span>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <div class="q-mt-sm">
                      <q-input v-model="rowData.homePhone"
                               dense
                               class="q-mt-sm text-subtitle1"
                               input-class="q-ml-md"
                               color="purple-4"
                               style="vertical-align: bottom">
                        <template v-slot:before>
                          <span class="text-subtitle1 inputLabel text-black">配偶电话</span>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-12 col-xs-12 q-pa-sm">
                    <div class="q-mt-sm">
                      <q-input v-model="rowData.childNum"
                               dense
                               type="num"
                               class="q-mt-sm text-subtitle1"
                               input-class="q-ml-md"
                               color="purple-4"
                               style="vertical-align: bottom">
                        <template v-slot:before>
                          <span class="text-subtitle1 inputLabel text-black">子女数量</span>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <div class="q-ml-md">
                <q-chip square size="20px" class="bg-purple-2 text-bold">
                  <q-avatar color="purple" text-color="white">2</q-avatar>
                  教育经历
                </q-chip>
                  <q-btn color="purple" outline class="q-ml-md text-bold" @click="addEdu(rowData)">
                    <span>保 存</span>
                  </q-btn>
                  <span class="q-pl-sm q-pt-lg text-purple">请填写后直接点击保存，以此逐条增加。<strong>请从大学教育阶段开始填写</strong></span>
              </div>
              <q-card-section class="q-mb-xl">
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <q-input v-model="eduHisData.eduPhase" dense outlined color="purple" input-class="q-ml-md text-subtitle1" placeholder="如本科 硕士 博士等学历阶段" >
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">教育阶段</span>
                      </template>
                    </q-input>
                    <q-input v-model="eduHisData.eduName" dense outlined color="purple" input-class="q-ml-md text-subtitle1" class="q-mt-xs">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">毕业院校</span>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <q-input v-model="eduHisData.eduDuring" dense outlined color="purple" input-class="q-ml-md text-subtitle1">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">起止时间</span>
                      </template>
                    </q-input>
                    <q-input v-model="eduHisData.eduMajor" dense outlined color="purple" input-class="q-ml-md text-subtitle1" class="q-mt-xs">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">专业名称</span>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm">
                    <q-input  v-model="eduHisData.eduCertification" dense outlined color="purple" input-class="q-ml-md" placeholder="如学士学位，工程硕士等描述">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">学历证书</span>
                      </template>
                    </q-input>
                    <q-input v-model="eduHisData.remark" dense outlined color="purple" input-class="q-ml-md text-subtitle1" class="q-mt-xs">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">备注</span>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="q-mt-lg">
                  <q-chip square size="20px" class="bg-grey-3">
                    <q-avatar color="blue-3" text-color="white"><q-icon name="fas fa-school"></q-icon></q-avatar>
                    当前最高学历
                  </q-chip>
                  <q-chip square size="20px"  class="text-bold">
                    {{rowData.education}}
                    <q-icon name="fas fa-chevron-right"/>
                    {{rowData.university}}
                    <q-icon name="fas fa-chevron-right"/>
                    {{rowData.major}}
                  </q-chip>
                </div>
                <q-table
                  bordered
                  flat
                  grid
                  :data="userEduHisInfo"
                  card-class="bg-light-purple-1"
                  row-key="name"
                  class="q-mt-lg"
                  :pagination="eduInitialPagination"
                  hide-pagination
                >
                  <template v-slot:item="props">
                    <div class="q-pa-sm col-xs-12 col-md-6 col-lg-3">
                      <q-card square>
                        <q-card-section class="text-center bg-grey-2 q-pa-sm">
                          <span class="text-subtitle1">{{ props.row.eduPhase }}</span>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md">起止时间</span>
                            <span class="q-mr-md">{{ props.row.eduDuring }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md">毕业院校</span>
                            <span class="q-mr-md">{{ props.row.eduName }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md">专业名称</span>
                            <span>{{ props.row.eduMajor }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md">学历证书</span>
                            <span>{{ props.row.eduCertification }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md">其他备注</span>
                            <span>{{ props.row.remark }}</span>
                          </div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section class="text-left q-pa-none">
                          <q-btn flat text-color="grey" label="修改" @click="eduEdit(props.row)"/>
                          <q-btn flat text-color="grey"  label="删除" @click="eduTrashEdu(props.row)" />
                          <q-btn flat text-color="purple"  label="设为最高学历" @click="setHighestEdu(props.row)" />
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="jobHis">
          <q-card flat borderless class="q-mt-lg">
            <q-card-section>
              <div class="row">
                <div class="col-lg-4 col-md-6 col-xs-12 q-pl-sm q-pt-xs">
                  <q-input v-model="jobHisData.workDuring" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
                    <template v-slot:before>
                      <span class="text-subtitle1 inputLabel text-black">起止时间</span>
                    </template>
                  </q-input>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 q-pl-sm q-pt-xs">
                  <q-input v-model="jobHisData.workCompanyName" dense outlined color="purple" input-class="q-ml-md text-subtitle1">
                    <template v-slot:before>
                      <span class="text-subtitle1 inputLabel text-black">就职单位</span>
                    </template>
                  </q-input>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 q-pl-sm q-pt-xs">
                  <q-input v-model="jobHisData.workPos" dense outlined color="purple" input-class="q-ml-md">
                    <template v-slot:before>
                      <span class="text-subtitle1 inputLabel text-black">最后岗位</span>
                    </template>
                  </q-input>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 q-pl-sm q-pt-xs">
                  <q-input  v-model="jobHisData.workPerformance" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
                    <template v-slot:before>
                      <span class="text-subtitle1 inputLabel text-black">其他说明</span>
                    </template>
                  </q-input>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 q-pl-sm q-pt-xs">
                  <q-input v-model="jobHisData.workPerson" dense outlined color="purple" input-class="q-ml-md text-subtitle1">
                    <template v-slot:before>
                      <span class="text-subtitle1 inputLabel text-black">证明人</span>
                    </template>
                  </q-input>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 q-pl-sm q-pt-xs">
                  <q-input  v-model="jobHisData.personPhone" dense outlined color="purple" input-class="q-ml-md">
                    <template v-slot:before>
                      <span class="text-subtitle1 inputLabel text-black">联系方式</span>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <q-btn color="purple" outline class="q-ml-md text-bold q-mt-md" @click="addJob(rowData)">
                  <span>保 存</span>
                </q-btn>
                <span class="q-pl-sm q-pt-lg  text-purple">请填写后直接点击保存，以此逐条增加。</span>
              </div>
              <q-table
                bordered
                flat
                grid
                :data="userJobHisInfo"
                row-key="name"
                class="q-mt-xl"
                :pagination="jobInitialPagination"
                hide-pagination
              >
                <template v-slot:item="props">
                  <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
                    <q-card square>
                      <q-card-section class="text-center bg-grey-3 q-pa-sm">
                        <span class="text-subtitle1">{{ props.row.workCompanyName }}</span>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="q-mb-sm text-subtitle1">
                          <span class="q-mr-md text-bold">起止时间</span>
                          <span>{{ props.row.workDuring }}</span>
                        </div>
                        <div class="q-mb-sm text-subtitle1 ">
                          <span class="q-mr-md text-bold ">工作岗位</span>
                          <span>{{ props.row.workPos }}</span>
                        </div>
                        <div class="q-mb-sm text-subtitle1">
                          <span class="q-mr-md text-bold ">背调联系</span>
                          <span class="q-mr-md ">{{ props.row.workPerson }}</span>
                        </div>
                        <div class="q-mb-sm text-subtitle1">
                          <span class="q-mr-md text-bold">背调电话</span>
                          <span class="q-mr-md">{{ props.row.personPhone }}</span>
                        </div>
                        <div class="q-mb-sm text-subtitle1 ">
                          <span class="q-mr-md  text-bold">其他说明</span>
                          <p class="q-mt-sm q-ml-lg">{{ props.row.workPerformance }}</p>
                        </div>
                      </q-card-section>
                      <q-separator />
                      <q-card-section class="text-left q-pa-none">
                        <q-btn flat text-color="grey" label="修改" @click="jobEdit(props.row)"/>
                        <q-btn flat text-color="grey"  label="删除" @click="jobTrashEdu(props.row)" />
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </q-tab-panel>
          <q-tab-panel name="traHis">
            <q-card flat borderless class="q-mt-lg">
              <q-card-section class="q-mb-xl">
                  <div class="row">
                    <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                      <q-input dense  v-model="traHisData.traName" color="purple" input-class="q-ml-md text-subtitle1" >
                        <template v-slot:before>
                          <span class="text-subtitle1 inputLabel text-black">课程名称</span>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                      <q-input dense v-model="traHisData.traDuring" color="purple" input-class="q-ml-md text-subtitle1">
                        <template v-slot:before>
                          <span class="text-subtitle1 inputLabel text-black">起止时间</span>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                    <q-input dense v-model="traHisData.traCertification" color="purple" input-class="q-ml-md">
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">获得证书</span>
                      </template>
                    </q-input>
                  </div>
                    <div class="col-lg-3 col-md-6 col-xs-12 q-pa-sm">
                      <q-input dense v-model="traHisData.traLocation" color="purple" input-class="q-ml-md">
                        <template v-slot:before>
                          <span class="text-subtitle1 inputLabel text-black">培训地点</span>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-12 q-pa-sm">
                    <q-input dense  v-model="traHisData.traHost" color="purple" input-class="q-ml-md q-mt-sm text-subtitle1" >
                      <template v-slot:before>
                        <span class="text-subtitle1 inputLabel text-black">培训主办</span>
                      </template>
                    </q-input>
                    </div>
                  </div>
                <div class="row q-mb-xl">
                  <q-btn color="purple" outline class="q-ml-md text-bold q-mt-md" @click="addTra">
                    <span>保 存</span>
                  </q-btn>
                  <span class="q-pl-sm q-pt-lg  text-purple">请填写后直接点击保存，以此逐条增加。</span>
                </div>
                <div>
                </div>
                <q-table
                  bordered
                  grid
                  flat
                  :data="userTraHisInfo"
                  :pagination="traInitialPagination"
                  row-key="name"
                >
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
                      <q-card square>
                        <q-card-section class="text-center bg-lime-1 q-pa-sm">
                          <span class="text-h5">{{ props.row.traName }}</span>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md text-bold">起止时间</span>
                            <span>{{ props.row.traDuring }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md text-bold">培训证书</span>
                            <span>{{ props.row.traCertification }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md text-bold">培训地点</span>
                            <span class="q-mr-md">{{ props.row.traLocation }}</span>
                          </div>
                          <div class="q-mb-sm text-subtitle1">
                            <span class="q-mr-md text-bold">培训主办</span>
                            <span class="q-mr-md">{{ props.row.traHost }}</span>
                          </div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section class="text-left q-pa-none">
                          <q-btn flat text-color="grey" label="修改" @click="traEdit(props.row)"/>
                          <q-btn flat text-color="grey"  label="删除" @click="traTrashEdu(props.row)" />
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
    <!--修改学历背景-->
    <q-dialog v-model="eduEditDialog" persistent>
      <q-card>
        <q-card-section>
          <span class="text-weight-bold text-h6">修改教育背景</span>
        </q-card-section>
        <q-card-section class="q-gutter-lg">
          <q-input  v-model="eduHisRowData.eduPhase" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">教育阶段</span>
            </template>
          </q-input>
          <q-input  v-model="eduHisRowData.eduDuring" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">起止时间</span>
            </template>
          </q-input>
          <q-input  v-model="eduHisRowData.eduCertification" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">学历证书</span>
            </template>
          </q-input>
          <q-input  v-model="eduHisRowData.eduName" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">毕业院校</span>
            </template>
          </q-input>
          <q-input  v-model="eduHisRowData.eduMajor" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">专业名称</span>
            </template>
          </q-input>
          <q-input  v-model="eduHisRowData.remark" dense outlined color="purple" input-class="q-ml-md text-subtitle1" type="textarea" autogrow>
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">备注</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn flat color="purple" class="q-ma-xs text-subtitle1 q-mt-none" @click="sendEduRowData">
            <q-icon name="fas fa-file-import" size="xs" class="q-mr-sm"></q-icon>保存
          </q-btn>
          <q-btn color="" class="text-black inline" v-close-popup>取消</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--修改用户名-->
    <q-dialog v-model="editUserNameDialog" persistent>
      <q-card>
        <div class="bg-grey-3">
          <q-avatar square  size="40px" font-size="20px" color="teal-13" text-color="black" icon="fas fa-edit"/>
          <span class=" q-ma-lg text-bold text-subtitle1">修改用户名</span>
        </div>
        <q-card-section>
          <q-input  v-model="rowDataUser.userName" dense outlined color="purple" input-class="q-ml-md text-subtitle1" type="textarea" autogrow>
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">新手机号</span>
            </template>
          </q-input>
          <span v-if="changeUserName==='1'" class="q-mt-lg">修改成功，请注意<span class="text-h6 text-bold text-purple"> 登录名 </span>同步更新为该号码！</span>
          <span v-if="changeUserName==='2'" class="text-red q-mt-lg">修改失败，号码有重复。</span>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="editUserNameUnique" color="purple" flat>保 存</q-btn>
          <q-btn  color="black" flat class="q-ml-lg" v-close-popup>退 出</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--修改工作经历-->
    <q-dialog v-model="jobEditDialog" persistent>
      <q-card>
        <q-card-section>
          <span class="text-weight-bold text-h6">修改工作经历</span>
        </q-card-section>
        <q-card-section class="q-gutter-lg">
          <q-input  v-model="jobHisRowData.workCompanyName" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">就职单位</span>
            </template>
          </q-input>
          <q-input  v-model="jobHisRowData.workPos" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">工作岗位</span>
            </template>
          </q-input>
          <q-input  v-model="jobHisRowData.workDuring" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">起止时间</span>
            </template>
          </q-input>
          <q-input  v-model="jobHisRowData.workPerson" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">证明人</span>
            </template>
          </q-input>
          <q-input  v-model="jobHisRowData.personPhone" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">联系方式</span>
            </template>
          </q-input>
          <q-input  v-model="jobHisRowData.workPerformance" type="textarea" autogrow dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">主要业绩</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn color="lime-4" class="text-black inline q-mr-lg" @click="sendJobRowData(rowData)">保存</q-btn>
          <q-btn color="" class="text-black inline" v-close-popup>放弃</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--修改培训经历-->
    <q-dialog v-model="traEditDialog" persistent>
      <q-card>
        <q-card-section>
          <span class="text-weight-bold text-h6">修改培训经历</span>
        </q-card-section>
        <q-card-section class="q-gutter-lg">
          <q-input  v-model="traHisRowData.traName" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">课程名称</span>
            </template>
          </q-input>
          <q-input  v-model="traHisRowData.traDuring" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">起止时间</span>
            </template>
          </q-input>
          <q-input  v-model="traHisRowData.traCertification" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">获得证书</span>
            </template>
          </q-input>
          <q-input  v-model="traHisRowData.traLocation" dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">培训地点</span>
            </template>
          </q-input>
          <q-input  v-model="traHisRowData.traHost" type="textarea" autogrow dense outlined color="purple" input-class="q-ml-md text-subtitle1" >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">培训主办</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn color="lime-4" class="text-black inline q-mr-lg" @click="sendTraRowData">保存</q-btn>
          <q-btn color="" class="text-black inline" v-close-popup>放弃</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { difTwoDate } from '../util/dataTimeHandler'
import '../util/filter'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'PersonalInfo',
  data () {
    return {
      personalInfoTab: 'hr',
      currentUserId: '',
      eduEditDialog: false,
      jobEditDialog: false,
      traEditDialog: false,
      eduInitialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 8
      },
      jobInitialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      traInitialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 20
      },
      editUserNameDialog: false,
      changeUserName: null,
      rowData: {
        userDetailId: null,
        userId: null,
        companyId: null,
        userName: null,
        // 用户
        realName: null,
        companyNo: null,
        // 岗位
        depName: null,
        posId: null,
        parentId: null,
        // 状态
        entryDate: null,
        workStatus: '正式',
        leaveDate: null,
        // 其他状态
        expectedDate: null,
        probationPeriod: null,
        otherAgreement: null,
        // 基本信息
        idNumber: null,
        birthday: null,
        sex: null,
        domicile: null,
        marriage: null,
        nation: null,
        origin: null,
        phone: null,
        // 教育和政治面貌
        education: null,
        university: null,
        major: null,
        english: null,
        otherLanguage: null,
        political: null,
        politicalTime: null,
        // 其他
        firstWorkTime: null,
        address: null,
        bankName: null,
        payrollCard: null,
        otherCard: null,
        otherRemark: null,
        otherQualification: null,
        // 家庭信息
        homeName: null,
        homePhone: null,
        childNum: null,
        gmtCreate: null
      },
      rowDataUser: {
        adminFlag: null,
        companyId: null,
        userId: null,
        userName: null
      },
      workStatusOption: [
        {
          label: '正式',
          value: '3'
        },
        {
          label: '试用',
          value: '2'
        },
        {
          label: '实习',
          value: '1'
        },
        {
          label: '离职',
          value: '4'
        }
      ],
      eduHisData:
        {
          autoId: null,
          userDetailId: null,
          eduPhase: null,
          eduName: null,
          eduMajor: null,
          eduDuring: null,
          eduCertification: null,
          remark: null
        },
      eduHisRowData:
        {
          autoId: null,
          userDetailId: null,
          eduPhase: null,
          eduName: null,
          eduMajor: null,
          eduDuring: null,
          eduCertification: null,
          remark: null
        },
      jobHisData:
        {
          autoId: null,
          userDetailId: null,
          workCompanyName: null,
          workPos: null,
          workDuring: null,
          workPerson: null,
          personPhone: null,
          workPerformance: null
        },
      jobHisRowData:
        {
          autoId: null,
          userDetailId: null,
          workCompanyName: null,
          workPos: null,
          workDuring: null,
          workPerson: null,
          personPhone: null,
          workPerformance: null
        },
      traHisData:
        {
          autoId: null,
          userDetailId: null,
          traName: null,
          traDuring: null,
          traCertification: null,
          traLocation: null,
          traHost: null
        },
      traHisRowData:
        {
          autoId: null,
          userDetailId: null,
          traName: null,
          traDuring: null,
          traCertification: null,
          traLocation: null,
          traHost: null
        },
      contractColumns: [
        {
          name: 'index',
          label: 'NO.'
        },
        {
          name: 'contractStart',
          label: '合同开始',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'contractEnd',
          label: '合同结束',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'times',
          label: '签订次数',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'contractPhase',
          label: '阶段',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'contractStatus',
          label: '状态',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'contractFalseTime',
          label: '中止时间',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'contractFalseReason',
          label: '中止原因',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        },
        {
          name: 'remark',
          label: '备注',
          align: 'left',
          headerClasses: 'bg-grey-2',
          headerStyle: 'font-size:10px;font-weight:bold'
        }
      ],
      payrollColumns: [
        {
          name: 'num',
          label: '调薪次数',
          align: 'left',
          field: row => row.num,
          format: (val, row) =>
            '第' + val + '次（' + difTwoDate(row.contractStart, row.contractEnd) + '年）'
        },
        {
          name: 'contractStart',
          label: '调薪时间',
          align: 'left',
          field: row => row.contractStart
        },
        {
          name: 'contractEnd',
          label: '生效时间',
          align: 'left',
          field: row => row.contractEnd
        },
        {
          name: 'contractSalary',
          label: '薪酬金额',
          align: 'left',
          field: row => row.contractSalary
        },
        {
          name: 'remark',
          label: '备注',
          align: 'left',
          field: row => row.remark
        }
      ]
    }
  },
  validations: {
    rowDataUser: {
      userName: {
        required
      }
    }
  },
  mounted () {
    var id = this.$route.params.userDetailId
    this.currentUserId = id
    this.userListDetailDataAction(id)
    this.eduHisData.userDetailId = id
    this.jobHisData.userDetailId = id
    this.traHisData.userDetailId = id
  },
  computed: {
    ...mapState('User',
      [
        'orgNameList',
        'userDetailInfo',
        'userDetailDirectPPos',
        'tbUserInfo',
        'userEduHisInfo',
        'userJobHisInfo',
        'userTraHisInfo',
        'userContractInfo',
        'userPayrollInfo',
        'editUserNameUniqueRes',
        'userDetailUpdateState'
      ]),
    ...mapState('PubRes',
      [
        'orgList'
      ])
  },
  methods: {
    ...mapActions('User',
      [
        'userListDetailDataAction',
        'userListSendEditedAction',
        'userDetailUserSendEditedAction',
        'userEduAddAction',
        'userEduHisTrashAction',
        'userEduHisUpdateAction',
        'userJobAddAction',
        'userJobHisTrashAction',
        'userJobHisUpdateAction',
        'userTraAddAction',
        'userTraHisTrashAction',
        'userTraHisUpdateAction',
        'editUserNameUniqueAction'
      ]),
    hrUpdate () {
      this.personalUpdate()
      this.userDetailUserSendEditedAction(this.rowDataUser)
    },
    personalUpdate () {
      this.userListSendEditedAction(this.rowData)
    },
    editUserName () {
      this.changeUserName = null
      this.editUserNameDialog = true
    },
    editUserNameUnique () {
      this.editUserNameUniqueAction(this.rowDataUser)
    },
    /* 教育背景 */
    addEdu (props) {
      this.eduHisData.userDetailId = props.userDetailId
      this.userEduAddAction(this.eduHisData)
    },
    eduEdit (val) {
      this.eduEditDialog = true
      this.eduHisRowData = Object.assign({}, val)
    },
    sendEduRowData () {
      this.userEduHisUpdateAction(this.eduHisRowData)
    },
    eduTrashEdu (val) {
      this.userEduHisTrashAction(val)
    },
    setHighestEdu (val) {
      this.userListSendEditedAction({
        userDetailId: this.rowData.userDetailId,
        education: val.eduPhase,
        university: val.eduName,
        major: val.eduMajor
      })
      this.currentUserId = this.rowData.userDetailId
    },
    /* 工作经历 */
    addJob (props) {
      this.jobHisData.userDetailId = props.userDetailId
      this.userJobAddAction(this.jobHisData)
    },
    jobEdit (val) {
      this.jobEditDialog = true
      this.jobHisRowData = Object.assign({}, val)
    },
    sendJobRowData (props) {
      this.userJobHisUpdateAction(this.jobHisRowData)
    },
    jobTrashEdu (val) {
      this.userJobHisTrashAction(val)
    },
    /* 培训经历 */
    addTra () {
      this.userTraAddAction(this.traHisData)
    },
    traEdit (val) {
      this.traEditDialog = true
      this.traHisRowData = Object.assign({}, val)
    },
    sendTraRowData () {
      this.userTraHisUpdateAction(this.traHisRowData)
    },
    traTrashEdu (val) {
      this.userTraHisTrashAction(val)
    }
  },
  watch: {
    // state中后端返回数据发生改变
    userDetailInfo (val) {
      this.rowData = JSON.stringify(val)
      this.rowData = Object.assign({}, val)
      this.rowData.sex = String(this.rowData.sex)
      this.rowData.marriage = String(this.rowData.marriage)
      this.rowData.userName = JSON.parse(JSON.stringify(this.tbUserInfo.userName))
    },
    tbUserInfo (val) {
      this.rowDataUser = val
    },
    userDetailDirectPPos (val) {
      this.rowData.parentId = val
    },
    userEduHisInfo () {
      this.eduEditDialog = false
      Object.assign(this.eduHisData, this.$options.data.call(this).eduHisData)
    },
    userJobHisInfo () {
      this.jobEditDialog = false
      Object.assign(this.jobHisData, this.$options.data.call(this).jobHisData)
    },
    userTraHisInfo () {
      this.traEditDialog = false
      Object.assign(this.traHisData, this.$options.data.call(this).traHisData)
    },
    editUserNameUniqueRes (val) {
      if (val === 1) {
        this.changeUserName = '1'
        this.rowData.phone = this.rowDataUser.userName
        this.hrUpdate()
      } else {
        this.changeUserName = '2'
      }
    },
    userDetailUpdateState (val) {
      if (val === 1) {
        this.userListDetailDataAction(this.currentUserId)
      }
    }
  }
}
</script>

<style lang="sass">
  .inputLabel
    width: 75px
    text-align-last: justify
    font-size: 14px
    background-color: #eee
    padding: 6px 6px
</style>
