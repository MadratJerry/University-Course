import { createContext, useContext, useState, useEffect } from 'react'
import ProxyObject, { subscribe, visitTree } from './proxyObject'

const contextMap = new Map()

export function useStore(model) {
  if (!contextMap.has(model.prototype)) contextMap.set(model.prototype, new ProxyObject(createContext(new model())))
  const store = useContext(contextMap.get(model.prototype))
  const [state, setState] = useState(new ProxyObject(store))
  const update = () => setState(new ProxyObject(store))
  useEffect(() => {
    return subscribe(store, update, visitTree(state))
  }, [state])
  const setter = newState => Object.assign(store, newState)
  return [state, setter]
}
