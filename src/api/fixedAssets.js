import request from '@/utils/request'

export function supplies_list(page, page_size) {
  return request({
    url: '/material-management/fixed-assets/list',
    method: 'get',
  })
}
export function asset_data(id) {
  return request({
    url: '/material-management/fixed-assets/'+id,
    method: 'get',
  })
}
export function get_asset_number() {
  return request({
    url: '/material-management/fixed-assets/assets_number ',
    method: 'get',
  })
}
export function asset_save(data) {
  return request({
    url: '/material-management/fixed-assets/ ',
    method: 'post',
    data: data
  })
}
export function asset_data_del(id) {
  return request({
    url: 'material-management/fixed-assets/'+id,
    method: 'delete',
  })
}
export function asset_data_batchdel(data) {
  return request({
    url:'/material-management/fixed-assets/',
    method:'post',
    data:data
  })
}
