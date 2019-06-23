import React from 'react'

const Price = ({ value, ...rest }) => (
  <span {...rest}>
    <i style={{ fontSize: '80%' }}>¥</i>
    {(value || 0).toFixed(2)}
  </span>
)

export default Price
