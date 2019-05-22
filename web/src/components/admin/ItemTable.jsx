import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Button, Icon, Modal, message } from 'antd'
import Item from '@/models/Item'

const { confirm } = Modal
const ItemTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState({ current: 1, pageSize: 2, total: 0 })
  const [loading, setLoading] = useState(true)
  const inputRef = useRef()

  const changeState = async (id, state) => {
    await Item.updateItem(id, { itemState: state })
    message.success('操作成功！')
    fetchData()
  }

  const handleSearch = async (selectedKeys, confirm) => {
    confirm()
    const { data } = await Item.getById(selectedKeys[0])
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
      title: '物品编号',
      dataIndex: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
    },
    {
      title: '物品名',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: '原价',
      dataIndex: 'originalPrice',
      width: '20%',
    },
    {
      title: '售价',
      dataIndex: 'price',
      width: '20%',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: record => (
        <Button
          onClick={() => {
            record.itemState === 'OFF'
              ? changeState(record.id, 'SELLING')
              : confirm({
                  title: '确认下架当前商品？',
                  onOk() {
                    changeState(record.id, 'OFF')
                  },
                })
          }}
          size="small"
          type={record.itemState === 'OFF' ? 'primary' : 'danger'}
        >
          {record.itemState === 'OFF' ? '上架' : '下架'}
        </Button>
      ),
    },
  ]

  const fetchData = async number => {
    setLoading(true)
    const { data } = await Item.getAllByCategory({ page: number, size: 2 })
    setData(data._embedded.items)
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
