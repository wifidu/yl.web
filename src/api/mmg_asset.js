import request from '@/utils/request'

export function asset_data(id) {
  return request({
    url: '/material-management/fixed-assets/'+id,
    method: 'get',
  })
}

export function get_asset_number() {
  return request({
    url: '/material-management/fixed-assets/assets_number',
    method: 'get',
  })
}

export function asset_save(data) {
  return request({
    url: '/material-management/fixed-assets/',
    method: 'post',
    data: data
  })
}

export function asset_data_batchdel(ids) {
  return request({
    url:'/material-management/fixed-assets/'+ids,
    method:'delete',
  })
}

export function searchList(data) {
  return request({
    url: '/material-management/fixed-assets/search',
    method: 'post',
    data: data
  })
}
