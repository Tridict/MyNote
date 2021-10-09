<template>
  <div class="editor-wrap">
    <van-nav-bar title="MyNote">
      <template #left>
        <van-button size="small" @click="handleSave" v-if="isEdit">
          <Icon name="save" :loading="status.isSaving" />
        </van-button>
        <van-button size="small" @click="handleBack" v-else>
          <Icon name="back" />
        </van-button>
      </template>
      <template #right>
        <van-button size="small" @click="showPreview">
          <Icon name="showPreview" :active="isEdit" />
        </van-button>
        <van-button size="small" @click="showMore = true">
          <Icon name="showMore" />
        </van-button>
      </template>
    </van-nav-bar>
    <!-- <div class="tags-wrap">
      <ArticleTag :tags="getTag(postInfo.tags)" />
      <van-tag plain @click="handleAddtag">+</van-tag>
    </div> -->
    <div class="v-md-editor-wrap">
      <v-md-editor
        v-model="postInfo.content"
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
          打开笔记
        </van-uploader>
        <div class="uploader-warn van-action-sheet__subname">
          从本地文件中导入一篇新的笔记，当前未保存内容可能会丢失
        </div>
      </label>
      <div class="van-hairline--bottom"></div>
      <a
        class="export-wrap"
        :download="saveFileName"
        :href="getDownloadLink(postInfo.content)"
      >
        <button class="van-action-sheet__item" @click="showMore = false">导出笔记</button>
      </a>
      <div class="van-hairline--bottom"></div>
      <button
        class="van-action-sheet__item"
        @click="handlePin"
      >
        <span v-if="postInfo.pinned">取消置顶</span>
        <span v-else>置顶笔记</span>
      </button>
      <div class="van-hairline--bottom"></div>
      <button
        class="van-action-sheet__item"
        @click="handlePublic"
        v-if="!postInfo.is_public_read"
      >
        <span v-if="postInfo.is_public_read">取消公开</span>
        <span v-else>公开笔记
          <div class="uploader-warn van-action-sheet__subname">
            公开以后，所有人都将能看到您的笔记（只读）
          </div>
        </span>
      </button>
      <div class="van-hairline--bottom"></div>
      <button
        class="van-action-sheet__item"
        style="color: red"
        @click="handleDelete"
      >
        删除笔记
      </button>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
// import { Notify } from 'vant'
import { VantFile } from '@/types'
import { getTag } from '@/utils/notes/useArticle'
import { useRouter } from 'vue-router'
import { useExport } from '@/utils/notes/useExport'
import { useText } from '@/utils/notes/useText'
import Icon from '@/components/common/icons/navbar-icon.vue'
import ArticleTag from '@/components/common/article-tag.vue'

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
const showMore = ref(false)
// const { editorHeight } = useKeyboard()
const { getDownloadLink } = useExport()
const { mode, isEdit, showPreview } = useMode()
const { status, postInfo, saveFileName, handleAddtag, handlePin, handlePublic, saveNote, deleteNote, importNote, checkIfSaved } =
  useText(mode)
const router = useRouter()

const handleBack = () => {
  checkIfSaved().then((val) => {
    // console.log(val)
    if (val == true) {
      router.push('/notes')
    }
  })
  // if (postInfo.content == BEGIN_TEXT || postInfo.content == saveText) {
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

const handleSave = () => {
  saveNote().then(()=>{
    mode.value = 'preview'
  })
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
      .v-md-editor__editor-wrapper,
      .v-md-editor__preview-wrapper {
        flex: 1;
      }
    }
  }
  :deep().van-button--small {
    width: var(--van-button-small-height);
    margin: 0.1rem;
  }
}

.tags-wrap {
  padding: 0 $margin-items;
  background-color: var(--van-cell-background-color);
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
