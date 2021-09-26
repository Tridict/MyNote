import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VMdEditor from './plugins/v-md-editor'
import { vantPlugins } from './plugins/vant'
import 'vant/lib/index.css'
import './assets/scss/common.scss'

// 移动端适配
// import 'lib-flexible/flexible.js'

createApp(App).use(router).use(vantPlugins).use(VMdEditor).mount('#app')
  
  
  
// ;(
//   function () {
//     var script = document.createElement('script')
//     script.src = '//cdn.jsdelivr.net/npm/eruda'
//     document.body.appendChild(script)
//     script.onload = function () {
//       // eslint-disable-next-line no-undef
//       eruda.init()
//     }
//   }
// )()
