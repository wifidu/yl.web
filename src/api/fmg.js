import request from '@/utils/request'

export function getcollectionList(page, pageSize) {
  return request({
    url: '/financial-management/collection/',
    method: 'get',
  })
}

export function refundList(page, pageSize) {
  return request({
    url: '/financial-management/collection/',
    method: 'get',
  })
}

export function accountMGList(page, pageSize) {
  return({
    url: '/financial-management/account',
    method: 'get',
  })
}

export function organizationMGList(page, pageSize) {
  return({
    url: '/financial-management/agency',
    method: 'get',
  })
}

export function visitingList(page, pageSize){
  return({
    url: '/daily-management/visit',
    method: 'get',
  })
}

export function consultList(page, pageSize){
  return({
    url: '/daily-management/consult',
    method: 'get',
  })
}

export function accidentTypes(){
  return({
    url: '/daily-management/accidentTypes/',
    method: 'get',
  })
}

export function consultid(){
  return({
    url: '/daily-management/consult/',
    method: 'get',
  })
}

export function accidentadd(id){
  return({
    url: '/daily-management/accident',
    method: 'post',
  })
}
export function add(data) {
  return request({
    url: '/financial-management/collection',
    method: 'post',
    data: data
  })
}
