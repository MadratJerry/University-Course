import React, { useEffect, useState } from 'react'
import { Card, Avatar, Button, Icon } from 'antd'
import GoodPrice from '@/components/client/Price'
import Item from '@/models/Item'
import './index.css'

const Good = ({
  match: {
    params: { id },
  },
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ images: [{ url: '' }], seller: { username: '' }, createdDate: 0 })

  const fetchData = async () => {
    setLoading(true)
    const { data } = await Item.getById(id)
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div>
      <Card
        title={data.name}
        bordered={false}
        loading={loading}
        extra={
          <>
            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
            {data.collectByCount}人已收藏
          </>
        }
      >
        <div className="good-container">
          <div className="good-images">
            <img src={data.images[0].url} alt="good" />
          </div>
          <div className="good-details">
            <div className="good-info">
              <div>
                <span>售价</span>
                <GoodPrice className="price" value={data.price} />
              </div>
              <div>
                <span>原价</span>
                <GoodPrice className="original-price" value={data.originalPrice} />
              </div>
              <div>
                <span>发布地</span>
                {data.location}
              </div>
            </div>
            <Card style={{ marginTop: 16 }} loading={loading}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={data.seller.username}
                description={`${new Date(data.createdDate).toLocaleDateString()}发布`}
              />
            </Card>
            <Button type="primary" size="large" className="buy-btn">
              立即购买
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Good
