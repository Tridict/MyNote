import {
  Button,
  Form,
  Field,
  Cell,
  CellGroup,
  Switch,
  Tabbar,
  TabbarItem,
  Toast
} from 'vant'

const pluginsVant = [
  Button,
  Form,
  Field,
  Cell,
  CellGroup,
  Switch,
  Tabbar,
  TabbarItem,
  Toast
]

import { App } from 'vue'

export const vantPlugins = {
  install: function (app: App): void {
    pluginsVant.forEach((item) => {
      app.component(item.name, item)
    })
  }
}
