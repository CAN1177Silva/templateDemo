import React from 'react'
import styles from './index.module.less'
import { useModel } from '@/store'
import { Button } from 'antd'
import { fetchGet } from './utils'

const Order: React.FC = () => {
  const { count, setCount } = useModel('order')

  const handleClick = () => {
    let callback
    fetchGet('/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn', e => {
      callback = e
    }, 1000)
    if (callback === 1) {
      console.log('%c Line:17 🥚', 'color:#ea7e5c', '成功输出')
    }
  }

  return (
    <div className={styles.homeWrap}>
      <Button onClick={() => setCount(count + 1)}>count +1 </Button>
      <Button onClick={handleClick} style={{marginLeft: 24}}>fetch请求</Button>
    </div>
  )
}

export default Order
