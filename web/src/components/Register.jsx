import React from 'react'
import { Form, Input, Button, message } from 'antd'
import User from '@/models/User'

class Register extends React.Component {
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

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { response } = await User.addUser(values)

        if (response.ok) {
          message.success('注册成功！')
          this.props.setVisible(false)
        } else {
          message.error('注册失败！')
        }
      }
    })
  }

  checkUsername = async (rule, value, callback) => {
    const { data } = await User.getUserByUsername(value)
    if (data) {
      callback('该用户名已被使用！')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="用户名" hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户名！',
              },
              {
                validator: this.checkUsername,
              },
            ],
          })(<Input />)}
        </Form.Item>
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
            注册
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(Register)
