import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'antd'
import Price from '@/components/client/Price'
import './GoodItem.css'

const { Meta } = Card

const GoodItem = ({ id, url, name, description, price, originalPrice, location }) => {
  return (
    <Link to={`/good/${id}`}>
      <Card className="good-card" hoverable cover={<img alt="good-item" src={url} />}>
        <Meta title={name} description={description} />
        <div className="price-group">
          <Price className="price" value={price} />
          <Price className="original-price" value={originalPrice} />
        </div>
        <span className="location">
          <Icon type="environment" />
          {location}
        </span>
      </Card>
    </Link>
  )
}

export default GoodItem
