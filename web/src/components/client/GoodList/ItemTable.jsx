import React from 'react'
import GoodItem from './GoodItem'
import './ItemTable.css'

const ItemTable = () => {
  const a = []
  for (let i = 0; i < 100; i++) a.push(i)
  const item = {
    url: '//img10.360buyimg.com/n1/s290x290_jfs/t8107/37/1359438185/72159/a6129e26/59b857f8N977f476c.jpg!cc_1x1',
    name: 'Apple iPhone 8 Plus (A1864) 64GB 深空灰色 移动联通电信4G手机',
    description: '深空灰色 公开版 内存：64GB差不多一年了吧，打算换华为了，一直有贴膜和保护壳，外观无划痕，原包装也都在',
    price: 3500,
    originalPrice: 5499,
    location: '北京市朝阳区',
  }
  return (
    <div>
      <div className="item-container">
        {a.map(a => (
          <GoodItem key={a} {...item} />
        ))}
      </div>
    </div>
  )
}

export default ItemTable
