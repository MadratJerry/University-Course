import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Icon, message } from 'antd'
const FormItem = Form.Item

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(values),
        })
        if (response.status === 200) {
          this.props.history.push('/dashboard')
          message.info('登录成功！')
        } else if (response.status === 401) {
          message.error('用户名或密码错误！')
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: 300 }}>
          <h1 style={{ textAlign: 'center' }}>学生选课系统</h1>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            <section style={{ display: 'flex', justifyContent: 'space-between' }}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </section>
            <section style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </section>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
