import { getNotes } from '@/api/notes'
import { NoteRes } from '@/api/notes'
import { reactive, ref } from '@vue/reactivity'
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

// const sortByTime = (a: Article, b: Article) => {
//   return Date.parse(b.time) - Date.parse(a.time)
// }

// todo: 去除md格式...
// 匹配“$#+ ”？
const getTitle = (text: string) => {
  const ll = text.trimLeft().split('\n')
  return ll[0].length > 63 ? `${ll[0].slice(0, 63)}...` : ll[0]
}

const getAbstract = (text: string) => {
  text = text.replace(/\n+/, '\n')
  const ll = text.trimLeft().split('\n')
  return ll[1] ? ll.slice(1, ll.length).join(' ') : ll[0]
}
// getNotes({where: JSON.stringify({ pinned: true })}) 获取所有置顶文章

const getArticleFromNote = (res: NoteRes[]): Article[] => {
  return res.map((x, idx) => {
    const content = decode(x.content)
    const time = new Date(x.updatedAt).toLocaleString('zh', { hour12: false })
    return {
      title: getTitle(content),
      abstract: getAbstract(content),
      time,
      id: idx,
      postId: x.objectId,
      tags: getTag(x.tags),
      pinned: x.pinned
    }
  })
}

const useArticle = () => {
  const pinnedArticleList = ref<Article[]>()
  const articleList = ref<Article[]>([])
  const status = reactive({
    loading: true,
    loadingMore: false,
    finished: false,
    error: false
  })
  const pageNum = ref(1)
  const totalPages = ref(1)
  const notesPerPage = 10

  // 获取一页非置顶文章（之后还要传入pinnedIds）
  const getArticlePage = async (): Promise<void> => {
    const query = {
      where: JSON.stringify({ pinned: { $ne: true } }),
      // where: JSON.stringify({ postId: { $nin: pinnedIds } }),
      limit: notesPerPage,
      skip: pageNum.value * notesPerPage - notesPerPage,
      count: 1
    }
    pageNum.value += 1
    try {
      const res = await getNotes(query)
      if (typeof res.count === 'number') {
        totalPages.value = Math.ceil(res.count / notesPerPage)
        // console.log(`共${res.count}篇非置顶笔记，分为${totalPages.value}页`)
      }
      articleList.value = [
        ...articleList.value,
        ...getArticleFromNote(res.results)
      ]
      status.loadingMore = false
      if (pageNum.value > totalPages.value) {
        // console.log(`已加载${articleList.value.length}篇非置顶笔记。`)
        status.finished = true
      }
    } catch (error) {
      pageNum.value -= 1
      console.log('getArticlePage失败：', error)
      status.error = true
    }
  }

  const getArticleList = async (): Promise<void> => {
    // const pinnedIds = await getPinnedIds()

    // 获取所有置顶文章
    const queryPinned = {
      where: JSON.stringify({ pinned: true })
      // where: JSON.stringify({ postId: {$in: pinnedIds} })
    }
    const res = await getNotes(queryPinned)
    pinnedArticleList.value = getArticleFromNote(res.results)

    // 获取一页非置顶文章
    getArticlePage()

    // 选出置顶的
    // const topArticles: Article[] = articles.filter((x) => x.pinned === true)

    // 非置顶的
    // const otherArticles: Article[] = articles.filter((x) => x.pinned === false)

    // 按时间从新到旧排序
    // topArticles.sort(sortByTime)
    // otherArticles.sort(sortByTime)

    // pinnedArticleList.value = topArticles
    // articleList.value = otherArticles
  }

  onMounted(async () => {
    await getArticleList()
    status.loading = false
  })

  return {
    status,
    articleList,
    pinnedArticleList,
    getArticleList,
    getArticlePage
  }
}

export { useArticle }
