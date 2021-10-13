import { encode } from 'js-base64'
import axios from '@/api'
import qs from 'querystring'
import store from '@/utils/stores'
import { User, getUser } from '@/utils/getPointer'

export interface NoteRes {
  content: string
  createdAt: string
  deleted: boolean
  is_draft: boolean
  is_public_read?: boolean
  is_public_write?: boolean
  objectId: string
  owner: User
  pinned?: boolean
  tags?: string[]
  updatedAt: string
}

// 参考：[查询约束](https://leancloud.cn/docs/rest_api.html#hash827796182)
interface Query {
  order?: string // 排序，可以是索引名称 'createdAt' '-createdAt' 'updatedAt' '-updatedAt' 还可以是组合（例如'createdAt,-pubUser' 以 createdAt 升序和 pubUser 降序进行排序）
  limit?: number // 获取几条数据
  skip?: number // 从第几条开始获取
  where?: string // JSON.stringify(object) 根据列名称条件筛选
  keys?: string // 限定返回的字段（只返回某些列，或者不返回某些列）
  [key: string]: string | number | undefined
}

// 读取笔记列表
export const getAllNotes = (): Promise<{ results: NoteRes[] }> => {
  return axios.get(`/1.1/classes/Note`)
}

export const getNotes = (
  // 默认获取非置顶文章
  query: Query = {
    where: JSON.stringify({ pinned: { $ne: true } })
  }
): Promise<{ results: NoteRes[] }> => {
  // 默认按更新时间倒序
  if (!query.order) {
    query.order = '-updatedAt'
  }
  return axios.get(`/1.1/classes/Note?${qs.stringify(query)}`)
}

// 读取单篇笔记
export const getNote = (postId: string): Promise<NoteRes> => {
  return axios.get(`/1.1/classes/Note/${postId}`)
}

// 创建笔记
export const createNote = (
  noteContent: string,
  currentUser = getUser()
): Promise<{
  createdAt: string
  objectId: string
}> => {
  return axios.post(`/1.1/classes/Note`, {
    content: encode(noteContent),
    owner: currentUser,
    ACL: {
      [currentUser.objectId]: { write: true, read: true }
    },
    pinned: false,
    tags: [],
    is_public_read: false,
    is_public_write: false,
    shared_to: [],
    deleted: false
  })
}

// 保存（更新）笔记
export const updateNote = (
  params: { noteContent: string; postId: string },
  currentUser = getUser()
) => {
  return axios.put(`/1.1/classes/Note/${params.postId}`, {
    content: encode(params.noteContent),
    owner: currentUser
  })
}

// 公开笔记————会遇到不能add fields的问题？？？
export const makePublicNote = (postId: string, editable = false) => {
  const userId = store.get('LC_userinfo')?.objectId
  if (editable) {
    return axios.put(`/1.1/classes/Note/${postId}`, {
      is_public_read: true,
      is_public_write: true,
      ACL: { '*': { write: true, read: true } }
    })
  } else {
    return axios.put(`/1.1/classes/Note/${postId}`, {
      is_public_read: true,
      ACL: { [userId]: { write: true }, '*': { read: true } }
    })
  }
}

// 取消公开
export const cancelPublicNote = (postId: string) => {
  const userId = store.get('LC_userinfo')?.objectId
  return axios.put(`/1.1/classes/Note/${postId}`, {
    is_public_read: false,
    is_public_write: false,
    ACL: {
      [userId]: { write: true, read: true }
    }
  })
}

// 置顶/取消置顶
export const pinnedNote = (postId: string, oldPinned: boolean | undefined) => {
  return axios.put(`/1.1/classes/Note/${postId}`, {
    pinned: !oldPinned
  })
}

// 分享笔记给指定用户（需要用户的objectId -- 如何查询？？shared_to字段写）
export const shareNote = (
  sharedUserId: string,
  postId: string,
  oldACL: { [key: string]: { write: boolean; read: boolean } },
  oldSharedTo: string[]
) => {
  const ACL = Object.assign(
    { [sharedUserId]: { write: true, read: true } },
    oldACL
  )
  return axios.put(`/1.1/classes/Note/${postId}`, {
    ACL,
    shared_to: [...oldSharedTo, sharedUserId]
  })
}

// 删除笔记
export const delNote = (postId: string) => {
  return axios.delete(`/1.1/classes/Note/${postId}`)
}

// TODO：批量创建笔记（批量导入的处理——）
// 参考：批量操作（这是批量发送请求，包括增删改）https://leancloud.cn/docs/rest_api.html#hash787692837
