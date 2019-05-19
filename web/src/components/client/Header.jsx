import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout, Button, Modal, Avatar, message } from 'antd'
import Login from '@/components/Login'
import User, { UserConext } from '@/models/User'

const { Header } = Layout

export default withRouter(({ history }) => {
  const [visible, setVisible] = useState(false)
  const [user, userDispatch] = useContext(UserConext)

  const handleLogout = async () => {
    const { response } = await User.logout()
    if (response.ok) {
      message.success('已退出。')
      userDispatch({ type: 'unverified' })
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user.verified) {
        const {
          data: { id },
        } = await User.getInfo()
        const { data, response } = await User.getUserInfo(id)

        if (response.ok) {
          userDispatch({ type: 'update', payload: data })
          if (data.roles[0].authority === 'ROLE_ADMIN') history.push('/admin')
          else history.push('/')
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
          <Button onClick={() => setVisible(true)}>登录</Button>
          <Button>注册</Button>
        </Button.Group>
      )}
      <Modal title="登录" visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Login setVisible={setVisible} userDispatch={userDispatch} />
      </Modal>
    </Header>
  )
})
