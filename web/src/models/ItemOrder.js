import { request } from '@/services/fetch'

class ItemOrder {
  static updateOrder = async (id, data) => await request(`/itemOrders/${id}`, 'PATCH', data)

  static getAllOrders = async () => await request(`/itemOrders?projection=detail`)

  static getById = async id => await request(`/itemOrders/${id}`)
}

export default ItemOrder
