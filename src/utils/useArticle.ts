import { getNotes } from '@/api/notes'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { decode } from 'js-base64'

interface Tag {
  id: number
  text: string
  color?: string
}
interface Article {
  title: string
  abstract: string
  time: string
  id: number
  postId: string
  tags?: Tag[]
}

const useArticle = () => {
  const articleList = ref<Article[]>()
  // const articleList = ref<Article[]>([
  //   {
  //     title: '原始值与引用值',
  //     abstract:
  //       '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let 飞机都是减肥i哦饿减肥i饿哦减肥晚饭急哦饿我就哦饭；饿减肥i额外加',
  //     time: '2021-5-9 21:24',
  //     id: 0,
  //     tags: [
  //       { id: 1, text: '前端' },
  //       { id: 2, text: 'JS' },
  //       { id: 3, text: '笔记', color: '#F891A5' }
  //     ]
  //   },
  //   {
  //     title: '【前端】【笔记】【JS】原始值与引用值',
  //     abstract:
  //       '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
  //     time: '2021-5-9 21:24',
  //     id: 1
  //   },
  //   {
  //     title: '【前端】【笔记】【JS】原始值与引用值以及凑字数分为i哦饭居委的',
  //     abstract:
  //       '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
  //     time: '2021-5-9 21:24',
  //     id: 20
  //   },
  //   {
  //     title: 'todos',
  //     abstract: '深色模式；（接入LeanCloud）登录、保存笔记；根据笔记id的路由',
  //     time: '2021-5-9 21:24',
  //     id: 10
  //   },
  //   {
  //     title: '【前端】【笔记】【JS】原始值与引用值',
  //     abstract:
  //       '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
  //     time: '2021-5-9 21:24',
  //     id: 23
  //   },
  //   {
  //     title: '【前端】【笔记】【JS】原始值与引用值',
  //     abstract:
  //       '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
  //     time: '2021-5-9 21:24',
  //     id: 6
  //   }
  // ])

  const getArticleList = async (): Promise<void> => {
    const res = await getNotes()
    const articles: Article[] = res.results.map((x, idx) => {
      const content = decode(x.content)
      const tags: Tag[] = []
      const time = new Date(x.updatedAt).toLocaleString('zh', { hour12: false })
      if (x.tags) {
        for (const i in x.tags) {
          tags.push({ id: +i, text: x.tags[i] })
        }
      }
      return {
        title: content.split('\n')[0],
        abstract: content.slice(0, 400),
        time,
        id: idx,
        postId: x.objectId,
        tags
      }
    })
    // 按时间从新到旧排序
    articles.sort((a, b) => {
      return Date.parse(b.time) - Date.parse(a.time)
    })
    articleList.value = articles
  }

  onMounted(getArticleList)

  return { articleList, getArticleList }
}

export { useArticle }
