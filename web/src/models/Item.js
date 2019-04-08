import { request, params } from '@/services/fetch'

class Item {
  static getAllByCategory = async p =>
    await request(
      `/items/search/findByCategoryNameContainsAndPriceBetweenAndCreatedDateAfter?${params(p, {
        category: '',
        page: 0,
        size: 20,
        sort: ',asc',
        priceLow: 0,
        priceHigh: Number.MAX_VALUE,
        projection: 'simple',
        createdDate: new Date(0).toISOString(),
      })}`,
    )
  static getById = async id => await request(`items/${id}?${params({ projection: 'detail' })}`)
}

export default Item
