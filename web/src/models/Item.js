import { request, params } from '@/services/fetch'
import Address from './Address'

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

  static getById = async id => await request(`/items/${id}?${params({ projection: 'detail' })}`)

  static getComments = async id => await request(`/items/${id}/comments?${params({ projection: 'detail' })}`)

  static addComment = async (id, content, replyTo) => {
    const { data } = await request(
      `/comments`,
      'POST',
      Object.assign(
        { content },
        replyTo
          ? {
              parent: `/${replyTo.parent ? replyTo.parent.id : replyTo.id}`,
              reply: `/${replyTo.user.id}`,
            }
          : {},
      ),
    )
    return await request(`/items/${id}/comments`, 'POST', '', {
      body: data._links.self.href,
      headers: { 'Content-Type': 'text/uri-list' },
    })
  }

  static addOrder = async (id, data) =>
    await request(`/itemOrders`, 'POST', { ...data, item: `/${id}`, shippingAddress: `/${data.shippingAddress}` })

  static updateItem = async (id, data) =>
    await request(`/items/${id}`, 'PATCH', data.address ? await Item.itemReducer(data) : data)

  static addItem = async data => await request(`/items`, 'POST', await Item.itemReducer(data))

  static itemReducer = async data => {
    const { data: address } = await Address.addAddress(data.location)
    return {
      ...data,
      images: data.images.map(i => `/${(i.response || i).id}`),
      category: `/${data.category}`,
      location: `/${address.id}`,
    }
  }

  static getAllOrders = async id =>
    await request(
      `/itemOrders/search/findByItemId?${params({
        id,
        projection: 'detail',
      })}`,
    )
}

export default Item
