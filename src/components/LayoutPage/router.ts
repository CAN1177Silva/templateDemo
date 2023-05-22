import { userStorage } from '@/common/storage'
import { Route } from '@/routes'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transfer2menu = (route: any) => {
  const { name, path, routes = [], hideInMenu, icon } = route
  if (hideInMenu) {
    return null
  }
  return {
    label: name,
    key: path,
    children: routes.length ? routes.map((item: unknown) => transfer2menu(item)) : null,
    icon: icon ? React.createElement(icon) : null
  }
}

export const getMenuItemsByRoute = (routes: Route[]) => {
  const { auth } = userStorage.getItem()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuItems: ({ label: any; key: any; children: any; icon: any } | null)[] = []

  function recurse(route: Route) {
    if (route.auth === undefined || auth >= route.auth) {
      // 如果父节点不显示在menu栏 就不再计算子节点
      if (!route.hideInMenu) {
        menuItems.push(transfer2menu(route))
      }
    }
  }

  routes.forEach(item => recurse(item))

  return menuItems
}
