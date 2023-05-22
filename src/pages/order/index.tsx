import React from 'react'

import styles from './index.module.less'
import { useModel } from '@/store'
import { Button } from 'antd'

const Order: React.FC = () => {
  const { count, setCount } = useModel('order')
  return (
    <div className={styles.homeWrap}>
      <Button onClick={() => setCount(count + 1)}>count +1 </Button>
    </div>
  )
}

export default Order
