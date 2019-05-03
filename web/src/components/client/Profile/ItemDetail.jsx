import React from 'react'
import { Card, Form, InputNumber, Input, Button, message } from 'antd'
import ImageWall from './ImageWall'
import Item from '@/models/Item'

const { TextArea } = Input

class ItemDetail extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { response } = await Item.updateItem(this.props.data.id, values)
        if (response.ok) {
          message.success('保存成功！')
          this.props.setVisible(false)
          this.props.fetchData()
        }
      }
    })
  }
  render() {
    const { data } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Card title={data.name} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="售价">
            {getFieldDecorator('price', {
              initialValue: data.price,
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="原价">
            {getFieldDecorator('originalPrice', {
              initialValue: data.originalPrice,
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="图片">
            {getFieldDecorator('images', {
              initialValue: data.images,
            })(<ImageWall />)}
          </Form.Item>
          <Form.Item label="详情">
            {getFieldDecorator('description', {
              initialValue: data.description,
            })(<TextArea min={0} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ItemDetail)
