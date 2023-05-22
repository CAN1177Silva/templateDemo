import { UploadOutlined } from '@ant-design/icons'
import { Route } from './index'
import ErrorBoundary from '@/components/ErrorBoundary'

import SetPage from '@/pages/set'

export default [
  {
    name: '设置',
    path: '/set',
    access: [],
    element: ErrorBoundary(SetPage),
    icon: UploadOutlined
  }
] as unknown as Route[]
