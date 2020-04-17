import request from '@/utils/request'

export function Search(page, page_size) {
  return request({
    url: '/material-management/material/list',
    method: 'get',
  })
}
export function save(data) {
  return request({
    url: '/material-management/material/',
    method: 'delete',
    data: data
  })
}
export function search_id(id) {
  return request({
    url: '/material-management/material/+id',
    method: 'post',
  })
}
export function material_del(id) {
  return request({
    url: '/material-management/material/'+id,
    method: 'delete',
  })
}
export function material_batchdel(data) {
  return request({
    url: '/material-management/material',
    method: 'data',
  })
}

