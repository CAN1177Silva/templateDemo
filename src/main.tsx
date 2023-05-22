import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { HashRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Router basename='/'>
      <App />
    </Router>
  </ConfigProvider>
)
