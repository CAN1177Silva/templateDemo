import React from 'react'

import styles from './index.module.less'

const Home: React.FC = props => {
  console.log('%c Line:6 🍬 props', 'color:#33a5ff', props)
  return <div className={styles.homeWrap}>Home Page</div>
}

export default Home
