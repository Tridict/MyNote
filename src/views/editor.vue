<template>
  <div class="editor">
    <van-nav-bar title="MyNote">
      <template #left>
        <van-button size="mini" @click="onBack">
          <van-icon
            size="18"
            name="https://api.iconify.design/mdi:chevron-left.svg"
          />
        </van-button>
      </template>
      <template #right>
        <van-button size="mini" @click="showPreview">
          <van-icon
            v-if="isEdit"
            size="18"
            name="https://api.iconify.design/mdi:file-eye-outline.svg"
          />
          <van-icon
            v-else
            size="18"
            name="https://api.iconify.design/mdi:note-edit-outline.svg"
          />
        </van-button>
        <van-button size="mini" @click="onSave">
          <van-icon
            size="18"
            name="https://api.iconify.design/mdi:content-save-outline.svg"
          />
          <!-- <van-icon size="16" name="https://api.iconify.design/cil:save.svg" /> -->
        </van-button>
      </template>
    </van-nav-bar>
    <div class="v-md-editor-wrap">
      <v-md-editor v-model="text"></v-md-editor>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const text = ref('## 在此编辑您的内容')
const isKeyboard = ref(false)
const toolbar = ref(null)
const isEdit = ref(false)
const display = reactive({
  editor: 'none',
  preview: 'block'
})

// 目前仅实现了在文末加文字的功能...（需要知道光标位置？）
// const addText = (txt = '### 这是一个**可爱的**三级标题哦！') => {
//   text.value += '\n' + txt
// }

// const scrollTo = () => {
//   // toolbar2.value.scrollIntoView()  // 实验中的功能，不起效果
//   // window.scrollTo(0, currentTop)
//   document.documentElement.scrollTop = 0
// }

const showPreview = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    display.editor = 'block'
    display.preview = 'none'
  } else {
    display.editor = 'none'
    display.preview = 'block'
  }
}

const onScroll = () => {
  if (isKeyboard.value) {
    // const value = document.documentElement.clientHeight - window.innerHeight
    // addText('clientHeight-innerHeight ' + value)
    // addText('scrollTop ' + document.documentElement.scrollTop)
    // toolbar.value.style = `bottom: ${
    //   value - document.documentElement.scrollTop
    // }px; top: auto`
    toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
    // toolbar.value.style = `bottom: 0`
  }
  document.body.style = `height: ${window.innerHeight}px;`
}

const onKeyboard = () => {
  setTimeout(() => {
    isKeyboard.value = true
    // toolbar.value.style = `bottom: ${
    //   document.documentElement.clientHeight -
    //   window.innerHeight -
    //   document.documentElement.scrollTop
    // }px; top: auto;`
    toolbar.value.style = `top: ${window.innerHeight - 41}px; bottom: auto;`
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
    toolbar.value.style = 'display: none'
    isKeyboard.value = false
  }, 300)
}

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

onMounted(() => {
  const tt = document.querySelector('textarea')
  if (tt !== null) {
    tt.addEventListener('focus', onKeyboard)
    tt.addEventListener('blur', offKeyboard)
  }
  window.addEventListener('scroll', onScroll)
  toolbar.value = document.querySelector('.v-md-editor__toolbar')
  // 隐藏toolbar
  toolbar.value.style = 'display: none'
})
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
  // .editor-header {
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 0.5rem 0.1rem;
  //   position: sticky;
  //   position: -webkit-sticky;
  //   top: 0;
  //   background: $bg;
  //   z-index: 100;
  // }
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
      // display: none;
      bottom: 0;
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
        display: v-bind('display.editor');
      }
      .v-md-editor__preview-wrapper {
        display: v-bind('display.preview');
      }
      .v-md-editor__editor-wrapper,
      .v-md-editor__preview-wrapper {
        padding: 2rem;
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
}
</style>

<style lang="scss">
@media screen and (max-width: 900px) {
  .v-md-editor__toolbar {
    // flex-direction: column;
    background: #ddd;
    // position: fixed;
    bottom: 0;
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
    // &-right {
    //   margin-left: 0;
    // }
  }
}
</style>
