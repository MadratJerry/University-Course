import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Button, Icon, message } from 'antd'
import User from '@/models/User'

const UserTable = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState({ current: 1, pageSize: 2, total: 0 })
  const [loading, setLoading] = useState(true)
  const inputRef = useRef()

  const resetPassword = id => async () => {
    const { response } = await User.updateInfo(id, { password: '123456' })
    if (response.ok) {
      message.success('重置成功！')
    } else {
      message.error('重置失败！')
    }
  }

  const handleSearch = async (selectedKeys, confirm) => {
    confirm()
    const { data } = await User.getUserByUsername(selectedKeys[0])
    setData(data ? [data] : [])
    setPage({ current: 1, pageSize: 1, total: 1 })
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputRef}
          placeholder={`搜索用户`}
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
      title: '用户名',
      dataIndex: 'username',
      width: '20%',
      ...getColumnSearchProps('username'),
    },
    {
      title: '金币',
      dataIndex: 'money',
      width: '20%',
    },
    {
      title: '类型',
      dataIndex: 'roles',
      render: roles => (roles[0].authority === 'ROLE_USER' ? '普通用户' : '管理员'),
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: record => (
        <Button onClick={resetPassword(record.id)} size="small">
          重置密码
        </Button>
      ),
    },
  ]

  const fetchData = async number => {
    setLoading(true)
    const { data } = await User.getAllUser({ page: number, size: 2 })
    setData(data._embedded.users)
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

export default UserTable
