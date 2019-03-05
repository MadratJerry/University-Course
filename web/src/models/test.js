import { createContext, useContext, useState, useEffect } from 'react'
import ProxyObject, { subscribe, visitTree } from './proxyObject'

const StoreContext = createContext(
  new ProxyObject({ first: 'a', last: 'b', age: 0 }),
)

export function useStore() {
  const store = useContext(StoreContext)
  const [state, setState] = useState(new ProxyObject(store))
  const update = function() {
    setState(new ProxyObject(store))
  }
  useEffect(() => {
    let subscribed = false
    const checkUpdates = () => (subscribed ? null : update())
    console.log('effect')
    console.log(visitTree(state))
    subscribe(store, checkUpdates, visitTree(state))
    return () => {
      subscribed = true
    }
  }, [store])
  const setter = newState => {
    Object.assign(store, newState)
    update()
  }
  return [state, setter]
}

export { StoreContext }
