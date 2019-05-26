import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout, Button, Modal, Avatar, message } from 'antd'
import Login from '@/components/Login'
import User, { UserContext } from '@/models/User'
import Register from '../Register'

const { Header } = Layout
// 传入history网页访问历史记录
// 利用state改变登录/注册框状态
export default withRouter(({ history }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)
  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = async () => {
    const { response } = await User.logout()
    if (response.ok) {
      message.success('已退出。')
      userDispatch({ type: 'unverified' })
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      // getInfo取session里的id，getuserInfo 通过 id 拉更多信息
      if (user.verified) {
        const {
          data: { id },
        } = await User.getInfo()
        const { data, response } = await User.getUserInfo(id)
        // 获取信息成功-->判断是否管理员
        if (response.ok) {
          userDispatch({ type: 'update', payload: data })
          if (data.roles[0].authority === 'ROLE_ADMIN') {
            if (!document.location.pathname.includes('/admin')) history.push('/admin')
          }
        } else {
          userDispatch({ type: 'unverified' })
          history.push('/')
        }
      }
    }
    fetchUserInfo()
  }, [user.verified])

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: '#ffffff',
      }}
    >
      <div style={{ color: '#25b864', fontSize: 36, fontWeight: 'bold' }}>
        <Link to="/">Flea</Link>
      </div>
      {user.verified ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/profile/item">
            <Avatar size="large" icon="user" />
            <span style={{ margin: 10 }}>{user.username}</span>
          </Link>
          <Button type="dashed" onClick={handleLogout}>
            退出
          </Button>
        </div>
      ) : (
        <Button.Group>
          <Button onClick={() => setLoginVisible(true)}>登录</Button>
          <Button onClick={() => setRegisterVisible(true)}>注册</Button>
        </Button.Group>
      )}
      <Modal title="登录" visible={loginVisible} onCancel={() => setLoginVisible(false)} footer={null}>
        <Login setVisible={setLoginVisible} userDispatch={userDispatch} />
      </Modal>
      <Modal title="注册" visible={registerVisible} onCancel={() => setRegisterVisible(false)} footer={null}>
        <Register setVisible={setRegisterVisible} />
      </Modal>
    </Header>
  )
})
