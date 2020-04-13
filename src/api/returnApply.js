import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/api/member-manage/check-out/list',
    method:'get',
    params:params
  })
}

export function bookList(params) {
  return request({
    url:'/api/member-manage/book-bed/list',
    method:'get',
    params:params
  })
}

export function getList() {
  return request({
    url:'/api/member-manage/death-registration/list?page=1&page_size=1',
    method:'get',

  })
}

export function searchList(params) {
  return request({
    url:'/api/member-manage/member-profile/search',
    method:'get',
    data:params
  })
}

export function appointList(data,path) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:path,
    method:'post',
    data:data
  })
}

export function addList(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/api/member-manage/member-profile',
    method:'post',
    data:data
  })
}

export function inList(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/api/member-manage/check-in/',
    method:'post',
    data:data
  })
}

export function deleteApply(params) {
  return request({
    url:'/api/member-manage/check-out/'+params,
    method:'delete',
    // params:params
  })
}
export function updateApplyStatus(id,data) {
  return request({
    url:'/returnApply/update/status/'+id,
    method:'post',
    data:data
  })
}

export function getApplyDetail(id) {
  return request({
    url:'/api/member-manage/book-bed/'+id,
    method:'get'
  })
}

export function cancelOrder(id) {
  return request({
    url:'/api/member-manage/book-bed/'+id,
    method:'delete'
  })
}
