import request from '@/utils/request'

export function supplies_list() {
  return request({
    url: '/material-management/fixed-assets/list',
    method: 'get',
  })
}

export function asset_data(id) {
  return request({
    url: 'material-management/fixed-assets/'+id,
    method: 'get',
  })
}
