import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, Select, Form, InputNumber, Button, message } from 'antd'
import GoodPrice from '@/components/client/Price'
import User, { UserConext } from '@/models/User'
import Address from '@/components/client/Address'
import Item from '@/models/Item'

const Option = Select.Option

class Order extends Component {
  state = {
    addresses: [],
  }

  async componentDidMount() {
    const [user] = this.context
    const { data } = await User.getShippingAddresses(user.id)
    this.setState({ addresses: data._embedded.shippingAddresses })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        await Item.addOrder(this.props.data.id, values)
        message.success('请求发起成功')
        this.props.setVisible(false)
      }
    })
  }

  render() {
    const data = this.props.data
    const { getFieldDecorator } = this.props.form
    const defaultAddress = (this.state.addresses.filter(a => a.isDefault)[0] || {}).id

    return (
      <div className="good-order">
        <Card bordered={false}>
          <Card.Meta
            avatar={<Avatar shape="square" size={64} src={data.images[0].url} />}
            title={data.name}
            description={
              <>
                <GoodPrice className="price" value={data.price} />
                <GoodPrice className="original-price" value={data.originalPrice} />
              </>
            }
          />
        </Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="意向价格">
            {getFieldDecorator('price', {
              initialValue: data.price,
              rules: [{ required: true }],
            })(<InputNumber min={0} max={data.price} />)}
          </Form.Item>
          <Form.Item label="收货地址">
            {getFieldDecorator('shippingAddress', {
              initialValue: defaultAddress,
              rules: [
                {
                  required: true,
                  message: '请选择收货地址！',
                },
              ],
            })(
              <Select>
                {this.state.addresses.map(a => (
                  <Option value={a.id} key={a.id}>
                    {a.name} <Address {...a.address} /> {a.phoneNumber} {a.isDefault ? '默认' : ''}
                  </Option>
                ))}
              </Select>,
            )}
            {this.state.addresses.length ? null : <Link to="/profile/address">添加地址</Link>}
          </Form.Item>

          <Form.Item label="交易方式">
            {getFieldDecorator('buyWay', {
              initialValue: 'ONLINE',
            })(
              <Select>
                <Option value="ONLINE">在线交易</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

Order.contextType = UserConext

export default Form.create()(Order)
