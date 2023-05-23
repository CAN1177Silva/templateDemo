import { memo, useState } from 'react'
import styles from './index.module.less'
import { userStorage } from '@/common/storage'
import { useNavigate } from 'react-router-dom'
const UserInfo = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const navigator = useNavigate()
  const logout = () => {
    console.log('%c Line:9 🍖', 'color:#ea7e5c', '退出')
    userStorage.removeItem()
    navigator('/login')
  }

  return (
    <div
      className={styles.useInfo}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onClick={() => setIsShow(true)}
    >
      <img
        className={styles.img}
        src={'https://cdn.myanimelist.net/images/anime/1942/104386l.jpg'}
        alt='personalCenter'
      />

      {isShow && (
        <div className={styles.mask}>
          <p className={styles.p}>账号管理</p>
          <p className={styles.p} onClick={logout}>
            退出登录
          </p>
        </div>
      )}
    </div>
  )
}

export default memo(UserInfo)
