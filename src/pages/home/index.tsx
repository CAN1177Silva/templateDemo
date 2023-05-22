import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

import { getUserInfo } from '@/api/home'
import { Spin } from 'antd'

const Home: React.FC = props => {
  const [movieList, setMovieList] = useState([])

  const getUserInfoFn = async () => {
    const res = await getUserInfo()
    setMovieList(res.splice(0, 10))
    console.log('%c Line:8 🥖 res', 'color:#3f7cff', res)
  }

  useEffect(() => {
    getUserInfoFn()
  }, [])

  console.log('%c Line:6 🍬 props', 'color:#33a5ff', props)
  return (
    <div className={styles.homeWrap}>
      <div className={styles.content}>
        {movieList.length === 0 ? (
          <Spin size='large' className={styles.spin} />
        ) : (
          movieList.map((item: any) => {
            return (
              <div key={item.id} className={styles.show}>
                <div>{item.data[0].name}</div>
                <img className={styles.img} src={item.data[0].poster} alt='' />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Home
