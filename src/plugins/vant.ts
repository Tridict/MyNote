import {
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Empty,
  Form,
  Field,
  Icon,
  Loading,
  List,
  NavBar,
  Popup,
  Row,
  Switch,
  SwipeCell,
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
  Checkbox,
  CheckboxGroup,
  Empty,
  Form,
  Field,
  Icon,
  Loading,
  List,
  NavBar,
  Popup,
  Row,
  Switch,
  SwipeCell,
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
