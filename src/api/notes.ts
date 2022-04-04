import { encode } from 'js-base64'
import axios from '@/api'
import qs from 'querystring'
import store from '@/utils/stores'
import { Pointer, Query, getUser } from './utils/getPointer'
import { Tag } from '@/views/notes/utils/useTag'

export interface NoteRes {
  content: string
  deleted: boolean
  isDraft: boolean
  isPublicRead?: boolean
  isPublicWrite?: boolean
  pinned?: boolean
  tags?: Tag[]
  owner: Pointer
  objectId: string
  createdAt: string
  updatedAt: string
}

// 读取所有笔记
export const getAllNotes = (): Promise<{ results: NoteRes[] }> => {
  return axios.get(`/1.1/classes/Note`)
}

// 查询笔记
export const queryNotes = (
  // 默认获取非置顶文章
  query: Query = {
    where: JSON.stringify({ pinned: { $ne: true } })
  }
): Promise<{ results: NoteRes[]; count?: string | number }> => {
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

// 创建一篇新的笔记
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
    }
  })
}

// 保存（更新）单篇笔记
export const updateNote = (
  params: { noteContent: string; postId: string; tags?: Tag[] },
  currentUser = getUser()
) => {
  return axios.put(`/1.1/classes/Note/${params.postId}`, {
    content: encode(params.noteContent),
    owner: currentUser,
    tags: params.tags || []
  })
}

// 删除笔记（要删除对应的map）
export const delNote = (postId: string) => {
  return axios.delete(`/1.1/classes/Note/${postId}`)
}

// 公开笔记————会遇到不能add fields的问题？？？
export const makePublicNote = (postId: string, editable = false) => {
  const userId = store.get('LcUserInfo')?.objectId
  if (editable) {
    return axios.put(`/1.1/classes/Note/${postId}`, {
      isPublicRead: true,
      isPublicWrite: true,
      ACL: { '*': { write: true, read: true } }
    })
  } else {
    return axios.put(`/1.1/classes/Note/${postId}`, {
      isPublicRead: true,
      ACL: { [userId]: { write: true }, '*': { read: true } }
    })
  }
}

// 取消公开
export const cancelPublicNote = (postId: string) => {
  const userId = store.get('LcUserInfo')?.objectId
  return axios.put(`/1.1/classes/Note/${postId}`, {
    isPublicRead: false,
    isPublicWrite: false,
    ACL: {
      [userId]: { write: true, read: true }
    }
  })
}

export const getPinnedIds = (): Promise<{
  results: { pinnedNotes: string[]; objectId: string }[]
}> => {
  return axios.get(`/1.1/classes/Settings?keys=pinnedNotes`)
}

// 置顶/取消置顶
export const pinnedNote = (postId: string, oldPinned: boolean | undefined) => {
  let pinnedIds = store.get('LcPinnedIds')
  if (oldPinned) {
    // 删除
    pinnedIds = pinnedIds.filter((x: string) => x !== postId)
  } else {
    // 新增
    pinnedIds.push(postId)
  }
  // 更新settings
  const settingId = store.get('LcSettingId')
  return axios
    .put(`/1.1/classes/Settings/${settingId}`, {
      pinnedNotes: pinnedIds
    })
    .then(() => {
      store.setSession('LcPinnedIds', pinnedIds)
    })
  // return axios.put(`/1.1/classes/Note/${postId}`, {
  //   pinned: !oldPinned
  // })
}

// 分享笔记给指定用户（需要用户的objectId -- 如何查询？？sharedTo字段写）
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
    sharedTo: [...oldSharedTo, sharedUserId]
  })
}

// TODO：批量创建笔记（批量导入的处理——）
// 参考：批量操作（这是批量发送请求，包括增删改）https://leancloud.cn/docs/rest_api.html#hash787692837
