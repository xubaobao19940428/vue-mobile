import request from '@/utils/request'
//得到用户信息
export function getProfile(params) {
    return request({
        url: '/user/profile',
        method: 'get',
        data: params
    })
}
//上传
export function uploadPic(params) {
    return request({
        url: '/user/material',
        method: 'post',
        data: params
    })
}
//获取地址
export function address(params) {
    return request({
        url: '/address',
        method: 'get',
        data: params
    })
}
//设置默认地址
export function addressDefault(params) {
    return request({
        url: '/address/default',
        method: 'post',
        data: params
    })
}

