<template>
  <div class="editor" :style="editorStyle">
    <div class="editor-header">
      <van-button size="mini" @click="onBack">返回</van-button>
      MyNote
      <van-button size="mini" @click="onBack">保存</van-button>
    </div>
    <v-md-editor v-model="text"></v-md-editor>
    <!-- <div class="custom-toolbar">
    <van-button size="mini" @click="addText">可爱</van-button>
  </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const text = ref('## 在此编辑您的内容')
const toolbar = ref(null)
const editorStyle = ref('')

// 目前仅实现了在文末加文字的功能...（需要知道光标位置？）
const addText = (txt = '### 这是一个**可爱的**三级标题哦！') => {
  text.value += '\n' + txt
}

// 似乎innerHeight的值是有效的，可以参考这个来控制fixed定位元素的top值？
// 底部空白区————在内容底部...安全...

const scroll = () => {
  setTimeout(() => {
    document.body.scrollTop = document.body.scrollHeight
    addText('innerHeight' + window.innerHeight)
    addText('clientHeight' + document.documentElement.clientHeight)
    // addText('scrollHeight' + document.body.scrollHeight)
    // 呈现吸底的toolbar
    toolbar.value.style = ''

    // 可编辑区域变窄（toolbar没有使用position的情况，依然在编辑区底部...）
    // const keyboardHeight =
    //   document.documentElement.clientHeight - window.innerHeight
    // const toobarHeight = toolbar.value.offsetHeight //px
    // const paddingBottom = 8
    // editorStyle.value = `height: calc(100vh - ${toobarHeight}px - ${keyboardHeight}px - ${paddingBottom}rem); padding-bottom: ${paddingBottom}rem`
  }, 300)
}

const onBack = () => {
  router.push('/notes')
}

onMounted(() => {
  const tt = document.querySelector('textarea')
  if (tt !== null) {
    tt.addEventListener('focus', scroll)
    // scroll()
  }
  toolbar.value = document.querySelector('.v-md-editor__toolbar')
  toolbar.value.style = 'display: none'
})
</script>

<style lang="scss" scoped>
// $padding-bottom: 0;

.editor {
  display: flex;
  flex-direction: column;
  // padding-bottom: $padding-bottom;
  // padding-bottom: $padding-bottom + constant(safe-area-inset-bottom); // 兼容ios<11.2
  // padding-bottom: $padding-bottom + env(safe-area-inset-bottom);
  // height: calc(100vh - ($padding-bottom + (41rem / 16)));
  .editor-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.1rem;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background: $bg;
    z-index: 100;
  }
  .v-md-editor {
    flex: 1;
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
    .v-md-editor__main {
      flex-direction: column-reverse;
      padding-bottom: (69px / 16) rem;
      .v-md-editor__editor-wrapper {
        border-top: 1px solid #ddd;
        border-right: 0;
      }
      .scrollbar {
        height: 37.1vh;
        padding: 2rem;
      }
      .vuepress-markdown-body:not(.custom),
      .v-md-textarea-editor textarea {
        padding: 0;
      }
    }
  }
}
</style>
