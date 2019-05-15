import React from 'react'
import { Form, Input, Button, message } from 'antd'
import User, { UserConext } from '@/models/User'

class Info extends React.Component {
  state = {
    confirmDirty: false,
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

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} style={{ width: 500 }}>
          <UserConext.Consumer>
            {([user]) => (
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
            )}
          </UserConext.Consumer>
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

Info.contextType = UserConext

export default Form.create()(Info)
