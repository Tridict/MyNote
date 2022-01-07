// 文档：https://ckang1229.gitee.io/vue-markdown-editor/zh/theme/github.html#%E4%BB%8B%E7%BB%8D

// 基础版
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

// 进阶版
// import VMdEditor from './editor-codemirror'

// **
// 共同
// **

// vuepress主题
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// // Prism
// import Prism from 'prismjs'
// // 直接按需引入 prism 的语言包即可，此处以 json 为例
// import 'prismjs/components/prism-json'

// github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// 引入highlightjs所有语言包
import hljs from 'highlight.js'

// 使用mermaid插件
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn.js'
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'

// katex插件
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn.js'

// todo-list插件
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

VMdEditor.use(githubTheme, {
  Hljs: hljs
})
// VMdEditor.use(vuepressTheme, {
//   Prism
// })

VMdEditor.use(createMermaidPlugin())
VMdEditor.use(createKatexPlugin())
VMdEditor.use(createTodoListPlugin())

export default VMdEditor
