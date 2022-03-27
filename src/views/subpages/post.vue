<template>
  <div class="poster-wrap">
    <van-nav-bar class="nav-bar" title="MyNote">
      <template #left>
        <van-button size="small" @click="handleSave" v-if="isEdit">
          <Icon name="save" :loading="status.isSaving" />
        </van-button>
        <van-button size="small" @click="handleBack" v-else>
          <Icon name="back" />
        </van-button>
      </template>
      <template #right>
        <van-button size="small" @click="showPreview" v-if="postInfo.canWrite">
          <Icon name="showPreview" :active="isEdit" />
        </van-button>
        <van-button size="small" @click="showMore = true">
          <Icon name="showMore" />
        </van-button>
      </template>
    </van-nav-bar>
    <div class="tags-wrap">
      <!-- <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          d="M6.5 10C7.3 10 8 9.3 8 8.5S7.3 7 6.5 7S5 7.7 5 8.5S5.7 10 6.5 10M9 6l7 7l-5 5l-7-7V6h5m0-2H4c-1.1 0-2 .9-2 2v5c0 .6.2 1.1.6 1.4l7 7c.3.4.8.6 1.4.6s1.1-.2 1.4-.6l5-5c.4-.4.6-.9.6-1.4c0-.6-.2-1.1-.6-1.4l-7-7C10.1 4.2 9.6 4 9 4m4.5 1.7l1-1l6.9 6.9c.4.4.6.9.6 1.4s-.2 1.1-.6 1.4L16 19.8l-1-1l5.7-5.8l-7.2-7.3z"
          fill="#7232dd"
        ></path>
      </svg> -->
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          d="M5.5 9A1.5 1.5 0 0 0 7 7.5A1.5 1.5 0 0 0 5.5 6A1.5 1.5 0 0 0 4 7.5A1.5 1.5 0 0 0 5.5 9m11.91 2.58c.36.36.59.86.59 1.42c0 .55-.22 1.05-.59 1.41l-5 5a1.996 1.996 0 0 1-2.83 0l-6.99-6.99C2.22 12.05 2 11.55 2 11V6c0-1.11.89-2 2-2h5c.55 0 1.05.22 1.41.58l7 7m-3.87-5.87l1-1l6.87 6.87c.37.36.59.87.59 1.42c0 .55-.22 1.05-.58 1.41l-5.38 5.38l-1-1L20.75 13l-7.21-7.29z"
          fill="#7232dd"
        ></path>
      </svg>
      <ArticleTag :tags="tagList" />
      <van-tag plain @click="showTagManage = true">+</van-tag>
    </div>
    <div class="editor-wrap">
      <MilkdownEditor
        :readonly="mode === 'preview'"
        :defaultText="postInfo.content"
        @input="handleInput"
        v-if="postInfo.content"
      />
      <textarea class="editor" v-model="postInfo.content" v-else />
    </div>
    <van-action-sheet
      v-model:show="showMore"
      cancel-text="取消"
      close-on-click-action
      safe-area-inset-bottom
    >
      <!-- 导入 -->
      <label class="uploader-wrap">
        <van-uploader accept=".md, .txt" :after-read="handleImport">
          导入笔记
        </van-uploader>
        <div class="uploader-warn van-action-sheet__subname">
          从本地文件中导入一篇新的笔记，当前未保存内容可能会丢失
        </div>
      </label>
      <div class="van-hairline--bottom"></div>
      <!-- 导出 -->
      <a
        class="export-wrap"
        :download="saveFileName"
        :href="getDownloadLink(postInfo.content)"
      >
        <button class="van-action-sheet__item" @click="showMore = false">
          导出笔记
        </button>
      </a>
      <div class="van-hairline--bottom"></div>
      <!-- 置顶 -->
      <button
        class="van-action-sheet__item"
        @click="handlePin"
        v-if="postInfo.canWrite"
      >
        <span v-if="postInfo.pinned">取消置顶</span>
        <span v-else>置顶笔记</span>
      </button>
      <div class="van-hairline--bottom"></div>
      <!-- 公开 -->
      <button
        class="van-action-sheet__item"
        @click="handlePublic"
        v-if="postInfo.canWrite"
      >
        <span v-if="postInfo.isPublicRead">取消公开</span>
        <span v-else>
          公开笔记
          <div class="uploader-warn van-action-sheet__subname">
            公开以后，所有人都将能看到您的笔记（只读）
          </div>
        </span>
      </button>
      <div class="van-hairline--bottom"></div>
      <!-- 删除 -->
      <button
        class="van-action-sheet__item"
        style="color: red"
        @click="handleDelete"
        v-if="postInfo.canWrite"
      >
        删除笔记
      </button>
    </van-action-sheet>
    <TagManage
      :isShow="showTagManage"
      :postId="postInfo.postId"
      :postTags="tagList"
      @close="handleUpdateTags"
    />
  </div>
</template>

<script setup lang="ts">
import MilkdownEditor from '@/plugins/milkdown.vue'
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
// import { Notify } from 'vant'
import { VantFile } from '@/types'
import { useRouter } from 'vue-router'
import { useExport } from '@/utils/notes/useExport'
import { useText } from '@/utils/notes/useText'
import Icon from '@/components/common/icons/navbar-icon.vue'
import ArticleTag from '@/components/common/article-tag.vue'
import TagManage from '@/components/tag-manage.vue'

const useMode = () => {
  type Mode = 'edit' | 'preview'
  const mode = ref<Mode>('preview')
  const isEdit = computed(() => mode.value === 'edit')
  const showPreview = () => {
    mode.value = mode.value === 'edit' ? 'preview' : 'edit'
  }

  return { mode, isEdit, showPreview }
}

// const editorHeight = ref('calc(100vh - var(--van-nav-bar-height))')
const showMore = ref(false)
// const { editorHeight } = useKeyboard()
const { getDownloadLink } = useExport()
const { mode, isEdit, showPreview } = useMode()
const {
  status,
  postInfo,
  saveFileName,
  showTagManage,
  tagList,
  handleUpdateTags,
  handlePin,
  handlePublic,
  handleInput,
  saveNote,
  deleteNote,
  importNote,
  checkIfSaved
} = useText(mode)
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
  saveNote().then(() => {
    mode.value = 'preview'
  })
}

onMounted(async () => {
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
.poster-wrap {
  display: flex;
  flex-direction: column;
  background: $bg;
  height: 100%;
  .editor-wrap {
    flex: 1;
    position: relative;
    .editor {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
    }
  }
  .keyboard {
    width: 100%;
    height: 0;
  }
}

.tags-wrap {
  padding: $margin-items * 0.5 $margin-items;
  background-color: var(--van-cell-background-color);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background: $bg;
  svg {
    margin-right: 10px;
    // color: '#7232dd';
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
