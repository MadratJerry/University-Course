import { request } from '@/services/fetch'

class Category {
  static getAll = async () => (await request('/categories')).data._embedded.categories
}

export default Category
