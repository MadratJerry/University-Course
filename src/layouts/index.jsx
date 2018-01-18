import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import './index.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="算法设计与分析课程设计"
      meta={[
        {
          name: 'description',
          content:
            'Curriculum Design of Introduction to The Design and Analysis of Algorithms',
        },
        {
          name: 'keywords',
          content: 'algorithms, visualization, curriculum design',
        },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
