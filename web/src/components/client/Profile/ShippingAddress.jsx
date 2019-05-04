import React, { useState, useEffect, Component } from 'react'
import { List, Button, Modal, Form, Input, Cascader, message } from 'antd'
import Address from '@/components/client/Address'
import residences from '@/components/client/data.json'
import User from '@/models/User'

class AddressForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const [province, city, country] = values.residence
        delete values.residence
        const data = {
          province,
          city,
          country,
          ...values,
        }
        await User.addShippingAddress(data)
        this.props.setVisible(false)
        message.success('添加成功！')
        await this.props.fetchData()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="名字">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入名字！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="地址">
          {getFieldDecorator('residence', {
            initialValue: ['北京市', '北京市', '朝阳区'],
            rules: [{ type: 'array', required: true, message: '请选择地区！' }],
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item label="详细地址">
          {getFieldDecorator('detail', {
            rules: [
              {
                required: true,
                message: '请输入详细地址！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="电话号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入电话号码！' }],
          })(<Input style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedAddressForm = Form.create()(AddressForm)

const ShippingAddress = ({ id }) => {
  const [addresses, setAddresses] = useState([])
  const [visible, setVisible] = useState(false)

  const fetchData = async () => {
    const { data } = await User.getShippingAddresses(id)
    setAddresses(data._embedded.shippingAddresses)
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  const handleRemove = id => async () => {
    await User.removeShippingAddress(id)
    await fetchData()
  }

  const handleSetDefault = id => async () => {
    await User.setShippingAddressDefault(id)
    await fetchData()
  }

  const handleAdd = () => setVisible(true)

  return (
    <div>
      <Button onClick={handleAdd} type="primary">
        添加
      </Button>
      <List
        dataSource={addresses}
        renderItem={({ id, name, address, isDefault, phoneNumber }) => (
          <List.Item
            actions={[
              <Button onClick={handleSetDefault(id)}>设为默认</Button>,
              <Button onClick={handleRemove(id)}>删除</Button>,
            ]}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ width: 32 }}>{name}</span>
              <span
                style={{
                  marginLeft: 8,
                  width: '40%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Address {...address} />
              </span>
              <span style={{ width: 128 }}>{phoneNumber}</span>
              {isDefault ? <span style={{ backgroundColor: '#eee', width: 64 }}>默认地址</span> : null}
            </div>
          </List.Item>
        )}
      />
      <Modal title="添加收货地址" visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <WrappedAddressForm setVisible={setVisible} fetchData={fetchData} key={visible} />
      </Modal>
    </div>
  )
}

export default ShippingAddress
