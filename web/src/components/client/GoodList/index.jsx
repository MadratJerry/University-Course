import React from 'react'
import CategoryPanel from '@/components/client/GoodList/CategoryPanel'
import ItemTable from './ItemTable'

const GoodList = ({ location }) => {
  const params = new URLSearchParams(location.search)

  return (
    <div>
      <CategoryPanel />
      <ItemTable category={params.get('category')} />
    </div>
  )
}

export default GoodList
