import { request } from '@/services/fetch'

class User {
  verified = false
  username = null

  static login = async data => {
    return await request('/login', 'POST', data)
  }
}

export default User
