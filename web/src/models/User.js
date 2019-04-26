import { request } from '@/services/fetch'
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
