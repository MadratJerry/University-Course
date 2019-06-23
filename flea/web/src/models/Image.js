import { request } from '@/services/fetch'

class Image {
  static removeImage = async id => await request(`/images/${id}`, 'DELETE')
}

export default Image
