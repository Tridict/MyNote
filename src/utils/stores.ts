const appName = 'mynote'

interface Store {
  setLocal: (key: string, value: any) => void
  getLocal: (key: string) => any
  removeLocal: (key: string) => void
  setSession: (key: string, value: any) => void
  getSession: (key: string) => any
  get: (key: string) => any
}

const stores: Store = {
  setLocal,
  getLocal,
  removeLocal,
  setSession,
  getSession,
  get: readAll
}

function _serialize(obj: any) {
  return JSON.stringify(obj)
}

function _deserialize(str: string | null, defaultVal = '') {
  if (!str) return defaultVal
  let val = ''
  try {
    val = JSON.parse(str)
  } catch (e) {
    val = str
  }
  return val || defaultVal
}

function setLocal(key: string, value: any): void {
  if (value != undefined) {
    localStorage.setItem(`${appName}:${key}`, _serialize(value))
    // console.log(`存储成功！值为${getLocal(key)}`)
  }
}

function getLocal(key: string): any {
  return _deserialize(localStorage.getItem(`${appName}:${key}`))
}

function removeLocal(key: string): void {
  return localStorage.removeItem(`${appName}:${key}`)
}

function setSession(key: string, value: any) {
  if (value != undefined) {
    sessionStorage.setItem(`${appName}:${key}`, _serialize(value))
  }
}

function getSession(key: string): any {
  return _deserialize(sessionStorage.getItem(`${appName}:${key}`))
}

function readAll(key: string): any {
  return getLocal(key) || getSession(key)
}

export default stores
