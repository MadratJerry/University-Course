import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import User from '@/models/User'

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { response } = await User.login(values)
        if (response.ok) {
          message.success('登录成功！')
          this.props.setVisible(false)
          this.props.setUser({ verified: true })
        } else message.error('登录失败，用户名或密码错误！')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
          <a
            className="login-form-forgot"
            href="/forgot"
            style={{ float: 'right' }}
          >
            忘记密码
          </a>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'login' })(Login)
