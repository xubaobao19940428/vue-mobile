export const onePage = [{
        path: '/live',
        name: 'live',
        component: () =>
            import('@/views/dashboard/live/live'),
        meta: {
            title: '直播间'
        }
    },
    {
        path: '/goodsDetail/:id',
        name: 'goodsDetail',
        component: () =>
            import('@/views/goods/index'),
        meta: {
            title: '商品详情'
        }
    },
    {
        path: '/user/order',
        name: 'userOrder',
        component: () =>
            import('@/views/user/order'),
        meta: {
            title: '订单详情'
        }
    },
    {
        path: '/test',
        name: 'test',
        component: () =>
            import('@/views/test'),
        meta: {
            title: 'test'
        }
    },
    {
        path: '/user/profile',
        name: 'progfile',
        component: () =>
            import('@/views/user/profile'),
        meta: {
            title: 'profile'
        }
    },
    {
        path: '/user/address',
        name: 'userAddress',
        component: () =>
            import('@/views/user/address/addressList'),
        meta: {
            title: 'address'
        }
    },
    {
        path: '/user/editAddress',
        name: 'addOrEditAddress',
        component: () =>
            import('@/views/user/address/addOrEditAddress'),
        meta: {
            title: 'editAddress'
        }
    },
    //房间搜索
    {
        path: '/searchRoom',
        name: 'searchRoom',
        component: () =>
            import('@/views/dashboard/searchRoom'),
        meta: {
            title: 'editAddress'
        }
    },
]
export default onePage