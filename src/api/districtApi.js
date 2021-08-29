import { httpRequest } from './httpRequest'

export const districtApi = {
  getDistricts(params) {
    const url = '/districts'
    return httpRequest.get(url, { params })
  },
}
