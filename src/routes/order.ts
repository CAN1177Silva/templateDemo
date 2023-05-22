import { OrderedListOutlined } from '@ant-design/icons'
import { Route } from './index'

import ErrorBoundary from '@/components/ErrorBoundary'

import OrderPage from '@/pages/order'

export default [
  {
    name: '订单',
    path: '/order',
    access: [],
    element: ErrorBoundary(OrderPage),
    icon: OrderedListOutlined
  }
] as unknown as Route[]
