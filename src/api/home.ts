import request from '@/request'

export function getUserInfo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return request.get(`/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn`)

  // return fetch('https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn').then(res =>
  //   res.json()
  // )
}
