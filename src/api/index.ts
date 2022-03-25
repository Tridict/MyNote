import axios from 'axios'
import store from '@/utils/stores'
import md5 from 'md5'

// 计算 X-LC-Sign 的签名方法
const sign = (key: string, isMasterKey: boolean) => {
  const now = new Date().getTime()
  const signature = md5(now + key)
  if (isMasterKey) {
    return `${signature},${now},master`
  }
  return `${signature},${now}`
}

// axios添加headers
// 用法参考 https://github.com/leancloud/javascript-sdk/blob/6a0ec85d1773e6d81df7a575ec28008b6b685a1f/src/app/app.ts#L112
// 文档参考 https://leancloud.cn/docs/rest_api.html#hash1094926014
interface Headers {
  'Content-Type': string
  'X-LC-Id': string
  'X-LC-Sign'?: string
  'X-LC-Key'?: string
  'X-LC-Session'?: string
  'X-LC-UA'?: string // 如果用库，则为LeanCloud-JS-SDK/5.0.0-dev (Browser)
  'X-LC-Prod'?: string // 指定 hook 函数调用环境
}

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const defaultKeys = {
      appId: 'Sn7epEpMHrwb8p89cmJsxtTp-gzGzoHsz',
      key: '1Yoy523hgg3k3PLFjIHlPpwm',
      BASE_URL: 'https://api.nlpsun.cn'
    }
    // const { BASE_URL, appId, key } = defaultKeys
    const { BASE_URL, appId, key } = store.getLocal('leanCloudKeys') || defaultKeys
    

    const sessionToken = store.get('LcUserInfo')?.sessionToken

    config.baseURL = BASE_URL
    const headers: Headers = {
      'Content-Type': 'application/json',
      'X-LC-Id': appId,
      'X-LC-Sign': sign(key, false),
      'X-LC-Session': sessionToken
      // 'X-LC-UA': ua,
      // 'X-LC-Prod': this.production ? void 0 : '0',
    }
    config.headers = headers
    return config
  },
  function (error) {
    // 对请求错误做些什么
    // console.log(error)
    return Promise.reject(error)
  }
)

//添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.status == 200 && response.data) {
      return response.data
    } else if (response.status == 201 && response.data) {
      return response.data
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    // console.log('msg', error.message)
    // console.log('error', error)
    let msg = error.message || error
    if (error.message.includes('403')) {
      msg = '您没有权限执行该操作'
    }
    return Promise.reject(msg)
  }
)

export default axios
