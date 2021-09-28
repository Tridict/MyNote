// 基础版
// import VMdEditor from '@kangc/v-md-editor'
// import '@kangc/v-md-editor/lib/style/base-editor.css'

// vuepress主题
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// // Prism
// import Prism from 'prismjs'
// // 直接按需引入 prism 的语言包即可，此处以 json 为例
// import 'prismjs/components/prism-json'

// VMdEditor.use(vuepressTheme, {
//   Prism
// })

// 进阶版
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
// github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror'
// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'

// 使用mermaid插件
// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn.js'
// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'

// katex插件
// import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn.js'

// todo-list插件
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'


VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme, {
  Hljs: hljs
})
// VMdEditor.use(createMermaidPlugin())
// VMdEditor.use(createKatexPlugin())
VMdEditor.use(createTodoListPlugin())

// app.use(VMdEditor);

export default VMdEditor
