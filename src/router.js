import Vue from 'vue'
import Router from 'vue-router'
// import Home from './components/HelloWorld'
Vue.use(Router)

const routes = [
    {
        path: '/',
        // component: Home,
        redirect: 'Rose',
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: resolve => require(['@/views/statistics'], resolve),
    },
    {
        path: '/excel',
        name: 'excel',
        component: resolve => require(['@/views/excel'], resolve),
    },
    {
        path: '/rose',
        name: 'Rose',
        component: resolve => require(['@/views/rose'], resolve),
    },
]
const routers = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default routers
