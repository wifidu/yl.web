import request from '@/utils/request'

export function Search(page, page_size) {
  return request({
    url: '/material-management/warehouse-log/list',
    method: 'get',
  })
}
export function Search_id(id) {
  return request({
    url: 'material-management/warehouse-log/'+id,
    method: 'get',
  })
}
