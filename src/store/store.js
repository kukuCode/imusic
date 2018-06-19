import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



// 然后给 actions 注册事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理








export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})