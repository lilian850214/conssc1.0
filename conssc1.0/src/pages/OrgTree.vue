<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-3 col-xs-12 col-lg-3">
        <q-card borderless square>
          <q-card-section class="q-pa-none bg-grey-4">
            <q-icon class="bg-grey-8 q-pa-sm" name="fas fa-sitemap" color="green-4" size="25px"></q-icon>
            <span class="text-bold text-h6 absolute-center">组织架构</span>
          </q-card-section>
          <q-card-section align="left" class="q-pb-none">
            <q-btn color="green-8" size="md" outline @click="addNonePidDep" style="width: 120px">新增一级部门</q-btn>
          </q-card-section>
          <q-card-section>
              <q-tree
                :nodes="orgChartData"
                node-key="roleId"
                label-key="orgName"
                selected-color="green"
                :selected.sync="selected"
                :expanded.sync="treeExpanded"
              >
                <template v-slot:default-header="prop">
                  <div class="text-subtitle2">
                    <q-icon :name="prop.node.deptFlag==='1'?'fas fa-cube':'fas fa-address-card'"
                            :color="prop.node.deptFlag==='1'?'grey-8':'green-4'"
                            size="22px" class="q-mr-sm q-ml-sm" style="margin-top: -3px"/>
                    <span :class="prop.node.roleId===selected?'bg-grey-3 text-h6 q-pa-sm text-bold':''">{{ prop.node.orgName }}</span>
                  </div>
                </template>
              </q-tree>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-9 col-xs-12 col-lg-9">
        <q-card flat square class="q-ml-md">
          <q-tabs v-model="orgInfoTab"
                  dense
                  align="left"
                  class="text-black "
                  active-bg-color="black"
                  active-color="white"
          >
            <q-tab
              name="deptDescription"
              content-class="text-subtitle1"
            >所属部门概况
            </q-tab>
            <q-tab
              name="posDescription"
              content-class="text-subtitle1"
              v-show="posDescriptionShow"
            >岗位描述
            </q-tab>
            <q-tab
              name="orgPermissions"
              content-class="text-subtitle1"
            >权限设置
            </q-tab>
          </q-tabs>
          <q-tab-panels
            v-model="orgInfoTab"
            animated
            transition-prev="scale"
            transition-next="scale"
          >
            <q-tab-panel name="deptDescription" class="q-pa-none">
              <div class="row q-mt-lg">
                <q-card class="col-md-4 col-xs-12" flat bordered square>
                  <q-card-section class="q-pa-none bg-pink-1">
                    <q-icon class="bg-pink-3 q-pa-sm" name="fas fa-star" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">部门名称</span>
                  </q-card-section>
                  <q-card-section>
                    <h4 class="text-center q-mb-sm">
                      <strong>{{parentNode.orgName}}</strong>
                    </h4>
                  </q-card-section>
                  <q-card-section class="text-center">
                    <q-btn flat label="修改名称" color="blue" class="text-subtitle1 text-bold" @click="editDeptName()">
                    </q-btn>
                    <q-btn flat label="新增下级"  color="purple" class="text-subtitle1 text-bold" @click="showAddNewNodeDialog('1')">
                      <q-tooltip>新增子部门或下级岗位</q-tooltip>
                    </q-btn>
                    <q-btn flat label="删除部门" color="red" class="text-subtitle1 text-bold" @click="trashNode(parentNode.roleId)"/>
                  </q-card-section>
                </q-card>
                <q-card class="col-md-4 col-xs-12" flat bordered square>
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-pink-3 q-pa-sm" name="fas fa-arrow-up" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">上级部门</span>
                  </q-card-section>
                  <q-card-section>
                    <h4 class="text-center q-mb-sm">
                      <strong :class="parentNode.pid==='0'?'text-grey':''">{{parentNode.pid | actualOrgName(orgList)}}</strong>
                    </h4>
                  </q-card-section>
                  <q-card-section class="text-center">
                    <q-btn flat label="修改上级" color="blue" class="text-subtitle1 text-bold" @click="editDeptNode(parentNode)"/>
                  </q-card-section>
                </q-card>
                <q-card class="col-md-4 col-xs-12" flat bordered square>
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-pink-3 q-pa-sm" name="fas fa-arrow-down" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">直接下级</span>
                  </q-card-section>
                  <q-card-section class="text-left">
                    <q-chip square v-for="item in deptSubParentRoles" :key="item.orgName" size="md" class="q-ma-xs"
                            color="grey-4">
                      <q-avatar color="black" text-color="blue-3">
                        <q-icon :name="item.deptFlag==='1'?'fas fa-folder':'fas fa-address-card'"></q-icon>
                      </q-avatar>
                      <strong>{{item.orgName}}</strong>
                    </q-chip>
                  </q-card-section>
                </q-card>
                <q-card class="col-12 q-mt-lg" flat bordered square>
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-pink-3 q-pa-sm" name="fas fa-book-reader" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">部门JD</span>
                    <span class="text-underline q-ml-lg text-subtitle2" @click="editDeptJd(parentNode.roleJd)">修改</span>
                  </q-card-section>
                <q-card-section >
                  <div class="q-pa-md">
                    <div v-html="parentNode.roleJd">
                    </div>
                  </div>
                </q-card-section>
                </q-card>
                <q-card class="col-12 q-mt-lg" flat bordered square>
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-pink-3 q-pa-sm" name="fas fa-book-reader" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">所属员工列表</span>
                  </q-card-section>
                  <q-card-section class="text-center q-pa-none">
                    <q-table
                      dense
                      :pagination="initialPagination"
                      borderless
                      flat
                      :data="allDeptUser"
                    >
                      <template v-slot:header>
                        <q-tr class="" >
                          <q-th class="text-center" style="font-weight: bold;font-size: 16px" v-for="(item,index) in thName" :key="index">
                            {{item}}</q-th>
                        </q-tr>
                      </template>
                      <template v-slot:body="props">
                        <tr>
                        <q-td class="q-ma-xs text-center" style="width:1px">
                          <strong>{{props.rowIndex+1}}</strong>
                        </q-td>
                        <q-td class="q-ma-xs text-center">
                          <strong>{{props.row.realName}}</strong>
                        </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.posId | actualOrgName(orgList)}}
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.phone}}
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.workStatus}}
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.entryDate}}
                          </q-td>
                        </tr>
                      </template>
                    </q-table>
                  </q-card-section>
                </q-card>
              </div>
            </q-tab-panel>
            <q-tab-panel name="posDescription" class="q-pa-none " v-show="posDescriptionShow">
              <div class="row q-mt-lg">
              <q-card class="col-md-4 col-xs-12" flat bordered square>
                <q-card-section class="q-pa-none bg-blue-1">
                  <q-icon class="bg-blue-3 q-pa-sm" name="fas fa-star" size="25px"></q-icon>
                  <span class="text-bold text-h6 absolute-center">岗位名称</span>
                </q-card-section>
                <q-card-section>
                  <h6 class="text-center q-ma-md">
                    <strong>{{selectedNodeDetail.orgName}}</strong>
                  </h6>
                </q-card-section>
                <q-card-section class="text-center">
                  <q-btn flat label="修改名称"  color="green" @click="editPosName(selectedNodeDetail)"/>
                  <q-btn flat label="新增下属"  color="purple" @click="showAddNewNodeDialog('0')"/>
                  <q-btn flat label="删除岗位" color="red" @click="trashNode(selectedNodeDetail.roleId)"/>
                </q-card-section>
              </q-card>
                <q-card class="col-md-4 col-xs-12" flat bordered square>
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-blue-3 q-pa-sm" name="fas fa-arrow-up" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">直接上级</span>
                  </q-card-section>
                  <q-card-section>
                    <h6 class="text-center q-ma-md">
                      <strong>{{selectedNodeDetail.pid |actualOrgName(orgList) }}</strong>
                    </h6>
                  </q-card-section>
                  <q-card-section class="text-center">
                    <span class="text-underline q-ml-lg text-subtitle2 text-green">修改
                      <q-popup-proxy buttons anchor="top left" >
                        <SetRole ref="getPosSelected" @getPid="changePId()"></SetRole>
                      </q-popup-proxy>
                    </span>
                  </q-card-section>
                </q-card>
                <q-card class="col-md-4 col-xs-12" flat bordered square>
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-blue-3 q-pa-sm" name="fas fa-arrow-down" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">下属岗位</span>
                  </q-card-section>
                  <q-card-section class="text-left">
                    <q-chip square v-for="item in deptSubParentRoles" :key="item.orgName" size="md" class="q-ma-sm"
                            color="grey-4">
                      <q-avatar color="blue-4" text-color="black">
                        <q-icon :name="item.deptFlag==='1'?'fas fa-folder':'fas fa-address-card'"></q-icon>
                      </q-avatar>
                      <strong>{{item.orgName}}</strong>
                    </q-chip>
                  </q-card-section>
                </q-card>
              </div>
              <div class="row q-mt-none">
                <q-card class="col-12 q-mt-lg" flat bordered square >
                  <q-card-section class="q-pa-none bg-grey-2
">
                    <q-icon class="bg-blue-3 q-pa-sm" name="fas fa-book-reader" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">岗位JD</span>
                    <span class="text-underline q-ml-lg text-subtitle2" @click="editPosJd(selectedNodeDetail.roleJd)">修改</span>
                  </q-card-section>
                  <q-card-section>
                    <div class="q-pa-md">
                      <div v-html="selectedNodeDetail.roleJd">
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card class="col-12 q-mt-lg" flat bordered square >
                  <q-card-section class="q-pa-none bg-grey-3">
                    <q-icon class="bg-blue-3 q-pa-sm" name="fas fa-book-reader" size="25px"></q-icon>
                    <span class="text-bold text-h6 absolute-center">
                      <q-icon name="fas fa-chevron-left"/>
                      {{selectedNodeDetail.orgName}}
                      <q-icon name="fas fa-chevron-right"/>
                      任职列表</span>
                  </q-card-section>
                  <q-card-section class="text-center q-pa-none">
                    <q-table
                      dense
                      :pagination="initialPagination"
                      borderless
                      flat
                      :data="allPosUser"
                    >
                      <template v-slot:header>
                        <q-tr class="" >
                          <q-th class="text-center" style="font-weight: bold;font-size: 16px" v-for="(item,index) in thName" :key="index">
                            {{item}}</q-th>
                        </q-tr>
                      </template>
                      <template v-slot:body="props">
                        <tr>
                          <q-td class="q-ma-xs text-center" style="width:1px">
                            <strong>{{props.rowIndex+1}}</strong>
                          </q-td>
                          <q-td class="q-ma-xs text-center">
                            <strong>{{props.row.realName}}</strong>
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.posId | actualOrgName(orgList)}}
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.phone}}
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.workStatus}}
                          </q-td>
                          <q-td class="q-ma-xs text-center" >
                            {{props.row.entryDate}}
                          </q-td>
                        </tr>
                      </template>
                    </q-table>
                  </q-card-section>
                </q-card>
              </div>
            </q-tab-panel>
            <q-tab-panel name="permissionsDescription">
              <q-card flat borderless class="q-mt-lg">456</q-card>
            </q-tab-panel>
            <q-tab-panel name="orgPermissions">
              <q-card flat borderless class="q-mt-lg">789</q-card>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <!--      <permission-set></permission-set>-->
    </div>
    <!--编辑岗位-->
    <q-dialog v-model="posEditDialog">
      <q-card>
        <q-card-section class="q-pa-none bg-black">
          <q-icon class="bg-lime-4 q-pa-sm" name="fas fa-list" size="25px"></q-icon>
          <span class="text-bold text-h6 text-lime-4 absolute-center">{{selectedNodeDetail.orgName}}</span>
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-pa-md text-subtitle1"
            prefix="岗位名称"
            input-class="q-ml-md"
            color="purple"
            v-model="posNameEditedAfter"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="green" label="保存" @click="sendPoseEdit()"/>
          <q-btn v-close-popup flat color="green" label="退出"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="posJdDialog" full-width>
      <q-card>
        <q-card-section class="q-pa-none bg-black">
          <q-icon class="bg-lime-4 q-pa-sm" name="fas fa-list" size="25px"></q-icon>
          <span class="text-bold text-h6 text-lime-4 absolute-center">岗位描述：<span class="text-red">{{selectedNodeDetail.orgName}}</span></span>
        </q-card-section>
        <q-card-section>
          <q-editor
            v-model="posJd"
            :dense="$q.screen.lt.md"
            :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['hr', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
            ]
          },
          {
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
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
      ]"
            :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="green" label="保存" @click="sendPosEditJd()"/>
          <q-btn v-close-popup flat color="green" label="退出"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--编辑部门-->
    <q-dialog v-model="deptEditDialog">
      <q-card>
        <q-card-section class="q-pa-none bg-black">
          <q-icon class="bg-lime-4 q-pa-sm" name="fas fa-list" size="25px"></q-icon>
          <span class="text-bold text-h6 text-lime-4 text-center q-mt-lg">{{parentNode.orgName}}</span>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="deptParent"
            :options="deptParentOptions"
            option-label="orgName"
            option-value="roleId"
            prefix="上级部门"
            bottom-slots
            clearable
            dense
            emit-value
            map-options
            options-dense
            use-input
            fill-input
            hide-selected
            color="green-5"
            class="q-pa-md text-subtitle1"
            input-class="q-ml-md"
            :error="this.$v.deptParent.notSelf"
            error-message="不能选自己作为直接上级"
          >
            <template v-slot:hint>
              <span class="text-subtitle2 text-purple">当前若为空，即为整个组织的第一层级部门或岗位</span>
            </template>
          </q-select>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="green" label="保存" @click="sendDeptEdit()"/>
          <q-btn v-close-popup flat color="green" label="退出"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deptEditNameDialog" persistent>
      <q-card >
        <q-card-section class="q-pa-none bg-black">
          <q-icon class="bg-lime-4 q-pa-sm" name="fas fa-edit" size="25px"></q-icon>
          <span class="text-bold text-h6 text-lime-4 absolute-center">修改部门名</span>
        </q-card-section>
        <q-card-section>
          <div class="q-mt-md">
          <span><span class="text-bold text-red">原</span>部门名称：</span>
          <span class="text-h6 text-bold">{{parentNode.orgName}}</span>
          </div>
          <div class="q-mt-md">
          <span><span class="text-bold text-red">现</span>部门名称：</span>
          <span class="text-h6 text-bold">
            <q-input color="purple" class="inline-block" input-class="text-h6 text-bold" v-model="deptNameAfterEdit"/>
          </span>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="green" label="保存" @click="sendDeptNameEdit()"/>
          <q-btn v-close-popup flat color="green" label="退出"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deptJdDialog" >
      <q-card>
        <q-card-section class="q-pa-none bg-black">
          <q-icon class="bg-lime-4 q-pa-sm" name="fas fa-list" size="25px"></q-icon>
          <span class="text-bold text-h6 text-lime-4 absolute-center">部门职能描述：<span class="text-red">{{parentNode.orgName}}</span></span>
        </q-card-section>
        <q-card-section>
          <q-editor
            v-model="deptJd"
            :dense="$q.screen.lt.md"
            :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['hr', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
            ]
          },
          {
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
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['unordered', 'ordered', 'outdent', 'indent'],
        ['undo', 'redo'],
      ]"
            :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
          />
        </q-card-section>
        <q-card-actions align="right">
          <tips></tips>
          <q-btn flat color="green" label="保存" @click="sendDeptEditJd()"/>
          <q-btn v-close-popup flat color="green" label="退出"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--架构新增dialog-->
     <!-- 新增一级部门-->
    <q-dialog v-model="addNonePidDepDialog" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card>
        <q-card-section class="q-pa-none bg-black text-center">
          <div class="text-h6 text-bold q-pa-sm text-lime-4">新增一级部门</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newData.orgName"
                   class="q-mt-sm text-subtitle1"
                   input-class="q-ml-md"
                   color="purple-5"
                   style="vertical-align: bottom"
          error-message="请输入部门名称！"
                   :error="!this.$v.newData.orgName.required"
          >
            <template v-slot:before>
              <span class="text-subtitle1 inputLabel text-black">部门名称</span>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="float-right">
          <q-btn flat color="purple-4" class="text-white" label="保存" @click="addNewNode()"/>
          <q-btn flat label="退出" v-close-popup>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 新增一级部门下任意子节点-->
    <q-dialog v-model="addNewNodeDialog" persistent >
      <q-card>
        <q-card-section class="q-pa-none bg-black">
          <q-icon class="bg-lime-4 q-pa-sm" name="fas fa-plus" size="25px"></q-icon>
          <span class="text-bold text-h6 text-lime-4 absolute-center">所属部门：{{parentNode.orgName}}</span>
        </q-card-section>
        <q-card-section>
            <q-stepper
              v-model="addNewNodeStep"
              ref="stepper"
              done-color="black"
              active-color="red-10"
              inactive-color="grey"
              header-class="text-bold"
              flat
              animated
            >
              <q-step
                :name="1"
                title="请选择下属类型"
                icon="settings"
                color="purple"
                class="text-center"
                :done="addNewNodeStep > 1"
              >
                <q-radio class="q-ml-lg text-h6" dense v-model="newData.deptFlag" val='1' label="新增子部门" color="purple" />
                <q-radio class="q-ml-lg text-h6" dense v-model="newData.deptFlag" val='0' label="新增子岗位" color="purple"/>
              </q-step>

              <q-step
                :name="2"
                title="请输入名称"
                icon="fas fa-file-signature"
                :done="addNewNodeStep > 2"
              >
                <q-input
                  v-model="newData.orgName"
                  color="purple"
                  input-class="q-ml-lg"
                  clearable
                  class="q-ma-lg text-center"
                  error-message="请输入名称"
                  :error="!this.$v.newData.orgName.required"
                />
              </q-step>

              <q-step
                :name="3"
                title="确认新增"
                icon="assignment"
                class="text-center"
              >
                <h6>确认名称：{{this.newData.orgName}}</h6>
              </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation class="q-mt-lg">
                  <q-btn v-if="addNewNodeStep < 3" @click="$refs.stepper.next()" color="purple" label="下一步" />
                  <q-btn v-if="addNewNodeStep < 4 && addNewNodeStep > 2" @click="addNewNode()" color="purple" label="保存" />
                  <q-btn v-if="addNewNodeStep > 1" flat color="purple" @click="$refs.stepper.previous()" label="后退" class="q-ml-sm" />
                  <q-btn v-close-popup flat color="black" class="q-ml-md"  label="退出"/>
                </q-stepper-navigation>
              </template>
            </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 删除非空节点警告-->
    <q-dialog v-model="trashNodeAlertDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-red text-bold">警告</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-subtitle1">
         请先移除所有下级岗位或部门，再进行删除!!!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="green" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { mapActions, mapState, mapMutations } from 'vuex'
import '../util/filter'
import { notSelf } from '../util/myValidate'
import { required } from 'vuelidate/lib/validators'
import { isNothing, tips } from '../components/mixin/baseMixin'
import SetRole from '../components/setRole'

export default {
  name: 'OrgTree',
  components: { SetRole },
  mixins: [isNothing, tips],
  data () {
    return {
      addNewNodeStep: 1,
      /* 关于树的选择和展开操作 */
      selected: '',
      treeExpanded: [],
      /* 编辑岗位信息 */
      deptSubParentRoles: [],
      posEditDialog: false,
      posNameEditedAfter: '',
      posBelongsToDeptOptions: [],
      posBelongsToDept: null,
      posParent: '111',
      posParentOptions: [],
      posJdDialog: false,
      posJd: '',
      /* 编辑部门信息 */
      deptEditDialog: false,
      deptEditNameDialog: false,
      deptNameAfterEdit: '',
      deptParent: '',
      deptParentOptions: [],
      deptJdDialog: false,
      deptJd: '',
      /* tab面板的显示 */
      orgInfoTab: 'posDescription',
      posDescriptionShow: false,
      /* 增加节点 */
      addNewNodeLoading: false,
      addNonePidDepDialog: false,
      addNewNodeDialog: false,
      addNewNodeDeptFlagOption: [
        { label: '新增部门', value: '1' },
        { label: '新增岗位', value: '0' }
      ],
      /* 删除节点节点 */
      trashNodeAlertDialog: false,
      newData: {
        orgName: null,
        pId: null,
        deptFlag: '1'
      },
      editData: {
        roleId: null,
        orgName: null,
        pId: null,
        deptFlag: null
      },
      /* 部门下岗位roleId ，用于向后台查询员工列表 */
      posActRealNameList: [],
      thName: ['NO.', '姓名', '岗位', '联系方式', '状态', '入职时间'],
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 0
      }
    }
  },
  validations: {
    posParent: { notSelf: (val, vm) => notSelf(val, vm.selectedNodeDetail.roleId), required },
    deptParent: { notSelf: (val, vm) => notSelf(val, vm.parentNode.roleId) },
    newData: {
      orgName: { required }
    }
  },
  computed: {
    ...mapState('OrgChart',
      [
        'orgChartData',
        'selectedNodeDetail',
        'subSelectedNode',
        'parentNode',
        'activeTab',
        'addNewNodeRes',
        'trashNodeRes',
        'updateNodeRes',
        'allDeptUser',
        'allPosUser'
      ]
    ),
    ...mapState('PubRes',
      [
        'orgList'
      ]
    )
  },
  mounted () {
    this.onRequest()
    this.initTreeSelected()
  },
  methods: {
    ...mapActions('OrgChart',
      [
        'queryDeptDataAction',
        'treeDataAction',
        'orgTreeNewDataAction',
        'addNewNodeAction',
        'orgNodeDetailAction',
        'trashNodeAction',
        'updateNodeAction',
        'allDeptUserAction',
        'allPosUserAction'
      ]),
    ...mapActions('PubRes',
      [
        'orgListDataWithoutTreeAction'
      ]),
    ...mapMutations('OrgChart', [
      'editDeptJdMutation',
      'editPosJdMutation',
      'allDeptUserMutation',
      'allPosUserMutation'
    ]),
    /* 架构树和角色列表 */
    onRequest () {
      // 产生组织架构树
      this.treeDataAction()
      this.orgListDataWithoutTreeAction()
    },
    /* 刷新或进入页面后初始化选择第一个节点 */
    initTreeSelected () {
      var res = this.orgList.filter(item => item.pId === '0')
      if (res.length > 0) {
        // 选择第一个节点
        this.selected = res[0].roleId
        this.orgInfoTab = 'deptDescription'
      }
    },
    /* 初始化准备向后台发送的新数据 */
    initNewData () {
      this.newData = this.$options.data.call(this).newData
    },
    initEditData () {
      this.editData = this.$options.data.call(this).editData
    },
    /* 共用方法 */
    getSub (val) {
      return this.orgList.filter(item => item.pId === val)
    },
    // 显示当前选择节点直属岗位
    /*
    * 新增一级部门节点
    * */
    addNonePidDep () {
      this.initNewData()
      this.newData.deptFlag = 1
      this.newData.pId = 0
      this.addNonePidDepDialog = true
    },
    showAddNewNodeDialog (val) {
      this.initNewData()
      this.addNewNodeStep = 1
      if (val === '1') {
        this.newData.pId = this.parentNode.roleId
      } else {
        this.newData.pId = this.selectedNodeDetail.roleId
      }
      this.addNewNodeDialog = true
      this.newData.deptFlag = val
    },
    addNewNode () {
      if (this.$v.newData.$invalid === false) {
        this.addNewNodeLoading = true
        if (this.newData.pId === 0) {
          this.orgTreeNewDataAction(this.newData)
        } else {
          this.addNewNodeAction(this.newData)
        }
      }
    },
    /*
    * 删除节点
    * */
    trashNode (val) {
      var res = this.orgList.filter(item => item.pId === val)
      // 没有下属的才可删除
      if (res.length === 0) {
        this.trashNodeAction(val)
      } else {
        this.trashNodeAlertDialog = true
      }
    },
    /*
    * 修改JD内容
    * */
    editDeptJd (deptJd) {
      if (deptJd === undefined) {
        this.deptJd = ''
      } else {
        this.deptJd = deptJd
      }
      this.deptJdDialog = true
    },
    editPosJd (posJd) {
      if (posJd === undefined) {
        this.posJd = ''
      } else {
        this.posJd = posJd
      }
      this.posJdDialog = true
    },
    sendDeptEditJd () {
      this.editDeptJdMutation(this.deptJd)
      this.updateNodeAction(this.parentNode)
    },
    sendPosEditJd () {
      this.editPosJdMutation(this.posJd)
      this.updateNodeAction(this.selectedNodeDetail)
    },
    /*
    * 编辑部门信息
    * */
    editDeptName () {
      this.initEditData()
      this.deptNameAfterEdit = this.parentNode.orgName
      this.deptEditNameDialog = true
    },
    sendDeptNameEdit () {
      this.editData.roleId = this.selected
      this.editData.orgName = this.deptNameAfterEdit
      this.editData.pId = this.parentNode.pId
      this.editData.deptFlag = '1'
      this.updateNodeAction(this.editData)
    },
    editDeptNode (selectedNode) {
      this.deptParent = selectedNode.pid
      if (this.deptParent === '0') { this.deptParent = '' }
      this.deptEditDialog = true
      // 所属部门options
      Object.assign(this.deptParentOptions, this.orgList.filter(item => item.deptFlag === '1'))
    },
    sendDeptEdit () {
      this.initEditData()
      Object.assign(this.editData, this.parentNode)
      if (this.deptParent === null) { this.editData.pId = '0' } else { this.editData.pId = this.deptParent }
      this.updateNodeAction(this.editData)
    },
    /*
    * 点击修改岗位，编辑岗位信息
    * */
    changePId () {
      this.initEditData()
      this.editData.roleId = this.selectedNodeDetail.roleId
      this.editData.pId = this.$refs.getPosSelected.posSelected
      this.editData.orgName = this.selectedNodeDetail.orgName
      this.updateNodeAction(this.editData)
    },
    editPosName (selectedNode) {
      this.posNameEditedAfter = selectedNode.orgName
      this.posEditDialog = true
    },
    sendPoseEdit () {
      this.initEditData()
      this.editData.roleId = this.selectedNodeDetail.roleId
      this.editData.orgName = this.posNameEditedAfter
      this.updateNodeAction(this.editData)
    },
    initPosParent () {
      if (this.posBelongsToDept !== this.parentNode) { this.posParent = '' }
    },
    // 获取所属部门下岗位
    changePosParentOptions (val) {
      // 迭代出所有部门下岗位，以部门为基准的直接下级list
      this.posParentOptions = this.subPostAll(this.orgList.filter(item => item.pId === val))
    },
    // 递归寻找部门内所属所有子部门
    subPostAll (val) {
      if (val.length > 0) {
        for (const o of val) {
          const subRes = this.orgList.filter(item => item.pId === o.roleId & item.deptFlag === '1')
          if (subRes.length > 0) {
            for (const i of subRes) {
              val.push(i)
              this.subPostAll(i)
            }
          }
        }
      }
      return val
    },
    // 点击查看下属再去列出列表向后台查询
    getAllDeptUser () {
      this.posActRealNameList.push(this.parentNode.roleId)
      // pId为该节点，且符合pId的情况下是部门的list
      let list = this.orgList.filter(item => item.pId === this.parentNode.roleId & item.deptFlag === '1')
      list = this.subPostAll(list)
      if (list.length !== 0) {
        for (var o of list) {
          this.posActRealNameList.push(o.roleId)
        }
      }
      this.allDeptUserAction(this.posActRealNameList)
    },
    /* 列出所有父级，用于正确展开对应的树 */
    directParentAll (val) {
      var currentNode = this.orgList.find(item => item.roleId === val)
      var currentNodePid = currentNode.pId
      this.treeExpanded.push(val)
      if (currentNodePid !== '0') {
        this.treeExpanded.push(currentNodePid)
        this.directParentAll(currentNodePid)
      }
    },
    /* 列出最近的所属部门 */
    parentDept (val) {
      const currentNode = this.orgList.find(item => item.roleId === val)
      const currentNodeDeptFlag = currentNode.deptFlag
      if (currentNodeDeptFlag === '0') {
        this.parentDept(currentNode.pId)
      } else {
        this.editData.pId = val
      }
    }
  },
  watch: {
    /* 点击部门节点优先显示部门，岗位同理 */
    activeTab (val) {
      this.orgInfoTab = val
    },
    /* 所属部门发生改变 */
    posBelongsToDept (val) {
      // 所属部门options
      Object.assign(this.posBelongsToDeptOptions, this.orgList.filter(item => item.deptFlag === '1'))
      this.changePosParentOptions(val.roleId)
    },
    orgChartData () {
      this.addNonePidDepDialog = false
      this.addNewNodeDialog = false
      this.deptEditDialog = false
      this.posEditDialog = false
      this.posJdDialog = false
      this.deptJdDialog = false
      this.deptEditNameDialog = false
    },
    /* 点击节点后的变化 */
    selected (val) {
      if (val !== null || undefined) {
        this.treeExpanded = []
        this.orgNodeDetailAction(val)
        // 选择的节点展开
        this.directParentAll(val)
        // 显示当前选择节点直属岗位
        this.deptSubParentRoles = this.getSub(this.selected)
      } else {
        this.selected = this.selectedNodeDetail.roleId
      }
    },
    selectedNodeDetail (val) {
      // 选择点变化后tab中岗位信息随选择变化而显示隐藏
      if (Object.keys(val).length === 0) {
        this.orgInfoTab = 'deptDescription'
        this.posDescriptionShow = false
        var arr = []
        this.allDeptUserMutation(arr)
        this.posActRealNameList = arr
        if (this.parentNode.deptFlag === '1') {
          this.getAllDeptUser()
        }
      } else {
        this.posDescriptionShow = true
        this.allPosUserAction(val.roleId)
      }
    },
    parentNode (val) {
      if (Object.keys(val).length !== 0) {
        this.deptJd = val.roleJd
      }
    },
    addNewNodeRes (val) {
      if (val !== 99) {
        this.onRequest()
        this.initTreeSelected()
      }
    },
    trashNodeRes (val) {
      if (val !== 99) {
        this.onRequest()
        this.initTreeSelected()
      }
    },
    updateNodeRes (val) {
      if (val !== 99) {
        this.onRequest()
        this.initTreeSelected()
      }
    }
  }
}
</script>

<style scoped lang="sass">
</style>
