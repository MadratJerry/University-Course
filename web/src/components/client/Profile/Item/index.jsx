import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Card, Modal, Button, Badge } from 'antd'
import GoodPrice from '@/components/client/Price'
import User from '@/models/User'
import ItemDetail from './ItemDetail'
import OrderDetail from './OrderDetail'

const Item = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [detailVisible, setDetailVisible] = useState(false)
  const [ordersVisible, setOrdersVisible] = useState(false)
  const [detailData, setDetailData] = useState({})

  const fetchData = async () => {
    setLoading(true)
    const { data } = await User.getItems(id)
    setItems(data._embedded.items)
    setLoading(false)
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id, ordersVisible])

  const handleDetail = data => () => {
    setDetailData(data)
    setDetailVisible(true)
  }

  const handleOrderList = data => () => {
    setDetailData(data)
    setOrdersVisible(true)
  }

  const handleDetailCancel = () => setDetailVisible(false)

  const handleOrdersCancel = () => setOrdersVisible(false)

  const handleItemAdd = () => {
    setDetailData({})
    setDetailVisible(true)
  }

  return (
    <div>
      <Modal title="物品详情" visible={detailVisible} onCancel={handleDetailCancel} footer={null}>
        <ItemDetail data={detailData} setVisible={setDetailVisible} fetchData={fetchData} />
      </Modal>
      <Modal title="交易请求" visible={ordersVisible} onCancel={handleOrdersCancel} footer={null}>
        <OrderDetail id={detailData.id} />
      </Modal>
      <Button onClick={handleItemAdd} type="primary">
        添加
      </Button>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={data => (
          <List.Item
            actions={[
              <Button onClick={handleDetail(data)}>详情</Button>,
              <Badge style={{ marginRight: 4 }} count={data.ordersCount}>
                <Button onClick={handleOrderList(data)}>交易请求</Button>
              </Badge>,
            ]}
          >
            <Card bordered={false}>
              <Card.Meta
                avatar={
                  <Link to={`/goods/${data.id}`}>
                    <Avatar shape="square" size={64} src={data.images[0].url} />
                  </Link>
                }
                title={data.name}
                description={
                  <>
                    <GoodPrice style={{ color: '#ff3434' }} value={data.price} />
                    <GoodPrice style={{ color: '#666', textDecoration: 'line-through' }} value={data.originalPrice} />
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

export default Item
