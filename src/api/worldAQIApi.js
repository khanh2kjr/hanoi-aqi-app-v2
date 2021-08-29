import { httpRequest } from './httpRequest'

export const worldAQIApi = {
  getWorld() {
    const url = '/world'
    return httpRequest.get(url)
  },
}
