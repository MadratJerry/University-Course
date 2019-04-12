import React from 'react'

const Price = ({ value, ...rest }) => (
  <span {...rest}>
    <i style={{ fontSize: '80%' }}>¥</i>
    {value.toFixed(2)}
  </span>
)

export default Price
