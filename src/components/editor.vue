<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <div class="preview" v-html="compiledMarkdown"></div>
  </div>
</template>

<script setup lang="ts">
import marked from 'marked'
import hljs from 'highlight.js'
import { computed, ref } from '@vue/reactivity'
import debounce from 'lodash.debounce'

const input = ref('# hello')

// 用marked包把md编译为html，然后用div.preview搭配css来呈现效果
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    // const hljs = require('highlight.js')
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

const compiledMarkdown = computed(() => {
  return marked(input.value)
})

const update = debounce((e) => {
  input.value = e.target.value
}, 300)
</script>

<style lang="scss" scoped>
#editor {
  height: 100vh;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  .preview {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }
  textarea {
    @extend .preview;
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }
}
// :deep()code {
//   color: #f66;
// }
</style>
