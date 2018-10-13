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
                    meta: { title: '借款订单' }
                },
                {
                    path: '/detail',
                    component: resolve => require(['../pages/detail.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/approve',
                    component: resolve => require(['../pages/approve.vue'], resolve),
                    meta: { title: '认证用户' }
                },{
                    path: '/limit',
                    component: resolve => require(['../pages/limit.vue'], resolve),
                    meta: { title: '逾期订单' }
                },{
                    path: '/delay',
                    component: resolve => require(['../pages/delay.vue'], resolve),
                    meta: { title: '延期订单' }
                },
                {
                    // 用户审核
                    path: '/account',
                    component: resolve => require(['../pages/account.vue'], resolve),
                    meta: { title: '用户审核' }
                },{
                    // 客户详情
                    path: '/account-detail',
                    component: resolve => require(['../pages/account-detail.vue'], resolve),
                    meta: { title: '客户详情' }
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
