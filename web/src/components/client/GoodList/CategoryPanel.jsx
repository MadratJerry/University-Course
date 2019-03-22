import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import Category from '@/models/Category'
import GoodsLink from '@/components/client/GoodsLink'
import './CategoryPanel.css'

const CategoryPanel = () => {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(!open)

  useEffect(() => {
    const fetchCategories = async () => setCategories(await Category.getAll())

    fetchCategories()
  }, [])
  return (
    <div>
      <div className="category-panel" style={open ? null : { height: 29 * 3 }}>
        <div className="container">
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
