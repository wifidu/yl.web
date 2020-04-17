import request from '@/utils/request'

export function Search() {
  return request({
    url: '/material-management/material/list',
    method: 'get',
  })
}
