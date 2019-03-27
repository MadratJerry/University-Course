import { request } from '@/services/fetch'

class Item {
  static getAllByCategory = async ({ category, page, size = 20, sort = ',asc' }) =>
    await request(
      `/items/search/findByCategoryNameContains?category=${
        category ? category : ''
      }&projection=simple&page=${page}&size=${size}&sort=${sort}`,
    )
}

export default Item
