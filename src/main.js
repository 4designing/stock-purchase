import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import { routes } from './router/routes.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


import 'jquery/dist/jquery.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { store } from './store/store.js'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueRouter)
export const router = new VueRouter({
    routes,
    mode: 'history',
});

Vue.config.productionTip = false

axios.defaults.baseURL = "https://post-test-eb185.firebaseio.com/"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')