import { VideoCameraOutlined } from '@ant-design/icons'
import { Route } from './index'

import ErrorBoundary from '@/components/ErrorBoundary'

import OrderPage from '@/pages/order'

export default [
  {
    name: '订单',
    path: '/order',
    access: [],
    element: ErrorBoundary(OrderPage),
    icon: VideoCameraOutlined
  }
] as unknown as Route[]
