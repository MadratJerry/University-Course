import React, { Component } from 'react'
import { Popconfirm, Button, Table, message } from 'antd'
import EditableCell from './EditableCell'
import EditableForm from './EditableForm'

class TeacherTable extends Component {
  state = {
    visible: false,
    dataSource: [],
    columns: [
      {
        title: '工号',
        dataIndex: 'teacherId',
        inputType: { type: 'input' },
      },
      {
        title: '姓名',
        dataIndex: 'teacherName',
        inputType: { type: 'input' },
      },
      {
        title: '性别',
        dataIndex: 'teacherGender',
        inputType: { type: 'select', options: new Map([['男', '男'], ['女', '女']]) },
      },
      {
        title: '生日',
        dataIndex: 'teacherBirth',
        inputType: { type: 'date' },
      },
      {
        title: '专业',
        dataIndex: 'collegeId',
        inputType: { type: 'select', options: new Map() },
      },
      {
        title: '手机',
        dataIndex: 'teacherPhone',
        inputType: { type: 'input' },
      },
      {
        title: '密码',
        dataIndex: 'teacherPassword',
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
      dataSource: (await (await fetch('/api/teacher')).json()).map(e => {
        e.key = e.teacherId
        return e
      }),
    })
    const options = new Map((await (await fetch('/api/college')).json()).map(m => [m.collegeId, m.collegeName]))
    const { columns } = this.state
    columns[4].inputType.options = options
    this.setState({ columns })
  }
  onCellChange = (key, dataIndex) => {
    return async value => {
      const result = await fetch(`/api/teacher/${key}`, {
        method: 'PUT',
        body: JSON.stringify({ [dataIndex]: value }),
      })
      if (result.ok && result.status === 200) message.success('修改成功！')
      else message.error('修改失败！')
      await this.fetchData()
    }
  }
  onDelete = async key => {
    const result = await fetch(`/api/teacher/${key}`, { method: 'DELETE' })
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
          title="添加老师"
          apiUrl="/api/teacher"
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

export default TeacherTable
