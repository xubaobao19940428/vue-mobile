/**
 * 
 * 这里封装的是Vue的全局方法 
 */

import md5 from 'js-md5'

var env = 'pro' // 环境配置：'pro' - 正式环境, 'dev' - 开发环境, 'beta' - 预发布环境, 'msa' - 海外
if (window.location.href.includes('//h5.youbomsa.com')) {
    env = 'pro'
} else {
    env = 'dev'
}
const appKey = "Mini_1.0"
const signKey = env === 'pro' ? '40f6e43870bd6acf1455b087509aa91d' : '9d7b0200684e68b33d748515cb88a948'

const debounce=(fn, time)=>{
    let timeout = null
    return function () {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        setTimeout(fn, time)
    }
}
const sign = (data, time) => {
    // data = data && objKeySort(data)
    data = {
        _time: time,
        app_key: appKey,
        ...data
    }
    data = objKeySort(data)
    let str = `${appKey}`
    for (let i in data) {
        str += `${i}${data[i]}`
    }

    str += signKey
    data = {
        ...data,
        _sign: md5(md5(str)).toLowerCase()
    }

    return data
}

const objKeySort = obj => {
    let newkey = Object.keys(obj).sort()
    let newObj = {}
    newkey.forEach(item => {
        newObj[item] = obj[item]
    })
    return newObj
}
const serveTime = () => {
    let time = Number(localStorage.getItem('time'))
    let newTime = Math.floor(new Date().getTime() / 1000)
    let serTime = time + newTime
    return serTime
}
/**
 * 对象的去重
 * @obj 传过来的对象
 * @uniques 去重后的对象
 */

const deleteObject = (obj) => {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var str = "";
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.prototype.hasOwnProperty.call(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    let returnUniques = uniques;
    return returnUniques;
}
/**
 * 对象的深度克隆
 * @source 传过来的对象
 * @targetObj 克隆的对象
 */
const deepClone = (source) => {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments', 'shallowClone')
        }
        const targetObj = source.constructor === Array ? [] : {}
        Object.keys(source).forEach(keys => {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = deepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        })
        return targetObj
}
export default {
    deleteObject,
    deepClone,
    sign,
    serveTime,
    debounce
}