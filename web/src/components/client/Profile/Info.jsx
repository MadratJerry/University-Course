import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Modal, InputNumber } from 'antd'
import GoodPrice from '@/components/client/Price'
import User, { UserContext } from '@/models/User'
import { request } from '@/services/fetch'
var QRCode = require('qrcode.react')

const TopUp = ({ id, close }) => {
  const [value, setValue] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const [topId, setTopId] = useState(0)
  const [stop, setStop] = useState()

  const handleTopUp = async () => {
    const { data } = await request('/topUps', 'POST', {
      user: `/${id}`,
      money: value,
    })
    setTopId(data.id)
    setConfirm(true)
    const stop = setInterval(async () => {
      const { data: top } = await request(`/topUps/${data.id}?projection=detail`)
      if (!top) {
        message.success('充值成功！')
        window.location.reload()
      }
    }, 1000)
    setStop(stop)
  }

  useEffect(() => {
    return () => clearInterval(stop)
  }, [stop])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {confirm ? (
        <QRCode value={`${window.location.origin}/topUps/${topId}`} size={256} />
      ) : (
        <>
          金额
          <InputNumber value={value} onChange={e => setValue(e)} />
          <Button type="primary" onClick={handleTopUp}>
            确认
          </Button>
        </>
      )}
    </div>
  )
}
class Info extends React.Component {
  state = {
    confirmDirty: false,
    visible: false,
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码需一致！')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  checkUsername = async (rule, value, callback) => {
    const [user] = this.context
    if (value === user.username) callback()
    else {
      const { data } = await User.getUserByUsername(value)
      if (data) {
        callback('该用户名已被使用！')
      } else {
        callback()
      }
    }
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const [user] = this.context
        for (const v in values) if (values[v] === undefined) delete values[v]

        const { response } = await User.updateInfo(user.id, values)
        if (response.ok) {
          message.success('修改成功！')
        } else {
          message.error('修改失败！')
        }
      }
    })
  }

  handleTopUp = () => {
    this.setState({ visible: true })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} style={{ width: 500 }}>
          <UserContext.Consumer>
            {([user]) => (
              <>
                <Form.Item label="用户名" hasFeedback>
                  {getFieldDecorator('username', {
                    initialValue: user.username,
                    rules: [
                      {
                        required: true,
                        message: '请输入名字！',
                      },
                      {
                        validator: this.checkUsername,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="金币">
                  <GoodPrice style={{ color: '#ff3434' }} value={user.money} />
                  <Button type="primary" onClick={this.handleTopUp}>
                    充值
                  </Button>
                </Form.Item>
                <Modal visible={this.state.visible} footer={null} onCancel={() => this.setState({ visible: false })}>
                  {this.state.visible ? <TopUp id={user.id} close={() => this.setState({ visible: false })} /> : null}
                </Modal>
              </>
            )}
          </UserContext.Consumer>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  min: 6,
                  message: '密码不能少于6个字符！',
                },
                {
                  max: 32,
                  message: '密码不能大于32个字符！',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
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

Info.contextType = UserContext

export default Form.create()(Info)
