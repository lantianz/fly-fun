import http from '@/utils/http'

export function getIndexAPI () {
    return http({
      url: '/api/getIndex'
    })
  }