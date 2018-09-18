// home
import fetch from '../config/fetch'
import { API_PATH } from '../config/env'

// 用户注册
export const apiUserRegister = (obj) => fetch(API_PATH + '/user/register', obj, 'POST')

//用户信息
export const apiUserInfo = (obj) => fetch(API_PATH + '/user/user-info', obj, 'GET')

//登录
export const apiUserLogin = (obj) => fetch(API_PATH + '/user/login', obj, 'POST')

//订单列表
export const apiOrderList = (obj) => fetch(API_PATH + `/order/list/type/${obj.type}/size/10`, obj, 'GET')

//添加轮播
export const apiAddBanner = (obj) => fetch(API_PATH + '/banner/store', obj, 'POST')

//轮播列表（例子中1是类型，4是分页大小 ？page=2是页数）
export const apiBannerList = (obj) => fetch(API_PATH + `/banner/list/type/${obj.type}/20`, obj, 'GET')

//删除轮播
export const apiBannerDelete = (obj) => fetch(API_PATH + `/banner/delete/${obj.id}`, obj, 'DELETE')

//菜谱保存
export const apiAddCookbook = (obj) => fetch(API_PATH + '/cookbook/store', obj, 'POST')

//新增主页图文
export const apiIndexListAdd = (obj) => fetch(API_PATH + '/page/store', obj, 'POST')

//主页图文列表
export const apiIndexList = (obj) => fetch(API_PATH + '/page/list/30', obj, 'GET')

//主页图文删除
export const apiIndexListDelete = (obj) => fetch(API_PATH + `/page/delete/${obj.id}`, obj, 'DELETE')

//美食菜谱列表
export const apiCookbookList = (obj) => fetch(API_PATH + '/cookbook/list/10', obj, 'GET')

//菜谱修改保存
export const apiCookbookSave = (obj) => fetch(API_PATH + '/cookbook/save', obj, 'POST')

//删除菜谱
export const apiCookbookDelete = (obj) => fetch(API_PATH + `/cookbook/delete/${obj.id}`, obj, 'DELETE')

//添加菜品
export const apiMenuListAdd = (obj) => fetch(API_PATH + '/menu/store', obj, 'POST')

//菜品列表
export const apiMenuList = (obj) => fetch(API_PATH + `/menu/list/pid/${obj.id}/size/10`, obj, 'GET')

//删除菜品
export const apiMenuListDelete = (obj) => fetch(API_PATH + `/menu/delete/${obj.id}`, obj, 'DELETE')

//修改菜品
export const apiMenuListSave = (obj) => fetch(API_PATH + '/menu/save', obj, 'POST')

//菜品明细
export const apiMenuListDetail = (obj) => fetch(API_PATH + `/menu/edit/${obj.id}`, obj, 'GET')

//优惠卷列表
export const apiCouponList = (obj) => fetch(API_PATH + '/coupon/list/size/100', obj, 'GET')

//添加优惠券
export const apiCouponListAdd = (obj) => fetch(API_PATH + '/coupon/store', obj, 'POST')

//修改优惠卷
export const apiCouponListUpdate = (obj) => fetch(API_PATH + '/coupon/update', obj, 'POST')

//服务大类-列表
export const apiServiceList = (obj) => fetch(API_PATH + '/service/list/10', obj, 'GET')

//服务大类-添加
export const apiServiceListAdd = (obj) => fetch(API_PATH + '/service/store', obj, 'POST')

//服务大类-删除
export const apiServiceListDelete = (obj) => fetch(API_PATH + `/service/delete/${obj.id}`, obj, 'DELETE')

//服务大类-修改
export const apiServiceListSave = (obj) => fetch(API_PATH + '/service/save', obj, 'POST')

//客房服务-列表
export const apiServiceProList = (obj) => fetch(API_PATH + `/servicedetail/list/pid/${obj.id}/size/10`, obj, 'GET')

//客房服务-新增
export const apiServiceProListAdd = (obj) => fetch(API_PATH + '/servicedetail/store', obj, 'POST')

//客房服务-删除
export const apiServiceProListDelete = (obj) => fetch(API_PATH + `/servicedetail/delete/${obj.id}`, obj, 'DELETE')

//客房服务-修改
export const apiServiceProListSave = (obj) => fetch(API_PATH + '/servicedetail/save', obj, 'POST')

//游记列表
export const apiTravelList = (obj) => fetch(API_PATH + '/travel/list/size/150', obj, 'GET')

//添加游记
export const apiTravelListAdd = (obj) => fetch(API_PATH + '/travel/store', obj, 'POST')

//删除游记
export const apiTravelListDelete = (obj) => fetch(API_PATH + `/travel/delete/${obj.id}`, obj, 'DELETE')

//话题列表
export const apiTopicList = (obj) => fetch(API_PATH + '/share/list/size/100', obj, 'GET')

//评论（字段参考小程序）
export const apiTopicListComment = (obj) => fetch(API_PATH + `/share/share-comment/${obj.id}`, obj, 'GET')

//删除话题
export const apiTopicListDelete = (obj) => fetch(API_PATH + `/share/delete/${obj.id}`, obj, 'DELETE')

//删除评论以及子评论
export const apiCommentDelete = (obj) => fetch(API_PATH + `/share/delete-comment/${obj.id}`, obj, 'DELETE')
