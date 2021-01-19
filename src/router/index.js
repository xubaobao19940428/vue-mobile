import Vue from 'vue'
import Router from 'vue-router'
//公用底部的layout
import layout from '../views/layout'
//底下是多个入口文件的路由配置
import login from './login'
//关于首页的页面
import onePage from './onePage'

Vue.use(Router)
/**
 * @isRequireAuth 判断是否需要登录
 * @component 当前路由的组件
 * @path 当前路由的路径
 * @layout 公用的底部
 * @hidden 是否隐藏，H5端不需要这个判断 如果是PC端后台一类的需要判断
 * @ name 当前路由的名称,尽量不要params和query一起用会很混乱,params传参是一定要写完整路径eg/:id/:name  /1/john 这样传参
 * ...如果不像让params后面的参数显示可以在路由中不提前定义params参数
 */
export const router = [{
    path: '/',
    component: layout,
    hidden: true,
    children: [{
        path: '/',
        name: 'dashboard',
        component: () =>
            import('@/views/dashboard'),
        hidden: true,
        meta: { title: '有播' },
    },
    {
        path: '/user',
        name: 'user',
        component: () =>
            import('@/views/user'),
        hidden: true,
        meta: { title: '我' },
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import('@/views/homePage/index'),
        meta: { title: '首页' }
    },
    {
        path: '/catelog',
        name: 'catelog',
        component: () =>
            import('@/views/category'),
        meta: { title: '分类' }
    }
    ]
}, ...login,...onePage]
export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: router
})