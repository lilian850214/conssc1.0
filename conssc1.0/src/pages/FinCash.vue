<template>
  <div class="q-ma-sm" >
    <!--成本查询-->
    <q-card class="q-mt-lg q-ma-md bg-grey-1" flat bordered square>
      <q-avatar size="40px" font-size="20px" color="lime-4" text-color="black" icon="fas fa-search" />
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <q-select v-model="queryData.costType"
                      prefix="资金类型" color="green-5"
                      :options="cashTypeOptions"
                      class="q-pa-sm text-subtitle1"
                      clearable
                      dense
                      use-input
                      fill-input
                      hide-selected
                      input-class="q-ml-md"
                      map-options
                      emit-value
            />
            <q-select v-model="queryData.costSubtypeId"
                      prefix="二级分类" color="green-5"
                      :options="cashTypeOptions"
                      class="q-pa-sm text-subtitle1"
                      clearable
                      dense
                      use-input
                      fill-input
                      hide-selected
                      input-class="q-ml-md"
                      map-options
                      emit-value
            />
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input v-model.trim="queryData.costNo"
                     dense
                     prefix="资金单号"
                     color="green-5"
                     clearable
                     class="q-pa-sm text-subtitle1"
                     input-class="q-ml-md"
            />
            <q-input v-model.trim="queryData.remark"
                     prefix="资金明细"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
                     input-class="q-ml-md"
                     clearable dense/>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input v-model="queryData.costTime"
                     type="date" max="2200-12-31"
                     prefix="时间开始"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
                     dense
                     clearable
                     input-class="q-ml-md"
                     error-message="日期格式错误"
                     :error="!this.$v.queryData.costTime.maxLength"/>
            <q-input v-model="queryData.costTime"
                     type="date" max="2200-12-31"
                     prefix="时间结束"
                     color="green-5"
                     class="q-pa-sm text-subtitle1"
                     dense
                     clearable
                     input-class="q-ml-md"
                     error-message="日期格式错误"
                     :error="!this.$v.queryData.costTime.maxLength"/>
          </div>
          <div class="col-xs-12 col-md-3">
            <q-input v-model.trim="queryData.projectId"
                     clearable dense
                     prefix="所属项目"
                     color="green-5"
                     input-class="q-ml-md"
                     class="q-pa-sm text-subtitle1"
            />
            <q-input v-model.trim="queryData.contractId"
                     clearable dense
                     prefix="所属合同"
                     color="green-5"
                     input-class="q-ml-md"
                     class="q-pa-sm text-subtitle1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-10 col-md-12"></div>
          <div class="col-lg-2 col-md-12">
            <q-btn class="q-ma-sm" color="white" text-color="black" label="重 置" size="md" @click="resetData"
            />
            <q-btn class="q-ma-sm text-black" color="lime-4" label="查 询" size="md" @click="onRequest"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!--资金列表-->
    <q-card class="q-mt-lg q-ma-md" square bordered flat>
      <ltitle>资金明细</ltitle>
      <div class="row">
      <span class="q-ma-md text-subtitle1 text-bold">收入总计：100000</span>
      <span class="q-ma-md text-subtitle1 text-bold">支出总计：100000</span>
      <span class="q-ma-md text-subtitle1 text-bold">资金余额：100000</span>
      </div>
      <!-- 合同表格-->
      <q-table
        dense
        bordered
        flat
        :loading="tbLoading"
        :data="dataList"
        :pagination.sync="cashPagination"
        hide-pagination
        separator="cell"
      >
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
            <q-td class="q-ma-xs" style="width:40px">
              <q-icon class="q-pa-xs" color="grey" size="xs" flat name="fas fa-trash-alt" @click="deleteConfirm(props)"></q-icon>
              <q-icon class="q-pa-xs" color="grey" size="xs" flat name="fas fa-edit" @click="edit(props)"></q-icon>
            </q-td>
            <q-td key="costNo" class="text-center" style="width:100px">
              {{ props.row.costNo }}
            </q-td>
            <q-td key="remark">
              {{ props.row.remark }}
            </q-td>
            <q-td key="costNum" class="text-right" >
              {{ props.row.costNum | money }}
            </q-td>
            <q-td key="costSubtypeId" class="text-right" >
              {{ props.row.costSubtypeId}}
            </q-td>
            <q-td key="costTime" class="text-center">
              {{ props.row.costTime}}
            </q-td>
            <q-td key="contractId" class="text-center">
              {{props.row.contractId}}
            </q-td>
            <q-td key="projectId">
              {{ props.row.projectId }}
            </q-td>
            <q-td key="createUserId" class="text-center">
              {{ props.row.createUserId }}
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
          :max="cashPageSize"
          :max-pages="6"
          :boundary-numbers="true"
        />
      </div>
    </div>
    <!--新增合同-->
    <q-drawer
      side="right"
      no-swipe-backdrop
      v-model="addDrawer"
      bordered
      overlay
      :width="500"
      :breakpoint="500"
      content-class=""
    >
      <q-scroll-area class="fit">
        <h5 class="q-pa-sm q-pl-lg text-h6">新增合同</h5>
        <q-card flat class="q-ma-sm">
          <q-input v-model="newData.companyName"
                   prefix="对方名称"
                   input-class="q-ml-md"
                   color="green-5" class="q-pa-sm text-subtitle1"
                   clearable dense
                   error-message="必填"
                   @click="companySelectDialog=true"
                   :error="!this.$v.newData.company.required"
          />
          <q-input v-model="newData.contractTitle"
                   clearable dense
                   prefix="合同标题"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
                   input-class="q-ml-md"
                   error-message="必填"
                   :error="!this.$v.newData.contractTitle.required"
          ></q-input>
          <q-input v-model="newData.dealNum"
                   clearable dense
                   prefix="合同金额"
                   type="number"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
                   input-class="q-ml-md"
                   error-message="必填"
                   :error="!this.$v.newData.dealNum.required && this.$v.newData.dealNum.numeric"
          ></q-input>
          <q-select v-model="newData.type"
                    use-input
                    fill-input
                    hide-selected
                    dense
                    prefix="合同类型"
                    :options="contractTypeOptions"
                    color="green-5"
                    input-class="q-ml-md"
                    class="q-pa-sm text-subtitle1"
                    error-message="必填"
                    :error="!this.$v.newData.type.required"
          />
          <q-input v-model="newData.signTime"
                   type="date" max="2200-12-31"
                   input-class="q-ml-md"
                   prefix="签订时间"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
                   dense
                   clearable
                   error-message="日期格式错误"
                   :error="!this.$v.newData.signTime.maxLength"/>
          <q-input v-model="newData.outsideId"
                   prefix="外部订单"
                   color="green-5"
                   class="q-pa-sm text-subtitle1"
                   input-class="q-ml-md"
                   dense
                   clearable
          />
          <q-select
            use-input
            fill-input
            hide-selected
            dense
            prefix="合同状态"
            :options="contractStateOptions"
            color="green-5"
            input-class="q-ml-md"
            class="q-pa-sm text-subtitle1"
            v-model="newData.status"
            input-debounce="0"
            clearable
            emit-value
            map-options
            popup-content-class="q-pa-none"
            error-message="*必填"
            :error="!this.$v.newData.status.required"
          />
          <q-input v-model="newData.remark" prefix="合同备注" color="green-5"
                   input-class="q-ml-md"
                   class="q-pa-sm text-subtitle1" type="textarea" autogrow dense/>
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
    <!--编辑合同-->
    <q-dialog v-model="editDialog" full-width>
      <q-card class="q-mt-lg q-ma-md" flat bordered square>
        <ltitle>合同号：{{rowData.contractNo}}</ltitle>
        <q-card-section class="q-pa-md q-pl-lg">
          <div class="row">
            <div class="q-pl-sm q-mb-lg col-lg-11 col-sm-12">
              <div class="q-gutter-y-lg">
                <q-btn-toggle
                  v-model="rowData.status"
                  color="white"
                  text-color="grey"
                  toggle-color="purple-6"
                  toggle-text-color="white"
                  push
                  no-caps
                  :error="!this.$v.rowData.status.required"
                  :options="contractStateOptions"
                />
              </div>
            </div>
            <div class="q-pl-sm q-mb-lg col-lg-1 col-sm-12">
              <div class="q-gutter-y-lg">
                <q-btn-toggle
                  v-model="rowData.type"
                  color="white"
                  text-color="grey"
                  toggle-color="purple-6"
                  toggle-text-color="white"
                  push
                  no-caps
                  :options="[
          {label: '收', value: '收'},
          {label: '支', value: '支'}
        ]"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <q-select
              use-input
              fill-input
              hide-selected
              dense
              :options="projectSelectOptions"
              color="green-5"
              input-class="q-ml-md"
              class="q-pa-sm text-subtitle1"
              v-model="rowData.projectId"
              input-debounce="0"
              clearable
              emit-value
              map-options
              popup-content-class="q-pa-sm">
              <template v-slot:before>
                <span class="text-subtitle1 inputLabel text-black">所属项目</span>
              </template>
            </q-select>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-12 col-xs-12">
              <q-input v-model="rowData.contractTitle"
                       dense
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       error-message="必填"
                       :error="!this.$v.rowData.contractTitle.required"
              >
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">合同标题</span>
                </template>
              </q-input>
              <q-input v-model="rowData.companyName"
                       dense
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       error-message="必填"
                       :error="!this.$v.rowData.companyName.required"
              >
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">对方名称</span>
                </template>
              </q-input>
            </div>
            <div class="col-lg-4 col-md-12 col-xs-12">
              <q-input v-model="rowData.signTime"
                       type="date" max="2200-12-31"
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       dense
                       error-message="日期格式错误"
                       :error="!this.$v.rowData.signTime.maxLength">
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">签订日期</span>
                </template>
              </q-input>
              <q-input v-model="rowData.dealNum" color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       type="number"
                       dense>
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">合同金额</span>
                </template>
              </q-input>
            </div>
            <div class="col-lg-4 col-md-12 col-xs-12">
              <q-input v-model="rowData.deliveryTime"
                       type="date" max="2200-12-31"
                       color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       dense
                       error-message="日期格式错误"
                       :error="!this.$v.rowData.deliveryTime.maxLength">
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">交付日期</span>
                </template>
              </q-input>
              <q-input v-model="rowData.invoiceNum" color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       dense>
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">已收发票</span>
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="rowData.statusTrack" color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       dense>
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">追踪提醒</span>
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="rowData.remark" color="green-5"
                       class="q-pa-sm text-subtitle1"
                       input-class="q-ml-md"
                       type="textarea" autogrow dense>
                <template v-slot:before>
                  <span class="text-subtitle1 inputLabel text-black">合同备注</span>
                </template>
              </q-input>
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
    <!--确认删除合同-->
    <q-dialog v-model="deleteConfirmDialog" persistent>
      <q-card>
        <ltitle>删除确认</ltitle>
        <q-card-section class="q-mt-lg">
          <p class="text-red">合同号：{{deleteConfirmData.contractNo }}</p>
          <p class="text-red">合同标题：{{deleteConfirmData.contractTitle }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="删除" color="red" @click="trash(deleteConfirmData.contractAutoId)"/>
          <q-btn flat label="放弃" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--交易方选择-->
    <q-dialog v-model="companySelectDialog" persistent full-width>
      <q-card>
        <ltitle>请选择交易方</ltitle>
        <q-card-section>
          <q-input prefix="模糊查询" dense v-model="reqString"
                   @change="selectCompany(reqString)"
                   input-class="q-ml-lg" color="green"
                   hint="输入完成后回车即可模糊查询">
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-table
            flat
            :data="counterpartySelectList">
            <template v-slot:header>
              <tr >
                <th style="font-weight: bold;font-size: 14px">NO.</th>
                <th class="text-center" style="font-weight: bold;font-size: 14px">选择</th>
                <th class="text-left" style="font-weight: bold;font-size: 14px">公司名称</th>
              </tr>
            </template>
            <template v-slot:body="props">
              <q-tr>
                <q-td class="q-ma-xs text-center" style="width:1px">
                  <strong>{{props.rowIndex+1}}</strong>
                </q-td>
                <q-td class="q-ma-xs" style="width:40px">
                  <q-btn class="q-pa-xs" color="green" size="xs"  icon="fas fa-check"
                         @click="submitCompanyInfo(props.row)">
                    <q-tooltip>点击选择</q-tooltip>
                  </q-btn>
                </q-td>
                <q-td class="q-ma-xs text-left">
                  <span class="block"><strong>{{props.row.companyName}}</strong></span>
                  <span>{{props.row.bankNo}}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md text-green" >
          <q-btn label="退出"  flat size="lg" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--验收合同-->
    <q-dialog v-model="acceptDialog" full-width>
      <q-card  >
        <q-card-section id="acceptContract" class="q-pa-md">
          <div class="q-pa-sm text-center">
            <span class="text-h4">验收报告</span>
            <q-separator />
            <span class="block text-left text-subtitle1">合同编号：{{rowData.contractNo}}</span>
            <span class="block text-left text-subtitle1">合同标题：{{rowData.contractTitle}}</span>
          </div>
          <div class="q-pa-sm text-right"><strong  class="q-mr-lg">验收日期</strong><span class="q-ml-lg">年</span><span class="q-ml-lg">月</span><span class="q-ml-lg">日</span></div>
          <div class="row">
            <div class="col-12 q-pa-sm text-subtitle1  ">
              <strong  class="q-mr-lg">验收内容:</strong>请填写验收内容与附件情况
            </div>
          </div>
          <div class="row" >
            <div class="col-12 q-pa-md text-subtitle1 border-all height-fix ">
              <q-editor v-model="acceptContent" min-height="10rem"
                        flat
                        toolbar-text-color="black"
                        toolbar-toggle-color="green"/>
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pa-md text-subtitle1 border-all "><strong>验 收</strong></div>
            <div class="col-4 q-pa-md text-subtitle1 border-all "><strong>审 核</strong></div>
            <div class="col-4 q-pa-md text-subtitle1 border-all "><strong>批 准</strong></div>
          </div>
          <div  class="row">
            <div class="col-12 q-pa-md text-subtitle1 border-all border-bottom "><strong>付款要求</strong></div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md text-green">
          <q-btn @click="acceptPrint">打印</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--审批合同-->
    <q-dialog v-model="contractSignDialog" full-width>
      <q-card  >
        <q-card-section id="contractSign">
          <div class="q-pa-sm text-center">
            <span class="text-h4">合同审批</span>
          </div>
          <div class="q-pa-sm text-right"><strong  class="q-mr-lg">申请日期</strong><span class="q-ml-lg">年</span><span class="q-ml-lg">月</span><span class="q-ml-lg">日</span></div>
          <div class="row">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">合同编号</div>
            <div class="print-width-3 border-right border-top q-pa-sm col-4 text-center">{{rowData.contractNo}}</div>
            <div class="print-width-2 border-right border-top bg-grey-3 q-pa-sm col-2 text-center">合同标题</div>
            <div class="print-width-5 border-right border-top q-pa-sm col-4">{{rowData.contractTitle}}</div>
          </div>
          <div class="row">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">合同金额</div>
            <div class="print-width-3 border-right border-top q-pa-sm col-4 text-center">￥ {{rowData.dealNum}}</div>
            <div class="print-width-2 border-right border-top bg-grey-3 q-pa-sm col-2 text-center">所属项目</div>
            <div class="print-width-5 border-right border-top q-pa-sm col-4">{{rowData.projectName}}</div>
          </div>
          <div class="row">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">合同经办</div>
            <div class="print-width-3 border-right border-top q-pa-sm col-4 text-center"></div>
            <div class="print-width-2 border-right border-top bg-grey-3 q-pa-sm col-2 text-center">对方名称</div>
            <div class="print-width-5 border-right border-top q-pa-sm col-4">{{rowData.companyName}}</div>
          </div>
          <div class="row">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center height-fix-md ">合同备注</div>
            <div class="print-width-10 border-right border-top q-pa-sm col-10 text-center">{{rowData.remark}}</div>
          </div>
          <div class="row">
            <div class="print-width-12 border-right border-top border-left bg-grey-3 q-pa-sm col-12 text-center">以下审批记录</div>
          </div>
          <div class="row height-fix-md">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">部门意见</div>
            <div class="print-width-10 border-right border-top q-pa-sm col-10 text-center"></div>
          </div>
          <div class="row height-fix-md">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">项目意见</div>
            <div class="print-width-10 border-right border-top q-pa-sm col-10 text-center"></div>
          </div>
          <div class="row height-fix-md">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">财务意见</div>
            <div class="print-width-10 border-right border-top q-pa-sm col-10 text-center"></div>
          </div>
          <div class="row height-fix-md">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">运营意见</div>
            <div class="print-width-10 border-right border-top q-pa-sm col-10 text-center"></div>
          </div>
          <div class="row height-fix-md">
            <div class="print-width-2 border-right border-top border-left bg-grey-3 q-pa-sm col-2 text-center">法务意见</div>
            <div class="print-width-10 border-right border-top q-pa-sm col-10 text-center"></div>
          </div>
          <div class="row height-fix-md">
            <div class="print-width-2 border-right border-top border-left border-bottom bg-grey-3 q-pa-sm col-2 text-center">总经理批准</div>
            <div class="print-width-10 border-right border-top border-bottom q-pa-sm col-10 text-center"></div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md text-green">
          <q-btn @click="contractSignPrint">打印</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--金额明细-->
    <q-dialog v-model="costDetailDialog" full-width>
      <q-card  >
        <q-card-section>
          <div class="q-pa-md text-center">
            <span class="text-h4">已付款明细</span>
          </div>
          <q-markup-table flat dense bordered :separator="'horizontal'" class="q-mb-lg">
            <thead>
            <tr>
              <th class="text-left bg-grey-3">NO.</th>
              <th class="text-left bg-grey-3">付款单号</th>
              <th class="text-left bg-grey-3">付款金额</th>
              <th class="text-left bg-grey-3">付款内容</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in costDetailList" :key="index" >
              <td>{{index+1}}</td>
              <td>{{item.costNo}}</td>
              <td>{{item.costNum}}</td>
              <td>{{item.remark}}</td>
            </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { maxLength, required, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapState } from 'vuex'
import NumPerPage from '../components/numPerPage'
import '../util/filter'
import { rowsPerPage, addDrawer, tips, editDialog, crud } from '../components/mixin/baseMixin'
import printJS from 'print-js'
import { printCss } from '../css/print'
import { mentionDate } from '../util/dataTimeHandler'
export default {
  name: 'FinCash',
  components: { NumPerPage },
  mixins: [rowsPerPage, addDrawer, tips, editDialog, crud],
  data () {
    return {
      value: 50,
      editDialog: false,
      acceptDialog: false,
      contractSignDialog: false,
      deleteConfirmDialog: false,
      companySelectDialog: false,
      invoiceDialog: false,
      costDetailDialog: false,
      acceptContent: null,
      thName: [
        'NO.',
        '操作',
        '资金单号',
        '明细',
        '金额',
        '分类',
        '时间',
        '所属合同',
        '所属项目',
        '申请人'
      ],
      reqString: null,
      cashTypeOptions: [
        {
          label: '收入',
          value: 0
        },
        {
          label: '支出',
          value: 1
        }
      ],
      contractTypeOptions: ['收', '支'],
      projectSelectOptions: [],
      rowData: {
        costId: null,
        costNo: null,
        costType: null,
        costClass: null,
        costSubtypeId: null,
        costNum: null,
        depId: null,
        status: null,
        remark: null,
        costTime: null,
        createUserId: null,
        createTime: null,
        submitPostId: null,
        auditUser: null,
        contractId: null,
        projectId: null,
        travelId: null,
        budgetId: null,
        companyId: null,
        costPType: null,
        lastAuditUser: null
      },
      newData: {
        costId: null,
        costNo: null,
        costType: null,
        costClass: null,
        costSubtypeId: null,
        costNum: null,
        depId: null,
        status: null,
        remark: null,
        costTime: null,
        createUserId: null,
        createTime: null,
        submitPostId: null,
        auditUser: null,
        contractId: null,
        projectId: null,
        travelId: null,
        budgetId: null,
        companyId: null,
        costPType: null,
        lastAuditUser: null
      },
      queryData: {
        costId: null,
        costNo: null,
        costType: null,
        costClass: null,
        costSubtypeId: null,
        costNum: null,
        depId: null,
        status: null,
        remark: null,
        costTime: null,
        createUserId: null,
        createTime: null,
        submitPostId: null,
        auditUser: null,
        contractId: null,
        projectId: null,
        travelId: null,
        budgetId: null,
        companyId: null,
        costPType: null,
        lastAuditUser: null
      },
      deleteConfirmData: {
        contractAutoId: null,
        contractNo: null,
        contractTitle: null
      }
    }
  },
  mounted () {
    if (this.dataList.length === 0) {
      this.tbLoading = true
    }
    /* 挂载后获取初始分页信息 */
    this.onRequest()
    this.projectForSelectAction()
  },
  validations: {
    newData: {
      type: { required },
      contractTitle: { required },
      signTime: { maxLength: maxLength(10) },
      status: { required },
      company: { required },
      dealNum: { required, numeric }
    },
    rowData: {
      contractNo: { required },
      type: { required },
      contractTitle: { required },
      companyName: { required },
      signTime: { maxLength: maxLength(10) },
      status: { required },
      deliveryTime: { maxLength: maxLength(10) }
    },
    queryData: {
      costTime: { maxLength: maxLength(10) }
    }
  },
  computed: {
    ...mapState('Fin',
      [
        'dataList',
        'cashSendEditedRes',
        'cashAddNewRes',
        'cashTrashRes',
        'cashPageSize'
      ]),
    ...mapState('Contract',
      [
        'counterpartySelectList'
      ]),
    ...mapState('Project',
      [
        'projectForSelect'
      ]),
    cashPagination: {
      get () {
        return this.$store.state.Fin.contractPagination
      },
      set () {
      }
    }
  },
  methods: {
    /* 不能放在计算属性中，会造成循环计算 */
    ...mapMutations('Fin',
      [
        'contractModuleDataMutation',
        'contractAddNewMutation',
        'contractSendEditedMutation',
        'setCurrentPageMutation',
        'setRowsPerPageMutation'
      ]),
    ...mapActions('Fin',
      [
        'cashModuleDataAction',
        'cashModuleDataWithoutQueryAction',
        'cashSendEditedAction',
        'cashNewDateAction',
        'contractTrashDataAction'
      ]),
    ...mapActions('Project',
      [
        'projectForSelectAction'
      ]),
    /* 获取待查询的数据 */
    onRequest () {
      this.cashModuleDataAction({
        pagination: this.cashPagination,
        queryData: this.queryData
      })
    },
    /* 新增数据 */
    // 选择交易方
    selectCompany (val) {
      this.counterpartySelectAction({ reqString: this.reqString })
    },
    submitCompanyInfo (val) {
      this.newData.company = val.id
      this.newData.companyName = val.companyName
      this.companySelectDialog = false
    },
    addNewData () {
      if (this.$v.newData.$invalid === false) {
        this.contractAddNewMutation(99)
        // 初始化新增状态
        this.addloading = true
        this.initTip()
        this.contractNewDateAction(this.newData)
        this.onRequest()
      }
    },
    /* 删除数据 */
    trash (id) {
      this.contractTrashDataAction({ autoId: id })
      this.onRequest()
    },
    /* 修改数据 */
    sendEditedData () {
      if (this.$v.rowData.$invalid === false) {
        this.contractSendEditedMutation(99)
        // 点击保存后显示运行图标
        this.loading = true
        this.initTip()
        this.contractSendEditedAction(this.rowData)
      }
    },
    deleteConfirm (props) {
      this.deleteConfirmDialog = true
      this.deleteConfirmData = props.row
    },
    doAccept (props) {
      this.acceptDialog = true
      this.rowData = Object.assign({}, props.row)
    },
    acceptPrint () {
      printJS({
        printable: 'acceptContract',
        type: 'html',
        style: printCss,
        scanStyles: false,
        ignoreElements: ['no-print']
      })
    },
    doContractSign (props) {
      this.contractSignDialog = true
      this.rowData = Object.assign({}, props.row)
    },
    contractSignPrint () {
      printJS({
        printable: 'contractSign',
        type: 'html',
        style: printCss,
        scanStyles: false
      })
    },
    getRowData (props) {
      this.rowData = Object.assign({}, props.row)
    },
    mentionDate (val) {
      return mentionDate(val)
    },
    // 显示已付明细
    showCostDetail (props) {
      this.detailForContractAction({ contractId: props.row.contractNo })
      this.costDetailDialog = true
    }
  },
  watch: {
    // 监控修改后返回状态
    cashSendEditedRes (val) {
      if (val !== 99) {
        this.loading = false
        this.updateTip(val)
        this.btnDisable = true
        this.onRequest()
        setTimeout(this.editDialog = false, 1000)
      }
    },
    // 监控新增后返回状态
    cashAddNewRes (val) {
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
          this.onRequest()
        }
      }
    },
    cashTrashRes (val) {
      if (val === 1) {
        this.deleteConfirmDialog = false
        this.onRequest()
      }
    },
    // 监控项目类别为选择器使用
    projectForSelect () {
      this.projectSelectOptions = this.projectForSelect
    }
  }
}
</script>

<style scoped lang="sass">
</style>
