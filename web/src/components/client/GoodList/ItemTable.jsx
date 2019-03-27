import React, { useEffect, useState, useRef } from 'react'
import { Card, Pagination, Spin, Empty, Select, Drawer, Button, Divider, Input, Radio } from 'antd'
import GoodItem from '@/components/client/GoodList/GoodItem'
import Item from '@/models/Item'
import './ItemTable.css'

const InputGroup = Input.Group
const Option = Select.Option

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const ItemTable = ({ category }) => {
  const previous = usePrevious(category)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [page, setPage] = useState({ size: 20, totalElements: 0, totalPages: 0, number: 0 })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchItems = async () => {
      const {
        data: {
          _embedded: { items },
          page: newPage,
        },
      } = await Item.getAllByCategory({
        category,
        page: category === previous ? page.number : 0,
        size: 1,
        sort: page.sort,
      })
      setLoading(false)
      setItems(items)
      setPage({ ...page, ...newPage })
    }
    fetchItems()
  }, [category, page.number, page.sort])

  const handlePageChange = number => setPage({ ...page, number: number - 1 })

  const handleSortChange = sort => setPage({ ...page, sort })

  const handleFilterClick = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  return (
    <div>
      <Drawer
        title="筛选"
        className="filter-drawer"
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={open}
      >
        <div className="filter-drawer-container">
          <div className="filter-content">
            <Divider orientation="left">价格</Divider>
            <InputGroup compact className="price-group" size="small">
              <Input placeholder="最低价" />
              <Input placeholder="~" disabled />
              <Input placeholder="最高价" />
            </InputGroup>
            <Divider orientation="left">发布时间</Divider>
            <Radio.Group size="small">
              <Radio.Button value="a">1天内</Radio.Button>
              <Radio.Button value="b">7天内</Radio.Button>
              <Radio.Button value="c">14天内</Radio.Button>
              <Radio.Button value="d">30天内</Radio.Button>
            </Radio.Group>
          </div>
          <div className="filter-buttons">
            <Button.Group>
              <Button type="default">重置</Button>
              <Button type="primary">确定</Button>
            </Button.Group>
          </div>
        </div>
      </Drawer>
      <Card bordered={false} size="small" title={category ? category : '全部'}>
        <div className="filter-container">
          <Select defaultValue=",asc" style={{ width: 120 }} onChange={handleSortChange}>
            <Option value=",asc">综合排序</Option>
            <Option value="price,asc">价格从低到高</Option>
            <Option value="price,desc">价格从高到低</Option>
            <Option value="createdDate,desc">最新发布</Option>
          </Select>
          <Button type="primary" icon="filter" onClick={handleFilterClick}>
            筛选
          </Button>
        </div>
      </Card>
      {items.length ? (
        <>
          <Spin spinning={loading}>
            <div className="item-container">
              {items.map(item => (
                <GoodItem key={item.id} {...item} url={item.images[0].url} />
              ))}
            </div>
          </Spin>
          <Pagination
            style={{ marginTop: '1%' }}
            current={page.number + 1}
            pageSize={page.size}
            total={page.totalElements}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default ItemTable
