import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HelloWorld'
Vue.use(Router)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: resolve => require(['@/views/statistics'], resolve),
    },
    {
        path: '/excel',
        name: 'excel',
        component: resolve => require(['@/views/excel'], resolve)
    }
]
const routers = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default routers