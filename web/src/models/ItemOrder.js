import { request } from '@/services/fetch'

class ItemOrder {
  static updateOrder = async (id, data) => await request(`/itemOrders/${id}`, 'PATCH', data)
}

export default ItemOrder
