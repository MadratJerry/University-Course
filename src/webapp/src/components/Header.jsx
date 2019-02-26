import React, { useState } from 'react'
import { Layout, Button, Modal } from 'antd'
import Login from './Login'

const { Header } = Layout

export default () => {
  const [visible, setVisible] = useState(false)
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: '#ffffff',
      }}
    >
      <div style={{ color: '#25b864', fontSize: 36, fontWeight: 'bold' }}>
        Flea
      </div>
      <Button.Group>
        <Button onClick={() => setVisible(true)}>登录</Button>
        <Button>注册</Button>
      </Button.Group>
      <Modal
        title="登录"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Login />
      </Modal>
    </Header>
  )
}
