import { request } from '@/services/fetch'

class Item {
  static getAllByCategory = async (category, page, size = 20) =>
    await request(
      `/items/search/findByCategoryNameContains?category=${
        category ? category : ''
      }&projection=simple&page=${page}&size=${size}`,
    )
}

export default Item
