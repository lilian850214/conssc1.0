<template>
  <div class="q-pa-lg">
    <q-card  flat bordered>
      <q-card-section class="bg-blue-1" >
        <div class="row items-center no-wrap">
          <div class="col">
            <span class="text-h6 doc-card-title">所有公告</span>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" flat icon="add">新增公告
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list >
          <q-item >
            <q-item-section avatar>
              <span class="text-bold text-subtitle1">2022-11-10</span>
            </q-item-section>

            <q-item-section>
              <q-item-label>关于XXXXXX的通知 </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <div class="q-gutter-xs">
                <q-btn  flat  class="gt-xs" color="black"  icon="edit">
                  <q-tooltip>编辑</q-tooltip>
                </q-btn>
              <q-btn  flat  class="gt-xs" color="pink"  icon="delete">
                <q-tooltip>删除</q-tooltip>
              </q-btn>
                <q-btn  flat  class="gt-xs" color="grey"  icon="voice_over_off">
                  <q-tooltip>撤回</q-tooltip>
                </q-btn>
                <q-btn  flat  class="gt-xs" color="green"  icon="record_voice_over">
                  <q-tooltip>发布</q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header>Offline</q-item-label>
        </q-list>
      </q-card-section>
    </q-card>
    <div class="q-gutter-md">
    <q-pagination
      v-model="current"
      :max="5"
      direction-links
      unelevated
      color="black"
      active-color="blue-4"
      class="q-pa-lg flex flex-center"
    />
    </div>
    <q-dialog v-model="noticeEditDialog" full-width >
      <q-card class="q-pa-md" >
        <q-card-section>
        <q-input v-model="noticeTitle" ></q-input>
          <q-editor
            square
            class="q-mt-lg"
            v-model="editor"
            toolbar-bg="blue-1"
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
        ['token', 'hr', 'link', 'custom_btn'],
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
              'code'
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
        [ 'unordered', 'ordered'],
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
        <q-card-actions>
          <q-btn flat color="blue">保存</q-btn>
          <q-btn flat color="red" v-close-popup>放弃</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Notice',
  data () {
    return {
      current: 5,
      noticeEditDialog: true,
      noticeTitle: '我是公告标题',
      editor: 'Here we are overriding the <b>bold</b> command to include a label instead of an icon and also changing its tooltip.'
    }
  },
  mounted () {
  },
  computed: {
    ...mapState('Notice', ['noticeItems'])
  },
  methods: {
    ...mapMutations('Patent', ['addNewMutation', 'sendEditedMutation', 'setCurrentPageMutation', 'setRowsPerPageMutation']),
    ...mapActions('Patent',
      [
        'trashDataAction',
        'moduleDataAction',
        'sendEditedAction',
        'newDateAction',
        'patentChartAction'
      ]),
    /* 初始化信提示 */
    initTip () {
      this.tTip = false
      this.fTip = false
    }
  },
  watch: {
    // 专利列表发生变动
    patentList (val) {
      this.tbLoading = false
    }
  }
}
</script>
<style lang="sass">
</style>
