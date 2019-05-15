import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'
import GoodsLink from '@/components/client/GoodsLink'
import './Category.css'

const data = [
  ['热门', '手机', '笔记本电脑'],
  ['手机数码', '手机', '耳机耳麦'],
  ['电脑办公', '笔记本', '平板电脑'],
  ['电脑配件', '显示器', '显卡'],
  ['摄影摄像', '单反相机', '微单相机'],
  ['奢侈品', '手表', '箱包'],
  ['家用电器', '冰箱', '洗衣机'],
  ['图书', '教材', '励志'],
]

const CategoryLine = ([parent, key1, key2]) => (
  <List.Item>
    <div className="category-line">
      {parent}
      <div className="link-group">
        <GoodsLink keyName={key1} />
        <GoodsLink keyName={key2} />
      </div>
    </div>
  </List.Item>
)

const Category = props => {
  return (
    <List
      {...props}
      footer={
        <div className="view-more">
          <Link to="/goods?category=">查看更多</Link>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={item => CategoryLine(item)}
    />
  )
}

export default Category
