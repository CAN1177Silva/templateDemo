import { Button } from 'antd'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

interface INotFoundProps {
  type: 403 | 404 | 500
  onRefresh?: () => void
  message?: string
}

const getErrMsg = (type: 403 | 404 | 500, message = '页面出现异常') => {
  switch (type) {
    case 403:
      return '您暂无访问该页面权限，请联系管理员'
    case 404:
      return '404, 页面未找到!'
    default:
      return `${message}，请刷新或返回首页`
  }
}

// eslint-disable-next-line react/display-name
const NotFound: React.FC<INotFoundProps> = memo(props => {
  // eslint-disable-next-line react/prop-types
  const { type, onRefresh, message } = props

  const navigate = useNavigate()

  return (
    <div>
      <div className={styles.notFound}>
        <div>
          <h2 className={styles.notFoundTitle}>{getErrMsg(type, message)}</h2>
          {type === 500 && (
            <Button type='primary' style={{ marginLeft: 20 }} onClick={onRefresh}>
              刷新
            </Button>
          )}
          {(type === 404 || type === 403 || type === 500) && (
            <Button
              type='primary'
              style={{ margin: '0 20px' }}
              onClick={() => {
                navigate('/')
              }}
            >
              回到首页
            </Button>
          )}
          {(type === 403 || type === 500) && (
            <Button type='primary' onClick={() => navigate('/login')}>
              重新登录
            </Button>
          )}
        </div>
      </div>
    </div>
  )
})

export default NotFound
