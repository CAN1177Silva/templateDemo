import ErrorBoundary from '@/components/ErrorBoundary'
import { Route } from './index'

import Login from '@/pages/login'

export default [
  {
    name: '登录',
    path: '/login',
    access: [],
    element: ErrorBoundary(Login),
    hideInMenu: true,
    singlePage: true
  }
] as unknown as Route[]
