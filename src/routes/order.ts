import { OrderedListOutlined } from '@ant-design/icons'
import { Route } from './index'

import ErrorBoundary from '@/components/ErrorBoundary'

import OrderPage from '@/pages/order'
import OrderList from '@/pages/order/orderList'
export default [
  {
    name: '订单',
    path: '/order',
    access: [],
    element: ErrorBoundary(OrderPage),
    icon: OrderedListOutlined,
    routes: [
      {
        name: '订单列表',
        access: [],
        path: '/order/orderList',
        element: ErrorBoundary(OrderList)
      }
    ]
  }
] as unknown as Route[]
