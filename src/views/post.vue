<template>
  <div class="editor-wrap">
    <van-nav-bar title="MyNote">
      <template #left>
        <van-button size="small" @click="handleBack">
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
        <van-button size="small" @click="handleSave">
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
        <van-uploader accept=".md, .txt" :after-read="handleImport">
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
        <button class="van-action-sheet__item" @click="showMore = false">导出笔记</button>
      </a>
      <button
        class="van-action-sheet__item"
        @click="handlePin"
      >
        置顶笔记
      </button>
      <button
        class="van-action-sheet__item"
        @click="handlePublic"
      >
        公开笔记
        <div class="uploader-warn van-action-sheet__subname">
          公开以后，所有人都将能看到您的笔记（只读）
        </div>
      </button>
      <button
        class="van-action-sheet__item"
        style="color: red"
        @click="handleDelete"
      >
        删除笔记
      </button>
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
// import { Notify } from 'vant'
import { useRouter } from 'vue-router'
import { useEditorOptions } from '@/utils/useActionSheet'
import { useExport } from '@/utils/useExport'
import { useText } from '@/utils/useText'
import Icon from '@/components/icons/navbar.vue'
import { VantFile } from '@/types'

const useMode = () => {
  type Mode = 'edit' | 'preview' | 'editable'
  const mode = ref<Mode>('preview')
  const isEdit = computed(() => mode.value === 'edit')
  const showPreview = () => {
    mode.value = mode.value === 'edit' ? 'preview' : 'edit'
  }

  return { mode, isEdit, showPreview }
}

const editorHeight = ref('calc(100vh - var(--van-nav-bar-height))')
// const { editorHeight } = useKeyboard()
const { getDownloadLink } = useExport()
const { showMore, hideMore } = useEditorOptions()
const { mode, isEdit, showPreview } = useMode()
const { text, saveFileName, handlePin, handlePublic, handleSave, deleteNote, importNote, checkIfSaved } =
  useText(mode, hideMore)
const router = useRouter()

const handleBack = () => {
  checkIfSaved().then((val) => {
    // console.log(val)
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

const handleImport = (file: VantFile) => {
  showMore.value = false
  importNote(file)
}

const handleDelete = () => {
  showMore.value = false
  deleteNote()
}

onMounted(() => {
  window.onbeforeunload = function closeWindow() {
    var message = '你确定要关闭吗？'
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
