import React from 'react'
import { Divider, Card, Col, Row } from 'antd'

const SellCard = ({ url }) => <Card hoverable cover={<img alt="example" src={url} />} bodyStyle={{ display: 'none' }} />
const SellGroup = () => {
  return (
    <div>
      <Divider orientation="left">省心·卖</Divider>
      <Row gutter={16}>
        {[
          '/api/static/images/bcd00faf421e1ae97e77f25cb36e5bae.png',
          '/api/static/images/a90b59d8c67e6ae2233a5cd3ed1176d1.png',
          '/api/static/images/1158af27486b56d36546d721e289ca9d.png',
          '/api/static/images/79adee618e1d55fbe86f88efb644e51.png',
        ].map(url => (
          <Col span={6} key={url}>
            <SellCard url={url} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SellGroup
