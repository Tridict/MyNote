import axios from '@/api'
import qs from 'querystring'
import { Pointer, Query, getUser } from '@/api/utils/getPointer'

export interface TagRes {
  tagName: string
  owner: Pointer
  objectId: string
  createdAt: string
  updatedAt: string
}

// 获取所有tags
export const getAllTags = (): Promise<{ results: TagRes[] }> => {
  return axios.get(`/1.1/classes/Tag`)
}

// 查询tag
export const queryTags = (query: Query): Promise<{ results: TagRes[] }> => {
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
export const updateTag = (params: { tagName: string; tagId: string }) => {
  return axios.put(`/1.1/classes/Tag/${params.tagId}`, {
    tagName: params.tagName
  })
}

// 删除tag（要删除对应的map）
export const delTag = (tagId: string) => {
  return axios.delete(`/1.1/classes/Tag/${tagId}`)
}
