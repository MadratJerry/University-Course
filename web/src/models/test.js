import { createContext, useContext, useState, useEffect } from 'react'
import ProxyObject, { subscribe, visitTree } from './proxyObject'

const StoreContext = createContext(new ProxyObject({ a: 0, b: 1, c: 1 }))

export function useStore() {
  const store = useContext(StoreContext)
  const [state, setState] = useState(new ProxyObject(store))
  const update = () => setState(new ProxyObject(store))
  useEffect(() => {
    console.log(visitTree(state))
    subscribe(store, update, visitTree(state))
    return () => {}
  }, [state])
  const setter = newState => {
    Object.assign(store, newState)
    update()
  }
  return [state, setter]
}

export { StoreContext }
