import React from 'react'
import CategoryPanel from '@/components/client/GoodList/CategoryPanel'
import ItemTable from './ItemTable'

const GoodList = () => {
  return (
    <div>
      <CategoryPanel />
      <ItemTable />
    </div>
  )
}

export default GoodList
