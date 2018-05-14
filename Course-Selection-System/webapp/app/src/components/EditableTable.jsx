import React, { Component } from 'react'
import { Popconfirm, Button, Table, message } from 'antd'
import EditableCell from './EditableCell'
import EditableForm from './EditableForm'
import './EditableTable.css'

function EditableTable({ columns, name, titleName }) {
  return class extends Component {
    state = {
      visible: false,
      dataSource: [],
      columns: [
        ...columns,
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
        dataSource: (await (await fetch(`/api/${name}`)).json()).map(e => {
          e.key = e[name + 'Id']
          return e
        }),
      })
      const { columns } = this.state
      for (const c of columns.filter(c => c.inputType && c.inputType.type === 'select' && c.inputType.from)) {
        const options = new Map(
          (await (await fetch(`/api/${c.inputType.from}`)).json()).map(
            c.inputType.mapFn || (m => [m[c.inputType.from + 'Id'], m[c.inputType.from + 'Name']]),
          ),
        )
        c.inputType.options = options
      }
      this.setState({ columns })
    }
    onCellChange = (key, dataIndex) => {
      return async value => {
        const result = await fetch(`/api/${name}/${key}`, {
          method: 'PUT',
          body: JSON.stringify({ [dataIndex]: value }),
        })
        if (result.ok && result.status === 200) message.success('修改成功！')
        else message.error('修改失败！')
        await this.fetchData()
      }
    }
    onDelete = async key => {
      const result = await fetch(`/api/${name}/${key}`, { method: 'DELETE' })
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
            title={`添加${titleName}`}
            apiUrl={`/api/${name}`}
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
}

export default EditableTable
