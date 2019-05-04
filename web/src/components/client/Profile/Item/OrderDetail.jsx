import React, { useEffect, useState } from 'react'
import { List, Avatar, Button, message } from 'antd'
import GoodPrice from '@/components/client/Price'
import { OrderState } from '@/components/client/Profile/Order'
import Item from '@/models/Item'
import ItemOrder from '@/models/ItemOrder'

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
  }, [id])

  const ListAction = item => {
    if (item.orderState === 'UNACCEPTED')
      return [
        <Button type="primary" size="small" onClick={handleOrderState(item.id, 'UNFINISHED')}>
          接受
        </Button>,
        <Button type="danger" size="small" onClick={handleOrderState(item.id, 'REJECTED')}>
          拒绝
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
                  意象价格
                  <GoodPrice style={{ color: '#ff3434', margin: '0 8px' }} value={item.price} />
                  {OrderState(item.orderState)}
                </>
              }
              description={`交易方式：${item.buyWay === 'OFFLINE' ? '线下交易' : ''}`}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default OrderDetail
