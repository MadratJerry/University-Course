import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import GoodItem from '@/components/client/GoodList/GoodItem'
import Item from '@/models/Item'
import './ItemTable.css'

const ItemTable = ({ category }) => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState({ size: 20, totalElements: 0, totalPages: 0, number: 0 })

  useEffect(() => {
    const fetchItems = async () => {
      const {
        data: {
          _embedded: { items },
          page: newPage,
        },
      } = await Item.getAllByCategory(category, page.number, 1)
      setItems(items)
      setPage(newPage)
    }
    fetchItems()
  }, [page.number])

  const handlePageChange = number => {
    setPage({ ...page, number: number - 1 })
  }

  return (
    <div>
      <div className="item-container">
        {items.map(item => (
          <GoodItem key={item.id} {...item} url={item.images[0].url} />
        ))}
      </div>
      <Pagination
        style={{ marginTop: '1%' }}
        current={page.number + 1}
        pageSize={page.size}
        total={page.totalElements}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default ItemTable
