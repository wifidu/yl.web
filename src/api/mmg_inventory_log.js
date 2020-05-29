import request from '@/utils/request'

export function inventoryList() {
  return request({
    url: '/material-management/inventory-management/list',
    method: 'get',
  })
}

export function warehouse_logSearch(data) {
  return request({
    url: '/material-management/inventory-management/search',
    method: 'post',
    data: data
  })
}

export function Search_id(id) {
  return request({
    url: 'material-management/warehouse-log/'+id,
    method: 'get',
  })
}

export function downloadExcel() {
  return request({
    url: '/material-management/warehouse-log/excel',
    method: 'get',
  })
}


