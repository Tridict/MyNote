import axios from '@/api'
import store from '@/utils/stores'

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
export const createNote = (noteContent: string, currentUser = getUser()): Promise<{
  createdAt: string
  objectId: string
}> => {
  return axios.post(`/1.1/classes/Note`, {
    content: noteContent,
    owner: currentUser,
    ACL: {
      [currentUser.objectId]: { write: true, read: true }
    }
  })
}

// TODO：批量创建笔记（批量导入的处理——）
// 参考：批量操作（这是批量发送请求，包括增删改）https://leancloud.cn/docs/rest_api.html#hash787692837

// 保存（更新）笔记
export const updateNote = (
  params: { noteContent: string, postId: string },
  currentUser = getUser()
) => {
  return axios.put(`/1.1/classes/Note/${params.postId}`, {
    content: params.noteContent,
    owner: currentUser
  })
}

// 删除笔记
export const delNote = (
  postId: string,
) => {
  return axios.delete(`/1.1/classes/Note/${postId}`)
}

// 分析公众号文章链接
export const spy = (url: string) => {
  return axios.post(`/1.1/functions/spy`, {
    url,
    setting: {
      meta: [
        {
          selector: 'h2#activity-name',
          output_map: { class: 'meta', meta_key: 'title', meta_value: '__text' }
        },
        {
          selector: '#profileBt #js_name',
          output_map: {
            class: 'meta',
            meta_key: 'channel',
            meta_value: '__text'
          }
        },
        {
          selector: 'meta[name=author]',
          output_map: {
            class: 'meta',
            meta_key: 'author',
            meta_value: '@content'
          }
        },
        {
          selector: 'meta[name=description]',
          output_map: {
            class: 'meta',
            meta_key: 'description',
            meta_value: '@content'
          }
        }
      ],
      content: [
        {
          selector: '#js_content',
          output_map: {
            class: 'article_field',
            meta_key: 'abstract',
            meta_value: '__text_abstract'
          }
        }
      ]
    }
  })
}
