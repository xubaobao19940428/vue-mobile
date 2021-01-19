export const login = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/views/login/login'),
    meta: { title: '登录' }
}]
export default login