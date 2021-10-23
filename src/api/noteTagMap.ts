import axios from '@/api'
import qs from 'querystring'
import { Pointer, Query, getUser } from '@/utils/getPointer'
import { queryTags, TagRes } from '@/api/tag'
import { queryNotes, NoteRes } from '@/api/notes'

// 查询map
export const queryNoteTagMap = (
  query: Query
): Promise<{
  results: {
    note: Pointer
    tag: Pointer
    objectId: string
  }[]
}> => {
  return axios.get(`/1.1/classes/NoteTagMap?${qs.stringify(query)}`)
}

// 创建一个新的map（用于建立关联）
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

// 删除map（删除笔记/标签时要删除相应的关联【把objId存为Array】；删除关联时要删除笔记/标签对其的引用...现在没有引用...）
export const delNoteTagMap = (objId: string) => {
  return axios.delete(`/1.1/classes/NoteTagMap/${objId}`)
}

// --应用：通过map实现tag和note的互相查询

// 查询tag列表（根据noteId）
export const queryTagsByNote = async (
  noteId: string
): Promise<{ results: TagRes[] }> => {
  const results = await queryNoteTagMap({
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
  // console.log(tagList)
  return queryTags({ where: JSON.stringify({ objectId: { $in: tagList } }) })
}

// 查询note列表（根据tagId）
export const queryNotesByTag = async (
  tagId: string
): Promise<{ results: NoteRes[] }> => {
  const results = await queryNoteTagMap({
    where: JSON.stringify({
      tag: {
        __type: 'Pointer',
        className: 'Tag',
        objectId: tagId
      }
    })
  })
  // 从results得到results.tag.objectId
  const noteList = results.results.map((x) => x.tag.objectId)
  // console.log(noteList)
  return queryNotes({ where: JSON.stringify({ objectId: { $in: noteList } }) })
}
