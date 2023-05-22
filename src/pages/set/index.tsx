import React from 'react'

import styles from './index.module.less'
import { Button } from 'antd'
import { useModel } from '@/store'

const Set: React.FC = props => {
  console.log('%c Line:6 🍬 props', 'color:#33a5ff', props)

  const { count, setCount } = useModel('order')

  return (
    <div className={styles.homeWrap}>
      <Button onClick={() => setCount(count - 1)}>count - 1</Button>
    </div>
  )
}

export default Set
