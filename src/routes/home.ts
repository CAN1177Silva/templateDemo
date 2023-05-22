import { UserOutlined } from '@ant-design/icons'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Route } from './index'

import HomePage from '@/pages/home'

export default [
  {
    name: '首页',
    path: '/home',
    access: [],
    element: ErrorBoundary(HomePage),
    icon: UserOutlined
  }
] as unknown as Route[]
