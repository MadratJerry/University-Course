import React from 'react'
import { Card, Icon } from 'antd'
import './GoodItem.css'

const { Meta } = Card

const GoodItem = ({ url, name, description, price, originalPrice, location }) => {
  return (
    <Card className="good-card" hoverable cover={<img alt="good-item" src={url} />}>
      <Meta title={name} description={description} />
      <div className="price-group">
        <span className="price">¥{price.toFixed(2)}</span>
        <span className="original-price">¥{originalPrice.toFixed(2)}</span>
      </div>
      <span className="location">
        <Icon type="environment" />
        {location}
      </span>
    </Card>
  )
}

export default GoodItem
