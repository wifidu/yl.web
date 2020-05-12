import request from '@/utils/request'

export function getList(page, pageSize) {
  return request({
    url: '/financial-management/collection/',
    method: 'get',
  })
}
