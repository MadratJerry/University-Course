import React from 'react'
import { Route } from 'react-router-dom'
import { Menu } from 'antd'
import UserTable from './UserTable'
import ItemTable from './ItemTable'

const Admin = ({
  history,
  match: {
    params: { tab },
  },
}) => {
  if (document.location.pathname === '/admin') history.push('/admin/users')
  const handleMenuChange = ({ key }) => history.push(`/admin/${key}`)

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[tab]} style={{ lineHeight: '64px' }} onClick={handleMenuChange}>
        <Menu.Item key="users">用户管理</Menu.Item>
        <Menu.Item key="items">物品管理</Menu.Item>
        <Menu.Item key="orders">订单管理</Menu.Item>
      </Menu>
      <Route exact path="/admin/users" component={UserTable} />
      <Route exact path="/admin/items" component={ItemTable} />
    </>
  )
}

export default Admin
