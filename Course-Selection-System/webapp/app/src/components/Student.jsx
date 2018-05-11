import React, { Component } from 'react'
import { Table, Input, Icon, Popconfirm, Button, Select, DatePicker } from 'antd'
import moment from 'moment'
import './Student.css'

const Option = Select.Option
const dateFormat = 'YYYY-MM-DD'

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = value => {
    this.setState({ value })
  }
  check = () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }
  edit = () => {
    this.setState({ editable: true })
  }
  getInput = type => {
    switch (type) {
      case 'text':
        return (
          <Input value={this.state.value} onChange={e => this.handleChange(e.target.value)} onPressEnter={this.check} />
        )
      case 'gender':
        return (
          <Select value={this.state.value} onChange={this.handleChange}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        )
      case 'date':
        return <DatePicker value={moment(new Date(this.state.value), dateFormat)} />
      case 'password':
        return (
          <Input
            type="password"
            value={this.state.value}
            onChange={e => this.handleChange(e.target.value)}
            onPressEnter={this.check}
          />
        )
      default:
        return <Input value={this.state.value} onChange={this.handleChange} onPressEnter={this.check} />
    }
  }
  getDisplay = (type, value) => {
    switch (type) {
      case 'date':
        return <DatePicker defaultValue={moment(new Date(value), dateFormat)} disabled />
      case 'password':
        return '******'
      default:
        return value || ''
    }
  }
  render() {
    const { value, editable } = this.state
    const { type } = this.props
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            {this.getInput(type)}
            <Icon type="check" className="editable-cell-icon-check" onClick={this.check} />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            {this.getDisplay(type, value)}
            <Icon type="edit" className="editable-cell-icon" onClick={this.edit} />
          </div>
        )}
      </div>
    )
  }
}

class EditableTable extends React.Component {
  state = {
    dataSource: [],
    count: 0,
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '学号',
        dataIndex: 'studentId',
        inputType: 'input',
      },
      {
        title: '姓名',
        dataIndex: 'studentName',
        inputType: 'input',
      },
      {
        title: '性别',
        dataIndex: 'studentGender',
        inputType: 'gender',
      },
      {
        title: '生日',
        dataIndex: 'studentBirth',
        inputType: 'date',
      },
      {
        title: '密码',
        dataIndex: 'studentPassword',
        inputType: 'password',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return this.state.dataSource.length > 1 ? (
            <Popconfirm title="确认删除吗？" onConfirm={() => this.onDelete(record.key)}>
              <Button>删除</Button>
            </Popconfirm>
          ) : null
        },
      },
    ]
  }

  async componentDidMount() {
    this.setState({
      dataSource: (await (await fetch('/api/student')).json()).map((e, i) => {
        e.key = i
        return e
      }),
    })
  }
  onCellChange = (key, dataIndex) => {
    return value => {
      const dataSource = [...this.state.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.setState({ dataSource })
      }
    }
  }
  onDelete = key => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }
  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    })
  }
  render() {
    const { dataSource } = this.state
    const columns = this.columns
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>
          添加
        </Button>
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

class Student extends Component {
  render() {
    return <EditableTable />
  }
}

export default Student
