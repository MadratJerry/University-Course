import React, { useState, useEffect } from 'react'
import { Layout, Button, Modal, Avatar } from 'antd'
import Login from '@/components/Login'
import { useStore } from '@/models/index'
import User from '@/models/User'

const { Header } = Layout

export default () => {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useStore(User)

  const handleLogout = async () => {
    const { response } = await User.logout()
    if (response.ok) setUser({ verified: false })
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user.verified) {
        const { data } = await User.getInfo()
        setUser({ ...data })
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
      <div style={{ color: '#25b864', fontSize: 36, fontWeight: 'bold' }}>Flea</div>
      {user.verified ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Avatar size="large" icon="user" />
            <span style={{ margin: 10 }}>{user.username}</span>
          </div>
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
        <Login setVisible={setVisible} setUser={setUser} />
      </Modal>
    </Header>
  )
}
