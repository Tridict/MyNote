interface lgLocalStorageFunc<T> {
  (name: string, value: T): T | null
}

// 存取 LocalStorage
export const lgLocalStorage: lgLocalStorageFunc<any> = (
  name: string,
  value?: any
): any | null => {
  if (value) {
    // 存
    const item = JSON.stringify(value)
    window.localStorage.setItem(name, item)
    return value
  } else {
    // 取
    return JSON.parse(localStorage.getItem(name))
  }
}

export const clearAllLocalStorage = (): void => {
  window.localStorage.clear()
}

export const getQueryParams = (args: string[]): string | undefined => {
  if (args.length === 0) return undefined
  const url = decodeURIComponent(window.location.href)
  const reg =
    args.length === 1
      ? new RegExp(`[&?]${args[0]}=([^&%#]+)`)
      : new RegExp(`[&?](?:${args.join('|')})=([^&%#]+)`)
  const matchArray = url.match(reg)
  return matchArray === null ? undefined : matchArray[1]
}
