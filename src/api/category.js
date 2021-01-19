
import request from '@/utils/request'

export function catelogGet(params) {
    return request({
        url: params.id==''?'/catalog/list':'/catalog/list/'+params.id,
        method: 'get',
        data: {}
    })
}