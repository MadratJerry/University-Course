import React, { Component } from 'react'
import { Input, Icon, Select, DatePicker } from 'antd'
import moment from 'moment'

const Option = Select.Option
const dateFormat = 'YYYY-MM-DD'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = value => this.setState({ value })

  check = () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }
  edit = () => {
    this.setState({ editable: true })
  }
  getInput = inputType => {
    const { type } = inputType
    switch (type) {
      case 'input':
        return (
          <Input value={this.state.value} onChange={e => this.handleChange(e.target.value)} onPressEnter={this.check} />
        )
      case 'select':
        return (
          <Select value={this.state.value} onChange={this.handleChange}>
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
            })(inputType.options)}
          </Select>
        )
      case 'date':
        return <DatePicker value={moment(new Date(this.state.value), dateFormat)} />
      case 'password':
        return (
          <Input
            type="password"
            value={this.state.value}
            onChange={e => this.handleChange(e.target.value)}
            onPressEnter={this.check}
          />
        )
      default:
        return <Input value={this.state.value} onChange={this.handleChange} onPressEnter={this.check} />
    }
  }
  getDisplay = (inputType, value) => {
    const { type } = inputType
    switch (type) {
      case 'select':
        return inputType.options.get(value)
      case 'date':
        return <DatePicker defaultValue={moment(new Date(value), dateFormat)} disabled />
      case 'password':
        return '******'
      default:
        return value || ''
    }
  }
  render() {
    const { value, editable } = this.state
    const { type } = this.props
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            {this.getInput(type)}
            <Icon type="check" className="editable-cell-icon-check" onClick={this.check} />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            {this.getDisplay(type, value)}
            <Icon type="edit" className="editable-cell-icon" onClick={this.edit} />
          </div>
        )}
      </div>
    )
  }
}

export default EditableCell
