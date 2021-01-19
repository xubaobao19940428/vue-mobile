const category = {
    state: {
        index:0,
        cat_id:3,
        categoryList:[],
    },
    mutations: {
        SET_CATEGORY(state,o){
            state.index=o.index
            state.cat_id = o.cat_id
        },
        SET_CATEGORY_LIST(state,o){
            state.categoryList=o
        }
    },
    actions: {
        setCategoryList({commit},data){
            commit('SET_CATEGORY_LIST',data)
        }
    }
}
export default category