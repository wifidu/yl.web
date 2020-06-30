import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/authorizations',
    method: 'post',
    data: {
      "username": username,
      "password": password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/authorizations/logout ',
    method: 'post'
  })
}
