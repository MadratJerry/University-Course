import { withRouter } from 'react-router'
import fetchIntercept from 'fetch-intercept'
import { message } from 'antd'
import User from '@/models/User'
import { useStore } from '@/models'

const Interceptor = ({ history }) => {
  const [, setUser] = useStore(User)
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
      switch (response.status) {
        case 401:
          const { pathname } = history.location

          if (pathname !== '/')
            history.push({
              pathname: '/',
              from: pathname,
            })
          setUser({ verified: false })
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
