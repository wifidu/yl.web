import request from '@/utils/request'

export function getList(page, page_size) {
  return request({
    url: '/material-management/material/list',
    method: 'get',
  })
}
export function save(data) {
  return request({
    url: '/material-management/material/',
    method: 'post',
    data: data
  })
}
export function search_id(id) {
  return request({
    url: '/material-management/material/'+id,
    method: 'get',
  })
}
export function material_del(ids) {
  return request({
    url: '/material-management/material/'+ids,
    method: 'delete',
  })
}

export function search_in_id(id) {
  return request({
    url: '/material-management/material-in/'+id,
    method: 'get',
  })
}

