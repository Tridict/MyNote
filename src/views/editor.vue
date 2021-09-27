<template>
  <div class="editor">
    <van-nav-bar title="MyNote">
      <template #left>
        <van-button size="small" @click="onBack">
          <van-icon
            size="20"
            name="https://api.iconify.design/mdi:chevron-left.svg"
          />
        </van-button>
      </template>
      <template #right>
        <van-button size="small" @click="showMore = true">
          <van-icon
            size="16"
            name="https://api.iconify.design/fa-solid:ellipsis-h.svg"
          />
        </van-button>
        <van-button size="small" @click="showPreview">
          <van-icon
            v-if="isEdit"
            size="20"
            name="https://api.iconify.design/mdi:file-eye-outline.svg"
          />
          <van-icon
            v-else
            size="20"
            name="https://api.iconify.design/mdi:note-edit-outline.svg"
          />
        </van-button>
        <van-button size="small" @click="onSave">
          <van-icon
            size="20"
            name="https://api.iconify.design/mdi:content-save-outline.svg"
          />
          <!-- <van-icon size="18" name="https://api.iconify.design/cil:save.svg" /> -->
        </van-button>
      </template>
    </van-nav-bar>
    <div class="v-md-editor-wrap">
      <v-md-editor v-model="text" :mode="mode"></v-md-editor>
    </div>
    <van-action-sheet
      v-model:show="showMore"
      :actions="options"
      cancel-text="取消"
      close-on-click-action
      safe-area-inset-bottom
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEditorOptions } from '@/utils/useActionSheet'

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
  const isKeyboard = ref(false)
  const toolbar = ref(null) // html element?

  const onScroll = () => {
    if (isKeyboard.value) {
      // const value = document.documentElement.clientHeight - window.innerHeight
      // addText('clientHeight-innerHeight ' + value)
      // addText('scrollTop ' + document.documentElement.scrollTop)
      // toolbar.value.style = `bottom: ${
      //   value - document.documentElement.scrollTop
      // }px; top: auto`
      // toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
      toolbar.value.style = `bottom: 0`
    }
  }

  const onKeyboard = () => {
    setTimeout(() => {
      isKeyboard.value = true
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
    }, 300)
  }

  onMounted(() => {
    const tt = document.querySelector('textarea')
    if (tt !== null) {
      tt.addEventListener('focus', onKeyboard)
      tt.addEventListener('blur', offKeyboard)
    }
    window.addEventListener('scroll', onScroll)
    toolbar.value = document.querySelector('.v-md-editor__toolbar')
    // 隐藏toolbar
    // toolbar.value.style = 'display: none'
  })

  return { isKeyboard }
}

const router = useRouter()
const { showMore, options } = useEditorOptions()
const { mode, isEdit, showPreview } = useMode()
useKeyboard()

const text = ref('## 在此编辑您的内容')

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

// const scrollTo = () => {
//   // toolbar2.value.scrollIntoView()  // 实验中的功能，不起效果
//   // window.scrollTo(0, currentTop)
//   document.documentElement.scrollTop = 0
// }

const onBack = () => {
  // 判断是否保存草稿
  router.push('/notes')
  // notes更新数据
}

const onSave = () => {
  // 保存
  // 然后返回
  onBack()
}
</script>

<style lang="scss" scoped>
$padding-bottom: 0rem;

.editor {
  display: flex;
  flex-direction: column;
  // padding-bottom: $padding-bottom;
  // padding-bottom: $padding-bottom + constant(safe-area-inset-bottom); // 兼容ios<11.2
  // padding-bottom: $padding-bottom + env(safe-area-inset-bottom);
  height: calc(100vh - $padding-bottom);
  background: yellow;
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
      background: #ddd;
      position: fixed;
      top: auto;
      bottom: 0;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
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
        // margin-left: 0;
        display: none;
      }
    }
    .v-md-editor__main {
      flex-direction: column-reverse;
      padding-bottom: (69px / 16) rem;
      .v-md-editor__editor-wrapper {
        border-top: 1px solid #ddd;
        border-right: 0;
      }
      .v-md-editor__preview-wrapper {
      }
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
</style>
