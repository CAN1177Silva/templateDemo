import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HashRouter as Router } from 'react-router-dom'
import { StoreProvider } from '@/store'

import '@/styles/common.less'
import '@/styles/reset.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <StoreProvider>
      <Router basename='/'>
        <App />
      </Router>
    </StoreProvider>
  </ConfigProvider>
)
