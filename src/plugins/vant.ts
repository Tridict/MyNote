import {
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Form,
  Field,
  Icon,
  NavBar,
  Notify,
  Switch,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  Uploader
} from 'vant'

const pluginsVant = [
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Form,
  Field,
  Icon,
  NavBar,
  Notify,
  Switch,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  Uploader
]

import { App } from 'vue'

export const vantPlugins = {
  install: function (app: App): void {
    pluginsVant.forEach((item) => {
      app.component(item.name, item)
    })
  }
}
