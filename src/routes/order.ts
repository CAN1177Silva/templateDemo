import { OrderedListOutlined } from '@ant-design/icons'
import { Route } from './index'

import ErrorBoundary from '@/components/ErrorBoundary'

import OrderPage from '@/pages/order'
export default [
  {
    name: '订单',
    path: '/order',
    access: [],
    icon: OrderedListOutlined,
    routes: [
      {
        name: '订单列表',
        access: [],
        path: '/order/orderList',
        element: ErrorBoundary(OrderPage)
      }
    ]
  }
] as unknown as Route[]
