import React from 'react'
import { Form, Icon, Input, Button } from 'antd'

class Login extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
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
