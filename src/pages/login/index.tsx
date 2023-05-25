import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.less'

// import { passWordReg, phoneEmailReg } from '@/common/regs'
import { clearLocalStorage, tokenStorage, userStorage } from '@/common/storage'
import { useBooleanState } from '@/hooks'

import loginLeft from '@/assets/images/login_left.png'
// const formRules = {
//   username: [{ required: true, message: '请输入手机号或者邮箱', pattern: phoneEmailReg }],
//   password: [
//     {
//       required: true,
//       message: '请输入8-16位,数字、字母组成的密码',
//       pattern: passWordReg
//     }
//   ]
// }

const LogInPage: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigator = useNavigate()

  const [loading, setLoadingTrue, setLoadingFalse] = useBooleanState(false)
  const onFinish = (values: { username: string; password: string }) => {
    console.log('%c Line:31 🍬 values', 'color:#fca650', values)
    setLoadingTrue()
    const user: { username: string; password: string } = values
    console.log('%c Line:34 🍰 user', 'color:#33a5ff', user)
    userStorage.setItem(user)
    if (user.username === 'admin' && user.password === '123456') {
      console.log('%c Line:38 🥃', 'color:#fca650', '0000000')
      navigator('/home')
    }

    setLoadingFalse()
  }

  useEffect(() => {
    if (tokenStorage.getItem()) {
      clearLocalStorage()
    }
  }, [])

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <div className={styles.loginLeft}>
            <img src={loginLeft} alt='' />
          </div>
          <div className={styles.loginRight}>
            <Form
              name='basic'
              autoComplete=''
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label='账号'
                name='username'
                className={styles.username}
                // rules={formRules.username}
              >
                <Input
                  value={username}
                  size='large'
                  maxLength={80}
                  onChange={e => {
                    setUsername(e.target.value)
                  }}
                  placeholder='admin'
                />
              </Form.Item>
              <Form.Item
                label='密码'
                name='password'
                className={styles.password}
                // rules={formRules.password}
              >
                <Input.Password
                  value={password}
                  size='large'
                  placeholder='123456'
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  maxLength={16}
                />
              </Form.Item>
              <Button
                size='large'
                className='login-btn'
                type='primary'
                htmlType='submit'
                loading={loading}
              >
                登录
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogInPage
