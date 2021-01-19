import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建axios实例

const baseUrl = process.env.VUE_APP_BASE_LIVE
const service = axios.create({
    baseURL: baseUrl,
    // withCredentials: true,
    timeout: 45000
})
const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/plain, */*',
        'token': sessionStorage.getItem('token') ? sessionStorage.getItem('token') : store.state.user.token
    }
    // request拦截器
service.interceptors.request.use(config => {
    config.headers = headers
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (response.status !== 200 && response.status !== 201) {
            Toast({
                message: res.data.message,
                type: 'error',
                duration: 1 * 1000
            })
        } else {
            return response.data
        }
    },
    error => {
        console.log(error) // for debug
        if (error.response.status === 504) {
            Toast({
                message: '请求超时',
                type: 'error',
                duration: 2 * 1000
            })
        } else if (error.response.status === 403) {
            Toast({
                message: '没有操作权限',
                type: 'error',
                duration: 2 * 1000
            })
        } else {
            return Promise.reject(error.response.data)
        }
    }
)

export default service