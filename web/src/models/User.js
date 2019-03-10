import { request } from '@/services/fetch'

class User {
  _verified = false
  username = null

  constructor() {
    this._verified = localStorage.getItem('verified') === 'false' ? false : true
  }

  get verified() {
    return this._verified
  }

  set verified(v) {
    this._verified = v
    localStorage.setItem('verified', v)
  }

  static login = async data => await request('/login', 'POST', data)

  static logout = async () => await request('/logout', 'GET')

  static getInfo = async () => await request('/user')
}

export default User
