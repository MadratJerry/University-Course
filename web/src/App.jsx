import { hot } from 'react-hot-loader'
import React, { useState } from 'react'
import { Layout } from 'antd'
import Header from '@/components/Header'
import { Provider, useStore as useStore2 } from '@/models'
import User from '@/models/User'
import { StoreContext, useStore } from '@/models/test'
import ProxyObject from './models/proxyObject'

const { Content, Footer } = Layout

// const App = () => (
//   <Provider>
//     <Layout>
//       <Header />
//       <Content style={{ padding: '0 50px' }}>
//         <div
//           style={{
//             background: '#fff',
//             margin: '16px 0',
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//           Content
//         </div>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>
//         Flea ©2018 Created by Aries Tam
//       </Footer>
//     </Layout>
//   </Provider>
// )
const A = () => {
  const [store, setStore] = useStore()
  console.log('A')
  return (
    <div>
      {store.first}
      <button onClick={() => setStore({ first: 'b' })} />
      {store.last}
    </div>
  )
}

const B = () => {
  const [store, setStore] = useStore()
  console.log('B')
  return (
    <div>
      {/* {store.first} */}
      <button onClick={() => setStore({ last: 'a' })} />
      {store.last}
    </div>
  )
}

const C = () => {
  const [state, setState] = useStore2(User)
  console.log('C')
  return (
    <div>
      {state.username.first}
      <button onClick={() => setState({ username: { first: 'b' } })} />
    </div>
  )
}
const D = () => {
  const [state, setState] = useStore2(User)
  console.log('D')
  return (
    <div>
      {state.username.last}
      <button onClick={() => setState({ username: { last: 'a' } })} />
    </div>
  )
}

const App = () => (
  <div>
    {/* <StoreContext.Provider> */}
    <A />
    <B />
    {/* <Provider>
      <C />
      <D />
    </Provider> */}
    {/* </StoreContext.Provider> */}
  </div>
)

export default (process.env.NODE_ENV === 'development' ? hot(module)(App) : App)
