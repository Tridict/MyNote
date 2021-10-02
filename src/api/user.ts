import axios from '@/api'

interface SignUpRes {
  sessionToken: string
  objectId: string
  createdAt: string // UTC 时间戳
}

interface LoginRes extends SignUpRes {
  updatedAt: string // UTC 时间戳
  phone?: string
  username: string
  emailVerified: boolean
  mobilePhoneVerified: boolean
}

// 微信或qq的，其他第三方平台不一样
interface WechatAuthParams {
  openid: string
  access_token: string
  expires_in: string
}

interface SignUpWechatRes extends SignUpRes {
  updatedAt: string
  username: string
  authData: {
    wechat: WechatAuthParams
  }
}

// 用户登录
export const login = (params: {
  username: string
  password: string
}): Promise<LoginRes> => {
  return axios.post('/1.1/login', params)
}

// 用户注册
export const signUp = (params: {
  username: string
  password: string
}): Promise<SignUpRes> => {
  return axios.post('/1.1/users', params)
}

// 微信登录或注册
export const signUpWechat = (
  params: WechatAuthParams
): Promise<SignUpWechatRes> => {
  return axios.post('/1.1/users', { authData: { wechat: params } })
}

// 绑定微信
export const bindWechat = (
  params: WechatAuthParams
): Promise<SignUpWechatRes> => {
  return axios.post('/1.1/users', { authData: { wechat: params } })
}

// 用户修改密码
export const updatePassword = (
  params: {
    old_password: string
    new_password: string
  },
  objectId: string
): Promise<SignUpRes> => {
  return axios.put(`/1.1/users/${objectId}/updatePassword`, params)
}

// 获取用户列表: 403, 没有find权限----如果开放find权限则会暴露所有用户的objectId
// export const getUserList = () => {
//   return axios.get(`/1.1/users`)
// }

