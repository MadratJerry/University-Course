import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Category from '@/models/Category'
import GoodsLink from '@/components/client/GoodsLink'
import './CategoryPanel.css'

const CategoryPanel = () => {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(!open)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await Category.getAll()
      setCategories(data._embedded.categories)
    }

    fetchCategories()
  }, [])
  return (
    <div>
      <div className="category-panel" style={open ? null : { height: 29 * 3 }}>
        <div className="container">
          <Link to={`/goods?category=`}>全部</Link>
          {categories.map(({ id, name }) => (
            <GoodsLink key={id} keyName={name} />
          ))}
        </div>
        <Button shape="round" size="small" icon={open ? 'up' : 'down'} onClick={handleClick} />
      </div>
    </div>
  )
}

export default CategoryPanel
