export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RequestConfig {
  baseURL?: string
  timeout?: number
  checkStatus?: (status: number) => boolean
  requestIntercept?: (config: HttpRequestConfig) => HttpRequestConfig
  responseIntercept?: (res: HttpResponse) => unknown
  errorIntercept?: (error: Error) => unknown
}
export interface HttpRequestConfig extends RequestConfig {
  url: string
  returnAll?: boolean
  method: HttpMethod
  headers?: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any // payload
  credentials?: 'include' | 'omit' | 'same-origin'
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin'
  query?: Record<string, unknown>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HttpResponse<T = any> {
  ok: boolean
  data: T
  status: number
  statusText: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any
  config: RequestConfig
  usingCache?: boolean
  url?: string
  usingExceptionCache?: boolean
}

export interface HttpSuccessResponse<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  code: number
  message: string
  data: T
}

export interface IRequestParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any
}
