import request from '@/utils/request'

export function search_mate_id(id) {
  return request({
    url: '/material-management/material-out/'+id,
    method: 'get',
  })
}
