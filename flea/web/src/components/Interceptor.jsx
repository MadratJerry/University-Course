import { useContext } from 'react'
import { withRouter } from 'react-router'
import fetchIntercept from 'fetch-intercept'
import { message } from 'antd'
import { UserContext } from '@/models/User'

const Interceptor = ({ history }) => {
  const [, userDispatch] = useContext(UserContext)
  fetchIntercept.register({
    request: function(url, config = {}) {
      // Modify the url or config here
      config.credentials = 'same-origin' // Please see https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
      return [url, config]
    },

    requestError: function(error) {
      // Called when an error occurred during another 'request' interceptor call
      return Promise.reject(error)
    },

    response: function(response) {
      // Modify the response object
      // 401未授权，返回主页，把用户设为未登录状态
      switch (response.status) {
        case 401:
          const { pathname } = history.location

          if (pathname !== '/')
            history.push({
              pathname: '/',
              from: pathname,
            })
          userDispatch({ type: 'unverified' })
          break
        default:
          return response
      }
      return response
    },

    responseError: function(error) {
      // Handle an fetch error
      message.error('网络错误，请检查网络')
      return Promise.reject(error)
    },
  })
  return null
}

export default withRouter(Interceptor)
