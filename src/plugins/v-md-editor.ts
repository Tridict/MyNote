// VMdEditor
// import VMdEditor from '@kangc/v-md-editor'
// import '@kangc/v-md-editor/lib/style/base-editor.css'
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn.js'
// import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css'

// // Prism
// import Prism from 'prismjs'
// // 直接按需引入 prism 的语言包即可，此处以 json 为例
// import 'prismjs/components/prism-json'
// import 'prismjs/components/prism-json'

// VMdEditor.use(vuepressTheme, {
//   Prism
// }).use(createMermaidPlugin())

// highlightjs
// import hljs from 'highlight.js';

// VMdEditor.use(vuepressTheme, {
//   hljs
// })

// import 'highlight.js/styles/default.css'
// import VueHighlightJS from 'vue-highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'

// 进阶版
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
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

VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme, {
  Hljs: hljs
})

// app.use(VMdEditor);

export default VMdEditor
