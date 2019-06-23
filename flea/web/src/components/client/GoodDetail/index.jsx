import React, { useEffect, useState, useContext } from 'react'
import { Card, Avatar, Button, Tabs, Modal } from 'antd'
import Lightbox from 'react-images'
import { StickyContainer, Sticky } from 'react-sticky'
import GoodPrice from '@/components/client/Price'
import Address from '@/components/client/Address'
import Item from '@/models/Item'
import { UserContext } from '@/models/User'
import Comments from './Comments'
import Order from './Order'
import './index.css'

const TabPane = Tabs.TabPane

const Good = ({
  match: {
    params: { id },
  },
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ images: [{ url: '' }], seller: { username: '' }, createdDate: 0 })
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [user] = useContext(UserContext)

  const fetchData = async () => {
    setLoading(true)
    const { data } = await Item.getById(id)
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleClickBuy = () => setVisible(true)

  const handleBuyCancel = () => setVisible(false)

  return (
    <div>
      <Modal title="发起交易请求" visible={visible} onCancel={handleBuyCancel} footer={null}>
        {visible ? <Order data={data} setVisible={setVisible} /> : null}
      </Modal>
      <Card title={data.name} bordered={false} loading={loading}>
        <div className="good-container">
          <div className="good-images">
            {/* lightbox查看图片 */}
            <Lightbox
              images={data.images.map(i => ({ src: i.url }))}
              isOpen={open}
              // 显示图片页码不超出图片数
              currentImage={current % data.images.length}
              onClickPrev={() => setCurrent(current - 1 + data.images.length)}
              onClickNext={() => setCurrent(current + 1 + data.images.length)}
              onClose={() => setOpen(false)}
            />
            <img src={data.images[0].url} alt="good" onClick={() => setOpen(true)} />
          </div>
          <div className="good-details">
            <div className="good-info">
              <div>
                <span>售价</span>
                <GoodPrice className="price" value={data.price} />
              </div>
              <div>
                <span>原价</span>
                <GoodPrice className="original-price" value={data.originalPrice} />
              </div>
              <div>
                <span>发布地</span>
                <Address {...data.location} />
              </div>
            </div>
            <Card style={{ marginTop: 16 }} loading={loading}>
              {/* 小卡片 */}
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={data.seller.username}
                description={`${new Date(data.createdDate).toLocaleDateString()}发布`}
              />
            </Card>
            {
              <Button
                type="primary"
                size="large"
                className="buy-btn"
                onClick={handleClickBuy}
                // 不能交易：1.未登录；2.买卖双方为同一人；3.物品被下架
                disabled={!user.verified || data.seller.id === user.id || data.itemState === 'OFF'}
              >
                {data.itemState === 'OFF' ? '已下架' : '立即交易'}
              </Button>
            }
          </div>
        </div>
      </Card>
      <StickyContainer>
        <Tabs
          defaultActiveKey="1"
          renderTabBar={(props, DefaultTabBar) => (
            // 留言，sticky
            <Sticky bottomOffset={80}>
              {({ style }) => <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />}
            </Sticky>
          )}
        >
          <TabPane tab="详情" key="1">
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </TabPane>
          <TabPane tab="留言" key="2">
            <Comments id={id} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
  )
}

export default Good
