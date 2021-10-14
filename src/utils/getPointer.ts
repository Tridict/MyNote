import store from '@/utils/stores'

export interface User {
  __type: string
  className: string
  objectId: string
}

export const getUser = (userId?: string): User => {
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
