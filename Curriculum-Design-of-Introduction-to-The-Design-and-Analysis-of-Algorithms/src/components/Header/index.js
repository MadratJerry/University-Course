import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div
    style={{
      background: 'rebeccapurple',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          算法设计与分析课程设计
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
