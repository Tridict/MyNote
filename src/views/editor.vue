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
    toolbar.value.style = `bottom: ${
      document.documentElement.clientHeight - window.innerHeight
    }px; top: auto`
    const paddingBottom = toolbar.value.offsetHeight //px
    editorStyle.value = `height: calc(100vh - ${paddingBottom}px - ${
      document.documentElement.clientHeight - window.innerHeight
    }px); padding-bottom: 0`
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
})
</script>

<style lang="scss" scoped>
$padding-bottom: 8rem;

.editor {
  display: flex;
  flex-direction: column;
  padding-bottom: $padding-bottom;
  height: calc(100vh - ($padding-bottom + (41rem / 16)));
  .editor-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.1rem;
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
      position: absolute;
      bottom: $padding-bottom;
      background: #ddd;
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
      .v-md-editor__editor-wrapper,
      .scrollbar {
        height: 30vh;
      }
    }
  }
}
</style>
