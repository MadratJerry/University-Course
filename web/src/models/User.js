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

  static login = async data => {
    return await request('/login', 'POST', data)
  }
}

export default User
