import React, { useContext } from 'react'
import { Tabs } from 'antd'
import { UserContext } from '@/models/User'
import ShippingAddress from './ShippingAddress'
import Order from './Order'
import Item from './Item'
import Info from './Info'

const TabPane = Tabs.TabPane

const Profile = ({
  match: {
    params: { tab },
  },
  history,
}) => {
  const [user] = useContext(UserContext)

  const handleTabChange = tab => history.push(`/profile/${tab}`)

  if (!tab) handleTabChange('item')

  return (
    <Tabs activeKey={tab} onChange={handleTabChange}>
      <TabPane tab="我的闲置" key="item">
        <Item id={user.id} />
      </TabPane>
      <TabPane tab="我的请求" key="order">
        <Order id={user.id} />
      </TabPane>
      <TabPane tab="收货地址" key="address">
        <ShippingAddress id={user.id} />
      </TabPane>
      <TabPane tab="个人资料" key="info">
        <Info id={user.id} />
      </TabPane>
    </Tabs>
  )
}

export default Profile
