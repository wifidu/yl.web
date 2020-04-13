import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/api/member-manage/out-manage/list',
    method:'get',
    params:params
  })
}

export function changeList() {
  return request({
    url:'/api/member-manage/check-out/list?page=1&page_size=1',
    method:'get',
  })
}

export function deleteReason(params) {
  return request({
    url:'/returnReason/delete',
    method:'post',
    params:params
  })
}

export function updateStatus(params) {
  return request({
    url:'/returnReason/update/status',
    method:'post',
    params:params
  })
}

export function addReason(data,path) {
  return request({
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    url:path,
    method:'post',
    data:data
  })
}

export function getReasonDetail(id) {
  return request({
    url:'/returnReason/'+id,
    method:'get'
  })
}

export function updateReason(id,data) {
  return request({
    url:'/returnReason/update/'+id,
    method:'post',
    data:data
  })
}
