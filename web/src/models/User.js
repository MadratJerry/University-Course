import { request, params } from '@/services/fetch'
import { createContext } from 'react'

export default class User {
  verified
  username = null

  constructor() {
    this.verified = localStorage.getItem('verified') === 'false' ? false : true
  }

  static login = async data => await request('/login', 'POST', data)

  static logout = async () => await request('/logout', 'GET')

  static getInfo = async () => await request('/user')

  static getUserInfo = async id => await request(`/users/${id}`)

  static updateInfo = async (id, value) => await request(`/users/${id}`, 'PATCH', value)

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

export const reducer = (state, action) => {
  switch (action.type) {
    case 'verified':
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

export const UserConext = createContext([null, () => {}])
