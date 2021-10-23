import axios from '@/api'
import qs from 'querystring'
import { Pointer, Query, getUser } from '@/utils/getPointer'

export interface TagRes {
  tagName: string
  owner: Pointer
  objectId: string
  createdAt: string
  updatedAt: string
}

// 获取所有tags
export const getTags = (): Promise<{ results: TagRes[] }> => {
  return axios.get(`/1.1/classes/Tag`)
}

// 查询tag
export const queryTag = (query: Query): Promise<{ results: TagRes[] }> => {
  return axios.get(`/1.1/classes/Tag?${qs.stringify(query)}`)
}

// 创建一个新的tag
export const createTag = (
  tagName: string,
  currentUser = getUser()
): Promise<{
  createdAt: string
  objectId: string
}> => {
  return axios.post(`/1.1/classes/Tag`, { tagName, owner: currentUser })
}

// 更新单个tag（改名）
export const updateTag = (
  params: { tagName: string; tagId: string },
  currentUser = getUser()
) => {
  return axios.put(`/1.1/classes/Tag/${params.tagId}`, {
    tagName: params.tagName,
    owner: currentUser
  })
}

// 删除tag
export const delTag = (tagId: string) => {
  return axios.delete(`/1.1/classes/Tag/${tagId}`)
}

// --- tag ---

// --- map ---

// 创建一个新的map
export const createNoteTagMap = (
  tagId: string,
  postId: string,
  currentUser = getUser()
): Promise<{
  createdAt: string
  objectId: string
}> => {
  return axios.post(`/1.1/classes/NoteTagMap`, {
    note: {
      __type: 'Pointer',
      className: 'Note',
      objectId: postId
    },
    tag: {
      __type: 'Pointer',
      className: 'Tag',
      objectId: tagId
    },
    owner: currentUser
  })
}

// 删除map（删除笔记/标签时要删除相应的关联【把objId存为Array】；删除关联时要删除笔记/标签对齐的引用...）
export const delNoteTagMap = (objId: string) => {
  return axios.delete(`/1.1/classes/NoteTagMap/${objId}`)
}

// 查询map
export const getNoteTagMap = (
  query: Query
): Promise<{
  results: {
    note: Pointer
    tag: Pointer
  }[]
}> => {
  return axios.get(`/1.1/classes/NoteTagMap?${qs.stringify(query)}`)
}

// --- tag & map --

// 查询tag列表（根据noteId）
export const getTagsByNote = async (
  noteId: string
): Promise<{ results: TagRes[] }> => {
  const results = await getNoteTagMap({
    where: JSON.stringify({
      note: {
        __type: 'Pointer',
        className: 'Note',
        objectId: noteId
      }
    })
  })
  // 从results得到results.tag.objectId
  const tagList = results.results.map((x) => x.tag.objectId)
  console.log(tagList)
  return queryTag({ where: JSON.stringify({ objectId: { $in: tagList } }) })
  // return axios.get(`/1.1/classes/Tag`)
}

// 给Notes添加标签
// export const addTag = async (params: {
//   newTag: string
//   oldTags: string[]
//   postId: string
// }) => {
//   // 新增tag（若没有提供现成的tag id）
//   const tag = await createTag(params.newTag)

//   // 设置关联：在map中新增
//   createNoteTagMap(tag.objectId, params.postId)

//   // 在note表中写入关联
//   return axios.put(`/1.1/classes/Note/${params.postId}`, {
//     tags: [...params.oldTags, params.newTag]
//   })
// }
