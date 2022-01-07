import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VMdEditor from './plugins/v-md-editor'
import { vantPlugins } from './plugins/vant'
import 'vant/lib/index.css'
import './assets/scss/common.scss'

createApp(App).use(router).use(vantPlugins).use(VMdEditor).mount('#app')
