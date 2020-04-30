import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}

export function getList(params,path) {
  return request({
    url:path,
    method:'get',
    //data:data
    params:params
  })
}

export function getLoginDetail(params) {
  return request({
    url:'/member-manage/out-manage/'+params,
    method:'get',
  })
}

export function returnDetail(params,path) {
  return request({
    url:path+params,
    method:'get',
  })
}

export function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(path,id) {
  return request({
    url:path+id,
    method:'delete'
  });
}

export function deleteMulOrder(data) {
  return request({
    url:'/member-manage/member-profile/',
    method:'delete',
    data:data
  });
}

export function deleteId(id) {
  return request({
    url:'/member-manage/member-profile/'+id,
    method:'delete'
  });
}

export function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/member-manage/member-profile/'+id,
    method:'get'
  });
}

export function getChangeDetail(id) {
  return request({
    url:'/member-manage/check-out/'+id,
    method:'get'
  });
}

export function getDetail(id) {
  return request({
    url:'/member-manage/check-in/'+id,
    method:'get'
  });
}

export function Detail(id,path) {
  return request({
    url:path+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/order/update/note',
    method:'post',
    params:params
  })
}
