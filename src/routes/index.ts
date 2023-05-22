import { ReactElement } from 'react'

import home from './home'
import order from './order'
import set from './set'

export interface Route {
  name?: string
  path: string
  english?: string
  icon?: JSX.Element | string
  // menu菜单中是否隐藏
  hideInMenu?: boolean
  // 单独页面
  singlePage?: boolean
  // 下级是否具有权限
  auth?: 2 | 1
  // 权限验证
  access?: string[]
  // 页面组件
  element: ReactElement | JSX.IntrinsicElements
  // 子路由
  routes?: Route[]
}

export default [...home, ...order, ...set] as Route[]
