import React, { createContext, useContext, useState } from 'react'

let uid = 0
const modelMap = new Map()
const context = createContext()

export function useStore(model) {
  const { state, setState } = useContext(context)
  if (!modelMap.has(model.prototype)) {
    modelMap.set(model.prototype, uid)
    state[uid++] = new model()
  }
  const id = modelMap.get(model.prototype)
  const setStore = newState => setState({ [id]: { ...state[id], ...newState } })
  return [state[id], setStore]
}

export const Provider = ({ children }) => {
  const [state, setState] = useState({})
  return (
    <context.Provider value={{ state, setState }}>{children}</context.Provider>
  )
}
