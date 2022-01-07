import { queryNotes, getPinnedIds } from '@/api/notes'
import { NoteRes } from '@/api/notes'
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { decode } from 'js-base64'
import store from '@/utils/stores'
import { Tag } from '@/utils/notes/useTag'

export interface Article {
  title: string
  abstract: string
  time: string
  id: number
  postId: string
  tags?: Tag[]
  pinned?: boolean
}

// export const getTagObj = (tags: string[] | undefined) => {
//   const tagObj: Tag[] = []
//   if (tags === undefined) return tagObj
//   for (const i in tags) {
//     tagObj.push({ id: +i, text: tags[i], objId: 'aaaa' })
//   }
//   return tagObj
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
      tags: x.tags,
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

  // 获取一页非置顶文章
  const getArticlePage = async (): Promise<void> => {
    const pinnedIds = store.get('LcPinnedIds')
    const query = {
      // where: JSON.stringify({ pinned: { $ne: true } }),
      where: JSON.stringify({ objectId: { $nin: pinnedIds } }),
      limit: notesPerPage,
      skip: pageNum.value * notesPerPage - notesPerPage,
      count: 1
    }
    pageNum.value += 1
    try {
      const res = await queryNotes(query)
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

  const initArticleList = async (): Promise<void> => {
    const pinnedIds = await getPinnedIds().then((res) => {
      store.setSession('LcSettingId', res.results[0].objectId)
      return res.results[0].pinnedNotes
    })
    store.setSession('LcPinnedIds', pinnedIds)

    // 获取所有置顶文章
    const queryPinned = {
      // where: JSON.stringify({ pinned: true })
      where: JSON.stringify({ objectId: { $in: pinnedIds } })
    }
    const res = await queryNotes(queryPinned)
    pinnedArticleList.value = getArticleFromNote(res.results)

    // 获取一页非置顶文章
    getArticlePage()
  }

  // 刷新列表
  const getArticleList = async (): Promise<void> => {
    pageNum.value = 1
    articleList.value = []
    status.finished = false
    await initArticleList()
  }

  onMounted(async () => {
    await initArticleList()
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
