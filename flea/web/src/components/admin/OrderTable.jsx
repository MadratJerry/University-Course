import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Button, Icon, Modal, message } from 'antd'
import ItemOrder from '@/models/ItemOrder'
import User from '@/models/User'
import { OrderState } from '../client/Profile/Order'

const { confirm } = Modal
const ItemTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState({ current: 1, pageSize: 2, total: 0 })
  const [loading, setLoading] = useState(true)
  const inputRef = useRef()

  const handleSearch = async (selectedKeys, confirm) => {
    confirm()
    const { data } = await ItemOrder.getById(selectedKeys[0])
    setData(data ? [data] : [])
    setPage({ current: 1, pageSize: 1, total: 1 })
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputRef}
          placeholder={`搜索物品`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => {
            clearFilters()
            fetchData(0)
          }}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => inputRef.current.focus())
      }
    },
  })

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
    },
    {
      title: '物品编号',
      width: '10%',
      render: record => record.item.id,
    },
    {
      title: '物品售价',
      width: '20%',
      render: record => record.item.price,
    },
    {
      title: '意向价格',
      dataIndex: 'price',
      width: '20%',
    },
    {
      title: '订单状态',
      width: '20%',
      render: record => OrderState(record.orderState),
    },
    {
      title: '操作',
      dataIndex: '',
      render: record => (
        <Button
          onClick={() => {
            confirm({
              title: '确认强制取消当前订单？',
              async onOk() {
                await ItemOrder.updateOrder(record.id, { orderState: 'CANCELED' })
                await User.updateInfo(record.user.id, { money: record.user.money + record.price })
                message.success('取消成功！')
                fetchData()
              },
            })
          }}
          size="small"
          type="danger"
          disabled={record.orderState !== 'UNRECEIVED' && record.orderState !== 'UNFINISHED'}
        >
          取消
        </Button>
      ),
    },
  ]

  const fetchData = async number => {
    setLoading(true)
    const { data } = await ItemOrder.getAllOrders()
    setData(data._embedded.itemOrders)
    setPage({ total: data.page.totalElements, current: data.page.number + 1, pageSize: data.page.size })
    setLoading(false)
  }

  useEffect(() => {
    fetchData(page.current - 1)
  }, [page.current])

  const handleChange = (pagination, filters, sorter) => {
    setPage(pagination)
  }

  return (
    <div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        loading={loading}
        dataSource={data}
        pagination={page}
        onChange={handleChange}
      />
    </div>
  )
}

export default ItemTable
