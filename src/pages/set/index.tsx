import React from 'react'

import styles from './index.module.less'

const Set: React.FC = props => {
  console.log('%c Line:6 🍬 props', 'color:#33a5ff', props)
  return <div className={styles.homeWrap}>set page</div>
}

export default Set
