import axios from '@/api'
import { getUser } from '@/utils/getPointer'

// 创建一个新的标签
const createTag = (
  tagName: string,
  currentUser = getUser()
): Promise<{
  createdAt: string
  objectId: string
}> => {
  return axios.post(`/1.1/classes/Tag/`, { tagName, owner: currentUser })
}

// 创建一个新的关联
const createNoteTagMap = (
  tagId: string,
  postId: string,
  currentUser = getUser()
): Promise<{
  createdAt: string
  objectId: string
}> => {
  return axios.post(`/1.1/classes/NoteTagMap/`, {
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

// 查询标签列表
export const getTags = (): Promise<{ results: any[] }> => {
  return axios.get(`/1.1/classes/Tag`)
}

// 更新单个标签（改名）
export const updateTag = (
  params: { tagName: string; tagId: string },
  currentUser = getUser()
) => {
  return axios.put(`/1.1/classes/Tag/${params.tagId}`, {
    tagName: params.tagName,
    owner: currentUser
  })
}

// 删除标签
export const delTag = (tagId: string) => {
  return axios.delete(`/1.1/classes/Tag/${tagId}`)
}

// 删除关联（删除笔记/标签时要删除相应的关联【把objId存为Array】；删除关联时要删除笔记/标签对齐的引用...）
export const delNoteTagMap = (objId: string) => {
  return axios.delete(`/1.1/classes/NoteTagMap/${objId}`)
}

// 给Notes添加标签
export const addTag = async (params: {
  newTag: string
  oldTags: string[]
  postId: string
}) => {
  // 新增tag（若没有提供现成的tag id）
  const tag = await createTag(newTag)

  // 设置关联：在map中新增
  createNoteTagMap(tag.objectId, params.postId)

  // 在note表中写入关联
  return axios.put(`/1.1/classes/Note/${params.postId}`, {
    tags: [...params.oldTags, params.newTag]
  })
}
