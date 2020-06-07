import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/member-manage/check-out/list',
    method:'get',
    params:params
  })
}

export function bookList(params) {
  return request({
    url:'/member-manage/book-bed/list',
    method:'get',
    params:params
  })
}

export function getList(path,id) {
  return request({
    url:path+id,
    method:'get',
  })
}

export function searchList(params) {
  return request({
    url:'/member-manage/member-profile/search',
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

export function update(path,data) {
  return request({
    url:path,
    method:'post',
    data:data
  })
}

export function addList(path,data) {
  return request({
    url:path,
    method:'post',
    data:data
  })
}

export function inList(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/member-manage/check-in/',
    method:'post',
    data:data
  })
}

export function deleteApply(params) {
  return request({
    url:'/member-manage/check-out/'+params,
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
    url:'/member-manage/book-bed/'+id,
    method:'get'
  })
}

export function cancelOrder(id) {
  return request({
    url:'/member-manage/book-bed/'+id,
    method:'delete'
  })
}
