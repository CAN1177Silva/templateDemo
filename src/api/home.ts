import request from '@/request'

export function getUserInfo() {
  return request.get(`/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn`)
}
