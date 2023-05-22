import React, { useMemo, useRef } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import LayoutPage from '@/components/LayoutPage'
import { Route as RouteType } from '@/routes'

interface RenderRoutesProps {
  routes: RouteType[]
}

const RenderRoutes: React.FC<RenderRoutesProps> = ({ routes }) => {
  const flatRoutes = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFlatRoutes = (routes: any[]) => {
      const flatRoutes = [<Route key='*' path='*' element={<Navigate replace to='/404' />} />]
      routes.forEach(item => {
        const { path, routes, element } = item
        if (!item.singlePage) {
          if (path) {
            flatRoutes.push(<Route key={path} path={path} element={element} />)
          }
          if (routes) {
            flatRoutes.push(...getFlatRoutes(item.routes))
          }
        }
      })
      return flatRoutes
    }
    return getFlatRoutes(routes)
  }, [routes])
  console.log('%c Line:34 🌭 flatRoutes', 'color:#b03734', flatRoutes)

  const mapObj = useRef<{ [key: string]: boolean }>({})

  const { pathname } = useLocation()

  const noLayoutRoutes = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFlatRoutes = (routes: any[]) => {
      const noLayout = [<Route key='*' path='*' element={<Navigate replace to='/404' />} />]
      routes.forEach(item => {
        if (item.singlePage) {
          const { path, element } = item
          noLayout.push(<Route key={path} path={path} element={element} />)
        }
        if (item.singlePage) {
          mapObj.current[item.path] = true
        }
      })
      return noLayout
    }
    return getFlatRoutes(routes)
  }, [routes])
  return (
    <>
      {mapObj.current[pathname] ? (
        <Routes>{noLayoutRoutes.map(item => item)}</Routes>
      ) : (
        <LayoutPage routes={routes}>
          <Routes>{flatRoutes.map(item => item)}</Routes>
        </LayoutPage>
      )}
    </>
  )
}

export default RenderRoutes
