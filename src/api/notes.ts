import axios from '@/api'
import store from '@/utils/stores'
import { encode } from 'js-base64'

interface User {
  __type: string
  className: string
  objectId: string
}

const getUser = (userId?: string): User => {
  userId = userId || store.get('LC_userinfo')?.objectId
  // console.log('userId', userId)
  return {
    __type: 'Pointer',
    className: '_User',
    objectId: userId || ''
  }
}

interface NoteRes {
  content: string
  createdAt: string
  deleted: boolean
  is_draft: boolean
  is_public_read?: boolean
  is_public_write?: boolean
  objectId: string
  owner: User
  pinned: boolean
  tags?: string[]
  updatedAt: string
}

// 读取笔记列表
// todo: 增加页码 & 一次获取一页（用query？）
export const getNotes = (): Promise<{ results: NoteRes[] }> => {
  return axios.get(`/1.1/classes/Note`)
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

export const addTag = (params: { tags: string[]; postId: string }) => {
  return axios.put(`/1.1/classes/Note/${params.postId}`, {
    tags: JSON.stringify(params.tags)
  })
}

// 公开笔记（所有用户可读）————会遇到不能add fields的问题？？？
export const publicNote = (postId: string) => {
  const userId = store.get('LC_userinfo')?.objectId
  return axios.put(`/1.1/classes/Note/${postId}`, {
    is_public_read: true,
    tags: [{
      "__type": "Pointer",
      "className": "Tag",
      "objectId": "615851e1ec1d407bb22da428"
    }],
    ACL: { [userId]: {write: true},'*': { read: true } }
  })
}

// 置顶笔记：需要在排序上、展示上配套；还有和取消置顶配套...
export const pinnedNote = (postId: string) => {
  return axios.put(`/1.1/classes/Note/${postId}`, {
    pinned: true
  })
}

// 分享笔记给指定用户（需要用户的objectId -- 如何查询？？）
export const shareNote = (
  ACL: { [key: string]: { write: boolean; read: boolean } },
  postId: string
) => {
  return axios.put(`/1.1/classes/Note/${postId}`, {
    ACL
  })
}

// 删除笔记
export const delNote = (postId: string) => {
  return axios.delete(`/1.1/classes/Note/${postId}`)
}

// TODO：批量创建笔记（批量导入的处理——）
// 参考：批量操作（这是批量发送请求，包括增删改）https://leancloud.cn/docs/rest_api.html#hash787692837
