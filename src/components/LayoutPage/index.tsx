import React, { useMemo, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import styles from './index.module.less'

import { useLocation, useNavigate } from 'react-router-dom'

import { getMenuItemsByRoute } from './router'
import { Route } from '@/routes'
import { useModel } from '@/store'

const { Header, Sider, Content } = Layout

interface ILayoutPageProps {
  children: React.ReactNode
  routes: Route[]
}

// const breadcrumbNameMap = {}
// routes.forEach(item => {
//   const key = item.path
//   const value = item.name
//   breadcrumbNameMap[key] = value
// })

const LayoutPage: React.FC<ILayoutPageProps> = props => {
  const { routes, children } = props
  console.log('%c Line:20 🍯 children', 'color:#465975', children)
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { count } = useModel('order')

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const menuItems = useMemo(() => {
    return getMenuItemsByRoute(routes)
  }, [routes])

  // const location = useLocation()
  // const pathSnippets = location.pathname.split('/').filter(i => i)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // const extraBreadcrumbItems = pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
  //   return (
  //     <Breadcrumb.Item key={url}>
  //       <Link to={url}>{breadcrumbNameMap[url]}</Link>
  //     </Breadcrumb.Item>
  //   )
  // })

  // const breadcrumbItems = [].concat(extraBreadcrumbItems)

  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.demoLogo}>
          <img
            className={styles.img}
            src='https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/f2cb36cceb6ee33fa963c85b13d2298e.jpe'
            alt='logo'
          />
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultOpenKeys={[`/${pathname.split('/')[1]}`]}
          selectedKeys={[`/${pathname.split('/')[1]}`]}
          onClick={key => {
            console.log('%c Line:37 🥒 key', 'color:#ed9ec7', key.key)
            navigate(key.key)
          }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <span>count的值是:{count}</span>
          {/* 面包屑 */}
          {/* <Breadcrumb className={styles.breadcrumb}>{breadcrumbItems}</Breadcrumb> */}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
