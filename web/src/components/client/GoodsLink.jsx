import React from 'react'
import { Link } from 'react-router-dom'

const GoodsLink = ({ keyName }) => <Link to={`/goods?key=${keyName}`}>{keyName}</Link>

export default GoodsLink
