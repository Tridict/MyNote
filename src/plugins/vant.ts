import {
  Button,
  Cell,
  CellGroup,
  Form,
  Field,
  Icon,
  Switch,
  NavBar,
  Tabbar,
  TabbarItem,
  Tag,
  Toast
} from 'vant'

const pluginsVant = [
  Button,
  Cell,
  CellGroup,
  Form,
  Field,
  Icon,
  Switch,
  NavBar,
  Tabbar,
  TabbarItem,
  Tag,
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
