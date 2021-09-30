export type Article = {
  title: string
  abstract: string
  time: string
  id: number
  tags?: {
    id: number
    text: string
    color?: string
  }[]
}

export const articleList: Article[] = [
  {
    title: '原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let 飞机都是减肥i哦饿减肥i饿哦减肥晚饭急哦饿我就哦饭；饿减肥i额外加',
    time: '2021-5-9 21:24',
    id: 0,
    tags: [
      { id: 1, text: '前端' },
      { id: 2, text: 'JS' },
      { id: 3, text: '笔记', color: '#F891A5' }
    ]
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 1
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值以及凑字数分为i哦饭居委的',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 20
  },
  {
    title: 'todos',
    abstract: '深色模式；（接入LeanCloud）登录、保存笔记；根据笔记id的路由',
    time: '2021-5-9 21:24',
    id: 10
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 23
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 6
  }
]
