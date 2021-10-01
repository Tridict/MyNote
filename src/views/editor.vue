<template>
  <div class="editor-wrap">
    <van-nav-bar title="MyNote">
      <template #left>
        <van-button size="small" @click="onBack">
          <Icon name="back" />
        </van-button>
      </template>
      <template #right>
        <van-button size="small" @click="showMore = true">
          <Icon name="showMore" />
        </van-button>
        <van-button size="small" @click="showPreview">
          <Icon name="showPreview" :active="isEdit" />
        </van-button>
        <van-button size="small" @click="onSave">
          <Icon name="save" />
        </van-button>
      </template>
    </van-nav-bar>
    <div class="v-md-editor-wrap">
      <v-md-editor
        v-model="text"
        :mode="mode"
        :height="editorHeight"
        left-toolbar="undo redo | toc | ul ol quote table link code | clear"
        right-toolbar=""
      ></v-md-editor>
    </div>
    <van-action-sheet
      v-model:show="showMore"
      cancel-text="取消"
      close-on-click-action
      safe-area-inset-bottom
    >
      <label class="uploader-wrap">
        <van-uploader accept=".md, .txt" :after-read="afterRead">
          导入笔记
        </van-uploader>
        <div class="uploader-warn van-action-sheet__subname">
          导入笔记将覆盖您当前输入的内容
        </div>
      </label>
      <a
        class="export-wrap"
        :download="saveFileName"
        :href="getDownloadLink(text)"
      >
        <button class="van-action-sheet__item">导出笔记</button>
      </a>
    </van-action-sheet>
    <!-- <van-action-sheet
      v-model:show="showToc"
      close-on-click-action
      safe-area-inset-bottom
    >
      <div id="toc-wrap"></div>
    </van-action-sheet> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { Dialog, Notify } from 'vant'
import { useRouter } from 'vue-router'
import { useEditorOptions } from '@/utils/useActionSheet'
import useFile from '@/utils/useFile'
import { useExport } from '@/utils/useExport'
import Icon from '@/components/icons/navbar.vue'

const BEGIN_TEXT = '## 在此编辑您的内容' //记录初始文本，如果没有修改，则不需要保存
let saveText = '' //记录上次保存的内容，如果有本地内容未保存，则在退出时候给提示

const useText = () => {
  const text = ref(BEGIN_TEXT)

  const saveFileName = computed(() => {
    const title = text.value.split('\n')[0]
    if (title[0] == '#') {
      return title.replace(/#+ /g, '')
    } else {
      return title
    }
  })

  const afterRead = async (file) => {
    showMore.value = false
    await onImportFiles(file)
    const result = fileMetaList.value[0]?.content
    if (result) {
      text.value = result
    } else {
      Notify('读取文件出现错误')
    }
  }

  // 目前仅实现了在文末加文字的功能...（需要知道光标位置？）
  // const addText = (txt = '### 这是一个**可爱的**三级标题哦！') => {
  //   text.value += '\n' + txt
  // }

  // 官方提供的例子
  // selected 为当前选中的文本
  // editor.insert((selected) => {
  //   const prefix = '**'
  //   const suffix = '**'
  //   const content = selected || '粗体'

  //   return {
  //     // 要插入的文本
  //     text: `${prefix}${content}${suffix}`,
  //     // 插入后要选中的文本
  //     selected: content
  //   }
  // })

  return { text, saveFileName, afterRead }
}

const useMode = () => {
  // type Mode = 'edit' | 'preview' | 'editable'
  // const mode = ref<Mode>('edit')
  const mode = ref('edit')
  const isEdit = computed(() => mode.value === 'edit')
  const showPreview = () => {
    mode.value = mode.value === 'edit' ? 'preview' : 'edit'
  }

  return { mode, isEdit, showPreview }
}

const useKeyboard = () => {
  const editorHeight = ref('calc(100vh - var(--van-nav-bar-height))')
  const isKeyboard = ref(false)
  const editor = ref(null) // html element?

  const onScroll = () => {
    if (isKeyboard.value) {
      Notify('滚动啦')
      // const value = document.documentElement.clientHeight - window.innerHeight
      // addText('clientHeight-innerHeight ' + value)
      // addText('scrollTop ' + document.documentElement.scrollTop)
      // toolbar.value.style = `bottom: ${
      //   value - document.documentElement.scrollTop
      // }px; top: auto`
      // toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
      // toolbar.value.style = `bottom: 0`
    }
  }

  // const scrollTo = () => {
  //   // toolbar2.value.scrollIntoView()  // 实验中的功能，不起效果
  //   // window.scrollTo(0, currentTop)
  //   document.documentElement.scrollTop = 0
  // }

  const onKeyboard = () => {
    setTimeout(() => {
      isKeyboard.value = true
      editorHeight.value = '50vh'
      // editorHeight.value = `calc(100vh - var(--van-nav-bar-height) - ${
      //   document.documentElement.clientHeight - window.innerHeight
      // }px)`
      // toolbar.value.style = `bottom: ${
      //   document.documentElement.clientHeight -
      //   window.innerHeight -
      //   document.documentElement.scrollTop
      // }px; top: auto;`
      // toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
      // 呈现吸底的toolbar
      // editor.value.appendChild(toolbar.value)
      // editor.value.style = `height: calc(100vh - ${
      //   document.documentElement.clientHeight - window.innerHeight
      // }px)`
    }, 300)
  }

  const offKeyboard = () => {
    setTimeout(() => {
      // 隐藏toolbar
      // toolbar.value.style = 'display: none'
      isKeyboard.value = false
      editorHeight.value = 'calc(100vh - var(--van-nav-bar-height))'
    }, 300)
  }

  onMounted(() => {
    const tt = document.querySelector('.CodeMirror-code')
    if (tt !== null) {
      tt.addEventListener('focus', onKeyboard)
      tt.addEventListener('blur', offKeyboard)
    }
    if (editor.value != null) {
      console.log(editor.value)
      // toolbar.value = document.querySelector('.v-md-editor__toolbar')
      editor.value.addEventListener('scroll', onScroll)
    }
    // 隐藏toolbar
    // toolbar.value.style = 'display: none'
  })

  return { editorHeight }
}

const { fileMetaList, onImportFiles } = useFile()
const { getDownloadLink } = useExport()
const { text, saveFileName, afterRead } = useText()
const { mode, isEdit, showPreview } = useMode()
const { showMore } = useEditorOptions()
const { editorHeight } = useKeyboard()
const router = useRouter()

const checkIfSave = async () => {
  if (text.value == BEGIN_TEXT || text.value == saveText) {
    return true
  } else {
    try {
      await Dialog.confirm({
        title: '确认返回吗？',
        message: '笔记不会自动保存哦'
      })
      return true
    } catch {
      return false
    }
  }
}

const onBack = () => {
  checkIfSave().then((val) => {
    console.log(val)
    if (val == true) {
      router.push('/notes')
    }
  })
  // if (text.value == BEGIN_TEXT || text.value == saveText) {
  //   router.push('/notes')
  // } else {
  //   Dialog.confirm({
  //     message: '确认返回吗？笔记不会自动保存哦'
  //   })
  //     .then(() => {
  //       // on confirm
  //       router.push('/notes')
  //     })
  //     .catch(() => {
  //       // on cancel
  //     })
  // }
}

const onSave = () => {
  // 保存
  saveText = text.value
  Notify({ type: 'success', message: `保存成功`, duration: 800 })
  // 返回
  // if (setting.backOnSave) {
  //   router.push('/notes')
  // }
}

onMounted(() => {
  window.onbeforeunload = function closeWindow() {
    var message = '你确定要关闭吗？'
    //   e = e || window.event
    // if (e) {
    //   e.returnValue = message // IE
    // }
    return message
  }
})

onBeforeUnmount(() => {
  window.onbeforeunload = null
})
</script>

<style lang="scss" scoped>
.editor-wrap {
  display: flex;
  flex-direction: column;
  background: $bg;
  .v-md-editor-wrap {
    flex: 1;
    position: relative;
    .v-md-editor {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
      // .v-md-editor__editor-wrapper {
      // }
    }
  }
  .keyboard {
    width: 100%;
    height: 0;
  }
}

@media screen and (max-width: 900px) {
  :deep().v-md-editor__left-area {
    &-title {
      height: 41px !important;
      line-height: 41px !important;
    }
    &-body {
      text-align: left;
    }
  }
  :deep().v-md-editor__right-area {
    flex-direction: column-reverse;
    .v-md-editor__toolbar {
      // flex-direction: column;
      // background: #ddd;
      // position: fixed;
      // top: auto;
      // bottom: 0;
      padding-bottom: calc(6px + constant(safe-area-inset-bottom));
      padding-bottom: calc(6px + env(safe-area-inset-bottom));
      // z-index: 100;
      &-left {
        flex: 1;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */
        &::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
      }
      &-right {
        margin-left: 0;
        // display: none;
      }
    }
    .v-md-editor__main {
      flex-direction: column-reverse;
      padding-bottom: (69px / 16) rem;
      .v-md-editor__editor-wrapper {
        border-top: 1px solid #ddd;
        border-right: 0;
      }
      // .v-md-editor__preview-wrapper {
      // }
      .v-md-editor__editor-wrapper,
      .v-md-editor__preview-wrapper {
        // padding: 2rem;
        flex: 1;
      }
      // .scrollbar {
      // height: 37.1vh;
      // padding: 2rem;
      // }
      .vuepress-markdown-body:not(.custom),
      .v-md-textarea-editor textarea {
        padding: 0;
      }
    }
  }
  :deep().van-button--small {
    width: var(--van-button-small-height);
    margin: 0.1rem;
  }
}

.uploader-wrap {
  width: 100%;
  color: $text-color;
  .van-uploader {
    width: 100%;
    :deep().van-uploader__wrapper {
      justify-content: center;
      padding-top: $margin-items;
    }
  }
  .uploader-warn {
    text-align: center;
    padding-bottom: $margin-items;
  }
}

.export-wrap {
  color: $text-color;
}
</style>
