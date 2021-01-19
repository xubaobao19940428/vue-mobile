const user = {
    state: {
        token: '', //用户Token
        lang: localStorage.getItem('lang') || 'en' ,//用户语言
        userInfo:{
            username:'',//用户名称
            nickname:'',//用户昵称
            avatar:'',//用户头像
            user_id:'',//用户Id
            identity:0,//用户的身份信息
            user_rank:'',//用户的银行信息
        },
        isAddressChecked:0,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER_INFO(state,userInfo){
            state.userInfo = userInfo
        },
        SET_ADDRESS_ID(state,addressId){
            state.isAddressChecked = addressId
        }
    },
    actions: {
        setToken({ commit }, token) {
            commit('SET_TOKEN', token)
        },
        setDefaultAddress({commit},id){
            commit('SET_ADDRESS_ID',id)
        }
    }
}
export default user