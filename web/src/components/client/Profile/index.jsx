import React, { useContext } from 'react'
import { Tabs } from 'antd'
import { UserConext } from '@/models/User'
import ShippingAddress from './ShippingAddress'
import Order from './Order'
import Item from './Item'

const TabPane = Tabs.TabPane

const Profile = () => {
  const [user] = useContext(UserConext)

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="我的闲置" key="1">
        <Item id={user.id} />
      </TabPane>
      <TabPane tab="我的请求" key="2">
        <Order id={user.id} />
      </TabPane>
      <TabPane tab="收货地址" key="3">
        <ShippingAddress id={user.id} />
      </TabPane>
      <TabPane tab="个人资料" key="4">
        个人资料
      </TabPane>
    </Tabs>
  )
}

export default Profile
