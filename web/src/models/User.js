import { createContext } from 'react'
import { request, params } from '@/services/fetch'

export default class User {
  verified
  username = null

  constructor() {
    this.verified = localStorage.getItem('verified') === 'false' ? false : true
  }

  static login = async data => await request('/login', 'POST', data)

  static logout = async () => await request('/logout', 'GET')

  static addUser = async value => await request('/users/addUser', 'POST', value)

  static getInfo = async () => await request('/user')

  static getUserInfo = async id => await request(`/users/${id}`)

  static updateInfo = async (id, value) => await request(`/users/${id}`, 'PATCH', value)

  static getAllUser = async p =>
    await request(
      `/users?${params(p, {
        page: 0,
        size: 20,
        sort: ',asc',
      })}`,
    )

  static getUserByUsername = async username => await request(`/users/search/findByUsername?username=${username}`)

  static addShippingAddress = async data => await request('/users/addShippingAddress', 'POST', data)

  static getShippingAddresses = async id => await request(`/users/${id}/shippingAddresses?projection=detail`)

  static removeShippingAddress = async id => await request(`/users/removeShippingAddress/${id}`, 'DELETE')

  static setShippingAddressDefault = async id => await request(`/users/setShippingAddressDefault/${id}`, 'PATCH')

  static getOrders = async id => await request(`/users/${id}/itemOrders?projection=detail`)

  static getItems = async (id, filter) =>
    await request(
      `/items/search/findBySellerIdAndItemState?${params(
        {
          id,
          projection: 'detail',
        },
        filter,
      )}`,
    )
}
// state之前的值，action.type动作分类，action.payload要覆盖的user对象的值
export const reducer = (state, action) => {
  switch (action.type) {
    case 'verified':
      // local storage 本地持久化存储登录状态
      localStorage.setItem('verified', true)
      return { ...state, verified: true }
    case 'unverified':
      localStorage.setItem('verified', false)
      return { ...state, verified: false }
    case 'update':
      return { ...state, ...action.payload }
    default:
      throw new Error()
  }
}

export const UserContext = createContext([null, () => {}])
