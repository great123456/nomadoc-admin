import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../pages/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/order',
                    component: resolve => require(['../pages/order.vue'], resolve),
                    meta: { title: '课程订单' }
                },
                {
                    path: '/detail',
                    component: resolve => require(['../pages/detail.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/approve',
                    component: resolve => require(['../pages/approve.vue'], resolve),
                    meta: { title: '课程列表' }
                },{
                    path: '/banner',
                    component: resolve => require(['../pages/banner.vue'], resolve),
                    meta: { title: 'banner管理' }
                },
                {
                    // 用户列表
                    path: '/account',
                    component: resolve => require(['../pages/account.vue'], resolve),
                    meta: { title: '用户列表' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../pages/Login.vue'], resolve),
            meta: { title : '后台管理系统'}
        },
        {
            path: '/404',
            component: resolve => require(['../pages/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../pages/403.vue'], resolve),
             meta: { title : '403'}
        },
        {
            path: '*',
            redirect: '/404',
            meta: { title : '404'}
        }
    ]
})
