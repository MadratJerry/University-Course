import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Card, Tag, Button, Modal, message } from 'antd'
import GoodPrice from '@/components/client/Price'
import User, { UserConext } from '@/models/User'
import ItemOrder from '@/models/ItemOrder'

export const OrderState = state => {
  switch (state) {
    case 'UNACCEPTED':
      return <Tag>等待接受</Tag>
    case 'REJECTED':
      return <Tag color="red">已拒绝</Tag>
    case 'UNPAID':
      return <Tag color="yellow">未付款</Tag>
    case 'UNRECEIVED':
      return <Tag color="yellow">等待确认退货</Tag>
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
  const [user] = useContext(UserConext)

  const fetchData = async () => {
    setLoading(true)
    const { data } = await User.getOrders(id)
    setOrders(data._embedded.itemOrders)
    setLoading(false)
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  const handleState = (id, state) => async () => {
    await ItemOrder.updateOrder(id, { orderState: state })
    fetchData()
  }

  const handlePay = data => async () => {
    const {
      data: { id, money },
    } = await User.getUserInfo(user.id)
    Modal.confirm({
      title: '确认付款吗？',
      content: (
        <div>
          <div>
            交易金额：
            <GoodPrice style={{ color: '#ff3434' }} value={data.price} />
          </div>
          <div>
            余额：
            <GoodPrice style={{ color: '#ff3434' }} value={money} />
          </div>
        </div>
      ),
      async onOk() {
        if (data.price < money) {
          await User.updateInfo(id, { money: money - data.price })
          await handleState(data.id, 'UNFINISHED')()
          message.success('支付成功！')
        } else {
          message.error('余额不足！')
        }
      },
      onCancel() {},
    })
  }

  const handleRecivied = data => async () => {
    await User.updateInfo(data.item.seller.id, { money: data.item.seller.money + data.price })
    await handleState(data.id, 'FINISHED')()
    message.success('收货成功！')
  }

  const ListAction = data => {
    if (data.orderState === 'CANCELED' || data.orderState === 'REJECTED' || data.orderState === 'FINISHED') return []
    else {
      if (data.orderState === 'UNACCEPTED')
        return [
          <Button size="small" type="dashed" onClick={handleState(data.id, 'CANCELED')}>
            取消请求
          </Button>,
        ]
      else if (data.orderState === 'UNPAID')
        return [
          <Button size="small" type="primary" onClick={handlePay(data)}>
            付款
          </Button>,
          <Button size="small" type="dashed" onClick={handleState(data.id, 'CANCELED')}>
            取消请求
          </Button>,
        ]
      else if (data.orderState === 'UNFINISHED')
        return [
          <Button size="small" type="primary" onClick={handleRecivied(data)}>
            确认收货
          </Button>,
          <Button size="small" type="dashed" onClick={handleState(data.id, 'UNRECEIVED')}>
            退货
          </Button>,
        ]
    }
  }

  return (
    <div>
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={orders}
        renderItem={data => (
          <List.Item actions={ListAction(data)} extra={OrderState(data.orderState)}>
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
