import React, { useEffect, useState } from 'react'
import { List, Avatar, Button, message } from 'antd'
import GoodPrice from '@/components/client/Price'
import { OrderState } from '@/components/client/Profile/Order'
import Item from '@/models/Item'
import ItemOrder from '@/models/ItemOrder'
import User from '@/models/User'
import Address from '../../Address'

const OrderDetail = ({ id, setVisible, fetchData: outerFetch }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const fetchData = async () => {
    setLoading(true)
    const { data } = await Item.getAllOrders(id)
    setData(data._embedded.itemOrders)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRecivied = item => async () => {
    await User.updateInfo(item.user.id, { money: item.user.money + item.price })
    await handleOrderState(item.id, 'CANCELED')()
    message.success('退货收取成功，金币已返还！')
  }
  // 交易请求
  const ListAction = item => {
    if (item.orderState === 'UNACCEPTED')
      return [
        <Button type="primary" size="small" onClick={handleOrderState(item.id, 'UNPAID')}>
          接受
        </Button>,
        <Button type="danger" size="small" onClick={handleOrderState(item.id, 'REJECTED')}>
          拒绝
        </Button>,
      ]
    else if (item.orderState === 'UNRECEIVED')
      return [
        <Button type="primary" size="small" onClick={handleRecivied(item)}>
          确认收货
        </Button>,
      ]
    else return []
  }

  const handleOrderState = (id, state) => async () => {
    await ItemOrder.updateOrder(id, { orderState: state })
    await fetchData()
    message.success('操作成功！')
  }

  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={ListAction(item)}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={
                <>
                  {item.user.username}:{'  '}
                  意向价格
                  <GoodPrice style={{ color: '#ff3434', margin: '0 8px' }} value={item.price} />
                  {OrderState(item.orderState)}
                </>
              }
              description={
                <>
                  <div>
                    交易方式：
                    {item.buyWay === 'ONLINE' ? '在线交易' : ''}
                  </div>
                  {item.orderState === 'UNFINISHED' ? (
                    <>
                      <div>
                        收件人姓名：
                        {item.shippingAddress.name}
                      </div>
                      收件地址：
                      <Address {...item.shippingAddress.address} />
                      <div />
                      <div>
                        联系方式：
                        {item.shippingAddress.phoneNumber}
                      </div>
                    </>
                  ) : null}
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default OrderDetail
