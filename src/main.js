import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/rem'
import './styles/reset.scss'
import './styles/iconfont.css'
import Vant from 'vant'
import store from '@/store'
import i18n from '@/lang'
import { Lazyload } from 'vant';
import qs from 'qs'
//自定义指令
import './common/directive'
//filter
import './common/filter'
import globalMethods from './common/globalMethod'
import axios from 'axios'
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios

Vue.use(Lazyload);

router.afterEach((to, from) => { // 举例: 通过跳转后改变document.title
if (to.meta.title) {
        window.document.title = to.meta.title //每个路由下title

    } else {

        window.document.title = '默认的title'

    }
})
Vue.use(Vant)

Vue.config.productionTip = false
//注册全局函数

Object.keys(globalMethods).map(key=>{
    Vue.prototype[key] =globalMethods[key]
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')