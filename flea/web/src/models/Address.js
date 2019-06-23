import { request } from '@/services/fetch'

class Address {
  static addAddress = async ([province, city, country]) =>
    await request(`/addresses`, 'POST', {
      province,
      city,
      country,
      detail: '',
    })
}

export default Address
