// home
import fetch from '../config/fetch'
import { API_PATH } from '../config/env'

// 用户注册
export const apiUserRegister = (obj) => fetch(API_PATH + '/user/register', obj, 'POST')

//用户信息
export const apiUserInfo = (obj) => fetch(API_PATH + '/user/user-info', obj, 'GET')

//登录
export const apiUserLogin = (obj) => fetch(API_PATH + '/user/login', obj, 'POST')

//退出登录
export const apiUserLoginOut = (obj) => fetch(API_PATH + '/user/logout', obj, 'POST')

//借款列表
export const apiOrderList = (obj) => fetch(API_PATH + '/loan/list', obj, 'GET')

//客户列表
export const apiUserList = (obj) => fetch(API_PATH + '/customer/list', obj, 'GET')

//客户详情
export const apiAccountDetail = (obj) => fetch(API_PATH + '/customer/detail', obj, 'GET')

//审核
export const apiAccountCheck = (obj) => fetch(API_PATH + '/customer/auths', obj, 'POST')

//用户信息（包含借款信息）
export const apiOrderDetail = (obj) => fetch(API_PATH + '/loan/customer-detail', obj, 'GET')

//审核（更改状态）
export const apiOrderCheck = (obj) => fetch(API_PATH + '/loan/change-status', obj, 'POST')

//延期还款
export const apiOrderDelay = (obj) => fetch(API_PATH + '/loan/delay', obj, 'POST')

//短信
export const apiOrdersendMessage = (obj) => fetch(API_PATH + '/loan/send', obj, 'POST')

//重置密码
export const apiUserUpdatePassword = (obj) => fetch(API_PATH + '/user/reset', obj, 'POST')