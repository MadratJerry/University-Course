import { request } from '@/services/fetch'

class Category {
  static getAll = async () => await request('/categories')
}

export default Category
