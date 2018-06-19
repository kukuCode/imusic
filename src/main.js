// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css'
import './style/style.css'
/* import './common/stylus/index.styl' */

import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(VueLazyload, {
    loading: './assets/loading.gif', //这个是加载的loading过渡效果
    error: './assets/error.jpg', //这个是请求失败后显示的图片
    try: 2 // 这个是加载图片数量
})


const i18n = new VueI18n({
    locale: 'zh_CN', // 语言标识
    messages: {
        'zh_CN': require('./common/lang/zh'),
        'en_US': require('./common/lang/en')
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: { App },
    template: '<App/>'
})