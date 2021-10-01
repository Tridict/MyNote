import * as LC from 'leancloud-storage'
import { UserObject } from 'leancloud-storage'
import { Notify } from 'vant'

// return boolean表示是否init成功
export const initLc = (keys: {
  appId: string
  appKey: string
  serverURL: string
}): boolean => {
  try {
    LC.init(keys)
    return true
  } catch (error) {
    Notify(`${error}`)
    return false
  }
}

export const signup = (param: {
  username: string
  password: string
  email: string
}): Promise<UserObject> => {
  return LC.User.signUp(param)
}

export const login = (param: {
  username: string
  password: string
}): Promise<UserObject> => {
  return LC.User.login(param.username, param.password)
}

// return boolean表示是否logOut成功
export const logout = (): boolean => {
  try {
    LC.User.logOut()
    return true
  } catch (error) {
    Notify(`${error}`)
    return false
  }
}

// 返回currentUser
export const getUser = (): UserObject => {
  return LC.User.current()
}
