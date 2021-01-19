import request from '@/utils/request'

export function login(params) {
    return request({
        url: '/user/fast-login',
        method: 'POST',
        data: params
    })
}
export function getServerTime(params) {
    return request({
        url: '/time',
        method: 'get',
        data: params
    })
}