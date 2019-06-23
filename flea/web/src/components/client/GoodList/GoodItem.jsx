import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'antd'
import Price from '@/components/client/Price'
import Address from '@/components/client/Address'
import './GoodItem.css'

const { Meta } = Card

const GoodItem = ({ id, url, name, description, price, originalPrice, location }) => {
  return (
    <Link to={`/goods/${id}`}>
      <Card className="good-card" hoverable cover={<img alt="good-item" src={url} />}>
        <Meta title={name} description={description} />
        <div className="price-group">
          <Price className="price" value={price} />
          <Price className="original-price" value={originalPrice} />
        </div>
        <span className="location">
          <Icon type="environment" />
          <Address {...location} />
        </span>
      </Card>
    </Link>
  )
}

export default GoodItem
