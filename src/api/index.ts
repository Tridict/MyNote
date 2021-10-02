// const getSign = (key: string) => {
//   const timestamp = ''

//   // 将 timestamp 加上 App Key 或 Master Key 组成的字符串，再对它做 MD5 签名后的结果。
//   const sign = ''

//   // 返回X-LC-Sign，
//   return [sign, timestamp]
// }

import axios from 'axios'
import store from '@/utils/stores'

// const sign = getSign(key)

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
    const { BASE_URL, appId, key } = store.getLocal('leanCloudKeys')
    const sessionToken = store.get('LC_userinfo')?.sessionToken

    config.baseURL = BASE_URL
    const headers: Headers = {
      'Content-Type': 'application/json',
      'X-LC-Id': appId,
      'X-LC-Key': key,
      'X-LC-Session': sessionToken
      // 'X-LC-UA': ua,
      // 'X-LC-Prod': this.production ? void 0 : '0',
    }
    // if (sessionToken) {
    //   headers['X-LC-Session'] = sessionToken
    // }
    // if (config.headers['Content-Type']) {
    //   headers['Content-Type'] = config.headers['Content-Type']
    // }
    // config.headers = config.headers || headers
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
axios.interceptors.response.use(function (response) {
  if (response.status == 200 && response.data) {
    return response.data
  } else if (response.status == 201 && response.data) {
    return response.data
  } 
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios
