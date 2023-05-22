/**
 *  初始化网络请求配置选项（如：url前缀、headers配置）
 *  网络拦截器（请求与响应）
 */
import { message } from 'antd'

import DPRequest from './DPRequest'

import { tokenStorage } from '@/common/storage'

const noLoginPageMap = {
  '/login': true,
  '/register': true
}

const request = new DPRequest({
  /** 请求拦截器 */
  requestIntercept(config) {
    if (tokenStorage.getItem()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers.Authorization = tokenStorage.getItem()
    }
    return config
  },
  /** 响应拦截器 */
  responseIntercept(response) {
    const code = response.data.code
    switch (code) {
      case 0:
        return response.data
      case 401:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!noLoginPageMap[window.location.pathname]) {
          goLogin()
        }
        return response.data || {}
      default:
        // eslint-disable-next-line no-case-declarations
        const msg = response.data?.message
        if (msg) {
          message.destroy()
          message.error(msg)
        }
        return response.data || {}
    }
  },
  /** 响应异常拦截器 */
  errorIntercept(error: Error) {
    return { message: onErrorReason(error.message) }
  }
})

function goLogin() {
  console.log('%c Line:50 🥪', 'color:#ffdd4d', 99999)
  // 退出登录逻辑
  if (window.location.href.indexOf('login') === -1) {
    message.error('登录已过期,请重新登录!')
    window.location.hash = '/login'
  }
}

/** 解析http层面请求异常原因 */
function onErrorReason(message: string): string {
  if (message.includes('timeout')) {
    return '请求超时，请重试!'
  }
  switch (message) {
    case 'Request failed with status code 401':
      return '登录过期，请重新登录!'
    case 'Network Error':
      return '网络异常，请检查网络情况!'
    default:
      return message || '服务异常,请重试!'
  }
}

export default request
