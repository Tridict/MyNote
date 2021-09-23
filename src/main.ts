import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vantPlugins } from './plugins/vant'
import 'vant/lib/index.css'
import './assets/scss/common.scss'

// VMdEditor
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

VMdEditor.use(vuepressTheme, {
  Prism
})

// import 'highlight.js/styles/default.css'
// import VueHighlightJS from 'vue-highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'

// 移动端适配
// import 'lib-flexible/flexible.js'

createApp(App)
  .use(router)
  .use(vantPlugins)
  .use(VMdEditor)
  // .use(VueHighlightJS)
  .mount('#app')
