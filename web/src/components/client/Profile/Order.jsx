import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Card, Tag, Button } from 'antd'
import GoodPrice from '@/components/client/Price'
import User from '@/models/User'

const OrderState = state => {
  switch (state) {
    case 'UNACCEPTED':
      return <Tag>等待接受</Tag>
    case 'REJECTED':
      return <Tag color="red">已拒绝</Tag>
    case 'UNFINISHED':
      return <Tag>等待交易</Tag>
    case 'FINISHED':
      return <Tag color="green">交易完成</Tag>
    case 'CANCELED':
      return <Tag>已取消</Tag>
    default:
      return ''
  }
}

const Order = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const fetchData = async () => {
    setLoading(true)
    const { data } = await User.getOrders(id)
    setOrders(data._embedded.itemOrders)
    setLoading(false)
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  const handleCancel = id => async () => {
    await User.cancelOrder(id)
    fetchData()
  }

  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={orders}
        renderItem={data => (
          <List.Item
            actions={[OrderState(data.orderState)].concat(
              data.orderState === 'CANCELED' || data.orderState === 'REJECTED',
              data.orderState === 'FINISHED' ? (
                []
              ) : (
                <Button size="small" type="dashed" onClick={handleCancel(data.id)}>
                  取消请求
                </Button>
              ),
            )}
          >
            <Card bordered={false}>
              <Card.Meta
                avatar={
                  <Link to={`/goods/${data.item.id}`}>
                    <Avatar shape="square" size={64} src={data.item.images[0].url} />
                  </Link>
                }
                title={data.item.name}
                description={
                  <>
                    <GoodPrice style={{ color: 'black' }} value={data.price} />
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Order
