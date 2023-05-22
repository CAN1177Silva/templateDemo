import {
  RequestConfig,
  HttpRequestConfig,
  IRequestParams,
  HttpResponse,
  HttpSuccessResponse
} from './types'

import { formatParams, serializeObject, getType } from '@/utils/tools'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformRequest(data: any, headers: any) {
  const type = getType(data)
  if (headers['Content-Type'] || headers['content-type']) {
    if (type !== 'Object' && type !== 'Array') return data
    return JSON.stringify(data)
  }
  if (type !== 'Object' && type !== 'Array') return data
  headers['Content-Type'] = 'application/json;charset=utf-8'
  return JSON.stringify(data)
}

const fetchInstace = async <T>(config: HttpRequestConfig): Promise<T> => {
  if (typeof config.requestIntercept === 'function') {
    config = config.requestIntercept(config)
  }
  const { baseURL = '', method, headers, data } = config
  let { url } = config
  if (!url.startsWith('http')) {
    url = baseURL + url
  }
  const options: RequestInit = {
    method,
    headers
  }
  const body = transformRequest(data, headers)
  if (body) {
    options.body = body
  }

  try {
    const response = await fetch(url, options)
    const httpResponse: HttpResponse = {
      config,
      ok: response.ok,
      data: null,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    }

    const isFile = response.headers.get('Content-Disposition')
    const data = {}
    httpResponse.data = data
    if (isFile) {
      const fileName = decodeURI(isFile.split('filename=')[1])
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
    } else {
      // 默认的response处理
      const contentType = response.headers.get('content-type')

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (/application\/json/.test(contentType)) {
        httpResponse.data = await response.json()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (/text\/.+/.test(contentType)) {
        httpResponse.data = await response.text()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (/stream/.test(contentType)) {
        httpResponse.data = await response.blob()
      } else {
        let data = {}
        try {
          data = await response.json() // 尝试转 json
          if (!data) {
            data = await response.text() // 尝试转 text
          }
        } catch (e) {
          console.log('%c Line:87 🥃 e', 'color:#3f7cff', e)
        }
        httpResponse.data = data
      }
    }

    if (typeof config.responseIntercept === 'function') {
      return config.responseIntercept(httpResponse) as unknown as T
    }
    return httpResponse.data as unknown as T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (typeof config.errorIntercept === 'function') {
      return config.errorIntercept(error) as unknown as T
    }
    return { code: 500, message: error.message } as unknown as T
  }
}

const defaultHeaders = {
  credentials: 'include',
  mode: 'no-cors'
}

export default class DPRequest {
  constructor(config: RequestConfig) {
    this.config = config
  }

  private config: RequestConfig = {
    timeout: 30 * 1000, // 超时时间30秒
    checkStatus: status => status >= 200 && status < 300
  }

  private request<T>(config: HttpRequestConfig) {
    // 处理某个接口单独改了配置的情况
    const realConfig: HttpRequestConfig = {
      ...this.config,
      ...config,
      headers: { ...defaultHeaders, ...config.headers }
    }
    return fetchInstace(realConfig) as Promise<HttpSuccessResponse<T>>
  }

  get<T>(url: string, data?: IRequestParams, config?: HttpRequestConfig) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    url += serializeObject(formatParams(data))
    return this.request<T>({
      url,
      method: 'GET',
      ...config
    })
  }

  post<T>(url: string, data?: IRequestParams, config?: HttpRequestConfig) {
    return this.request<T>({
      url,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: formatParams(data),
      method: 'POST',
      ...config
    })
  }
}
