/** 公共的接口响应范型 */
export interface HttpSuccessResponse<T> {
  code: number
  message: string
  data: T
}

/** 公共的分页接口响应范型 */
export interface PageSuccessResponse<T> {
  current: 0
  pages: 0
  records: T[]
  searchCount: true
  size: 0
  total: 0
}
