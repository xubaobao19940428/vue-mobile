import request from '@/utils/request'

export function categoryGoodsList(params) {
    return request({
        url: '/goods/youxuan',
        method: 'get',
        params: params
    })
}
export function getGoodsDetail(params) {
    return request({
        url: '/goods/show',
        method: 'post',
        data: params
    })
}