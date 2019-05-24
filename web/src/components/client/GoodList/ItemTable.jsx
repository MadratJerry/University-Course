import React, { useEffect, useState, useMemo } from 'react'
import { Card, Pagination, Spin, Empty, Select, Drawer, Button, Divider, Input, Radio } from 'antd'
import GoodItem from '@/components/client/GoodList/GoodItem'
import Item from '@/models/Item'
import './ItemTable.css'

const InputGroup = Input.Group
const Option = Select.Option
const Search = Input.Search

const ItemTable = ({ category }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [page, setPage] = useState({ size: 2, totalElements: 0, totalPages: 0, number: 0 })
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({})

  const fetchItems = async number => {
    setLoading(true)
    const {
      data: {
        _embedded: { items },
        page: newPage,
      },
    } = await Item.getAllByCategory({
      category,
      page: number,
      size: page.size,
      ...filter,
    })
    setLoading(false)
    setItems(items)
    setPage({ ...page, ...newPage })
  }

  useEffect(() => {
    fetchItems(page.number)
  }, [category, page.number, filter.sort, filter.name])

  const handlePageChange = number => setPage({ ...page, number: number - 1 })

  const handleSortChange = sort => setFilter({ sort })

  const handleFilterClick = () => setOpen(true)

  const handleDrawerClose = () => setOpen(false)

  const handleFilterConfirm = () => fetchItems(0) && setOpen(false)

  const handleFilterReset = () => setFilter({})

  const handlePriceChange = priceKey => e => setFilter({ ...filter, [priceKey]: e.target.value })

  const handleDateChange = e => setFilter({ ...filter, createdDate: e.target.value })

  const nDayAgo = n =>
    useMemo(() => {
      const date = new Date()
      date.setDate(date.getDate() - n)
      return date.toISOString()
    }, [])

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
              <Input placeholder="最低价" value={filter.priceLow} onChange={handlePriceChange('priceLow')} />
              <Input placeholder="~" disabled />
              <Input placeholder="最高价" onChange={handlePriceChange('priceHigh')} />
            </InputGroup>
            <Divider orientation="left">发布时间</Divider>
            <Radio.Group size="small" value={filter.createdTime} onChange={handleDateChange}>
              <Radio.Button value={nDayAgo(1)}>1天内</Radio.Button>
              <Radio.Button value={nDayAgo(7)}>7天内</Radio.Button>
              <Radio.Button value={nDayAgo(14)}>14天内</Radio.Button>
              <Radio.Button value={nDayAgo(30)}>30天内</Radio.Button>
            </Radio.Group>
          </div>
          <div className="filter-buttons">
            <Button.Group>
              <Button type="default" onClick={handleFilterReset}>
                重置
              </Button>
              <Button type="primary" onClick={handleFilterConfirm}>
                确定
              </Button>
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
          <Search
            placeholder="请输入想要搜索的内容"
            onSearch={value => setFilter({ ...filter, name: value })}
            enterButton
            style={{ margin: '0 16px' }}
          />
          <Button type="primary" icon="filter" onClick={handleFilterClick}>
            筛选
          </Button>
        </div>
      </Card>
      {items.length ? (
        <>
          <Spin spinning={loading} delay={300}>
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
