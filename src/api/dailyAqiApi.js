import { httpRequest } from './httpRequest'

export const dailyAqiApi = {
  getDaily(type, id) {
    const url = `/dailyaqi/${type}?id=${id}`
    return httpRequest.get(url)
  },
}
