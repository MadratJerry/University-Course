import React, { Component } from 'react'
import { Popconfirm, Button, Table, message } from 'antd'
import EditableCell from './EditableCell'
import './Student.css'
import EditableForm from './EditableForm'

class StudentTable extends Component {
  state = {
    visible: false,
    dataSource: [],
    columns: [
      {
        title: '学号',
        dataIndex: 'studentId',
        inputType: { type: 'input' },
      },
      {
        title: '姓名',
        dataIndex: 'studentName',
        inputType: { type: 'input' },
      },
      {
        title: '性别',
        dataIndex: 'studentGender',
        inputType: { type: 'select', options: new Map([['男', '男'], ['女', '女']]) },
      },
      {
        title: '生日',
        dataIndex: 'studentBirth',
        inputType: { type: 'date' },
      },
      {
        title: '专业',
        dataIndex: 'majorId',
        inputType: { type: 'select', options: new Map() },
      },
      {
        title: '密码',
        dataIndex: 'studentPassword',
        inputType: { type: 'password' },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return this.state.dataSource.length > 1 ? (
            <Popconfirm
              title="确认删除吗？"
              onConfirm={() => this.onDelete(record.key)}
              okText="确认"
              cancelText="取消"
            >
              <Button>删除</Button>
            </Popconfirm>
          ) : null
        },
      },
    ],
    count: 0,
  }
  async componentDidMount() {
    await this.fetchData()
  }
  fetchData = async () => {
    this.setState({
      dataSource: (await (await fetch('/api/student')).json()).map(e => {
        e.key = e.studentId
        return e
      }),
    })
    const options = new Map((await (await fetch('/api/major')).json()).map(m => [m.majorId, m.majorName]))
    const { columns } = this.state
    columns[4].inputType.options = options
    this.setState({ columns })
  }
  onCellChange = (key, dataIndex) => {
    return async value => {
      const result = await fetch(`/api/student/${key}`, {
        method: 'PUT',
        body: JSON.stringify({ [dataIndex]: value }),
      })
      if (result.ok && result.status === 200) message.success('修改成功！')
      else message.error('修改失败！')
      await this.fetchData()
    }
  }
  onDelete = async key => {
    const result = await fetch(`/api/student/${key}`, { method: 'DELETE' })
    if (result.ok && result.status === 200) message.success('删除成功！')
    else message.error('删除失败！')
    await this.fetchData()
  }
  render() {
    const { dataSource, columns, visible } = this.state
    return (
      <div>
        <Button className="editable-add-btn" type="primary" onClick={() => this.setState({ visible: true })}>
          添加
        </Button>
        <EditableForm
          columns={columns.filter(({ title }) => title !== '操作')}
          toggle={() => this.setState({ visible: !visible })}
          onSuccess={this.fetchData}
          visible={visible}
          title="添加学生"
        />
        <Table
          bordered
          dataSource={dataSource}
          columns={columns.map(e => {
            if (e.inputType)
              e.render = (text, record) => (
                <EditableCell value={text} onChange={this.onCellChange(record.key, e.dataIndex)} type={e.inputType} />
              )
            return e
          })}
        />
      </div>
    )
  }
}

export default StudentTable
