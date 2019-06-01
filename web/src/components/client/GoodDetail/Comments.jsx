import React, { useState, useContext, useEffect } from 'react'
import { Avatar, Button, Icon, Comment, Tooltip, Affix, Input, Spin, message } from 'antd'
import moment from 'moment'
import { UserContext } from '@/models/User'
import Item from '@/models/Item'

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

const Comments = ({ id }) => {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [replyTo, setReplyTo] = useState()
  const [value, setValue] = useState()
  const [user] = useContext(UserContext)

  const fetchData = async () => {
    setLoading(true)
    const {
      data: {
        _embedded: { comments },
      },
    } = await Item.getComments(id)
    setComments(comments)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleInputChange = e => setValue(e.target.value)

  const handleReply = v => setReplyTo(v)

  const handleComment = async () => {
    const { response } = await Item.addComment(id, value, replyTo)
    if (response.ok) {
      setValue()
      setReplyTo()
      fetchData()
      message.success('发布成功！')
    } else message.error('发布失败')
  }

  return (
    <>
      <Spin spinning={loading}>
        {/* comments中:
      1.没有parent的，按时间顺序置顶排列-->第一级
      2.有parent的，对应第一级parent的id-->第二级 */}

        {/* 第一级 */}
        {comments
          .filter(c => !c.parent)
          .sort((a, b) => (a.createdDate > b.createdDate ? -1 : 1))
          .map(v => (
            <UserComment value={v} key={v.id} onReply={handleReply}>
              {/* 第二级 */}
              {comments
                .filter(c => c.parent && c.parent.id === v.id)
                .sort((a, b) => (a.createdDate < b.createdDate ? -1 : 1))
                .map(c => (
                  <UserComment value={c} key={c.id} onReply={handleReply} />
                ))}
            </UserComment>
          ))}
        {/* 留言提示affix */}
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
              value={value}
              onChange={handleInputChange}
              size="large"
              suffix={replyTo ? <Icon type="close-circle" onClick={() => setReplyTo()} /> : null}
              placeholder={
                user.verified ? (replyTo ? `回复 ${replyTo.user.username}` : '发布你的留言') : '登录后发表留言'
              }
            />
            <Button
              type="primary"
              size="large"
              className="comment-send"
              disabled={!user.verified}
              onClick={handleComment}
            >
              发布
            </Button>
          </div>
        </Affix>
      </Spin>
    </>
  )
}

export default Comments
