import React from 'react'
import { Card, Form, InputNumber, Input, Button, message, Select, Cascader, Modal } from 'antd'
import Item from '@/models/Item'
import Category from '@/models/Category'
import residences from '@/components/client/data.json'
import ImageWall from './ImageWall'

const { confirm } = Modal
const { TextArea } = Input
const { Option } = Select

class ItemDetail extends React.Component {
  state = {
    categories: [],
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (Object.keys(this.props.data).length) {
          const { response } = await Item.updateItem(this.props.data.id, values)
          if (response.ok) {
            message.success('保存成功！')
            this.props.setVisible(false)
            this.props.fetchData()
          }
        } else {
          const { response } = await Item.addItem(values)
          if (response.ok) {
            message.success('添加成功！')
            this.props.setVisible(false)
            this.props.fetchData()
          }
        }
      }
    })
  }

  handleState = state => async () => {
    await Item.updateItem(this.props.data.id, { itemState: state })
    message.success('操作成功！')
    this.props.setVisible(false)
    this.props.fetchData()
  }

  async componentDidMount() {
    const { data } = await Category.getAll()
    this.setState({
      categories: data._embedded.categories,
    })
  }

  render() {
    const { data } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{ required: true, message: '请输入名称！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="售价">
            {getFieldDecorator('price', {
              initialValue: data.price,
              rules: [{ required: true, message: '请输入售价！' }],
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="原价">
            {getFieldDecorator('originalPrice', {
              initialValue: data.originalPrice,
              rules: [{ required: true, message: '请输入原价！' }],
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="分类">
            {getFieldDecorator('category', {
              initialValue: (data.category || {}).id,
              rules: [{ required: true, message: '请选择分类！' }],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择分类"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.state.categories.map(c => (
                  <Option value={c.id} key={c.id}>
                    {c.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('location', {
              initialValue: data.location ? [data.location.province, data.location.city, data.location.country] : [],
              rules: [{ type: 'array', required: true, message: '请选择地区！' }],
            })(<Cascader options={residences} placeholder="选择地区" />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator('images', {
              initialValue: data.images || [],
              rules: [{ required: true, message: '请选择图片！' }],
            })(<ImageWall key={data.images} />)}
          </Form.Item>
          <Form.Item label="详情">
            {getFieldDecorator('description', {
              initialValue: data.description,
            })(<TextArea min={0} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {Object.keys(data).length === 0 ? '添加' : '保存'}
            </Button>
            {Object.keys(data).length === 0 ? null : data.itemState !== 'OFF' ? (
              <Button
                style={{ marginLeft: 8 }}
                type="danger"
                onClick={() => {
                  confirm({
                    title: '确认下架当前商品？',
                    content: '下架后商品无法再次上架，如要上架请联系管理员！',
                    onOk: () => this.handleState('OFF')(),
                  })
                }}
              >
                下架
              </Button>
            ) : null}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ItemDetail)
