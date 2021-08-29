import { httpRequest } from './httpRequest'

export const dailyStatApi = {
  getDaily(type, id) {
    const url = `/dailystat/${type}?id=${id}`
    return httpRequest.get(url)
  },
}
