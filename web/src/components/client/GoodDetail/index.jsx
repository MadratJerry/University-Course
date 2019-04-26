import React, { useEffect, useState } from 'react'
import { Card, Avatar, Button, Icon, Tabs, Comment, Tooltip, Affix, Input } from 'antd'
import Lightbox from 'react-images'
import moment from 'moment'
import GoodPrice from '@/components/client/Price'
import Item from '@/models/Item'
import './index.css'
import { useStore } from '@/models/index'
import User from '@/models/User'

const TabPane = Tabs.TabPane

const UserComment = ({ value: { content, createdDate, user, reply, parent }, value, onReply, children }) => (
  <Comment
    actions={[<span onClick={() => onReply(value)}>回复</span>]}
    author={
      <span>
        {user.username}{' '}
        {parent ? (
          <>
            <Icon type="caret-right" />
            {reply.username}
          </>
        ) : null}
      </span>
    }
    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
    content={<p>{content}</p>}
    datetime={
      <Tooltip title={moment(createdDate).format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment(createdDate).fromNow()}</span>
      </Tooltip>
    }
  >
    {children}
  </Comment>
)

const Good = ({
  match: {
    params: { id },
  },
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ images: [{ url: '' }], seller: { username: '' }, createdDate: 0 })
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const [comments, setComments] = useState([])
  const [replyTo, setReplyTo] = useState()
  const [user] = useStore(User)

  const fetchData = async () => {
    setLoading(true)
    const { data } = await Item.getById(id)
    const {
      data: {
        _embedded: { comments },
      },
    } = await Item.getComments(id)
    setComments(comments)
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleReply = v => setReplyTo(v)

  return (
    <div>
      <Card
        title={data.name}
        bordered={false}
        loading={loading}
        extra={
          <>
            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
            {data.collectByCount}人已收藏
          </>
        }
      >
        <div className="good-container">
          <div className="good-images">
            <Lightbox
              images={data.images.map(i => ({ src: i.url }))}
              isOpen={open}
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
                {data.location}
              </div>
            </div>
            <Card style={{ marginTop: 16 }} loading={loading}>
              <Card.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={data.seller.username}
                description={`${new Date(data.createdDate).toLocaleDateString()}发布`}
              />
            </Card>
            <Button type="primary" size="large" className="buy-btn">
              立即购买
            </Button>
          </div>
        </div>
      </Card>
      <Tabs defaultActiveKey="2">
        <TabPane tab="详情" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="留言" key="2">
          {comments
            .filter(c => !c.parent)
            .map(v => (
              <UserComment value={v} key={v.id} onReply={handleReply}>
                {comments
                  .filter(c => c.parent && c.parent.id === v.id)
                  .sort((a, b) => a.createdDate < b.createdDate)
                  .map(c => (
                    <UserComment value={c} key={c.id} onReply={handleReply} />
                  ))}
              </UserComment>
            ))}
          <Affix offsetBottom={8}>
            <div className="comment-panel">
              {user.verified ? (
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                  className="avatar"
                />
              ) : null}
              <Input
                key={replyTo}
                className="comment-input"
                disabled={!user.verified}
                size="large"
                suffix={replyTo ? <Icon type="close-circle" onClick={() => setReplyTo()} /> : null}
                placeholder={
                  user.verified ? (replyTo ? `回复 ${replyTo.user.username}` : '发布你的留言') : '登录后发表留言'
                }
              />
              <Button type="primary" size="large" className="comment-send" disabled={!user.verified}>
                发布
              </Button>
            </div>
          </Affix>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Good
