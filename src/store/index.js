import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

import category from './modules/category'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        category
    },
    getters
})

export default store