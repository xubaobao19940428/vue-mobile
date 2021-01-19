import request from '@/utils/liverequest'
import axios from 'axios'


export function getTabsList(params) {
    return request({
        url: '/index.php?r=lv/live/live-cate-list',
        method: 'get',
        params: params
    })
}
export function tabsListDetail(params){
    return request({
        url:'/index.php?r=lv/live-category/cate-list',
        method:'post',
        data:params
    })
}
export function GetRoomInfo(params){
    return request({
        url:'/index.php?r=lv/room/getliveroomurl',
        method:'post',
        data:params
    })
}
//获取主播信息
export function getLiveInfo(params){
    return request({
        url:'/index.php?r=lv/room/get-anchor-card-info',
        method:'post',
        data:params
    })
}
//搜索房间r=lv/search/keywords
export function searchRoomLive(params){
    return request({
        url:'/index.php?r=lv/search/keywords',
        method:'post',
        data:params
    })
}
//具体的搜索r=lv/search/rooms-list
export function searchRoom(params){
    return request({
        url:'/index.php?r=lv/search/rooms-list',
        method:'post',
        data:params
    })
}
// export function getTabsList(params){
//     return new Promise((resolve,reject)=>{
//         return axios.get('https://testlive.youbomsa.com/index.php?r=lv/live/live-cate-list',params).then(resultes=>{
//             if(resultes.data){
//                 resolve(resultes.data)
//             }
//         },error=>{
//             reject(error)
//         })
//     })
// }
// export function tabsListDetail(params){
//     return new Promise((resolve,reject)=>{
//         return axios.post('https://testlive.youbomsa.com/index.php?r=lv/live-category/cate-list',params).then(resultes=>{
//             if(resultes.data){
//                 resolve(resultes.data)
//             }
//         },error=>{
//             reject(error)
//         })
//     })
// }