// home
import fetch from '../config/fetch'
import { API_PATH } from '../config/env'


//登录
export const apiUserLogin = (obj) => fetch(API_PATH + '/login', obj, 'GET')

//退出登录
export const apiUserLoginOut = (obj) => fetch(API_PATH + '/logout', obj, 'GET')

// 重置密码
export const apiUserUpdatePassword = (obj) => fetch(API_PATH + '/resetpass', obj, 'POST')

//课程列表
export const apiCourseList = (obj) => fetch(API_PATH + '/course', obj, 'GET')

//用户列表
export const apiUserList = (obj) => fetch(API_PATH + '/user', obj, 'GET')

// banner列表
export const apiBannerList = (obj) => fetch(API_PATH + '/banner', obj, 'GET')

// 删除banner
export const apiBannerDelete = (obj) => fetch(API_PATH + '/banner/delete', obj, 'POST')

// 添加banner
export const apiBannerSave = (obj) => fetch(API_PATH + '/banner/save', obj, 'POST')

//客户详情
export const apiAccountDetail = (obj) => fetch(API_PATH + '/customer/detail', obj, 'GET')
