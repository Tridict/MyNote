import store from '@/utils/stores'

export interface Pointer {
  __type: string
  className: string
  objectId: string
}

// 参考：[查询约束](https://leancloud.cn/docs/rest_api.html#hash827796182)
export interface Query {
  order?: string // 排序，可以是索引名称 'createdAt' '-createdAt' 'updatedAt' '-updatedAt' 还可以是组合（例如'createdAt,-pubUser' 以 createdAt 升序和 pubUser 降序进行排序）
  limit?: number // 获取几条数据
  skip?: number // 从第几条开始获取
  where?: string // JSON.stringify(object) 根据列名称条件筛选
  keys?: string // 限定返回的字段（只返回某些列，或者不返回某些列）
  include?: string // 不确定，请查文档确认
  [key: string]: string | number | undefined
}

export const getUser = (userId?: string): Pointer => {
  userId = userId || store.get('LcUserInfo')?.objectId
  // console.log('userId', userId)
  return {
    __type: 'Pointer',
    className: '_User',
    objectId: userId || ''
  }
}

// export const getTag = (id: string): User => {
//   return {
//     __type: 'Pointer',
//     className: 'Tag',
//     objectId: id || ''
//   }
// }

// export const getNote = (id: string): User => {
//   return {
//     __type: 'Pointer',
//     className: 'Note',
//     objectId: id || ''
//   }
// }
