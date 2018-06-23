import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo01'

import VuexTest from '@/view/VuexTest'
import Recommend from '@/view/recommend'
import Search from '@/view/search'
import SingerDetail from '@/view/singer/details'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend',
            name: '首页'
        },
        {
            path: '/hello1',
            name: 'Demo',
            component: Demo
        }, {
            path: '/vuex',
            name: 'vuex',
            component: VuexTest
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: Recommend
        },
        {
            path: '/singer',
            name: 'singer',
            component: Recommend
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
            children: [{
                path: '/search/:id',
                component: SingerDetail
            }]
        },

    ]
})