import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import styles from './index.module.less'

import { useNavigate} from "react-router-dom"

const { Header, Sider, Content } = Layout



const LayoutPage: React.FC<any> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ height: '100vh', width: "100vw" }}>

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.demoLogo} >
          
          <img className={styles.img} src='https://upload.wikimedia.org/wikipedia/en/1/12/Megalo_Box_poster.jpg' alt='logo' />
          </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={key => {
            console.log("%c Line:37 🥒 key", "color:#ed9ec7", key.key);
            navigate(key.key)
          }}
          items={[
            {
              key: 'home',
              icon: <UserOutlined />,
              label: 'home'
            },
            {
              key: 'order',
              icon: <VideoCameraOutlined />,
              label: 'order'
            },
            {
              key: 'set',
              icon: <UploadOutlined />,
              label: 'set'
            }
          ]}
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
