import { getNotes } from '@/api/notes'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { decode } from 'js-base64'

export interface Tag {
  id: number
  text: string
  color?: string
}
export interface Article {
  title: string
  abstract: string
  time: string
  id: number
  postId: string
  tags?: Tag[]
  pinned?: boolean
}

export const getTag = (tags: string[] | undefined) => {
  const tagObj: Tag[] = []
  if (tags === undefined) return tagObj
  for (const i in tags) {
    tagObj.push({ id: +i, text: tags[i] })
  }
  return tagObj
}

const sortByTime = (a: Article, b: Article) => {
  return Date.parse(b.time) - Date.parse(a.time)
}

const useArticle = () => {
  const pinnedArticleList = ref<Article[]>()
  const articleList = ref<Article[]>()

  const getArticleList = async (): Promise<void> => {
    const res = await getNotes()
    const articles: Article[] = res.results.map((x, idx) => {
      const content = decode(x.content)
      const time = new Date(x.updatedAt).toLocaleString('zh', { hour12: false })
      return {
        title: content.split('\n')[0],
        abstract: content.slice(0, 400),
        time,
        id: idx,
        postId: x.objectId,
        tags: getTag(x.tags),
        pinned: x.pinned
      }
    })

    // 选出置顶的
    const topArticles: Article[] = articles.filter((x) => x.pinned === true)

    // 非置顶的
    const otherArticles: Article[] = articles.filter((x) => x.pinned === false)

    // 按时间从新到旧排序
    topArticles.sort(sortByTime)
    otherArticles.sort(sortByTime)

    pinnedArticleList.value = topArticles
    articleList.value = otherArticles
  }

  onMounted(getArticleList)

  return { articleList, pinnedArticleList, getArticleList }
}

export { useArticle }
