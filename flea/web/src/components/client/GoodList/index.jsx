import React from 'react'
import CategoryPanel from '@/components/client/GoodList/CategoryPanel'
import ItemTable from './ItemTable'

const GoodList = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const category = params.get('category')

  return (
    <div>
      <CategoryPanel />
      <ItemTable category={category === null ? '' : category} key={category} />
    </div>
  )
}

export default GoodList
