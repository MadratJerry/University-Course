import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Card, Modal, Button } from 'antd'
import GoodPrice from '@/components/client/Price'
import User from '@/models/User'
import ItemDetail from './ItemDetail'

const Item = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(false)
  const [detailData, setDetailData] = useState({})

  const fetchData = async () => {
    setLoading(true)
    const { data } = await User.getItems(id)
    setItems(data._embedded.items)
    setLoading(false)
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  const handleDetail = data => () => {
    setDetailData(data)
    setVisible(true)
  }

  const handleOrderList = data => () => {
    setDetailData(data)
  }

  const handleDetailCancel = () => setVisible(false)

  const handleItemAdd = () => {
    setDetailData({})
    setVisible(true)
  }

  return (
    <div>
      <Modal title="物品详情" visible={visible} onCancel={handleDetailCancel} footer={null}>
        <ItemDetail data={detailData} setVisible={setVisible} fetchData={fetchData} />
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
              <Button onClick={handleOrderList(data)}>交易请求</Button>,
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
