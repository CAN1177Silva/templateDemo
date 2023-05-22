const toString = Object.prototype.toString

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArrayBuffer(val: any): boolean {
  return toString.call(val) === '[object ArrayBuffer]'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFormData(val: any): boolean {
  return typeof FormData !== 'undefined' && val instanceof FormData
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUndefined(val: any): boolean {
  return typeof val === 'undefined'
}

export function isObject(val: null): boolean {
  return val !== null && typeof val === 'object'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFile(val: any): boolean {
  return toString.call(val) === '[object File]'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBlob(val: any): boolean {
  return toString.call(val) === '[object Blob]'
}

/**
 *
 * @param {格式化时间} 小于10的首位添加0
 */
export function formatNumber(timeNum: number) {
  const newTimeNum = timeNum.toString()

  return newTimeNum[1] ? newTimeNum : `0${newTimeNum}`
}

/**
 *
 * @param date 根据事件戳返回时间显示
 */
export function formatTime(timeStamp: number) {
  const date = new Date()

  date.setTime(timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second]
    .map(formatNumber)
    .join(':')}`
}

interface IChangeTime {
  d: number
  h: number | string
  m: number | string
  s: number | string
}

/**
 * 时间转换时分秒
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function changeTime(time: any): IChangeTime {
  const date: IChangeTime = {
    d: 0,
    h: '',
    m: '',
    s: ''
  }

  date.d = Math.floor(time / 1000 / 60 / 60 / 24)

  date.h = Math.floor((time / 1000 / 60 / 60) % 24)
  date.h = date.h > 9 ? date.h : `0${date.h}`

  date.m = Math.floor((time / 1000 / 60) % 60)
  date.m = date.m > 9 ? date.m : `0${date.m}`

  date.s = Math.floor((time / 1000) % 60)
  date.s = date.s > 9 ? date.s : `0${date.s}`
  return date
}

/**
 * 获取url参数，如果传入key，就返回指定key的值
 * @param {String} key
 */
export function getQueryParam(key: string) {
  const searchParams = new URLSearchParams(window.location.search)

  if (key) {
    return searchParams.get(key) || ''
  }
  return ''
}

/**
 * 获取当前环境的通用路由
 */
export function getPrefixUrlByEnv() {
  const { href, host } = window.location
  let prefixUrl = ''
  if (href.includes('xiongmaoboshi')) {
    prefixUrl = `${host}/distribution`
  }
  return prefixUrl
}

/**
 * 上传文件
 * @param accept string 接受的文件类型
 * @param callback {Function} 回调
 */
export function selectFile(accept: string, callback: (file: File) => void) {
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = `${accept}`
  input.click()
  input.onchange = () => {
    const file = input.files && input.files[0]

    if (file && callback) {
      // eslint-disable-next-line callback-return
      callback(file)
    }
  }
}

export function getFullHost(): string {
  return `${window.location.protocol}//${window.location.host}`
}

export function isLocal(): boolean {
  // 懒得匹配 带端口的统一视为本地开发
  // const reg = /localhost|(127.0.0.1)|(10.)/

  const reg = /:([0-9]{4})/
  return window.location.host.search(reg) > 0
}

/** 获取字符字节长度 */
export const getByteLength = (value = '') => {
  let bytesCount = 0
  for (let i = 0, n = value.length; i < n; i++) {
    const c = value.charCodeAt(i)
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      bytesCount += 1
    } else {
      bytesCount += 2
    }
  }
  return bytesCount
}

/** 精确判断数据类型 */
export function getType<T>(val: T) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

/** 删除对象value两边空格和换行符 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function formatParams<T extends Object>(obj: T) {
  const type = getType(obj)
  if (type !== 'Object' && type !== 'Array') return obj
  const newParams = Array.isArray(obj) ? [...obj] : { ...obj }
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newParams[key] = value.trim().replace(/\n\r/g, '')
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newParams[key] = formatParams(value)
    }
  }
  return newParams
}

/** 对象转为query参数字符串 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function serializeObject(query: {}): string {
  if (!query) {
    return ''
  }
  const newObj: Record<string, unknown> = (Object.keys(query) || [])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .filter(key => query[key] !== undefined)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {})
  let str = ''
  for (const key in newObj) {
    str = `${str}${key}=${newObj[key]}&`
  }
  str = str.substring(0, str.length - 1)
  return str ? `?${str}` : ''
}

/** 处理分单位金额转元单位 */
export function getAmount(num = 0, digit = 2) {
  const defaultValue = 0
  try {
    return (num / 100).toFixed(digit) || defaultValue.toFixed(2)
  } catch (error) {
    return defaultValue.toFixed(2)
  }
}

/** 隐藏手机号中间4位 */
export const encryptionTel = (tel: string) => {
  try {
    return tel ? `${tel.substr(0, 3)}****${tel.substr(7)}` : '—'
  } catch (error) {
    return tel
  }
}

// 保留两位小数，不四舍五入
export const keepDecimals = (value: number) => {
  return Math.abs(value)
    .toString()
    .match(/^\d+(?:\.\d{0,2})?/) as unknown as number
}

// 保留一位小数，不四舍五入
export const keepDecimalsOne = (value: number) => {
  return Math.abs(value)
    .toString()
    .match(/^\d+(?:\.\d{0,1})?/) as unknown as number
}

/** 验证图片是不是正确格式的图片 */
export const checkImg = (file: File) => {
  return new Promise<boolean>(resolve => {
    const files = new FileReader()
    files.readAsArrayBuffer(file)
    files.onload = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const blob = new Blob([files.result])
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.src = url
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(true)
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(false)
      }
    }
    files.onerror = () => resolve(false)
  })
}

/** 获取文件 .后缀名 */
export function getExtension(name: string) {
  return name.substring(name.lastIndexOf('.'))
}
