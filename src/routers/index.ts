import { ReactElement } from 'react'

import Home from '@/pages/home'

export interface Route {
  name?: string
  path: string
  english?: string
  icon?: string
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

const indexRoutes: Route[] = [
  {
    path: '/home',
    name: '工作台',
    english: 'Operating platform',
    element: Home as unknown as ReactElement | JSX.IntrinsicElements,
    icon: 'icon-a-gongzuotai-hui'
  }
]

export default [...indexRoutes] as Route[]
