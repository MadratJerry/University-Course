import React, { Component } from 'react'
import { Modal, Form, Input, Button, DatePicker, Select, message } from 'antd'
const { Item: FormItem } = Form
const { Option } = Select

class EditableForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.columns
          .filter(c => c.inputType.type === 'date')
          .forEach(c => (values[c.dataIndex] = values[c.dataIndex].format('x')))
        const result = await fetch(this.props.apiUrl, { method: 'POST', body: JSON.stringify(values) })
        if (result.ok && result.status === 200) {
          message.success('添加成功！')
          this.props.onSuccess()
          this.props.toggle()
        } else message.error('添加失败！')
      }
    })
  }
  getFormItem = (c, key) => {
    const { formConfig = {} } = this.props
    const { getFieldDecorator } = this.props.form
    const formProps = { key, label: c.title }
    let e = null
    switch (c.inputType.type) {
      case 'select':
        let initialValue
        for (const v of c.inputType.options) {
          initialValue = v[0]
          break
        }
        e = getFieldDecorator(c.dataIndex, {
          initialValue,
          rules: [{ required: true, message: `请选择${c.title}'` }],
        })(
          <Select placeholder="Please select a country">
            {(map => {
              const a = []
              map.forEach((v, k) =>
                a.push(
                  <Option key={k} value={k}>
                    {v}
                  </Option>,
                ),
              )
              return a
            })(c.inputType.options)}
          </Select>,
        )
        break
      case 'date':
        e = getFieldDecorator(c.dataIndex, {
          rules: [{ required: true, message: `请选择${c.title}'` }],
        })(<DatePicker placeholder={`选择${c.title}`} />)
        break
      case 'password':
        e = getFieldDecorator(c.dataIndex, {
          rules: [{ required: true, message: `请输入${c.title}'` }],
        })(<Input placeholder={`输入${c.title}`} type="password" />)
        break
      default:
        e = getFieldDecorator(c.dataIndex, {
          initialValue: formConfig[c.dataIndex] && formConfig[c.dataIndex].init,
          rules: [{ required: true, message: `请输入${c.title}'` }],
        })(
          <Input
            placeholder={`输入${c.title}`}
            disabled={formConfig[c.dataIndex] ? formConfig[c.dataIndex].disabled : false}
          />,
        )
    }
    return (
      <FormItem {...formProps} hasFeedback style={{ display: 'block' }}>
        {e}
      </FormItem>
    )
  }
  render() {
    const { title, columns, toggle, visible } = this.props

    return (
      <Modal title={title} visible={visible} onOk={this.handleAdd} onCancel={toggle} footer={null} width={400}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          {columns.map((c, i) => this.getFormItem(c, i))}
          <br />
          <FormItem style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditableForm)
