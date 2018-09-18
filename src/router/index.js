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
                    path: '/fee',
                    component: resolve => require(['../pages/fee.vue'], resolve),
                    meta: { title: '降重收费' }
                },
                {
                    path: '/editor',
                    component: resolve => require(['../pages/editor.vue'], resolve),
                    meta: { title: '酒店详情' }
                },
                {
                    // 用户审核
                    path: '/account',
                    component: resolve => require(['../pages/account.vue'], resolve),
                    meta: { title: '用户审核' }
                },
                {
                    // 充值订单
                    path: '/recharge',
                    component: resolve => require(['../pages/recharge.vue'], resolve),
                    meta: { title: '充值订单' }
                },
                {
                    // 人工查重
                    path: '/check',
                    component: resolve => require(['../pages/check.vue'], resolve),
                    meta: { title: '人工查重' }
                },
                {
                    //检测类型
                    path: '/type',
                    component: resolve => require(['../pages/type.vue'], resolve),
                    meta: { title: '检测类型' }
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
