import { getNotes } from '@/api/notes'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { decode } from 'js-base64'

interface Tag {
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
}

const useArticle = () => {
  const articleList = ref<Article[]>()
  
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
