import {
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Form,
  Field,
  Icon,
  Loading,
  NavBar,
  Switch,
  Skeleton,
  Tabbar,
  TabbarItem,
  Tag,
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
  Loading,
  NavBar,
  Switch,
  Skeleton,
  Tabbar,
  TabbarItem,
  Tag,
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
