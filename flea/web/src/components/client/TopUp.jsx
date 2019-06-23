import React, { useEffect, useState } from 'react'
import { request } from '@/services/fetch'
import User from '@/models/User'

const TopUp = ({
  match: {
    params: { id },
  },
}) => {
  const [success, setSuccess] = useState(false)
  const fetchData = async () => {
    try {
      const { data } = await request(`/topUps/${id}?projection=detail`)
      await User.updateInfo(data.user.id, {
        // 加钱
        money: data.money + data.user.money,
      })
      // 删除订单
      await request(`/topUps/${id}`, 'DELETE')
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <div>{success === undefined ? '' : success === true ? '充值成功！' : '充值失败！'}</div>
}

export default TopUp
